import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../constants';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onHide: () => void;
  duration?: number;
}

const { width } = Dimensions.get('window');

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onHide,
  duration = 3000,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      hide();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const hide = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'alert-circle';
      case 'info':
        return 'information-circle';
      default:
        return 'information-circle';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.success || '#4CAF50';
      case 'error':
        return colors.error || '#F44336';
      case 'info':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity,
            transform: [{ translateY }],
            backgroundColor: getBackgroundColor(),
          },
        ]}
      >
        <Ionicons name={getIcon() as any} size={24} color={colors.white} />
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  text: {
    flex: 1,
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    marginLeft: spacing.sm,
  },
});
