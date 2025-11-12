import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { spacing, radius } from '@/theme/tokens';
import { resourcesDB, initializeDatabase } from '@/services/databaseService';
import { reinforcementLearning } from '@/services/reinforcementLearning';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${spacing.lg};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.gray200};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: ${spacing.lg};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${radius.md};
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.gray900};
  margin: 0;
  font-size: 1.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.gray600};
  margin: 0;
  font-size: 0.875rem;
`;

const Section = styled.div`
  margin-bottom: ${spacing.lg};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.gray900};
  margin-bottom: ${spacing.md};
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const LearningOutcomesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: ${spacing.sm} 0;
    color: ${({ theme }) => theme.gray700};
    display: flex;
    align-items: flex-start;
    gap: ${spacing.md};

    &:before {
      content: '✓';
      color: ${({ theme }) => theme.primaryPurple};
      font-weight: bold;
      min-width: 20px;
    }
  }
`;

const ConceptGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const ConceptCard = styled.div`
  background: ${({ theme }) => theme.gray100};
  padding: ${spacing.md};
  border-radius: ${radius.md};
  border-left: 4px solid ${({ theme }) => theme.primaryPurple};
`;

const ConceptTitle = styled.h3`
  color: ${({ theme }) => theme.gray900};
  margin: 0 0 ${spacing.sm} 0;
  font-size: 1rem;
`;

const ConceptDescription = styled.p`
  color: ${({ theme }) => theme.gray600};
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const PhaseContainer = styled.div`
  margin-bottom: ${spacing.lg};
`;

const PhaseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.gray200};
`;

const PhaseNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
`;

const PhaseTitle = styled.h3`
  color: ${({ theme }) => theme.gray900};
  margin: 0;
  font-size: 1.1rem;
`;

const PhaseDescription = styled.p`
  color: ${({ theme }) => theme.gray600};
  margin: 0;
  font-size: 0.875rem;
`;

const PhaseContent = styled.div`
  padding-left: ${spacing.lg};
  color: ${({ theme }) => theme.gray700};
  font-size: 0.875rem;
  line-height: 1.6;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const ResourceCard = styled.div`
  background: ${({ theme }) => theme.gray100};
  border: 1px solid ${({ theme }) => theme.gray200};
  border-radius: ${radius.md};
  padding: ${spacing.md};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primaryPurple};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ResourceType = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${radius.full};
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: ${spacing.sm};
  text-transform: uppercase;
`;

const ResourceTitle = styled.h3`
  color: ${({ theme }) => theme.gray900};
  margin: 0 0 ${spacing.sm} 0;
  font-size: 1rem;
`;

const ResourceDescription = styled.p`
  color: ${({ theme }) => theme.gray600};
  margin: 0 0 ${spacing.md} 0;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const LearningPathContainer = styled.div`
  background: ${({ theme }) => theme.gray100};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  margin-bottom: ${spacing.lg};
`;

const PathStep = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.gray300};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  color: ${({ theme }) => theme.gray900};
  margin: 0 0 ${spacing.xs} 0;
  font-size: 1rem;
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.gray600};
  margin: 0;
  font-size: 0.875rem;
`;

const ActionButton = styled.a`
  display: inline-block;
  padding: ${spacing.xs} ${spacing.md};
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: ${radius.md};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  margin-top: ${spacing.sm};
  margin-right: ${spacing.sm};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  padding: ${spacing.xs} ${spacing.md};
  background: ${({ theme }) => theme.gray200};
  color: ${({ theme }) => theme.gray900};
  border: none;
  border-radius: ${radius.md};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  margin-top: ${spacing.sm};
  margin-right: ${spacing.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.gray300};
    transform: translateY(-2px);
  }
