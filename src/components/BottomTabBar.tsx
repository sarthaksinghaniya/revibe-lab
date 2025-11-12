import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { spacing } from '@/theme/tokens';

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;
  background: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.gray200};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const Tab = styled(Link)<{ active: boolean }>`
  flex: 1;
  padding: ${spacing.sm};
  text-align: center;
  color: ${({ theme, active }) => (active ? theme.primaryPurple : theme.gray600)};
  font-size: 0.75rem;
`;

const BottomTabBar: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { path: '/', label: 'Home' },
    { path: '/generate', label: 'Generate' },
    { path: '/step-guide', label: 'Guide' },
    { path: '/learn', label: 'Learn' },
    { path: '/materials', label: 'Materials' },
  ];

  return (
    <Container>
      {tabs.map((tab) => (
        <Tab key={tab.path} to={tab.path} active={location.pathname === tab.path}>
          {tab.label}
        </Tab>
      ))}
    </Container>
  );
};

export default BottomTabBar;
