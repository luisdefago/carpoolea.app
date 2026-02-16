import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Card } from '../../../components';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';
import { userService } from '../../../services/userService';
import { colors, spacing, typography } from '../../../constants';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, setUser } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    photoUrl: user?.photoUrl || '',
  });

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      showToast('El nombre y apellido son obligatorios', 'error');
      return;
    }

    if (!formData.phone.trim()) {
      showToast('El teléfono es obligatorio', 'error');
      return;
    }

    // Basic phone validation (at least 8 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      showToast('Ingresa un número de teléfono válido', 'error');
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await userService.updateProfile({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        photoUrl: formData.photoUrl.trim() || undefined,
      });

      // Update user in context
      setUser(updatedUser);
      showToast('Perfil actualizado correctamente', 'success');
      navigation.goBack();
    } catch (error) {
      showToast('No se pudo actualizar el perfil', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Card padding="lg">
          <Text style={styles.sectionTitle}>Información Personal</Text>

          <Input
            label="Nombre"
            placeholder="Tu nombre"
            value={formData.firstName}
            onChangeText={(text: string) => setFormData({ ...formData, firstName: text })}
            autoCapitalize="words"
          />

          <Input
            label="Apellido"
            placeholder="Tu apellido"
            value={formData.lastName}
            onChangeText={(text: string) => setFormData({ ...formData, lastName: text })}
            autoCapitalize="words"
          />

          <Input
            label="Teléfono"
            placeholder="+54 9 11 1234-5678"
            value={formData.phone}
            onChangeText={(text: string) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />

          <Input
            label="URL de Foto de Perfil (opcional)"
            placeholder="https://ejemplo.com/foto.jpg"
            value={formData.photoUrl}
            onChangeText={(text: string) => setFormData({ ...formData, photoUrl: text })}
            autoCapitalize="none"
            keyboardType="url"
          />

          <Text style={styles.infoText}>
            Email: <Text style={styles.infoValue}>{user?.email}</Text>
          </Text>

          <Text style={styles.note}>
            💡 El email no se puede modificar ya que es tu identificador único de cuenta
          </Text>

          <Button
            title="Guardar Cambios"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.saveButton}
          />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  infoValue: {
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.semibold,
  },
  note: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
  },
  saveButton: {
    marginTop: spacing.lg,
  },
});
