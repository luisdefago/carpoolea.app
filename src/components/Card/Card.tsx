import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors, spacing } from '../../constants';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  padding?: keyof typeof spacing;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  padding = 'md',
  style,
  ...props 
}) => {
  return (
    <View 
      style={[
        styles.card, 
        { padding: spacing[padding] },
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
