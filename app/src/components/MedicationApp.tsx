import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { styles } from '../styles/styles';

interface Medication {
  id: string;
  name: string;
  pillIcon: string;
  color: string;
  dose: string;
  nextTime: string;
  quantity: number;
  totalQuantity: number;
  isActive: boolean;
}

/* ---------- Utility: generateTimeOptions (from generateTime.tsx) ---------- */
const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 1; hour <= 12; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = hour.toString().padStart(2, '0');
      const minuteStr = minute.toString().padStart(2, '0');
      times.push(`${hourStr}:${minuteStr} AM`);
      times.push(`${hourStr}:${minuteStr} PM`);
    }
  }
  return times;
};

export function MedicationToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View>
      <Switch
        value={isEnabled}
        onValueChange={() => setIsEnabled(!isEnabled)}
        trackColor={{ false: "#b0b1b3ff", true: "#2563EB" }}
        thumbColor={isEnabled ? "#FFFFFF" : "#626262"}
      />
    </View>
  );
}

/* ---------- Small visual pill icon component ---------- */
const MedicationIcon = ({ type, style }: { type: string; style?: any }) => {
  const getIconColor = () => {
    switch (type) {
      case 'red':
        return '#DC2626';
      case 'blue':
        return '#2563EB';
      case 'green':
        return '#10B981';
      case 'gray':
        return '#626262';
      default:
        return '#DC2626';
    }
  };

  return (
    <View style={[styles.medicationIcon, { backgroundColor: getIconColor() }, style]}>
      <View style={styles.pillShape}>
        <View style={styles.pillDivider} />
      </View>
    </View>
  );
};

/* ---------- Confirmation Dialog (modal) ---------- */
const ConfirmationDialog = ({
  visible,
  onClose,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Sí',
  cancelText = 'No',
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalDescription}>{description}</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.buttonText}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={onConfirm}>
            <Text style={styles.buttonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

/* ---------- Mock data ---------- */
const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Atorvastatina',
    pillIcon: 'red',
    color: 'red',
    dose: '20mg',
    nextTime: '08:00 AM',
    quantity: 25,
    totalQuantity: 30,
    isActive: true,
  },
  {
    id: '2',
    name: 'Larex',
    pillIcon: 'blue',
    color: 'blue',
    dose: '20mg',
    nextTime: '08:10 AM',
    quantity: 15,
    totalQuantity: 60,
    isActive: true,
  },
  {
    id: '3',
    name: 'Metformina',
    pillIcon: 'green',
    color: 'green',
    dose: '850mg',
    nextTime: '10:00 AM',
    quantity: 15,
    totalQuantity: 60,
    isActive: true,
  },
  {
    id: '4',
    name: 'Omeprazol',
    pillIcon: 'gray',
    color: 'gray',
    dose: '40mg',
    nextTime: '11:00 AM',
    quantity: 8,
    totalQuantity: 28,
    isActive: false,
  },
];

