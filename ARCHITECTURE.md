# Carpoolea Mobile - Arquitectura del Proyecto

## 📱 Stack Tecnológico

- **Framework**: Expo SDK 54
- **UI**: React Native 0.81
- **Language**: TypeScript 5.9 (strict mode)
- **State Management**: React Context API / Zustand (a definir)
- **Navigation**: React Navigation (a configurar)
- **API Client**: Axios / Fetch
- **Testing**: Jest + React Native Testing Library

## 🏗️ Estructura del Proyecto

### Arquitectura Feature-First (Modular)

La aplicación sigue una arquitectura **Feature-First**, donde cada funcionalidad principal tiene su propia carpeta autocontenida. Los elementos compartidos entre múltiples features se ubican en carpetas globales.

```
src/
├── components/          # Componentes UI reutilizables globales
│   ├── Avatar/
│   │   ├── Avatar.tsx
│   │   ├── Avatar.test.tsx
│   │   └── index.ts
│   ├── Button/
│   ├── Card/
│   └── TextField/
│
├── screens/            # Pantallas de navegación top-level
│   ├── AuthStack/
│   └── MainStack/
│
├── features/          # Módulos de funcionalidad
│   ├── auth/
│   │   ├── components/     # Componentes específicos de auth
│   │   ├── screens/        # LoginScreen, RegisterScreen
│   │   ├── hooks/          # useAuth, useLogin
│   │   ├── services/       # authService.ts
│   │   ├── types/          # auth.types.ts
│   │   └── index.ts
│   │
│   ├── trips/
│   │   ├── components/     # TripCard, TripList
│   │   ├── screens/        # TripListScreen, TripDetailScreen
│   │   ├── hooks/          # useTrips, useCreateTrip
│   │   ├── services/       # tripService.ts
│   │   ├── types/          # trip.types.ts
│   │   └── index.ts
│   │
│   ├── profile/
│   └── vehicles/
│
├── navigation/        # Configuración de navegación
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── MainNavigator.tsx
│   └── types.ts
│
├── contexts/         # Contextos globales
│   ├── AuthContext/
│   │   ├── AuthContext.tsx
│   │   ├── AuthProvider.tsx
│   │   └── index.ts
│   └── ThemeContext/
│
├── hooks/            # Hooks reutilizables globales
│   ├── useMediaQuery/
│   ├── useKeyboard/
│   └── useDebounce/
│
├── services/         # Servicios globales
│   ├── api/
│   │   ├── apiClient.ts    # Configuración Axios
│   │   ├── endpoints.ts
│   │   └── interceptors.ts
│   └── storage/
│       └── asyncStorage.ts
│
├── utils/            # Utilidades globales
│   ├── formatters/
│   │   ├── date.ts
│   │   └── currency.ts
│   └── validators/
│       └── forms.ts
│
├── types/            # Tipos TypeScript globales
│   ├── common.types.ts
│   ├── api.types.ts
│   └── navigation.types.ts
│
├── constants/        # Constantes de la app
│   ├── colors.ts
│   ├── fonts.ts
│   ├── spacing.ts
│   └── config.ts
│
├── assets/          # Recursos estáticos
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── App.tsx
└── index.ts
```

## 🎯 Principios de Organización

### 1. **Feature-First sobre Type-First**

❌ **Evitar** (Type-First):
```
screens/
  - LoginScreen.tsx
  - RegisterScreen.tsx
  - TripListScreen.tsx
  - ProfileScreen.tsx
```

✅ **Preferir** (Feature-First):
```
features/
  auth/
    screens/
      - LoginScreen.tsx
      - RegisterScreen.tsx
  trips/
    screens/
      - TripListScreen.tsx
```

### 2. **Colocation (Colocación)**

Mantén relacionado lo que cambia junto:
- Componentes con sus tests
- Hooks con sus componentes
- Servicios con sus features

### 3. **Shared vs Feature-Specific**

**Regla de oro**: Si algo se usa en **2+ features** → va a carpetas globales (`/components`, `/hooks`, etc.)

```typescript
// ✅ Global - usado en auth, trips, profile
src/components/Avatar/Avatar.tsx

// ✅ Feature-specific - solo en trips
src/features/trips/components/TripCard/TripCard.tsx
```

## 📂 Convenciones de Carpetas

### Feature Module

Cada feature debe exportar un punto de entrada limpio:

```typescript
// features/trips/index.ts
export { TripListScreen } from './screens/TripListScreen';
export { TripDetailScreen } from './screens/TripDetailScreen';
export { useTrips } from './hooks/useTrips';
export type { Trip, CreateTripDto } from './types/trip.types';
```

### Component Structure

```
ComponentName/
├── ComponentName.tsx      # Componente principal
├── ComponentName.test.tsx # Tests
├── ComponentName.styles.ts # Estilos (opcional)
├── types.ts               # Tipos locales (opcional)
└── index.ts               # Re-export
```

