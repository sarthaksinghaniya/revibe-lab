# ReVibe Knowledge Base - Quick Start Guide

## 30-Second Overview

ReVibe now has a complete **Expert System** with a **Knowledge Base** that powers:
- 🖼️ Intelligent image generation
- 📱 AR material scanning
- 🎯 Smart project recommendations
- 🛡️ Safety warnings and tips

## Installation

Everything is already installed! Just import and use:

```typescript
import { expertSystem } from '@/services/knowledgeBase';
import { generateImageWithKB } from '@/services/imageGenerationService';
import { performARScan } from '@/services/arScanningService';
import * as KBUtils from '@/services/knowledgeBaseUtils';
```

## 5-Minute Tutorial

### 1. Get Material Info
```typescript
const material = expertSystem.getMaterialKnowledge('plastic bottle');
// Returns: { name, properties, recyclability, commonUses, hazards, processingTips, ... }
```

### 2. Find Projects
```typescript
const projects = expertSystem.findProjectsForMaterial('plastic bottle');
// Returns: [ProjectTemplate, ProjectTemplate, ...]
```

### 3. Generate Image
```typescript
const image = await generateImageWithKB({
  material: 'plastic bottle',
  category: 'Garden',
  projectName: 'Plastic Bottle Planter',
  style: 'eco_friendly'
});
// Returns: { url, prompt, style, timestamp, metadata }
```

### 4. Scan with AR
```typescript
const result = await performARScan('plastic bottle');
// Returns: { materialDetected, confidence, properties, recommendations, warnings, ... }
```

### 5. Get Recommendations
```typescript
const recommendations = KBUtils.getProjectRecommendations(
  'plastic bottle',
  'Garden',
  'Low',
  100
);
// Returns: { material, projects, imagePrompt, warnings, tips, ... }
```

## Common Tasks

### Display Material Properties
```typescript
const props = KBUtils.getMaterialProperties('plastic bottle');
console.log(props.properties);    // ['lightweight', 'transparent', ...]
console.log(props.recyclability); // 'high'
console.log(props.commonUses);    // ['containers', 'planters', ...]
```

### Get Safety Info
```typescript
const safety = KBUtils.getSafetyInfo('plastic bottle');
console.log(safety.hazards); // ['sharp edges after cutting', ...]
console.log(safety.tips);    // ['Wash thoroughly', 'Remove labels', ...]
```

### Find Similar Projects
```typescript
const similar = KBUtils.getSimilarProjects('template_1', 3);
// Returns: [ProjectTemplate, ProjectTemplate, ...]
```

### Search Projects
```typescript
const results = KBUtils.searchProjects('planter');
// Returns: [ProjectTemplate, ...]
```

### Get Project Details
```typescript
const steps = KBUtils.getProjectSteps('template_1');
const tools = KBUtils.getRequiredTools('template_1');
const time = KBUtils.getEstimatedTime('template_1');
const outcomes = KBUtils.getLearningOutcomes('template_1');
```

## Available Materials

```typescript
const materials = KBUtils.getAvailableMaterials();
// ['plastic bottle', 'old jeans', 'cardboard', 'glass jar', 'wood scraps', 'plastic bags', 'tin cans']
```

## Available Categories

- Education
- Art
- Home
- Fashion
- Tech
- Robotics
- Gaming
- Sports
- Garden
- Kitchen
- Furniture
- Jewelry
- Toys
- Music
- Storage

## Complexity Levels

- Low
- Medium
- High

## Image Styles

- professional (4K, studio lighting)
- artistic (2K, creative effects)
- minimalist (1080p, clean)
- eco_friendly (2K, natural)

## Real-World Examples

### Example 1: Complete Project Flow
```typescript
// User selects material and category
const material = 'plastic bottle';
const category = 'Garden';
const complexity = 'Low';
const budget = 100;

// Get recommendations
const recommendations = KBUtils.getProjectRecommendations(
  material, category, complexity, budget
);

// Validate feasibility
const validation = KBUtils.validateProjectFeasibility(
  material, 'template_1', budget, complexity
);

if (validation.isFeasible) {
  // Generate image
  const image = await generateImageWithKB({
    material,
    category,
    projectName: 'Plastic Bottle Planter',
    style: 'eco_friendly'
  });
  
  // Get project details
  const steps = KBUtils.getProjectSteps('template_1');
  const tools = KBUtils.getRequiredTools('template_1');
  
  // Display to user
  displayProject({ image, steps, tools, recommendations });
}
```

