// Local storage-based database service for ReVibe
// In production, this would connect to a backend database

export interface Project {
  id: string;
  idea: string;
  material: string;
  category: string;
  complexity: string;
  budget: number;
  description: string;
  estimatedTime: string;
  materials: string[];
  steps: string[];
  learningOutcomes: string[];
  createdAt: string;
  completionStatus: number; // 0-100
  feedback?: ProjectFeedback;
}

export interface ProjectFeedback {
  rating: number; // 1-5
  difficulty: number; // 1-5 (actual vs expected)
  timeAccuracy: number; // 1-5 (actual vs estimated)
  budgetAccuracy: number; // 1-5 (actual vs budget)
  comments: string;
  completedAt?: string;
  learningGain: number; // 1-5
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  preferredComplexity: string;
  preferredCategory: string;
  totalProjectsCompleted: number;
  averageRating: number;
  createdAt: string;
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  type: 'book' | 'article' | 'video' | 'course' | 'website';
  url?: string;
  topic: string;
  difficulty: string;
  createdAt: string;
}

const DB_PREFIX = 'revibe_';

// Projects Database
export const projectsDB = {
  save: (project: Project) => {
    const projects = projectsDB.getAll();
    const existingIndex = projects.findIndex(p => p.id === project.id);
    
    if (existingIndex > -1) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }
    
    localStorage.setItem(`${DB_PREFIX}projects`, JSON.stringify(projects));
    return project;
  },

  getAll: (): Project[] => {
    const data = localStorage.getItem(`${DB_PREFIX}projects`);
    return data ? JSON.parse(data) : [];
  },

  getById: (id: string): Project | null => {
    const projects = projectsDB.getAll();
    return projects.find(p => p.id === id) || null;
  },

  delete: (id: string) => {
    const projects = projectsDB.getAll();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem(`${DB_PREFIX}projects`, JSON.stringify(filtered));
  },

  updateProgress: (id: string, progress: number) => {
    const project = projectsDB.getById(id);
    if (project) {
      project.completionStatus = progress;
      projectsDB.save(project);
    }
  },

  addFeedback: (id: string, feedback: ProjectFeedback) => {
    const project = projectsDB.getById(id);
    if (project) {
      project.feedback = feedback;
      projectsDB.save(project);
    }
  },
};

// User Profile Database
export const userProfileDB = {
  save: (profile: UserProfile) => {
    localStorage.setItem(`${DB_PREFIX}user_profile`, JSON.stringify(profile));
    return profile;
  },

  get: (): UserProfile | null => {
    const data = localStorage.getItem(`${DB_PREFIX}user_profile`);
    return data ? JSON.parse(data) : null;
  },

  updateStats: (totalCompleted: number, averageRating: number) => {
    const profile = userProfileDB.get();
    if (profile) {
      profile.totalProjectsCompleted = totalCompleted;
      profile.averageRating = averageRating;
      userProfileDB.save(profile);
    }
  },
};

// Learning Resources Database
export const resourcesDB = {
  save: (resource: LearningResource) => {
    const resources = resourcesDB.getAll();
    resources.push(resource);
    localStorage.setItem(`${DB_PREFIX}resources`, JSON.stringify(resources));
    return resource;
  },

  getAll: (): LearningResource[] => {
    const data = localStorage.getItem(`${DB_PREFIX}resources`);
    return data ? JSON.parse(data) : [];
  },

  getByTopic: (topic: string): LearningResource[] => {
    const resources = resourcesDB.getAll();
    return resources.filter(r => r.topic.toLowerCase().includes(topic.toLowerCase()));
  },

  getByType: (type: string): LearningResource[] => {
    const resources = resourcesDB.getAll();
    return resources.filter(r => r.type === type);
  },

  delete: (id: string) => {
    const resources = resourcesDB.getAll();
    const filtered = resources.filter(r => r.id !== id);
    localStorage.setItem(`${DB_PREFIX}resources`, JSON.stringify(filtered));
  },
};

