import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { MdOutlinePersonSearch, MdRefresh, MdOutlinePersonOutline } from "react-icons/md";
import { BiHash } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsPersonCheck } from "react-icons/bs";
import { LiaIdCardSolid } from "react-icons/lia";
import axios from 'axios';
import CustomCourseCard from '../Components/CustomCourseCard';
import Department from '../Components/Department';

const AllCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);

  // Consolidated Search/Filter State
  const [filters, setFilters] = useState({
    title: '',
    teacher: '',
    contributorId: '',
    moderatorId: '',
    courseId: '',
    department: '',
    degree: '',
    year: '',
    semester: '',
    type: '',
    credit: '',
    format: ''
  });

  const [sort, setSort] = useState("staringDate_desc");

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      title: '', teacher: '', contributorId: '', moderatorId: '',
      courseId: '', department: '', degree: '', year: '',
      semester: '', type: '', credit: '', format: ''
    });
    setSort("staringDate_desc");
    setPage(1);
  };

  // Fetch Logic
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://coursebank.onrender.com/api/v1/users-all-course', {
        parameters: {
          ...filters,
          sort,
          page,
          limit: 12
        }
      });
      // Adjust based on your actual API response structure
      setCourses(response.data.courses || response.data); 
      setTotalCourses(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch on Search click or Page/Sort change
  useEffect(() => {
    fetchCourses();
  }, [page, sort]);

  const generateYearRange = (start) => {
    const current = new Date().getFullYear();
    return Array.from({ length: current - start + 1 }, (_, i) => current - i);
  };
  const years = generateYearRange(2025);

  return (
    <div className="bg-white dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
        <header className="mb-5">
          <div className='flex justify-between mb-1'>
            <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text bg-primary-dark dark:bg-primary tracking-tight font-extrabold">
              Explore Courses
            </h1>
            <button className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95">
              <AiOutlinePlus />
              Add Course
            </button>
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
                  name="teacher"
                  value={filters.teacher}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Sarah Jenkins"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 w-full md:col-span-3">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Contributor Id</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary"><BsPersonCheck size={20} /></span>
                <input
                  name="contributorId"
                  value={filters.contributorId}
                  onChange={handleInputChange}
                  placeholder="e.g. USER-123"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 w-full md:col-span-3">
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
            </label>

            <label className="flex flex-col gap-1.5 w-full md:col-span-2">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Course ID</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary"><BiHash size={20} /></span>
                <input
                  name="courseId"
                  value={filters.courseId}
                  onChange={handleInputChange}
                  placeholder="CSE-101"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
                
              </div>
            </label>

            <div className="flex flex-col gap-1.5 w-full md:col-span-2">
              {/* <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Department</span> */}
              <Department 
                value={filters.department} 
                onChange={(val) => setFilters(prev => ({...prev, department: val}))} 
                defaultText={"All Departments"}
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-end">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full xl:flex-1">
              {/* Degree Filter */}
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Degree</span>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select 
                    name="degree" value={filters.degree} onChange={handleInputChange}
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none cursor-pointer text-sm outline-none"
                  >
                    <option value="">All Degrees</option>
                    <option value="bachelors">Bachelor</option>
                    <option value="masters">Master</option>
                    <option value="phd">PhD</option>
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                </div>
              </label>

              {/* Year Filter */}
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Year</span>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select 
                    name="year" value={filters.year} onChange={handleInputChange}
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none cursor-pointer text-sm outline-none"
                  >
                    <option value="">All Years</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                </div>
              </label>

              {/* Semester Filter */}
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Semester</span>
                  <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                  <select 
                    name="semester" value={filters.semester} onChange={handleInputChange}
                    className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none cursor-pointer text-sm outline-none"
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
                    {/* ... other options */}
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
                  <select name="credit" value={filters.credit} onChange={handleInputChange} className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark appearance-none text-sm outline-none cursor-pointer">
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
                <MdRefresh size={20} /> Reset Filters
              </button>
              <button onClick={() => {setPage(1); fetchCourses();}} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-11 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors shadow-sm active:scale-95 cursor-pointer">
                <AiOutlineSearch size={20} /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex px-2 flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-sm md:text-base text-text-secondary dark:text-gray-400 self-start sm:self-center">
            Showing <span className="font-bold text-text-main dark:text-white">{courses.length > 0 ? (page - 1) * 12 + 1 : 0}</span> to <span className="font-bold text-text-main dark:text-white">{Math.min(page * 12, totalCourses)}</span> of <span className="font-bold text-text-main dark:text-white">{totalCourses}</span> courses
          </div>
          
          <div className="flex items-center gap-2 ml-auto sm:ml-0">
            <span className="hidden sm:inline text-sm font-medium text-text-secondary dark:text-gray-400 whitespace-nowrap">Sort by:</span>
            <div className="relative">
              <select 
                value={sort} onChange={(e) => setSort(e.target.value)}
                className="pl-3 pr-10 py-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm font-medium text-text-main dark:text-white focus:border-primary outline-none appearance-none"
              >
                <option value="title_asc">Course Title (A-Z)</option>
                <option value="title_desc">Course Title (Z-A)</option>
                <option value="staringDate_desc">Newest First</option>
                <option value="staringDate_asc">Oldest First</option>
                <option value="credits_desc">Credit (High to Low)</option>
              </select>
              <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center">Loading courses...</div>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <CustomCourseCard key={course._id || course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-card-light dark:bg-card-dark rounded-xl border border-dashed border-border-light dark:border-border-dark">
              <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">No courses found</h3>
              <p className="text-text-secondary dark:text-gray-400">Try adjusting your search criteria.</p>
              <button onClick={resetFilters} className="mt-5 text-primary font-semibold hover:underline">Clear all filters</button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalCourses > 12 && (
          <div className="flex flex-1 items-center justify-center md:justify-end mt-8">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2 py-2 text-text-secondary border border-border-light dark:border-border-dark rounded-l-md hover:bg-primary/10 disabled:opacity-50"
              >
                <IoIosArrowBack size={20} />
              </button>
              
              {[...Array(Math.ceil(totalCourses / 12))].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 text-sm font-semibold border border-border-light dark:border-border-dark ${page === i + 1 ? 'bg-primary text-white' : 'text-text-secondary hover:bg-primary/10'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                disabled={page >= Math.ceil(totalCourses / 12)}
                onClick={() => setPage(p => p + 1)}
                className="px-2 py-2 text-text-secondary border border-border-light dark:border-border-dark rounded-r-md hover:bg-primary/10 disabled:opacity-50"
              >
                <IoIosArrowForward size={20} />
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllCoursePage;