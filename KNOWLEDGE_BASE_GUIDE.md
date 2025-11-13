# ReVibe Knowledge Base System

## Overview

The ReVibe Knowledge Base System is an expert system designed to provide intelligent recommendations for upcycling projects, image generation, and AR scanning. It combines material knowledge, project templates, and processing guidelines to deliver high-quality results.

## Architecture

### Core Components

#### 1. **Knowledge Base** (`knowledgeBase.ts`)
The central repository of expert knowledge about materials, projects, and AR scanning.

**Key Features:**
- Material Knowledge Database with properties, hazards, and processing tips
- Project Templates with step-by-step instructions
- AR Scanning Profiles for different detection methods
- Image Generation Configurations for various styles

**Material Knowledge Includes:**
- Plastic Bottles
- Old Jeans
- Cardboard
- Glass Jars
- Wood Scraps
- Plastic Bags
- Tin Cans

Each material has:
- Physical properties
- Recyclability rating
- Common uses
- Safety hazards
- Processing tips
- Image generation prompts

#### 2. **Expert System** (`ExpertSystem` class)
Intelligent system that processes knowledge base data to provide recommendations.

**Key Methods:**
```typescript
// Get material knowledge
getMaterialKnowledge(materialName: string): MaterialKnowledge | null

// Find suitable projects for a material
findProjectsForMaterial(materialName: string): ProjectTemplate[]

// Get AR scanning profile
getARProfile(featureName: string): ARScanningProfile | null

// Generate enhanced image prompts
generateImagePrompt(
  material: string,
  category: string,
  projectName: string,
  style: string
): string

// Validate material for project
validateMaterialForProject(
  materialName: string,
  templateId: string
): ValidationResult

// Analyze complete project
analyzeProject(
  material: string,
  category: string,
  complexity: string,
  budget: number
): ProjectAnalysis
```

#### 3. **Image Generation Service** (`imageGenerationService.ts`)
Integrates with the knowledge base to generate high-quality project images.

**Features:**
- Knowledge-based prompt generation
- Multiple style support (professional, artistic, minimalist, eco-friendly)
- Image caching for performance
- Validation of generation requests
- Image variation generation

**Supported Styles:**
- **Professional**: Studio lighting, high quality, 4K resolution
- **Artistic**: Creative effects, warm lighting, 2K resolution
- **Minimalist**: Clean design, even lighting, 1080p
- **Eco-friendly**: Natural elements, daylight, 2K resolution

#### 4. **AR Scanning Service** (`arScanningService.ts`)
Provides AR-based material detection and analysis.

**Features:**
- Material detection simulation
- Dimension measurement
- Color analysis
- Condition assessment
- Scan validation
- Report generation

**AR Scanning Profiles:**
1. **Material Detection**
   - Surface texture and color analysis
   - Optimal distance: 15-30 cm
   - Confidence: 85%

2. **Dimension Measurement**
   - Point cloud analysis
   - Optimal distance: 20-50 cm
   - Confidence: 90%

3. **Color Analysis**
   - RGB color space analysis
   - Optimal distance: 10-25 cm
   - Confidence: 88%

4. **Condition Assessment**
   - Surface damage detection
   - Optimal distance: 15-40 cm
   - Confidence: 82%

## Usage Guide

### 1. Material Analysis

```typescript
import { expertSystem } from '@/services/knowledgeBase';

// Get material knowledge
const material = expertSystem.getMaterialKnowledge('plastic bottle');
console.log(material.properties); // ['lightweight', 'transparent', ...]
console.log(material.hazards); // ['sharp edges after cutting', ...]
```

### 2. Project Recommendations

```typescript
// Find projects for a material
const projects = expertSystem.findProjectsForMaterial('old jeans');
console.log(projects); // [ProjectTemplate, ...]

// Validate material for specific project
const validation = expertSystem.validateMaterialForProject('plastic bottle', 'template_1');
console.log(validation.warnings); // Material-specific warnings
console.log(validation.tips); // Processing tips
```

### 3. Image Generation

```typescript
import { generateImageWithKB, getImageGenerationRecommendations } from '@/services/imageGenerationService';

// Generate image with knowledge base integration
const image = await generateImageWithKB({
  material: 'plastic bottle',
  category: 'Garden',
  projectName: 'Plastic Bottle Planter',
  style: 'eco_friendly'
});

// Get recommendations
const recommendations = getImageGenerationRecommendations('plastic bottle', 'Garden');
console.log(recommendations.suggestedStyles); // ['eco_friendly', 'natural', ...]
```

### 4. AR Scanning

```typescript
import { performARScan, getARScanningTips } from '@/services/arScanningService';

// Perform AR scan
const scanResult = await performARScan('plastic bottle');
console.log(scanResult.confidence); // 0.85-1.0
console.log(scanResult.recommendations); // Processing tips

// Get scanning tips
const tips = getARScanningTips('plastic bottle');
console.log(tips); // ['Wash thoroughly', 'Remove labels', ...]
```

### 5. Complete Project Analysis

```typescript
// Analyze complete project
const analysis = expertSystem.analyzeProject(
  'plastic bottle',
  'Garden',
  'Low',
  100
);

console.log(analysis.suitableMaterial); // Material knowledge
console.log(analysis.recommendedTemplates); // Matching projects
console.log(analysis.imagePrompt); // Generated prompt
console.log(analysis.warnings); // Safety warnings
console.log(analysis.tips); // Processing tips
```

