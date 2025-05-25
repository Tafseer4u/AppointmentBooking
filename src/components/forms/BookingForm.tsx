import React from 'react';
import { Button } from '../ui/Button';
import { useAppointments } from '../../context/AppointmentContext';
import { formatTime, formatCurrency } from '../../utils/dates';

export const BookingForm: React.FC = () => {
  const {
    selectedService,
    selectedDate,
    selectedTimeSlot,
    customerName,
    customerEmail,
    customerPhone,
    notes,
    setCustomerName,
    setCustomerEmail,
    setCustomerPhone,
    setNotes,
    bookAppointment,
  } = useAppointments();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment();
  };
  
  if (!selectedService || !selectedTimeSlot) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Booking Summary</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p><span className="font-medium">Service:</span> {selectedService.name}</p>
          <p><span className="font-medium">Duration:</span> {selectedService.duration} minutes</p>
          <p><span className="font-medium">Price:</span> {formatCurrency(selectedService.price)}</p>
          <p>
            <span className="font-medium">Date & Time:</span>{' '}
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            at {formatTime(selectedTimeSlot.startTime)}
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests (Optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        
        <div className="pt-4">
          <Button type="submit" fullWidth size="lg">
            Confirm Booking
          </Button>
        </div>
      </form>
    </div>
  );
};