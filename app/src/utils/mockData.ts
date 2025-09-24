export interface Medication {
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

export const mockMedications: Medication[] = [
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

export const colorPalette = [
  { id: 'blue', name: 'Azul', color: '#2563EB' },
  { id: 'green', name: 'Verde', color: '#10B981' },
  { id: 'red', name: 'Rojo', color: '#DC2626' },
  { id: 'gray', name: 'Gris', color: '#626262' },
];