import React, { useState } from 'react';
import styled from 'styled-components';
import { spacing, radius } from '@/theme/tokens';
import { useNavigate } from 'react-router-dom';
import { generateIdeaWithAI, generateLearningResourcesWithAI } from '@/services/aiService';
import { projectsDB, resourcesDB, initializeDatabase } from '@/services/databaseService';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.gray200};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  color: ${({ theme }) => theme.gray900};
  margin-bottom: ${spacing.md};
  font-size: 1.25rem;
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.gray600};
  margin-bottom: ${spacing.lg};
  line-height: 1.6;
`;

const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.gray300};
  border-radius: ${radius.lg};
  padding: ${spacing.xl};
  text-align: center;
  background: ${({ theme }) => theme.gray100};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${spacing.lg};

  &:hover {
    border-color: ${({ theme }) => theme.primaryPurple};
    background: ${({ theme }) => theme.gray200};
  }

  svg {
    width: 64px;
    height: 64px;
    color: ${({ theme }) => theme.gray400};
    margin-bottom: ${spacing.md};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.gray900};
  font-weight: 500;
  margin-bottom: ${spacing.sm};
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: ${spacing.md};
  border: 1px solid ${({ theme }) => theme.gray300};
  border-radius: ${radius.md};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryPurple};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${spacing.md};
  border: 1px solid ${({ theme }) => theme.gray300};
  border-radius: ${radius.md};
  font-size: 1rem;
  background: ${({ theme }) => theme.white};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryPurple};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${spacing.md};
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: ${radius.full};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Badge = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${radius.full};
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: ${spacing.md};
`;

const OutputImage = styled.div`
  width: 100%;
  height: 240px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-size: 3rem;
  margin-bottom: ${spacing.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const IdeaTitle = styled.h3`
  color: ${({ theme }) => theme.gray900};
  margin: 0 0 ${spacing.md} 0;
  font-size: 1.5rem;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const DetailItem = styled.div`
  background: ${({ theme }) => theme.gray100};
  padding: ${spacing.md};
  border-radius: ${radius.md};
  border-left: 4px solid ${({ theme }) => theme.primaryPurple};
`;

const DetailLabel = styled.p`
  color: ${({ theme }) => theme.gray600};
  margin: 0 0 ${spacing.xs} 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const DetailValue = styled.p`
  color: ${({ theme }) => theme.gray900};
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const DescriptionBox = styled.div`
  background: ${({ theme }) => theme.gray100};
  padding: ${spacing.md};
  border-radius: ${radius.md};
  margin-bottom: ${spacing.lg};
`;

const DescriptionLabel = styled.p`
  color: ${({ theme }) => theme.gray600};
  margin: 0 0 ${spacing.sm} 0;
  font-size: 0.875rem;
  font-weight: 600;
`;

const DescriptionText = styled.p`
  color: ${({ theme }) => theme.gray700};
  margin: 0;
  line-height: 1.6;
  font-size: 0.875rem;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: ${spacing.md};
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: ${radius.full};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(99, 102, 241, 0.3);
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.primaryPurple};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #FEE2E2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: ${spacing.md};
  border-radius: ${radius.md};
  margin-bottom: ${spacing.lg};
  font-size: 0.875rem;
`;

const SuccessMessage = styled.div`
  background: #DCFCE7;
  border: 1px solid #BBF7D0;
  color: #16A34A;
  padding: ${spacing.md};
  border-radius: ${radius.md};
  margin-bottom: ${spacing.lg};
  font-size: 0.875rem;
`;

const ResourceLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.primaryPurple};
  font-weight: 600;
  margin-top: ${spacing.sm};
  
  &:hover {
    text-decoration: underline;
  }
