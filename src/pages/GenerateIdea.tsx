import React from 'react';
import styled from 'styled-components';
import { spacing, radius } from '@/theme/tokens';
import { useNavigate } from 'react-router-dom';

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
`;

const GenerateIdea: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Grid>
        <Card>
          <Badge>✨ Create Your Idea</Badge>
          <CardTitle>Smart Material Detection</CardTitle>
          <CardDescription>
            Upload or drop a photo to automatically detect materials
          </CardDescription>
          
          <UploadArea>
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
            <Input type="text" placeholder="Type an idea" />
          </FormGroup>

          <FormGroup>
            <Label>What material do you want to upcycle?</Label>
            <Input type="text" placeholder="plastic bottle" defaultValue="plastic bottle" />
          </FormGroup>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md, marginBottom: spacing.lg }}>
            <FormGroup style={{ marginBottom: 0 }}>
              <Label>Category</Label>
              <Select>
                <option>Education</option>
                <option>Art</option>
                <option>Home</option>
              </Select>
            </FormGroup>
            <FormGroup style={{ marginBottom: 0 }}>
              <Label>Complexity</Label>
              <Select>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Select>
            </FormGroup>
          </div>

          <FormGroup>
            <Label>Max Budget (₹)</Label>
            <Input type="number" placeholder="100" defaultValue="100" />
          </FormGroup>

          <Button onClick={() => navigate('/step-guide')}>
            Generate
          </Button>
        </Card>

        <Card>
          <Badge>💡 Generated Idea</Badge>
          
          <OutputImage>
            🎨
          </OutputImage>

          <IdeaTitle>Desk Organizer from Plastic Bottle</IdeaTitle>

          <DetailGrid>
            <DetailItem>
              <DetailLabel>⏱️ Estimated Time</DetailLabel>
              <DetailValue>90-120 min</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>💰 Budget</DetailLabel>
              <DetailValue>₹100</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>📊 Complexity</DetailLabel>
              <DetailValue>Low</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>🏷️ Category</DetailLabel>
              <DetailValue>Education</DetailValue>
            </DetailItem>
          </DetailGrid>

          <DescriptionBox>
            <DescriptionLabel>📝 Project Description</DescriptionLabel>
            <DescriptionText>
              Transform a plastic bottle into a functional desk organizer. This eco-friendly project teaches upcycling principles while creating a practical storage solution for your workspace. Perfect for beginners!
            </DescriptionText>
          </DescriptionBox>

          <DescriptionBox>
            <DescriptionLabel>🎯 Learning Outcomes</DescriptionLabel>
            <DescriptionText>
              • Understand upcycling and waste reduction
              • Develop creative problem-solving skills
              • Learn material transformation techniques
              • Create sustainable products
            </DescriptionText>
          </DescriptionBox>

          <ActionButton onClick={() => navigate('/step-guide')}>
            Start Project →
          </ActionButton>
        </Card>
      </Grid>
    </Container>
  );
};

export default GenerateIdea;
