import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoMdCheckmarkCircle } from "react-icons/io";
import { MdClose, MdRefresh, MdWarning } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";
import Department from "../Components/Department";
import { useAuth } from "../Contexts/Auth.Context.jsx";

const AddContributor = ({ modal, setModal }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Destructure from the modal object prop
  
  const { openModal, status } = modal;

  const [formData, setFormData] = useState({
    department: "",
    year: "",
    semester: "",
    degree: "",
  });

  const isAdmin = user?.role === "admin";
  const lockedStyles = "cursor-not-allowed opacity-70 bg-gray-100 dark:bg-white/5 border-border-light dark:border-border-dark";
  const activeStyles = "bg-transparent border-border-light dark:border-border-dark focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 shadow-sm";

  // Helper to update specific parts of the parent modal state
  const updateModal = (updates) => {
    setModal((prev) => ({ ...prev, ...updates }));
  };

  const handleClose = () => {
    updateModal({ openModal: false, status: "idle" });
  };

  useEffect(() => {
    if (user && !isAdmin) {
      setFormData((prev) => ({
        ...prev,
        year: user.year || "",
        semester: user.semester || "",
        degree: user.degree || "",
      }));
    }
  }, [user, isAdmin]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isAdmin || name === "department") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const isFormIncomplete = Object.values(formData).some(val => val === "");
    if (isFormIncomplete) {
      updateModal({ status: "warning" });
      return;
    }

    setLoading(true);
    try {
      // Simulate API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      updateModal({ status: "success" });
    } catch (err) {
      updateModal({ status: "error" });
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2024 }, (_, i) => 2025 + i);

  // Guard clause: check openModal property
  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-all cursor-pointer" 
        onClick={handleClose} 
      />

      {/* MODAL CONTENT */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white dark:bg-card-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        
        {/* --- 1. FORM STATE (IDLE) --- */}
        {status === "idle" && (
          <>
            <div className="px-6 py-5 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
              <div>
                <h2 className="text-xl font-bold text-text-main dark:text-white flex items-center gap-2">
                  Add New Contributor
                </h2>
                <p className="text-sm text-text-secondary dark:text-gray-400 mt-0.5">Register a new contributor to CourseBank.</p>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-text-secondary cursor-pointer">
                <MdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-secondary dark:text-gray-400">Department</label>
                <Department defaultText="Select Department" value={formData.department} onChange={handleChange} required={true} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-secondary dark:text-gray-400">Degree</label>
                  <div className={`relative border rounded-xl transition-all duration-200 ${!isAdmin ? lockedStyles : activeStyles}`}>
                    <select name="degree" value={formData.degree} onChange={handleChange} disabled={!isAdmin} className="w-full h-12 px-4 bg-transparent border-0 focus:ring-0 text-sm appearance-none outline-none cursor-pointer" required>
                      <option value="">Select Degree</option>
                      <option value="bachelors">Bachelor</option>
                      <option value="masters">Master</option>
                      <option value="phd">PhD</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown /></span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-secondary dark:text-gray-400">HSC Year</label>
                  <div className={`relative border rounded-xl transition-all duration-200 ${!isAdmin ? lockedStyles : activeStyles}`}>
                    <select name="year" value={formData.year} onChange={handleChange} disabled={!isAdmin} className="w-full h-12 px-4 bg-transparent border-0 focus:ring-0 text-sm appearance-none outline-none cursor-pointer" required>
                      <option value="">Select Year</option>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"><IoIosArrowDown /></span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-text-secondary dark:text-gray-400">Semester</label>
                  <div className={`relative border rounded-xl transition-all duration-200 ${!isAdmin ? lockedStyles : activeStyles}`}>
                    <select name="semester" value={formData.semester} onChange={handleChange} disabled={!isAdmin} className="w-full h-12 px-4 bg-transparent border-0 focus:ring-0 text-sm appearance-none outline-none cursor-pointer" required>
                      <option value="">Select Semester</option>
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
                </div>
              </div>

              <div className="pt-5 mt-10 flex items-center justify-end gap-3 border-t border-border-light dark:border-border-dark">
                <button type="button" onClick={handleClose} className="px-6 py-2.5 rounded-xl border border-border-light dark:border-border-dark font-semibold text-text-secondary hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">Cancel</button>
                <button type="submit" disabled={loading} className="px-10 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-70 cursor-pointer">
                  {loading ? "Saving..." : "Save Contributor"}
                </button>
              </div>
            </form>
          </>
        )}

        {/* --- 2. SUCCESS MODE --- */}
        {status === "success" && (
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8 animate-in zoom-in duration-300">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600">
              <IoMdCheckmarkCircle size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Successful!</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">Contributor added successfully.</p>
            </div>
            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-teal-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

        {/* --- 3. ERROR MODE --- */}
        {status === "error" && (
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8 animate-in zoom-in duration-300">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500">
              <BsExclamationCircleFill size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Addition Failed</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">Check your connection and try again.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-6">
              <button onClick={handleClose} className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-4 text-xl font-semibold text-text-main dark:text-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} className="flex-1 rounded-xl bg-orange-500 py-4 text-xl font-semibold text-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-600 transition-colors">
                <MdRefresh size={24} /> Retry
              </button>
            </div>
          </div>
        )}

        {/* --- 4. WARNING MODE --- */}
        {status === "warning" && (
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8 animate-in zoom-in duration-300">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500">
              <MdWarning size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Incomplete!</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">Please fill all fields.</p>
            </div>
            <button onClick={() => updateModal({ status: "idle" })} className="w-full rounded-xl bg-amber-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-amber-600 transition-colors cursor-pointer">
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddContributor;