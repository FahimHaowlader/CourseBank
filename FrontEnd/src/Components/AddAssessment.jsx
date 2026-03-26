import React, { useState, useEffect } from "react";
import { IoMdClose, IoIosArrowDown, IoMdCheckmarkCircle } from "react-icons/io";
import { LuLink } from "react-icons/lu";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";

import CustomDatePicker from "./CustomDatePicker";
import { useCourse } from '../Contexts/Course.Context';

const ModalWrapper = ({ children, handleClose, loading }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => !loading && handleClose()}></div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
      <div className="relative inline-block align-bottom bg-white dark:bg-slate-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:min-w-2xl md:min-w-3xl border border-slate-200 dark:border-slate-700">
        {children}
      </div>
    </div>
  </div>
);

const AddAssessment = () => {
  const { assessmentModal, setAssessmentModal, course } = useCourse();
  const [loading, setLoading] = useState(false);

  // Full list of required options
  const allOptions = [
    { value: "termtest-1", label: "Termtest-1" },
    { value: "termtest-2", label: "Termtest-2" },
    { value: "termtest-3", label: "Termtest-3" },
    { value: "midterm-1", label: "Midterm-1" },
    { value: "midterm-2", label: "Midterm-2" },
    { value: "midterm-3", label: "Midterm-3" },
    { value: "quiz-1", label: "Quiz-1" },
    { value: "quiz-2", label: "Quiz-2" },
    { value: "final", label: "Final" },
    { value: "project", label: "Project" },
  ];

  // Logic: Hide if already exists in course.assessments, EXCEPT for Final and Project
  const availableOptions = allOptions.filter(opt => {
    if (opt.value === "final" || opt.value === "project") return true;
    const alreadyExists = course?.assessments?.some(a => a.type.toLowerCase() === opt.value);
    return !alreadyExists;
  });

  const getToday = () => new Date();

  const [formData, setFormData] = useState({
    type: availableOptions[0]?.value || "project",
    mark: "",
    date: getToday(),
    link: ""
  });

  useEffect(() => {
    if (assessmentModal.openModal && assessmentModal.status === "update") {
      setFormData({
        type: availableOptions[0]?.value || "project",
        mark: "",
        date: getToday(),
        link: ""
      });
    }
  }, [assessmentModal.openModal, assessmentModal.status]);

  const isUrlValid = (url) => {
    if (!url) return false;
    const pattern = /^(https?:\/\/)?([\w-]+\.)?google\.com(\/.*)?$/i;
    return pattern.test(url.trim());
  };

  const isDateInvalid = () => {
    if (!formData.date || !course?.startingDate) return false;
    const selected = new Date(formData.date).setHours(0, 0, 0, 0);
    const start = new Date(course.startingDate).setHours(0, 0, 0, 0);
    return selected < start;
  };

  const urlOk = isUrlValid(formData.link);
  const dateOk = !isDateInvalid();
  const canUpdate = urlOk && dateOk && formData.mark !== "" && formData.date !== null && !loading;

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    if (!canUpdate) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      setAssessmentModal({ openModal: true, status: "success" });
    } catch (err) {
      setAssessmentModal({ openModal: true, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) setAssessmentModal({ openModal: false, status: "update" });
  };

  if (!assessmentModal.openModal) return null;

  return (
    <>
      {assessmentModal.status === "update" && (
        <ModalWrapper handleClose={handleClose} loading={loading}>
          <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-white">Add Course Assessment</h3>
              <button disabled={loading} onClick={handleClose} className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 p-1 rounded-full transition-colors cursor-pointer">
                <IoMdClose size={26} />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleUpdate}>
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5 pl-1">Type</label>
                <div className="relative">
                  <select 
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none text-sm text-slate-900 dark:text-white appearance-none cursor-pointer focus:border-teal-500"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    {availableOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <CustomDatePicker label="Date" selectedDate={formData.date} onChange={(date) => setFormData({...formData, date})} />
                <div className="h-5 mt-1">
                  {!dateOk && <p className="text-xs text-orange-500 flex items-center gap-1.5 font-medium animate-pulse"><BsExclamationCircleFill size={14} /> Date is before course start.</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5 pl-1">Mark</label>
                <input 
                  type="number" 
                  placeholder="e.g. 50"
                  className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none text-sm text-slate-900 dark:text-white focus:border-teal-500"
                  value={formData.mark}
                  max={100}
                  min={1}
                  onChange={(e) => setFormData({...formData, mark: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1.5 pb-2">
                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 pl-1">Resource Link</label>
                <div className="relative flex items-center">
                  <LuLink className="absolute left-3 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="https://drive.google.com/..."
                    className={`w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-slate-900 border outline-none text-sm text-slate-900 dark:text-white transition-all ${!urlOk && formData.link ? 'border-orange-500 focus:border-orange-600' : 'border-slate-200 dark:border-slate-700 focus:border-teal-500'}`}
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                  />
                </div>
              </div>

              {/* ACTION BUTTONS AT BOTTOM RIGHT */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button type="button" disabled={loading} onClick={handleClose} className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-slate-200 dark:border-slate-700 px-5 py-2.5 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!canUpdate}
                  className={`w-full sm:w-auto inline-flex items-center justify-center rounded-lg px-5 py-2.5 bg-teal-600 text-sm font-semibold text-white shadow-sm ${canUpdate ? 'hover:bg-teal-700 cursor-pointer active:scale-95' : 'opacity-80 cursor-not-allowed'}`}
                >
                  {loading ? <><div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Adding...</> : "Add Assessment"}
                </button>
              </div>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* Success/Error States remain same as TaskModal style */}
      {assessmentModal.status === "success" && (
        <ModalWrapper handleClose={handleClose} loading={false}>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600">
              <IoMdCheckmarkCircle size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Successful!</h3>
              <p className="text-xl text-slate-500 dark:text-slate-400">Assessment has been added successfully.</p>
            </div>
            <button onClick={handleClose} className="w-full rounded-xl bg-teal-600 px-8 py-4 text-xl font-semibold text-white hover:bg-teal-700 cursor-pointer">Done</button>
          </div>
        </ModalWrapper>
      )}

      {assessmentModal.status === "error" && (
        <ModalWrapper handleClose={handleClose} loading={false}>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <BsExclamationCircleFill size={56} />
            </div>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Addition Failed</h3>
            <div className="flex flex-col sm:flex-row w-full gap-3">
              <button onClick={handleClose} className="flex-1 rounded-xl border border-slate-200 py-4 text-xl font-semibold text-slate-700 cursor-pointer">Cancel</button>
              <button onClick={() => setAssessmentModal({...assessmentModal, status: 'update'})} className="flex-1 rounded-xl bg-orange-500 py-4 text-xl font-semibold text-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-600">
                <MdRefresh size={24} /> Retry
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddAssessment;