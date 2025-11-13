# ReVibe Knowledge Base - System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     ReVibe Application                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ GenerateIdea │  │  StepGuide   │  │    Learn     │  ...     │
│  │    Page      │  │    Page      │  │    Page      │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                  │
│         └─────────────────┼─────────────────┘                  │
│                           │                                    │
│                    ┌──────▼────────┐                           │
│                    │  Knowledge    │                           │
│                    │  Base Utils   │                           │
│                    └──────┬────────┘                           │
│                           │                                    │
│         ┌─────────────────┼─────────────────┐                 │
│         │                 │                 │                 │
│    ┌────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐            │
│    │ Knowledge │  │   Image     │  │     AR      │            │
│    │   Base    │  │ Generation  │  │  Scanning   │            │
│    │  System   │  │  Service    │  │  Service    │            │
│    └───────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Architecture

### Layer 1: Presentation Layer (UI Components)
```
┌─────────────────────────────────────────────────────────────┐
│                    React Components                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  GenerateIdea    StepGuide    Learn    Materials  FindSources
│  ├─ Upload       ├─ Steps     ├─ Search ├─ Props  ├─ Similar
│  ├─ Input        ├─ Safety    ├─ Filter ├─ Safety ├─ Summary
│  ├─ Generate     ├─ Tools     ├─ Sort   ├─ Tips   └─ Resources
│  └─ Display      └─ Outcomes  └─ List   └─ Uses
│
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │
                    ┌───────┴────────┐
                    │ knowledgeBase  │
                    │    Utils       │
                    └───────┬────────┘
                            │
```

### Layer 2: Service Layer
```
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Knowledge Base System                      │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │  Expert System (ExpertSystem class)          │  │    │
│  │  │  ├─ getMaterialKnowledge()                   │  │    │
│  │  │  ├─ findProjectsForMaterial()                │  │    │
│  │  │  ├─ validateMaterialForProject()             │  │    │
│  │  │  ├─ generateImagePrompt()                    │  │    │
│  │  │  ├─ getARRecommendations()                   │  │    │
│  │  │  └─ analyzeProject()                         │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │     Image Generation Service                       │    │
│  │  ├─ generateImageWithKB()                          │    │
│  │  ├─ generateImageVariations()                      │    │
│  │  ├─ getImageGenerationRecommendations()            │    │
│  │  ├─ validateImageRequest()                         │    │
│  │  └─ getOrGenerateImage()                           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │      AR Scanning Service                           │    │
│  │  ├─ performARScan()                                │    │
│  │  ├─ getARScanningTips()                            │    │
│  │  ├─ validateScanConditions()                       │    │
│  │  ├─ analyzeScanResults()                           │    │
│  │  └─ generateScanReport()                           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │
```

### Layer 3: Data Layer
```
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────┐      │
│  │  Material Knowledge Database                     │      │
│  │  ├─ Plastic Bottle                               │      │
│  │  ├─ Old Jeans                                    │      │
│  │  ├─ Cardboard                                    │      │
│  │  ├─ Glass Jar                                    │      │
│  │  ├─ Wood Scraps                                  │      │
│  │  ├─ Plastic Bags                                 │      │
│  │  └─ Tin Cans                                     │      │
│  └──────────────────────────────────────────────────┘      │
│                                                             │
│  ┌──────────────────────────────────────────────────┐      │
│  │  Project Templates Database                      │      │
│  │  ├─ Plastic Bottle Planter                       │      │
│  │  ├─ Denim Tote Bag                               │      │
│  │  └─ Cardboard Storage Box                        │      │
│  └──────────────────────────────────────────────────┘      │
│                                                             │
│  ┌──────────────────────────────────────────────────┐      │
│  │  AR Scanning Profiles Database                   │      │
│  │  ├─ Material Detection                           │      │
│  │  ├─ Dimension Measurement                        │      │
│  │  ├─ Color Analysis                               │      │
│  │  └─ Condition Assessment                         │      │
│  └──────────────────────────────────────────────────┘      │
│                                                             │
│  ┌──────────────────────────────────────────────────┐      │
│  │  Image Generation Configs Database               │      │
│  │  ├─ Professional                                 │      │
│  │  ├─ Artistic                                     │      │
│  │  ├─ Minimalist                                   │      │
│  │  └─ Eco-friendly                                 │      │
│  └──────────────────────────────────────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Upload & Project Generation Flow
```
User Uploads Image
        │
        ▼
