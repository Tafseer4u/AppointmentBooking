export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  image: string;
}

export interface TimeSlot {
  id: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  available: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  date: string; // ISO string
  timeSlot: TimeSlot;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}