import React from "react";
import CustomCourseCard from "../Components/CustomCourseCard";
import AddCourseCard from "../Components/AddCourseCard";
import CourseDeleteConformation from "../Components/CourseDeleteConformation";

const CrCoursePage = () => {
  return (
    <div className="bg-background-light dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-5">
        {/* <div className="flex flex-col mb-8 gap-5">
          <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">
            Course Bank
          </h1>
          <div className="w-full">
            <label
              className="block text-sm font-semibold text-text-main dark:text-gray-200 mb-2"
              for="course-search"
            >
              Course Title
            </label>
            <div className="relative flex items-center w-full">
              <span className="absolute left-3 text-text-secondary material-symbols-outlined text-[20px]">
                search
              </span>
              <input
                className="w-full h-12 pl-10 pr-4 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary text-text-main dark:text-white placeholder-text-secondary text-sm transition-all shadow-sm"
                id="course-search"
                placeholder="Search by Course Title"
                type="text"
              />
            </div>
          </div>
        </div> */}
        <div>

       
         <div className=" mb-5">
              <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text  bg-gradient-to-r from-primary-dark to-blue-600 dark:from-primary dark:to-blue-200    tracking-tight pb-1 font-extrabold">
           My Courses
          </h1>
          <p className="mt-2 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-0.5">
            View, add, and manage all your courses in one place.
          </p>
          </div>
            {/* <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary tracking-tight">
            My Courses
          </h2>
           <h3  className="mt-1 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-0.5">View, add, and manage all your courses in one place</h3>
            </div> */}
         <div className="text-sm md:text-base text-text-secondary dark:text-gray-400 self-start sm:self-center mb-6 pl-1">
            Showing{" "}
            <span className="font-bold text-text-main dark:text-white">12</span>{" "}
            courses
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           < CustomCourseCard/>
           < CustomCourseCard/>
           < CustomCourseCard/>
           < AddCourseCard/>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Core
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    4 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  CSE-2023-101-A001
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Introduction to Computer Science
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Dr. Sarah Jenkins</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2023 - Fall Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Elective
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    3 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  ART-2024-HIS-B204
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                History of Modern Art &amp; Design
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Prof. Alan Grant</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2024 - Spring Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Lab
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    2 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  PHY-2023-LAB-C302
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Advanced Physics Laboratory II
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Dr. Ellie Sattler</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2023 - Fall Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Core
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    4 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  MTH-2024-CAL-D201
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Calculus for Engineering
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Dr. Ian Malcolm</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2024 - Spring Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Elective
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    3 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  BUS-2023-ETH-E105
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Business Ethics &amp; Society
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Prof. Claire Dearing</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2023 - Summer Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Core
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    4 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  CSE-2023-101-F002
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Introduction to Computer Science
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Dr. Sarah Jenkins</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2023 - Fall Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Elective
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    3 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  ART-2024-HIS-G205
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                History of Modern Art &amp; Design
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Prof. Alan Grant</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2024 - Spring Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Lab
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    2 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  PHY-2023-LAB-H302
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Advanced Physics Laboratory II
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Dr. Ellie Sattler</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2023 - Fall Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Core
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    4 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  MTH-2024-CAL-I202
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Calculus for Engineering
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Dr. Ian Malcolm</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2024 - Spring Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Elective
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    3 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  BUS-2023-ETH-J106
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Business Ethics &amp; Society
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Prof. Claire Dearing</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2023 - Summer Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Core
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    4 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  CSE-2023-101-K003
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Introduction to Computer Science
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Dr. Sarah Jenkins</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2023 - Fall Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Elective
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    3 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  ART-2024-HIS-L206
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                History of Modern Art &amp; Design
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Prof. Alan Grant</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2024 - Spring Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <div className="group relative bg-transparent rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 dark:border-primary/20 dark:hover:border-primary/50 flex flex-col justify-center items-center h-full min-h-[300px] cursor-pointer hover:bg-primary/5 transition-all duration-300">
            <div className="flex flex-col items-center gap-3 text-primary/80 group-hover:text-primary transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <span className="font-bold text-lg">Add Card</span>
            </div>
          </div>
        </div>
      </main>
      {/* <footer className="bg-background-light dark:bg-card-dark border-t border-border-light dark:border-border-dark py-8 mt-auto">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-secondary dark:text-gray-500">
          <p>© 2024 University Portal System. All rights reserved.</p>
        </div>
      </footer> */}
      {/* <DeleteConformation/> */}
    </div>
  );
};

export default CrCoursePage;
