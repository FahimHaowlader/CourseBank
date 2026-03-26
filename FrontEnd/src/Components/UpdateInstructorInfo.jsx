import React, { useState, useEffect } from 'react';
import { IoMdClose, IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlinePersonSearch, MdRefresh } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";

import CustomDatePicker from './CustomDatePicker';
import Department from './Department';
import { useCourse } from '../Contexts/Course.Context';

const ModalWrapper = ({ children, handleClose, loading }) => (
  <div aria-labelledby="modal-title" aria-modal="true" className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
    <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
      <div aria-hidden="true" className="fixed inset-0 bg-slate-900/40 transition-opacity backdrop-blur-sm" onClick={() => !loading && handleClose()}></div>
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl text-left shadow-2xl transform transition-all sm:my-8 sm:max-w-lg sm:min-w-2xl md:min-w-3xl w-full border border-slate-200 dark:border-slate-700 overflow-visible">
        {children}
      </div>
    </div>
  </div>
);

const UpdateInstructorInfo = () => {
  const [loading, setLoading] = useState(false);
  const { instructorModal, setInstructorModal, course } = useCourse();

  const [data, setData] = useState({
    instructorName: "",
    department: "",
    startingDate: null,
  });

  useEffect(() => {
    if (instructorModal.openModal && instructorModal.status === "update") {
      setData({
        instructorName: course?.instructorName || "",
        department: course?.instructorDepartment || "",
        startingDate: course?.startingDate || null,
      });
    }
  }, [instructorModal.openModal, course]);

  const getEarliestAssessmentDate = () => {
    if (!course?.assessments || !Array.isArray(course.assessments) || course.assessments.length === 0) {
      return null;
    }
    const dates = course.assessments
      .map(item => new Date(item.date))
      .filter(d => !isNaN(d.getTime()));

    return dates.length > 0 ? new Date(Math.min(...dates)) : null;
  };

  const earliestAssessment = getEarliestAssessmentDate();
  
  const isDateInvalid = data.startingDate && earliestAssessment && 
                        new Date(data.startingDate) > earliestAssessment;

  const isChanged = 
    data.instructorName !== (course?.instructorName || "") ||
    data.department !== (course?.instructorDepartment || "") ||
    data.startingDate !== (course?.startingDate || null);

  const handleClose = () => {
    if (!loading) setInstructorModal({ openModal: false, status: "" });
  };

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    if (!isChanged || loading || isDateInvalid) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setInstructorModal((prev) => ({ ...prev, status: "success" }));
    } catch (error) {
      setInstructorModal((prev) => ({ ...prev, status: "error" }));
    } finally {
      setLoading(false);
    }
  };

  if (!instructorModal.openModal) return null;

  return (
    <>
      {instructorModal.status === "update" && (
        <ModalWrapper handleClose={handleClose} loading={loading}>
          <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-slate-100 dark:border-slate-700 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-white">
                Edit Instructor Info
              </h3>
              <button
                onClick={handleClose}
                disabled={loading}
                className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 p-1 rounded-full cursor-pointer transition-colors"
                type="button"
              >
                <IoMdClose size={26} />
              </button>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6 sm:pt-4 space-y-5">
            <label className="flex flex-col gap-1.5 w-full">
              <span className="text-sm font-semibold text-slate-500 dark:text-gray-400">
                Instructor Name
              </span>
              <div className="relative flex items-center w-full">
                <span className="absolute left-3 text-slate-400">
                  <MdOutlinePersonSearch size={20} />
                </span>
                <input
                  type="text"
                  value={data.instructorName}
                  onChange={(e) => setData({ ...data, instructorName: e.target.value })}
                  placeholder="e.g. Dr. Sarah Jenkins"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:outline-none text-sm text-slate-900 dark:text-white transition-all"
                />
              </div>
            </label>
            
            <div className="w-full">
              <Department 
                value={data.department} 
                onChange={(e) => setData({ ...data, department: e.target.value })} 
              />
            </div>

            <div className="w-full">
              <CustomDatePicker 
                label="Course Start" 
                selectedDate={data.startingDate}
                onChange={(date) => setData({ ...data, startingDate: date })}
              />
              {/* RESERVED SPACE FOR ERROR MESSAGE TO PREVENT SHIFT */}
              <div className="h-6 mt-1 overflow-hidden">
                {isDateInvalid && (
                  <p className="text-xs text-orange-500 flex items-center gap-1 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                    <BsExclamationCircleFill size={14} className="shrink-0" /> 
                    Conflict: Course cannot start after the first assessment ({earliestAssessment.toLocaleDateString()}).
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/30 px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:justify-end border-t border-slate-100 dark:border-slate-700 gap-3 rounded-b-2xl">
            <button
              onClick={handleClose}
              disabled={loading}
              className="w-full cursor-pointer sm:w-auto inline-flex justify-center rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              className={`w-full sm:w-auto inline-flex items-center justify-center rounded-lg px-6 py-2 bg-teal-600 text-sm font-medium text-white transition-all ${ (isChanged && !loading && !isDateInvalid) ? "hover:bg-teal-700 cursor-pointer shadow-md shadow-teal-500/20" : "opacity-60 cursor-not-allowed"}`}
              type="button"
              disabled={!isChanged || loading || isDateInvalid}
              onClick={handleUpdate}
            >
              {loading ? (
                <><div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>Updating...</>
              ) : "Update"}
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* Success Modal stays as is */}
      {instructorModal.status === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white dark:bg-slate-800 p-10 sm:p-14 text-left shadow-2xl transition-all border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600">
                <IoMdCheckmarkCircle size={56} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Successfully Changed!</h3>
                <p className="text-xl text-slate-500 dark:text-gray-400 leading-relaxed">
                  Instructor information has been successfully updated.
                </p>
              </div>
              <button className="w-full rounded-xl bg-teal-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors cursor-pointer"
                onClick={handleClose}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateInstructorInfo;