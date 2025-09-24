import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import MedicationIcon from '../components/MedicationIcon';
import { Medication } from '../utils/mockData';

interface InventoryScreenProps {
  medications: Medication[];
  onRestockMedication: (medication: Medication) => void;
}

const InventoryScreen = ({ medications, onRestockMedication }: InventoryScreenProps) => (
  <ScrollView style={styles.container}>
    <Text style={styles.screenTitle}>Gestión de Inventario</Text>

    {medications.map((medication) => {
      const progressPercentage = (medication.quantity / medication.totalQuantity) * 100;
      const isLowStock = progressPercentage <= 30;

      return (
        <View key={medication.id} style={styles.inventoryCard}>
          <View style={styles.medicationRow}>
            <MedicationIcon type={medication.pillIcon} />
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationDose}>{medication.dose}</Text>
              <Text style={styles.stockInfo}>
                {medication.quantity} de {medication.totalQuantity} pastillas restantes
              </Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Restantes</Text>
              <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: isLowStock ? '#DC2626' : '#10B981',
                  },
                ]}
              />
            </View>
          </View>

          {isLowStock && (
            <View style={styles.lowStockWarning}>
              <Text style={styles.warningText}>¡Quedan pocas pastillas.</Text>
              <Text style={styles.warningText}>Recargar pronto!</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.restockButton, { backgroundColor: isLowStock ? '#DC2626' : '#2563EB' }]}
            onPress={() => onRestockMedication(medication)}
          >
            <Text style={styles.buttonText}>Recargar ahora</Text>
          </TouchableOpacity>
        </View>
      );
    })}
  </ScrollView>
);

export default InventoryScreen;