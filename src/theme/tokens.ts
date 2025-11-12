// Design tokens for ReVibe-Lab based on AWS Cloudscape style system
// TeamHanu primary colors extracted: Deep Blue #0A4D8C, Vibrant Orange #FFB400

export const colors = {
  // Primary brand colours - ReVibe purple/blue
  primaryPurple: '#5226b8ff', // Indigo purple
  primaryBlue: '#6366F1', // Indigo purple
  primaryOrange: '#F97316', // Bright orange accent
  purple600: '#7C3AED',
  purple500: '#A855F7',
  purple400: '#D8B4FE',

  // Neutral palette
  black: '#000000',
  white: '#FFFFFF',
  gray100: '#F9FAFB',
  gray200: '#F3F4F6',
  gray300: '#E5E7EB',
  gray400: '#D1D5DB',
  gray500: '#9CA3AF',
  gray600: '#6B7280',
  gray700: '#4B5563',
  gray800: '#1F2937',
  gray900: '#008080',

  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '40px',
};

export const typography = {
  fontFamily: "'Amazon Ember', 'Helvetica Neue', Arial, sans-serif",
  sizeSm: '0.875rem',
  sizeMd: '1rem',
  sizeLg: '1.25rem',
  sizeXl: '1.5rem',
  weightRegular: 400,
  weightMedium: 500,
  weightBold: 700,
};

export const breakpoints = {
  mobile: '768px',
  desktop: '1200px',
};

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const lightTheme = {
  mode: 'light' as const,
  ...colors,
  background: colors.white,
  breakpoints,
  radius,
  text: colors.gray900,
};

export const darkTheme = {
  mode: 'dark' as const,
  ...colors,
  background: colors.gray900,
  breakpoints,
  radius,
  text: colors.gray100,
};