File Validation
├─ Type Check (JPG, PNG, WebP)
├─ Size Check (max 5MB)
└─ Display Preview
        │
        ▼
User Enters Material & Category
        │
        ▼
Knowledge Base Query
├─ Get Material Knowledge
├─ Find Suitable Projects
└─ Get AR Recommendations
        │
        ▼
Expert System Analysis
├─ Validate Feasibility
├─ Generate Warnings
└─ Provide Tips
        │
        ▼
Image Generation
├─ Generate Prompt
├─ Call Image API
└─ Cache Result
        │
        ▼
Display Results to User
├─ Project Details
├─ Generated Image
├─ Safety Information
└─ Learning Outcomes
```

### AR Scanning Flow
```
User Initiates AR Scan
        │
        ▼
Validate Scan Conditions
├─ Check Lighting
├─ Check Distance
└─ Check Permissions
        │
        ▼
Perform Material Detection
├─ Analyze Texture
├─ Analyze Color
└─ Calculate Confidence
        │
        ▼
Get AR Recommendations
├─ Material Knowledge
├─ Processing Tips
└─ Hazard Warnings
        │
        ▼
Find Suitable Projects
├─ Query Knowledge Base
├─ Filter by Complexity
└─ Rank by Suitability
        │
        ▼
Display Results
├─ Scan Confidence
├─ Material Properties
├─ Project Suggestions
└─ Safety Information
```

### Image Generation Flow
```
Request Image Generation
        │
        ▼
Validate Request
├─ Check Material
├─ Check Category
└─ Check Parameters
        │
        ▼
Query Knowledge Base
├─ Get Material Knowledge
├─ Get Image Config
└─ Get Style Settings
        │
        ▼
Generate Prompt
├─ Use Material Info
├─ Apply Style
└─ Add Context
        │
        ▼
Check Cache
├─ If Found → Return Cached
└─ If Not → Generate New
        │
        ▼
Call Image API
├─ Send Prompt
├─ Set Parameters
└─ Get Result
        │
        ▼
Cache Result
├─ Store in Memory
└─ Set Expiration
        │
        ▼
Return to User
```

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  GenerateIdea Component                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐                                      │
│  │  Upload Handler  │                                      │
│  └────────┬─────────┘                                      │
│           │                                                │
│           ▼                                                │
│  ┌──────────────────────────────────────────┐             │
│  │  File Validation & Preview               │             │
│  └────────┬─────────────────────────────────┘             │
│           │                                                │
│           ▼                                                │
│  ┌──────────────────────────────────────────┐             │
│  │  Material Input & Category Selection     │             │
│  └────────┬─────────────────────────────────┘             │
│           │                                                │
│           ▼                                                │
│  ┌──────────────────────────────────────────┐             │
│  │  Query Knowledge Base                    │             │
│  │  ├─ Get Material Knowledge               │             │
│  │  ├─ Find Projects                        │             │
│  │  └─ Get Recommendations                  │             │
│  └────────┬─────────────────────────────────┘             │
│           │                                                │
│           ▼                                                │
│  ┌──────────────────────────────────────────┐             │
│  │  Generate Image                          │             │
│  │  ├─ Create Prompt                        │             │
│  │  ├─ Call API                             │             │
│  │  └─ Cache Result                         │             │
│  └────────┬─────────────────────────────────┘             │
│           │                                                │
│           ▼                                                │
│  ┌──────────────────────────────────────────┐             │
│  │  Display Results                         │             │
│  │  ├─ Project Details                      │             │
│  │  ├─ Generated Image                      │             │
│  │  ├─ Safety Info                          │             │
│  │  └─ Learning Outcomes                    │             │
│  └──────────────────────────────────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Class Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    ExpertSystem                             │
├─────────────────────────────────────────────────────────────┤
│ - knowledgeBase: Record<string, MaterialKnowledge>          │
│ - templates: ProjectTemplate[]                              │
│ - arProfiles: Record<string, ARScanningProfile>             │
│ - imageConfigs: Record<string, ImageGenerationConfig>       │
├─────────────────────────────────────────────────────────────┤
│ + getMaterialKnowledge(name): MaterialKnowledge | null      │
│ + getAllMaterials(): string[]                               │
│ + findProjectsForMaterial(name): ProjectTemplate[]          │
│ + getProjectTemplate(id): ProjectTemplate | null            │
│ + getARProfile(name): ARScanningProfile | null              │
│ + getImageConfig(style): ImageGenerationConfig | null       │
│ + generateImagePrompt(material, category, name, style)      │
│ + validateMaterialForProject(material, template)            │
│ + getARRecommendations(material)                            │
│ + analyzeProject(material, category, complexity, budget)    │
└─────────────────────────────────────────────────────────────┘
         ▲
         │ uses
         │
    ┌────┴────────────────────────────────────────┐
    │                                             │
    │  Image Generation Service                   │  AR Scanning Service
    │  ├─ generateImageWithKB()                   │  ├─ performARScan()
    │  ├─ generateImageVariations()               │  ├─ getARScanningTips()
    │  ├─ getImageGenerationRecommendations()     │  ├─ validateScanConditions()
    │  ├─ validateImageRequest()                  │  ├─ analyzeScanResults()
    │  └─ getOrGenerateImage()                    │  └─ generateScanReport()
    │                                             │
    └─────────────────────────────────────────────┘
```

