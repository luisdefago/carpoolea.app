import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Helper to get the correct localhost URL for each platform
const getApiBaseUrl = () => {
  if (__DEV__) {
    // En desarrollo
    if (Platform.OS === 'android') {
      // Emulador Android usa 10.0.2.2 para localhost
      return 'http://10.0.2.2:3000';
    }
    if (Platform.OS === 'ios') {
      // Simulador iOS puede usar localhost
      return 'http://localhost:3000';
    }
    // Web también usa localhost
    return 'http://localhost:3000';
  }
  
  // En producción
  return Constants.expoConfig?.extra?.apiUrl ?? 'https://api.carpoolea.com';
};

export const config = {
  // API Configuration
  API_BASE_URL: getApiBaseUrl(),
  
  API_TIMEOUT: 10000,
  
  // App Configuration
  APP_NAME: 'Carpoolea',
  APP_VERSION: Constants.expoConfig?.version ?? '1.0.0',
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: '@carpoolea:auth_token',
    USER_DATA: '@carpoolea:user_data',
  },
} as const;
