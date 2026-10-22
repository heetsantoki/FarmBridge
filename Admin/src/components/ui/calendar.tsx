import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  mode?: "single" | "range";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  initialFocus?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  mode = "single",
  selected,
  onSelect,
  initialFocus = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(selected);

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (onSelect) {
      onSelect(date);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <DayPicker
        mode={mode}
        selected={selectedDate}
        onSelect={handleSelect}
        initialFocus={initialFocus}
        className="border border-gray-200 rounded-md"
        classNames={{
          caption: "flex justify-between items-center py-2",
          caption_label: "text-sm font-medium text-gray-900",
          nav_button: "p-2 rounded-md hover:bg-gray-100",
          nav_button_previous: "mr-2",
          nav_button_next: "ml-2",
          table: "w-full mt-2",
          head_cell: "text-gray-500 text-xs font-medium",
          cell: "text-center p-2",
          day: "rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
          day_selected: "bg-blue-500 text-white hover:bg-blue-600",
          day_today: "bg-gray-100",
          day_disabled: "text-gray-400 cursor-not-allowed",
        }}
      />
    </div>
  );
};

export default Calendar;