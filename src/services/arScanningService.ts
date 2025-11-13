// AR Scanning Service for ReVibe
// Provides AR-based material detection and analysis

import { expertSystem, ARScanningProfile } from './knowledgeBase';

export interface ScanResult {
  materialDetected: string;
  confidence: number;
  properties: {
    texture: string;
    color: string;
    size: string;
    condition: string;
  };
  recommendations: string[];
  warnings: string[];
  arProfiles: ARScanningProfile[];
  timestamp: string;
}

export interface ARScanConfig {
  enableMaterialDetection: boolean;
  enableDimensionMeasurement: boolean;
  enableColorAnalysis: boolean;
  enableConditionAssessment: boolean;
  lightingCondition: 'bright' | 'normal' | 'low';
  scanDistance: number; // in cm
}

/**
 * Simulate AR material scanning (in production, would use actual AR library)
 */
export const performARScan = async (
  materialName: string,
  config: ARScanConfig = {
    enableMaterialDetection: true,
    enableDimensionMeasurement: true,
    enableColorAnalysis: true,
    enableConditionAssessment: true,
    lightingCondition: 'normal',
    scanDistance: 25
  }
): Promise<ScanResult> => {
  try {
    console.log('Starting AR scan for:', materialName);

    const knowledge = expertSystem.getMaterialKnowledge(materialName);

    if (!knowledge) {
      throw new Error(`Material "${materialName}" not found in knowledge base`);
    }

    // Get AR recommendations
    const arRecommendations = expertSystem.getARRecommendations(materialName);

    // Simulate scan results
    const result: ScanResult = {
      materialDetected: knowledge.name,
      confidence: 0.85 + Math.random() * 0.15, // 85-100% confidence
      properties: {
        texture: knowledge.properties[0] || 'unknown',
        color: 'detected',
        size: 'medium',
        condition: 'good'
      },
      recommendations: arRecommendations.tips,
      warnings: knowledge.hazards,
      arProfiles: arRecommendations.profiles,
      timestamp: new Date().toISOString()
    };

    console.log('AR scan completed:', result);
    return result;
  } catch (error) {
    console.error('AR scan error:', error);
    throw error;
  }
};

/**
 * Get AR scanning tips for a material
 */
export const getARScanningTips = (materialName: string): string[] => {
  const knowledge = expertSystem.getMaterialKnowledge(materialName);

  if (!knowledge) {
    return [
      'Ensure good lighting conditions',
      'Keep object steady during scan',
      'Scan from multiple angles',
      'Avoid reflective surfaces',
      'Clean object surface before scanning'
    ];
  }

  return knowledge.processingTips;
};

/**
 * Validate AR scan conditions
 */
export const validateScanConditions = (
  config: ARScanConfig
): {
  isValid: boolean;
  issues: string[];
  recommendations: string[];
} => {
  const result = {
    isValid: true,
    issues: [] as string[],
    recommendations: [] as string[]
  };

  if (config.lightingCondition === 'low') {
    result.issues.push('Low lighting detected - scan accuracy may be reduced');
    result.recommendations.push('Move to a brighter location or use additional lighting');
  }

  if (config.scanDistance < 10) {
    result.issues.push('Scan distance too close - may cause focus issues');
    result.recommendations.push('Move device to 15-30 cm distance');
  } else if (config.scanDistance > 50) {
    result.issues.push('Scan distance too far - may reduce accuracy');
    result.recommendations.push('Move closer to the object (15-30 cm)');
  }

  if (!config.enableMaterialDetection && !config.enableDimensionMeasurement) {
    result.issues.push('No scan features enabled');
    result.recommendations.push('Enable at least one scan feature');
    result.isValid = false;
  }

  return result;
};

/**
 * Get optimal AR scanning profile for material
 */
export const getOptimalScanProfile = (materialName: string): ARScanningProfile | null => {
  const arRecommendations = expertSystem.getARRecommendations(materialName);
  return arRecommendations.profiles[0] || null;
};

/**
 * Analyze scan results and provide recommendations
 */
export const analyzeScanResults = (
  scanResult: ScanResult
): {
  analysis: string;
  nextSteps: string[];
  projectSuggestions: string[];
} => {
  const projects = expertSystem.findProjectsForMaterial(scanResult.materialDetected);

  return {
    analysis: `Material detected: ${scanResult.materialDetected} (${(scanResult.confidence * 100).toFixed(1)}% confidence). Properties: ${scanResult.properties.texture}, ${scanResult.properties.condition} condition.`,
    nextSteps: [
      'Review material properties and hazards',
      'Check processing tips',
      'Select a suitable project',
      'Gather required tools and materials'
    ],
    projectSuggestions: projects.map(p => p.name)
  };
};

/**
 * Generate AR scanning report
 */
export const generateScanReport = (scanResult: ScanResult): string => {
  const report = `
AR SCAN REPORT
==============
Timestamp: ${scanResult.timestamp}
Material: ${scanResult.materialDetected}
Confidence: ${(scanResult.confidence * 100).toFixed(1)}%

PROPERTIES
----------
Texture: ${scanResult.properties.texture}
Color: ${scanResult.properties.color}
Size: ${scanResult.properties.size}
Condition: ${scanResult.properties.condition}

WARNINGS
--------
${scanResult.warnings.length > 0 ? scanResult.warnings.map(w => `• ${w}`).join('\n') : 'No warnings'}

RECOMMENDATIONS
---------------
${scanResult.recommendations.map(r => `• ${r}`).join('\n')}

AR PROFILES USED
----------------
${scanResult.arProfiles.map(p => `• ${p.featureName}: ${p.detectionMethod}`).join('\n')}
  `;

  return report;
};

/**
 * Export scan data for analysis
 */
export const exportScanData = (scanResult: ScanResult): string => {
  return JSON.stringify(scanResult, null, 2);
};
