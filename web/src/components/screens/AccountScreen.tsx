import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Calendar, TrendingUp, Award, Target, User } from 'lucide-react';
import { Medication, AdherenceStats } from '../../types/medication';

interface AccountScreenProps {
  medications: Medication[];
}

export function AccountScreen({ medications }: AccountScreenProps) {
  // Calcular estadísticas de adherencia (simuladas)
  const getAdherenceStats = (): AdherenceStats => {
    const weeklyPercentage = 85; // Simulado
    const dailyProgress = [true, true, false, true, true, true, true]; // Última semana
    const monthlyDays = { taken: 26, total: 30 }; // Mes actual
    
    return {
      weeklyPercentage,
      dailyProgress,
      monthlyDays
    };
  };

  // Calcular días transcurridos del mes actual
  const getCurrentMonthProgress = () => {
    const now = new Date();
    const currentDay = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    
    return {
      elapsed: currentDay,
      total: daysInMonth
    };
  };

  const stats = getAdherenceStats();
  const monthProgress = getCurrentMonthProgress();
  const activeMedications = medications.filter(med => med.isActive);
  const takenToday = medications.filter(med => med.takenToday).length;

  const getAdherenceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excelente', color: 'text-green-600', bg: 'bg-green-50', icon: '🏆' };
    if (percentage >= 80) return { level: 'Muy Bueno', color: 'text-blue-600', bg: 'bg-blue-50', icon: '🎯' };
    if (percentage >= 70) return { level: 'Bueno', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: '👍' };
    return { level: 'Mejorable', color: 'text-red-600', bg: 'bg-red-50', icon: '⚠️' };
  };

  const adherenceLevel = getAdherenceLevel(stats.weeklyPercentage);

  return (
    <div className="space-y-8">
      {/* Encabezado del perfil */}
      <div className="text-center md:text-left md:flex md:items-center md:space-x-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
          <User className="h-12 w-12 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl mb-2 font-bold">Mi Cuenta</h1>
          <p className="text-xl text-gray-600">Seguimiento de tu adherencia al tratamiento</p>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resumen de adherencia semanal */}
        <div className="lg:col-span-2">
          <Card className={`${adherenceLevel.bg} border-2 h-full`}>
            <CardHeader>
              <CardTitle className={`text-2xl ${adherenceLevel.color} flex items-center gap-3`}>
                Adherencia Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold ${adherenceLevel.color} mb-3`}>
                  {stats.weeklyPercentage}%
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">
                    {adherenceLevel.level}
                  </span>
                </div>
              </div>
              
              <Progress 
                value={stats.weeklyPercentage} 
                className="h-4 mb-6"
              />
              
              <p className="text-center text-lg text-gray-600">
                Has tomado tus medicamentos correctamente {Math.floor(stats.weeklyPercentage * 7 / 100)} de 7 días esta semana
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Estado actual */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 flex items-center gap-3">
              Estado Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">
                  {activeMedications.length}
                </div>
                <p className="text-base text-blue-600">Medicamentos activos</p>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  takenToday === activeMedications.length ? 'text-green-600' : 'text-red-600'
                }`}>
                  {takenToday}/{activeMedications.length}
                </div>
                <p className="text-base text-gray-600">Tomados hoy</p>
              </div>
              
              <div className="text-center">

                 <div className="text-3xl font-bold text-700 mb-2">
                  {monthProgress.elapsed}/{monthProgress.total} 
                </div>
                <p className="text-base text-gray-600">días este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progreso diario y estadísticas mensuales */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Progreso diario de la semana */}
      <Card className="lg:col-span-6 bg-green-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Calendar className="h-7 w-7" />
              Progreso de la Semana anterior
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-3 mb-6">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-base text-gray-600 mb-3">{day}</div>
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold
                    ${stats.dailyProgress[index] 
                      ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                      : 'bg-red-100 text-red-700 border-2 border-red-300'
                    }
                  `}>
                    {stats.dailyProgress[index] ? '✓' : '✗'}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-600">
                {stats.dailyProgress.filter(Boolean).length} de 7 días completados
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}