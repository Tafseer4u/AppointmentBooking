import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Check, Clock } from 'lucide-react';
import { Calendar } from '../components/ui/Calendar';
import { TimeSlots } from '../components/ui/TimeSlots';
import { BookingForm } from '../components/forms/BookingForm';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardImage, CardTitle, CardDescription } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { useAppointments } from '../context/AppointmentContext';
import { formatCurrency, formatDate, generateTimeSlots, getNextAvailableDay } from '../utils/dates';
import { TimeSlot } from '../types';

enum BookingStep {
  SERVICE = 0,
  DATE_TIME = 1,
  DETAILS = 2,
  CONFIRMATION = 3,
}

export const Booking: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedService,
    selectedDate,
    selectedTimeSlot,
    setSelectedDate,
    setSelectedTimeSlot,
    clearBookingData,
  } = useAppointments();
  
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.SERVICE);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  
  // Redirect if no service is selected
  useEffect(() => {
    if (!selectedService && currentStep === BookingStep.SERVICE) {
      navigate('/services');
    }
  }, [selectedService, currentStep, navigate]);
  
  // Generate time slots when date changes
  useEffect(() => {
    if (selectedService) {
      const slots = generateTimeSlots(selectedDate, selectedService.duration);
      setAvailableTimeSlots(slots);
      
      // If the current selected time slot is not available on the new date, clear it
      if (selectedTimeSlot && !slots.some(slot => slot.id === selectedTimeSlot.id)) {
        setSelectedTimeSlot(null);
      }
    }
  }, [selectedDate, selectedService, selectedTimeSlot, setSelectedTimeSlot]);
  
  // Set minimum date to today
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  
  // Go to next booking step
  const handleNextStep = () => {
    if (currentStep < BookingStep.CONFIRMATION) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Go to previous booking step
  const handlePreviousStep = () => {
    if (currentStep > BookingStep.SERVICE) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/services');
    }
  };
  
  // Handle booking completion
  const handleBookingComplete = () => {
    setShowConfirmation(true);
  };
  
  // Handle closing the confirmation modal
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    clearBookingData();
    navigate('/appointments');
  };
  
  // Check if current step is complete and can proceed
  const canProceed = () => {
    switch (currentStep) {
      case BookingStep.SERVICE:
        return !!selectedService;
      case BookingStep.DATE_TIME:
        return !!selectedTimeSlot;
      default:
        return true;
    }
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case BookingStep.SERVICE:
        return (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Selected Service</h2>
            {selectedService && (
              <Card>
                <CardImage src={selectedService.image} alt={selectedService.name} />
                <CardContent className="pt-6">
                  <CardTitle>{selectedService.name}</CardTitle>
                  <CardDescription className="mt-2">{selectedService.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center text-gray-600">
                      <Clock size={18} className="mr-1" />
                      <span>{selectedService.duration} minutes</span>
                    </div>
                    <div className="flex items-center text-gray-600 font-medium">
                      <span>{formatCurrency(selectedService.price)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
      
      case BookingStep.DATE_TIME:
        return (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Select a Date</h3>
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  minDate={minDate}
                />
                
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDate(getNextAvailableDay())}
                    size="sm"
                  >
                    Next Available Day
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Available Times for {formatDate(selectedDate)}
                </h3>
                <TimeSlots
                  timeSlots={availableTimeSlots}
                  selectedTimeSlot={selectedTimeSlot}
                  onSelectTimeSlot={setSelectedTimeSlot}
                />
              </div>
            </div>
          </div>
        );
      
      case BookingStep.DETAILS:
        return <BookingForm />;
      
      default:
        return null;
    }
  };
  
  // Booking steps
  const steps = [
    { id: BookingStep.SERVICE, name: 'Service' },
    { id: BookingStep.DATE_TIME, name: 'Date & Time' },
    { id: BookingStep.DETAILS, name: 'Details' },
  ];
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      {/* Booking Progress */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between w-full mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= step.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? <Check size={18} /> : index + 1}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    currentStep >= step.id ? 'text-teal-600 font-medium' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > index ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Step Content */}
      <div className="mb-10">{renderStepContent()}</div>
      
      {/* Navigation Buttons */}
      <div className="max-w-3xl mx-auto flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        {currentStep < BookingStep.DETAILS ? (
          <Button onClick={handleNextStep} disabled={!canProceed()}>
            Next
            <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button onClick={handleBookingComplete} disabled={!canProceed()}>
            Complete Booking
            <Check size={16} className="ml-2" />
          </Button>
        )}
      </div>
      
      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        title="Booking Confirmed!"
        size="md"
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your appointment has been successfully booked.
          </p>
          <Button onClick={handleCloseConfirmation} fullWidth>
            View My Appointments
          </Button>
        </div>
      </Modal>
    </div>
  );
};