import React, { useState } from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { LiaIdCardSolid } from "react-icons/lia";
import Department from "../Components/Department";
import GmailTableWithSort from "../Components/SelectAbleTable";

const AllContributorPage = () => {
  // 1. State Management for all filters
  const [filters, setFilters] = useState({
    contributorId: "", // Updated from moderatorId
    semester: "",
    degree: "",
    year: "",
    status: "",
    access: "",
    department: ""
  });

  const generateYearRange = (start) => {
    const current = new Date().getFullYear();
    return Array.from({ length: current - start + 1 }, (_, i) => current - i);
  };
  const years = generateYearRange(2025);

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Search Action
  const handleSearch = () => {
    console.log("Searching for Contributor Data:", filters);
    // Logic for API call goes here
  };

  // 4. Reset Action
  const handleReset = () => {
    setFilters({
      contributorId: "",
      semester: "",
      degree: "",
      year: "",
      status: "",
      access: "",
      department: ""
    });
  };

  return (
    <div className="bg-white dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
        <header className="mb-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-1">
            <h1 className="text-2xl md:text-4xl text-transparent bg-clip-text bg-primary-dark dark:bg-primary tracking-tight font-extrabold">
              Search and Explore Contributors
            </h1>
          </div>
          <p className="mt-0.5 text-base md:text-lg text-secondary-text dark:text-gray-400 max-w-4xl pl-0.5">
            Filter contributors by ID, department, status, and access to manage scholarly input.
          </p>
        </header>

        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4 md:p-6 mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-24 gap-4 items-end">
            
            {/* Contributor ID - UPDATED */}
            <label className="flex flex-col gap-1.5 w-full sm:col-span-2 md:col-span-24 xl:col-span-8">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                Contributor Id
              </span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary text-[20px]">
                  <LiaIdCardSolid />
                </span>
                <input
                  type="text"
                  name="contributorId"
                  value={filters.contributorId}
                  onChange={handleChange}
                  placeholder="e.g. CON-2026-001"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border-0 focus:ring-2 focus:ring-primary focus:outline-none text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                />
              </div>
            </label>

            {/* Semester */}
            <label className="flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-12 xl:col-span-6">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Semester</span>
              <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                <select 
                  name="semester" 
                  value={filters.semester} 
                  onChange={handleChange}
                  className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
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
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown /></span>
              </div>
            </label>

            {/* Degree */}
            <label className="flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-12 xl:col-span-5">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Degree</span>
              <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                <select name="degree" value={filters.degree} onChange={handleChange} className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                  <option value="">All Degrees</option>
                  <option value="bachelors">Bachelor</option>
                  <option value="masters">Master</option>
                  <option value="phd">PhD</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown /></span>
              </div>
            </label>

            {/* Year */}
            <label className="flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-8 xl:col-span-5">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Year</span>
              <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                <select name="year" value={filters.year} onChange={handleChange} className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                  <option value="">All Years</option>
                  {years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown /></span>
              </div>
            </label>

            {/* Department */}
            <div className="flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-16 xl:col-span-6">
              <Department defaultText={"All Departments"} value={filters.department} onChange={handleChange} />
            </div>

            {/* Status */}
            <label className="flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-12 xl:col-span-4">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Status</span>
              <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
                <select name="status" value={filters.status} onChange={handleChange} className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown /></span>
              </div>
            </label>

            {/* Access */}
            <label className="flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-12 xl:col-span-4">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Access</span>
              <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors bg-white dark:bg-background-dark">
                <select name="access" value={filters.access} onChange={handleChange} className="w-full h-11 pl-4 pr-10 rounded-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer text-text-primary dark:text-gray-200">
                  <option value="">All Access</option>
                  <option value="allow">Allow</option>
                  <option value="deny">Deny</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown /></span>
              </div>
            </label>

            {/* Action Buttons Container */}
            <div className="col-span-1 sm:col-span-2 md:col-span-12 xl:col-span-10 mt-4 md:mt-auto">
              <div className="flex flex-col sm:flex-row items-center justify-start xl:justify-end gap-3 w-full sm:h-11">
                
                {/* Reset Button */}
                <button 
                  onClick={handleReset}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-11 text-primary hover:bg-primary/5 rounded-lg transition-colors font-semibold active:scale-95 py-2 order-1 cursor-pointer"
                >
                  <MdRefresh className="text-[20px]" />
                  <span className="whitespace-nowrap">Reset Filters</span>
                </button>

                {/* Search Button */}
                <button 
                  onClick={handleSearch}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-8 h-11 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-all shadow-sm shadow-primary/30 active:scale-95 order-2 cursor-pointer"
                >
                  <AiOutlineSearch className="text-[20px]" />
                  <span className="whitespace-nowrap">Search</span>
                </button>

                {/* New Contributor Button */}
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-6 h-11 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-all shadow-sm shadow-primary/30 active:scale-95 order-3 cursor-pointer">
                  <AiOutlinePlus className="text-[20px]" />
                  <span className="whitespace-nowrap">New Contributor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <div className="w-full mt-8 rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm">
  {/* Header: Hidden on mobile, Flex on sm+ *
  <div className="hidden sm:flex items-center justify-between bg-primary text-white font-semibold text-sm md:text-base">
    <div className="p-4 w-1/4 min-w-[120px]">Contributor ID</div>
    <div className="p-4 w-1/4 text-center">Password</div>
    <div className="p-4 w-1/4 text-center">Access</div>
    <div className="p-4 w-1/4 lg:w-1/3 text-right pr-8">Status</div>
  </div>

  {/* Table Body / Content *
  <div className="bg-white dark:bg-card-dark divide-y divide-border-light dark:divide-border-dark">
    
    {/* Example Row: Repeated for each contributor *
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
      
      {/* Contributor ID *
      <div className="p-0 sm:p-4 w-full sm:w-1/4 flex justify-between sm:block">
        <span className="sm:hidden text-xs font-bold uppercase text-text-secondary dark:text-gray-500">ID:</span>
        <span className="font-mono text-sm font-medium text-primary dark:text-primary-light">CON-2026-001</span>
      </div>

      {/* Password *
      <div className="p-0 sm:p-4 w-full sm:w-1/4 flex justify-between sm:text-center mt-2 sm:mt-0">
        <span className="sm:hidden text-xs font-bold uppercase text-text-secondary dark:text-gray-500">Pass:</span>
        <span className="text-sm dark:text-gray-300">********</span>
      </div>

      {/* Access *
      <div className="p-0 sm:p-4 w-full sm:w-1/4 flex justify-between sm:text-center mt-2 sm:mt-0">
        <span className="sm:hidden text-xs font-bold uppercase text-text-secondary dark:text-gray-500">Access:</span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Allow
        </span>
      </div>

      {/* Status *
      <div className="p-0 sm:p-4 w-full sm:w-1/4 lg:w-1/3 flex justify-between sm:justify-end sm:pr-8 mt-2 sm:mt-0">
        <span className="sm:hidden text-xs font-bold uppercase text-text-secondary dark:text-gray-500">Status:</span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-text-main dark:text-gray-200">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
          Pending Review
        </span>
      </div>

    </div>

  </div>
</div> */}

{/* --- Start of Contributor Card/Table --- */}
<div className="w-full mt-8 md:rounded-xl md:border border-border-light dark:border-border-dark overflow-hidden md:shadow-sm">
  
  {/* DESKTOP HEADER (Hidden on Mobile) */}
  <div className="hidden md:grid grid-cols-24 bg-primary text-white font-bold text-sm uppercase tracking-wider">
    <div className="p-4 col-span-6 pl-8">Contributor ID</div>
    <div className="p-4 col-span-6 text-center">Password</div>
    <div className="p-4 col-span-4 text-center">Access</div>
    <div className="p-4 col-span-8 text-center">Status</div>
  </div>

  {/* CARD CONTAINER / TABLE BODY */}
  <div className="flex flex-col gap-4 md:gap-0 bg-transparent md:bg-white dark:md:bg-card-dark md:divide-y md:divide-border-light dark:md:divide-border-dark">
    
    {/* Map through your data here */}
    {[
      { id: "CON-2026-001", pass: "mevfghfggfg", access: "allow", status: "approved" },
      { id: "CON-2026-002", pass: "admin12345", access: "deny", status: "pending" },
      { id: "CON-2026-003", pass: "activeUser99", access: "allow", status: "active" },
      { id: "CON-2026-003", pass: "activeUser99", access: "allow", status: "active" },
      { id: "CON-2026-003", pass: "activeUser99", access: "allow", status: "active" },
      { id: "CON-2026-003", pass: "activeUser99", access: "allow", status: "active" },
      { id: "CON-2026-003", pass: "activeUser99", access: "allow", status: "active" },
    ].map((item, index) => {
      
      // Dynamic Status Logic with your Theme Colors for "Approved"
      const getStatusDetails = (status) => {
        switch (status.toLowerCase()) {
          case 'approved':
            return { 
                text: "text-primary dark:text-primary", 
                dot: "bg-primary dark:bg-primary", 
                ping: "bg-primary/60" 
            };
          case 'active':
            return { text: "text-sky-600 dark:text-sky-400", dot: "bg-sky-500", ping: "bg-green-400" };
          case 'denied':
          case 'deny':
            return { text: "text-red-600 dark:text-red-400", dot: "bg-red-500", ping: "bg-red-400" };
          default: // Pending
            return { text: "text-orange-600 dark:text-orange-400", dot: "bg-orange-500", ping: "bg-orange-400" };
        }
      };

      const theme = getStatusDetails(item.status);

      return (
        <div 
          key={index} 
          className="grid grid-cols-2 md:grid-cols-24 items-start md:items-center 
                     p-5 md:p-0 
                     bg-white dark:bg-card-dark md:bg-transparent 
                     rounded-2xl md:rounded-none 
                     border border-border-light dark:border-border-dark md:border-0
                     shadow-sm md:shadow-none 
                     hover:bg-primary/5 dark:hover:bg-white/5 transition-all 
                     gap-y-4 md:gap-y-0 hover:cursor-pointer"
        >
          {/* --- COLUMN 1 ON MOBILE (Left Side) --- */}
          <div className="flex flex-col gap-4 md:contents">
            {/* 1. Contributor ID */}
            <div className="md:p-4 md:col-span-6 flex flex-col md:block gap-1 md:pl-8">
              <span className="md:hidden text-xs font-bold uppercase text-primary/80 dark:text-primary/40 px-2">
                Contributor ID
              </span>
              <span className="text-sm font-bold text-text-main dark:text-white px-2 py-1 md:p-0 rounded w-fit">
                {item.id}
              </span>
            </div>

            {/* 2. Password */}
            <div className="md:p-4 md:col-span-6 flex flex-col md:items-center gap-1">
              <span className="md:hidden text-xs font-bold uppercase text-text-secondary dark:text-gray-500 px-2">
                Credential
              </span>
              <span className="text-sm font-medium tracking-widest text-text-secondary dark:text-gray-400 px-2">
                {item.pass}
              </span>
            </div>
          </div>

          {/* --- COLUMN 2 ON MOBILE (Right Side) --- */}
          <div className="flex flex-col gap-4 md:contents items-end  text-right md:items-center">
            {/* 3. Access (Design Preserved) */}
            <div className="md:p-4 md:col-span-4 flex flex-col  gap-1 items-end md:items-center">
              <span className="md:hidden text-xs font-bold uppercase text-text-secondary dark:text-gray-500 px-2">
                Access
              </span>
              <span className={`w-fit px-3 py-1 rounded-full text-[11px] font-bold border uppercase ${
                item.access === 'allow'
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
              }`}>
                {item.access}
              </span>
            </div>

            {/* 4. Status (Design Preserved with Theme Colors) */}
            <div className="md:p-4 md:col-span-8 flex flex-col md:items-center gap-1 items-end px-2">
              <span className="md:hidden text-xs font-bold uppercase text-text-secondary dark:text-gray-500">
                Status
              </span>
              <div className={`flex items-center gap-2 text-sm font-semibold ${theme.text}`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.ping}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dot}`}></span>
                </span>
                <span className="capitalize">{item.status}</span>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
        </div>
        {/* <GmailTableWithSort></GmailTableWithSort> */}
      </main>
    </div>
  );
};

export default AllContributorPage;