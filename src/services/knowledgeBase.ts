// Knowledge Base System for ReVibe
// Provides expert knowledge for image generation, AR scanning, and feature processing

export interface MaterialKnowledge {
  name: string;
  properties: string[];
  recyclability: 'high' | 'medium' | 'low';
  commonUses: string[];
  hazards: string[];
  processingTips: string[];
  imageGenerationPrompt: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  category: string;
  materials: string[];
  difficulty: 'Low' | 'Medium' | 'High';
  estimatedTime: string;
  steps: string[];
  tools: string[];
  learningOutcomes: string[];
  imagePrompt: string;
  arScanningTips: string[];
}

export interface ARScanningProfile {
  featureName: string;
  detectionMethod: string;
  requiredLighting: string;
  optimalDistance: string;
  confidence: number;
  processingTips: string[];
}

export interface ImageGenerationConfig {
  style: string;
  quality: string;
  resolution: string;
  colorPalette: string[];
  lighting: string;
  perspective: string;
}

// Material Knowledge Base
const MATERIAL_KNOWLEDGE: Record<string, MaterialKnowledge> = {
  'plastic bottle': {
    name: 'Plastic Bottle',
    properties: ['lightweight', 'transparent', 'durable', 'waterproof'],
    recyclability: 'high',
    commonUses: ['containers', 'planters', 'storage', 'decorations'],
    hazards: ['sharp edges after cutting', 'chemical residue'],
    processingTips: [
      'Wash thoroughly before use',
      'Remove labels and adhesive',
      'Cut carefully to avoid sharp edges',
      'Sand edges for safety',
      'Use heat gun for shaping (carefully)'
    ],
    imageGenerationPrompt: 'colorful upcycled plastic bottle craft, creative transformation, sustainable design, vibrant colors, professional photography, studio lighting'
  },
  'old jeans': {
    name: 'Old Jeans',
    properties: ['durable', 'textured', 'colorfast', 'thick fabric'],
    recyclability: 'high',
    commonUses: ['bags', 'patches', 'rugs', 'wall hangings', 'cushions'],
    hazards: ['thick seams can be hard to sew', 'dye bleeding'],
    processingTips: [
      'Wash before cutting',
      'Use sharp scissors or rotary cutter',
      'Preserve interesting seams and pockets',
      'Cut along grain for best results',
      'Use heavy-duty thread for sewing'
    ],
    imageGenerationPrompt: 'upcycled denim jeans craft project, textile art, sustainable fashion, handmade creation, artistic composition, warm lighting'
  },
  'cardboard': {
    name: 'Cardboard',
    properties: ['lightweight', 'foldable', 'recyclable', 'versatile'],
    recyclability: 'high',
    commonUses: ['boxes', 'structures', 'organizers', 'art projects'],
    hazards: ['can be fragile when wet', 'splinters'],
    processingTips: [
      'Remove tape and staples',
      'Flatten before storage',
      'Use craft knife for precise cuts',
      'Reinforce with tape or glue',
      'Waterproof if needed with sealant'
    ],
    imageGenerationPrompt: 'cardboard upcycling project, DIY craft, creative construction, eco-friendly design, detailed craftsmanship, natural lighting'
  },
  'glass jar': {
    name: 'Glass Jar',
    properties: ['transparent', 'durable', 'heat-resistant', 'reusable'],
    recyclability: 'high',
    commonUses: ['storage', 'decoration', 'lighting', 'planters'],
    hazards: ['sharp edges', 'breakable', 'heavy'],
    processingTips: [
      'Remove labels completely',
      'Wash thoroughly',
      'Use glass cutter for modifications',
      'Smooth edges with sandpaper',
      'Use appropriate adhesives for glass'
    ],
    imageGenerationPrompt: 'glass jar upcycled decoration, creative reuse, sustainable living, artistic arrangement, ambient lighting, professional styling'
  },
  'wood scraps': {
    name: 'Wood Scraps',
    properties: ['natural', 'workable', 'aesthetic', 'durable'],
    recyclability: 'high',
    commonUses: ['furniture', 'decorations', 'organizers', 'art'],
    hazards: ['splinters', 'sharp tools required', 'dust inhalation'],
    processingTips: [
      'Sand all surfaces smooth',
      'Check for nails and staples',
      'Use proper ventilation',
      'Wear safety equipment',
      'Treat with appropriate finish'
    ],
    imageGenerationPrompt: 'wooden upcycled craft, rustic design, handcrafted furniture, sustainable woodworking, natural textures, warm studio lighting'
  },
  'plastic bags': {
    name: 'Plastic Bags',
    properties: ['flexible', 'lightweight', 'waterproof', 'colorful'],
    recyclability: 'medium',
    commonUses: ['weaving', 'rope', 'storage', 'mats'],
    hazards: ['melts easily', 'choking hazard for children'],
    processingTips: [
      'Cut into strips carefully',
      'Avoid direct heat',
      'Use for weaving projects',
      'Create yarn by rolling',
      'Store in dry place'
    ],
    imageGenerationPrompt: 'plastic bag upcycling project, woven craft, colorful textile, sustainable creation, artistic technique, detailed craftsmanship'
  },
  'tin cans': {
    name: 'Tin Cans',
    properties: ['sturdy', 'metallic', 'cylindrical', 'reusable'],
    recyclability: 'high',
    commonUses: ['planters', 'storage', 'lighting', 'organizers'],
    hazards: ['sharp edges', 'rust', 'heavy'],
    processingTips: [
      'Remove sharp edges with file',
      'Wash thoroughly',
      'Remove labels',
      'Paint or decorate surface',
      'Drill drainage holes if needed'
    ],
    imageGenerationPrompt: 'tin can upcycled planter, rustic decoration, sustainable gardening, painted metallic craft, artistic arrangement, natural lighting'
  }
};

