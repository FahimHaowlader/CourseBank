import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';


import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { MdOutlinePersonSearch, MdRefresh, MdOutlinePersonOutline,MdDelete,MdDeleteOutline,MdOutlineDeleteSweep } from "react-icons/md";
import { BiHash } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsPersonCheck,BsExclamationCircleFill } from "react-icons/bs";
import { LiaIdCardSolid } from "react-icons/lia";
import axios from 'axios';
import CustomCourseCard from '../Components/CustomCourseCard';
import Department from '../Components/Department';
import { useAuth } from '../Contexts/Auth.Context.jsx';
import semesterTransformer from '../Components/semesterTransformer.jsx';
import PrivateApi from '../Hooks/PrivateApi.jsx';


import SkeletonCard from '../Components/SkeletonCard.jsx';
import Pagination from '../Components/Pagination.jsx';
import { Link } from 'react-router';

const AllCoursePage = () => {
  const {moderatorUserId} = useParams();
  console.log("Moderator User ID from URL:", moderatorUserId); // Debugging line to check URL parameter
  const {user} = useAuth(); // Assuming you have a useAuth hook for authentication context
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
    const [modal, setModal] = useState({
      openModal: false,
      id: null,
      title: "",
      status: "",
    });

const path = user?.role === "admin" ? "/admin/courses/add" : user?.role === "moderator" ?  "/moderators/" + user?.userId +"/courses/add" :"";
  const AppleSpinner = () => (
    <div className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-6 w-6 text-current" viewBox="0 0 24 24">
        <style>{`
          .spinner_blade { transform-origin: 12px 12px; animation: spinner_fade 1s linear infinite; }
          @keyframes spinner_fade { 0% { opacity: 1; } 100% { opacity: 0; } }
        `}</style>
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            className="spinner_blade"
            x="11"
            y="2"
            width="2"
            height="6"
            rx="1"
            style={{
              transform: `rotate(${i * 30}deg)`,
              animationDelay: `${(i - 12) * 0.083}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
// console.log("User in AllCoursePage:", user); // Debugging line to check user data
  // Consolidated Search/Filter State

  // Debugging line to check user role
  const [filters, setFilters] = useState({
    title: '',
    instructorName: '',
    createdBy: '',
    status: '',
    courseCode: '',
    department: '',
    degree: user.role === "moderator" ? user?.degree || '' : '',
    year: '',
    semester: user.role === "moderator" ?  user?.semester || '' : '',
    type: '',
    credits: '',
    format: ''
  });

    if (moderatorUserId) {
  // Mapping object for degree codes
  const degreeMap = {
    "01": "bachelors",
    "02": "masters",
    "03": "phd"
  };

  // 1. Extract the raw values using slice
  const degreeCode = moderatorUserId.slice(7, 9);
  const yearValue = moderatorUserId.slice(3, 7);
  const semesterValue = moderatorUserId.slice(9, 11);

  // 2. Assign to filters
  // Look up the degree name; default to "Unknown" or the code itself if not found
  filters.degree = degreeMap[degreeCode] || degreeCode || "";
  filters.semester = Number(semesterValue) || "";
}
  // console.log("Initial Filters State:", filters); // Debugging line to check initial filters state
      useEffect(() => {
    // 1. Try scrolling the window
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 2. Safety: Try scrolling the HTML element (for some mobile browsers)
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });

    // 3. Optional: If you have a specific container that scrolls, use:
    // document.getElementById('main-container').scrollTo({ top: 0 });
  }, [page]);
  // if (user) {
   const [sort, setSort] = useState({
    sortField: "staringDate",
    sortOrder: "desc",
  });


  const handleSortChange = (e) => {
    const value = e.target.value; // e.g., "year_desc"

    if (!value) {
      setSort({ sortField: "", sortOrder: "" });
      return;
    }

    const [field, order] = value.split("_");

    setSort({
      sortField: field,
      sortOrder: order,
    });
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterChangeIntoNumber = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? "" : isNaN(value) ? value : +value,
    }));
  };

  // Reset Filters
  const resetFilters = () => {
    if(user?.role === "admin"){
    setFilters({
      title: '', instructorName: '', createdBy: '',
      courseCode: '', department: '', degree: '', year: '',status: '',
      semester: '', type: '', credits: '', format: ''
    });
  } else {
    setFilters({
      title: '', instructorName: '', createdBy: '',
      courseCode: '', department: '', degree: user?.degree || '', year: '', status: '',
      semester: user?.semester || '', type: '', credits: '', format: ''
    });
  }
    setSort({
    sortField: "staringDate",
    sortOrder: "desc",
  });
    setPage(1);
  };

  // Fetch Logic
  const fetchCourses = async () => {
  const { createdBy } = filters;

  if (createdBy) {
    const isValidFormat = /^[A-Za-z]{3}\d{8}$/.test(createdBy);

    

    if (user?.role === 'moderator') {
      const inputSuffix = createdBy.slice(-8);
      const userSuffix = user?.userId?.toString().slice(-8);

      if (inputSuffix !== userSuffix) {
        setFilters(prev => ({ ...prev, createdBy: '' }));
        alert("As a moderator, you can do not have access to those contributors'courese.");
        return; // 2. CRITICAL: Stop the function here
      }
    }

    if (!isValidFormat) {
      // 1. Clear the state for the UI
      setFilters(prev => ({ ...prev, createdBy: '' }));
      alert("Enter a valid Contributor ID (e.g., USER-123)");
      return; // 2. CRITICAL: Stop the function here so the API isn't called
    }
  }

  setLoading(true);
  try {
    // We create a fresh object for the API to ensure 'createdBy' is handled
    const requestFilters = { ...filters };
    
    const response = await PrivateApi.post('/administrative-course-search', {
      parameters: requestFilters, // Using the local copy
        sort,
        page,
        limit: 12
      
    });
    // console.log('API Response:', response.data); // Debugging line to check API response structure
    setCourses(response.data.data.courses || []); 
    // console.log("Courses set in state:", response.data.courses || response.data); // Debugging line to check courses being set
    setTotalCourses(response.data.data.totalDocuments ); // Adjust based on actual response structure
  } catch (error) {
    // console.error('Error fetching courses:', error);
  } finally {
    setLoading(false);
  }
};

  // Trigger fetch on Search click or Page/Sort change
  useEffect(() => {
    fetchCourses();
  }, [page, sort,]);

  const generateYearRange = (start) => {
    const current = new Date().getFullYear();
    return Array.from({ length: current - start + 1 }, (_, i) => current - i);
  };
  const years = generateYearRange(2025);

   const cancelDeleteCourse = () => {
    setModal({ openModal: false, id: null, title: "", status: "" });
  };
  const doneDeleteCourse = (courseId, courseTitle) => {
    setModal({ openModal: false, id: null, title: "", status: "" });
     // Refresh the page to reflect the deleted course
  };

  const handleDeleteCourse = async (courseId) => {
    setModal((prev) => ({ ...prev, status: "loading" }));
    try {
      // throw new Error("Testing delete error handling"); // <-- Temporary line to test error modal
      await PrivateApi.delete(`/delete-course/${courseId}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId),
      );
      setModal((prev) => ({ ...prev, status: "success" }));
     fetchCourses();
    } catch (error) {
      setModal((prev) => ({ ...prev, status: "error" }));
      console.error(`Error deleting course:`, error);
    }
  };

  const retryDeleteCourse = (courseId) => {
    setModal((prev) => ({ ...prev, status: "confirm" }));
  };

  
