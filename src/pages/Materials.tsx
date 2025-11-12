import React, { useState } from 'react';
import styled from 'styled-components';
import { spacing, radius } from '@/theme/tokens';

const Container = styled.div`
  max-width: 900px;
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

const Progress = styled.div`
  color: ${({ theme }) => theme.gray600};
  font-size: 0.875rem;
  margin-bottom: ${spacing.lg};
`;

const MaterialItem = styled.div`
  padding: ${spacing.md};
  margin-bottom: ${spacing.md};
  border: 1px solid ${({ theme }) => theme.gray200};
  border-radius: ${radius.md};
  background: ${({ theme }) => theme.gray100};
`;

const MaterialName = styled.h3`
  color: ${({ theme }) => theme.gray900};
  margin: 0 0 ${spacing.sm} 0;
  font-size: 1rem;
`;

const MaterialStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.gray600};
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
`;

const CounterButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.gray300};
  background: ${({ theme }) => theme.white};
  border-radius: ${radius.md};
  cursor: pointer;
  font-weight: bold;
  color: ${({ theme }) => theme.gray700};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.gray200};
  }
`;

const CounterValue = styled.span`
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.gray900};
`;

const ShoppingList = styled.div`
  background: ${({ theme }) => theme.gray100};
  border-radius: ${radius.md};
  padding: ${spacing.lg};
  margin-top: ${spacing.lg};
`;

const ShoppingListTitle = styled.h2`
  color: ${({ theme }) => theme.gray900};
  margin: 0 0 ${spacing.md} 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const ShoppingListItem = styled.div`
  padding: ${spacing.sm} 0;
  color: ${({ theme }) => theme.gray700};
  font-size: 0.875rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray300};

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.gray900};
  margin: ${spacing.lg} 0 ${spacing.md} 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: ${spacing.sm} 0;
    color: ${({ theme }) => theme.gray700};
    font-size: 0.875rem;
    display: flex;
    align-items: flex-start;
    gap: ${spacing.md};

    &:before {
      content: '•';
      color: ${({ theme }) => theme.primaryPurple};
      font-weight: bold;
      min-width: 20px;
    }
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
  cursor: pointer;
  margin-top: ${spacing.lg};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState([
    { id: 1, name: 'plastic bottle (1 large piece)', quantity: 0, needed: 1 },
    { id: 2, name: 'Cardboard sheets (2-3 pieces)', quantity: 0, needed: 1 },
    { id: 3, name: 'Jute rope or old cloth strips (for binding)', quantity: 0, needed: 1 },
    { id: 4, name: 'White glue or fevicol (50ml)', quantity: 0, needed: 1 },
    { id: 5, name: 'Acrylic paint (optional, 100ml)', quantity: 0, needed: 1 },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setMaterials(materials.map(m => 
      m.id === id ? { ...m, quantity: Math.max(0, m.quantity + delta) } : m
    ));
  };

  const readyCount = materials.filter(m => m.quantity > 0).length;

  return (
    <Container>
      <Card>
        <Header>
          <Icon>🎨</Icon>
          <div>
            <Title>Materials Inventory</Title>
          </div>
        </Header>

        <Progress>
          {Math.round((readyCount / materials.length) * 100)}%
          <br />
          {readyCount} of {materials.length} items ready
        </Progress>

        <SectionTitle>📦 Project Materials</SectionTitle>
        {materials.map(material => (
          <MaterialItem key={material.id}>
            <MaterialName>{material.name}</MaterialName>
            <MaterialStatus>
              <span>Have:</span>
              <Counter>
                <CounterButton onClick={() => updateQuantity(material.id, -1)}>−</CounterButton>
                <CounterValue>{material.quantity}</CounterValue>
                <CounterButton onClick={() => updateQuantity(material.id, 1)}>+</CounterButton>
              </Counter>
              <span>/ {material.needed} needed</span>
            </MaterialStatus>
          </MaterialItem>
        ))}

        <ShoppingList>
          <ShoppingListTitle>🛒 Shopping List</ShoppingListTitle>
          {materials.map(m => (
            <ShoppingListItem key={m.id}>
              {m.name} ×{m.needed}
            </ShoppingListItem>
          ))}
        </ShoppingList>

        <SectionTitle>💡 Sourcing Tips</SectionTitle>
        <TipsList>
          <li>Check your home first - many items can be found in storage or recycling</li>
          <li>Visit local hardware stores for basic supplies</li>
          <li>Ask friends and family if they have spare materials</li>
          <li>Consider eco-friendly alternatives when shopping</li>
        </TipsList>

        <Button>Download Shopping List</Button>
      </Card>
    </Container>
  );
};

export default Materials;
