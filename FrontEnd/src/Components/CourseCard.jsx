import React from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoArrowForwardSharp } from "react-icons/io5";

const CourseCard = () => {
  return (
    <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold tracking-tight text-text-main dark:text-white mb-2 line-clamp-1 leading-tight group-hover:text-primary transition-colors">
          Introduction to Computer Science dfgdgdbgdfgdrrfdfrgrgr
        </h3>
        <div className="flex justify-between items-start mb-3 flex-wrap gap-y-2">
          {/* <div className="flex items-center gap-2">
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                        Core
                      </span>
                      <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                        4 Credits
                      </span>
                    </div> */}
          <span className="text-sm group-hover:text-gray-600 font-mono font-bold text-text-secondary dark:text-gray-400 tracking-tighter">
            CSE-2023-101-A001
          </span>
        </div>

        <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
            3 Credits
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
            3 Credits
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
            3 Credits
          </div>
        </div>
        <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
            3 Credits
          </div>
          <div className="inline-flex w-[67%] items-center justify-center px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
            1est Year 2nd Semester
          </div>
          {/* <span className="bg-white dark:bg-background-dark text-gray-600 dark:text-gray-300 text-sm font-bold px-2 py-1 rounded-md border border-border-light dark:border-border-dark tracking-tighter">
                      2nd Semester 
                    </span> */}
        </div>
        <div className="mt-auto space-y-2.5">
          <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 font-semibold text-sm ">
            <span className="material-symbols-outlined text-[18px] opacity-70">
              <MdOutlinePersonOutline />
            </span>
            <span className="font-semibold ">Dr. Sarah Jenkins</span>
          </div>
          <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm font-medium">
            <span className="material-symbols-outlined text-[18px] opacity-70">
              <LuCalendarDays />
            </span>
            <span>2023 - Fall Semester</span>
          </div>
        </div>
      </div>
      <div className="p-5 pt-0">
        <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-semibold text-xs transition-colors flex items-center gap-1.5 hover:cursor-pointer">
          View Details
          <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
            <IoArrowForwardSharp size={18} />
          </span>
        </button>
      </div>
    </article>
  );
};

export default CourseCard;