// Project Templates Database
const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'template_1',
    name: 'Plastic Bottle Planter',
    category: 'Garden',
    materials: ['plastic bottle', 'soil', 'seeds', 'paint'],
    difficulty: 'Low',
    estimatedTime: '30-45 min',
    steps: [
      'Clean and dry the plastic bottle',
      'Cut the bottle in half horizontally',
      'Paint the bottle with eco-friendly paint',
      'Add drainage holes at the bottom',
      'Fill with soil',
      'Plant seeds or small plants',
      'Water and place in sunlight'
    ],
    tools: ['scissors', 'drill', 'paintbrush'],
    learningOutcomes: [
      'Understand basic gardening principles',
      'Learn about plant growth',
      'Practice sustainable gardening',
      'Develop creativity in upcycling'
    ],
    imagePrompt: 'beautiful plastic bottle planter with green plants, sustainable gardening, eco-friendly design, vibrant colors, professional photography',
    arScanningTips: [
      'Scan the bottle to identify material composition',
      'Check for any chemical residue',
      'Verify structural integrity'
    ]
  },
  {
    id: 'template_2',
    name: 'Denim Tote Bag',
    category: 'Fashion',
    materials: ['old jeans', 'thread', 'buttons', 'fabric glue'],
    difficulty: 'Medium',
    estimatedTime: '120-150 min',
    steps: [
      'Cut jeans into panels',
      'Design your bag layout',
      'Sew panels together',
      'Add bottom reinforcement',
      'Create handles from jean strips',
      'Add pockets if desired',
      'Attach buttons or decorations',
      'Final stitching and quality check'
    ],
    tools: ['scissors', 'sewing machine', 'needle', 'measuring tape'],
    learningOutcomes: [
      'Master basic sewing techniques',
      'Understand fabric properties',
      'Develop design skills',
      'Create functional fashion items'
    ],
    imagePrompt: 'handmade denim tote bag, sustainable fashion, upcycled jeans, artistic design, professional product photography, studio lighting',
    arScanningTips: [
      'Scan denim to verify quality',
      'Check for wear and tear',
      'Identify best sections for use'
    ]
  },
  {
    id: 'template_3',
    name: 'Cardboard Storage Box',
    category: 'Home',
    materials: ['cardboard', 'tape', 'decorative paper', 'glue'],
    difficulty: 'Low',
    estimatedTime: '45-60 min',
    steps: [
      'Flatten and prepare cardboard',
      'Cut pieces to size',
      'Score fold lines',
      'Assemble box structure',
      'Reinforce with tape',
      'Decorate with paper or paint',
      'Add labels',
      'Test durability'
    ],
    tools: ['craft knife', 'ruler', 'tape', 'scissors'],
    learningOutcomes: [
      'Learn box construction',
      'Understand structural design',
      'Develop organizational skills',
      'Practice sustainable storage solutions'
    ],
    imagePrompt: 'organized cardboard storage boxes, sustainable organization, creative design, functional storage, minimalist aesthetic, natural lighting',
    arScanningTips: [
      'Scan cardboard for thickness',
      'Check for damage or weak points',
      'Verify structural integrity'
    ]
  }
];