### Example 2: AR Scanning Flow
```typescript
// User scans material
const scanResult = await performARScan('plastic bottle');

// Analyze results
const analysis = KBUtils.getSafetyInfo(scanResult.materialDetected);

// Get projects for detected material
const projects = expertSystem.findProjectsForMaterial(
  scanResult.materialDetected
);

// Display results
displayScanResults({ scanResult, analysis, projects });
```

### Example 3: Material Search
```typescript
// User searches for projects
const keyword = 'planter';
const results = KBUtils.searchProjects(keyword);

// Filter by category
const gardenProjects = results.filter(p => p.category === 'Garden');

// Sort by difficulty
const easyProjects = gardenProjects.filter(p => p.difficulty === 'Low');

// Display results
displaySearchResults(easyProjects);
```

## Error Handling

### Material Not Found
```typescript
const material = expertSystem.getMaterialKnowledge('unknown');
if (!material) {
  console.warn('Material not in knowledge base');
  // Use generic guidelines
}
```

### Project Not Found
```typescript
const project = expertSystem.getProjectTemplate('invalid_id');
if (!project) {
  console.error('Project template not found');
  // Handle error
}
```

### AR Scan Failed
```typescript
try {
  const result = await performARScan('plastic bottle');
} catch (error) {
  console.error('AR scan failed:', error);
  // Show error to user
}
```

## Performance Tips

1. **Cache results** - Store frequently accessed data
2. **Batch queries** - Combine multiple queries when possible
3. **Lazy load** - Load data only when needed
4. **Use utilities** - They're optimized for common tasks

## Debugging

### Check Knowledge Base Integrity
```typescript
const validation = KBUtils.validateKnowledgeBase();
console.log(validation.isValid);  // true/false
console.log(validation.issues);   // Array of issues
```

### Get KB Statistics
```typescript
const stats = KBUtils.getKnowledgeBaseStats();
console.log(stats.totalMaterials);
console.log(stats.totalTemplates);
console.log(stats.categoryCount);
```

### Export Data
```typescript
const data = KBUtils.exportKnowledgeBaseData();
console.log(data); // { materials, templates, timestamp }
```

## Component Integration

### In React Component
```typescript
import { useEffect, useState } from 'react';
import * as KBUtils from '@/services/knowledgeBaseUtils';

export const MyComponent = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const mats = KBUtils.getAvailableMaterials();
    setMaterials(mats);
  }, []);

  return (
    <select>
      {materials.map(m => (
        <option key={m} value={m}>{m}</option>
      ))}
    </select>
  );
};
```

## Documentation

- **Full Guide:** `KNOWLEDGE_BASE_GUIDE.md`
- **Integration:** `INTEGRATION_GUIDE.md`
- **Summary:** `IMPLEMENTATION_SUMMARY.md`

## Support

### Common Questions

**Q: How do I add a new material?**
A: Edit `src/services/knowledgeBase.ts` and add to `MATERIAL_KNOWLEDGE` object.

**Q: How do I add a new project?**
A: Edit `src/services/knowledgeBase.ts` and add to `PROJECT_TEMPLATES` array.

**Q: How do I customize image generation?**
A: Use the `style` parameter in `generateImageWithKB()` or edit `IMAGE_GENERATION_CONFIGS`.

**Q: How do I enable real AR?**
A: Replace the simulation in `arScanningService.ts` with actual AR library (AR.js, etc).

**Q: Can I use this offline?**
A: Yes! All data is in-memory. Image generation requires API key.

## Next Steps

1. ✅ Upload functionality working
2. ✅ Knowledge base ready
3. ✅ Expert system ready
4. 📋 Integrate with all pages
5. 📋 Test thoroughly
6. 📋 Deploy to production

## Cheat Sheet

```typescript
// Get everything about a material
expertSystem.getMaterialKnowledge('plastic bottle')

// Find projects for material
expertSystem.findProjectsForMaterial('plastic bottle')

// Generate image
generateImageWithKB({ material, category, projectName, style })

// Scan with AR
performARScan('plastic bottle')

// Get recommendations
KBUtils.getProjectRecommendations(material, category, complexity, budget)

// Get safety info
KBUtils.getSafetyInfo('plastic bottle')

// Search projects
KBUtils.searchProjects('keyword')

// Get all materials
KBUtils.getAvailableMaterials()

// Validate project
KBUtils.validateProjectFeasibility(material, templateId, budget, complexity)
```

---

**Ready to use!** Start integrating with your components. 🚀

For detailed information, see the full documentation files.
