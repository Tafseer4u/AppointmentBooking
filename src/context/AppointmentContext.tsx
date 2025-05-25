import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appointment, Service, TimeSlot } from '../types';
import { getServiceById } from '../data/services';

interface AppointmentContextType {
  appointments: Appointment[];
  selectedService: Service | null;
  selectedDate: Date;
  selectedTimeSlot: TimeSlot | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  
  setSelectedService: (service: Service | null) => void;
  setSelectedDate: (date: Date) => void;
  setSelectedTimeSlot: (timeSlot: TimeSlot | null) => void;
  setCustomerName: (name: string) => void;
  setCustomerEmail: (email: string) => void;
  setCustomerPhone: (phone: string) => void;
  setNotes: (notes: string) => void;
  
  bookAppointment: () => void;
  cancelAppointment: (id: string) => void;
  clearBookingData: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Load appointments from localStorage on mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Save appointments to localStorage when changed
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const bookAppointment = () => {
    if (!selectedService || !selectedTimeSlot) return;

    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      serviceId: selectedService.id,
      date: selectedDate.toISOString(),
      timeSlot: selectedTimeSlot,
      customerName,
      customerEmail,
      customerPhone,
      notes,
      status: 'scheduled',
    };

    setAppointments([...appointments, newAppointment]);
    clearBookingData();
  };

  const cancelAppointment = (id: string) => {
    setAppointments(
      appointments.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: 'cancelled' } 
          : appointment
      )
    );
  };

  const clearBookingData = () => {
    setSelectedService(null);
    setSelectedTimeSlot(null);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setNotes('');
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        selectedService,
        selectedDate,
        selectedTimeSlot,
        customerName,
        customerEmail,
        customerPhone,
        notes,
        setSelectedService,
        setSelectedDate,
        setSelectedTimeSlot,
        setCustomerName,
        setCustomerEmail,
        setCustomerPhone,
        setNotes,
        bookAppointment,
        cancelAppointment,
        clearBookingData,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};