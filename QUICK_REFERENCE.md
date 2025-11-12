# ReVibe Quick Reference Guide

## 🚀 Quick Start

### 1. Start Development Server
```bash
npm run dev
```
App runs at: `http://localhost:5173`

### 2. Environment Setup
Create `.env.local`:
```env
VITE_NVIDIA_API_KEY=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
VITE_NVIDIA_MODEL=nvidia/nemotron-nano-9b-v2:free
```

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/services/aiService.ts` | NVIDIA AI integration |
| `src/services/databaseService.ts` | Data storage & management |
| `src/services/reinforcementLearning.ts` | ML recommendations |
| `src/components/FeedbackModal.tsx` | User feedback collection |
| `src/pages/GenerateIdea.tsx` | Project generation page |
| `src/pages/Learn.tsx` | Learning resources & paths |
| `src/theme/globalStyles.ts` | Global styles (scrollbar hidden) |

---

## 🤖 AI Integration

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

### Generate Step Guide
```typescript
import { generateStepGuideWithAI } from '@/services/aiService';

const steps = await generateStepGuideWithAI(
  'Desk Organizer from Plastic Bottle',
  ['plastic bottle', 'scissors', 'paint']
);
```

### Get Learning Resources
```typescript
import { generateLearningResourcesWithAI } from '@/services/aiService';

const resources = await generateLearningResourcesWithAI('Upcycling');
```

---

## 💾 Database Operations

### Save Project
```typescript
import { projectsDB } from '@/services/databaseService';

projectsDB.save({
  id: 'proj_1',
  idea: 'Desk Organizer',
  material: 'plastic bottle',
  // ... other fields
});
```

### Get All Projects
```typescript
const projects = projectsDB.getAll();
```

### Add Feedback
```typescript
projectsDB.addFeedback('proj_1', {
  rating: 5,
  difficulty: 3,
  timeAccuracy: 4,
  budgetAccuracy: 4,
  learningGain: 5,
  comments: 'Great project!'
});
```

### Get Learning Resources
```typescript
import { resourcesDB } from '@/services/databaseService';

const allResources = resourcesDB.getAll();
const topicResources = resourcesDB.getByTopic('Upcycling');
const videoResources = resourcesDB.getByType('video');
```

---

## 🧠 Reinforcement Learning

### Get Recommendations
```typescript
import { reinforcementLearning } from '@/services/reinforcementLearning';

const recommendations = reinforcementLearning.generateRecommendations(projects);
// Returns: [{ projectId, score, reasons }, ...]
```

### Calculate User Preferences
```typescript
const prefs = reinforcementLearning.calculateUserPreferences();
// Returns: { preferredComplexity, preferredCategory, preferredBudgetRange, ... }
```

### Get Learning Progress
```typescript
const progress = reinforcementLearning.calculateLearningProgress();
// Returns: { skillLevel, completedProjects, progressTrend, ... }
```

### Get Personalized Learning Path
```typescript
const path = reinforcementLearning.getPersonalizedLearningPath();
// Returns: [{ phase, description, recommendedComplexity, ... }, ...]
```

### Adapt to Feedback
```typescript
reinforcementLearning.adaptToFeedback('proj_1', {
  rating: 5,
  difficulty: 3,
  timeAccuracy: 4,
  budgetAccuracy: 4,
  learningGain: 5,
  comments: 'Great!'
});
```

---

## 📊 Analytics

### Get Feedback Analytics
```typescript
import { feedbackDB } from '@/services/databaseService';

const analytics = feedbackDB.getAnalytics();
// Returns: {
//   averageRating: "4.5",
//   averageDifficulty: "3.2",
//   averageTimeAccuracy: "3.8",
//   averageBudgetAccuracy: "4.1",
//   averageLearningGain: "4.3",
//   totalFeedback: 5
// }
```

### Get Project Quality Score
```typescript
const score = reinforcementLearning.calculateQualityScore('proj_1');
// Returns: 0-100 score
```

---

## 🎨 UI Components

### Feedback Modal
```typescript
import FeedbackModal from '@/components/FeedbackModal';

<FeedbackModal
  projectId="proj_1"
  projectTitle="Desk Organizer"
  onClose={() => setShowFeedback(false)}
  onSubmit={() => console.log('Feedback submitted')}
