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
import { useState, useEffect } from "react";
import axios from "axios";

import CourseCard from "../Components/CourseCard";
import Pagination from "../Components/Pagination";
import SkeletonCard from "../Components/SkeletonCard";
import Department from "../Components/Department";
import PublicApi from "../Hooks/PublicApi";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [sort, setSort] = useState({
    sortField: "staringDate",
    sortOrder: "desc",
  });
  const [filters, setFilters] = useState({
    title: "",
    instructorName: "",
    courseCode: "",
    department: "",
    degree: "",
    year: "",
    semester: "",
    type: "",
    credits: "",
    format: "",
  });
  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
    setSort({
      sortField: "",
      sortOrder: "",
    });

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await PublicApi.post(
          "/users-all-course",
          { parameters: filters },
        );

        // Look at your log: response.data.data.courses is where the array lives
        if (response.data && response.data.data && response.data.data.courses) {
          setCourses(response.data.data.courses);
          setTotalDocs(response.data.data?.totalDocuments || 0);
        } else {
          setCourses([]); // Fallback to empty array if structure is wrong
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
        
      }
    };
    fetchCourses();
   
  };
  const clearFilters = () => {
    setFilters({
      title: "",
      instructorName: "",
      courseCode: "",
      department: "",
      degree: "",
      year: "",
      semester: "",
      type: "",
      credits: "",
      format: "",
    });
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await PublicApi.post(
          "/users-all-course",
          { parameters: {} },
        );

        // Look at your log: response.data.data.courses is where the array lives
        if (response.data && response.data.data && response.data.data.courses) {
          setCourses(response.data.data.courses);
          setTotalDocs(response.data.data?.totalDocuments || totalDocs);
        } else {
          setCourses([]); // Fallback to empty array if structure is wrong
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
    setPage(1);
    setSort({
    sortField: "staringDate",
    sortOrder: "desc",
  });
  };

  useEffect(() => {
    // 1. Try scrolling the window
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 2. Safety: Try scrolling the HTML element (for some mobile browsers)
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });

    // 3. Optional: If you have a specific container that scrolls, use:
    // document.getElementById('main-container').scrollTo({ top: 0 });
  }, [page]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await PublicApi.post(
          "/users-all-course",
          { parameters: filters, sort, page },
        );
        //  // console.log("Sorting Response:", filters); // Check the structure of the response
        // Look at your log: response.data.data.courses is where the array lives
        if (response.data && response.data.data && response.data.data.courses) {
          setCourses(response.data.data.courses);
          //  // console.log(response.data.data);
          setTotalDocs(response.data.data?.totalDocuments || totalDocs);
        } else {
          setCourses([]); // Fallback to empty array if structure is wrong
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [page]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setPage(1); // Reset to first page when sort changes
        const response = await PublicApi.post(
          "/users-all-course",
          { parameters: filters, sort,page},
        );
        
        // Look at your log: response.data.data.courses is where the array lives
        if (response.data && response.data.data && response.data.data.courses) {
          setCourses(response.data.data.courses);
          //  // console.log(response.data.data);
          setTotalDocs(response.data.data?.totalDocuments || totalDocs);
        } else {
          setCourses([]); // Fallback to empty array if structure is wrong
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [sort]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value, // value will be "bachelors", "masters", etc.
    }));
  };
  const handleFilterChangeIntoNumber = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? "" : isNaN(value) ? value : +value,
    }));
  };
  const generateYearRange = (start) => {
    const current = new Date().getFullYear();
    return Array.from({ length: current - start + 1 }, (_, i) => current - i);
  };
  const years = generateYearRange(2025);
  const handleSortChange = (e) => {
    const value = e.target.value; // e.g., "year_desc"

    if (!value) {
      setSort({
    sortField: "staringDate",
    sortOrder: "desc",
    });
      return;
    }

    const [field, order] = value.split("_");

    setSort({
      sortField: field,
      sortOrder: order,
    });
  };

  //  // console.log(totalDocs);
  //  // console.log(page);
  //  // console.log(filters);
  //  // console.log(courses);
  return (
    <div className="bg-white dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-3">
        <header className="mb-5">
          <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text  bg-primary-dark dark:bg-primary tracking-tight  font-extrabold">
            Course Bank
          </h1>
          <p className="mt-0.5 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-1.5">
            Search and explore courses by semester, teacher, and format to
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
                  value={filters.title}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      title: e.target.value.toLowerCase(),
                    })
                  }
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
                  value={filters.instructorName}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      instructorName: e.target.value.toLowerCase(),
                    })
                  }
                  type="text"
                  placeholder="e.g. Dr. Sarah Jenkins"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1.5 w-full md:col-span-3">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                Course Code
              </span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg uppercase">
                <span className="absolute left-3 text-text-secondary material-symbols-outlined text-[20px]">
                  <BiHash />
                </span>
                <input
                  value={filters.courseCode}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      courseCode: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="ABCD-1234-EFGH-5678"
                  type="text"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>
            <Department value={filters.department} onChange={handleFilterChange} defaultText={"All Departments"} />
            {/* <label className="flex flex-col gap-1.5 w-full md:col-span-2">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                Department
              </span>
              <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                <select
                  className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
                  name="department"
                  value={filters.department}
                  onChange={handleFilterChange}
                >
                  <option value="">All Departments</option>
                  <option value="arc">Architecture</option>
                  <option value="cep">
                    Chemical Engineering & Polymer Science
                  </option>
                  <option value="cee">Civil & Environmental Engineering</option>
                  <option value="cse">Computer Science & Engineering</option>
                  <option value="eee">
                    Electrical & Electronic Engineering
                  </option>
                  <option value="fet">Food Engineering & Tea Technology</option>
                  <option value="ipe">
                    Industrial & Production Engineering
                  </option>
                  <option value="mee">Mechanical Engineering</option>
                  <option value="pme">Petroleum & Mining Engineering</option>
                  <option value="swe">Software Engineering</option>

                  <option value="che">Chemistry</option>
                  <option value="gee">Geography and Environment</option>
                  <option value="mat">Mathematics</option>
                  <option value="ocg">Oceanography</option>
                  <option value="phy">Physics</option>
                  <option value="sta">Statistics</option>

                  <option value="bmb">
                    Biochemistry and Molecular Biology
                  </option>
                  <option value="fes">
                    Forestry and Environmental Science
                  </option>
                  <option value="geb">
                    Genetic Engineering and Biotechnology
                  </option>

                  <option value="anp">Anthropology</option>
                  <option value="bng">Bangla</option>
                  <option value="eco">Economics</option>
                  <option value="eng">English</option>
                  <option value="pss">Political Studies</option>
                  <option value="pad">Public Administration</option>
                  <option value="scw">Social Work</option>
                  <option value="soc">Sociology</option>

                  <option value="ban">Business Administration</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                  <IoIosArrowDown />
                </span>
              </div>
            </label> */}
          </div>
          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-end">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full xl:flex-1">
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Degree
                </span>
                <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
                    name="degree"
                    value={filters.degree}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Degrees</option>
                    <option value="bachelors">Bachelor</option>
                    <option value="masters">Master</option>
                    <option value="phd">PhD</option>
                    
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
                  <select
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChangeIntoNumber}
                  >
                   <option value="">All Years</option>
{years.map((year) => (
  <option key={year} value={(year)}>
    {year}
  </option>
))}
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
                  <select
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
                    name="semester"
                    value={filters.semester}
                    onChange={handleFilterChangeIntoNumber}
                  >
                    <option value="">All Semesters</option>
                    <option value="11">Frist Year 1est Semester</option>
                    <option value="12">Frist Year 2nd Semester</option>
                    <option value="21">Second Year 1est Semester</option>
                    <option value="22">Second Year 2nd Semester</option>
                    <option value="31">Third Year 1est Semester</option>
                    <option value="32">Third Year 2nd Semester</option>
                    <option value="41">Fourth Year 1est Semester</option>
                    <option value="42">Fourth Year 2nd Semester</option>
                    <option value="51">Fifth Year 1est Semester</option>
                    <option value="52">Fifth Year 2nd Semester</option>
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
                  <select
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value={"core"}>Core</option>
                    <option value="project">Project</option>
                    <option value="lab">Lab</option>
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
                  <select
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
                    name="credits"
                    value={filters.credits}
                    onChange={handleFilterChangeIntoNumber}
                  >
                    <option value="">All Credits</option>
                    <option value="1">1 Credits</option>
                    <option value="2">2 Credits</option>
                    <option value="3">3 Credits</option>
                    <option value="4">4 Credits</option>
                    <option value="5">5 Credits</option>
                    <option value="6">6 Credits</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                    <IoIosArrowDown />
                  </span>
                </div>
              </label>
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Format
                </span>
                <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
                    name="format"
                    value={filters.format}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    <option value="major">Major</option>
                    <option value="non-major">Non-Major</option>
                    <option value="elective">Elective</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                    <IoIosArrowDown />
                  </span>
                </div>
              </label>
            </div>
            <div className="flex items-center gap-3 w-full xl:w-auto mt-2 xl:mt-0 xl:ml-auto">
              <button
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 h-11 text-primary hover:bg-primary/5 rounded-lg transition-colors order-first hover:cursor-pointer active:text-primary-dark font-semibold active:scale-95 "
                onClick={clearFilters}
              >
                <span className="material-symbols-outlined  text-[20px] font-semibold">
                  <MdRefresh />
                </span>
                Reset
                <span className="hidden md:block"> Filters</span>
              </button>
              <button
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-11 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors shadow-sm shadow-primary/30 hover:cursor-pointer active:bg-primary-dark active:scale-95 "
                name="searchButton"
                onClick={handleSearch}
              >
                <span className="material-symbols-outlined text-[20px] font-semibold">
                  <AiOutlineSearch />
                </span>
                Search
              </button>
            </div>
          </div>
        </div>
        {totalDocs > 0 && (
          <div className="flex px-2 flex-col-reverse sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-sm md:text-base text-text-secondary dark:text-gray-400 self-start sm:self-center">
              Showing{" "}
              <span className="font-bold text-text-main dark:text-white">
                {(page - 1) * 12 + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-text-main dark:text-white">
                {totalDocs < page * 12 ? totalDocs : page * 12}
              </span>{" "}
              courses of{" "}
              <span className="font-bold text-text-main dark:text-white">
              {totalDocs} courses
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <span className="hidden sm:inline text-sm font-medium text-text-secondary dark:text-gray-400 whitespace-nowrap">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    className="pl-3 pr-10 py-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm font-medium text-text-main dark:text-white focus:border-primary outline-none appearance-none cursor-pointer shadow-sm hover:shadow transition-shadow"
                    value={
                      sort.sortField
                        ? `${sort.sortField}_${sort.sortOrder}`
                        : ""
                    }
                    onChange={handleSortChange}
                  >
                    <option value={"title_asc"}>Course Title (A-Z)</option>
                   
                    <option value={"title_desc"}>Course Title (Z-A)</option>
                    <option value={"professor_asc"}>
                      Professor Name (A-Z)
                    </option>
                    <option value={"professor_desc"}>
                      Professor Name (Z-A)
                    </option>
                    <option value={"staringDate_desc"}>Newest First</option>
                    <option value={"staringDate_asc"}>Oldest First</option>
                    <option value={"credits_desc"}>Credit (High to Low)</option>
                    <option value={"credits_asc"}>Credit (Low to High)</option>
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
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                <CourseCard key={course._id} Course={course} />
              ))
            : !loading && (
                // <p className="col-span-full text-center py-10 text-gray-500 pt-28">
                //   No courses available.
                // </p>
                <div className="mt-12 flex flex-col items-center justify-center py-16 text-center col-span-4 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark border-dashed">
                  {/* <div className="size-16 rounded-full bg-white dark:bg-background-dark flex items-center justify-center mb-4 text-text-secondary">
            <span className="material-symbols-outlined text-4xl">search_off</span>
          </div> */}
                  <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                    No courses found
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400 px-5 ">
                    We couldn't find any courses matching your filters. Try
                    adjusting your search criteria.
                  </p>
                  <button
                    className="mt-5 text-primary font-semibold hover:underline hover:cursor-pointer"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
        </div>
        
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
          {/* <div className="flex flex-1 items-center justify-center  ">
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
          </div> */}
          <Pagination page={page} setPage={setPage} totalDocs={totalDocs} />
       
        {/* <div className="hidden mt-12  flex-col items-center justify-center py-16 text-center bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark border-dashed">
          {/* <div className="size-16 rounded-full bg-white dark:bg-background-dark flex items-center justify-center mb-4 text-text-secondary">
            <span className="material-symbols-outlined text-4xl">search_off</span>
          </div> 
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
        </div> */}
      </main>
    
    </div>
  );
};

export default CoursePage;