### Screen Structure

```tsx
// features/trips/screens/TripListScreen.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import { TripCard } from '../components/TripCard';
import { useTrips } from '../hooks/useTrips';

export const TripListScreen = () => {
  const { trips, loading } = useTrips();
  
  return (
    <View>
      <FlatList
        data={trips}
        renderItem={({ item }) => <TripCard trip={item} />}
      />
    </View>
  );
};
```

## 🔌 Integración con Backend

### API Service Layer

```typescript
// services/api/apiClient.ts
import axios from 'axios';
import { API_BASE_URL } from '../../constants/config';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para auth token
apiClient.interceptors.request.use((config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

```typescript
// features/trips/services/tripService.ts
import { apiClient } from '@/services/api/apiClient';
import type { Trip, CreateTripDto } from '../types/trip.types';

export const tripService = {
  getAll: async (): Promise<Trip[]> => {
    const { data } = await apiClient.get('/trips/search');
    return data;
  },
  
  create: async (dto: CreateTripDto): Promise<Trip> => {
    const { data } = await apiClient.post('/trips', dto);
    return data;
  },
};
```

## 🎨 Theming & Styling

### Usar StyleSheet de React Native

```typescript
// components/Button/Button.styles.ts
import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/constants';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## 🧪 Testing Strategy

### Unit Tests

```typescript
// components/Button/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Click me</Button>);
    
    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### Integration Tests

```typescript
// features/trips/screens/TripListScreen.test.tsx
import { render, waitFor } from '@testing-library/react-native';
import { TripListScreen } from './TripListScreen';
import { tripService } from '../services/tripService';

jest.mock('../services/tripService');

describe('TripListScreen', () => {
  it('should display trips from API', async () => {
    tripService.getAll.mockResolvedValue([
      { id: 1, originCity: 'Montevideo', destinationCity: 'Punta del Este' }
    ]);
    
    const { getByText } = render(<TripListScreen />);
    
    await waitFor(() => {
      expect(getByText('Montevideo')).toBeTruthy();
    });
  });
});
```

## 🚀 Mejores Prácticas

### 1. TypeScript Strict Mode

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 2. Absolute Imports

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@features/*": ["src/features/*"]
    }
  }
}
```

```typescript
// Uso
import { Button } from '@components/Button';
import { useTrips } from '@features/trips/hooks/useTrips';
```

### 3. Barrel Exports

```typescript
// features/trips/index.ts
export * from './screens/TripListScreen';
export * from './screens/TripDetailScreen';
export * from './hooks/useTrips';
export * from './types/trip.types';
```

### 4. Evitar Prop Drilling

```typescript
// ❌ Prop Drilling
<ParentComponent>
  <ChildComponent user={user}>
    <GrandchildComponent user={user} />
  </ChildComponent>
</ParentComponent>

// ✅ Context API
<AuthProvider>
  <ParentComponent>
    <ChildComponent>
      <GrandchildComponent /> {/* usa useAuth() */}
    </ChildComponent>
  </ParentComponent>
</AuthProvider>
```

## 📱 Navigation Patterns

```typescript
// navigation/types.ts
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  TripList: undefined;
  TripDetail: { tripId: number };
  Profile: undefined;
};
```

```typescript
// features/trips/screens/TripListScreen.tsx
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { MainStackParamList } from '@/navigation/types';

export const TripListScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  
  const handleTripPress = (tripId: number) => {
    navigation.navigate('TripDetail', { tripId });
  };
  
  // ...
};
```

## 🔐 Environment Variables

```typescript
// constants/config.ts
import Constants from 'expo-constants';

export const API_BASE_URL = 
  __DEV__ 
    ? 'http://192.168.0.170:3000' // Tu IP local para testing
    : Constants.expoConfig?.extra?.apiUrl || 'https://api.carpoolea.com';
```

```javascript
// app.json
{
  "expo": {
    "extra": {
      "apiUrl": "https://api.carpoolea.com"
    }
  }
}
```

## 📊 Escalabilidad

Esta arquitectura soporta:

✅ **Adición de features** sin afectar código existente  
✅ **Testing aislado** por feature  
✅ **Code splitting** natural  
✅ **Equipos paralelos** trabajando en diferentes features  
✅ **Refactoring seguro** con scope limitado  

## 🔄 Migración Incremental

Si empiezas simple y creces:

1. **Fase 1**: Todo en `/screens`
2. **Fase 2**: Mover screens relacionadas a `/features`
3. **Fase 3**: Añadir `hooks/`, `services/` dentro de features
4. **Fase 4**: Extraer código compartido a carpetas globales

## 📚 Referencias

- [React Native Best Practices](https://reactnative.dev/docs/introduction)
- [Expo Documentation](https://docs.expo.dev/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Navigation](https://reactnavigation.org/)
