import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { ToastProvider } from './src/contexts/ToastContext';
import { ConfirmationProvider } from './src/contexts/ConfirmationContext';
import { LoginScreen, RegisterScreen } from './src/features/auth';
import { TripListScreen } from './src/features/trips';
import { ProfileScreen, EditProfileScreen } from './src/features/profile';
import { VehicleListScreen, AddVehicleScreen, EditVehicleScreen } from './src/features/vehicles';
import { colors } from './src/constants';

import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack (Login/Register)
function AuthStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Main App Tabs (Trip List, Profile)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Viajes') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Viajes" 
        component={TripListScreen}
        options={{
          title: 'Viajes Disponibles',
          headerShown: true,
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen}
        options={{
          title: 'Mi Perfil',
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Stack (Tabs + Detail Screens)
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Vehicles" 
        component={VehicleListScreen} 
        options={{ title: 'Mis Vehículos' }}
      />
      <Stack.Screen 
        name="AddVehicle" 
        component={AddVehicleScreen} 
        options={{ title: 'Agregar Vehículo' }}
      />
      <Stack.Screen 
        name="EditVehicle" 
        component={EditVehicleScreen} 
        options={{ title: 'Editar Vehículo' }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: 'Editar Perfil' }}
      />
    </Stack.Navigator>
  );
}

// Navigation based on auth state
function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ConfirmationProvider>
          <AppNavigator />
        </ConfirmationProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
  },
});