## Integration with App Features

### 1. GenerateIdea Page
- Uses knowledge base to enhance AI prompts
- Validates material selection
- Provides processing tips
- Generates appropriate project templates

### 2. Image Generation
- Leverages material knowledge for better prompts
- Applies style-specific configurations
- Caches generated images
- Supports multiple variations

### 3. AR Scanning
- Detects material properties
- Validates scanning conditions
- Provides real-time recommendations
- Generates detailed reports

### 4. Step Guide
- Uses project templates from knowledge base
- Provides material-specific instructions
- Includes safety warnings
- Offers alternative approaches

## Data Structure

### Material Knowledge
```typescript
interface MaterialKnowledge {
  name: string;
  properties: string[];
  recyclability: 'high' | 'medium' | 'low';
  commonUses: string[];
  hazards: string[];
  processingTips: string[];
  imageGenerationPrompt: string;
}
```

### Project Template
```typescript
interface ProjectTemplate {
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
```

### AR Scanning Profile
```typescript
interface ARScanningProfile {
  featureName: string;
  detectionMethod: string;
  requiredLighting: string;
  optimalDistance: string;
  confidence: number;
  processingTips: string[];
}
```

### Image Generation Config
```typescript
interface ImageGenerationConfig {
  style: string;
  quality: string;
  resolution: string;
  colorPalette: string[];
  lighting: string;
  perspective: string;
}
```

## Best Practices

### 1. Material Selection
- Always validate material against knowledge base
- Check for hazards before recommending projects
- Provide alternative materials if needed
- Include processing tips in instructions

### 2. Image Generation
- Use appropriate style for category
- Include material-specific prompts
- Cache frequently generated images
- Validate requests before generation

### 3. AR Scanning
- Ensure proper lighting conditions
- Maintain optimal scanning distance
- Validate scan conditions before starting
- Provide real-time feedback to user

### 4. Project Recommendations
- Match complexity with user skill level
- Consider budget constraints
- Suggest learning outcomes
- Provide step-by-step guidance

## Extending the Knowledge Base

### Adding New Materials

1. Create material knowledge object:
```typescript
const newMaterial: MaterialKnowledge = {
  name: 'New Material',
  properties: ['property1', 'property2'],
  recyclability: 'high',
  commonUses: ['use1', 'use2'],
  hazards: ['hazard1'],
  processingTips: ['tip1', 'tip2'],
  imageGenerationPrompt: 'prompt text'
};
```

2. Add to `MATERIAL_KNOWLEDGE` in `knowledgeBase.ts`

### Adding New Project Templates

1. Create template object:
```typescript
const newTemplate: ProjectTemplate = {
  id: 'template_X',
  name: 'Project Name',
  category: 'Category',
  materials: ['material1', 'material2'],
  difficulty: 'Low',
  estimatedTime: '60-90 min',
  steps: ['step1', 'step2'],
  tools: ['tool1', 'tool2'],
  learningOutcomes: ['outcome1'],
  imagePrompt: 'prompt text',
  arScanningTips: ['tip1']
};
```

2. Add to `PROJECT_TEMPLATES` array

### Adding New AR Profiles

1. Create profile object:
```typescript
const newProfile: ARScanningProfile = {
  featureName: 'Feature Name',
  detectionMethod: 'Method description',
  requiredLighting: 'Lighting requirement',
  optimalDistance: '15-30 cm',
  confidence: 0.85,
  processingTips: ['tip1', 'tip2']
};
```

2. Add to `AR_SCANNING_PROFILES` object

## Performance Optimization

### Caching Strategy
- Image cache: Stores generated images by request parameters
- Material cache: In-memory storage of frequently accessed materials
- Template cache: Pre-loaded project templates

### Query Optimization
- Use indexed lookups for materials
- Filter templates by complexity early
- Batch AR profile queries

## Error Handling

### Material Not Found
- Returns null from knowledge base
- Falls back to generic guidelines
- Provides warning to user

### Invalid Scan Conditions
- Validates lighting and distance
- Provides specific recommendations
- Prevents inaccurate scans

### Image Generation Failure
- Uses placeholder image
- Logs error details
- Suggests alternative approaches

## Future Enhancements

1. **Machine Learning Integration**
   - Learn from user feedback
   - Improve recommendations over time
   - Predict project success rates

2. **Real AR Implementation**
   - Integrate with AR.js or similar
   - Real-time material detection
   - 3D visualization

3. **Community Knowledge**
   - User-contributed materials
   - Community project templates
   - Shared tips and tricks

4. **Advanced Analytics**
   - Track project success rates
   - Analyze user preferences
   - Generate insights

## Troubleshooting

### Image Generation Not Working
- Check API key configuration
- Verify internet connection
- Check file size limits
- Review error logs

### AR Scanning Issues
- Ensure good lighting
- Maintain proper distance
- Clean camera lens
- Check device permissions

### Knowledge Base Queries Slow
- Clear image cache
- Check browser memory
- Optimize query filters
- Consider pagination

## Support

For issues or questions about the knowledge base system:
1. Check the documentation
2. Review error logs
3. Test with sample data
4. Contact development team

---

**Last Updated:** November 2025
**Version:** 1.0.0
**Status:** Production Ready
