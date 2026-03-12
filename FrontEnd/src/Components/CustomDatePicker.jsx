import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomDatePicker = ({ label, onChange }) => {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const containerRef = useRef(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper: Get days in month
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const daysArray = [];
    while (date.getMonth() === month) {
      daysArray.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return daysArray;
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setOpen(false);
    if (onChange) onChange(date); // Pass date to parent
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  
  const formattedDate = `${String(selectedDate.getDate()).padStart(2, "0")}/${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}/${selectedDate.getFullYear()}`;

  return (
    <div className="col-span-1 relative z-20" ref={containerRef}>
      <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-12 px-3 rounded-lg text-left bg-white dark:bg-background-dark border border-border-light dark:border-border-dark text-text-main dark:text-white text-sm focus:border-primary transition-all flex items-center justify-between"
      >
        {formattedDate}
        <IoIosArrowDown size={20} />
      </button>

      {open && (
        <div className="absolute mt-2 w-72 rounded-xl p-4 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark shadow-xl z-50">
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)} className="p-1 hover:bg-primary/10 rounded">
              <FaChevronLeft />
            </button>
            <span className="font-semibold">{new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}</span>
            <button type="button" onClick={() => setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)} className="p-1 hover:bg-primary/10 rounded">
              <FaChevronRight />
            </button>
          </div>

          <div className="grid grid-cols-7 text-xs text-text-secondary mb-2">
            {days.map(d => <div key={d} className="text-center">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((dateObj) => (
              <button
                type="button"
                key={dateObj.getTime()}
                onClick={() => handleSelectDate(dateObj)}
                className={`h-9 w-9 rounded-lg text-sm flex items-center justify-center ${
                  selectedDate.toDateString() === dateObj.toDateString() ? "bg-primary text-white" : "hover:bg-primary/10"
                }`}
              >
                {dateObj.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;