import React, { useState } from 'react';
import styled from 'styled-components';
import { spacing, radius } from '@/theme/tokens';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.lg};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.gray200};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${radius.md};
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.gray900};
  margin: 0;
  font-size: 1.5rem;
`;

const Progress = styled.div`
  margin-bottom: ${spacing.lg};
  color: ${({ theme }) => theme.gray600};
  font-size: 0.875rem;
`;

const StepsList = styled.div`
  margin-bottom: ${spacing.lg};
`;

const StepItemStyled = styled.div<{ $isActive: boolean }>`
  padding: ${spacing.md};
  margin-bottom: ${spacing.sm};
  background: ${({ $isActive, theme }) => $isActive ? theme.primaryPurple : theme.gray100};
  color: ${({ $isActive, theme }) => $isActive ? theme.white : theme.gray700};
  border-radius: ${radius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${spacing.md};

  &:hover {
    background: ${({ $isActive, theme }) => $isActive ? theme.primaryPurple : theme.gray200};
  }

  strong {
    min-width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $isActive, theme }) => $isActive ? 'rgba(255,255,255,0.3)' : theme.primaryPurple};
    color: ${({ $isActive, theme }) => $isActive ? theme.white : theme.white};
    border-radius: 50%;
    font-size: 0.75rem;
  }
`;

const StepItem: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode }> = ({ isActive, onClick, children }) => (
  <StepItemStyled $isActive={isActive} onClick={onClick}>
    {children}
  </StepItemStyled>
);

const StepDetail = styled.div`
  margin-bottom: ${spacing.lg};
`;

const StepTitle = styled.h2`
  color: ${({ theme }) => theme.gray900};
  margin-bottom: ${spacing.md};
  font-size: 1.25rem;
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.gray600};
  line-height: 1.6;
  margin-bottom: ${spacing.md};
`;

const EstimatedTime = styled.div`
  background: ${({ theme }) => theme.gray100};
  padding: ${spacing.md};
  border-radius: ${radius.md};
  color: ${({ theme }) => theme.gray700};
  font-size: 0.875rem;
  margin-bottom: ${spacing.lg};
`;

const NotesArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${spacing.md};
  border: 1px solid ${({ theme }) => theme.gray300};
  border-radius: ${radius.md};
  font-family: inherit;
  font-size: 0.875rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryPurple};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-top: ${spacing.lg};
  justify-content: space-between;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${radius.full};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  ${({ variant, theme }) => variant === 'secondary' ? `
    background: ${theme.white};
    color: ${theme.gray600};
    border: 1px solid ${theme.gray300};

    &:hover {
      background: ${theme.gray100};
    }
  ` : `
    background: ${theme.primaryPurple};
    color: ${theme.white};

    &:hover {
      opacity: 0.9;
    }
  `}
`;

const steps = [
  'Clean the material thoroughly and remove...',
  'Measure your desk space and plan organiz...',
  'Cut cardboard into base (30x20cm) and di...',
  'Create slots by cutting cardboard pieces...',
  'Assemble the base and dividers using glu...',
  'Reinforce joints with jute rope or cloth...',
  'Sand rough edges for smooth finish...',
  'Optional: Paint with bright colors to ma...',
  'Test by placing pens, papers, and small ...',
  'Make final adjustments for perfect fit a...',
];

const StepGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Container>
      <Card>
        <Header>
          <Icon>📋</Icon>
          <div>
            <Title>Step-by-Step Guide</Title>
          </div>
        </Header>

        <Progress>
          0 of 10 completed
          <br />
          Time: 0:00
        </Progress>

        <StepsList>
          {steps.map((step, index) => (
            <StepItem
              key={index}
              isActive={currentStep === index}
              onClick={() => setCurrentStep(index)}
            >
              <strong>{index + 1}</strong>
              <span>{step}</span>
            </StepItem>
          ))}
        </StepsList>

        <StepDetail>
          <StepTitle>Step {currentStep + 1} of 10</StepTitle>
          <StepDescription>
            Clean the material thoroughly and remove any labels or stickers
          </StepDescription>
          
          <EstimatedTime>
            Est. time: 10-20 min
          </EstimatedTime>

          <label style={{ display: 'block', marginBottom: spacing.md, color: '#374151', fontWeight: 500 }}>
            Your Notes:
          </label>
          <NotesArea placeholder="Add notes about this step..." />
        </StepDetail>

        <ButtonGroup>
          <Button variant="secondary">← Previous</Button>
          <Button>Mark Complete</Button>
          <Button variant="secondary">Next →</Button>
        </ButtonGroup>
      </Card>
    </Container>
  );
};

export default StepGuide;
