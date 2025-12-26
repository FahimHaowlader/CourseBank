import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlinePersonSearch } from "react-icons/md";
import { BiHash } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlinePersonOutline } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoArrowForwardSharp } from "react-icons/io5";
import { GrShareOption } from "react-icons/gr";

import CourseCard from "../Components/CourseCard";

const CoursePage = () => {
  return (
    <div className="bg-white dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
        <header className="mb-5">
          <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text  bg-primary-dark dark:bg-primary tracking-tight pb-1 font-extrabold">
            Course Bank
          </h1>
          <p className="mt-2 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-1.5">
            Search and explore courses by semester, teacher, and category to
            plan your academic journey.
          </p>
        </header>
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-4 mb-6">
            <label className="flex flex-col gap-1.5 w-full md:col-span-10">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400 ">
                Course Title
              </span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary material-symbols-outlined  text-[20px]">
                  <AiOutlineSearch />
                </span>
                <input
                  placeholder="e.g. Intro to Computer Science"
                  type="text"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1.5 w-full md:col-span-5">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                Teacher Name
              </span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg  ">
                <span className="absolute left-3 text-text-secondary material-symbols-outlined text-[20px]">
                  <MdOutlinePersonSearch />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Dr. Sarah Jenkins"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1.5 w-full md:col-span-3">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                Course ID
              </span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary material-symbols-outlined text-[20px]">
                  <BiHash />
                </span>
                <input
                  placeholder="ABCD-1234-EFGH-5678"
                  type="text"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1.5 w-full md:col-span-2">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                Department
              </span>
              <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                  <option value="">All Departments</option>
                  <option>Computer Science</option>
                  <option>Arts &amp; Design</option>
                  <option>Physics</option>
                  <option>Mathematics</option>
                  <option>Business</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                  <IoIosArrowDown />
                </span>
              </div>
            </label>
          </div>
          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-end">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full xl:flex-1">
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Degree
                </span>
                <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                    <option value="">All Degrees</option>
                    <option>Bachelor</option>
                    <option>Master</option>
                    <option>PhD</option>
                    <option>Associate</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                    <IoIosArrowDown />
                  </span>
                </div>
              </label>
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Year
                </span>
                <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                    <option value="">All Years</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                    <IoIosArrowDown />
                  </span>
                </div>
              </label>
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Semester
                </span>
                <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                    <option value="">All Semesters</option>
                    <option>Fall</option>
                    <option>Spring</option>
                    <option>Summer</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                    <IoIosArrowDown />
                  </span>
                </div>
              </label>
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Type
                </span>
                <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                    <option value="">All Types</option>
                    <option>Core</option>
                    <option>Elective</option>
                    <option>Lab</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                    <IoIosArrowDown />
                  </span>
                </div>
              </label>
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Credit
                </span>
                <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                    <option value="">All Credits</option>
                    <option>1 - 3 Credits</option>
                    <option>3 - 6 Credits</option>
                    <option>6+ Credits</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                    <IoIosArrowDown />
                  </span>
                </div>
              </label>
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Major / Non-Major
                </span>
                <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                    <option value="">All Categories</option>
                    <option>Major Required</option>
                    <option>Major Elective</option>
                    <option>Non-Major (General)</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                    <IoIosArrowDown />
                  </span>
                </div>
              </label>
            </div>
            <div className="flex items-center gap-3 w-full xl:w-auto mt-2 xl:mt-0 xl:ml-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 h-11 text-primary hover:bg-primary/5 rounded-lg transition-colors order-first hover:cursor-pointer active:text-primary-dark font-semibold ">
                <span className="material-symbols-outlined  text-[20px] font-semibold">
                  <MdRefresh />
                </span>
                Reset
                <span classNameName="hidden md:block"> Filters</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-11 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors shadow-sm shadow-primary/30 hover:cursor-pointer active:bg-primary-dark ">
                <span className="material-symbols-outlined text-[20px] font-semibold">
                  <AiOutlineSearch />
                </span>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex px-2 flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-sm md:text-base text-text-secondary dark:text-gray-400 self-start sm:self-center">
            Showing{" "}
            <span className="font-bold text-text-main dark:text-white">1</span>{" "}
            to{" "}
            <span className="font-bold text-text-main dark:text-white">12</span>{" "}
            courses
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <span className="hidden sm:inline text-sm font-medium text-text-secondary dark:text-gray-400 whitespace-nowrap">
                Sort by:
              </span>
              <div className="relative">
                <select className="pl-3 pr-10 py-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm font-medium text-text-main dark:text-white focus:border-primary focus:ring-0 cursor-pointer appearance-none shadow-sm hover:shadow transition-shadow">
                  <option>Course Title (A-Z)</option>
                  <option>Professor Name (A-Z)</option>
                  <option>Year (Newest First)</option>
                  <option>Credit (High to Low)</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                  <IoIosArrowDown />
                </span>
              </div>
            </div>
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm font-medium text-text-secondary dark:text-gray-400 shadow-sm whitespace-nowrap">
              <span className="material-symbols-outlined text-[20px] text-primary">
                layers
              </span>
              <span className="hidden sm:inline">Total:</span>{" "}
              <span className="font-bold text-text-main dark:text-white ml-0.5">
                9
              </span>{" "}
              pages
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <span className="bg-white dark:bg-background-dark text-gray-600 dark:text-gray-300 text-sm font-bold px-2 py-1 rounded-md border border-border-light dark:border-border-dark tracking-tighter">
                  Bachelor
                </span>
                <span className="bg-white dark:bg-background-dark text-gray-600 dark:text-gray-300 text-sm font-bold px-2 py-1 rounded-md border border-border-light dark:border-border-dark tracking-tighter">
                  Bachelar
                </span>
                <span className="bg-white dark:bg-background-dark text-gray-600 dark:text-gray-300 text-sm font-bold px-2 py-1 rounded-md border border-border-light dark:border-border-dark tracking-tighter">
                  2 Credits
                </span>
              </div>
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <span className="bg-white dark:bg-background-dark text-gray-600 dark:text-gray-300 text-sm font-bold px-2 py-1 rounded-md border border-border-light dark:border-border-dark tracking-tighter">
                  Theurey
                </span>
                <span className="bg-white dark:bg-background-dark text-gray-600 dark:text-gray-300 text-sm font-bold px-2 py-1 rounded-md border border-border-light dark:border-border-dark tracking-tighter">
                  1est Year
                </span>
                <span className="bg-white dark:bg-background-dark text-gray-600 dark:text-gray-300 text-sm font-bold px-2 py-1 rounded-md border border-border-light dark:border-border-dark tracking-tighter">
                  2nd Semester
                </span>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                    {/* <span className="material-symbols-outlined text-primary text-lg">
                                     <GrShareOption/>
                                   </span> */}
                    Lab
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                    {/* <span className="material-symbols-outlined text-primary text-lg">
                                      <GrShareOption/>
                                    </span> */}
                    3 Credits
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
                  3 Credits
                </div>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
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
            <div className="p-5 pt-0">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
            </div>
          </article>
          {<CourseCard />}
        </div>
        <div className=" flex items-center justify-between  px-4 py-2 sm:px-6 mt-8 ">
          {/* <div className="flex flex-1 justify-between sm:hidden">
            <a
              className="relative inline-flex items-center rounded-md border border-border-light dark:border-border-dark bg-white dark:bg-background-dark px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-50"
              href="#"
            >
              Previous
            </a>
            <a
              className="relative ml-3 inline-flex items-center rounded-md border border-border-light dark:border-border-dark bg-white dark:bg-background-dark px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-50"
              href="#"
            >
              Next
            </a>
          </div> */}
          <div className="flex flex-1 items-center justify-center md:justify-end ">
            <div>
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <a
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/30 dark:hover:bg-background-dark focus:z-20 focus:outline-offset-0"
                  href="#"
                >
                  <span className="sr-only">Previous</span>
                  <span className="material-symbols-outlined text-[20px]">
                    <IoIosArrowBack />
                  </span>
                </a>
                <a
                  aria-current="page"
                  className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
                  href="#"
                >
                  1
                </a>
                <a
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-secondary ring-1 ring-inset ring-border-light hover:bg-primary/30 dark:ring-border-dark dark:hover:bg-background-dark focus:z-20 focus:outline-offset-0"
                  href="#"
                >
                  2
                </a>
                <a
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/30 dark:hover:bg-background-dark md:inline-flex focus:z-20 focus:outline-offset-0"
                  href="#"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark focus:outline-offset-0">
                  ...
                </span>
                <a
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/30 dark:hover:bg-background-dark md:inline-flex focus:z-20 focus:outline-offset-0"
                  href="#"
                >
                  8
                </a>
                <a
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/30 dark:hover:bg-background-dark focus:z-20 focus:outline-offset-0"
                  href="#"
                >
                  9
                </a>
                <a
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-text-secondary ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-primary/30 dark:hover:bg-background-dark focus:z-20 focus:outline-offset-0"
                  href="#"
                >
                  <span className="sr-only">Next</span>
                  <span className="material-symbols-outlined text-[20px]">
                    <IoIosArrowForward />
                  </span>
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="hidden mt-12 flex flex-col items-center justify-center py-16 text-center bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark border-dashed">
          {/* <div className="size-16 rounded-full bg-white dark:bg-background-dark flex items-center justify-center mb-4 text-text-secondary">
            <span className="material-symbols-outlined text-4xl">search_off</span>
          </div> */}
          <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
            No courses found
          </h3>
          <p className="text-text-secondary dark:text-gray-400 px-5 ">
            We couldn't find any courses matching your filters. Try adjusting
            your search criteria.
          </p>
          <button className="mt-5 text-primary font-semibold hover:underline hover:cursor-pointer">
            Clear all filters
          </button>
        </div>
      </main>
      <footer className="bg-background-light dark:bg-card-dark border-t border-border-light dark:border-border-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-secondary dark:text-gray-500">
          <p> University Course Bank System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CoursePage;