// AR Scanning Profiles
const AR_SCANNING_PROFILES: Record<string, ARScanningProfile> = {
  'material_detection': {
    featureName: 'Material Detection',
    detectionMethod: 'Surface texture and color analysis',
    requiredLighting: 'Natural or bright artificial light',
    optimalDistance: '15-30 cm',
    confidence: 0.85,
    processingTips: [
      'Ensure good lighting conditions',
      'Keep object steady',
      'Scan from multiple angles',
      'Avoid reflective surfaces',
      'Clean object surface before scanning'
    ]
  },
  'dimension_measurement': {
    featureName: 'Dimension Measurement',
    detectionMethod: 'Point cloud analysis and depth sensing',
    requiredLighting: 'Any lighting condition',
    optimalDistance: '20-50 cm',
    confidence: 0.9,
    processingTips: [
      'Place object on flat surface',
      'Ensure clear background',
      'Keep device steady',
      'Scan all sides of object',
      'Verify measurements are consistent'
    ]
  },
  'color_analysis': {
    featureName: 'Color Analysis',
    detectionMethod: 'RGB color space analysis',
    requiredLighting: 'Consistent, bright lighting',
    optimalDistance: '10-25 cm',
    confidence: 0.88,
    processingTips: [
      'Use natural daylight if possible',
      'Avoid harsh shadows',
      'Keep white balance consistent',
      'Scan multiple areas',
      'Compare with color reference'
    ]
  },
  'condition_assessment': {
    featureName: 'Condition Assessment',
    detectionMethod: 'Surface damage and wear detection',
    requiredLighting: 'Bright lighting to reveal details',
    optimalDistance: '15-40 cm',
    confidence: 0.82,
    processingTips: [
      'Use raking light to highlight damage',
      'Scan all surfaces thoroughly',
      'Document damage locations',
      'Check for structural integrity',
      'Assess safety concerns'
    ]
  }
};

// Image Generation Configurations
const IMAGE_GENERATION_CONFIGS: Record<string, ImageGenerationConfig> = {
  'professional': {
    style: 'Professional product photography',
    quality: 'Ultra high quality',
    resolution: '4K (3840x2160)',
    colorPalette: ['#FFFFFF', '#F5F5F5', '#333333', '#666666'],
    lighting: 'Studio lighting with soft shadows',
    perspective: 'Three-quarter view with depth'
  },
  'artistic': {
    style: 'Artistic and creative',
    quality: 'High quality with artistic effects',
    resolution: '2K (2560x1440)',
    colorPalette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
    lighting: 'Warm ambient lighting',
    perspective: 'Dynamic angle with interesting composition'
  },
  'minimalist': {
    style: 'Minimalist and clean',
    quality: 'High quality with minimal elements',
    resolution: '1080p (1920x1080)',
    colorPalette: ['#FFFFFF', '#000000', '#CCCCCC'],
    lighting: 'Bright, even lighting',
    perspective: 'Centered, symmetrical view'
  },
  'eco_friendly': {
    style: 'Eco-friendly and sustainable',
    quality: 'High quality with natural elements',
    resolution: '2K (2560x1440)',
    colorPalette: ['#2ECC71', '#27AE60', '#F39C12', '#8B4513'],
    lighting: 'Natural daylight',
    perspective: 'Outdoor setting with natural background'
  }
};

// Expert System for Feature Processing
export class ExpertSystem {
  private knowledgeBase: Record<string, MaterialKnowledge>;
  private templates: ProjectTemplate[];
  private arProfiles: Record<string, ARScanningProfile>;
  private imageConfigs: Record<string, ImageGenerationConfig>;

  constructor() {
    this.knowledgeBase = MATERIAL_KNOWLEDGE;
    this.templates = PROJECT_TEMPLATES;
    this.arProfiles = AR_SCANNING_PROFILES;
    this.imageConfigs = IMAGE_GENERATION_CONFIGS;
  }

