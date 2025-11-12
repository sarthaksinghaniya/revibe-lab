import axios from 'axios';

const NVIDIA_API_KEY = import.meta.env.VITE_NVIDIA_API_KEY || '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';
const NVIDIA_MODEL = import.meta.env.VITE_NVIDIA_MODEL || 'nvidia/nemotron-nano-9b-v2:free';
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

// Log for debugging
console.log('API Key loaded:', NVIDIA_API_KEY ? 'Yes' : 'No');
console.log('Model:', NVIDIA_MODEL);

interface AIRequest {
  material: string;
  category: string;
  complexity: string;
  budget: number;
}

interface AIResponse {
  idea: string;
  description: string;
  estimatedTime: string;
  materials: string[];
  steps: string[];
  learningOutcomes: string[];
}

export const generateIdeaWithAI = async (request: AIRequest): Promise<AIResponse> => {
  try {
    console.log('Generating idea for:', request);
    
    const prompt = `You are an expert upcycling and DIY project advisor. Generate a creative and practical upcycling project idea based on these parameters:

Material: ${request.material}
Category: ${request.category}
Complexity Level: ${request.complexity}
Budget: ₹${request.budget}

Please provide ONLY a JSON response with this exact structure (no markdown, no extra text):
{
  "idea": "Project name",
  "description": "Detailed description of the project",
  "estimatedTime": "Time range in minutes",
  "materials": ["material1", "material2"],
  "steps": ["step1", "step2"],
  "learningOutcomes": ["outcome1", "outcome2"]
}`;

    console.log('Sending request to NVIDIA API...');
    
    const response = await axios.post(
      NVIDIA_API_URL,
      {
        model: NVIDIA_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response received:', response.data);
    
    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error('Failed to parse response:', content);
      throw new Error('Failed to parse AI response');
    }

    const aiData = JSON.parse(jsonMatch[0]);
    console.log('Parsed AI data:', aiData);
    
    return {
      idea: aiData.idea || 'Upcycling Project',
      description: aiData.description || '',
      estimatedTime: aiData.estimatedTime || '60-90 min',
      materials: aiData.materials || [],
      steps: aiData.steps || [],
      learningOutcomes: aiData.learningOutcomes || [],
    };
  } catch (error: any) {
    console.error('AI Service Error:', error);
    console.error('Error message:', error.message);
    console.error('Error response:', error.response?.data);
    
    // Fallback: Return mock data if API fails
    console.log('Using fallback mock data...');
    return {
      idea: `${request.category} Project from ${request.material}`,
      description: `Create an innovative ${request.category.toLowerCase()} project using ${request.material}. This eco-friendly project teaches upcycling principles while creating something practical and beautiful.`,
      estimatedTime: request.complexity === 'High' ? '180-240 min' : request.complexity === 'Medium' ? '120-150 min' : '60-90 min',
      materials: [request.material, 'scissors', 'glue', 'paint', 'tools'],
      steps: [
        `Prepare and clean the ${request.material}`,
        'Design your project layout',
        'Gather all necessary materials',
        'Start building your creation',
        'Add finishing touches',
        'Test and refine'
      ],
      learningOutcomes: [
        'Understand upcycling principles',
        'Develop creative problem-solving',
        'Learn sustainable practices',
        'Master material transformation'
      ],
    };
  }
};

export const generateStepGuideWithAI = async (idea: string, materials: string[]): Promise<string[]> => {
  try {
    const prompt = `You are an expert DIY instructor. Create detailed step-by-step instructions for this upcycling project:

Project: ${idea}
Available Materials: ${materials.join(', ')}

Provide 5-8 clear, actionable steps. Return ONLY as a JSON array of strings.
Format: ["Step 1: ...", "Step 2: ...", ...]`;

    const response = await axios.post(
      NVIDIA_API_URL,
      {
        model: NVIDIA_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse steps');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Step Generation Error:', error);
    
    // Fallback mock steps
    return [
      `Prepare and clean all ${materials.join(', ')}`,
      'Design your project layout and sketch it out',
      'Gather all necessary tools and materials',
      'Cut and shape the materials according to design',
      'Assemble the main structure',
      'Add details and decorations',
      'Test functionality and durability',
      'Make final adjustments and refinements'
    ];
  }
};

export const generateLearningResourcesWithAI = async (topic: string): Promise<any[]> => {
  try {
    const prompt = `You are an educational content curator. Suggest 5-7 learning resources for: ${topic}

Return ONLY as a JSON array with objects containing title, description, and type.
Format: [{"title": "Resource Title", "description": "Brief description", "type": "book/article/video/course/website", "url": "https://..."}]`;

    const response = await axios.post(
      NVIDIA_API_URL,
      {
        model: NVIDIA_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse resources');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Resource Generation Error:', error);
    
    // Fallback mock resources
    return [
      {
        title: `${topic} Guide`,
        description: `Comprehensive guide to ${topic}`,
        type: 'article',
        url: `https://www.wikipedia.org/wiki/${topic.replace(/\s+/g, '_')}`
      },
      {
        title: `Learn ${topic}`,
        description: `Video tutorials for ${topic}`,
        type: 'video',
        url: 'https://www.youtube.com/results?search_query=' + topic.replace(/\s+/g, '+')
      },
      {
        title: `${topic} Course`,
        description: `Online course about ${topic}`,
        type: 'course',
        url: 'https://www.coursera.org/search?query=' + topic.replace(/\s+/g, '+')
      },
      {
        title: `${topic} Resources`,
        description: `Collection of ${topic} resources`,
        type: 'website',
        url: 'https://www.skillshare.com/search?query=' + topic.replace(/\s+/g, '+')
      }
    ];
  }
};
