/**
 * Aplicación Móvil de Medicamentos para Adultos Mayores
 * React Native Version
 */

import React from 'react';
import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { MedicationApp } from './src/components/MedicationApp';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <MedicationApp />
    </SafeAreaProvider>
  );
}

export default App;