`;

const Learn: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [learningPath, setLearningPath] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    // Initialize database
    initializeDatabase();

    // Load all resources (including AI-generated ones)
    const allResources = resourcesDB.getAll();
    
    // Sort resources: AI-generated (with topic containing "-") first, then default resources
    const sortedResources = allResources.sort((a: any, b: any) => {
      const aIsGenerated = a.topic.includes(' - ');
      const bIsGenerated = b.topic.includes(' - ');
      if (aIsGenerated && !bIsGenerated) return -1;
      if (!aIsGenerated && bIsGenerated) return 1;
      return 0;
    });

    setResources(sortedResources);

    // Get personalized learning path
    const path = reinforcementLearning.getPersonalizedLearningPath();
    setLearningPath(path);

    // Get learning progress
    const prog = reinforcementLearning.calculateLearningProgress();
    setProgress(prog);
  }, []);

  return (
    <Container>
      <Card>
        <Header>
          <Icon>📚</Icon>
          <div>
            <Title>Learning Hub</Title>
            <Subtitle>Personalized Learning Resources & Path</Subtitle>
          </div>
        </Header>

        {progress && (
          <Section>
            <SectionTitle>📊 Your Learning Progress</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: spacing.md, marginBottom: spacing.lg }}>
              <div style={{ background: '#F3F4F6', padding: spacing.md, borderRadius: radius.md }}>
                <p style={{ color: '#6B7280', margin: '0 0 8px 0', fontSize: '0.875rem', fontWeight: 600 }}>Skill Level</p>
                <p style={{ color: '#111827', margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{progress.skillLevel}</p>
              </div>
              <div style={{ background: '#F3F4F6', padding: spacing.md, borderRadius: radius.md }}>
                <p style={{ color: '#6B7280', margin: '0 0 8px 0', fontSize: '0.875rem', fontWeight: 600 }}>Projects Completed</p>
                <p style={{ color: '#111827', margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{progress.completedProjects} / {progress.totalProjects}</p>
              </div>
              <div style={{ background: '#F3F4F6', padding: spacing.md, borderRadius: radius.md }}>
                <p style={{ color: '#6B7280', margin: '0 0 8px 0', fontSize: '0.875rem', fontWeight: 600 }}>Learning Gain</p>
                <p style={{ color: '#111827', margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{progress.averageLearningGain.toFixed(1)} / 5</p>
              </div>
              <div style={{ background: '#F3F4F6', padding: spacing.md, borderRadius: radius.md }}>
                <p style={{ color: '#6B7280', margin: '0 0 8px 0', fontSize: '0.875rem', fontWeight: 600 }}>Trend</p>
                <p style={{ color: '#111827', margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{progress.progressTrend === 'improving' ? '📈' : progress.progressTrend === 'declining' ? '📉' : '➡️'} {progress.progressTrend}</p>
              </div>
            </div>
          </Section>
        )}

        {learningPath.length > 0 && (
          <Section>
            <SectionTitle>🎯 Your Personalized Learning Path</SectionTitle>
            <LearningPathContainer>
              {learningPath.map((step, index) => (
                <PathStep key={index}>
                  <StepNumber>{index + 1}</StepNumber>
                  <StepContent>
                    <StepTitle>{step.phase}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                    <p style={{ color: '#6B7280', fontSize: '0.75rem', margin: '8px 0 0 0' }}>
                      Complexity: {step.recommendedComplexity} • Duration: {step.estimatedDuration}
                    </p>
                  </StepContent>
                </PathStep>
              ))}
            </LearningPathContainer>
          </Section>
        )}

        <Section>
          <SectionTitle>📚 Learning Resources</SectionTitle>
          {resources.length > 0 ? (
            <>
              {/* AI-Generated Resources Section */}
              {resources.some((r: any) => r.topic.includes(' - ')) && (
                <div style={{ marginBottom: spacing.lg }}>
                  <h3 style={{ color: '#6366F1', marginBottom: spacing.md, fontSize: '1rem', fontWeight: 600 }}>
                    🤖 AI-Recommended for Your Projects
                  </h3>
                  <ResourceGrid>
                    {resources
                      .filter((r: any) => r.topic.includes(' - '))
                      .map((resource) => (
                        <ResourceCard key={resource.id}>
                          <ResourceType>{resource.type}</ResourceType>
                          <ResourceTitle>{resource.title}</ResourceTitle>
                          <ResourceDescription>{resource.description}</ResourceDescription>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm }}>
                            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                              📌 {resource.topic} • {resource.difficulty}
                            </span>
                            {resource.url && (
                              <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', fontSize: '0.875rem', fontWeight: 600 }}>
                                Visit →
                              </a>
                            )}
                          </div>
                        </ResourceCard>
                      ))}
                  </ResourceGrid>
                </div>
              )}

              {/* General Resources Section */}
              {resources.some((r: any) => !r.topic.includes(' - ')) && (
                <div>
                  <h3 style={{ color: '#6B7280', marginBottom: spacing.md, fontSize: '1rem', fontWeight: 600 }}>
                    📖 General Learning Resources
                  </h3>
                  <ResourceGrid>
                    {resources
                      .filter((r: any) => !r.topic.includes(' - '))
                      .map((resource) => (
                        <ResourceCard key={resource.id}>
                          <ResourceType>{resource.type}</ResourceType>
                          <ResourceTitle>{resource.title}</ResourceTitle>
                          <ResourceDescription>{resource.description}</ResourceDescription>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm }}>
                            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                              📌 {resource.topic} • {resource.difficulty}
                            </span>
                            {resource.url && (
                              <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', fontSize: '0.875rem', fontWeight: 600 }}>
                                Visit →
                              </a>
                            )}
                          </div>
                        </ResourceCard>
                      ))}
                  </ResourceGrid>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: '#6B7280' }}>Loading resources...</p>
          )}
        </Section>

        <Section>
          <SectionTitle>🎯 Learning Outcomes</SectionTitle>
          <LearningOutcomesList>
            <li>Understand the concept of upcycling and its environmental benefits</li>
            <li>Develop creative problem-solving skills</li>
            <li>Learn about waste reduction and sustainability</li>
            <li>Apply design thinking to material transformation</li>
            <li>Explore material properties and transformation</li>
            <li>Analyze the economic impact of upcycling initiatives</li>
          </LearningOutcomesList>
        </Section>

        <Section>
          <SectionTitle>🔑 Key Concepts & Vocabulary</SectionTitle>
          <ConceptGrid>
            <ConceptCard>
              <ConceptTitle>Upcycling</ConceptTitle>
              <ConceptDescription>
                Click for definition: Sustainability. Click for definition: waste reduction. Click for definition: recycling. Click for definition: lifecycle assessment.
              </ConceptDescription>
            </ConceptCard>
            <ConceptCard>
              <ConceptTitle>Material Properties</ConceptTitle>
              <ConceptDescription>
                Click for definition: Durability. Click for definition: Flexibility. Click for definition: Environmental impact.
              </ConceptDescription>
            </ConceptCard>
            <ConceptCard>
              <ConceptTitle>Design Thinking</ConceptTitle>
              <ConceptDescription>
                Click for definition: Innovation. Click for definition: Circular economy. Click for definition: Sustainable design.
              </ConceptDescription>
            </ConceptCard>
          </ConceptGrid>
        </Section>

        <Section>
          <SectionTitle>📋 Project Phases</SectionTitle>
          
          <PhaseContainer>
            <PhaseHeader>
              <PhaseNumber>1</PhaseNumber>
              <div>
                <PhaseTitle>Material Analysis</PhaseTitle>
                <PhaseDescription>30 minutes</PhaseDescription>
              </div>
            </PhaseHeader>
            <PhaseContent>
              Conduct a detailed analysis of material properties and potential applications
              <div style={{ marginTop: spacing.sm }}>
                <ActionButton href="https://www.amazon.com/s?k=material+properties+guide" target="_blank" rel="noopener noreferrer">
                  📚 View Resources
                </ActionButton>
                <SecondaryButton href="#notes" onClick={(e) => { e.preventDefault(); alert('Notes feature coming soon!'); }}>
                  📝 Add Notes
                </SecondaryButton>
              </div>
            </PhaseContent>
          </PhaseContainer>

          <PhaseContainer>
            <PhaseHeader>
              <PhaseNumber>2</PhaseNumber>
              <div>
                <PhaseTitle>Design & Planning</PhaseTitle>
                <PhaseDescription>30 minutes</PhaseDescription>
              </div>
            </PhaseHeader>
            <PhaseContent>
              Develop detailed design specifications and project plans
              <div style={{ marginTop: spacing.sm }}>
                <ActionButton href="https://www.skillshare.com/search?query=design+planning" target="_blank" rel="noopener noreferrer">
                  📚 View Resources
                </ActionButton>
                <SecondaryButton href="#notes" onClick={(e) => { e.preventDefault(); alert('Notes feature coming soon!'); }}>
                  📝 Add Notes
                </SecondaryButton>
              </div>
            </PhaseContent>
          </PhaseContainer>

          <PhaseContainer>
            <PhaseHeader>
              <PhaseNumber>3</PhaseNumber>
              <div>
                <PhaseTitle>Market Research</PhaseTitle>
                <PhaseDescription>20 minutes</PhaseDescription>
              </div>
            </PhaseHeader>
            <PhaseContent>
              Research similar products and market potential
              <div style={{ marginTop: spacing.sm }}>
                <ActionButton href="https://www.coursera.org/search?query=market+research" target="_blank" rel="noopener noreferrer">
                  📚 View Resources
                </ActionButton>
                <SecondaryButton href="#notes" onClick={(e) => { e.preventDefault(); alert('Notes feature coming soon!'); }}>
                  📝 Add Notes
                </SecondaryButton>
              </div>
            </PhaseContent>
          </PhaseContainer>

          <PhaseContainer>
            <PhaseHeader>
              <PhaseNumber>4</PhaseNumber>
              <div>
                <PhaseTitle>Prototype Development</PhaseTitle>
                <PhaseDescription>60 minutes</PhaseDescription>
              </div>
            </PhaseHeader>
            <PhaseContent>
              Build and test prototypes of the upcycled product
              <div style={{ marginTop: spacing.sm }}>
                <ActionButton href="https://www.instructables.com" target="_blank" rel="noopener noreferrer">
                  📚 View Resources
                </ActionButton>
                <SecondaryButton href="#notes" onClick={(e) => { e.preventDefault(); alert('Notes feature coming soon!'); }}>
                  📝 Add Notes
                </SecondaryButton>
              </div>
            </PhaseContent>
          </PhaseContainer>

          <PhaseContainer>
            <PhaseHeader>
              <PhaseNumber>5</PhaseNumber>
              <div>
                <PhaseTitle>Evaluation & Reflection</PhaseTitle>
                <PhaseDescription>20 minutes</PhaseDescription>
              </div>
            </PhaseHeader>
            <PhaseContent>
              Present findings, evaluate outcomes, and discuss improvements
              <div style={{ marginTop: spacing.sm }}>
                <ActionButton href="https://www.ted.com/search?q=innovation" target="_blank" rel="noopener noreferrer">
                  📚 View Resources
                </ActionButton>
                <SecondaryButton href="#notes" onClick={(e) => { e.preventDefault(); alert('Notes feature coming soon!'); }}>
                  📝 Add Notes
                </SecondaryButton>
              </div>
            </PhaseContent>
          </PhaseContainer>
        </Section>

        <Section>
          <SectionTitle>📊 Assessment & Evaluation</SectionTitle>
          <LearningOutcomesList>
            <li>Observation during material analysis</li>
            <li>Quality of design documentation</li>
            <li>Research methodology and sources</li>
            <li>Team collaboration and project management</li>
            <li>Prototype functionality and innovation</li>
          </LearningOutcomesList>
        </Section>
      </Card>
    </Container>
  );
};

export default Learn;
