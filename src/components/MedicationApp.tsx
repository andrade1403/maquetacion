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
  Alert,
  Image
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

const MedicationIcon = ({ type, style }: { type: string; style?: any }) => {
  const getIconColor = () => {
    switch (type) {
      case 'red': return '#DC2626';
      case 'blue': return '#2563EB';
      case 'green': return '#10B981';
      case 'gray': return '#626262';
      default: return '#DC2626';
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

const ConfirmationDialog = ({ 
  visible, 
  onClose, 
  title, 
  description, 
  onConfirm, 
  onCancel,
  confirmText = "Sí",
  cancelText = "No"
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
          <TouchableOpacity 
            style={[styles.modalButton, styles.cancelButton]} 
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modalButton, styles.confirmButton]} 
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

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
    isActive: true
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
    isActive: true
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
    isActive: true
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
    isActive: false
  }
];

export function MedicationApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [medications, setMedications] = useState(mockMedications);
  const [currentView, setCurrentView] = useState('main');
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedTime, setSelectedTime] = useState('02:00 AM');
  const [selectedReminderType, setSelectedReminderType] = useState('voice');

  const toggleMedication = (id: string) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === id 
          ? { ...med, isActive: !med.isActive }
          : med
      )
    );
  };

  const handleConfirmAction = (action: () => void, title: string, description: string) => {
    setPendingAction(() => action);
    setShowSaveDialog(title.includes('guardar'));
    setShowCancelDialog(title.includes('cancelar'));
  };

  const colorPalette = [
    { id: 'blue', name: 'Azul', color: '#2563EB' },
    { id: 'green', name: 'Verde', color: '#10B981' },
    { id: 'red', name: 'Rojo', color: '#DC2626' },
    { id: 'gray', name: 'Gris', color: '#626262' }
  ];

  const DashboardScreen = () => {
    const nextMedication = medications.find(med => med.isActive);
    
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
              onPress={() => setCurrentView('create')}
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
                  />
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => {
                      setSelectedMedication(medication);
                      setCurrentView('edit');
                    }}
                  >
                    <Text>✏️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          
          <View style={styles.alarmButtonContainer}>
            <TouchableOpacity
              style={styles.alarmButton}
              onPress={() => setCurrentView('confirm')}
            >
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
          <TextInput 
            style={styles.textInput} 
            placeholder="Ingrese nombre del medicamento" 
          />
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
          <Text style={styles.inputLabel}>Color Alarma</Text>
          <View style={styles.colorPalette}>
            {colorPalette.map((color) => (
              <TouchableOpacity
                key={color.id}
                style={[
                  styles.colorButton,
                  { backgroundColor: color.color },
                  selectedColor === color.id && styles.selectedColor
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

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelActionButton]}
          onPress={() => handleConfirmAction(
            () => setCurrentView('main'),
            "¿Seguro que quiere cancelar la creación de la alarma?",
            ""
          )}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.saveActionButton]}
          onPress={() => handleConfirmAction(
            () => setCurrentView('main'),
            "¿Seguro que quiere guardar la creación de la alarma?",
            ""
          )}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
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
                      backgroundColor: isLowStock ? '#DC2626' : '#10B981'
                    }
                  ]}
                />
              </View>
            </View>
            
            {isLowStock && (
              <View style={styles.lowStockWarning}>
                <Text style={styles.warningText}>
                  ¡Quedan pocas pastillas. Recargar pronto!
                </Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={[
                styles.restockButton,
                { backgroundColor: isLowStock ? '#DC2626' : '#2563EB' }
              ]}
              onPress={() => setCurrentView('restock')}
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
            { day: 'Dom', progress: 75 }
          ].map((item) => (
            <View key={item.day} style={styles.dailyProgressRow}>
              <Text style={styles.dayLabel}>{item.day}</Text>
              <View style={styles.dailyProgressBar}>
                <View 
                  style={[
                    styles.dailyProgressFill,
                    { 
                      width: `${item.progress}%`,
                      backgroundColor: item.progress === 100 ? '#10B981' : 
                                     item.progress >= 75 ? '#F59E0B' : '#DC2626'
                    }
                  ]}
                />
              </View>
              <Text style={[
                styles.progressText,
                { 
                  color: item.progress === 100 ? '#10B981' : 
                         item.progress >= 75 ? '#F59E0B' : '#DC2626'
                }
              ]}>
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
          <TouchableOpacity 
            style={[styles.confirmButton, styles.confirmTakeButton]}
            onPress={() => setCurrentView('main')}
          >
            <Text style={styles.buttonText}>Confirmar toma</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.confirmButton, styles.postponeButton]}
            onPress={() => setCurrentView('main')}
          >
            <Text style={styles.buttonText}>Posponer 5 minutos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCurrentView = () => {
    if (currentView === 'create') return <CreateAlarmScreen />;
    if (currentView === 'confirm') return <ConfirmAlarmScreen />;
    
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

  return (
    <SafeAreaView style={styles.app}>
      {renderCurrentView()}
      
      {!['create', 'confirm'].includes(currentView) && <BottomNavigation />}
      
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