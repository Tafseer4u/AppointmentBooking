import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysInMonth, formatDate } from '../../utils/dates';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  minDate = new Date(),
  maxDate,
  className = '',
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(selectedDate.getFullYear());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  
  // Get day names for header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar days
  useEffect(() => {
    const days: Date[] = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    // Get the number of days in the month
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    
    // Get the day of the week of the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Add empty days for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDay = new Date(currentYear, currentMonth, -firstDayOfWeek + i + 1);
      days.push(prevMonthDay);
    }
    
    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }
    
    // Add days to complete the last week if needed
    const remainingDays = 7 - (days.length % 7 || 7);
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(currentYear, currentMonth + 1, i));
    }
    
    setCalendarDays(days);
  }, [currentMonth, currentYear]);
  
  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = prev - 1;
      if (newMonth < 0) {
        setCurrentYear(prev => prev - 1);
        return 11;
      }
      return newMonth;
    });
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = prev + 1;
      if (newMonth > 11) {
        setCurrentYear(prev => prev + 1);
        return 0;
      }
      return newMonth;
    });
  };
  
  // Format the month and year for display
  const formattedMonthYear = new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  
  // Check if a date is selectable
  const isDateSelectable = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if date is in current month
    const isCurrentMonth = date.getMonth() === currentMonth;
    
    // Check if date is after minDate
    const isAfterMinDate = minDate ? date >= minDate : true;
    
    // Check if date is before maxDate
    const isBeforeMaxDate = maxDate ? date <= maxDate : true;
    
    // Don't allow weekends
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    return isCurrentMonth && isAfterMinDate && isBeforeMaxDate && !isWeekend;
  };
  
  // Check if a date is the selected date
  const isSelectedDate = (date: Date): boolean => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  // Handle date click
  const handleDateClick = (date: Date) => {
    if (isDateSelectable(date)) {
      onDateSelect(date);
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">{formattedMonthYear}</h2>
        <button
          onClick={goToNextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const isSelectable = isDateSelectable(date);
          const isSelected = isSelectedDate(date);
          const isCurrentMonth = date.getMonth() === currentMonth;
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={!isSelectable}
              className={`h-10 w-full flex items-center justify-center rounded-md text-sm transition-colors ${
                isSelected
                  ? 'bg-teal-600 text-white font-semibold'
                  : isSelectable
                  ? 'hover:bg-teal-100'
                  : 'cursor-not-allowed'
              } ${
                !isCurrentMonth ? 'text-gray-300' : isSelectable ? 'text-gray-800' : 'text-gray-400'
              }`}
              aria-label={formatDate(date)}
              aria-selected={isSelected}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};