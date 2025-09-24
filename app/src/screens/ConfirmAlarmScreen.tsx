import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import MedicationIcon from '../components/MedicationIcon';

interface ConfirmAlarmScreenProps {
  onConfirmTake: () => void;
  onPostpone: () => void;
}

const ConfirmAlarmScreen = ({ onConfirmTake, onPostpone }: ConfirmAlarmScreenProps) => (
  <View style={styles.confirmContainer}>
    <View style={styles.confirmCard}>
      <View style={styles.confirmIcon}>
        <MedicationIcon type="red" style={styles.confirmMedicationIcon} />
      </View>

      <Text style={styles.confirmTitle}>¡Hora de tu medicamento!</Text>
      <Text style={styles.confirmMedicationName}>Atorvastatina 20mg</Text>
      <Text style={styles.confirmQuantity}>1 pastilla</Text>
      <Text style={styles.confirmTime}>08:00 AM</Text>

      <View style={styles.confirmActions}>
        <TouchableOpacity
          style={[styles.confirmButtonAlarm, styles.confirmTakeButton]}
          onPress={onConfirmTake}
        >
          <Text style={styles.buttonText}>Confirmar toma</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.confirmButtonAlarm, styles.postponeButton]}
          onPress={onPostpone}
        >
          <Text style={styles.buttonText}>Posponer 5 minutos</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default ConfirmAlarmScreen;