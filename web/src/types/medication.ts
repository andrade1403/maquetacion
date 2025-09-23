export interface Medication {
  id: string;
  name: string;
  image: string;
  color: string;
  colorName: string;
  dose: string;
  nextTime: string;
  nextDate: string;
  quantity: number;
  totalQuantity: number;
  pillsPerBox: number;
  isActive: boolean;
  reminderType: 'voice' | 'sound' | 'vibration';
  createdAt: string;
  takenToday: boolean;
}

export interface AlarmSettings {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
}

export interface ColorOption {
  id: string;
  name: string;
  class: string;
  border: string;
}

export interface AdherenceStats {
  weeklyPercentage: number;
  dailyProgress: boolean[];
  monthlyDays: {
    taken: number;
    total: number;
  };
}

export type ActiveTab = 'home' | 'inventory' | 'account';
export type CurrentView = 'main' | 'create' | 'edit' | 'restock' | 'confirm';

export const COLOR_PALETTE: ColorOption[] = [
  { 
    id: 'bg-blue-100', 
    name: 'Azul Cielo', 
    class: 'bg-blue-100', 
    border: 'border-blue-300' 
  },
  { 
    id: 'bg-green-100', 
    name: 'Verde Menta', 
    class: 'bg-green-100', 
    border: 'border-green-300' 
  },
  { 
    id: 'bg-purple-100', 
    name: 'Lavanda', 
    class: 'bg-purple-100', 
    border: 'border-purple-300' 
  },
  { 
    id: 'bg-yellow-100', 
    name: 'Amarillo Sol', 
    class: 'bg-yellow-100', 
    border: 'border-yellow-300' 
  },
  { 
    id: 'bg-pink-100', 
    name: 'Rosa Suave', 
    class: 'bg-pink-100', 
    border: 'border-pink-300' 
  },
  { 
    id: 'bg-orange-100', 
    name: 'Naranja Durazno', 
    class: 'bg-orange-100', 
    border: 'border-orange-300' 
  },
  { 
    id: 'bg-indigo-100', 
    name: 'Índigo', 
    class: 'bg-indigo-100', 
    border: 'border-indigo-300' 
  },
  { 
    id: 'bg-teal-100', 
    name: 'Verde Agua', 
    class: 'bg-teal-100', 
    border: 'border-teal-300' 
  }
];