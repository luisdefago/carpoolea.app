import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VehicleForm } from '../components/VehicleForm';
import { vehicleService } from '../../../services/vehicleService';
import { useToast } from '../../../contexts/ToastContext';
import { colors } from '../../../constants';
import { CreateVehicleDto } from '../../../types/api.types';

export const AddVehicleScreen: React.FC = () => {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = async (data: CreateVehicleDto) => {
    const { brand, model, color, licensePlate } = data;
    if (!brand || !model || !color || !licensePlate) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      setLoading(true);
      await vehicleService.create(data);
      showToast('Vehículo registrado correctamente', 'success');
      navigation.goBack();
    } catch (error) {
      showToast('No se pudo registrar el vehículo', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <VehicleForm
        onSubmit={handleSave}
        loading={loading}
        submitLabel="Registrar Vehículo"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
});
