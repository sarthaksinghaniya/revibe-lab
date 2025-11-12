import React from 'react';
import styled from 'styled-components';
import { spacing, radius } from '@/theme/tokens';

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

const Learn: React.FC = () => {
  return (
    <Container>
      <Card>
        <Header>
          <Icon>📚</Icon>
          <div>
            <Title>Higher Education Learning Module</Title>
            <Subtitle>Institution Level: College/University</Subtitle>
          </div>
        </Header>

        <Section>
          <SectionTitle>📌 Upcycling plastic bottle: Advanced Reuse Project</SectionTitle>
          <Subtitle style={{ marginBottom: spacing.md }}>
            ⏱️ 90-120 minutes 🏫 College/University 🌱 Environmental Studies • Design • Engineering • Business
          </Subtitle>
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
              <button style={{ marginLeft: spacing.md, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                View Resources
              </button>
              <button style={{ marginLeft: spacing.sm, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                Add Notes
              </button>
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
              <button style={{ marginLeft: spacing.md, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                View Resources
              </button>
              <button style={{ marginLeft: spacing.sm, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                Add Notes
              </button>
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
              <button style={{ marginLeft: spacing.md, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                View Resources
              </button>
              <button style={{ marginLeft: spacing.sm, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                Add Notes
              </button>
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
              <button style={{ marginLeft: spacing.md, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                View Resources
              </button>
              <button style={{ marginLeft: spacing.sm, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                Add Notes
              </button>
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
              <button style={{ marginLeft: spacing.md, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                View Resources
              </button>
              <button style={{ marginLeft: spacing.sm, padding: `${spacing.xs} ${spacing.md}`, background: '#E5E7EB', border: 'none', borderRadius: radius.md, cursor: 'pointer', marginTop: spacing.sm }}>
                Add Notes
              </button>
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