  // Get material knowledge
  getMaterialKnowledge(materialName: string): MaterialKnowledge | null {
    const normalized = materialName.toLowerCase();
    return this.knowledgeBase[normalized] || null;
  }

  // Get all materials
  getAllMaterials(): string[] {
    return Object.keys(this.knowledgeBase);
  }

  // Find suitable projects for material
  findProjectsForMaterial(materialName: string): ProjectTemplate[] {
    const normalized = materialName.toLowerCase();
    return this.templates.filter(template =>
      template.materials.some(m => m.toLowerCase().includes(normalized))
    );
  }

  // Get project template by ID
  getProjectTemplate(templateId: string): ProjectTemplate | null {
    return this.templates.find(t => t.id === templateId) || null;
  }

  // Get AR scanning profile
  getARProfile(featureName: string): ARScanningProfile | null {
    return this.arProfiles[featureName] || null;
  }

  // Get image generation config
  getImageConfig(style: string): ImageGenerationConfig | null {
    return this.imageConfigs[style] || null;
  }

  // Generate enhanced image prompt
  generateImagePrompt(
    material: string,
    category: string,
    projectName: string,
    style: 'professional' | 'artistic' | 'minimalist' | 'eco_friendly' = 'professional'
  ): string {
    const knowledge = this.getMaterialKnowledge(material);
    const config = this.getImageConfig(style);

    if (!knowledge || !config) {
      return `${projectName} made from ${material} in ${category} category`;
    }

    const basePrompt = knowledge.imageGenerationPrompt;
    const styleDescriptor = config.style;
    const lightingDescriptor = config.lighting;

    return `${basePrompt}, ${styleDescriptor}, ${lightingDescriptor}, ${projectName}, ${category} project, high quality, detailed, professional`;
  }

  // Validate material for project
  validateMaterialForProject(materialName: string, templateId: string): {
    isValid: boolean;
    warnings: string[];
    tips: string[];
  } {
    const material = this.getMaterialKnowledge(materialName);
    const template = this.getProjectTemplate(templateId);

    const result = {
      isValid: true,
      warnings: [] as string[],
      tips: [] as string[]
    };

    if (!material) {
      result.isValid = false;
      result.warnings.push(`Material "${materialName}" not found in knowledge base`);
      return result;
    }

    if (!template) {
      result.isValid = false;
      result.warnings.push(`Template "${templateId}" not found`);
      return result;
    }

    // Check recyclability
    if (material.recyclability === 'low') {
      result.warnings.push('This material has low recyclability - consider alternatives');
    }

    // Add hazard warnings
    if (material.hazards.length > 0) {
      result.warnings.push(`Hazards: ${material.hazards.join(', ')}`);
    }

    // Add processing tips
    result.tips = material.processingTips;

    return result;
  }

  // Get AR scanning recommendations
  getARRecommendations(materialName: string): {
    profiles: ARScanningProfile[];
    tips: string[];
  } {
    const material = this.getMaterialKnowledge(materialName);
    const profiles = Object.values(this.arProfiles);

    const tips = material?.processingTips || [];

    return {
      profiles,
      tips
    };
  }

  // Generate comprehensive project analysis
  analyzeProject(
    material: string,
    category: string,
    complexity: string,
    budget: number
  ): {
    suitableMaterial: MaterialKnowledge | null;
    recommendedTemplates: ProjectTemplate[];
    imagePrompt: string;
    arRecommendations: ARScanningProfile[];
    warnings: string[];
    tips: string[];
  } {
    const material_knowledge = this.getMaterialKnowledge(material);
    const recommended = this.findProjectsForMaterial(material)
      .filter(t => t.difficulty === complexity);

    const warnings: string[] = [];
    const tips: string[] = [];

    if (!material_knowledge) {
      warnings.push(`Material "${material}" not in knowledge base - using general guidelines`);
    } else {
      tips.push(...material_knowledge.processingTips);
      if (material_knowledge.recyclability === 'low') {
        warnings.push('Low recyclability material - consider eco-impact');
      }
    }

    return {
      suitableMaterial: material_knowledge,
      recommendedTemplates: recommended,
      imagePrompt: this.generateImagePrompt(material, category, `${category} Project`),
      arRecommendations: Object.values(this.arProfiles),
      warnings,
      tips
    };
  }
}

// Export singleton instance
export const expertSystem = new ExpertSystem();
