import React from 'react'
import { MdOutlinePersonOutline } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoArrowForwardSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router';

import SemesterDisplay from './semesterTransformer';


const CustomCourseCard = ({Course}) => {
  return (
    <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
           <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold tracking-tight text-text-main dark:text-white mb-2 line-clamp-1 leading-tight group-hover:text-primary transition-colors">
                    {Course?.title?.charAt(0).toUpperCase() + Course?.title?.slice(1)}
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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
                      {Course?.courseCode.toUpperCase()}
                    </div>
                  </div>
          
                  <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
                        {Course?.degree?.charAt(0).toUpperCase() + Course?.degree?.slice(1)}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
                       {Course?.category?.charAt(0).toUpperCase() + Course?.category?.slice(1)}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
                      {Course?.credits} Credits
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2 gap-x-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
                      {Course?.type?.charAt(0).toUpperCase() + Course?.type?.slice(1)}
                    </div>
                    <div className="inline-flex max-w-[72%] items-center justify-center px-2.5 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
                      <SemesterDisplay code={22} />
                    </div>
                    {/* <span className="bg-white dark:bg-background-dark text-gray-600 dark:text-gray-300 text-sm font-bold px-2 py-1 rounded-md border border-border-light dark:border-border-dark tracking-tighter">
                                2nd Semester 
                              </span> */}
                  </div>
                  <div className="mt-auto space-y-2.5">
                   <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-500 group-hover:text-slate-600 dark:text-slate-300 shadow-sm">
                      <span className="material-symbols-outlined text-[18px] opacity-70 ">
                        <MdOutlinePersonOutline  className="font-semibold"/>
                      </span>
                      <span className="font-semibold capitalize ">{Course?.instructorName}</span>
                    </div>
                   <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-500 group-hover:text-slate-600 dark:text-slate-300 shadow-sm">
                      <span className="material-symbols-outlined text-[18px] opacity-70">
                        <LuCalendarDays />
                      </span>
                  <span>{new Date(Course?.staringDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</span>
                    </div>
                  </div>
                </div>
          {/* <div className="p-5 pt-0">
            <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-semibold text-xs transition-colors flex items-center gap-1.5 hover:cursor-pointer">
              View Details
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                <IoArrowForwardSharp size={18} />
              </span>
            </button>
          </div> */}
           <div className="p-5 pt-0 flex items-center justify-between">
               <Link  to={'/courses/' + Course._id}>
        <button className="w-auto px-4 h-9 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-semibold text-sm transition-colors flex items-center gap-1.5 hover:cursor-pointer">
        View Details 
          <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
            <IoArrowForwardSharp size={18} />
          </span>
        </button>
        </Link> 
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    <FiEdit/>
                  </span>
                </button>
                <button
                  className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-xl bg-slate-200 text-slate-600 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                   < MdDeleteOutline size={24}/>
                  </span>
                </button>
              </div>
            </div>
        </article>
  )
}

export default CustomCourseCard
