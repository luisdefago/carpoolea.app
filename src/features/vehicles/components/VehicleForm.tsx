import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Input, Button, Card } from '../../../components';
import { colors, spacing, typography } from '../../../constants';
import { CreateVehicleDto, Vehicle } from '../../../types/api.types';

interface VehicleFormProps {
  initialData?: Vehicle;
  onSubmit: (data: CreateVehicleDto) => void;
  loading?: boolean;
  submitLabel?: string;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  submitLabel = 'Guardar',
}) => {
  const [formData, setFormData] = useState<CreateVehicleDto>({
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    color: initialData?.color || '',
    licensePlate: initialData?.licensePlate || '',
    trunkCapacity: initialData?.trunkCapacity || 'medium',
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card padding="lg">
        <Input
          label="Marca"
          placeholder="Ej: Toyota"
          value={formData.brand}
          onChangeText={(text: string) => setFormData({ ...formData, brand: text })}
        />
        <Input
          label="Modelo"
          placeholder="Ej: Corolla"
          value={formData.model}
          onChangeText={(text: string) => setFormData({ ...formData, model: text })}
        />
        <Input
          label="Color"
          placeholder="Ej: Blanco"
          value={formData.color}
          onChangeText={(text: string) => setFormData({ ...formData, color: text })}
        />
        <Input
          label="Matrícula"
          placeholder="ABC 1234"
          value={formData.licensePlate}
          onChangeText={(text: string) => setFormData({ ...formData, licensePlate: text })}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Capacidad del Baúl</Text>
        <View style={styles.capacityContainer}>
          {(['small', 'medium', 'large'] as const).map((cap) => (
            <TouchableOpacity
              key={cap}
              style={[
                styles.capacityButton,
                formData.trunkCapacity === cap && styles.capacityButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, trunkCapacity: cap })}
            >
              <Text style={[
                styles.capacityButtonText,
                formData.trunkCapacity === cap && styles.capacityButtonTextActive,
              ]}>
                {cap === 'small' ? 'Pequeño' : cap === 'medium' ? 'Mediano' : 'Grande'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title={submitLabel}
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.saveButton}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  capacityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  capacityButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  capacityButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  capacityButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  capacityButtonTextActive: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  saveButton: {
    marginTop: spacing.md,
  },
});
