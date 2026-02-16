import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, RegisterData, LoginData } from '../services/authService';
import { config } from '../constants';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  photoUrl?: string;
  rating: number;
  totalRatings: number;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const storedUser = await AsyncStorage.getItem(config.STORAGE_KEYS.USER_DATA);
      const storedToken = await AsyncStorage.getItem(config.STORAGE_KEYS.AUTH_TOKEN);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(data: LoginData) {
    try {
      const response = await authService.login(data);
      
      await AsyncStorage.setItem(config.STORAGE_KEYS.AUTH_TOKEN, response.token);
      await AsyncStorage.setItem(config.STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
      
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async function register(data: RegisterData) {
    try {
      const response = await authService.register(data);
      
      await AsyncStorage.setItem(config.STORAGE_KEYS.AUTH_TOKEN, response.token);
      await AsyncStorage.setItem(config.STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
      
      setUser(response.user);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem(config.STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(config.STORAGE_KEYS.USER_DATA);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
