# Frontend Development Workflow - Carpoolea App

Este documento detalla el flujo de trabajo que **DEBE** seguirse para cada cambio en el frontend React Native.

## 📋 Checklist General para Cualquier Cambio

Antes de empezar cualquier desarrollo, asegúrate de:

- [ ] Entender completamente el requerimiento
- [ ] Verificar diseño/mockups si existen
- [ ] Revisar el plan de implementación en `task.md` si aplica
- [ ] Identificar qué features/screens se verán afectados
- [ ] Verificar que el backend tenga los endpoints necesarios

---

## 🏗️ Flujo de Trabajo por Tipo de Cambio

### 1️⃣ CREAR NUEVA PANTALLA (Screen)

#### Paso 1: Estructura de Archivos
```
src/features/<feature>/
├── screens/
│   ├── <ScreenName>Screen.tsx
│   └── <ScreenName>Screen.styles.ts
```

**Checklist**:
- [ ] Crear carpeta en `src/features/<feature>/screens/`
- [ ] Crear archivo de componente: `<Name>Screen.tsx`
- [ ] Crear archivo de estilos: `<Name>Screen.styles.ts`

#### Paso 2: Implementar Componente Base
```typescript
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './<ScreenName>Screen.styles';

export const <ScreenName>Screen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text>Screen Content</Text>
      </View>
    </ScrollView>
  );
};
```

**Checklist**:
- [ ] Importar React y componentes necesarios
- [ ] Exportar componente con `export const`
- [ ] Usar TypeScript con tipo `React.FC`
- [ ] Importar estilos desde archivo `.styles.ts`

#### Paso 3: Crear Archivo de Estilos
```typescript
import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    padding: spacing.lg,
  },
});
```

**Checklist**:
- [ ] Usar `StyleSheet.create()`
- [ ] Importar constantes de diseño (`colors`, `spacing`, `typography`)
- [ ] **NO** usar valores hardcodeados
- [ ] Mantener consistencia con diseño existente

#### Paso 4: Exportar desde Index
```typescript
// src/features/<feature>/index.ts
export * from './screens/<ScreenName>Screen';
```

**Checklist**:
- [ ] Agregar export en `index.ts` del feature
- [ ] Verificar que no hay exports duplicados

#### Paso 5: Registrar en Navegación
```typescript
// App.tsx
import { <ScreenName>Screen } from './src/features/<feature>';

// Dentro del Stack.Navigator
<Stack.Screen 
  name="<ScreenName>" 
  component={<ScreenName>Screen} 
  options={{ title: 'Título de Pantalla' }}
/>
```

**Checklist**:
- [ ] Importar screen en `App.tsx`
- [ ] Agregar al `Stack.Navigator` o `Tab.Navigator` apropiado
- [ ] Configurar `options` con título correcto
- [ ] Configurar header según necesidad

#### Paso 6: Verificar Navegación
**Checklist**:
- [ ] Probar navegación desde otra pantalla
- [ ] Verificar que el header se muestra correctamente
- [ ] Verificar animaciones de transición
- [ ] Probar botón de "volver"

---

### 2️⃣ CREAR COMPONENTE REUTILIZABLE

#### Paso 1: Ubicación
```
src/components/<ComponentName>/
├── <ComponentName>.tsx
├── <ComponentName>.styles.ts (opcional)
└── index.ts
```

**Checklist**:
- [ ] Crear carpeta en `src/components/`
- [ ] Archivo principal del componente
- [ ] Archivo de estilos SI el componente tiene estilos propios
- [ ] Archivo `index.ts` para exports limpios

#### Paso 2: Definir Props Interface
```typescript
interface <ComponentName>Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
}
```

**Checklist**:
- [ ] Crear interface para props
- [ ] Props requeridos sin `?`
- [ ] Props opcionales con `?`
- [ ] Tipos correctos de React Native
- [ ] Documentar props complejos con comentarios

