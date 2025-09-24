import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from '../styles/styles';
import MedicationIcon from '../components/MedicationIcon';
import { Medication } from '../utils/mockData';

interface DashboardScreenProps {
  medications: Medication[];
  onCreateAlarm: () => void;
  onEditMedication: (medication: Medication) => void;
  onToggleMedication: (id: string) => void;
  onConfirmAlarm: () => void;
}

const DashboardScreen = ({
  medications,
  onCreateAlarm,
  onEditMedication,
  onToggleMedication,
  onConfirmAlarm
}: DashboardScreenProps) => {
  const nextMedication = medications.find((med) => med.isActive);

  return (
    <ScrollView style={styles.container}>
      {nextMedication && (
        <View style={styles.nextMedicationCard}>
          <Text style={styles.cardTitle}>Próxima toma</Text>
          <View style={styles.medicationRow}>
            <MedicationIcon type={nextMedication.pillIcon} />
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{nextMedication.name}</Text>
              <Text style={styles.medicationDose}>{nextMedication.dose}</Text>
              <Text style={styles.medicationTime}>{nextMedication.nextTime}</Text>
              <Text style={styles.medicationQuantity}>1 pastilla</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.medicationsList}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Mis medicamentos</Text>
          <TouchableOpacity style={styles.createButton} onPress={onCreateAlarm}>
            <Text style={styles.buttonText}>+ Crear Alarma</Text>
          </TouchableOpacity>
        </View>

        {medications.slice(1).map((medication) => (
          <View key={medication.id} style={styles.medicationCard}>
            <View style={styles.medicationRow}>
              <MedicationIcon type={medication.pillIcon} />
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationName}>{medication.name}</Text>
                <Text style={styles.medicationDose}>{medication.dose}</Text>
                <Text style={styles.medicationTime}>{medication.nextTime}</Text>
                <Text style={styles.medicationQuantity}>1 pastilla</Text>
              </View>
              <View style={styles.medicationActions}>
                <Switch
                  value={medication.isActive}
                  onValueChange={() => onToggleMedication(medication.id)}
                  trackColor={{ false: "#b0b1b3ff", true: "#2563EB" }}
                  thumbColor={medication.isActive ? "#FFFFFF" : "#626262"}
                />
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => onEditMedication(medication)}
                >
                  <Icon
                    name="edit-2"
                    size={20}
                    style={styles.navIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.alarmButtonContainer}>
          <TouchableOpacity style={styles.alarmButton} onPress={onConfirmAlarm}>
            <Text style={styles.alarmButtonText}>⏰</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;