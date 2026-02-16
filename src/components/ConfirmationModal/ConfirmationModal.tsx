import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Button } from '../Button';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

const { width } = Dimensions.get('window');

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelText}>{cancelLabel}</Text>
                </TouchableOpacity>
                <Button
                  title={confirmLabel}
                  onPress={onConfirm}
                  style={[
                    styles.confirmButton,
                    isDestructive && styles.destructiveButton,
                  ]}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    padding: spacing.xl,
  },
  content: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semibold,
  },
  confirmButton: {
    flex: 1.5,
    marginLeft: spacing.md,
  },
  destructiveButton: {
    backgroundColor: colors.error,
  },
});