#### Paso 3: Implementar Componente
```typescript
export const <ComponentName>: React.FC<<ComponentName>Props> = ({
  title,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

**Checklist**:
- [ ] Recibir props desestructuradas
- [ ] Valores por defecto para props opcionales
- [ ] Combinar estilos: `[styles.default, customStyle]`
- [ ] Manejar estados (disabled, loading, etc.)

#### Paso 4: Exportar desde Components Index
```typescript
// src/components/index.ts
export * from './<ComponentName>';
```

**Checklist**:
- [ ] Agregar export en `src/components/index.ts`
- [ ] Mantener exports ordenados alfabéticamente

#### Paso 5: Usar el Componente
```typescript
import { <ComponentName> } from '../../components';

<ComponentName 
  title="Click me"
  onPress={handlePress}
  style={styles.customButton}
/>
```

**Checklist**:
- [ ] Importar desde `../../components`
- [ ] No importar directamente desde carpeta del componente
- [ ] Pasar todas las props requeridas

---

### 3️⃣ INTEGRAR CON BACKEND (API Call)

#### Paso 1: Verificar/Crear Service
```typescript
// src/services/<entity>Service.ts
export const <entity>Service = {
  getAll: async (): Promise<<Entity>[]> => {
    const { data } = await apiClient.get('<endpoint>');
    return data;
  },
  
  create: async (dto: Create<Entity>Dto): Promise<<Entity>> => {
    const { data } = await apiClient.post('<endpoint>', dto);
    return data;
  },
};
```

**Checklist**:
- [ ] Crear servicio en `src/services/`
- [ ] Definir tipos de retorno
- [ ] Usar `apiClient` configurado
- [ ] Manejar errores con try/catch

#### Paso 2: Definir Tipos
```typescript
// src/types/api.types.ts
export interface <Entity> {
  id: number;
  name: string;
  createdAt: string;
}

export interface Create<Entity>Dto {
  name: string;
}
```

**Checklist**:
- [ ] Agregar tipos en `src/types/api.types.ts`
- [ ] Tipos deben coincidir con backend
- [ ] Usar tipos de TypeScript correctos
- [ ] Documentar campos no obvios

#### Paso 3: Usar en Componente con Estado
```typescript
const [data, setData] = useState<<Entity>[]>([]);
const [loading, setLoading] = useState(false);
const { showToast } = useToast();

