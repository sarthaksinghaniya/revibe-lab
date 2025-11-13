# ReVibe Knowledge Base Integration Guide

## Quick Start

### 1. Import Knowledge Base Services

```typescript
import { expertSystem } from '@/services/knowledgeBase';
import { generateImageWithKB } from '@/services/imageGenerationService';
import { performARScan } from '@/services/arScanningService';
import * as KBUtils from '@/services/knowledgeBaseUtils';
```

### 2. Use in Components

```typescript
// Get material recommendations
const recommendations = KBUtils.getProjectRecommendations(
  'plastic bottle',
  'Garden',
  'Low',
  100
);

// Generate image
const image = await generateImageWithKB({
  material: 'plastic bottle',
  category: 'Garden',
  projectName: 'Plastic Bottle Planter',
  style: 'eco_friendly'
});

// Perform AR scan
const scanResult = await performARScan('plastic bottle');
```

## Integration Points

### GenerateIdea Page

**Current Implementation:**
- Upload functionality with file validation
- Material input with knowledge base integration
- Category and complexity selection
- Budget input

**Enhancements to Add:**
```typescript
// In handleGenerate function
const recommendations = KBUtils.getProjectRecommendations(
  material,
  category,
  complexity,
  budget
);

// Validate material
const validation = expertSystem.validateMaterialForProject(material, templateId);

// Generate enhanced image
const image = await generateImageWithKB({
  material,
  category,
  projectName: idea.idea,
  style: 'professional'
});

// Get AR recommendations
const arRecommendations = expertSystem.getARRecommendations(material);
```

### StepGuide Page

**Integration Points:**
```typescript
// Get project steps
const steps = KBUtils.getProjectSteps(templateId);

// Get required tools
const tools = KBUtils.getRequiredTools(templateId);

// Get learning outcomes
const outcomes = KBUtils.getLearningOutcomes(templateId);

// Get safety information
const safety = KBUtils.getSafetyInfo(material);
```

### Learn Page

**Integration Points:**
```typescript
// Get all materials
const materials = KBUtils.getAvailableMaterials();

// Search projects
const results = KBUtils.searchProjects(keyword);

// Get projects by category
const categoryProjects = KBUtils.getProjectsByCategory(category);

// Get projects by difficulty
const difficultyProjects = KBUtils.getProjectsByDifficulty(difficulty);
```

### Materials Page

**Integration Points:**
```typescript
// Get material properties
const properties = KBUtils.getMaterialProperties(material);

// Get safety information
const safety = KBUtils.getSafetyInfo(material);

// Get common uses
const uses = properties.commonUses;

// Get processing tips
const tips = KBUtils.getSafetyInfo(material).tips;
```

### FindSources Page

**Integration Points:**
```typescript
// Get learning outcomes for project
const outcomes = KBUtils.getLearningOutcomes(templateId);

// Get similar projects
const similar = KBUtils.getSimilarProjects(templateId);

// Get project summary
const summary = KBUtils.generateProjectSummary(templateId);
```

## Feature Implementation Examples

### 1. Material Detection with AR

```typescript
import { performARScan, analyzeScanResults } from '@/services/arScanningService';

const handleARScan = async () => {
  try {
    const scanResult = await performARScan(materialName);
    const analysis = analyzeScanResults(scanResult);
    
    setMaterial(scanResult.materialDetected);
    setAnalysis(analysis);
  } catch (error) {
    console.error('AR scan failed:', error);
  }
};
```

### 2. Intelligent Image Generation

```typescript
import { generateImageWithKB, getImageGenerationRecommendations } from '@/services/imageGenerationService';

const handleGenerateImage = async () => {
  // Get recommendations
  const recommendations = getImageGenerationRecommendations(material, category);
  
  // Generate image
  const image = await generateImageWithKB({
    material,
    category,
    projectName,
    style: recommendations.suggestedStyles[0]
  });
  
  setGeneratedImage(image);
};
```

### 3. Project Validation

```typescript
import * as KBUtils from '@/services/knowledgeBaseUtils';

const validateProject = (material: string, templateId: string, budget: number) => {
  const validation = KBUtils.validateProjectFeasibility(
    material,
    templateId,
    budget,
    complexity
  );
  
  if (!validation.isFeasible) {
    showWarnings(validation.warnings);
    showIssues(validation.issues);
  }
  
  return validation;
};
```

### 4. Enhanced Project Description

```typescript
import * as KBUtils from '@/services/knowledgeBaseUtils';

const generateDescription = (material: string, category: string, projectName: string) => {
  const description = KBUtils.generateProjectDescription(material, category, projectName);
  return description;
};
```

### 5. Safety Information Display

```typescript
import * as KBUtils from '@/services/knowledgeBaseUtils';

const displaySafetyInfo = (material: string) => {
  const safety = KBUtils.getSafetyInfo(material);
  
  return (
    <div>
      <h3>Safety Hazards</h3>
      <ul>
        {safety.hazards.map((h, i) => <li key={i}>{h}</li>)}
      </ul>
      
      <h3>Processing Tips</h3>
      <ul>
        {safety.tips.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
};
```