console.log(filters);
  return (
    <div className="bg-white dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-3">
        <header className="mb-5">
          <div className='flex justify-between mb-1'>
            <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text bg-primary-dark dark:bg-primary tracking-tight font-extrabold">
              Explore Courses
            </h1>
            <Link to={path} className="flex cursor-pointer items-center gap-2 px-4 md:px-6 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95">
              <AiOutlinePlus />
              Add <span className='hidden sm:block'>Course</span>
            </Link>
          </div>
          <p className="mt-0.5 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-0.5">
            Search and explore courses by semester, teacher, and category to plan your academic journey.
          </p>
        </header>

        {/* Filters Section */}
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-4 mb-6">
            <label className="flex flex-col gap-1.5 w-full md:col-span-6">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Course Title</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary"><AiOutlineSearch size={20} /></span>
                <input
                  name="title"
                  value={filters.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Intro to Computer Science"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 w-full md:col-span-4">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Teacher Name</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary"><MdOutlinePersonSearch size={20} /></span>
                <input
                  name="instructorName"
                  value={filters.instructorName}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Sarah Jenkins"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 w-full md:col-span-5 xl:col-span-3">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">{user?.role === "admin" ? "Creater" : "Contributor"} Id</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary"><LiaIdCardSolid size={20} /></span>
                <input
                  name="createdBy"
                  value={filters.createdBy}
                  onChange={handleInputChange}
                  placeholder="e.g. CSE20220212"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>

            {/* <label className="flex flex-col gap-1.5 w-full md:col-span-3">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Moderator Id</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary"><LiaIdCardSolid size={20} /></span>
                <input
                  name="moderatorId"
                  value={filters.moderatorId}
                  onChange={handleInputChange}
                  placeholder="e.g. MOD-456"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label> */}

            <label className="flex flex-col gap-1.5 w-full md:col-span-5 xl:col-span-3">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Course Code</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary"><BiHash size={20} /></span>
                <input
                  name="courseCode"
                  value={filters.courseCode}
                  onChange={handleInputChange}
                  placeholder="CSE-101"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
                
              </div>
            </label>

            <div className="flex flex-col gap-1.5 w-full md:col-span-5 xl:col-span-2">
              {/* <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Department</span> */}
              <Department 
                value={filters.department} 
                onChange={handleInputChange} 
                defaultText={"All Departments"}
              />
            </div>
            {/* status Filter */}
              <label className="flex flex-col gap-1.5 w-full md:col-span-5 xl:col-span-2">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Status</span>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select 
                    name="status" value={filters.status} onChange={handleInputChange}
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none cursor-pointer text-sm outline-none"
                  >
                    <option value="">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    {/* ... other options */}
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                </div>
              </label>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-end">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full xl:flex-1">
              {/* Degree Filter */}
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Degree</span>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select 
                    name="degree" value={filters.degree} onChange={handleInputChange}
                    className={`w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none ${user?.role !== "admin" ? "cursor-not-allowed opacity-70":"cursor-pointer"} text-sm outline-none`}
                    disabled={user?.role !== "admin" }
                  >
                    <option value="">All Degrees</option>
                    <option value="bachelors">Bachelor</option>
                    <option value="masters">Master</option>
                    <option value="phd">PhD</option>
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                </div>
              </label>

             

              {/* Semester Filter */}
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Semester</span>
                   <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select 
                    name="semester" value={filters.semester} onChange={handleFilterChangeIntoNumber}
                    disabled={user?.role !== "admin" }
                    className={`w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none ${user?.role !== "admin" ? "cursor-not-allowed opacity-70":"cursor-pointer"} text-sm outline-none`}

                  >
                    <option value="">All Semesters</option>
                    <option value="11">First Year 1st Semester</option>
                    <option value="12">First Year 2nd Semester</option>
                    <option value="21">Second Year 1st Semester</option>
                    <option value="22">Second Year 2nd Semester</option>
                    <option value="31">Third Year 1st Semester</option>
                    <option value="32">Third Year 2nd Semester</option>
                    <option value="41">Fourth Year 1st Semester</option>
                    <option value="42">Fourth Year 2nd Semester</option>
                    <option value="51">Fifth Year 1st Semester</option>
                    <option value="52">Fifth Year 2nd Semester</option>
                    {/* ... other options */}
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                </div> 
               
              </label>


               {/* Year Filter */}
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Year</span>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select 
                    name="year" value={filters.year} onChange={handleFilterChangeIntoNumber}
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none cursor-pointer text-sm outline-none"
                  >
                    <option value="">All Years</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                </div>
              </label>

              {/* Type Filter */}
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Type</span>
                 <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select name="type" value={filters.type} onChange={handleInputChange} className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none text-sm outline-none cursor-pointer">
                    <option value="">All Types</option>
                    <option value="core">Core</option>
                    <option value="project">Project</option>
                    <option value="lab">Lab</option>
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                </div>
              </label>

               {/* Credit Filter */}
               <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Credit</span>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select name="credits" value={filters.credits} onChange={handleFilterChangeIntoNumber} className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none text-sm outline-none cursor-pointer">
                    <option value="">All Credits</option>
                    {[1, 2, 3, 4, 5, 6].map(c => <option key={c} value={c}>{c} Credits</option>)}
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                </div>
              </label>

              {/* Format Filter */}
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Format</span>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select name="format" value={filters.format} onChange={handleInputChange} className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none text-sm outline-none cursor-pointer">
                    <option value="">All Formats</option>
                    <option value="major">Major</option>
                    <option value="non-major">Non-Major</option>
                    <option value="elective">Elective</option>
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3 w-full xl:w-auto mt-2 xl:mt-0 xl:ml-auto">
              <button onClick={resetFilters} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 h-11 text-primary hover:bg-primary/5 rounded-lg transition-colors font-semibold active:scale-95 cursor-pointer">
                <MdRefresh size={20} /> Reset <span className='hidden sm:block'>Filters</span>
              </button>
              <button onClick={() => {setPage(1); fetchCourses();}} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-11 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors shadow-sm active:scale-95 cursor-pointer">
                <AiOutlineSearch size={20} /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Status bar */}
        {
          totalCourses > 0 && (

           
                <div className={`flex px-2 flex-col-reverse sm:flex-row justify-between items-center ${totalCourses ? "flex " :"invisible"} gap-4`}>
            <div className="text-sm md:text-base text-text-secondary dark:text-gray-400 self-start sm:self-center">
              Showing{" "}
              <span className="font-bold text-text-main dark:text-white">
                {(page - 1) * 12 + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-text-main dark:text-white">
                {totalCourses < page * 12 ? totalCourses : page * 12}
              </span>{" "}
              courses of{" "}
              <span className="font-bold text-text-main dark:text-white">
              {totalCourses} courses
              </span>
            </div>
             {/* <div className="flex px-2 flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-sm md:text-base text-text-secondary dark:text-gray-400 self-start sm:self-center">
            Showing <span className="font-bold text-text-main dark:text-white">{courses.length > 0 ? (page - 1) * 12 + 1 : 0}</span> to <span className="font-bold text-text-main dark:text-white">{Math.min(page * 12, totalCourses)}</span> of <span className="font-bold text-text-main dark:text-white">{totalCourses}</span> courses
          </div> */}
          
          <div className="flex items-center gap-2 ml-auto sm:ml-0 ">
            <span className="hidden sm:inline text-sm font-medium text-text-secondary dark:text-gray-400 whitespace-nowrap">Sort by:</span>
            <div className="relative">
              <select 
                value={
                      sort.sortField
                        ? `${sort.sortField}_${sort.sortOrder}`
                        : ""
                    } onChange={handleSortChange}
                className="pl-3 pr-10 py-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm font-medium text-text-main dark:text-white focus:border-primary outline-none appearance-none"
              >
                <option value="title_asc">Course Title (A-Z)</option>
                <option value="title_desc">Course Title (Z-A)</option>
                <option value="staringDate_desc">Newest First</option>
                <option value="staringDate_asc">Oldest First</option>
                <option value="credits_desc">Credit (High to Low)</option>
                <option value="credits_asc">Credit (Low to High)</option>
              </select>
              <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
            </div>
          </div>
        </div>
        
          )
            
        }
       

        {/* Courses Grid */}


        
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${totalCourses ? "mt-5":'mt-16'}`}>
          {loading && (
            <>
              <div>
                <SkeletonCard />
              </div>
              <div>
                <SkeletonCard />
              </div>
              <div>
                <SkeletonCard />
              </div>
              <div>
                <SkeletonCard />
              </div>
              <div>
                <SkeletonCard />
              </div>
              <div>
                <SkeletonCard />
              </div>
              <div className="hidden xl:block">
                <SkeletonCard />
              </div>
              <div className="hidden xl:block">
                <SkeletonCard />
              </div>
              <div className="hidden xl:block">
                <SkeletonCard />
              </div>
              <div className="hidden lg:block">
                <SkeletonCard />
              </div>
              <div className="hidden lg:block">
                <SkeletonCard />
              </div>
              <div className="hidden lg:block">
                <SkeletonCard />
              </div>
            </>
          )}

          {!loading && courses && courses.length > 0
            ? courses.map((course) => (
                <CustomCourseCard key={course._id} Course={course} setModal={setModal}/>
              ))
            : !loading && (
            <div className="col-span-full py-16 text-center bg-card-light dark:bg-card-dark rounded-xl border border-dashed border-border-light dark:border-border-dark">
              <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">No courses found</h3>
              <p className="text-text-secondary dark:text-gray-400">  We couldn't find any courses matching your filters. Try adjusting your search criteria.</p>
              <button onClick={resetFilters} className="mt-5 text-primary font-semibold hover:underline cursor-pointer">Clear all filters</button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalCourses > 12 && (
          // <div className="flex flex-1 items-center justify-center md:justify-end mt-8">
          //   <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          //     <button 
          //       disabled={page === 1}
          //       onClick={() => setPage(p => Math.max(1, p - 1))}
          //       className="px-2 py-2 text-text-secondary border border-border-light dark:border-border-dark rounded-l-md hover:bg-primary/10 disabled:opacity-50"
          //     >
          //       <IoIosArrowBack size={20} />
          //     </button>
              
          //     {[...Array(Math.ceil(totalCourses / 12))].map((_, i) => (
          //       <button
          //         key={i + 1}
          //         onClick={() => setPage(i + 1)}
          //         className={`px-4 py-2 text-sm font-semibold border border-border-light dark:border-border-dark ${page === i + 1 ? 'bg-primary text-white' : 'text-text-secondary hover:bg-primary/10'}`}
          //       >
          //         {i + 1}
          //       </button>
          //     ))}

          //     <button 
          //       disabled={page >= Math.ceil(totalCourses / 12)}
          //       onClick={() => setPage(p => p + 1)}
          //       className="px-2 py-2 text-text-secondary border border-border-light dark:border-border-dark rounded-r-md hover:bg-primary/10 disabled:opacity-50"
          //     >
          //       <IoIosArrowForward size={20} />
          //     </button>
          //   </nav>
          // </div>
          <Pagination 
            page={page} 
            setPage={setPage} 
            totalDocs={totalCourses} 
          />
        )}
      </main>

      {/* 1. DELETE CONFIRMATION / LOADING MODAL */}
      {modal.openModal &&
                (modal.status === "confirm" || modal.status === "loading") && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                      className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
                      onClick={modal.status !== "loading" ? cancelDeleteCourse : null}
                    ></div>
                    <div className="relative w-full max-w-3xl transform rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl border border-border-light dark:border-border-dark">
                      <div className="flex flex-col items-center gap-8 text-center">
                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500">
                          <MdDelete size={56} />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-4xl font-bold text-text-main dark:text-white">
                            Delete Course?
                          </h3>
                          <p className="text-xl text-text-secondary dark:text-gray-400">
                            Are you sure you want to delete{" "}
                            <span className="font-bold text-text-main dark:text-white">
                              {modal.title} course
                            </span>
                            ?
                          </p>
                        </div>
                        <div className="flex w-full gap-6 mt-8">
                          <button
                            disabled={modal.status === "loading"}
                            className="flex-1 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
                            onClick={cancelDeleteCourse}
                          >
                            Cancel
                          </button>
                          <button
                            disabled={modal.status === "loading"}
                            className="flex-1 py-4 rounded-xl bg-red-500 text-white text-lg font-semibold hover:bg-red-600 disabled:bg-red-400 shadow-sm flex justify-center items-center transition-all active:scale-95 cursor-pointer"
                            onClick={() => handleDeleteCourse(modal.id)}
                          >
                            {modal.status === "loading" ? (
                              <AppleSpinner />
                            ) : (
                              <span className="flex justify-center items-center gap-2">
                                <MdDeleteOutline size={26} /> Delete
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                 {/* 2. SUCCESS MODAL */}
                          {modal.openModal && modal.status === "success" && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"></div>
                    
                    {/* Modal Card */}
                    <div className="relative w-full max-w-3xl transform rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark transition-all">
                      <div className="flex flex-col items-center gap-6 sm:gap-8">
                        
                        {/* Icon: Rose Theme for Delete Success */}
                        <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500">
                          <MdOutlineDeleteSweep className="text-[40px] sm:text-[56px]" />
                        </div>
                
                        {/* Text Content */}
                        <div className="space-y-4 text-center">
                          <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white font-display">
                            Successfully Deleted!
                          </h3>
                          <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed font-body">
                            The course has been <span className="text-rose-600 font-bold uppercase">permanently removed</span> from the system. This action has been successfully logged.
                          </p>
                        </div>
                
                        {/* Action Button: Styled as the "Delete" primary action */}
                        <button 
                          className="w-full mt-4 py-3 sm:py-4 rounded-xl bg-rose-600 text-white text-lg sm:text-xl font-semibold hover:bg-rose-700 shadow-lg shadow-rose-600/20 transition-all active:scale-95 cursor-pointer font-display" 
                          onClick={doneDeleteCourse}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                    
                        {/* 3. DELETION ERROR MODAL */}
                        {modal.openModal && modal.status === "error" && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
                            <div className="relative w-full max-w-3xl transform rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark">
                              <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 mb-8">
                                <BsExclamationCircleFill size={56} />
                              </div>
                              <div className="space-y-4 mb-8">
                                <h3 className="text-4xl font-bold text-text-main dark:text-white">
                                  Deletion Failed
                                </h3>
                                <p className="text-xl text-text-secondary dark:text-gray-400">
                                  We encountered an issue while trying to delete{" "}
                                  <span className="font-bold text-text-main dark:text-white">
                                    {" "}
                                    {modal.title}
                                  </span>
                                  . Please try again.
                                </p>
                              </div>
                              <div className="flex w-full gap-6 mt-8">
                                <button
                                  className="flex-1 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                                  onClick={cancelDeleteCourse}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="flex-1 py-4 rounded-xl bg-orange-500 text-white text-lg font-semibold hover:bg-orange-600 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                                  onClick={() => retryDeleteCourse(modal.id)}
                                >
                                  <MdRefresh size={24} /> Retry
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
    </div>
  );
};

export default AllCoursePage;