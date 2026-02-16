// Design tokens - Colors
export const colors = {
  // Primary palette (Vibrant Purple - matching design)
  primary: '#9C27B0',      // Purple/Violet
  primaryDark: '#7B1FA2',
  primaryLight: '#BA68C8',
  
  // Secondary
  secondary: '#10B981',    // Emerald
  secondaryDark: '#059669',
  secondaryLight: '#34D399',
  
  // Neutral
  black: '#1F2937',
  gray900: '#111827',
  gray800: '#1F2937',
  gray700: '#374151',
  gray600: '#4B5563',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray300: '#D1D5DB',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',
  white: '#FFFFFF',
  
  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Background
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  
  // Text
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Border
  border: '#E5E7EB',
  borderDark: '#D1D5DB',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type Color = typeof colors[keyof typeof colors];