## Component Examples

### Material Selector with Knowledge Base

```typescript
import { getAvailableMaterials, getMaterialProperties } from '@/services/knowledgeBaseUtils';

const MaterialSelector = () => {
  const materials = getAvailableMaterials();
  const [selected, setSelected] = useState('');
  const properties = selected ? getMaterialProperties(selected) : null;

  return (
    <div>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select a material</option>
        {materials.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      
      {properties && (
        <div>
          <h3>{properties.name}</h3>
          <p>Recyclability: {properties.recyclability}</p>
          <p>Properties: {properties.properties.join(', ')}</p>
          <p>Uses: {properties.commonUses.join(', ')}</p>
        </div>
      )}
    </div>
  );
};
```

### Project Recommendation Component

```typescript
import { getProjectRecommendations } from '@/services/knowledgeBaseUtils';

const ProjectRecommendations = ({ material, category, complexity, budget }) => {
  const recommendations = getProjectRecommendations(material, category, complexity, budget);

  return (
    <div>
      <h3>Recommended Projects</h3>
      {recommendations.projects.map(project => (
        <div key={project.id}>
          <h4>{project.name}</h4>
          <p>Time: {project.estimatedTime}</p>
          <p>Tools: {project.tools.join(', ')}</p>
        </div>
      ))}
      
      {recommendations.warnings.length > 0 && (
        <div>
          <h4>Warnings</h4>
          <ul>
            {recommendations.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};
```

### AR Scanning Component

```typescript
import { performARScan, getARScanningTips } from '@/services/arScanningService';

const ARScanner = ({ material }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const tips = getARScanningTips(material);

  const handleScan = async () => {
    setScanning(true);
    try {
      const scanResult = await performARScan(material);
      setResult(scanResult);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div>
      <h3>AR Material Scanning</h3>
      <div>
        <h4>Tips for Best Results</h4>
        <ul>
          {tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </div>
      
      <button onClick={handleScan} disabled={scanning}>
        {scanning ? 'Scanning...' : 'Start Scan'}
      </button>
      
      {result && (
        <div>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          <p>Condition: {result.properties.condition}</p>
        </div>
      )}
    </div>
  );
};
```

## Data Flow Diagram

```
User Input (Material, Category, etc.)
         ↓
Knowledge Base Query
         ↓
Expert System Analysis
         ↓
Recommendations Generated
         ↓
Image Generation / AR Scanning
         ↓
Results Displayed to User
```

## Performance Considerations

### Caching
- Image cache: Stores generated images
- Material cache: Pre-loaded materials
- Template cache: Pre-loaded templates

### Optimization
- Lazy load large datasets
- Use memoization for expensive calculations
- Batch queries when possible
- Implement pagination for large lists

## Error Handling

### Material Not Found
```typescript
const knowledge = expertSystem.getMaterialKnowledge(material);
if (!knowledge) {
  console.warn(`Material "${material}" not in knowledge base`);
  // Use generic guidelines
}
```

### Invalid Project
```typescript
const template = expertSystem.getProjectTemplate(templateId);
if (!template) {
  throw new Error(`Project template "${templateId}" not found`);
}
```

### AR Scan Failed
```typescript
try {
  const result = await performARScan(material);
} catch (error) {
  console.error('AR scan failed:', error);
  // Show error message to user
}
```

## Testing

### Unit Tests
```typescript
describe('Knowledge Base', () => {
  it('should get material knowledge', () => {
    const knowledge = expertSystem.getMaterialKnowledge('plastic bottle');
    expect(knowledge).toBeDefined();
    expect(knowledge?.name).toBe('Plastic Bottle');
  });

  it('should find projects for material', () => {
    const projects = expertSystem.findProjectsForMaterial('plastic bottle');
    expect(projects.length).toBeGreaterThan(0);
  });
});
```

### Integration Tests
```typescript
describe('Image Generation', () => {
  it('should generate image with knowledge base', async () => {
    const image = await generateImageWithKB({
      material: 'plastic bottle',
      category: 'Garden',
      projectName: 'Planter',
      style: 'eco_friendly'
    });
    expect(image.url).toBeDefined();
    expect(image.prompt).toContain('plastic bottle');
  });
});
```

## Deployment Checklist

- [ ] All knowledge base files created
- [ ] Services properly imported
- [ ] Upload functionality working
- [ ] Image generation configured
- [ ] AR scanning implemented
- [ ] Error handling in place
- [ ] Performance optimized
- [ ] Tests passing
- [ ] Documentation complete
- [ ] User feedback collected

## Support & Troubleshooting

### Common Issues

**1. Material not found in knowledge base**
- Check spelling
- Use available materials list
- Add new material if needed

**2. Image generation slow**
- Check API key
- Clear image cache
- Verify internet connection

**3. AR scanning not working**
- Check browser permissions
- Ensure good lighting
- Verify device support

## Next Steps

1. Integrate with all pages
2. Add user feedback mechanism
3. Implement analytics
4. Expand knowledge base
5. Add real AR implementation
6. Deploy to production

---

**Last Updated:** November 2025
**Version:** 1.0.0
