import { TimeSlot } from '../types';

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);
  return `${formatDate(date)} at ${formatTime(dateTime)}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const generateTimeSlots = (date: Date, serviceDuration: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  // Clone the date to avoid modifying the original
  const slotDate = new Date(date);
  
  // Generate slots from start hour to end hour
  for (let hour = startHour; hour < endHour; hour++) {
    // For each hour, generate slots based on service duration
    for (let minute = 0; minute < 60; minute += serviceDuration) {
      slotDate.setHours(hour, minute, 0, 0);
      
      // Create end time by adding service duration
      const endDate = new Date(slotDate);
      endDate.setMinutes(slotDate.getMinutes() + serviceDuration);
      
      // Skip if end time is after business hours
      if (endDate.getHours() > endHour || (endDate.getHours() === endHour && endDate.getMinutes() > 0)) {
        continue;
      }
      
      slots.push({
        id: `${slotDate.toISOString()}`,
        startTime: slotDate.toISOString(),
        endTime: endDate.toISOString(),
        available: Math.random() > 0.3, // Randomly mark some slots as unavailable
      });
    }
  }
  
  return slots;
};

export const getNextAvailableDay = (currentDate: Date = new Date()): Date => {
  const nextDay = new Date(currentDate);
  nextDay.setDate(nextDay.getDate() + 1);
  // Ensure it's not a weekend (0 = Sunday, 6 = Saturday)
  if (nextDay.getDay() === 0) nextDay.setDate(nextDay.getDate() + 1);
  if (nextDay.getDay() === 6) nextDay.setDate(nextDay.getDate() + 2);
  return nextDay;
};