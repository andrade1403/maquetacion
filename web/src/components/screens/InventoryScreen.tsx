import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { ImageWithFallback } from '../images/ImageWithFallback';
import { Package, AlertTriangle, Plus, Pill } from 'lucide-react';
import { Medication } from '../../types/medication';

interface InventoryScreenProps {
  medications: Medication[];
  onRestockMedication: (medication: Medication) => void;
}

export function InventoryScreen({ medications, onRestockMedication }: InventoryScreenProps) {
  const getLowStockMedications = () => {
    return medications.filter(med => {
      const percentage = (med.quantity / med.totalQuantity) * 100;
      return percentage <= 25;
    });
  };

  const getStockPercentage = (medication: Medication) => {
    return (medication.quantity / medication.totalQuantity) * 100;
  };

  const getStockStatus = (percentage: number) => {
    if (percentage <= 25) return { status: 'critical', color: 'text-red-600', bg: 'bg-red-50' };
    if (percentage <= 50) return { status: 'low', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const lowStockMedications = getLowStockMedications();

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl mb-2">Inventario de Medicamentos</h1>
        <p className="text-xl text-gray-600">Controla el stock de tus medicinas</p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-700 mb-2">
              {medications.length}
            </div>
            <p className="text-base text-blue-600">Total medicamentos</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {lowStockMedications.length}
            </div>
            <p className="text-base text-red-600">Stock bajo</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {medications.filter(m => getStockPercentage(m) > 50).length}
            </div>
            <p className="text-base text-green-600">Stock suficiente</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {medications.reduce((total, med) => total + med.quantity, 0)}
            </div>
            <p className="text-base text-yellow-600">Total pastillas</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista completa de inventario */}
      <div className="space-y-6">
        <h2 className="text-2xl">Estado del Inventario</h2>
        
        {medications.length === 0 ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <Package className="h-20 w-20 mx-auto text-gray-400 mb-6" />
              <h3 className="text-2xl mb-4">No hay medicamentos registrados</h3>
              <p className="text-xl text-gray-600 mb-8">
                Agrega medicamentos desde la pantalla principal
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {medications.map((medication) => {
              const percentage = getStockPercentage(medication);
              const stockStatus = getStockStatus(percentage);
              
              return (
                <Card key={medication.id} className={`transition-all duration-200 hover:shadow-md ${stockStatus.bg}`}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header con imagen y botón */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-xl ${medication.color} flex items-center justify-center flex-shrink-0`}>
                            <ImageWithFallback 
                              src={medication.image}
                              alt={medication.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{medication.name}</h3>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${medication.color.replace('100', '400')}`}></div>
                              <span className="text-sm text-gray-600">{medication.colorName}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => onRestockMedication(medication)}
                          variant={percentage <= 25 ? "default" : "outline"}
                          className={`h-11 px-4 ${
                            percentage <= 25 
                              ? 'bg-red-600 hover:bg-red-700' 
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}>
                          <Plus className="h-4 w-4 mr-2" />
                          Recargar
                        </Button>
                      </div>
                      
                      {/* Información de stock */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">
                            {medication.quantity} de {medication.totalQuantity} pastillas
                          </span>
                          <span className={`text-lg font-semibold ${stockStatus.color}`}>
                            {Math.round(percentage)}%
                          </span>
                        </div>
                        
                        {/* Barra de progreso */}
                        <Progress 
                          value={percentage} 
                          className="h-3"
                        />
                        
                        {/* Estado del stock */}
                        <div className="flex justify-between items-center">
                          <span className={`text-base ${stockStatus.color}`}>
                            {percentage <= 25 && 'Stock crítico'}
                            {percentage > 25 && percentage <= 50 && 'Stock bajo'}
                            {percentage > 50 && 'Stock suficiente'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {medication.pillsPerBox} por caja
                          </span>
                        </div>
                      </div>

                      {/* Estimación de días restantes */}
                      <div className="p-3 bg-white/80 rounded-lg border">
                        <p className="text-base text-gray-700">
                          📅 Aproximadamente {Math.floor(medication.quantity / parseInt(medication.dose.match(/\d+/)?.[0] || '1'))} días restantes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}