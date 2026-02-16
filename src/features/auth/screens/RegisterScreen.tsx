import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Input, Button } from '../../../components';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';
import { styles } from './RegisterScreen.styles';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { email, password, firstName, lastName, phone } = formData;

    if (!email || !password || !firstName || !lastName || !phone) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      showToast('Cuenta creada con éxito', 'success');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Error al registrarse', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.subtitle}>Completa tus datos para empezar</Text>
          </View>

          <View style={styles.form}>
            <Input
              placeholder="Nombre"
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            />

            <Input
              placeholder="Apellido"
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            />

            <Input
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              placeholder="Teléfono"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />

            <Input
              placeholder="Contraseña"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry={true}
            />

            <Button
              title={loading ? 'Cargando...' : 'Registrarse'}
              onPress={handleRegister}
              disabled={loading}
              style={styles.registerButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
