import { TbIdBadge2 } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RiCameraAiLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineMenuBook } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { PiBooksLight } from "react-icons/pi";
import { MdOutlineUploadFile } from "react-icons/md";
import { RiSwap3Line } from "react-icons/ri";
import { FiLink } from "react-icons/fi";
import { LuNotebook } from "react-icons/lu";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineTask } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlineAssessment } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { LuAsterisk } from "react-icons/lu";


import { useAuth } from "../Contexts/Auth.Context";
import { useState } from "react";

import SemesterDisplay from "../Components/semesterTransformer";
import CustomDatePicker from "../Components/CustomDatePicker";

const AddCoursePage = () => {
  // const {user} = useAuth();

  const user = {};
  user.userId = "cse2323232"
  user.department = "cse";
  user.role = "adin";
  user.semester = 22; 
  user.degree = "bachelor";
  user.year= 2023

  const [courseData, setCourseData] = useState({
    title: "",
    courseCode: "",
    // Pre-fill the department from the user context
    department: user?.department || "",
    // Do the same for degree and semester if needed
    degree: user?.degree || "",
    semester: user?.semester || "", 
  });

  // setCourseData((prevData) => ({ ...prevData, department: user.department }));
const generateYearRange = (start) => {
    const current = new Date().getFullYear();
    return Array.from({ length: current - start + 1 }, (_, i) => current - i);
  };
  const years = generateYearRange(2025);
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-text-main-light dark:text-text-main-dark min-h-screen flex flex-col transition-colors duration-200">
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-5">
        <div className="mb-5">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-primary-dark dark:bg-primary bg-clip-text text-text-main-light dark:text-text-main-dark mb-1 tracking-tight text-transparent">
            Add New Course
          </h1>
          <p className="pt-2 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-1">
            Please fill in the structured sections below to create a
            comprehensive course entry.
          </p>
        </div>
        <form className="flex flex-col gap-6 mb-12">
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8 w-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg text-primary-dark/90 dark:text-primary">
                <span className="material-symbols-outlined">
                  <TbIdBadge2 size={24} />
                </span>
              </div>
              <div className="flex gap-1">
              <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                Course Details 
              </h3>
                <span> <LuAsterisk className="text-red-500"/></span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="col-span-1 md:col-span-2 lg:col-span-5">
                <label className="flex flex-col gap-1.5 w-full md:col-span-10">
                  <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400 ">
                    Course Title
                  </span>
                   <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
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
              </div>
                  <div className="col-span-1">
                <label className="flex flex-col gap-1.5 w-full md:col-span-3">
                   <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                    Course Code
                  </span>
                  <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
                  <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                    <span className="absolute left-2.5 text-text-secondary material-symbols-outlined text-[20px]">
                      <BiHash />
                    </span>
                    <input
                      placeholder="ABCD-1234-EFGH-5678"
                      type="text"
                      className="w-full h-11 pl-8 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                    />
                  </div>
                </label>
              </div>
               <div className="col-span-1">
                <label className="flex flex-col gap-1.5 w-full">
                   <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                   Format
                  </span>
                     <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                    <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                      <option>Major</option>
                      <option>Non-Major </option>
                      <option>Elective</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                      <IoIosArrowDown />
                    </span>
                  </div>
                </label>
              </div>            
               <div className="col-span-1">
                <label className="flex flex-col gap-1.5 w-full">
                   <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                    Type
                  </span>
                   <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                    <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                      <option>Core</option>
                      <option>Lab</option>
                      <option>Project</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                      <IoIosArrowDown />
                    </span>
                  </div>
                </label>
              </div>
             
             <div className="col-span-1">
                <label className="flex flex-col gap-1.5 w-full">
                  <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                    Credit
                  </span>
                     <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                    <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                      <option>1 Credits</option>
                      <option>2 Credits</option>
                      <option>3 Credits</option>
                      <option>4 Credits</option>
                      <option>5 Credits</option>
                      <option>6 Credits</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                      <IoIosArrowDown />
                    </span>
                  </div>
                </label>
              </div>
             
              <div className="col-span-1 relative z-20">
                <CustomDatePicker />
              </div>
               <div className="col-span-1">

                <label className="flex flex-col gap-1.5 w-full">
                  <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                    Degree
                  </span>
                    <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
                  {user && user.role === "admin" ? (
                      <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
                    name="degree"
                    // value={filters.degree}
                    // onChange={handleFilterChange}
                  >
                    <option value={"bachelor"}>Bachelor</option>
                    <option value={"master"}>Master</option>
                    <option value={"phd"}>PhD</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                    <IoIosArrowDown />
                  </span>
                </div>
                  ) : (
                    <div
                      className={`relative w-full border border-border-light dark:border-border-dark rounded-lg transition-colors 
     bg-gray-100 dark:bg-zinc-900/50 focus-within:border-primary`}
                    >
                      <select
                        className={`w-full h-11 pl-3 pr-10 rounded-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-sm appearance-none 
           cursor-not-allowed opacity-70`}
                        name="department"
                        value={user?.department}
                        disabled
                        // Use courseData.department which was pre-filled in the state
                      >
                        <option >{user?.degree.charAt(0).toUpperCase() + user?.degree.slice(1)}</option>
                      </select>
                    </div>
                  )}
                </label>
              </div>

                <div className="col-span-1">
                <label className="flex flex-col gap-1.5 w-full md:col-span-2">
                  <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                    Department
                  </span>
                    <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
                  {user && user.role === "admin" ? (
                    <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                      <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                        <option value="cse">CSE</option>
                  <option value="xyz">Arts &amp; Design</option>
                  <option value="phy">Physics</option>
                  <option value="mat">Mathematics</option>
                  <option value="bus">Business</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                        <IoIosArrowDown />
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`relative w-full border border-border-light dark:border-border-dark rounded-lg transition-colors 
     bg-gray-100 dark:bg-zinc-900/50 focus-within:border-primary`}
                    >
                      <select
                        className={`w-full h-11 pl-3 pr-10 rounded-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-sm appearance-none 
           cursor-not-allowed opacity-70`}
                        name="department"
                        value={user?.department}
                        disabled
                        // Use courseData.department which was pre-filled in the state
                      >
                        <option>{courseData?.department.toUpperCase()}</option>
                      </select>
                    </div>
                  )}
                </label>
              </div>
           
              <div className="col-span-1">
                <label className="flex flex-col gap-1.5 w-full">
                  <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                    Semester
                  </span> <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
                  {user && user.role === "admin" ? (
                    <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                      <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                      
                        {/* <option><SemesterDisplay code={10}/></option> */}
                        <option><SemesterDisplay code={11}/></option>
                        <option><SemesterDisplay code={12}/></option>
                        {/* <option><SemesterDisplay code={20}/></option> */}
                        <option><SemesterDisplay code={21}/></option>
                        <option><SemesterDisplay code={22}/></option>
                        {/* <option><SemesterDisplay code={30}/></option> */}
                        <option><SemesterDisplay code={31}/></option>
                        <option><SemesterDisplay code={32}/></option>
                        {/* <option><SemesterDisplay code={40}/></option> */}
                        <option><SemesterDisplay code={41}/></option>
                        <option><SemesterDisplay code={42}/></option>
                        {/* <option><SemesterDisplay code={50}/></option> */}
                        <option><SemesterDisplay code={51}/></option>
                        <option><SemesterDisplay code={52}/></option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                        <IoIosArrowDown />
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`relative w-full border border-border-light dark:border-border-dark rounded-lg transition-colors 
     bg-gray-100 dark:bg-zinc-900/50 focus-within:border-primary`}
                    >
                      <div
                        className={`flex items-center justify-center w-full h-11 pl-3 pr-10 rounded-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-sm appearance-none 
           cursor-not-allowed opacity-70`}
                        name="department"
                        value={user?.department}
                        disabled
                        // Use courseData.department which was pre-filled in the state
                      >
                        <SemesterDisplay code={user?.semester} />
                      </div>
                    </div>
                  )}
                </label>
              </div>
              <div className="col-span-1">
                <label className="flex flex-col gap-1.5 w-full">
                   <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                    Year
                  </span>
                  
                   <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
                  {user && user.role === "admin" ? (
                      <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
                    name="year"
                    // value={filters.year}
                    // onChange={handleFilterChangeIntoNumber}
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                        <IoIosArrowDown />
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`relative w-full border border-border-light dark:border-border-dark rounded-lg transition-colors 
     bg-gray-100 dark:bg-zinc-900/50 focus-within:border-primary`}
                    >
                      <div
                        className={`flex items-center justify-center w-full h-11 pl-3 pr-10 rounded-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-base appearance-none 
           cursor-not-allowed opacity-70`}
                        name="department"
                        value={user?.year}
                        disabled
                        // Use courseData.department which was pre-filled in the state
                      >
                        {user?.year}
                      </div>
                    </div>
                  )}
                </label>
              </div>
              <div className="col-span-1">
                <label className="flex flex-col gap-1.5 w-full">
                  <div className="flex gap-1">
                  <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                    Moderator ID
                  </span>
                   <span> <LuAsterisk className="text-red-500" size={14}/></span>
                  </div>
                    <div
                      className={`relative w-full border border-border-light dark:border-border-dark rounded-lg transition-colors 
     bg-gray-100 dark:bg-zinc-900/50 focus-within:border-primary`}
                    >
                      <div
                        className={`flex items-center justify-center w-full h-11 pl-3 pr-10 rounded-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-base appearance-none 
           cursor-not-allowed opacity-70`}
                        name="department"
                        // value={user?.userId}
                        disabled
                      >
                        {user?.userId.toUpperCase()}
                      </div>
                    </div>
                  
                </label>
              </div>
                
             
            </div>
          </div>
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8 w-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg text-primary-dark/90 dark:text-primary">
                <span className="material-symbols-outlined">
                  <MdOutlinePersonOutline size={24} />
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                Instructor Details
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="col-span-1 h-full">
                <label className="block text-text-main-light dark:text-text-main-dark text-md font-semibold mb-2">
                  Instructor Photo
                </label>
                <div className="bg-background-light dark:bg-background-dark/30 border-2 border-border-light dark:border-border-dark hover:border-primary transition-all rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer group relative shadow-sm h-60">
                  <input
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    title="Upload Instructor Photo"
                    type="file"
                  />
                  <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-5xl text-primary">
                      <RiCameraAiLine />
                    </span>
                  </div>
                  <span className="text-base font-semibold text-text-main-light dark:text-text-main-dark">
                    Upload Photo
                  </span>
                  <span className="text-sm text-text-muted-light mt-1">
                    JPG or PNG, max 2MB
                  </span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 h-full flex flex-col">
                <label className="block text-text-main-light dark:text-text-main-dark text-md font-semibold mb-2">
                  Personal Information
                </label>
                <div className="bg-background-light dark:bg-background-dark/30 rounded-xl p-6 border border-border-light dark:border-border-dark shadow-sm h-60 flex flex-col justify-center gap-6">
                  <div>
                    <label className="flex flex-col gap-1.5 w-full ">
                      <span className="text-sm font-semibold text-text-secondary dark:text-gray-400 ">
                        Course Title
                      </span>
                      <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                        <span className="absolute left-3 text-text-secondary material-symbols-outlined  text-[20px]">
                          <MdOutlinePersonOutline />
                        </span>
                        <input
                          placeholder="e.g. Dr. John Doe / Prof. Jane Smith"
                          type="text"
                          className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label className="flex flex-col gap-1.5 w-full md:col-span-2">
                      <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                        Department
                      </span>
                      <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                        <select className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
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
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[150%] max-w-full">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8 w-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary/10 p-2 rounded-lg text-primary-dark/90 dark:text-primary">
                  <span className="material-symbols-outlined">
                    <IoDocumentTextOutline size={24} />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                  Course Description
                </h3>
              </div>
              <textarea
                className="w-full p-4 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60 resize-none h-60"
                placeholder="Provide a detailed overview of the course objectives, topics covered, and expected learning outcomes..."
              ></textarea>
            </div>
          </div>
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8 w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary-dark/90 dark:text-primary">
                  <span className="material-symbols-outlined">
                    <PiBooksLight size={24} />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                  Suggested Books
                </h3>
              </div>

              <button
                className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors uppercase tracking-wide cursor-pointer hover:underline"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">
                  <AiOutlinePlus />
                </span>{" "}
                More
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-background-light dark:bg-background-dark/30 p-4 rounded-lg border border-border-light dark:border-border-dark">
                <div className="w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Book Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted-light text-lg">
                      <MdOutlineMenuBook className="text-primary" />
                    </span>
                    <input
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                      placeholder="e.g. Clean Code"
                      type="text"
                    />
                  </div>
                </div>
                <div className=" w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Author Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted-light text-lg">
                      <MdOutlinePersonOutline className="text-primary" />
                    </span>
                    <input
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                      placeholder="e.g. Fahad Muhammad"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Upload or Link PDF
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input className="hidden" id="book-pdf-1" type="file" />
                      <label
                        className="flex items-center justify-center gap-2 h-10 px-3 rounded-lg border border-dashed border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary cursor-pointer transition-colors w-full"
                        htmlFor="book-pdf-1"
                      >
                        <span className="material-symbols-outlined text-lg">
                          <MdOutlineUploadFile className="text-primary" />
                        </span>
                        <span className="text-sm truncate text-slate-500">
                          Choose File
                        </span>
                      </label>
                    </div>
                    <div className="relative w-10">
                      <button
                        className="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                        title="Link URL"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">
                          <RiSwap3Line className="text-primary" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-background-light dark:bg-background-dark/30 p-4 rounded-lg border border-border-light dark:border-border-dark">
                <div className="w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Book Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted-light text-lg">
                      <MdOutlineMenuBook className="text-primary" />
                    </span>
                    <input
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                      placeholder="e.g. Clean Code"
                      type="text"
                    />
                  </div>
                </div>
                <div className=" w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Author Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted-light text-lg">
                      <MdOutlinePersonOutline className="text-primary" />
                    </span>
                    <input
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                      placeholder="e.g. Fahad Muhammad"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Upload or Link PDF
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                        placeholder="e.g. https://example.com/book.pdf"
                        type="text"
                      />
                      <span className="material-symbols-outlined text-lg absolute left-3 top-2.5 text-text-muted-light">
                        <FiLink className="text-primary" />
                      </span>
                    </div>
                    <div className="relative w-10">
                      <button
                        className="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                        title="Link URL"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">
                          <RiSwap3Line className="text-primary" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8 w-full">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary-dark/90 dark:text-primary">
                  <span className="material-symbols-outlined">
                    <FaRegFolderOpen size={24} />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                  Course Materials
                </h3>
              </div>
              <button
                className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors uppercase tracking-wide cursor-pointer hover:underline"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">
                  <AiOutlinePlus />
                </span>{" "}
                More
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-background-light dark:bg-background-dark/30 p-4 rounded-lg border border-border-light dark:border-border-dark">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Material Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-secondary dark:text-gray-400 text-lg">
                      <IoDocumentTextOutline className="text-primary" />
                    </span>
                    <input
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                      placeholder="e.g. Clean Code"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Upload or Link PDF
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input className="hidden" id="book-pdf-1" type="file" />
                      <label
                        className="flex items-center justify-center gap-2 h-10 px-3 rounded-lg border border-dashed border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary cursor-pointer transition-colors w-full"
                        htmlFor="book-pdf-1"
                      >
                        <span className="material-symbols-outlined text-lg">
                          <MdOutlineUploadFile className="text-primary" />
                        </span>
                        <span className="text-sm truncate text-slate-500">
                          Choose File
                        </span>
                      </label>
                    </div>
                    <div className="relative w-10">
                      <button
                        className="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                        title="Link URL"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">
                          <RiSwap3Line className="text-primary" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-background-light dark:bg-background-dark/30 p-4 rounded-lg border border-border-light dark:border-border-dark">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Material Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted-light text-lg">
                      <IoDocumentTextOutline className="text-primary" />
                    </span>
                    <input
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                      placeholder="e.g. Clean Code"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Upload or Link PDF
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                        placeholder="e.g. https://example.com/book.pdf"
                        type="text"
                      />
                      <span className="material-symbols-outlined text-lg absolute left-3 top-2.5 text-text-muted-light">
                        <FiLink className="text-primary" />
                      </span>
                    </div>
                    <div className="relative w-10">
                      <button
                        className="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                        title="Link URL"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">
                          <RiSwap3Line className="text-primary" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8 w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg text-primary-dark/90 dark:text-primary">
                <span className="material-symbols-outlined">
                  <LuNotebook size={24} />
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                Full Hand Note Book
              </h3>
            </div>
            <div className="border-2 border-dashed active:border-primary hover:border-primary/50 border-border-light dark:border-border-dark rounded-xl p-6 hover:bg-background-light dark:hover:bg-card-dark transition-colors group cursor-pointer text-center bg-white dark:bg-card-dark/30 h-40 flex flex-col justify-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-3xl text-text-muted-light group-hover:text-primary text-slate-500 transition-colors">
                  <LuNotebookPen className="" />
                </span>
                <div className="space-y-1">
                  <p className="text-text-secondary dark:text-gray-400 dark:text-text-main-dark font-semibold text-sm">
                    Upload Hand Notes
                  </p>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-xs">
                    PDF Scans (Max 50MB)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8 w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary-dark/90 dark:text-primary">
                  <span className="material-symbols-outlined">
                    <MdOutlineTask size={24} />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                  Tasks
                </h3>
              </div>
              <button
                className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors uppercase tracking-wide cursor-pointer hover:underline"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">
                  <AiOutlinePlus />
                </span>{" "}
                More
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-background-light dark:bg-background-dark/30 p-4 rounded-lg border border-border-light dark:border-border-dark">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Task Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted-light text-lg">
                      <MdOutlineAssignment className="text-primary" />
                    </span>
                    <input
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                      placeholder="e.g. Clean Code"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Upload or Link PDF
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input className="hidden" id="book-pdf-1" type="file" />
                      <label
                        className="flex items-center justify-center gap-2 h-10 px-3 rounded-lg border border-dashed border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary cursor-pointer transition-colors w-full"
                        htmlFor="book-pdf-1"
                      >
                        <span className="material-symbols-outlined text-lg">
                          <MdOutlineUploadFile className="text-primary" />
                        </span>
                        <span className="text-sm truncate text-slate-500">
                          Choose File
                        </span>
                      </label>
                    </div>
                    <div className="relative w-10">
                      <button
                        className="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                        title="Link URL"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">
                          <RiSwap3Line className="text-primary" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-background-light dark:bg-background-dark/30 p-4 rounded-lg border border-border-light dark:border-border-dark">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Task Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted-light text-lg">
                      <MdOutlineAssignment className="text-primary" />
                    </span>
                    <input
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                      placeholder="e.g. Clean Code"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                    Upload or Link PDF
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        className="w-full h-10 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                        placeholder="e.g. https://example.com/book.pdf"
                        type="text"
                      />
                      <span className="material-symbols-outlined text-lg absolute left-3 top-2.5 text-text-muted-light">
                        <FiLink className="text-primary" />
                      </span>
                    </div>
                    <div className="relative w-10">
                      <button
                        className="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                        title="Link URL"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">
                          <RiSwap3Line className="text-primary" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8 w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary-dark/90 dark:text-primary">
                  <span className="material-symbols-outlined">
                    <MdOutlineAssessment size={24} />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                  Assessment
                </h3>
              </div>
              <button
                className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors uppercase tracking-wide cursor-pointer hover:underline"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">
                  <AiOutlinePlus />
                </span>{" "}
                More
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-background-light dark:bg-background-dark/30 p-4 rounded-lg border border-border-light dark:border-border-dark flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5 pl-1">
                      Type
                    </label>
                    <div className="relative">
                      <select className="w-full h-12 px-3  rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark appearance-none cursor-pointer">
                        <option>Termtest-1</option>
                        <option>Termtest-2</option>
                        <option>Midterm-1</option>
                        <option>Midterm-2</option>
                        <option>Quiz-2</option>
                        <option>Quiz-2</option>
                        <option>Final</option>
                        <option>Project</option>
                        <option>Presentation</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-text-muted-light text-base">
                        <IoIosArrowDown size={20} />
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5 pl-1">
                      Mark
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-12 px-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                        placeholder="e.g. 30"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <CustomDatePicker label="Date" />
                    {/* <label class="block text-xs font-medium text-text-muted-light mb-1.5">
                      Date
                    </label>
                    <div class="relative">
                      <input
                        class="w-full h-10 px-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark cursor-pointer"
                        type="date"
                      />
                    </div> */}
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold  text-text-secondary dark:text-gray-400 mb-1.5">
                      Upload or Link PDF
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input className="hidden" id="book-pdf-1" type="file" />
                        <label
                          className="flex items-center justify-center gap-2 h-12 px-3 rounded-lg border border-dashed border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary cursor-pointer transition-colors w-full"
                          htmlFor="book-pdf-1"
                        >
                          <span className="material-symbols-outlined text-lg">
                            <MdOutlineUploadFile className="text-primary" />
                          </span>
                          <span className="text-sm truncate text-slate-500">
                            Choose File
                          </span>
                        </label>
                      </div>
                      <div className="relative w-12">
                        <button
                          className="flex h-12 w-12  items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                          title="Link URL"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-lg">
                            <RiSwap3Line size={24} className="text-primary" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div class="col-span-1">
                  <label class="block text-sm font-semibold text-text-muted-light mb-1.5">
                    Upload or Link PDF
                  </label>
                  <div class="flex gap-2">
                    <div class="relative flex-1">
                      <input class="hidden" id="book-pdf-1" type="file" />
                      <label
                        class="flex items-center justify-center gap-2 h-10 px-3 rounded-lg border border-dashed border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary cursor-pointer transition-colors w-full"
                        for="book-pdf-1"
                      >
                        <span class="material-symbols-outlined text-lg">
                          <MdOutlineUploadFile className="text-primary" />
                        </span>
                        <span class="text-sm truncate text-slate-500">Choose File</span>
                      </label>
                    </div>
                    <div class="relative w-10">
                      <button
                        class="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                        title="Link URL"
                        type="button"
                      >
                        <span class="material-symbols-outlined text-lg">
                          <RiSwap3Line className="text-primary" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* <div class="pt-4 border-t border-border-light dark:border-border-dark border-dashed">
                  <div class="flex gap-3">
                    <div class="relative flex-1">
                      <input class="hidden" id="assess-file-1" type="file" />
                      <label
                        class="flex items-center justify-center gap-2 h-10 px-3 rounded-lg border border-dashed border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary hover:bg-primary/5 cursor-pointer transition-all w-full group"
                        for="assess-file-1"
                      >
                        <span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                          upload_file
                        </span>
                        <span class="text-sm font-medium">
                          Upload Assessment PDF
                        </span>
                      </label>
                    </div>
                    <div class="relative w-12">
                      <button
                        class="flex items-center justify-center size-10 w-full rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                        title="Link URL"
                        type="button"
                      >
                        <span class="material-symbols-outlined text-lg">
                          link
                        </span>
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="bg-background-light dark:bg-background-dark/30 p-4 rounded-lg border border-border-light dark:border-border-dark flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5 pl-1">
                      Type
                    </label>
                    <div className="relative">
                      <select className="w-full h-12 px-3  rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark appearance-none cursor-pointer">
                        <option>Termtest-1</option>
                        <option>Termtest-2</option>
                        <option>Midterm-1</option>
                        <option>Midterm-2</option>
                        <option>Quiz-2</option>
                        <option>Quiz-2</option>
                        <option>Final</option>
                        <option>Project</option>
                        <option>Presentation</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-text-muted-light text-base">
                        <IoIosArrowDown size={20} />
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5 pl-1">
                      Mark
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-12 px-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                        placeholder="e.g. 30"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <CustomDatePicker label="Date" />
                    {/* <label class="block text-xs font-medium text-text-muted-light mb-1.5">
                      Date
                    </label>
                    <div class="relative">
                      <input
                        class="w-full h-10 px-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark cursor-pointer"
                        type="date"
                      />
                    </div> */}
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5">
                      Upload or Link PDF
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          className="w-full h-12 pl-9 pr-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/60"
                          placeholder="e.g. https://example.com/book.pdf"
                          type="text"
                        />
                        <span className="material-symbols-outlined text-lg absolute left-3 top-2.5 text-text-muted-light">
                          <FiLink className="text-primary" />
                        </span>
                      </div>
                      <div className="relative w-12">
                        <button
                          className="flex h-12 w-12 items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                          title="Link URL"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-lg">
                            <RiSwap3Line size={24} className="text-primary" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div class="col-span-1">
                  <label class="block text-sm font-semibold text-text-muted-light mb-1.5">
                    Upload or Link PDF
                  </label>
                  <div class="flex gap-2">
                    <div class="relative flex-1">
                      <input class="hidden" id="book-pdf-1" type="file" />
                      <label
                        class="flex items-center justify-center gap-2 h-10 px-3 rounded-lg border border-dashed border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary cursor-pointer transition-colors w-full"
                        for="book-pdf-1"
                      >
                        <span class="material-symbols-outlined text-lg">
                          <MdOutlineUploadFile className="text-primary" />
                        </span>
                        <span class="text-sm truncate text-slate-500">Choose File</span>
                      </label>
                    </div>
                    <div class="relative w-10">
                      <button
                        class="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary transition-colors hover:cursor-pointer"
                        title="Link URL"
                        type="button"
                      >
                        <span class="material-symbols-outlined text-lg">
                          <RiSwap3Line className="text-primary" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* <div class="pt-4 border-t border-border-light dark:border-border-dark border-dashed">
                  <div class="flex gap-3">
                    <div class="relative flex-1">
                      <input class="hidden" id="assess-file-1" type="file" />
                      <label
                        class="flex items-center justify-center gap-2 h-10 px-3 rounded-lg border border-dashed border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary hover:bg-primary/5 cursor-pointer transition-all w-full group"
                        for="assess-file-1"
                      >
                        <span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                          upload_file
                        </span>
                        <span class="text-sm font-medium">
                          Upload Assessment PDF
                        </span>
                      </label>
                    </div>
                    <div class="relative w-12">
                      <button
                        class="flex items-center justify-center size-10 w-full rounded-lg border border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark text-text-muted-light hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                        title="Link URL"
                        type="button"
                      >
                        <span class="material-symbols-outlined text-lg">
                          link
                        </span>
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <button
            className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white dark:text-background-dark font-bold shadow-sm shadow-primary/30 transition-all transform active:scale-95 w-full flex items-center justify-center gap-2 cursor-pointer mt-3"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">
              <FaRegSave />
            </span>
            Save Course
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddCoursePage;
