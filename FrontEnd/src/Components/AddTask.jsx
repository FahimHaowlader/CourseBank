import React, { useState, useEffect } from "react";
import { IoMdClose, IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlinePersonSearch, MdRefresh } from "react-icons/md";
import { LuLink } from "react-icons/lu";
import { BsExclamationCircleFill } from "react-icons/bs";

import { useCourse } from '../Contexts/Course.Context';

// --- MOVE OUTSIDE TO PREVENT FOCUS LOSS ---
const ModalWrapper = ({ children, handleClose, loading }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div 
        className="fixed inset-0 bg-slate-900/20 transition-opacity backdrop-blur-sm" 
        onClick={() => !loading && handleClose()}
      ></div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
      <div className="relative inline-block align-bottom bg-white dark:bg-slate-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:min-w-2xl md:min-w-3xl border border-slate-200 dark:border-slate-700">
        {children}
      </div>
    </div>
  </div>
);

const AddTask = () => {
  const { taskModal, setTaskModal } = useCourse();
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    name: "",
    link: ""
  });

  // Reset state when modal opens
  useEffect(() => {
    if (taskModal.openModal && taskModal.status === "update") {
      setData({ name: "", link: "" });
    }
  }, [taskModal.openModal]);

  const isValidGoogleUrl = (url) => {
    if (!url) return false;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === "google.com" || parsedUrl.hostname.endsWith(".google.com");
    } catch (e) {
      return false;
    }
  };

  const isUrlValid = isValidGoogleUrl(data.link);
  const isChanged = data.name.trim().length > 0 && data.link.trim().length > 0;
  const canUpdate = isChanged && !loading && isUrlValid;

  const handleClose = () => {
    if (!loading) setTaskModal({ openModal: false, status: "update" });
  };

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    if (!canUpdate) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTaskModal({ openModal: true, status: "success" });
    } catch (error) {
      setTaskModal({ openModal: true, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!taskModal.openModal) return null;

  return (
    <>
      {/* 1. UPDATE/ADD MODE */}
      {taskModal.status === "update" && (
        <ModalWrapper handleClose={handleClose} loading={loading}>
          <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-white">Add Task Or Assignment</h3>
              <button
                disabled={loading}
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-500 focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-700 p-1 rounded-full cursor-pointer transition-colors disabled:opacity-50"
              >
                <IoMdClose size={26} />
              </button>
            </div>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="px-4 py-5 sm:p-6 space-y-5">
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Task Or Assignment Name</span>
                <div className="relative flex items-center w-full">
                  <span className="absolute left-3 text-text-secondary"><MdOutlinePersonSearch size={20} /></span>
                  <input 
                    type="text" 
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="e.g. Midterm Project" 
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none text-sm text-text-main dark:text-white transition-all" 
                    required
                  />
                </div>
              </label>

              <label className="flex flex-col gap-1.5 w-full relative">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Resource Link</span>
                <div className="relative flex items-center w-full">
                  <span className="absolute left-3 text-text-secondary"><LuLink size={20} /></span>
                  <input 
                    type="text" 
                    value={data.link}
                    onChange={(e) => setData({ ...data, link: e.target.value })}
                    placeholder="https://google.com/..." 
                    className={`w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border ${
                      !isUrlValid && data.link.length > 0 
                      ? "border-orange-500 focus:border-orange-600" 
                      : "border-border-light dark:border-border-dark focus:border-primary"
                    } focus:outline-none text-sm text-text-main dark:text-white transition-all`}
                    required
                  />
                </div>
                
                {/* RESERVED SPACE TO PREVENT LAYOUT SHIFT */}
                <div className="h-5 mt-1">
                  {!isUrlValid && data.link.length > 0 && (
                    <p className="text-xs text-orange-500 flex items-center gap-1.5 font-medium">
                      <BsExclamationCircleFill size={14} />
                      Please provide a valid Google URL.
                    </p>
                  )}
                </div>
              </label>

              <div className="px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
                <button
                  disabled={loading}
                  type="button"
                  onClick={handleClose}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-border-light dark:border-border-dark shadow-sm px-4 py-2 bg-white dark:bg-slate-800 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canUpdate}
                  className={`w-full inline-flex items-center justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white focus:outline-none sm:w-auto sm:text-sm transition-colors ${canUpdate ? "cursor-pointer hover:bg-teal-700" : "opacity-80 cursor-not-allowed"}`}
                >
                  {loading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Adding...
                    </>
                  ) : (
                    "Add Task"
                  )}
                </button>
              </div>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* 2. SUCCESS MODE */}
      {taskModal.status === "success" && (
        <ModalWrapper handleClose={handleClose} loading={false}>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-teal-600">
              <IoMdCheckmarkCircle size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Successful!</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                Course Task has been added successfully.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-teal-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-teal-700 focus:outline-none transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* 3. ERROR MODE */}
      {taskModal.status === "error" && (
        <ModalWrapper handleClose={handleClose} loading={false}>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500">
              <BsExclamationCircleFill size={56} />
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Addition Failed</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400">Please check your connection and try again.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-6">
              <button 
                onClick={handleClose} 
                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-4 text-xl font-semibold text-text-main dark:text-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => setTaskModal({ ...taskModal, status: "update" })} 
                className="flex-1 rounded-xl bg-orange-500 py-4 text-xl font-semibold text-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-600 transition-colors"
              >
                <MdRefresh size={24} /> Retry
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddTask;