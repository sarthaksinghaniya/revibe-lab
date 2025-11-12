import styled from 'styled-components';
import { spacing, radius, typography } from '@/theme/tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${radius.sm};
  font-size: ${typography.sizeMd};
  font-weight: ${typography.weightMedium};
  cursor: pointer;
  border: none;
  transition: background 0.2s ease;
  color: ${({ theme }) => theme.white};

  background: ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'secondary':
        return theme.gray700;
      case 'ghost':
        return 'transparent';
      default:
        return theme.primaryPurple;
    }
  }};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({ children, variant, ...rest }) => (
  <StyledButton variant={variant} {...rest}>
    {children}
  </StyledButton>
);

export default Button;
