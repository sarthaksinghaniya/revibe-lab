import 'styled-components';
import { colors, spacing, breakpoints, radius } from './tokens';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    primaryPurple: string;
    primaryBlue: string;
    primaryOrange: string;
    purple600: string;
    purple500: string;
    purple400: string;
    black: string;
    white: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray800: string;
    gray900: string;
    success: string;
    danger: string;
    warning: string;
    background: string;
    text: string;
    breakpoints: typeof breakpoints;
    radius: typeof radius;
  }
}
