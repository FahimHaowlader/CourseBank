import React from 'react'
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
import { LiaIdCardSolid } from "react-icons/lia";
import CustomCourseCard from '../Components/CustomCourseCard';
import { AiOutlinePlus } from "react-icons/ai";




const AllCoursePage = () => {
  return (
   <div className="bg-white dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
     <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
         <header className="mb-5">
            <div className='sm:flex justify-between mb-1'>
          <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text  bg-primary-dark dark:bg-primary tracking-tight font-extrabold">
            All Course 
          </h1>
           <button className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95">
                          <span className="material-symbols-outlined text-lg">
                            <AiOutlinePlus />
                          </span>
                          Add Course
                        </button>
            </div>
          <p className="mt-2 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-0.5">
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
                    <label className="flex flex-col gap-1.5 w-full md:col-span-3">
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
                        Moderator Id
                      </span>
                      <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg  ">
                        <span className="absolute left-3 text-text-secondary material-symbols-outlined text-[20px]">
                          <LiaIdCardSolid />
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. CSE-2024-001-B"
                          className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                        />
                      </div>
                    </label>
                    <label className="flex flex-col gap-1.5 w-full md:col-span-2">
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
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 h-11 text-primary hover:bg-primary/5 rounded-lg transition-colors order-first hover:cursor-pointer active:text-primary-dark font-semibold active:scale-95 ">
                        <span className="material-symbols-outlined  text-[20px] font-semibold">
                          <MdRefresh />
                        </span>
                        Reset
                        <span classNameName="hidden md:block"> Filters</span>
                      </button>
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-11 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors shadow-sm shadow-primary/30 hover:cursor-pointer active:bg-primary-dark active:scale-95">
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
        
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
         <CustomCourseCard/>
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
    </div>
  )
}

export default AllCoursePage
