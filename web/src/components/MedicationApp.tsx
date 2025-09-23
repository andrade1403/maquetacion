import React, { useState } from 'react';
import { Home, Package, User, ArrowLeft, Bell, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Toaster } from './ui/toaster';
import { toast } from 'sonner@2.0.3';
import { DashboardScreen } from './screens/DashboardScreen';
import { InventoryScreen } from './screens/InventoryScreen';
import { AccountScreen } from './screens/AccountScreen';
import { CreateAlarmScreen } from './screens/CreateAlarmScreen';
import { EditAlarmScreen } from './screens/EditAlarmScreen';
import { RestockScreen } from './screens/RestockScreen';
import { ConfirmAlarmScreen } from './screens/ConfirmAlarmScreen';
import { Medication, ActiveTab, CurrentView } from '../types/medication';

// Datos de ejemplo iniciales
const initialMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril 10mg',
    image: 'https://images.unsplash.com/photo-1632024894467-10dd0266ad92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwYm90dGxlc3xlbnwxfHx8fDE3NTU4ODk2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    color: 'bg-blue-100',
    colorName: 'Azul Cielo',
    dose: '1 pastilla',
    nextTime: '8:00 AM',
    nextDate: 'Hoy',
    quantity: 15,
    totalQuantity: 30,
    pillsPerBox: 30,
    isActive: true,
    reminderType: 'sound',
    createdAt: '2024-01-15',
    takenToday: false
  },
  {
    id: '2',
    name: 'Metformina 500mg',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGFibGV0cyUyMGNhcHN1bGVzfGVufDF8fHx8MTc1NTg5MDMxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    color: 'bg-green-100',
    colorName: 'Verde Menta',
    dose: '2 pastillas',
    nextTime: '2:00 PM',
    nextDate: 'Hoy',
    quantity: 8,
    totalQuantity: 60,
    pillsPerBox: 60,
    isActive: true,
    reminderType: 'voice',
    createdAt: '2024-01-10',
    takenToday: true
  },
  {
    id: '3',
    name: 'Omeprazol 20mg',
    image: 'https://images.unsplash.com/photo-1656621827127-acced8458f3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljYXRpb24lMjB3aGl0ZSUyMHBpbGxzfGVufDF8fHx8MTc1NTg5MDMxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    color: 'bg-purple-100',
    colorName: 'Lavanda',
    dose: '1 pastilla',
    nextTime: '7:30 AM',
    nextDate: 'Mañana',
    quantity: 5,
    totalQuantity: 28,
    pillsPerBox: 28,
    isActive: false,
    reminderType: 'vibration',
    createdAt: '2024-01-05',
    takenToday: false
  }
];

