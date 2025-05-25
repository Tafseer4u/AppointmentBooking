import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { useAppointments } from '../context/AppointmentContext';
import { formatCurrency, formatTime } from '../utils/dates';
import { getServiceById } from '../data/services';

export const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, cancelAppointment } = useAppointments();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  
  // Filter active appointments (not cancelled)
  const activeAppointments = appointments.filter((appointment) => appointment.status !== 'cancelled');
  
  // Filter past appointments
  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.timeSlot.startTime) < new Date() && appointment.status !== 'cancelled'
  );
  
  // Filter upcoming appointments
  const upcomingAppointments = activeAppointments.filter(
    (appointment) => new Date(appointment.timeSlot.startTime) >= new Date()
  );
  
  // Filter cancelled appointments
  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === 'cancelled'
  );
  
  // Handle cancel appointment
  const handleCancelClick = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setShowCancelModal(true);
  };
  
  // Confirm cancel appointment
  const confirmCancelAppointment = () => {
    if (selectedAppointmentId) {
      cancelAppointment(selectedAppointmentId);
      setShowCancelModal(false);
    }
  };
  
  // Render empty state
  const renderEmptyState = () => (
    <div className="text-center py-16">
      <div className="mb-4">
        <Calendar size={48} className="mx-auto text-gray-400" />
      </div>
      <h3 className="text-xl font-medium mb-2">No Appointments Yet</h3>
      <p className="text-gray-600 mb-6">Book your first appointment to get started</p>
      <Button onClick={() => navigate('/services')}>Book an Appointment</Button>
    </div>
  );
  
  // Render appointment card
  const renderAppointmentCard = (appointmentId: string, isCancelled: boolean = false) => {
    const appointment = appointments.find((app) => app.id === appointmentId);
    if (!appointment) return null;
    
    const service = getServiceById(appointment.serviceId);
    if (!service) return null;
    
    const appointmentDate = new Date(appointment.timeSlot.startTime);
    const isPast = appointmentDate < new Date();
    
    return (
      <Card key={appointment.id} className={isCancelled ? 'opacity-70' : ''}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.category}</p>
            </div>
            <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
              {formatCurrency(service.price)}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex flex-wrap gap-y-3">
              <div className="w-full sm:w-1/2">
                <div className="flex items-start space-x-2">
                  <Calendar size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {appointmentDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="w-full sm:w-1/2">
                <div className="flex items-start space-x-2">
                  <Clock size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">
                      {formatTime(appointment.timeSlot.startTime)} - {formatTime(appointment.timeSlot.endTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        {!isCancelled && !isPast && (
          <CardFooter className="bg-gray-50 px-6 py-4">
            <Button
              variant="danger"
              onClick={() => handleCancelClick(appointment.id)}
              className="w-full"
            >
              <X size={16} className="mr-2" />
              Cancel Appointment
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  };
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Appointments</h1>
        
        {appointments.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="space-y-10">
            {/* Upcoming Appointments */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
              {upcomingAppointments.length > 0 ? (
                <div className="grid gap-6">
                  {upcomingAppointments.map((appointment) =>
                    renderAppointmentCard(appointment.id)
                  )}
                </div>
              ) : (
                <p className="text-gray-600 py-4">You have no upcoming appointments.</p>
              )}
            </div>
            
            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Past Appointments</h2>
                <div className="grid gap-6">
                  {pastAppointments.map((appointment) =>
                    renderAppointmentCard(appointment.id)
                  )}
                </div>
              </div>
            )}
            
            {/* Cancelled Appointments */}
            {cancelledAppointments.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Cancelled Appointments</h2>
                <div className="grid gap-6">
                  {cancelledAppointments.map((appointment) =>
                    renderAppointmentCard(appointment.id, true)
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Appointment"
        size="sm"
      >
        <div className="py-4">
          <p className="text-gray-700 mb-6">
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowCancelModal(false)}
              className="flex-1"
            >
              Keep Appointment
            </Button>
            <Button
              variant="danger"
              onClick={confirmCancelAppointment}
              className="flex-1"
            >
              Cancel Appointment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};