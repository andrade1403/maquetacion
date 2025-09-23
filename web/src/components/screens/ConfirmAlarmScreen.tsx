import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../images/ImageWithFallback';
import { Check, Clock, RotateCcw, Pill, Bell } from 'lucide-react';
import { Medication } from '../../types/medication';
import { ConfirmationModal } from '../ConfirmationModal';

interface ConfirmAlarmScreenProps {
  medication: Medication;
  onConfirm: () => void;
  onPostpone: () => void;
}

export function ConfirmAlarmScreen({ medication, onConfirm, onPostpone }: ConfirmAlarmScreenProps) {
  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const currentTime = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const handlePostponeClick = () => {
    setShowPostponeModal(true);
  };

  const handleConfirmPostpone = () => {
    onPostpone();
  };

  const handleConfirmClick = () => {
    setShowConfirmModal(true);
    // Delay the actual confirm to show the modal first
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Tarjeta principal con animación suave */}
        <Card className="bg-white shadow-2xl border-0 animate-in slide-in-from-bottom-4 duration-500">
          <CardContent className="p-8 text-center">
            {/* Icono de alarma animado */}
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <Bell className="h-12 w-12 text-white" />
            </div>

            {/* Título principal */}
            <h1 className="text-3xl mb-2 text-gray-900">
              ¡Es hora de tu medicina!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {currentTime}
            </p>

            {/* Información del medicamento */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-xl ${medication.color} flex items-center justify-center`}>
                  <ImageWithFallback 
                    src={medication.image}
                    alt={medication.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    fallback={<Pill className="h-8 w-8 text-gray-700" />}
                  />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-2xl mb-1">{medication.name}</h2>
                  <p className="text-lg text-gray-600">{medication.dose}</p>
                </div>
              </div>

              {/* Detalles adicionales */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">Hora programada:</span>
                  <span className="text-base font-medium">{medication.nextTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">Color distintivo:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${medication.color.replace('100', '400')}`}></div>
                    <span className="text-base font-medium">{medication.colorName}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">Stock restante:</span>
                  <span className="text-base font-medium">
                    {medication.quantity - parseInt(medication.dose.match(/\d+/)?.[0] || '1')} pastillas
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de acción grandes */}
            <div className="space-y-4">
              <Button
                onClick={handleConfirmClick}
                className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
              >
                Ya tomé mi medicina
              </Button>

              <Button
                onClick={handlePostponeClick}
                variant="outline"
                className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Recordar en 5 minutos
              </Button>
            </div>

           

            {/* Mensaje recordatorio */}
            <div className="mt-6 p-4 ">
                <p className="text-sm text-gray-500">
            Este recordatorio se repetirá cada 5 minutos hasta que confirmes
          </p>
            </div>
          </CardContent>
        </Card>

        {/* Indicador de urgencia para stock bajo */}
        {medication.quantity <= medication.totalQuantity * 0.25 && (
          <Card className="mt-4 bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-red-700">
                <span className="text-lg">⚠️</span>
                <p className="text-base font-medium">
                  Stock bajo: Solo quedan {medication.quantity} pastillas
                </p>
              </div>
              <p className="text-sm text-red-600 mt-1">
                Considera reabastecer tu medicamento pronto
              </p>
            </CardContent>
          </Card>
        )}

        {/* Modales */}
        <ConfirmationModal
          isOpen={showPostponeModal}
          onClose={() => setShowPostponeModal(false)}
          type="confirmation"
          title="¿Esta seguro que desea posponer la alarma?"
          onConfirm={handleConfirmPostpone}
        />

        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          type="info"
          title="Excelente trabajo has tomado tu medicamento"
        />
      </div>
    </div>
  );
}