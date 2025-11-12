import React from 'react';
import styled from 'styled-components';
import { spacing, radius } from '@/theme/tokens';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.header`
  display: flex;
  flex-direction: column;
  background: #E1DBD1;
  border-bottom: 1px solid ${({ theme }) => theme.gray200};
  padding: ${spacing.md} ${spacing.lg};
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.lg};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const LogoBadge = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${radius.md};
  background: ${({ theme }) => theme.primaryPurple};
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Logo = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.gray900};
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.gray600};
  
  select {
    border: 1px solid ${({ theme }) => theme.gray300};
    border-radius: ${radius.md};
    padding: ${spacing.xs} ${spacing.sm};
    background: ${({ theme }) => theme.white};
    cursor: pointer;
    font-size: 0.875rem;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: ${spacing.md};
  overflow-x: auto;
  padding-bottom: ${spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${spacing.sm};
  }
`;

const StyledNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${radius.full};
  background: ${({ theme }) => theme.gray100};
  color: ${({ theme }) => theme.gray700};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.gray200};
  }

  &.active {
    background: ${({ theme }) => theme.primaryPurple};
    color: ${({ theme }) => theme.white};
  }

  &.active:hover {
    background: ${({ theme }) => theme.primaryPurple};
  }
`;

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children }) => (
  <StyledNavLink to={to} className={isActive ? 'active' : ''}>
    {children}
  </StyledNavLink>
);


interface NavBarProps {
  onToggleTheme: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onToggleTheme }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Container>
      <TopBar>
        <LogoContainer>
          <LogoBadge>R</LogoBadge>
          <Logo>ReVibe</Logo>
        </LogoContainer>
        <LanguageSelector>
          <span>Language:</span>
          <select defaultValue="en">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </LanguageSelector>
      </TopBar>
      <NavLinks>
        <NavLink to="/" isActive={isActive('/')}>
          ✨ Generate
        </NavLink>
        <NavLink to="/step-guide" isActive={isActive('/step-guide')}>
          📋 Step Guide
        </NavLink>
        <NavLink to="/learn" isActive={isActive('/learn')}>
          📚 Learn
        </NavLink>
        <NavLink to="/materials" isActive={isActive('/materials')}>
          🎨 Materials
        </NavLink>
        <NavLink to="/find-sources" isActive={isActive('/find-sources')}>
          🔍 Find Sources
        </NavLink>
      </NavLinks>
    </Container>
  );
};

export default NavBar;