export function MedicationApp() {
  /* ---------- App state ---------- */
  const [activeTab, setActiveTab] = useState<'home' | 'inventory' | 'account'>('home');
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [currentView, setCurrentView] = useState<
    'main' | 'create' | 'confirm' | 'edit' | 'restock'
  >('main');
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => () => {});

  /* Shared create/edit state */
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('02:00 AM');
  const [selectedReminderType, setSelectedReminderType] = useState<string>('voice');

  /* UI: time picker modal for create/edit screens */
  const [showTimePicker, setShowTimePicker] = useState(false);

  /* Restock state */
  const [restockBoxes, setRestockBoxes] = useState<string>('1');
  const [restockPerBox, setRestockPerBox] = useState<string>('30');

  /* Edit screen temp fields */
  const [editDescription, setEditDescription] = useState<string>('Después del desayuno');
  const [editAmount, setEditAmount] = useState<string>('');

  /* Colors palette */
  const colorPalette = [
    { id: 'blue', name: 'Azul', color: '#2563EB' },
    { id: 'green', name: 'Verde', color: '#10B981' },
    { id: 'red', name: 'Rojo', color: '#DC2626' },
    { id: 'gray', name: 'Gris', color: '#626262' },
  ];

  /* ---------- Helpers ---------- */
  const toggleMedication = (id: string) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, isActive: !med.isActive } : med))
    );
  };

  // handleConfirmation.js equivalent: sets pending action and shows the appropriate dialog
  const handleConfirmAction = (action: () => void, title: string, description: string) => {
    setPendingAction(() => action);
    // Use includes lower-case as your titles use lower-case like 'guardar' and 'cancelar'
    setShowSaveDialog(title.toLowerCase().includes('guardar'));
    setShowCancelDialog(title.toLowerCase().includes('cancelar'));
  };

  /* ---------- Screens ---------- */

  const DashboardScreen = () => {
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
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => {
                // reset create fields if necessary
                setSelectedColor('');
                setSelectedTime('02:00 AM');
                setSelectedReminderType('voice');
                setCurrentView('create');
              }}
            >
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
                  onValueChange={() => toggleMedication(medication.id)} 
                  trackColor={{ false: "#b0b1b3ff", true: "#2563EB" }}
                  thumbColor={medication.isActive ? "#FFFFFF" : "#626262"} />
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setSelectedMedication(medication);
                      setEditAmount(medication.dose);
                      setSelectedTime(medication.nextTime);
                      setCurrentView('edit');
                    }}
                  >
                    <Text style={{ transform: [{ rotate: '90deg' }], fontSize: 18 }}>✏️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.alarmButtonContainer}>
            <TouchableOpacity style={styles.alarmButton} onPress={() => setCurrentView('confirm')}>
              <Text style={styles.alarmButtonText}>⏰</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  const CreateAlarmScreen = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentView('main')}
        >
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
          <TextInput style={styles.textInput} placeholder="Ingrese cantidad de pastillas en la caja" keyboardType="numeric" />
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
            <Text style={{ fontSize: 20 }}>{selectedTime}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Tipo de recordatorio</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: selectedReminderType === 'voice' ? '#2563EB' : '#E5E7EB' },
              ]}
              onPress={() => setSelectedReminderType('voice')}
            >
              <Text style={[styles.buttonText, { color: selectedReminderType === 'voice' ? '#FFF' : '#000' }]}>
                Grabación Personalizada
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: selectedReminderType === 'sound' ? '#2563EB' : '#E5E7EB' },
              ]}
              onPress={() => setSelectedReminderType('sound')}
            >
              <Text style={[styles.buttonText, { color: selectedReminderType === 'sound' ? '#FFF' : '#000' }]}>
                Sonido suave
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: selectedReminderType === 'vibration' ? '#2563EB' : '#E5E7EB' },
              ]}
              onPress={() => setSelectedReminderType('vibration')}
            >
              <Text style={[styles.buttonText, { color: selectedReminderType === 'vibration' ? '#FFF' : '#000' }]}>
                Vibración
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Cantidad pastillas</Text>
          <TextInput style={styles.textInput} placeholder="Cantidad de pastillas a tomar" keyboardType="numeric" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <MedicationToggle />
          <Text style={styles.inputLabel}>Recordatorio cada 5 minutos</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelActionButton]}
          onPress={() =>
            handleConfirmAction(() => setCurrentView('main'), '¿Seguro que quiere cancelar la creación de la alarma?', '')
          }
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.saveActionButton]}
          onPress={() =>
            handleConfirmAction(() => setCurrentView('main'), '¿Seguro que quiere guardar la creación de la alarma?', '')
          }
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      {/* Time picker modal */}
      <Modal visible={showTimePicker} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ padding: 16, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Seleccione hora</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <Text style={{ color: '#2563EB', fontSize: 18 }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {generateTimeOptions().map((time) => (
                <TouchableOpacity
                  key={time}
                  style={{
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                  }}
                  onPress={() => {
                    setSelectedTime(time);
                    setShowTimePicker(false);
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );

  const InventoryScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Gestión de Inventario</Text>

      {medications.map((medication) => {
        const progressPercentage = (medication.quantity / medication.totalQuantity) * 100;
        const isLowStock = progressPercentage <= 25;

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
                <Text style={styles.warningText}>¡Quedan pocas pastillas. Recargar pronto!</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.restockButton, { backgroundColor: isLowStock ? '#DC2626' : '#2563EB' }]}
              onPress={() => {
                setSelectedMedication(medication);
                // Reset restock inputs
                setRestockBoxes('1');
                setRestockPerBox('30');
                setCurrentView('restock');
              }}
            >
              <Text style={styles.buttonText}>Recargar ahora</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );

  const AccountScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Mi Cuenta</Text>

      <View style={styles.adherenceCard}>
        <Text style={styles.adherenceTitle}>Seguimiento de tu adherencia</Text>
        <Text style={styles.adherencePercentage}>90%</Text>
        <Text style={styles.adherenceSubtitle}>¡Muy Bien! Excelente adherencia esta semana</Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressCardTitle}>Progreso Diario</Text>
        <View style={styles.dailyProgress}>
          {[
            { day: 'Lun', progress: 100 },
            { day: 'Mar', progress: 100 },
            { day: 'Mié', progress: 100 },
            { day: 'Jue', progress: 100 },
            { day: 'Vie', progress: 100 },
            { day: 'Sáb', progress: 25 },
            { day: 'Dom', progress: 75 },
          ].map((item) => (
            <View key={item.day} style={styles.dailyProgressRow}>
              <Text style={styles.dayLabel}>{item.day}</Text>
              <View style={styles.dailyProgressBar}>
                <View
                  style={[
                    styles.dailyProgressFill,
                    {
                      width: `${item.progress}%`,
                      backgroundColor: item.progress === 100 ? '#10B981' : item.progress >= 75 ? '#F59E0B' : '#DC2626',
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.progressText,
                  {
                    color: item.progress === 100 ? '#10B981' : item.progress >= 75 ? '#F59E0B' : '#DC2626',
                  },
                ]}
              >
                {item.progress}%
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Estadísticas Mensuales</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.successStat]}>
            <Text style={styles.statNumber}>27</Text>
            <Text style={styles.statLabel}>Días tomados</Text>
          </View>
          <View style={[styles.statCard, styles.errorStat]}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Días perdidos</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const ConfirmAlarmScreen = () => (
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
          <TouchableOpacity style={[styles.confirmButtonAlarm, styles.confirmTakeButton]} onPress={() => setCurrentView('main')}>
            <Text style={styles.buttonText}>Confirmar toma</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.confirmButtonAlarm, styles.postponeButton]} onPress={() => setCurrentView('main')}>
            <Text style={styles.buttonText}>Posponer 5 minutos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  /* ---------- Edit screen (translated from edit.tsx) ---------- */
  const EditAlarmScreen = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentView('main')}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Alarma</Text>
      </View>

      {selectedMedication && (
        <>
          <View style={styles.formCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <MedicationIcon type={selectedMedication.pillIcon} style={{ width: 84, height: 84 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedMedication.name}</Text>
                <Text style={{ fontSize: 20 }}>{selectedMedication.dose}</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2563EB' }}>{selectedMedication.nextTime}</Text>
                <Text style={{ fontSize: 20, color: '#6B7280' }}>1 pastilla</Text>
              </View>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={[styles.formSectionTitle, { fontSize: 20, marginBottom: 12 }]}>Configuración de Alarma</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Descripción</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Descripción de la alarma"
                value={editDescription}
                onChangeText={setEditDescription}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Hora</Text>
              <TouchableOpacity style={[styles.textInput, { justifyContent: 'center' }]} onPress={() => setShowTimePicker(true)}>
                <Text style={{ fontSize: 20 }}>{selectedTime}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cantidad a tomar</Text>
              <TextInput style={styles.textInput} placeholder="Cantidad pastillas a tomar" value={editAmount} onChangeText={setEditAmount} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Switch value={true} />
              <Text style={styles.inputLabel}>Recordatorio cada 5 minutos</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelActionButton]}
              onPress={() =>
                handleConfirmAction(() => setCurrentView('main'), '¿Seguro que quiere cancelar la edición de la alarma?', '')
              }
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveActionButton]}
              onPress={() =>
                handleConfirmAction(() => setCurrentView('main'), '¿Seguro que quiere guardar la edición de la alarma?', '')
              }
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );

  /* ---------- Restock screen (translated from restock.tsx) ---------- */
  const RestockScreen = () => {
    const boxes = parseInt(restockBoxes || '0', 10) || 0;
    const perBox = parseInt(restockPerBox || '0', 10) || 0;
    const totalToAdd = boxes * perBox;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentView('main')}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recargar Medicamento</Text>
        </View>

        <View style={styles.restockCard}>
          <Text style={styles.restockCardTitle}>Cantidad a recargar</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Número de cajas</Text>
            <TextInput style={styles.textInput} value={restockBoxes} onChangeText={setRestockBoxes} keyboardType="numeric" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Pastillas por caja</Text>
            <TextInput style={styles.textInput} value={restockPerBox} onChangeText={setRestockPerBox} keyboardType="numeric" />
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
            onPress={() =>
              handleConfirmAction(() => setCurrentView('main'), '¿Seguro que quiere cancelar la recarga de medicamento?', '')
            }
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveActionButton]}
            onPress={() =>
              handleConfirmAction(() => setCurrentView('main'), '¿Seguro que quiere guardar la recarga de medicamento?', '')
            }
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  /* ---------- Render logic ---------- */
  const renderCurrentView = () => {
    if (currentView === 'create') return <CreateAlarmScreen />;
    if (currentView === 'confirm') return <ConfirmAlarmScreen />;
    if (currentView === 'edit') return <EditAlarmScreen />;
    if (currentView === 'restock') return <RestockScreen />;

    switch (activeTab) {
      case 'inventory':
        return <InventoryScreen />;
      case 'account':
        return <AccountScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  const BottomNavigation = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={[styles.navButton, activeTab === 'home' && styles.activeNavButton]}
        onPress={() => {
          setActiveTab('home');
          setCurrentView('main');
        }}
      >
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navLabel}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, activeTab === 'inventory' && styles.activeNavButton]}
        onPress={() => {
          setActiveTab('inventory');
          setCurrentView('main');
        }}
      >
        <Text style={styles.navIcon}>📦</Text>
        <Text style={styles.navLabel}>Inventario</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, activeTab === 'account' && styles.activeNavButton]}
        onPress={() => {
          setActiveTab('account');
          setCurrentView('main');
        }}
      >
        <Text style={styles.navIcon}>👤</Text>
        <Text style={styles.navLabel}>Cuenta</Text>
      </TouchableOpacity>
    </View>
  );

  /* ---------- App return ---------- */
  return (
    <SafeAreaView style={styles.app}>
      {renderCurrentView()}

      {!['create', 'confirm'].includes(currentView) && <BottomNavigation />}

      {/* Cancel confirmation */}
      <ConfirmationDialog
        visible={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        title="¿Seguro que quiere cancelar la acción?"
        description="Los datos ingresados se perderán"
        onConfirm={() => {
          pendingAction();
          setShowCancelDialog(false);
        }}
        onCancel={() => setShowCancelDialog(false)}
      />

      {/* Save confirmation */}
      <ConfirmationDialog
        visible={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        title="¿Seguro que quiere guardar los cambios?"
        description="Se guardarán los datos ingresados"
        onConfirm={() => {
          pendingAction();
          setShowSaveDialog(false);
        }}
        onCancel={() => setShowSaveDialog(false)}
      />
    </SafeAreaView>
  );
}

export default MedicationApp;
