import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomDatePicker = ({ label, onChange,selectedDate :value }) => {
  //  // console.log("CustomDatePicker Rendered with value:", value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Define the limit: 1.5 years (18 months) ago
  const minDate = new Date();
  minDate.setMonth(today.getMonth() - 18);
  minDate.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const containerRef = useRef(null);

  useEffect(() => {
    if (value) {
      const newDate = new Date(value);
      setSelectedDate(newDate);
      setCurrentMonth(newDate.getMonth());
      setCurrentYear(newDate.getFullYear());
    }
  }, [value]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    // BLOCK if date is in the future OR older than 1.5 years
    if (date > today || date < minDate) return;
    
    setSelectedDate(date);
    setOpen(false);
    if (onChange) onChange(date);
  };

  const handlePrevMonth = () => {
    // Prevent navigating further back than the 1.5 year limit
    const firstDayOfCurrentView = new Date(currentYear, currentMonth, 1);
    if (firstDayOfCurrentView <= minDate) return;

    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
    if (nextMonthDate > today) return;

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

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

  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
  const isMinMonth = currentMonth === minDate.getMonth() && currentYear === minDate.getFullYear();

  return (
    <div className="col-span-1 relative z-20" ref={containerRef}>
      <label className="block text-sm font-semibold text-slate-500 dark:text-gray-400 mb-1.5">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-12 px-4 rounded-lg text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-teal-500 transition-all flex items-center justify-between cursor-pointer"
      >
        {formattedDate}
        <IoIosArrowDown size={20} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute mt-2 w-72 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl z-50">
          <div className="flex items-center justify-between mb-4">
            <button 
              type="button" 
              disabled={isMinMonth}
              onClick={handlePrevMonth} 
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <FaChevronLeft size={14} />
            </button>
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
            </span>
            <button 
              type="button" 
              disabled={isCurrentMonth}
              onClick={handleNextMonth} 
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-7 text-[10px] uppercase tracking-wider text-slate-400 mb-2">
            {days.map(d => <div key={d} className="text-center font-bold">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((dateObj) => {
              const isFuture = dateObj > today;
              const isTooOld = dateObj < minDate;
              const isDisabled = isFuture || isTooOld;
              const isSelected = selectedDate.toDateString() === dateObj.toDateString();

              return (
                <button
                  type="button"
                  key={dateObj.getTime()}
                  disabled={isDisabled}
                  onClick={() => handleSelectDate(dateObj)}
                  className={`h-9 w-9 rounded-lg text-sm flex items-center justify-center transition-all
                    ${isSelected 
                      ? "bg-teal-600 text-white font-bold shadow-md shadow-teal-500/20" 
                      : "text-slate-700 dark:text-slate-200"
                    }
                    ${isDisabled 
                      ? "opacity-20 cursor-not-allowed" 
                      : !isSelected ? "hover:bg-teal-50 dark:hover:bg-teal-900/30 cursor-pointer" : ""
                    }
                  `}
                >
                  {dateObj.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;