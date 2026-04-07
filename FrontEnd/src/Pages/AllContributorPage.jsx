import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { MdRefresh, MdDeleteOutline, MdOutlineShare, MdWarning } from "react-icons/md";
import { IoIosArrowDown, IoMdCheckmarkCircle } from "react-icons/io";
import { LiaIdCardSolid } from "react-icons/lia";
import { BsExclamationCircleFill } from "react-icons/bs";
import Department from "../Components/Department";
import { useAuth } from "../Contexts/Auth.Context.jsx";
import AddContributor from "../Components/AddContributor";
import PrivateApi from "../Hooks/PrivateApi.jsx";
import Pagination from "../Components/Pagination.jsx";

const AllContributorPage = () => {
  const { user } = useAuth();
  const [modal, setModal] = useState({ openModal: false, status: "" });
  
  const [deleteModal, setDeleteModal] = useState({ 
    isOpen: false, 
    status: "idle", 
    targetId: null 
  });

  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);

  const [filters, setFilters] = useState({
    contributorId: "",
    semester: "",
    degree: "",
    year: "",
    status: "",
    access: "",
    department: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChangeIntoNumber = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? "" : isNaN(value) ? value : +value,
    }));
  };

  useEffect(() => {
    if (user) {
      setFilters((prev) => ({
        ...prev,
        semester: user?.role === "admin" ? "" : user.semester || "",
        degree: user?.role === "admin" ? "" : user.degree || "",
        year: user?.role === "admin" ? "" : user.year || "",
      }));
    }
  }, [user]);

  const handleSearch = async (customFilters = null) => {
    const currentFilters = customFilters || filters;
    const { contributorId, access } = currentFilters;

    if (contributorId) {
      const isValidFormat = /^[A-Za-z]{3}\d{8}$/.test(contributorId);
      if (user?.role === 'moderator') {
        const inputSuffix = contributorId.slice(-8);
        const userSuffix = user?.userId?.toString().slice(-8);
        if (inputSuffix !== userSuffix) {
          setFilters(prev => ({ ...prev, contributorId: '' }));
          return;
        }
      }
      if (!isValidFormat) {
        setFilters(prev => ({ ...prev, contributorId: '' }));
        return;
      }
    }

    setLoading(true);
    const { contributorId: userId, ...remainingFilters } = currentFilters;
    const rawParams = { 
      ...remainingFilters, 
      userId,
      access: access === 'true' ? true : access === 'false' ? false : access 
    };

    const parameter = Object.fromEntries(
      Object.entries(rawParams).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );

    try {
      const response = await PrivateApi.post('/get-all-contributors', { parameter, page });
      setTotalDocs(response?.data?.data?.totalContributors);
      setContributors(response?.data?.data?.contributors || []);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const triggerManualSearch = () => {
    if (page === 1) handleSearch();
    else setPage(1);
  };

  useEffect(() => {
    handleSearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, status: "idle", targetId: id });
  };

  const processDelete = async () => {
    setDeleteModal(prev => ({ ...prev, status: "loading" }));
    try {
      await PrivateApi.delete(`/delete-contributor/${deleteModal.targetId}`);
      setDeleteModal(prev => ({ ...prev, status: "success" }));
      handleSearch();
    } catch (e) { 
      setDeleteModal(prev => ({ ...prev, status: "error" }));
    }
  };

  const handleShare = (item) => {
    const text = `Contributor ID: ${item.userId}\nPassword: ${item.password}`;
    if (navigator.share) {
      navigator.share({ title: 'Contributor Details', text }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const handleReset = () => {
    const defaultFilters = {
      contributorId: "",
      semester: user?.role === "admin" ? "" : user?.semester || "",
      degree: user?.role === "admin" ? "" : user?.degree || "",
      year: user?.role === "admin" ? "" : user?.year || "",
      status: "",
      access: "",
      department: ""
    };
    setFilters(defaultFilters);
    if (page === 1) handleSearch(defaultFilters);
    else setPage(1);
  };

  const years = (() => {
    const current = new Date().getFullYear();
    return Array.from({ length: current - 2025 + 1 }, (_, i) => current - i);
  })();

  const isLocked = user?.role !== "admin";
  const lockedStyles = "cursor-not-allowed opacity-70 bg-gray-50 dark:bg-white/5";

  return (
    <div className="bg-white dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
        <header className="mb-5">
          <h1 className="text-2xl md:text-4xl text-transparent bg-clip-text bg-primary-dark dark:bg-primary tracking-tight font-extrabold">
            Search and Explore Contributors
          </h1>
          <p className="mt-0.5 text-base md:text-lg text-secondary-text dark:text-gray-400 max-w-4xl">
            Filter contributors by ID, department, status, and access to manage scholarly input.
          </p>
        </header>

        {/* --- FILTER SECTION --- */}
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4 md:p-6 mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-24 gap-4 items-end">
            <label className="flex flex-col gap-1.5 w-full sm:col-span-2 md:col-span-24 xl:col-span-8">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Contributor Id</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary text-[20px]"><LiaIdCardSolid /></span>
                <input type="text" name="contributorId" value={filters.contributorId} onChange={handleChange} placeholder="e.g. CSE20260211" className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border-0 focus:ring-1 focus:ring-primary focus:outline-none text-sm transition-all uppercase" />
              </div>
            </label>

            <label className={`flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-12 xl:col-span-6 ${isLocked ? "cursor-not-allowed" : ""}`}>
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Semester</span>
              <div className={`relative w-full border border-border-light dark:border-border-dark rounded-lg ${isLocked ? lockedStyles : ""}`}>
                <select name="semester" value={filters.semester} onChange={handleFilterChangeIntoNumber} disabled={isLocked} className={`w-full h-11 pl-3 pr-10 rounded-lg bg-transparent border-0 text-sm appearance-none ${user?.role === "admin" ? "cursor-pointer" : "cursor-not-allowed"} focus:ring-1 focus:ring-primary focus:outline-none `}>
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
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown size={20}  /></span>
              </div>
            </label>

            <label className={`flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-12 xl:col-span-5 ${isLocked ? "cursor-not-allowed" : ""}`}>
              <span className="text-sm font-semibold text-text-secondary">Degree</span>
              <div className={`relative w-full border border-border-light dark:border-border-dark rounded-lg ${isLocked ? lockedStyles : ""}`}>
                <select name="degree" value={filters.degree} onChange={handleChange } disabled={isLocked} className={`w-full h-11 pl-3 pr-10 bg-transparent border-0 text-sm appearance-none focus:ring-1 focus:ring-primary focus:outline-none ${user?.role === "admin" ? "cursor-pointer" : "cursor-not-allowed"} rounded-lg`}>
                  <option value="">All Degrees</option>
                  <option value="bachelors">Bachelor</option>
                  <option value="masters">Master</option>
                  <option value="phd">PhD</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><IoIosArrowDown size={20}  /></span>
              </div>
            </label>

            <label className={`flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-8 xl:col-span-5 ${isLocked ? "cursor-not-allowed" : ""}`}>
              <span className="text-sm font-semibold text-text-secondary">Hsc Year</span>
              <div className={`relative w-full border border-border-light dark:border-border-dark rounded-lg ${isLocked ? lockedStyles : ""}`}>
                <select name="year" value={filters.year} onChange={handleFilterChangeIntoNumber} disabled={isLocked} className={`w-full h-11 pl-3 pr-10 bg-transparent border-0 text-sm appearance-none focus:ring-1 focus:ring-primary ${user?.role === "admin" ? "cursor-pointer" : "cursor-not-allowed"} focus:outline-none rounded-lg`}>
                  <option value="">All Years</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><IoIosArrowDown size={20}  /></span>
              </div>
            </label>

            <div className="flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-16 xl:col-span-6">
              <Department defaultText={"All Departments"} value={filters.department} onChange={handleChange} />
            </div>

            <label className="flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-12 xl:col-span-4">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Status</span>
              <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg">
                <select name="status" value={filters.status} onChange={handleChange} className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 text-sm appearance-none cursor-pointer focus:ring-1 focus:ring-primary focus:outline-none">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown size={20}/></span>
              </div>
            </label>

            <label className="flex flex-col gap-1.5 w-full sm:col-span-1 md:col-span-12 xl:col-span-4">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Access</span>
              <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-background-dark">
                <select name="access" value={filters.access} onChange={handleChange} className="w-full h-11 pl-4 pr-10 rounded-lg bg-transparent border-0 text-sm appearance-none cursor-pointer focus:ring-1 focus:ring-primary focus:outline-none">
                  <option value="">All Access</option>
                  <option value="true">Allow</option>
                  <option value="false">Deny</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown size={20}  /></span>
              </div>
            </label>

            <div className="col-span-1 sm:col-span-2 md:col-span-12 xl:col-span-10 mt-4 md:mt-auto">
              <div className="flex flex-col sm:flex-row items-center justify-start xl:justify-end gap-3 w-full sm:h-11">
                <button onClick={handleReset} className="w-full sm:w-auto min-w-48 flex items-center justify-center gap-2 px-5 h-11 text-primary hover:bg-primary/5 rounded-lg transition-colors font-semibold active:scale-95 cursor-pointer"><MdRefresh className="text-[20px]" /> Reset Filters</button>
                <button onClick={triggerManualSearch} disabled={loading} className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-8 h-11 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-all active:scale-95 disabled:opacity-50 cursor-pointer">
                  {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : <AiOutlineSearch className="text-[20px]" />}
                  <span>Search</span>
                </button>
                <button onClick={() => setModal({ openModal: true, status: "idle" })} className="w-full sm:w-auto flex min-w-52 items-center justify-center gap-2 py-2 px-6 h-11 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-all active:scale-95 cursor-pointer"><AiOutlinePlus className="text-[20px]" /> New Contributor</button>
              </div>
            </div>
          </div>
        </div>

        {/* --- DATA SECTION --- */}
        <div className="w-full mt-8 md:rounded-xl md:border border-border-light dark:border-border-dark overflow-hidden md:shadow-sm">
          {contributors.length > 0 && (
            <div className="hidden md:grid grid-cols-24 bg-primary text-white font-bold text-sm uppercase tracking-wider">
              <div className="p-4 col-span-5 pl-8"> Contributor<span className="hidden lg:inline"> ID</span> </div>
              <div className="p-4 col-span-6 text-center">Password</div>
              <div className="p-4 col-span-4 text-center">Access</div>
              <div className="p-4 col-span-5 text-center">Status</div>
              <div className="p-4 col-span-4 text-center">Actions</div>
            </div>
          )}

          <div className="flex flex-col gap-4 md:gap-0 bg-transparent md:bg-white dark:md:bg-card-dark md:divide-y md:divide-border-light">
            {contributors.length > 0 ? (
              contributors.map((item, index) => {
                const theme = ((status) => {
                  const s = status?.toLowerCase();
                  if (s === 'approved') return { text: "text-primary", dot: "bg-primary", ping: "bg-primary/60" };
                  if (s === 'active') return { text: "text-sky-600", dot: "bg-sky-500", ping: "bg-sky-400" };
                  if (s === 'deny' || s === 'denied') return { text: "text-red-600", dot: "bg-red-500", ping: "bg-red-400" };
                  return { text: "text-orange-600", dot: "bg-orange-500", ping: "bg-orange-400" };
                })(item.status);

                return (
                  <div key={index} className="grid grid-cols-2 md:grid-cols-24 items-start md:items-center p-5 md:p-0 bg-white dark:bg-card-dark md:bg-transparent rounded-2xl md:rounded-none border border-border-light dark:border-border-dark md:border-0 shadow-sm md:shadow-none hover:bg-primary/5 transition-all ">
                    <div className="flex flex-col gap-4 md:contents">
                      <div className="md:p-3 md:col-span-5 flex flex-col md:block gap-1 md:pl-8">
                        <span className="md:hidden text-xs font-bold uppercase text-primary/80 px-2">Contributor ID</span>
                        <span className="text-sm uppercase font-bold px-2 md:p-0">{item.userId}</span>
                      </div>
                      <div className="md:p-3 md:col-span-6 flex flex-col md:items-center gap-1">
                        <span className="md:hidden text-xs font-bold uppercase text-text-secondary px-2">Password</span>
                        <span className="text-sm font-medium tracking-widest text-text-secondary px-2">{item.password}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 md:contents items-end text-right md:items-center">
                      <div className="md:p-3 md:col-span-4 flex flex-col gap-1 items-end md:items-center">
                        <span className="md:hidden text-xs font-bold uppercase text-text-secondary px-2">Access</span>
                        <span className={`w-fit px-3 py-1 rounded-full text-[11px] font-bold border uppercase ${item.access ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}>{item.access ? "Allow" : "Deny"}</span>
                      </div>
                      <div className="md:p-3 md:col-span-5 flex flex-col md:items-center gap-1 items-end px-2">
                        <span className="md:hidden text-xs font-bold uppercase text-text-secondary">Status</span>
                        <div className={`flex items-center gap-2 text-sm font-semibold ${theme.text}`}>
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.ping}`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dot}`}></span>
                          </span>
                          <span className="capitalize">{item.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:p-3 md:col-span-4 flex items-center justify-center gap-2 mt-3 md:mt-0 w-full md:w-auto px-2 md:px-0 col-span-24 ">
                      <button onClick={() => handleShare(item)} className="w-full md:w-auto p-2 md:p-2.5 text-primary bg-primary/5 md:bg-transparent hover:bg-primary hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-bold border border-primary/10 md:border-0 cursor-pointer">
                        <MdOutlineShare size={20} />
                        <span className="md:hidden">Share</span>
                      </button>
                      <button onClick={() => confirmDelete(item._id)} className="w-full md:w-auto p-2 md:p-2.5 text-red-500 bg-red-50 md:bg-transparent hover:bg-red-500 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-bold border border-red-100 md:border-0 cursor-pointer">
                        <MdDeleteOutline size={20} />     
                        <span className="md:hidden">Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              !loading && (
                /* --- NO CONTRIBUTORS FOUND EMPTY STATE --- */
                <div className=" flex flex-col items-center justify-center py-16 text-center bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark border-dashed ">
                  <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                    No contributors found
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400 px-5 ">
                    We couldn't find any contributors matching your filters. Try
                    adjusting your search criteria.
                  </p>
                  <button
                    className="mt-5 text-primary font-semibold hover:underline hover:cursor-pointer"
                    onClick={handleReset}
                  >
                    Clear all filters
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <Pagination page={page} setPage={setPage} totalDocs={totalDocs} />
        <AddContributor modal={modal} setModal={setModal} />

        {/* --- DYNAMIC DELETE FEEDBACK MODAL --- */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-all cursor-pointer" onClick={() => setDeleteModal({ isOpen: false, status: "idle", targetId: null })} />
            <div className="relative w-full max-w-2xl bg-white dark:bg-card-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in fade-in zoom-in duration-300">
              
              {/* 1. Confirm View */}
              {deleteModal.status === "idle" && (
                <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500">
                    <MdWarning size={64} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-text-main dark:text-white">Are you sure?</h3>
                    <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">This action cannot be undone. This contributor will be permanently removed from the system.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 mt-2">
                    <button onClick={() => setDeleteModal({ isOpen: false, status: "idle", targetId: null })} className="flex-1 px-8 py-4 rounded-xl border border-border-light dark:border-border-dark font-semibold text-xl text-text-secondary hover:bg-gray-50 cursor-pointer">Cancel</button>
                    <button onClick={processDelete} className="flex-1 px-8 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xl shadow-lg shadow-red-500/20 cursor-pointer transition-all active:scale-95">Delete Now</button>
                  </div>
                </div>
              )}

              {/* 2. Loading View */}
              {deleteModal.status === "loading" && (
                <div className="p-20 text-center flex flex-col items-center gap-8">
                  <div className="animate-spin h-20 w-20 border-4 border-teal-600 border-t-transparent rounded-full" />
                  <p className="text-2xl font-bold text-text-main dark:text-white tracking-tight">Processing Deletion...</p>
                </div>
              )}

              {/* 3. Success View (Teal Design Match) */}
              {deleteModal.status === "success" && (
                <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8 animate-in zoom-in duration-300">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600">
                    <IoMdCheckmarkCircle size={56} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-text-main dark:text-white">Successful!</h3>
                    <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">Contributor deleted successfully.</p>
                  </div>
                  <button onClick={() => setDeleteModal({ isOpen: false, status: "idle", targetId: null })} className="w-full rounded-xl bg-teal-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors cursor-pointer">Done</button>
                </div>
              )}

              {/* 4. Error View */}
              {deleteModal.status === "error" && (
                <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8 animate-in zoom-in duration-300">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500">
                    <BsExclamationCircleFill size={56} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-text-main dark:text-white">Deletion Failed</h3>
                    <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">Check your connection and try again.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-6">
                    <button onClick={() => setDeleteModal({ isOpen: false, status: "idle", targetId: null })} className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-4 text-xl font-semibold text-text-main dark:text-gray-300 cursor-pointer hover:bg-gray-50">Cancel</button>
                    <button onClick={() => setDeleteModal(prev => ({ ...prev, status: "idle" }))} className="flex-1 rounded-xl bg-orange-500 py-4 text-xl font-semibold text-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-600 transition-colors"><MdRefresh size={24} /> Retry</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllContributorPage;