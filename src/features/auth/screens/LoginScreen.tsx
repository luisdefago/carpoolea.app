import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Input, Button } from '../../../components';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';
import { styles } from './LoginScreen.styles';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      setLoading(true);
      await login({ email, password });
      showToast('Bienvenido de nuevo', 'success');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Error al iniciar sesión', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Button
            title={loading ? 'Cargando...' : 'Iniciar Sesión'}
            onPress={handleLogin}
            disabled={loading}
            style={styles.loginButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
