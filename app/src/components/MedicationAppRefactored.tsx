import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { mockMedications, Medication } from '../utils/mockData';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import InventoryScreen from '../screens/InventoryScreen';
import AccountScreen from '../screens/AccountScreen';
import CreateAlarmScreen from '../screens/CreateAlarmScreen';
import EditAlarmScreen from '../screens/EditAlarmScreen';
import RestockScreen from '../screens/RestockScreen';
import ConfirmAlarmScreen from '../screens/ConfirmAlarmScreen';

// Import components
import BottomNavigation from './BottomNavigation';
import ConfirmationDialog from './ConfirmationDialog';

export function MedicationApp() {
  // App state
  const [activeTab, setActiveTab] = useState<'home' | 'inventory' | 'account'>('home');
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [currentView, setCurrentView] = useState<
    'main' | 'create' | 'confirm' | 'edit' | 'restock'
  >('main');
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  // Dialog state
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => () => {});
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");

  // Helpers
  const toggleMedication = (id: string) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, isActive: !med.isActive } : med))
    );
  };

  const handleConfirmAction = (action: () => void, title: string, description: string) => {
    setPendingAction(() => action);
    setDialogTitle(title);
    setDialogDescription(description);
    setShowSaveDialog(title.toLowerCase().includes('guardar'));
    setShowCancelDialog(title.toLowerCase().includes('cancelar'));
  };

  // Navigation handlers
  const handleTabChange = (tab: 'home' | 'inventory' | 'account') => {
    setActiveTab(tab);
    setCurrentView('main');
  };

  const handleCreateAlarm = () => {
    setCurrentView('create');
  };

  const handleEditMedication = (medication: Medication) => {
    setSelectedMedication(medication);
    setCurrentView('edit');
  };

  const handleRestockMedication = (medication: Medication) => {
    setSelectedMedication(medication);
    setCurrentView('restock');
  };

  const handleBack = () => {
    setCurrentView('main');
    setSelectedMedication(null);
  };

  const handleSave = () => {
    handleConfirmAction(
      () => setCurrentView('main'),
      '¿Seguro que quiere guardar los cambios?',
      ''
    );
  };

  const handleCancel = () => {
    handleConfirmAction(
      () => setCurrentView('main'),
      '¿Seguro que quiere cancelar los cambios?',
      ''
    );
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return (
          <CreateAlarmScreen
            onBack={handleBack}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'confirm':
        return (
          <ConfirmAlarmScreen
            onConfirmTake={() => setCurrentView('main')}
            onPostpone={() => setCurrentView('main')}
          />
        );
      case 'edit':
        return selectedMedication ? (
          <EditAlarmScreen
            medication={selectedMedication}
            onBack={handleBack}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : null;
      case 'restock':
        return (
          <RestockScreen
            onBack={handleBack}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      default:
        switch (activeTab) {
          case 'inventory':
            return (
              <InventoryScreen
                medications={medications}
                onRestockMedication={handleRestockMedication}
              />
            );
          case 'account':
            return <AccountScreen />;
          default:
            return (
              <DashboardScreen
                medications={medications}
                onCreateAlarm={handleCreateAlarm}
                onEditMedication={handleEditMedication}
                onToggleMedication={toggleMedication}
                onConfirmAlarm={() => setCurrentView('confirm')}
              />
            );
        }
    }
  };

  return (
    <SafeAreaView style={styles.app}>
      {renderCurrentView()}

      {currentView === 'main' && (
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Cancel confirmation */}
      <ConfirmationDialog
        visible={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        title={dialogTitle}
        description={dialogDescription}
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
        title={dialogTitle}
        description={dialogDescription}
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