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

const Home: React.FC = () => {
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
          <Badge>🔍 Show Nearby Recycling Centers</Badge>
          <CardTitle>Find Resources</CardTitle>
          <CardDescription>
            No idea yet? Explore a material and press Generate with AI
          </CardDescription>
          <div style={{ 
            height: '300px', 
            background: '#F3F4F6', 
            borderRadius: radius.lg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9CA3AF'
          }}>
            Map will appear here
          </div>
        </Card>
      </Grid>
    </Container>
  );
};

export default Home;
