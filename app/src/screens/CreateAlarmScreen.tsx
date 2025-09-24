import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import NotificationOptions from '../components/NotificationOptions';
import MedicationToggle from '../components/MedicationToggle';
import TimePickerModal from '../components/TimePickerModal';
import { colorPalette } from '../utils/mockData';

interface CreateAlarmScreenProps {
  onBack: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const CreateAlarmScreen = ({ onBack, onSave, onCancel }: CreateAlarmScreenProps) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('02:00 AM');
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nueva Alarma</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formSectionTitle}>Información medicamento</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nombre del medicamento</Text>
          <TextInput style={styles.textInput} placeholder="Ingrese nombre del medicamento" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Cantidad de pastillas en caja</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ingrese cantidad de pastillas en la caja"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Registro de medicamento</Text>
          <TouchableOpacity style={[styles.actionButton, styles.saveActionButton]}>
            <Text style={styles.buttonText}>Tomar foto medicamento</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Color Alarma</Text>
          <View style={styles.colorPalette}>
            {colorPalette.map((color) => (
              <TouchableOpacity
                key={color.id}
                style={[
                  styles.colorButton,
                  { backgroundColor: color.color },
                  selectedColor === color.id && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color.id)}
              >
                <Text style={styles.colorButtonText}>{color.name}</Text>
                {selectedColor === color.id && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formSectionTitle}>Configuración Alarma</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Descripción</Text>
          <TextInput style={styles.textInput} placeholder="Ingrese la descripción de la alarma" />
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
          <Text style={styles.inputLabel}>Tipo de recordatorio</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
            <NotificationOptions />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Cantidad pastillas</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Cantidad de pastillas a tomar"
            keyboardType="numeric"
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
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

export default CreateAlarmScreen;