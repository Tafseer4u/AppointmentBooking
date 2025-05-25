import React from 'react';
import { TimeSlot } from '../../types';
import { formatTime } from '../../utils/dates';

interface TimeSlotsProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: TimeSlot | null;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
  className?: string;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  timeSlots,
  selectedTimeSlot,
  onSelectTimeSlot,
  className = '',
}) => {
  if (timeSlots.length === 0) {
    return (
      <div className={`text-center p-4 ${className}`}>
        <p className="text-gray-500">No available time slots for the selected date.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 ${className}`}>
      {timeSlots.map((slot) => {
        const isSelected = selectedTimeSlot?.id === slot.id;
        const isAvailable = slot.available;
        
        return (
          <button
            key={slot.id}
            onClick={() => isAvailable && onSelectTimeSlot(slot)}
            disabled={!isAvailable}
            className={`
              py-2 px-3 rounded-md text-sm font-medium transition-all
              ${isSelected 
                ? 'bg-teal-600 text-white ring-2 ring-offset-2 ring-teal-600' 
                : isAvailable 
                  ? 'bg-white border border-gray-200 text-gray-800 hover:bg-teal-50 hover:border-teal-500' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
            aria-label={`Time slot: ${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`}
            aria-selected={isSelected}
            aria-disabled={!isAvailable}
          >
            {formatTime(slot.startTime)}
          </button>
        );
      })}
    </div>
  );
};