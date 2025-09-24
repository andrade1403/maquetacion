import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import MedicationIcon from '../components/MedicationIcon';
import MedicationToggle from '../components/MedicationToggle';
import TimePickerModal from '../components/TimePickerModal';
import { Medication } from '../utils/mockData';

interface EditAlarmScreenProps {
  medication: Medication;
  onBack: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditAlarmScreen = ({ medication, onBack, onSave, onCancel }: EditAlarmScreenProps) => {
  const [selectedTime, setSelectedTime] = useState<string>(medication.nextTime);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Alarma</Text>
      </View>

      <View style={styles.formCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <MedicationIcon type={medication.pillIcon} style={{ width: 60, height: 60 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16}}>{medication.name}</Text>
            <Text style={{ fontSize: 16 }}>{medication.dose}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2563EB' }}>
              {medication.nextTime}
            </Text>
            <Text style={{ fontSize: 16, color: '#6B7280' }}>1 pastilla</Text>
          </View>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={[styles.formSectionTitle, { fontSize: 20, marginBottom: 12 }]}>
          Configuración de Alarma
        </Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Descripción</Text>
          <TextInput style={styles.textInput} placeholder="Descripción de la alarma" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Hora</Text>
          <TouchableOpacity
            style={[styles.textInput, { justifyContent: 'center' }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={{ fontSize: 16 }}>{selectedTime}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Cantidad a tomar</Text>
          <TextInput style={styles.textInput} placeholder="Cantidad a tomar" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <MedicationToggle />
          <Text style={styles.inputLabel}>Recordatorio cada 5 minutos</Text>
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

      <TimePickerModal
        visible={showTimePicker}
        selectedTime={selectedTime}
        onTimeSelect={setSelectedTime}
        onClose={() => setShowTimePicker(false)}
      />
    </ScrollView>
  );
};

export default EditAlarmScreen;