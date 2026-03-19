import React, { useState } from "react";
import { IoMdClose, IoMdCheckmarkCircle, IoIosArrowDown } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";
import { LuLink } from "react-icons/lu";

import CustomDatePicker from "./CustomDatePicker";
import { useCourse } from '../Contexts/Course.Context';
const AddAssessment = () => {
  const { handleUpdateInfo, assessmentModal, setAssessmentModal } = useCourse();
  // Local state for form fields
  const [formData, setFormData] = useState({
    type: "Termtest-1",
    mark: "",
    date: null,
  });

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setAssessmentModal({ openModal: false, status: "update" });
  };

  const handleSuccess = () => setAssessmentModal({ openModal: true, status: "success" });
  const handleRetry = () => setAssessmentModal({ openModal: true, status: "update" });

  if (!assessmentModal.openModal) return null;

  const ModalWrapper = ({ children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative w-full sm:max-w-lg md:min-w-3xl bg-white dark:bg-card-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden">
        {children}
      </div>
    </div>
  );

  return (
    <>
      {assessmentModal.status === "update" && (
        <ModalWrapper>
          <div className="px-6 py-5 border-b border-border-light dark:border-border-dark flex justify-between items-center">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Add Course Assessment</h3>
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <IoMdClose size={26} />
            </button>
          </div>
          
          <div className="p-8 pt-0 space-y-6 " >
            <div>  </div>
            {/* Type Select */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5 pl-1">Type</label>
              <div className="relative">
                <select
                  className="w-full h-12 px-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark outline-none text-sm text-text-main-light dark:text-text-main-dark appearance-none cursor-pointer"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Termtest-1">Termtest-1</option>
                  <option value="Termtest-2">Termtest-2</option>
                  <option value="Termtest-3">Termtest-3</option>
                  <option value="Midterm-1">Midterm-1</option>
                  <option value="Midterm-2">Midterm-2</option>
                  <option value="Midterm-3">Midterm-3</option>
                  <option value="Quiz-1">Quiz-1</option>
                  <option value="Quiz-2">Quiz-2</option>
                  <option value="Final">Final</option>
                  <option value="Project">Project</option>
                </select>
                <IoIosArrowDown className="absolute right-3 top-4 pointer-events-none text-text-muted-light" />
              </div>
            </div>
 {/* Date Picker */}
            <div>
              <CustomDatePicker 
                label="Date" 
                selectedDate={formData.date} 
                onDateChange={(date) => setFormData({ ...formData, date })} 
              />
            </div>

            {/* Mark Input */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary dark:text-gray-400 mb-1.5 pl-1">Mark</label>
              <input
                type="number"
                className="w-full h-12 px-3 rounded-lg bg-input-bg-light dark:bg-input-bg-dark border border-border-light dark:border-border-dark outline-none text-sm text-text-main-light dark:text-text-main-dark"
                placeholder="e.g. 30"
                value={formData.mark}
                min={1}
                max={100}
                onChange={(e) => setFormData({ ...formData, mark: e.target.value })}
              />
            </div>

           
            <label className="flex flex-col gap-1.5 w-full">
                          <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Resource Link</span>
                          <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                            <span className="absolute left-3 text-text-secondary"><LuLink size={20} /></span>
                            <input type="url" placeholder="https://example.com/task" className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border-0 focus:ring-0 text-sm text-text-main dark:text-white" />
                          </div>
                        </label>
          </div>

          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-border-light dark:border-border-dark">
            <button onClick={handleClose} className="px-5 py-2 rounded-lg border border-border-light dark:border-border-dark text-sm font-medium hover:bg-slate-100 transition-colors cursor-pointer">Cancel</button>
            <button onClick={handleSuccess} className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer">Add Assessment</button>
          </div>
        </ModalWrapper>
      )}

      {/* Success and Error states follow the same ModalWrapper structure... */}
    </>
  );
};

export default AddAssessment;