/>
```

---

## 🔧 Configuration

### Theme Colors
```typescript
// In src/theme/tokens.ts
primaryPurple: '#5226b8ff'
primaryOrange: '#F97316'
gray900: '#008080'
// ... more colors
```

### Spacing
```typescript
xs: '4px'
sm: '8px'
md: '16px'
lg: '24px'
xl: '32px'
```

### Border Radius
```typescript
sm: '4px'
md: '8px'
lg: '12px'
xl: '16px'
full: '9999px'
```

---

## 📱 Pages

| Page | Route | Purpose |
|------|-------|---------|
| Generate Idea | `/` | Create new project ideas |
| Step Guide | `/step-guide` | Follow project instructions |
| Learn | `/learn` | Access resources & learning path |
| Materials | `/materials` | Manage material inventory |
| Find Sources | `/find-sources` | Find recycling centers & resources |

---

## 🐛 Debugging

### Check Console Logs
```bash
# Browser DevTools Console (F12)
# Look for AI Service errors, database issues, etc.
```

### View localStorage Data
```javascript
// In browser console
localStorage.getItem('revibe_projects')
localStorage.getItem('revibe_feedback')
localStorage.getItem('revibe_resources')
```

### Clear All Data
```javascript
// In browser console
localStorage.clear()
// Then reload page
```

---

## ⚡ Performance Tips

1. **Cache AI Responses**
   - Store responses for 24 hours
   - Reduce API calls

2. **Optimize Database**
   - Archive old projects
   - Clean up feedback periodically

3. **Lazy Load Resources**
   - Load resources on demand
   - Implement pagination

4. **Minimize Re-renders**
   - Use React.memo for components
   - Implement useCallback hooks

---

## 📚 Learning Path Phases

### Beginner
- Foundation (2-3 weeks)
- Exploration (3-4 weeks)

### Intermediate
- Specialization (4-6 weeks)
- Advanced Techniques (6-8 weeks)

### Advanced
- Mastery (Ongoing)
- Mentorship (Ongoing)

---

## 🎯 Recommendation Scoring

```
Score = (Complexity Match × 30%) 
       + (Category Match × 25%) 
       + (Budget Fit × 20%) 
       + (Learning Potential × 15%) 
       + (Difficulty Accuracy × 10%)
```

**Skill Levels:**
- Beginner: < 3.5 learning gain, < 5 projects
- Intermediate: 3.5-4.2 learning gain, 5-10 projects
- Advanced: > 4.2 learning gain, > 10 projects

---

## 🔐 Security Notes

1. **API Key**
   - Store in `.env.local` (not in git)
   - Never commit API keys
   - Rotate keys regularly

2. **Data Storage**
   - localStorage is not encrypted
   - Don't store sensitive data
   - Use backend for production

3. **User Privacy**
   - Inform users about data collection
   - Implement data deletion
   - Follow GDPR/privacy laws

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| API not working | Check `.env.local` and API key |
| Feedback not saving | Clear localStorage, check limits |
| Recommendations not personalizing | Complete 3+ projects with feedback |
| Scrollbar visible | Hard refresh (Ctrl+Shift+R) |
| Database not initializing | Check browser console for errors |

---

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Netlify
```bash
# Using Netlify CLI
netlify deploy --prod --dir=dist
```

### Environment Variables
Set in deployment platform:
```
VITE_NVIDIA_API_KEY=your_key_here
VITE_NVIDIA_MODEL=nvidia/nemotron-nano-9b-v2:free
```

---

## 📖 Documentation

- **Full Guide**: See `AI_INTEGRATION_GUIDE.md`
- **Setup Details**: See `SETUP_COMPLETE.md`
- **API Docs**: https://docs.nvidia.com/ai-enterprise/

---

## 💡 Tips & Tricks

1. **Test AI Responses**
   ```typescript
   // In browser console
   import { generateIdeaWithAI } from '@/services/aiService';
   generateIdeaWithAI({...})
   ```

2. **Monitor Learning Progress**
   - Check Learn page for real-time updates
   - View analytics in browser DevTools

3. **Add Custom Resources**
   - Use resourcesDB.save() in console
   - Organize by topic and difficulty

4. **Test Feedback System**
   - Complete a project
   - Submit feedback
   - Check recommendations update

---

**Last Updated**: November 12, 2024
**Version**: 1.0.0
