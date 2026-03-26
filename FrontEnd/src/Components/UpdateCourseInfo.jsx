import React, { useState, useEffect } from "react";

import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHash } from "react-icons/bi";

import { useCourse } from "../Contexts/Course.Context";

const UpdateCourseInfo = () => {
  const [loading, setLoading] = useState(false);
  const { infoModal, setInfoModal, course } = useCourse();

  const [data, setData] = useState({
    title: "",
    courseCode: "",
    format: "",
    type: "",
    credits: null,
  });

  // Sync local state when the course data from context is available
  useEffect(() => {
    if (course) {
      setData({
        title: course?.title || "",
        courseCode: course?.courseCode || "",
        format: course?.format || "",
        type: course?.type || "",
        credits: course?.credits || "",
      });
    }
  }, [course, infoModal.openModal]);

  // LOGIC: Compare current local 'data' with the original 'course' from context
  const isChanged = 
    data.title !== (course?.title || "") ||
    data.courseCode !== (course?.courseCode || "") ||
    data.format !== (course?.format || "") ||
    data.type !== (course?.type || "") ||
    String(data.credits) !== String(course?.credits || "");

  const handleUpdateInfo = async (e) => {
    e.preventDefault(); 
    
    // Extra guard clause: Stop execution if nothing changed or already loading
    if (!isChanged || loading) return;

    setLoading(true); // Fixed: was loading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Updated Data:", data);

      setInfoModal((prev) => ({
        ...prev,
        status: "success",
      }));
    } catch (error) {
      setInfoModal((prev) => ({
        ...prev,
        status: "error",
      }));
    } finally {
      setLoading(false); // Fixed: was loading(false)
    }
  };

 const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert credits to a number so it matches the data type in your Database/Context
    const processedValue = name === "credits" ? (value === "" ? "" : Number(value)) : value;
    
    setData((prev) => ({ 
      ...prev, 
      [name]: processedValue 
    }));
  };

  return (
    <>
      {infoModal.openModal && infoModal.status === "update" && (
        <div
          aria-labelledby="modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              aria-hidden="true"
              className="fixed inset-0 bg-slate-900/20 transition-opacity backdrop-blur-sm"
              onClick={() => !loading && setInfoModal({})}
            ></div>
            <span
              aria-hidden="true"
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
            >
              ​
            </span>
            <div className="relative inline-block align-bottom bg-white dark:bg-slate-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:min-w-2xl md:min-w-3xl border border-slate-200 dark:border-slate-700">
              <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg leading-6 font-bold text-slate-900 dark:text-white"
                    id="modal-title"
                  >
                    Update Course Details
                  </h3>
                  <button
                    disabled={loading}
                    className="text-slate-400 hover:text-slate-500 focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-700 p-1 rounded-full cursor-pointer transition-colors disabled:opacity-50"
                    type="button"
                    onClick={() => setInfoModal({})}
                  >
                    <IoMdClose size={26} />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleUpdateInfo}>
                <div className="px-4 py-5 sm:p-6 space-y-5">
                  <label className="flex flex-col gap-1.5 w-full md:col-span-10">
                    <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                      Course Title
                    </span>
                    <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                      <span className="absolute left-3 text-text-secondary flex items-center justify-center text-[20px]">
                        <AiOutlineSearch />
                      </span>
                      <input
                        placeholder="e.g. Intro to Computer Science"
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all"
                        required
                      />
                    </div>
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5 w-full ">
                      <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                        Course Code
                      </span>
                      <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                        <span className="absolute left-3 text-text-secondary flex items-center justify-center text-[20px]">
                          <BiHash />
                        </span>
                        <input
                          placeholder="ABCD-1234-EFGH-5678"
                          type="text"
                          value={data.courseCode}
                          onChange={handleChange}
                          className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none focus:ring-0 focus:ring-offset-0 text-text-main dark:text-white placeholder-text-secondary text-sm transition-all uppercase"
                          name="courseCode"
                          required
                        />
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
                          value={data.type}
                          onChange={handleChange}
                        >
                          <option value="core">Core</option>
                          <option value="lab">Lab</option>
                          <option value="project">Project</option>
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary flex items-center justify-center text-[20px]">
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
                          required
                          value={data.credits}
                          onChange={handleChange}
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>{num} Credits</option>
                          ))}
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary flex items-center justify-center text-[20px]">
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
                          required
                          value={data.format}
                          onChange={handleChange}
                        >
                          <option value="major">Major</option>
                          <option value="non-major">Non-Major</option>
                          <option value="elective">Elective</option>
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary flex items-center justify-center text-[20px]">
                          <IoIosArrowDown />
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:justify-end gap-3 ">
                    <button
                      disabled={loading}
                      className="mt-3 w-full inline-flex justify-center rounded-lg border border-border-light dark:border-border-dark shadow-sm px-4 py-2 bg-white dark:bg-slate-800 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      type="button"
                      onClick={() => setInfoModal({})}
                    >
                      Cancel
                    </button>
                    <button
                      className={`w-full inline-flex items-center justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white focus:outline-none sm:w-auto sm:text-sm transition-colors ${isChanged && !loading ? "cursor-pointer hover:bg-teal-700 " : ""  }${!isChanged || loading ? "opacity-80 cursor-not-allowed" : ""}`}
                      type="submit"
                      disabled={!isChanged || loading}
                    >
                      {loading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Updating...
                        </>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {infoModal.openModal && infoModal.status === "success" && (
        <div
          aria-labelledby="modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setInfoModal({})}
          ></div>
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                <IoMdCheckmarkCircle size={56} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-text-main dark:text-white" id="modal-title">
                  Successful!
                </h3>
                <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                  Course Description has been updated successfully.
                </p>
              </div>
              <div className="w-full mt-4">
                <button
                  className="w-full rounded-xl bg-teal-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-teal-700 focus:outline-none transition-colors cursor-pointer"
                  onClick={() => setInfoModal({})}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {infoModal.openModal && infoModal.status === "error" && (
        <div
          aria-labelledby="modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
            onClick={() => setInfoModal({})}
          ></div>
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400">
                <BsExclamationCircleFill size={56} />
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-bold text-text-main dark:text-white" id="modal-title">
                  Update Failed
                </h3>
                <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                  Please check your connection and try again.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-6 mt-4">
                <button 
                    onClick={() => setInfoModal({})}
                    className="flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors cursor-pointer">
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateInfo}
                  className="flex w-full items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none transition-colors cursor-pointer">
                  <MdRefresh size={24} className="mr-1" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCourseInfo;