import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { ImageWithFallback } from '../images/ImageWithFallback';
import { Plus, Edit3, Clock, Pill, Bell } from 'lucide-react';
import { Medication } from '../../types/medication';

interface DashboardScreenProps {
  medications: Medication[];
  onEditMedication: (medication: Medication) => void;
  onCreateAlarm: () => void;
  onToggleMedication: (id: string) => void;
  onTestAlarm: () => void;
}

export function DashboardScreen({
  medications,
  onEditMedication,
  onCreateAlarm,
  onToggleMedication,
  onTestAlarm
}: DashboardScreenProps) {
  const getNextMedication = () => {
    const activeMedications = medications.filter(med => med.isActive && !med.takenToday);
    if (activeMedications.length === 0) return null;
    
    // Buscar el próximo medicamento por hora
    return activeMedications.sort((a, b) => {
      const timeA = new Date(`2024-01-01 ${a.nextTime}`);
      const timeB = new Date(`2024-01-01 ${b.nextTime}`);
      return timeA.getTime() - timeB.getTime();
    })[0];
  };

  const nextMedication = getNextMedication();

  return (
    <div className="space-y-8">
      {/* Encabezado con saludo */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl mb-2 text-gray-900">¡Hola!</h1>
        <p className="text-xl text-gray-600">Es momento de cuidar tu salud</p>
      </div>

      {/* Grid principal - responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Próxima toma destacada */}
        <div className="lg:col-span-2">
          {nextMedication ? (
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-900 flex items-center gap-3 font-bold">
                  Próxima toma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-2xl ${nextMedication.color} flex items-center justify-center`}>
                    <Pill className="h-10 w-10 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-2 font-bold">{nextMedication.name}</h3>
                    <p className="text-xl text-gray-700 mb-2">{nextMedication.dose}</p>
                    <p className="text-3xl text-blue-700 font-semibold">
                      {nextMedication.nextTime} - {nextMedication.nextDate}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Button
                      onClick={onTestAlarm}
                      variant="outline"
                      className="w-30 h-30 rounded-full border-blue-300 text-blue-600 hover:bg-blue-50 p-0"
                      title="Probar alarma">
                      <Bell className="h-2 w-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 h-full">
              <CardContent className="py-12 text-center">
                <div className="text-8xl mb-6">✅</div>
                <h3 className="text-2xl text-green-800 mb-3">¡Excelente trabajo!</h3>
                <p className="text-xl text-green-700">Has tomado todos tus medicamentos de hoy</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Estadísticas rápidas */}
        <div className="space-y-4">
          <Card className="bg-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {medications.filter(m => m.isActive).length}
              </div>
              <p className="text-base text-gray-600">Medicamentos activos</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {medications.filter(m => m.takenToday).length}
              </div>
              <p className="text-base text-gray-600">Tomados hoy</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {medications.filter(m => m.quantity <= m.totalQuantity * 0.25).length}
              </div>
              <p className="text-base text-gray-600">Stock bajo</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lista de medicamentos */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-gray-900">Mis Medicamentos</h2>
        </div>

        {medications.length === 0 ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <h3 className="text-2xl mb-4">No tienes medicamentos registrados</h3>
              <p className="text-xl text-gray-600 mb-8">
                Comienza agregando tu primer medicamento
              </p>
              <Button 
                onClick={onCreateAlarm}
                className="h-14 px-10 text-lg"
              >
                <Plus className="h-6 w-6 mr-2" />
                Agregar Medicamento
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {medications.map((medication) => (
              <Card 
                key={medication.id} 
                className={`transition-all duration-200 hover:shadow-md ${
                  medication.isActive 
                    ? 'border-gray-200 shadow-sm' 
                    : 'border-gray-100 opacity-60'
                }`}
              >
                <CardContent className="p-6">
                  <div className="relative">
                    {/* Switch en esquina superior derecha */}
                    <div className="absolute top-0 right-0 flex flex-col items-center gap-1">
                      <Switch
                        checked={medication.isActive}
                        onCheckedChange={() => onToggleMedication(medication.id)}
                        className="scale-125"
                      />
                      <span className="text-xs text-gray-500">
                        {medication.isActive ? 'Activo' : 'Pausado'}
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-4 pr-20">
                      <div>
                      {/* Imagen del medicamento */}
                      <div className={`w-20 h-20 rounded-2xl ${medication.color} flex items-center justify-center flex-shrink-0`}>
                        <ImageWithFallback 
                          src={medication.image}
                          alt={medication.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>

                      {/* Botón de editar en la parte inferior izquierda */}
                    <div className="mt-6">
                      <Button
                        onClick={() => onEditMedication(medication)}
                        variant="outline"
                        className="w-12 h-12 rounded-xl p-0 border-gray-300 hover:bg-gray-50"
                      >
                        <Edit3 className="h-5 w-5 text-gray-600" />
                      </Button>
                    </div>
                         </div>
                      
                      {/* Información del medicamento */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-1 text-gray-900">{medication.name}</h3>
                        <p className="text-lg text-gray-600 mb-1">{medication.dose}</p>
                        <p className="text-lg text-gray-500">
                          {medication.nextTime} - {medication.nextDate}
                        </p>
                      </div>
                    </div>
                    
                    
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}