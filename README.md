# Carpoolea Mobile App

Aplicación móvil de Carpoolea construida con **Expo** y **React Native** usando **TypeScript**.

## 🚀 Stack Tecnológico

- **Expo SDK**: ~54.0.33
- **React**: 19.1.0
- **React Native**: 0.81.5
- **TypeScript**: ~5.9.2 (strict mode)

## 📦 Instalación

Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
npm install
```

## 🏃‍♂️ Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en Web
npm run web
```

## 📱 Desarrollo

### Estructura del Proyecto

```
carpoolea.app/
├── App.tsx           # Componente principal
├── assets/           # Imágenes e íconos
├── app.json          # Configuración de Expo
├── tsconfig.json     # Configuración de TypeScript
└── package.json      # Dependencias
```

### Ejecutar la App

1. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

2. Escanea el código QR con:
   - **Android**: App Expo Go
   - **iOS**: Cámara nativa

3. O presiona:
   - `a` - Abrir en Android
   - `i` - Abrir en iOS
   - `w` - Abrir en navegador

## 🔗 Conectar con Backend

El backend está corriendo en:
- **Local**: `http://localhost:3000`
- **PostgreSQL**: `localhost:5433`

Para conectar desde un dispositivo móvil, necesitarás usar la IP local de tu máquina en lugar de `localhost`.

## 🎨 Próximos Pasos

1. **Configurar navegación** (React Navigation)
2. **Integrar con API** del backend
3. **Implementar autenticación**
4. **Diseñar pantallas principales**:
   - Login/Registro
   - Lista de viajes
   - Detalle de viaje
   - Publicar viaje
   - Perfil de usuario

## 📚 Recursos

- [Documentación de Expo](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
