# ReVibe AI Integration & Reinforcement Learning System

## Overview
ReVibe is an intelligent upcycling education platform that uses NVIDIA's AI API to generate personalized project ideas, learning paths, and resources. The system implements reinforcement learning through user feedback to continuously improve recommendations.

## System Architecture

### 1. **AI Service** (`src/services/aiService.ts`)
Handles all interactions with NVIDIA's Nemotron AI model.

#### Key Functions:
- **`generateIdeaWithAI(request)`**: Generates creative upcycling project ideas based on:
  - Material type
  - Category (Education, Art, Home, etc.)
  - Complexity level (Low, Medium, High)
  - Budget constraints

- **`generateStepGuideWithAI(idea, materials)`**: Creates detailed step-by-step instructions for projects

- **`generateLearningResourcesWithAI(topic)`**: Suggests relevant learning resources

#### API Configuration:
```
API Endpoint: https://integrate.api.nvidia.com/v1/chat/completions
Model: nvidia/nemotron-nano-9b-v2:free
Authentication: Bearer token from VITE_NVIDIA_API_KEY
```

### 2. **Database Service** (`src/services/databaseService.ts`)
Local storage-based database for managing application data.

#### Data Models:
- **Project**: Upcycling projects with metadata and completion status
- **ProjectFeedback**: User ratings and feedback on projects
- **UserProfile**: User preferences and statistics
- **LearningResource**: Educational materials and resources

#### Database Collections:
- `revibe_projects`: All user projects
- `revibe_user_profile`: Current user profile
- `revibe_resources`: Learning resources
- `revibe_feedback`: User feedback history

### 3. **Reinforcement Learning System** (`src/services/reinforcementLearning.ts`)
Implements adaptive learning based on user feedback.

#### Key Algorithms:

**A. User Preference Calculation**
```
Analyzes high-rated projects to determine:
- Preferred complexity level
- Preferred category
- Preferred budget range
- Learning style
```

**B. Recommendation Scoring**
```
Score = (Complexity Match × 30%) 
       + (Category Match × 25%) 
       + (Budget Fit × 20%) 
       + (Learning Potential × 15%) 
       + (Difficulty Accuracy × 10%)
```

**C. Adaptive Learning**
- Adjusts project difficulty based on feedback
- Updates time and budget estimates
- Learns from user preferences over time

**D. Learning Progress Tracking**
```
Skill Levels:
- Beginner: < 3.5 learning gain, < 5 projects
- Intermediate: 3.5-4.2 learning gain, 5-10 projects
- Advanced: > 4.2 learning gain, > 10 projects

Progress Trends:
- Improving: Recent feedback > Older feedback + 0.5
- Declining: Recent feedback < Older feedback - 0.5
- Neutral: Otherwise
```

**E. Personalized Learning Paths**
Generates 4-phase learning journey:
1. Foundation (Beginner)
2. Exploration (Beginner-Intermediate)
3. Specialization (Intermediate)
4. Advanced Techniques (Intermediate-Advanced)
5. Mastery (Advanced)

## Setup Instructions

### 1. Environment Configuration
Create `.env.local` file in project root:
```env
VITE_NVIDIA_API_KEY=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
VITE_NVIDIA_MODEL=nvidia/nemotron-nano-9b-v2:free
```

### 2. Initialize Database
The database auto-initializes on first app load with:
- Default user profile
- 5 pre-loaded learning resources
- Empty projects and feedback collections

### 3. API Rate Limits
- Free tier: Limited requests per day
- Recommended: Cache responses when possible
- Implement error handling for API failures

## Features

### 1. **Intelligent Idea Generation**
- AI generates unique upcycling projects
- Considers budget, complexity, and category
- Provides materials list and step-by-step guide

### 2. **Personalized Learning Resources**
- Curated resources by topic and difficulty
- Multiple formats: Books, Articles, Videos, Courses, Websites
- Linked to learning outcomes

### 3. **Adaptive Learning Paths**
- Customized based on skill level
- Adjusts difficulty progression
- Recommends next projects