## Data Structure Relationships

```
MaterialKnowledge
├─ name: string
├─ properties: string[]
├─ recyclability: 'high' | 'medium' | 'low'
├─ commonUses: string[]
├─ hazards: string[]
├─ processingTips: string[]
└─ imageGenerationPrompt: string

ProjectTemplate
├─ id: string
├─ name: string
├─ category: string
├─ materials: string[] ──┐
├─ difficulty: string    │ references
├─ estimatedTime: string │ MaterialKnowledge
├─ steps: string[]       │
├─ tools: string[]       │
├─ learningOutcomes: string[] │
├─ imagePrompt: string   │
└─ arScanningTips: string[] ──┘

ARScanningProfile
├─ featureName: string
├─ detectionMethod: string
├─ requiredLighting: string
├─ optimalDistance: string
├─ confidence: number
└─ processingTips: string[]

ImageGenerationConfig
├─ style: string
├─ quality: string
├─ resolution: string
├─ colorPalette: string[]
├─ lighting: string
└─ perspective: string
```

## Integration Points

```
┌─────────────────────────────────────────────────────────────┐
│                   Application Pages                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  GenerateIdea          StepGuide          Learn             │
│  ├─ Upload             ├─ Steps           ├─ Search        │
│  ├─ Material Input     ├─ Safety          ├─ Filter        │
│  ├─ Recommendations    ├─ Tools           ├─ Sort          │
│  ├─ Image Gen          └─ Outcomes        └─ Display       │
│  └─ AR Scan                                                │
│         │                   │                   │          │
│         └───────────────────┼───────────────────┘          │
│                             │                              │
│                    ┌────────▼────────┐                     │
│                    │  Knowledge Base  │                     │
│                    │  Utils & Expert  │                     │
│                    │  System          │                     │
│                    └──────────────────┘                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Performance Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Caching Layer                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Image Cache                                                │
│  ├─ Key: material_category_projectName_style               │
│  └─ Value: GeneratedImage                                  │
│                                                             │
│  Material Cache                                             │
│  ├─ Key: materialName                                      │
│  └─ Value: MaterialKnowledge                               │
│                                                             │
│  Template Cache                                             │
│  ├─ Key: templateId                                        │
│  └─ Value: ProjectTemplate                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
         ▲
         │ queries
         │
┌────────┴──────────────────────────────────────────────────┐
│              Knowledge Base System                         │
│  ├─ O(1) Material Lookup                                  │
│  ├─ O(n) Template Filtering                               │
│  └─ O(1) Config Access                                    │
└────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Browser / Client                           │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Application                                   │  │
│  │  ├─ Components                                       │  │
│  │  ├─ Services                                         │  │
│  │  └─ Knowledge Base                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Local Storage                                       │  │
│  │  ├─ Projects                                         │  │
│  │  ├─ Resources                                        │  │
│  │  └─ User Profile                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
         │
         │ API Calls
         │
┌────────▼──────────────────────────────────────────────────┐
│              External APIs                                │
├────────────────────────────────────────────────────────────┤
│  ├─ NVIDIA API (AI Generation)                            │
│  ├─ HuggingFace API (Image Generation)                    │
│  └─ Optional: AR.js (Real AR)                             │
└────────────────────────────────────────────────────────────┘
```

---

**Architecture Version:** 1.0.0
**Last Updated:** November 2025
**Status:** Production Ready
