import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuAsterisk } from "react-icons/lu";

const CustomDatePicker = () => {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

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
    setSelectedDate(date);
    setOpen(false);
  };

  const goToPreviousMonth = (e) => {
    e.stopPropagation(); // prevent modal from closing
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = (e) => {
    e.stopPropagation(); // prevent modal from closing
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Format as DD/MM/YYYY
  const formattedDate = `${String(selectedDate.getDate()).padStart(2, "0")}/${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}/${selectedDate.getFullYear()}`;

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
    <div className="col-span-1 relative z-20">

      <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
       <div className="flex gap-1 " >

        Starting Date 
         <span> <LuAsterisk className="text-red-500" size={14}/></span>
       </div>
      </label>

      {/* INPUT BUTTON */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-12 px-[13px]  rounded-lg text-left
          bg-white dark:bg-background-dark
          border border-border-light dark:border-border-dark
          text-text-main dark:text-white text-sm
          focus:border-primary transition-all
          flex items-center justify-between"
      >
        {formattedDate}
        <IoIosArrowDown size={20} className="text-text-secondary font-semibold" />
      </button>

      {/* CALENDAR MODAL */}
      {open && (
        <div
          className="absolute mt-2 w-72 rounded-xl p-4
          bg-white dark:bg-background-dark
          border border-border-light dark:border-border-dark
          shadow-xl"
          onClick={(e) => e.stopPropagation()} // prevent click inside modal from closing
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-primary/10 rounded"
            >
              <FaChevronLeft className="text-text-main dark:text-white" />
            </button>

            <span className="font-semibold text-text-main dark:text-white">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </span>

            <button
              type="button"
              onClick={goToNextMonth}
              className="p-1 hover:bg-primary/10 rounded"
            >
              <FaChevronRight className="text-text-main dark:text-white" />
            </button>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 text-xs text-text-secondary mb-2">
            {days.map((d) => (
              <div key={d} className="text-center">
                {d}
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((dateObj) => {
              const isSelected =
                selectedDate.toDateString() === dateObj.toDateString();

              return (
                <button
                  type="button"
                  key={dateObj.getTime()}
                  onClick={() => handleSelectDate(dateObj)}
                  className={`h-9 w-9 rounded-lg text-sm
                    flex items-center justify-center
                    transition
                    ${
                      isSelected
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10 text-text-main dark:text-white"
                    }`}
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

