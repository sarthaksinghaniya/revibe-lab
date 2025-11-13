// Knowledge Base Utilities
// Helper functions for integrating knowledge base throughout the app

import { expertSystem } from './knowledgeBase';
import { generateImageWithKB } from './imageGenerationService';
import { performARScan } from './arScanningService';

/**
 * Get comprehensive project recommendations
 */
export const getProjectRecommendations = (
  material: string,
  category: string,
  complexity: string,
  budget: number
) => {
  const analysis = expertSystem.analyzeProject(material, category, complexity, budget);

  return {
    material: analysis.suitableMaterial,
    projects: analysis.recommendedTemplates,
    imagePrompt: analysis.imagePrompt,
    arProfiles: analysis.arRecommendations,
    warnings: analysis.warnings,
    tips: analysis.tips,
    processingSteps: analysis.suitableMaterial?.processingTips || [],
    hazards: analysis.suitableMaterial?.hazards || []
  };
};

/**
 * Generate enhanced project description using knowledge base
 */
export const generateProjectDescription = (
  material: string,
  category: string,
  projectName: string
): string => {
  const knowledge = expertSystem.getMaterialKnowledge(material);

  if (!knowledge) {
    return `Create an innovative ${category.toLowerCase()} project using ${material}. This eco-friendly project teaches upcycling principles while creating something practical and beautiful.`;
  }

  const uses = knowledge.commonUses.slice(0, 2).join(' or ');
  const properties = knowledge.properties.slice(0, 2).join(', ');

  return `Transform ${material} into a ${category.toLowerCase()} project. This ${properties} material is perfect for creating ${uses}. Learn sustainable practices while building something creative and functional.`;
};

/**
 * Get safety information for material
 */
export const getSafetyInfo = (material: string) => {
  const knowledge = expertSystem.getMaterialKnowledge(material);

  if (!knowledge) {
    return {
      hazards: ['Unknown material - exercise caution'],
      tips: ['Research material properties before use', 'Wear appropriate safety equipment']
    };
  }

  return {
    hazards: knowledge.hazards,
    tips: knowledge.processingTips
  };
};

/**
 * Get material properties for display
 */
export const getMaterialProperties = (material: string) => {
  const knowledge = expertSystem.getMaterialKnowledge(material);

  if (!knowledge) {
    return {
      name: material,
      properties: [],
      recyclability: 'unknown' as const,
      commonUses: []
    };
  }

  return {
    name: knowledge.name,
    properties: knowledge.properties,
    recyclability: knowledge.recyclability,
    commonUses: knowledge.commonUses
  };
};

/**
 * Validate project feasibility
 */
export const validateProjectFeasibility = (
  material: string,
  templateId: string,
  budget: number,
  complexity: string
) => {
  const validation = expertSystem.validateMaterialForProject(material, templateId);
  const template = expertSystem.getProjectTemplate(templateId);

  const result = {
    isFeasible: validation.isValid,
    warnings: validation.warnings,
    tips: validation.tips,
    budgetOk: true,
    complexityOk: true,
    issues: [] as string[]
  };

  if (!template) {
    result.isFeasible = false;
    result.issues.push('Project template not found');
    return result;
  }

  // Check budget
  if (budget < 50) {
    result.budgetOk = false;
    result.issues.push('Budget may be too low for quality materials');
  }

  // Check complexity match
  if (template.difficulty !== complexity) {
    result.complexityOk = false;
    result.issues.push(`Project difficulty (${template.difficulty}) doesn't match selected level (${complexity})`);
  }

  result.isFeasible = validation.isValid && result.budgetOk && result.complexityOk;

  return result;
};

/**
 * Get learning outcomes for project
 */
export const getLearningOutcomes = (templateId: string): string[] => {
  const template = expertSystem.getProjectTemplate(templateId);
  return template?.learningOutcomes || [];
};

/**
 * Get tools required for project
 */
export const getRequiredTools = (templateId: string): string[] => {
  const template = expertSystem.getProjectTemplate(templateId);
  return template?.tools || [];
};

/**
 * Get estimated time for project
 */
export const getEstimatedTime = (templateId: string): string => {
  const template = expertSystem.getProjectTemplate(templateId);
  return template?.estimatedTime || 'Unknown';
};

/**
 * Get step-by-step instructions
 */
export const getProjectSteps = (templateId: string): string[] => {
  const template = expertSystem.getProjectTemplate(templateId);
  return template?.steps || [];
};

