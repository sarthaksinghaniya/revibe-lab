import { feedbackDB, projectsDB } from './databaseService';

export interface UserPreferences {
  preferredComplexity: string;
  preferredCategory: string;
  preferredBudgetRange: [number, number];
  learningStyle: 'visual' | 'practical' | 'theoretical' | 'mixed';
}

export interface RecommendationScore {
  projectId: string;
  score: number;
  reasons: string[];
}

// Reinforcement Learning System
export const reinforcementLearning = {
  // Calculate user preferences based on feedback history
  calculateUserPreferences: (): UserPreferences => {
    const feedbacks = feedbackDB.getAll();
    const projects = projectsDB.getAll();

    if (feedbacks.length === 0) {
      return {
        preferredComplexity: 'Low',
        preferredCategory: 'Education',
        preferredBudgetRange: [50, 500],
        learningStyle: 'mixed',
      };
    }

    // Analyze feedback to determine preferences
    const highRatedProjects = feedbacks
      .filter((f: any) => f.rating >= 4)
      .map((f: any) => projects.find(p => p.id === f.projectId))
      .filter(Boolean);

    const complexityScores: { [key: string]: number } = {};
    const categoryScores: { [key: string]: number } = {};
    let totalBudget = 0;
    let budgetCount = 0;

    highRatedProjects.forEach((project: any) => {
      if (project) {
        complexityScores[project.complexity] = (complexityScores[project.complexity] || 0) + 1;
        categoryScores[project.category] = (categoryScores[project.category] || 0) + 1;
        totalBudget += project.budget;
        budgetCount++;
      }
    });

    const preferredComplexity = Object.keys(complexityScores).sort(
      (a, b) => complexityScores[b] - complexityScores[a]
    )[0] || 'Low';

    const preferredCategory = Object.keys(categoryScores).sort(
      (a, b) => categoryScores[b] - categoryScores[a]
    )[0] || 'Education';

    const avgBudget = budgetCount > 0 ? totalBudget / budgetCount : 250;

    return {
      preferredComplexity,
      preferredCategory,
      preferredBudgetRange: [Math.max(50, avgBudget - 100), avgBudget + 100],
      learningStyle: 'mixed',
    };
  },

  // Generate recommendations based on user history
  generateRecommendations: (availableProjects: any[]): RecommendationScore[] => {
    const preferences = reinforcementLearning.calculateUserPreferences();
    const feedbacks = feedbackDB.getAll();
    const analytics = feedbackDB.getAnalytics();

    return availableProjects
      .map(project => {
        let score = 0;
        const reasons: string[] = [];

        // Complexity match (weight: 30%)
        if (project.complexity === preferences.preferredComplexity) {
          score += 30;
          reasons.push('Matches your preferred complexity level');
        } else if (
          (preferences.preferredComplexity === 'Low' && project.complexity === 'Low') ||
          (preferences.preferredComplexity === 'Medium' && ['Low', 'Medium'].includes(project.complexity)) ||
          (preferences.preferredComplexity === 'High' && project.complexity === 'High')
        ) {
          score += 15;
          reasons.push('Similar to your preferred complexity');
        }

        // Category match (weight: 25%)
        if (project.category === preferences.preferredCategory) {
          score += 25;
          reasons.push('Matches your preferred category');
        }

        // Budget fit (weight: 20%)
        if (
          project.budget >= preferences.preferredBudgetRange[0] &&
          project.budget <= preferences.preferredBudgetRange[1]
        ) {
          score += 20;
          reasons.push('Within your preferred budget range');
        }

        // Learning gain potential (weight: 15%)
        if (parseFloat(String(analytics.averageLearningGain)) > 4) {
          score += 15;
          reasons.push('High learning potential based on user feedback');
        }

        // Difficulty accuracy (weight: 10%)
        if (parseFloat(String(analytics.averageDifficulty)) > 3.5) {
          score += 10;
          reasons.push('Well-calibrated difficulty level');
        }

        return {
          projectId: project.id,
          score: Math.min(100, score),
          reasons,
        };
      })
      .sort((a, b) => b.score - a.score);
  },

  // Adaptive learning - adjust future recommendations based on feedback
  adaptToFeedback: (projectId: string, feedback: any) => {
    const project = projectsDB.getById(projectId);
    if (!project) return;

    // Store feedback for analysis
    feedbackDB.saveFeedback(projectId, feedback);

    // Update project based on feedback
    if (feedback.difficulty > 4) {
      // Project was too hard, mark for easier recommendations
      project.complexity = 'Low';
    } else if (feedback.difficulty < 2) {
      // Project was too easy, mark for harder recommendations
      project.complexity = 'High';
    }

    if (feedback.timeAccuracy < 3) {
      // Actual time was significantly different, update estimate
      // This would be used for future time estimates
    }

    projectsDB.save(project);
  },

  // Calculate learning progress
  calculateLearningProgress: () => {
    const feedbacks = feedbackDB.getAll();
    const projects = projectsDB.getAll();

    if (feedbacks.length === 0) {
      return {
        totalProjects: 0,
        completedProjects: 0,
        averageLearningGain: 0,
        progressTrend: 'neutral',
        skillLevel: 'Beginner',
      };
    }

    const completedProjects = projects.filter(p => p.completionStatus === 100).length;
    const analytics = feedbackDB.getAnalytics();

    let skillLevel = 'Beginner';
    const avgLearning = parseFloat(String(analytics.averageLearningGain));
    if (avgLearning > 3.5 && completedProjects > 5) {
      skillLevel = 'Intermediate';
    }
    if (avgLearning > 4.2 && completedProjects > 10) {
      skillLevel = 'Advanced';
    }

    // Calculate trend (comparing recent vs older feedback)
    const recentFeedbacks = feedbacks.slice(-5);
    const olderFeedbacks = feedbacks.slice(0, Math.max(1, feedbacks.length - 5));

    const recentAvg = recentFeedbacks.length > 0 
      ? recentFeedbacks.reduce((sum: number, f: any) => sum + (f.learningGain || 0), 0) / recentFeedbacks.length 
      : 0;
    const olderAvg = olderFeedbacks.length > 0 
      ? olderFeedbacks.reduce((sum: number, f: any) => sum + (f.learningGain || 0), 0) / olderFeedbacks.length 
      : 0;

    let progressTrend = 'neutral';
    if (recentAvg > olderAvg + 0.5) {
      progressTrend = 'improving';
    } else if (recentAvg < olderAvg - 0.5) {
      progressTrend = 'declining';
    }

    return {
      totalProjects: projects.length,
      completedProjects,
      averageLearningGain: parseFloat(String(analytics.averageLearningGain)),
      progressTrend,
      skillLevel,
    };
  },

  // Get personalized learning path
  getPersonalizedLearningPath: () => {
    const progress = reinforcementLearning.calculateLearningProgress();
    const preferences = reinforcementLearning.calculateUserPreferences();

    const path = [];

    if (progress.skillLevel === 'Beginner') {
      path.push({
        phase: 'Foundation',
        description: 'Master basic upcycling techniques',
        recommendedComplexity: 'Low',
        estimatedDuration: '2-3 weeks',
      });
      path.push({
        phase: 'Exploration',
        description: 'Try different categories and materials',
        recommendedComplexity: 'Low-Medium',
        estimatedDuration: '3-4 weeks',
      });
    } else if (progress.skillLevel === 'Intermediate') {
      path.push({
        phase: 'Specialization',
        description: `Focus on ${preferences.preferredCategory} projects`,
        recommendedComplexity: 'Medium',
        estimatedDuration: '4-6 weeks',
      });
      path.push({
        phase: 'Advanced Techniques',
        description: 'Learn advanced upcycling methods',
        recommendedComplexity: 'Medium-High',
        estimatedDuration: '6-8 weeks',
      });
    } else {
      path.push({
        phase: 'Mastery',
        description: 'Create complex, innovative projects',
        recommendedComplexity: 'High',
        estimatedDuration: 'Ongoing',
      });
      path.push({
        phase: 'Mentorship',
        description: 'Share knowledge and mentor others',
        recommendedComplexity: 'Varied',
        estimatedDuration: 'Ongoing',
      });
    }

    return path;
  },

  // Quality score for project recommendations
  calculateQualityScore: (projectId: string): number => {
    const feedbacks = feedbackDB.getByProjectId(projectId);
    if (feedbacks.length === 0) return 0;

    const avgRating = feedbacks.reduce((sum: number, f: any) => sum + (f.rating || 0), 0) / feedbacks.length;
    const avgLearning = feedbacks.reduce((sum: number, f: any) => sum + (f.learningGain || 0), 0) / feedbacks.length;

    return (avgRating * 0.6 + avgLearning * 0.4) * 20; // Convert to 0-100 scale
  },
};