export function MedicationApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentView, setCurrentView] = useState<CurrentView>('main');
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [showConfirmAlarm, setShowConfirmAlarm] = useState(false);

  const handleEditMedication = (medication: Medication) => {
    setSelectedMedication(medication);
    setCurrentView('edit');
  };

  const handleCreateAlarm = () => {
    setCurrentView('create');
  };

  const handleRestockMedication = (medication: Medication) => {
    setSelectedMedication(medication);
    setCurrentView('restock');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedMedication(null);
  };

  const handleSaveMedication = (medicationData: Partial<Medication>) => {
    if (selectedMedication) {
      // Editar medicamento existente
      setMedications(prev => prev.map(med => 
        med.id === selectedMedication.id 
          ? { ...med, ...medicationData }
          : med
      ));
      
      // Verificar si es recarga
      if (medicationData.quantity && medicationData.quantity > selectedMedication.quantity) {
        toast.success('¡Medicamento recargado exitosamente!', {
          description: `${selectedMedication.name} - Nueva cantidad: ${medicationData.quantity} pastillas`,
          duration: 4000,
        });
      } else {
        toast.success('Medicamento actualizado correctamente', {
          description: `Los cambios en ${selectedMedication.name} se han guardado`,
          duration: 3000,
        });
      }
    } else {
      // Crear nuevo medicamento
      const newMedication: Medication = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        takenToday: false,
        isActive: true,
        ...medicationData as Medication
      };
      setMedications(prev => [...prev, newMedication]);
      
      toast.success('¡Nueva alarma creada!', {
        description: `${newMedication.name} - ${newMedication.nextTime}`,
        duration: 4000,
      });
    }
    handleBackToMain();
  };

  const handleToggleMedication = (id: string) => {
    setMedications(prev => prev.map(med => {
      if (med.id === id) {
        const newStatus = !med.isActive;
        toast.info(
          newStatus ? 'Medicamento activado' : 'Medicamento pausado',
          {
            description: `${med.name} ${newStatus ? 'activado' : 'desactivado'}`,
            duration: 2000,
          }
        );
        return { ...med, isActive: newStatus };
      }
      return med;
    }));
  };

  const handleConfirmTaken = (id: string) => {
    setMedications(prev => prev.map(med => {
      if (med.id === id) {
        const doseQuantity = parseInt(med.dose.match(/\d+/)?.[0] || '1');
        const newQuantity = Math.max(0, med.quantity - doseQuantity);
        
        toast.success('¡Medicamento tomado!', {
          description: `${med.name} - Quedan ${newQuantity} pastillas`,
          duration: 3000,
        });
        
        // Alertar si el stock está bajo
        if (newQuantity <= med.totalQuantity * 0.25) {
          setTimeout(() => {
            toast.warning('Stock bajo detectado', {
              description: `${med.name} necesita recarga`,
              duration: 5000,
            });
          }, 1000);
        }
        
        return { 
          ...med, 
          takenToday: true, 
          quantity: newQuantity
        };
      }
      return med;
    }));
    setShowConfirmAlarm(false);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return (
          <CreateAlarmScreen 
            onSave={handleSaveMedication}
            onBack={handleBackToMain}
          />
        );
      case 'edit':
        return (
          <EditAlarmScreen 
            medication={selectedMedication}
            onSave={handleSaveMedication}
            onBack={handleBackToMain}
          />
        );
      case 'restock':
        return (
          <RestockScreen 
            medication={selectedMedication}
            onSave={handleSaveMedication}
            onBack={handleBackToMain}
          />
        );
      default:
        return null;
    }
  };

  if (showConfirmAlarm) {
    return (
      <>
        <ConfirmAlarmScreen 
          medication={medications[0]} // Mostrar el primer medicamento como ejemplo
          onConfirm={() => handleConfirmTaken(medications[0].id)}
          onPostpone={() => {
            setShowConfirmAlarm(false);
            toast.info('Recordatorio pospuesto', {
              description: 'Te recordaremos en 5 minutos',
              duration: 2000,
            });
          }}
        />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Superior */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Título */}
            <div className="flex items-center space-x-4">
              {currentView !== 'main' ? (
                <Button
                  variant="ghost"
                  onClick={handleBackToMain}
                  className="h-12 px-4 text-lg"
                >
                  <ArrowLeft className="h-6 w-6 mr-2" />
                  Volver
                </Button>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-xl font-semibold text-gray-900">
                      Gestión de Medicamentos
                    </h1>
                  </div>
                </>
              )}
            </div>

            {/* Navegación principal y botones de acción */}
            {currentView === 'main' && (
              <div className="flex items-center space-x-1">
                <nav className="hidden md:flex items-center space-x-1">
                  <Button
                    variant={activeTab === 'home' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('home')}
                    className="h-12 px-6 text-base"
                  >
                    <Home className="h-5 w-5 mr-2" />
                    Inicio
                  </Button>
                  <Button
                    variant={activeTab === 'inventory' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('inventory')}
                    className="h-12 px-6 text-base"
                  >
                    <Package className="h-5 w-5 mr-2" />
                    Inventario
                  </Button>
                  <Button
                    variant={activeTab === 'account' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('account')}
                    className="h-12 px-6 text-base"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Mi Cuenta
                  </Button>
                </nav>
                
                {/* Botón Nueva Alarma - ahora verde */}
                <Button
                  onClick={handleCreateAlarm}
                  className="h-12 px-4 bg-green-600 hover:bg-green-700 ml-4"
                >
                  <Plus className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline">Nueva Alarma</span>
                </Button>
              </div>
            )}

            {/* Removed: Botones de acción section - ya no necesario */}
          </div>

          {/* Navegación móvil */}
          {currentView === 'main' && (
            <div className="md:hidden border-t pt-2 pb-2">
              <nav className="flex items-center justify-around">
                <Button
                  variant={activeTab === 'home' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('home')}
                  className="flex flex-col items-center gap-1 h-16 w-full"
                >
                  <Home className="h-6 w-6" />
                  <span className="text-sm">Inicio</span>
                </Button>
                <Button
                  variant={activeTab === 'inventory' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('inventory')}
                  className="flex flex-col items-center gap-1 h-16 w-full"
                >
                  <Package className="h-6 w-6" />
                  <span className="text-sm">Inventario</span>
                </Button>
                <Button
                  variant={activeTab === 'account' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('account')}
                  className="flex flex-col items-center gap-1 h-16 w-full"
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm">Mi Cuenta</span>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'main' ? (
          <div className="space-y-6">
            {activeTab === 'home' && (
              <DashboardScreen 
                medications={medications}
                onEditMedication={handleEditMedication}
                onCreateAlarm={handleCreateAlarm}
                onToggleMedication={handleToggleMedication}
                onTestAlarm={() => setShowConfirmAlarm(true)}
              />
            )}
            
            {activeTab === 'inventory' && (
              <InventoryScreen 
                medications={medications}
                onRestockMedication={handleRestockMedication}
              />
            )}
            
            {activeTab === 'account' && (
              <AccountScreen medications={medications} />
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {renderCurrentView()}
          </div>
        )}
      </main>
        
      <Toaster position="top-center" richColors />
    </div>
  );
}