const fetchData = async () => {
  try {
    setLoading(true);
    const result = await <entity>Service.getAll();
    setData(result);
  } catch (error) {
    showToast('Error al cargar datos', 'error');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);
```

**Checklist**:
- [ ] Estado de loading
- [ ] Estado para datos
- [ ] Try/catch para errores
- [ ] Usar `useToast` para notificaciones
- [ ] `finally` para siempre quitar loading

#### Paso 4: Mostrar Datos
```typescript
{loading ? (
  <ActivityIndicator size="large" color={colors.primary} />
) : data.length === 0 ? (
  <EmptyState message="No hay datos" />
) : (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
  />
)}
```

**Checklist**:
- [ ] Mostrar loading state
- [ ] Mostrar empty state
- [ ] Renderizar datos con `FlatList` o `ScrollView`
- [ ] Usar `keyExtractor` correcto

---

### 4️⃣ CREAR FORMULARIO

#### Paso 1: Estado del Formulario
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
});
```

**Checklist**:
- [ ] Usar un objeto para múltiples campos
- [ ] Valores iniciales apropiados
- [ ] Considerar usar valores del usuario si es edición

#### Paso 2: Handlers de Cambio
```typescript
const handleChange = (field: string, value: string) => {
  setFormData({ ...formData, [field]: value });
};
```

**Checklist**:
- [ ] Handler genérico para reutilización
- [ ] Spread operator para mantener otros campos
- [ ] Tipos correctos en parámetros

#### Paso 3: Validación
```typescript
const validate = (): boolean => {
  if (!formData.name.trim()) {
    showToast('El nombre es obligatorio', 'error');
    return false;
  }
  
  if (!formData.email.includes('@')) {
    showToast('Email inválido', 'error');
    return false;
  }
  
  return true;
};
```

**Checklist**:
- [ ] Validar campos obligatorios
- [ ] Validar formato (email, teléfono, etc.)
- [ ] Mostrar mensajes claros de error
- [ ] Retornar boolean

#### Paso 4: Submit
```typescript
const handleSubmit = async () => {
  if (!validate()) return;
  
  try {
    setLoading(true);
    await <entity>Service.create(formData);
    showToast('Guardado correctamente', 'success');
    navigation.goBack();
  } catch (error) {
    showToast('Error al guardar', 'error');
  } finally {
    setLoading(false);
  }
};
```

**Checklist**:
- [ ] Validar antes de enviar
- [ ] Loading state
- [ ] Toast de éxito
- [ ] Toast de error
- [ ] Navegar o actualizar UI después de éxito

#### Paso 5: Renderizar Inputs
```typescript
<Input
  label="Nombre"
  placeholder="Tu nombre"
  value={formData.name}
  onChangeText={(text: string) => handleChange('name', text)}
  autoCapitalize="words"
/>

<Button
  title="Guardar"
  onPress={handleSubmit}
  loading={loading}
  disabled={loading}
/>
```

**Checklist**:
- [ ] Usar componentes reutilizables (`Input`, `Button`)
- [ ] Labels claros
- [ ] Placeholders descriptivos
- [ ] Keyboard types apropiados
- [ ] Deshabilitar botón durante loading

---

### 5️⃣ IMPLEMENTAR NAVEGACIÓN

#### Paso 1: Navegar a Pantalla
```typescript
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation<any>();

// Navegar sin parámetros
navigation.navigate('ScreenName');

// Navegar con parámetros
navigation.navigate('EditScreen', { id: 123, item: data });
```

**Checklist**:
- [ ] Importar `useNavigation` hook
- [ ] Usar nombre exacto de screen registrada
- [ ] Pasar parámetros si es necesario

#### Paso 2: Recibir Parámetros
```typescript
import { useRoute } from '@react-navigation/native';

const route = useRoute<any>();
const { id, item } = route.params;
```

**Checklist**:
- [ ] Usar `useRoute` hook
- [ ] Desestructurar params
- [ ] Verificar que params existan antes de usar

#### Paso 3: Volver Atrás
```typescript
navigation.goBack();
```

#### Paso 4: Reemplazar Pantalla
```typescript
navigation.replace('ScreenName');
```

**Checklist**:
- [ ] Usar cuando no se debe poder volver atrás
- [ ] Común después de login/logout

---

### 6️⃣ USAR CONTEXTOS

#### Paso 1: Usar Contexto Existente
```typescript
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';
import { useConfirm } from '../../../contexts/ConfirmationContext';

const { user, logout } = useAuth();
const { showToast } = useToast();
const { confirm } = useConfirm();
```

**Checklist**:
- [ ] Importar custom hook del contexto
- [ ] Desestructurar solo lo que necesitas
- [ ] Verificar que estás dentro del Provider

#### Paso 2: Usar Toast
```typescript
// Éxito
showToast('Operación exitosa', 'success');

// Error
showToast('Algo salió mal', 'error');

// Info
showToast('Información importante', 'info');
```

#### Paso 3: Usar Confirmation Modal
```typescript
const handleDelete = async () => {
  const isConfirmed = await confirm({
    title: 'Confirmar Eliminación',
    message: '¿Estás seguro?',
    confirmLabel: 'Eliminar',
    cancelLabel: 'Cancelar',
    isDestructive: true,
  });

  if (isConfirmed) {
    // Ejecutar acción
  }
};
```

**Checklist**:
- [ ] `await` la respuesta
- [ ] Verificar resultado antes de proceder
- [ ] Usar `isDestructive: true` para acciones peligrosas

---

### 7️⃣ ESTILOS - MEJORES PRÁCTICAS

#### Reglas Obligatorias

1. **SIEMPRE usar archivo `.styles.ts` separado**
   ```typescript
   // ❌ NO HACER
   <View style={{ padding: 16, backgroundColor: '#fff' }}>
   
   // ✅ HACER
   <View style={styles.container}>
   ```

2. **SIEMPRE usar constantes de diseño**
   ```typescript
   // ❌ NO HACER
   backgroundColor: '#9C27B0'
   padding: 24
   fontSize: 18
   
   // ✅ HACER
   backgroundColor: colors.primary
   padding: spacing.lg
   fontSize: typography.fontSize.lg
   ```

3. **Combinar estilos con array**
   ```typescript
   <View style={[styles.base, styles.modifier, customStyle]} />
   ```

4. **Responsive design**
   ```typescript
   import { Dimensions, Platform } from 'react-native';
   
   const { width, height } = Dimensions.get('window');
   
   const styles = StyleSheet.create({
     container: {
       width: width * 0.9,
       ...Platform.select({
         ios: { paddingTop: 20 },
         android: { paddingTop: 10 },
       }),
     },
   });
   ```

#### Estructura de Estilos
```typescript
export const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    padding: spacing.lg,
  },
  
  // Componentes
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
  },
  
  // Textos
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  
  // Botones
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
});
```

**Checklist**:
- [ ] Agrupar estilos por tipo (layout, componentes, textos)
- [ ] Nombres descriptivos
- [ ] Usar constantes de diseño
- [ ] No duplicar estilos

---

### 8️⃣ MANEJO DE ESTADOS DE CARGA

#### Loading Global
```typescript
const [loading, setLoading] = useState(false);

{loading && (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
)}
```

#### Loading en Lista (Pull to Refresh)
```typescript
const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await fetchData();
  setRefreshing(false);
};

<FlatList
  data={data}
  renderItem={renderItem}
  refreshing={refreshing}
  onRefresh={onRefresh}
/>
```

#### Loading en Botón
```typescript
<Button
  title="Guardar"
  onPress={handleSave}
  loading={loading}
  disabled={loading}
/>
```

**Checklist**:
- [ ] Deshabilitar interacciones durante loading
- [ ] Mostrar indicador visual
- [ ] Evitar múltiples llamadas simultáneas

---

### 9️⃣ EMPTY STATES

```typescript
{data.length === 0 && !loading && (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>
      No hay elementos para mostrar
    </Text>
    <Button
      title="Agregar Primero"
      onPress={() => navigation.navigate('AddScreen')}
    />
  </View>
)}
```

**Checklist**:
- [ ] Mostrar solo cuando no hay datos Y no está cargando
- [ ] Mensaje claro y amigable
- [ ] Acción para comenzar (ej: botón para agregar)

---

## ✅ Checklist Pre-Commit

Antes de hacer commit, verificar:

- [ ] **App compila sin errores**: Revisar consola de Metro/Expo
- [ ] **No hay warnings críticos** en consola
- [ ] **Estilos externalizados** en archivo `.styles.ts`
- [ ] **Constantes de diseño** usadas (no hardcoded)
- [ ] **TypeScript sin errores**: Verificar tipos correctos
- [ ] **Navegación funciona** correctamente
- [ ] **Loading states** implementados
- [ ] **Error handling** con toasts
- [ ] **Probar en Android** (si es posible)
- [ ] **No hay `console.log` olvidados**

---

## 🎨 Sistema de Diseño

### Colores Disponibles
```typescript
import { colors } from '../constants';

colors.primary           // Morado principal
colors.secondary         // Color secundario
colors.success           // Verde para éxito
colors.error             // Rojo para errores
colors.warning           // Amarillo para advertencias
colors.info              // Azul para información
colors.textPrimary       // Texto principal
colors.textSecondary     // Texto secundario
colors.white             // Blanco
colors.black             // Negro
colors.backgroundPrimary // Fondo principal
colors.backgroundSecondary // Fondo secundario
colors.border            // Bordes
```

### Espaciados
```typescript
import { spacing } from '../constants';

spacing.xs   // 4px
spacing.sm   // 8px
spacing.md   // 16px
spacing.lg   // 24px
spacing.xl   // 32px
spacing.xxl  // 48px
```

### Tipografía
```typescript
import { typography } from '../constants';

// Tamaños
typography.fontSize.xs    // 12px
typography.fontSize.sm    // 14px
typography.fontSize.base  // 16px
typography.fontSize.lg    // 18px
typography.fontSize.xl    // 20px
typography.fontSize.xxl   // 24px

// Pesos
typography.fontWeight.regular   // '400'
typography.fontWeight.semibold  // '600'
typography.fontWeight.bold      // '700'
```

---

## 🚨 Errores Comunes y Soluciones

### Error: "Cannot read property 'X' of undefined"
**Causa**: Acceder a propiedad de objeto nulo/undefined
**Solución**: Usar optional chaining `user?.name` o verificar antes

### Error: "Maximum update depth exceeded"
**Causa**: setState en render o useEffect sin dependencias
**Solución**: Mover setState a event handler o agregar dependencias correctas

### Error: "Each child in a list should have a unique key"
**Causa**: Falta `keyExtractor` en FlatList
**Solución**: Agregar `keyExtractor={(item) => item.id.toString()}`

### Error: Metro bundler no actualiza cambios
**Solución**: 
```bash
# Limpiar cache
npx expo start --clear

# O en package.json
npm run start -- --clear
```

### Error: Estilos no se aplican
**Solución**: Verificar que los estilos estén en `StyleSheet.create({})`

---

## 📱 Testing en Dispositivo

### Android
```bash
# Iniciar en Android
npx expo start --android

# Ver logs
npx react-native log-android
```

### iOS (si tienes Mac)
```bash
# Iniciar en iOS
npx expo start --ios

# Ver logs
npx react-native log-ios
```

### Expo Go
1. Instalar Expo Go en tu dispositivo
2. Escanear QR desde terminal
3. Shake device para DevMenu

---

## 📚 Componentes Reutilizables Disponibles

### Input
```typescript
<Input
  label="Nombre"
  placeholder="Ingresa tu nombre"
  value={value}
  onChangeText={setValue}
  secureTextEntry={false}
  keyboardType="default"
  autoCapitalize="words"
/>
```

### Button
```typescript
<Button
  title="Guardar"
  onPress={handlePress}
  loading={loading}
  disabled={disabled}
  variant="primary"  // primary | secondary | outline
  style={customStyle}
/>
```

### Card
```typescript
<Card padding="lg" style={customStyle}>
  <Text>Contenido</Text>
</Card>
```

### Toast
```typescript
const { showToast } = useToast();

showToast('Mensaje', 'success' | 'error' | 'info');
```

### Confirmation Modal
```typescript
const { confirm } = useConfirm();

const result = await confirm({
  title: 'Título',
  message: 'Mensaje',
  confirmLabel: 'Sí',
  cancelLabel: 'No',
  isDestructive: true,
});
```

---

## 🎯 Prioridades de Calidad

1. **UX Consistente** - Usar componentes reutilizables
2. **Feedback Visual** - Loading states, toasts, confirmaciones
3. **Manejo de Errores** - Nunca fallar silenciosamente
4. **Estilos Externalizados** - NUNCA inline styles
5. **TypeScript** - Tipos correctos, evitar `any`
6. **Performance** - FlatList para listas largas, evitar re-renders innecesarios

---

## 📖 Estructura de Features

```
src/features/
├── auth/
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── LoginScreen.styles.ts
│   │   ├── RegisterScreen.tsx
│   │   └── RegisterScreen.styles.ts
│   └── index.ts
├── profile/
│   ├── screens/
│   │   ├── ProfileScreen.tsx
│   │   ├── ProfileScreen.styles.ts
│   │   ├── EditProfileScreen.tsx
│   │   └── EditProfileScreen.styles.ts
│   └── index.ts
└── vehicles/
    ├── components/
    │   ├── VehicleForm.tsx
    │   └── VehicleForm.styles.ts
    ├── screens/
    │   ├── VehicleListScreen.tsx
    │   ├── VehicleListScreen.styles.ts
    │   ├── AddVehicleScreen.tsx
    │   └── EditVehicleScreen.tsx
    └── index.ts
```

---

**Última actualización**: 2026-02-16
**Versión**: 1.0
