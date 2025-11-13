// Image Generation Service for ReVibe
// Integrates with knowledge base for intelligent image generation

import axios from 'axios';
import { expertSystem } from './knowledgeBase';

const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';
const HUGGINGFACE_MODEL = 'stabilityai/stable-diffusion-2-1';
const HUGGINGFACE_API_URL = `https://api-inference.huggingface.co/models/${HUGGINGFACE_MODEL}`;

export interface ImageGenerationRequest {
  material: string;
  category: string;
  projectName: string;
  style?: 'professional' | 'artistic' | 'minimalist' | 'eco_friendly';
  budget?: number;
  complexity?: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  style: string;
  timestamp: string;
  metadata: {
    material: string;
    category: string;
    projectName: string;
  };
}

/**
 * Generate image using AI with knowledge base integration
 */
export const generateImageWithKB = async (
  request: ImageGenerationRequest
): Promise<GeneratedImage> => {
  try {
    const style = request.style || 'professional';

    // Get enhanced prompt from knowledge base
    const prompt = expertSystem.generateImagePrompt(
      request.material,
      request.category,
      request.projectName,
      style
    );

    console.log('Generated prompt:', prompt);

    // If no API key, return placeholder
    if (!HUGGINGFACE_API_KEY) {
      console.warn('No HuggingFace API key - using placeholder image');
      return {
        url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Crect fill='%23667eea' width='512' height='512'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${request.projectName}%3C/text%3E%3C/svg%3E`,
        prompt,
        style,
        timestamp: new Date().toISOString(),
        metadata: {
          material: request.material,
          category: request.category,
          projectName: request.projectName
        }
      };
    }

    // Call HuggingFace API
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
        responseType: 'arraybuffer'
      }
    );

    // Convert image buffer to base64
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const reader = new FileReader();
    
    return new Promise<GeneratedImage>((resolve, reject) => {
      reader.onload = () => {
        const imageUrl = reader.result as string;
        resolve({
          url: imageUrl,
          prompt,
          style,
          timestamp: new Date().toISOString(),
          metadata: {
            material: request.material,
            category: request.category,
            projectName: request.projectName
          }
        });
      };
      reader.onerror = () => reject(new Error('Failed to read image'));
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Image generation error:', error);
    throw new Error('Failed to generate image');
  }
};

/**
 * Generate multiple image variations
 */
export const generateImageVariations = async (
  request: ImageGenerationRequest,
  count: number = 3
): Promise<GeneratedImage[]> => {
  const styles: Array<'professional' | 'artistic' | 'minimalist' | 'eco_friendly'> = [
    'professional',
    'artistic',
    'minimalist',
    'eco_friendly'
  ];

  const results: GeneratedImage[] = [];

  for (let i = 0; i < Math.min(count, styles.length); i++) {
    try {
      const image = await generateImageWithKB({
        ...request,
        style: styles[i]
      });
      results.push(image);
    } catch (error) {
      console.error(`Failed to generate variation ${i + 1}:`, error);
    }
  }

  return results;
};

/**
 * Get image generation recommendations based on material
 */
export const getImageGenerationRecommendations = (
  material: string,
  category: string
): {
  suggestedStyles: string[];
  colorPalettes: string[][];
  lightingOptions: string[];
  perspectiveOptions: string[];
} => {
  const knowledge = expertSystem.getMaterialKnowledge(material);

  const recommendations = {
    suggestedStyles: ['professional', 'artistic', 'eco_friendly'],
    colorPalettes: [
      ['#FFFFFF', '#F5F5F5', '#333333'],
      ['#2ECC71', '#27AE60', '#F39C12'],
      ['#FF6B6B', '#4ECDC4', '#45B7D1']
    ],
    lightingOptions: [
      'Studio lighting with soft shadows',
      'Natural daylight',
      'Warm ambient lighting',
      'Bright even lighting'
    ],
    perspectiveOptions: [
      'Three-quarter view',
      'Top-down view',
      'Side profile',
      'Detail close-up'
    ]
  };

  // Customize based on category
  if (category === 'Fashion') {
    recommendations.suggestedStyles = ['artistic', 'professional'];
    recommendations.perspectiveOptions = ['Full product view', 'Detail shot', 'Styled flat lay'];
  } else if (category === 'Garden') {
    recommendations.suggestedStyles = ['eco_friendly', 'natural'];
    recommendations.lightingOptions = ['Natural daylight', 'Golden hour lighting'];
  } else if (category === 'Tech') {
    recommendations.suggestedStyles = ['professional', 'minimalist'];
    recommendations.colorPalettes = [
      ['#000000', '#FFFFFF', '#0066CC'],
      ['#333333', '#CCCCCC', '#FF6600']
    ];
  }

  return recommendations;
};

/**
 * Validate image generation request
 */
export const validateImageRequest = (
  request: ImageGenerationRequest
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const result = {
    isValid: true,
    errors: [] as string[],
    warnings: [] as string[]
  };

  if (!request.material || request.material.trim() === '') {
    result.errors.push('Material is required');
    result.isValid = false;
  }

  if (!request.category || request.category.trim() === '') {
    result.errors.push('Category is required');
    result.isValid = false;
  }

  if (!request.projectName || request.projectName.trim() === '') {
    result.errors.push('Project name is required');
    result.isValid = false;
  }

  // Check if material is in knowledge base
  const knowledge = expertSystem.getMaterialKnowledge(request.material);
  if (!knowledge) {
    result.warnings.push(`Material "${request.material}" not in knowledge base - using generic guidelines`);
  }

  return result;
};

/**
 * Get cached image or generate new one
 */
const imageCache = new Map<string, GeneratedImage>();

export const getOrGenerateImage = async (
  request: ImageGenerationRequest
): Promise<GeneratedImage> => {
  const cacheKey = `${request.material}_${request.category}_${request.projectName}_${request.style || 'professional'}`;

  if (imageCache.has(cacheKey)) {
    console.log('Returning cached image');
    return imageCache.get(cacheKey)!;
  }

  const image = await generateImageWithKB(request);
  imageCache.set(cacheKey, image);

  return image;
};

/**
 * Clear image cache
 */
export const clearImageCache = (): void => {
  imageCache.clear();
  console.log('Image cache cleared');
};
