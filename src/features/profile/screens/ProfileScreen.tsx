import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { styles } from './ProfileScreen.styles';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', onPress: logout, style: 'destructive' },
      ]
    );
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </Text>
        </View>
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Teléfono</Text>
          <Text style={styles.infoValue}>{user.phone}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Calificación</Text>
          <Text style={styles.infoValue}>
            ⭐ {user.totalRatings > 0 ? (user.rating / user.totalRatings).toFixed(1) : 'Sin calificar'}
          </Text>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.infoRow}
          onPress={() => navigation.navigate('Vehicles')}
        >
          <Text style={styles.infoLabel}>Mis Vehículos</Text>
          <Text style={styles.infoValue}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