// Feedback & Analytics
export const feedbackDB = {
  saveFeedback: (projectId: string, feedback: ProjectFeedback) => {
    const feedbacks = feedbackDB.getAll();
    feedbacks.push({
      projectId,
      ...feedback,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(`${DB_PREFIX}feedback`, JSON.stringify(feedbacks));
  },

  getAll: () => {
    const data = localStorage.getItem(`${DB_PREFIX}feedback`);
    return data ? JSON.parse(data) : [];
  },

  getByProjectId: (projectId: string) => {
    const feedbacks = feedbackDB.getAll();
    return feedbacks.filter((f: any) => f.projectId === projectId);
  },

  getAnalytics: () => {
    const feedbacks = feedbackDB.getAll();
    if (feedbacks.length === 0) {
      return {
        averageRating: 0,
        averageDifficulty: 0,
        averageTimeAccuracy: 0,
        averageBudgetAccuracy: 0,
        averageLearningGain: 0,
        totalFeedback: 0,
      };
    }

    return {
      averageRating: (feedbacks.reduce((sum: number, f: any) => sum + f.rating, 0) / feedbacks.length).toFixed(2),
      averageDifficulty: (feedbacks.reduce((sum: number, f: any) => sum + f.difficulty, 0) / feedbacks.length).toFixed(2),
      averageTimeAccuracy: (feedbacks.reduce((sum: number, f: any) => sum + f.timeAccuracy, 0) / feedbacks.length).toFixed(2),
      averageBudgetAccuracy: (feedbacks.reduce((sum: number, f: any) => sum + f.budgetAccuracy, 0) / feedbacks.length).toFixed(2),
      averageLearningGain: (feedbacks.reduce((sum: number, f: any) => sum + f.learningGain, 0) / feedbacks.length).toFixed(2),
      totalFeedback: feedbacks.length,
    };
  },
};

// Initialize default data
export const initializeDatabase = () => {
  // Check if already initialized
  if (localStorage.getItem(`${DB_PREFIX}initialized`)) {
    return;
  }

  // Create default user profile
  const defaultUser: UserProfile = {
    userId: `user_${Date.now()}`,
    name: 'ReVibe User',
    email: 'user@revibe.local',
    preferredComplexity: 'Low',
    preferredCategory: 'Education',
    totalProjectsCompleted: 0,
    averageRating: 0,
    createdAt: new Date().toISOString(),
  };

  userProfileDB.save(defaultUser);

  // Add some default learning resources
  const defaultResources: LearningResource[] = [
    {
      id: 'res_1',
      title: 'The Art of Upcycling',
      description: 'A comprehensive guide to transforming waste into wonderful creations',
      type: 'book',
      url: 'https://www.amazon.com/Art-Upcycling-Creative-Sustainable-Projects/s?k=upcycling+books',
      topic: 'Upcycling Basics',
      difficulty: 'Beginner',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res_2',
      title: 'Sustainable Living 101',
      description: 'Learn the principles of sustainable living and environmental responsibility',
      type: 'course',
      url: 'https://www.coursera.org/courses?query=sustainable%20living',
      topic: 'Sustainability',
      difficulty: 'Beginner',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res_3',
      title: 'DIY Crafts for Everyone',
      description: 'Step-by-step video tutorials for creative DIY projects',
      type: 'video',
      url: 'https://www.youtube.com/results?search_query=DIY+crafts+tutorials',
      topic: 'DIY Crafts',
      difficulty: 'Beginner',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res_4',
      title: 'Plastic Waste Solutions',
      description: 'Innovative ways to repurpose plastic waste',
      type: 'article',
      url: 'https://www.nationalgeographic.com/environment/article/plastic-pollution',
      topic: 'Plastic Recycling',
      difficulty: 'Intermediate',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res_5',
      title: 'Creative Reuse Network',
      description: 'Community platform for sharing upcycling ideas and resources',
      type: 'website',
      url: 'https://www.creativereuse.org',
      topic: 'Community',
      difficulty: 'Beginner',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res_6',
      title: 'Instructables - DIY Projects',
      description: 'Thousands of step-by-step DIY and craft projects from the community',
      type: 'website',
      url: 'https://www.instructables.com',
      topic: 'DIY Projects',
      difficulty: 'Beginner',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res_7',
      title: 'TED Talks - Sustainability',
      description: 'Inspiring talks about sustainable living and environmental innovation',
      type: 'video',
      url: 'https://www.ted.com/search?q=sustainability',
      topic: 'Sustainability',
      difficulty: 'Beginner',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res_8',
      title: 'Skillshare - Upcycling Classes',
      description: 'Online classes teaching upcycling and creative reuse techniques',
      type: 'course',
      url: 'https://www.skillshare.com/search?query=upcycling',
      topic: 'Upcycling',
      difficulty: 'Beginner',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res_9',
      title: 'Ellen MacArthur Foundation',
      description: 'Resources about circular economy and sustainable design',
      type: 'website',
      url: 'https://www.ellenmacarthurfoundation.org',
      topic: 'Circular Economy',
      difficulty: 'Intermediate',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res_10',
      title: 'Recycling Guide - EPA',
      description: 'Official guide on what can be recycled and proper recycling practices',
      type: 'article',
      url: 'https://www.epa.gov/recycle',
      topic: 'Recycling',
      difficulty: 'Beginner',
      createdAt: new Date().toISOString(),
    },
  ];

  defaultResources.forEach(resource => resourcesDB.save(resource));

  localStorage.setItem(`${DB_PREFIX}initialized`, 'true');
};