`;

const GenerateIdea: React.FC = () => {
  const navigate = useNavigate();
  const [material, setMaterial] = useState('plastic bottle');
  const [category, setCategory] = useState('Education');
  const [complexity, setComplexity] = useState('Low');
  const [budget, setBudget] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState<any>(null);
  const [relatedResources, setRelatedResources] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const CATEGORIES = [
    'Education',
    'Art',
    'Home',
    'Fashion',
    'Tech',
    'Robotics',
    'Gaming',
    'Sports',
    'Garden',
    'Kitchen',
    'Furniture',
    'Jewelry',
    'Toys',
    'Music',
    'Storage',
  ];

  const handleFileUpload = (file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    // Read and display image
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setUploadedImage(imageData);
      setSuccess('✅ Image uploaded successfully! You can now generate ideas.');
      setError('');
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleGenerate = async () => {
    if (!material.trim()) {
      setError('Please enter a material');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setGeneratedIdea(null);
    setRelatedResources([]);

    try {
      // Initialize database
      initializeDatabase();

      // Generate idea using AI
      const idea = await generateIdeaWithAI({
        material,
        category,
        complexity,
        budget,
      });

      // Generate related resources using AI
      const resources = await generateLearningResourcesWithAI(
        `${category} projects with ${material}`
      );

      // Save project to database
      const projectId = `proj_${Date.now()}`;
      projectsDB.save({
        id: projectId,
        idea: idea.idea,
        material,
        category,
        complexity,
        budget,
        description: idea.description,
        estimatedTime: idea.estimatedTime,
        materials: idea.materials,
        steps: idea.steps,
        learningOutcomes: idea.learningOutcomes,
        createdAt: new Date().toISOString(),
        completionStatus: 0,
      });

      // Save resources to database
      resources.forEach((res: any, index: number) => {
        resourcesDB.save({
          id: `res_${projectId}_${index}`,
          title: res.title,
          description: res.description,
          type: res.type,
          url: res.url,
          topic: `${category} - ${idea.idea}`,
          difficulty: complexity,
          createdAt: new Date().toISOString(),
        });
      });

      setGeneratedIdea({ ...idea, projectId });
      setRelatedResources(resources);
      setSuccess('✅ Idea generated successfully! Resources added to Learn page.');
    } catch (err) {
      console.error('Error generating idea:', err);
      setError('Failed to generate idea. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Grid>
        <Card>
          <Badge>✨ Create Your Idea</Badge>
          <CardTitle>Smart Material Detection</CardTitle>
          <CardDescription>
            Enter material details to generate personalized upcycling ideas
          </CardDescription>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          {uploadedImage && (
            <div style={{ marginBottom: spacing.lg, borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src={uploadedImage} 
                alt="Uploaded material" 
                style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
              />
            </div>
          )}

          <UploadArea
            onClick={handleUploadAreaClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ cursor: 'pointer' }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p style={{ margin: 0, color: '#6B7280', fontWeight: 500 }}>
              Click to upload or drag & drop
            </p>
            <p style={{ margin: '4px 0 0 0', color: '#9CA3AF', fontSize: '0.875rem' }}>
              Supports JPG, PNG, WebP (Max 5MB)
            </p>
          </UploadArea>

          <FormGroup>
            <Label>What material do you want to upcycle?</Label>
            <Input
              type="text"
              placeholder="e.g., plastic bottle, old jeans, cardboard"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </FormGroup>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md, marginBottom: spacing.lg }}>
            <FormGroup style={{ marginBottom: 0 }}>
              <Label>Category</Label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup style={{ marginBottom: 0 }}>
              <Label>Complexity</Label>
              <Select value={complexity} onChange={(e) => setComplexity(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Select>
            </FormGroup>
          </div>

          <FormGroup>
            <Label>Max Budget (₹)</Label>
            <Input
              type="number"
              placeholder="100"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
              min="0"
            />
          </FormGroup>

          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner style={{ marginRight: spacing.sm }} /> Generating...
              </>
            ) : (
              'Generate with AI'
            )}
          </Button>
        </Card>

        <Card>
          <Badge>💡 Generated Idea</Badge>

          {generatedIdea ? (
            <>
              <OutputImage>
                {category === 'Tech' || category === 'Robotics' ? '🤖' : 
                 category === 'Art' ? '🎨' :
                 category === 'Fashion' ? '👗' :
                 category === 'Gaming' ? '🎮' :
                 category === 'Sports' ? '⚽' :
                 category === 'Garden' ? '🌱' :
                 category === 'Kitchen' ? '🍳' :
                 category === 'Furniture' ? '🛋️' :
                 category === 'Jewelry' ? '💎' :
                 category === 'Toys' ? '🧸' :
                 category === 'Music' ? '🎵' :
                 category === 'Storage' ? '📦' : '🎨'}
              </OutputImage>

              <IdeaTitle>{generatedIdea.idea}</IdeaTitle>

              <DetailGrid>
                <DetailItem>
                  <DetailLabel>⏱️ Estimated Time</DetailLabel>
                  <DetailValue>{generatedIdea.estimatedTime}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>💰 Budget</DetailLabel>
                  <DetailValue>₹{budget}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>📊 Complexity</DetailLabel>
                  <DetailValue>{complexity}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>🏷️ Category</DetailLabel>
                  <DetailValue>{category}</DetailValue>
                </DetailItem>
              </DetailGrid>

              <DescriptionBox>
                <DescriptionLabel>📝 Project Description</DescriptionLabel>
                <DescriptionText>{generatedIdea.description}</DescriptionText>
              </DescriptionBox>

              {generatedIdea.learningOutcomes && generatedIdea.learningOutcomes.length > 0 && (
                <DescriptionBox>
                  <DescriptionLabel>🎯 Learning Outcomes</DescriptionLabel>
                  <DescriptionText>
                    {generatedIdea.learningOutcomes.map((outcome: string, idx: number) => (
                      <div key={idx}>• {outcome}</div>
                    ))}
                  </DescriptionText>
                </DescriptionBox>
              )}

              {relatedResources.length > 0 && (
                <DescriptionBox>
                  <DescriptionLabel>📚 Related Resources</DescriptionLabel>
                  <DescriptionText>
                    {relatedResources.slice(0, 3).map((resource: any, idx: number) => (
                      <div key={idx} style={{ marginBottom: spacing.sm }}>
                        <strong>{resource.title}</strong> ({resource.type})
                        {resource.url && (
                          <ResourceLink href={resource.url} target="_blank" rel="noopener noreferrer">
                            View →
                          </ResourceLink>
                        )}
                      </div>
                    ))}
                  </DescriptionText>
                </DescriptionBox>
              )}

              <ActionButton onClick={() => navigate('/step-guide')}>
                Start Project →
              </ActionButton>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: spacing.lg, color: '#6B7280' }}>
              <p style={{ fontSize: '3rem', marginBottom: spacing.md }}>✨</p>
              <p>Generate an idea to see details here</p>
              <p style={{ fontSize: '0.875rem', marginTop: spacing.md }}>
                Fill in the form on the left and click "Generate with AI"
              </p>
            </div>
          )}
        </Card>
      </Grid>
    </Container>
  );
};

export default GenerateIdea;