/**
 * Format material for display
 */
export const formatMaterialName = (material: string): string => {
  return material
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get all available materials
 */
export const getAvailableMaterials = (): string[] => {
  return expertSystem.getAllMaterials();
};

/**
 * Get all project templates
 */
export const getAllProjectTemplates = () => {
  return expertSystem['templates'] || [];
};

/**
 * Search projects by keyword
 */
export const searchProjects = (keyword: string) => {
  const templates = expertSystem['templates'] || [];
  const lowerKeyword = keyword.toLowerCase();

  return templates.filter(
    template =>
      template.name.toLowerCase().includes(lowerKeyword) ||
      template.category.toLowerCase().includes(lowerKeyword) ||
      template.materials.some(m => m.toLowerCase().includes(lowerKeyword))
  );
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category: string) => {
  const templates = expertSystem['templates'] || [];
  return templates.filter(t => t.category === category);
};

/**
 * Get projects by difficulty
 */
export const getProjectsByDifficulty = (difficulty: string) => {
  const templates = expertSystem['templates'] || [];
  return templates.filter(t => t.difficulty === difficulty);
};

/**
 * Calculate project complexity score
 */
export const calculateComplexityScore = (templateId: string): number => {
  const template = expertSystem.getProjectTemplate(templateId);
  if (!template) return 0;

  const difficultyMap = { 'Low': 1, 'Medium': 2, 'High': 3 };
  const stepsScore = Math.min(template.steps.length / 10, 1);
  const toolsScore = Math.min(template.tools.length / 5, 1);
  const difficultyScore = (difficultyMap[template.difficulty as keyof typeof difficultyMap] || 1) / 3;

  return (stepsScore + toolsScore + difficultyScore) / 3;
};

/**
 * Get similar projects
 */
export const getSimilarProjects = (templateId: string, limit: number = 3) => {
  const template = expertSystem.getProjectTemplate(templateId);
  if (!template) return [];

  const templates = expertSystem['templates'] || [];
  const similar = templates
    .filter(t => t.id !== templateId && t.category === template.category)
    .slice(0, limit);

  return similar;
};

/**
 * Generate project summary
 */
export const generateProjectSummary = (templateId: string): string => {
  const template = expertSystem.getProjectTemplate(templateId);
  if (!template) return 'Project not found';

  return `
${template.name}
Category: ${template.category}
Difficulty: ${template.difficulty}
Time: ${template.estimatedTime}
Materials: ${template.materials.join(', ')}
Tools: ${template.tools.join(', ')}

Steps: ${template.steps.length}
Learning Outcomes: ${template.learningOutcomes.length}
  `.trim();
};

/**
 * Export knowledge base data
 */
export const exportKnowledgeBaseData = () => {
  return {
    materials: expertSystem.getAllMaterials(),
    templates: expertSystem['templates'] || [],
    timestamp: new Date().toISOString()
  };
};

/**
 * Get knowledge base statistics
 */
export const getKnowledgeBaseStats = () => {
  const materials = expertSystem.getAllMaterials();
  const templates = expertSystem['templates'] || [];

  const categoryCount: Record<string, number> = {};
  const difficultyCount: Record<string, number> = {};

  templates.forEach(t => {
    categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    difficultyCount[t.difficulty] = (difficultyCount[t.difficulty] || 0) + 1;
  });

  return {
    totalMaterials: materials.length,
    totalTemplates: templates.length,
    categories: Object.keys(categoryCount),
    categoryCount,
    difficultyCount,
    averageStepsPerProject: templates.length > 0
      ? templates.reduce((sum, t) => sum + t.steps.length, 0) / templates.length
      : 0
  };
};

/**
 * Validate knowledge base integrity
 */
export const validateKnowledgeBase = () => {
  const issues: string[] = [];

  const materials = expertSystem.getAllMaterials();
  const templates = expertSystem['templates'] || [];

  // Check for empty materials
  if (materials.length === 0) {
    issues.push('No materials in knowledge base');
  }

  // Check for empty templates
  if (templates.length === 0) {
    issues.push('No project templates in knowledge base');
  }

  // Check template material references
  templates.forEach(template => {
    template.materials.forEach(material => {
      if (!expertSystem.getMaterialKnowledge(material)) {
        issues.push(`Template "${template.name}" references unknown material: ${material}`);
      }
    });
  });

  return {
    isValid: issues.length === 0,
    issues
  };
};
