import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../styles/styles';

interface RestockScreenProps {
  onBack: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const RestockScreen = ({ onBack, onSave, onCancel }: RestockScreenProps) => {
  const [restockBoxes, setRestockBoxes] = useState<string>('1');
  const [restockPerBox, setRestockPerBox] = useState<string>('30');

  const boxes = parseInt(restockBoxes || '0', 10) || 0;
  const perBox = parseInt(restockPerBox || '0', 10) || 0;
  const totalToAdd = boxes * perBox;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recargar Medicamento</Text>
      </View>

      <View style={styles.restockCard}>
        <Text style={styles.restockCardTitle}>Cantidad a recargar</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Número de cajas</Text>
          <TextInput
            style={styles.textInput}
            value={restockBoxes}
            onChangeText={setRestockBoxes}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Pastillas por caja</Text>
          <TextInput
            style={styles.textInput}
            value={restockPerBox}
            onChangeText={setRestockPerBox}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.totalToAddContainer}>
          <Text style={styles.totalToAddText}>
            Total a añadir: <Text style={styles.totalToAddNumber}>{totalToAdd} pastillas</Text>
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelActionButton]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.saveActionButton]}
          onPress={onSave}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RestockScreen;