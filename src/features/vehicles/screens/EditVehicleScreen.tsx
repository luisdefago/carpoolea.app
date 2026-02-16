import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VehicleForm } from '../components/VehicleForm';
import { vehicleService } from '../../../services/vehicleService';
import { useToast } from '../../../contexts/ToastContext';
import { colors } from '../../../constants';
import { CreateVehicleDto, Vehicle } from '../../../types/api.types';

export const EditVehicleScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { vehicle } = route.params as { vehicle: Vehicle };
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (data: CreateVehicleDto) => {
    try {
      setLoading(true);
      await vehicleService.update(vehicle.id, data);
      showToast('Vehículo actualizado correctamente', 'success');
      navigation.goBack();
    } catch (error) {
      showToast('No se pudo actualizar el vehículo', 'error');
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
        initialData={vehicle}
        onSubmit={handleUpdate}
        loading={loading}
        submitLabel="Guardar Cambios"
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
