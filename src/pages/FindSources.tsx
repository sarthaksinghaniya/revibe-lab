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

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.gray900};
  margin-bottom: ${spacing.md};
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const SourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${spacing.lg};
  margin-bottom: ${spacing.lg};
`;

const SourceCard = styled.div`
  background: ${({ theme }) => theme.gray100};
  border: 1px solid ${({ theme }) => theme.gray200};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const SourceIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${spacing.md};
`;

const SourceName = styled.h3`
  color: ${({ theme }) => theme.gray900};
  margin: 0 0 ${spacing.sm} 0;
  font-size: 1.1rem;
`;

const SourceDescription = styled.p`
  color: ${({ theme }) => theme.gray600};
  margin: 0 0 ${spacing.md} 0;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const SourceLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.primaryPurple};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.gray200};
  border-radius: ${radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.gray600};
  margin-bottom: ${spacing.lg};
  font-size: 1rem;
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: ${spacing.md};
    margin-bottom: ${spacing.sm};
    background: ${({ theme }) => theme.gray100};
    border-radius: ${radius.md};
    color: ${({ theme }) => theme.gray700};
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: ${spacing.md};

    &:before {
      content: '→';
      color: ${({ theme }) => theme.primaryPurple};
      font-weight: bold;
      min-width: 20px;
    }
  }
`;

const FindSources: React.FC = () => {
  return (
    <Container>
      <Card>
        <Header>
          <Icon>🔍</Icon>
          <div>
            <Title>Find Sources</Title>
            <Subtitle>Discover materials and recycling centers near you</Subtitle>
          </div>
        </Header>

        <SectionTitle>📍 Nearby Recycling Centers</SectionTitle>
        <MapContainer>
          Map showing recycling centers will appear here
        </MapContainer>

        <SectionTitle>🏪 Material Sources</SectionTitle>
        <SourceGrid>
          <SourceCard>
            <SourceIcon>🏠</SourceIcon>
            <SourceName>Home & Storage</SourceName>
            <SourceDescription>
              Check your home first - many items can be found in storage or recycling bins
            </SourceDescription>
            <SourceLink href="#">Learn more →</SourceLink>
          </SourceCard>

          <SourceCard>
            <SourceIcon>🛠️</SourceIcon>
            <SourceName>Hardware Stores</SourceName>
            <SourceDescription>
              Visit local hardware stores for basic supplies like glue, paint, and tools
            </SourceDescription>
            <SourceLink href="#">Find nearby →</SourceLink>
          </SourceCard>

          <SourceCard>
            <SourceIcon>♻️</SourceIcon>
            <SourceName>Recycling Centers</SourceName>
            <SourceDescription>
              Professional recycling facilities often have materials available for reuse
            </SourceDescription>
            <SourceLink href="#">Locate centers →</SourceLink>
          </SourceCard>

          <SourceCard>
            <SourceIcon>👥</SourceIcon>
            <SourceName>Community Groups</SourceName>
            <SourceDescription>
              Connect with local environmental and maker communities for material sharing
            </SourceDescription>
            <SourceLink href="#">Join community →</SourceLink>
          </SourceCard>

          <SourceCard>
            <SourceIcon>🌐</SourceIcon>
            <SourceName>Online Platforms</SourceName>
            <SourceDescription>
              Browse online marketplaces for affordable materials and supplies
            </SourceDescription>
            <SourceLink href="#">Browse online →</SourceLink>
          </SourceCard>

          <SourceCard>
            <SourceIcon>🎓</SourceIcon>
            <SourceName>Educational Institutions</SourceName>
            <SourceDescription>
              Schools and universities often have maker spaces and material libraries
            </SourceDescription>
            <SourceLink href="#">Find institutions →</SourceLink>
          </SourceCard>
        </SourceGrid>
      </Card>

      <Card>
        <SectionTitle>📚 Helpful Resources</SectionTitle>
        <ResourceList>
          <li>Zero Waste Shopping Guide - Tips for eco-friendly purchasing</li>
          <li>Material Identification Guide - Learn to identify recyclable materials</li>
          <li>DIY Tool Guide - Essential tools for upcycling projects</li>
          <li>Sustainable Suppliers Directory - Vetted eco-friendly vendors</li>
          <li>Community Events Calendar - Local workshops and swap meets</li>
          <li>Environmental Organizations - Support and guidance for sustainability</li>
        </ResourceList>
      </Card>
    </Container>
  );
};

export default FindSources;
