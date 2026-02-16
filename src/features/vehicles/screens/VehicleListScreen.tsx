import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Card, Button } from '../../../components';
import { vehicleService } from '../../../services/vehicleService';
import { useToast } from '../../../contexts/ToastContext';
import { useConfirm } from '../../../contexts/ConfirmationContext';
import { Vehicle } from '../../../types/api.types';
import { colors } from '../../../constants';
import { styles } from './VehicleListScreen.styles';

export const VehicleListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getMyVehicles();
      setVehicles(data);
    } catch (error) {
      showToast('No se pudieron cargar los vehículos', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useFocusEffect(
    useCallback(() => {
      fetchVehicles();
    }, [fetchVehicles])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVehicles();
    setRefreshing(false);
  };

  const handleDeleteVehicle = async (id: number) => {
    const isConfirmed = await confirm({
      title: 'Eliminar Vehículo',
      message: '¿Estás seguro que deseas eliminar este vehículo?',
      confirmLabel: 'Eliminar',
      isDestructive: true,
    });

    if (isConfirmed) {
      try {
        await vehicleService.delete(id);
        showToast('Vehículo eliminado correctamente', 'success');
        setVehicles(vehicles.filter((v) => v.id !== id));
      } catch (error) {
        showToast('No se pudo eliminar el vehículo', 'error');
      }
    }
  };

  const renderVehicle = ({ item }: { item: Vehicle }) => (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('EditVehicle', { vehicle: item })}
    >
      <Card style={styles.vehicleCard} padding="md">
        <View style={styles.vehicleInfo}>
          <View>
            <Text style={styles.vehicleTitle}>{item.brand} {item.model}</Text>
            <Text style={styles.licensePlate}>{item.licensePlate}</Text>
            <Text style={styles.trunkText}>
              Capacidad: {item.trunkCapacity === 'small' ? 'Pequeña' : item.trunkCapacity === 'medium' ? 'Mediana' : 'Grande'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteVehicle(item.id)}
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        renderItem={renderVehicle}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes vehículos registrados</Text>
            <Button
              title="Agregar Vehículo"
              onPress={() => navigation.navigate('AddVehicle')}
              style={styles.emptyButton}
            />
          </View>
        }
      />
      
      {vehicles.length > 0 && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate('AddVehicle')}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