### 4. **Feedback System**
- 5-point rating scales for multiple aspects
- Captures difficulty accuracy
- Tracks time and budget accuracy
- Measures learning gain

### 5. **Analytics Dashboard**
- Learning progress visualization
- Skill level assessment
- Performance trends
- Recommendation quality scores

## Usage Examples

### Generate Project Idea
```typescript
import { generateIdeaWithAI } from '@/services/aiService';

const idea = await generateIdeaWithAI({
  material: 'plastic bottle',
  category: 'Education',
  complexity: 'Low',
  budget: 100
});
```

### Get Personalized Recommendations
```typescript
import { reinforcementLearning } from '@/services/reinforcementLearning';

const recommendations = reinforcementLearning.generateRecommendations(projects);
```

### Submit Project Feedback
```typescript
import { reinforcementLearning } from '@/services/reinforcementLearning';

reinforcementLearning.adaptToFeedback(projectId, {
  rating: 5,
  difficulty: 3,
  timeAccuracy: 4,
  budgetAccuracy: 4,
  learningGain: 5,
  comments: 'Great project!'
});
```

### Get Learning Progress
```typescript
const progress = reinforcementLearning.calculateLearningProgress();
// Returns: { skillLevel, completedProjects, progressTrend, ... }
```

## Data Flow

```
User Input
    ↓
AI Service (NVIDIA API)
    ↓
Project Generation
    ↓
Database Storage
    ↓
User Completes Project
    ↓
Feedback Collection (FeedbackModal)
    ↓
Reinforcement Learning Analysis
    ↓
Updated Recommendations
    ↓
Personalized Learning Path
```

## Learning Resources Included

### Default Resources:
1. **The Art of Upcycling** (Book)
   - Comprehensive guide to waste transformation
   - Beginner level

2. **Sustainable Living 101** (Course)
   - Environmental responsibility principles
   - Beginner level

3. **DIY Crafts for Everyone** (Video)
   - Step-by-step creative tutorials
   - Beginner level

4. **Plastic Waste Solutions** (Article)
   - Innovative plastic reuse methods
   - Intermediate level

5. **Creative Reuse Network** (Website)
   - Community platform for sharing ideas
   - Beginner level

## Performance Optimization

### Caching Strategy
- Cache AI responses for 24 hours
- Store user preferences locally
- Batch feedback processing

### Database Optimization
- Use localStorage for fast access
- Implement data cleanup for old projects
- Archive completed projects

## Error Handling

### API Errors
```typescript
try {
  const idea = await generateIdeaWithAI(request);
} catch (error) {
  console.error('AI Service Error:', error);
  // Fallback to template-based generation
}
```

### Database Errors
- Automatic fallback to empty state
- User data preserved in localStorage
- Graceful degradation

## Future Enhancements

1. **Backend Integration**
   - Replace localStorage with MongoDB
   - Implement user authentication
   - Multi-device sync

2. **Advanced AI Features**
   - Image recognition for material detection
   - Video generation for tutorials
   - Real-time collaboration

3. **Gamification**
   - Achievement badges
   - Leaderboards
   - Challenges and competitions

4. **Community Features**
   - Project sharing
   - Peer feedback
   - Mentorship programs

## Troubleshooting

### API Key Issues
- Verify key in `.env.local`
- Check NVIDIA API dashboard for rate limits
- Ensure key has correct permissions

### Feedback Not Saving
- Check browser localStorage limits
- Clear old data if storage full
- Verify database initialization

### Recommendations Not Personalizing
- Complete at least 3 projects with feedback
- Ensure feedback ratings are varied
- Check learning progress calculation

## Resources & Documentation

- **NVIDIA API Docs**: https://docs.nvidia.com/ai-enterprise/rag/latest/
- **ReVibe GitHub**: [Project Repository]
- **Upcycling Guide**: [Learning Resources]
- **Sustainability Resources**: [External Links]

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review error messages in browser console
3. Check localStorage data in DevTools
4. Contact support team

---

**Last Updated**: November 2024
**Version**: 1.0.0
