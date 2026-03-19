
import React from 'react'


import { IoMdClose } from "react-icons/io";
import { MdOutlinePersonSearch } from "react-icons/md";
import {IoMdCheckmarkCircle} from "react-icons/io";


import CustomDatePicker from './CustomDatePicker';
import Department from './Department';
import { useCourse } from '../Contexts/Course.Context';

    const UpdateInstructorInfo = () => {

  const { handleUpdateInfo, instructorModal, setInstructorModal } = useCourse();
  // Close modal handler
  const handleClose = () => setInstructorModal(false);
  const handleUpdate = () => {
    // Simulate API call and show success modal
    setInstructorModal({ openModal: true, status: "success" });
    // In a real implementation, you would make an API call here and set the status based on the response
  };

  return (
    <>
    {
      instructorModal.openModal &&  instructorModal.status === "update"  &&  <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
    >
      {/* Background Overlay */}
      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-slate-900/40 transition-opacity backdrop-blur-sm"
          onClick={handleClose}
        ></div>

        {/* Modal Panel - Changed 'inline-block' to 'flex flex-col' for stability */}
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl text-left shadow-2xl transform transition-all sm:my-8 sm:max-w-lg sm:min-w-2xl md:min-w-3xl w-full border border-slate-200 dark:border-slate-700 overflow-visible">
          
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-slate-100 dark:border-slate-700 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-white" id="modal-title">
                Edit Instructor Info
              </h3>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-500 focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-700 p-1 rounded-full cursor-pointer transition-colors"
                type="button"
              >
                <IoMdClose size={26} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-4 py-5 sm:p-6 sm:pt-4 space-y-5">
            {/* Instructor Name */}
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
                  placeholder="e.g. Dr. Sarah Jenkins"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:outline-none text-sm transition-all text-slate-900 dark:text-white"
                />
              </div>
            </label>
            
            {/* Department Component */}
            <div className="w-full">
               <Department />
            </div>

            {/* Date Picker Component */}
            <div className="w-full">
              <CustomDatePicker label="Course Start" />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 dark:bg-slate-700/30 px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:justify-end border-t border-slate-100 dark:border-slate-700 gap-3 rounded-b-2xl">
            <button
              onClick={handleClose}
              className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm px-4 py-2 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              type="button"
            >
              Cancel
            </button>
            <button
              className="w-full sm:w-auto inline-flex justify-center rounded-lg shadow-sm px-4 py-2 bg-teal-600 text-sm font-medium text-white hover:bg-teal-700 transition-colors cursor-pointer"
              type="button"
               onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    }

    {
      instructorModal.openModal &&  instructorModal.status === "success" && <div
            aria-labelledby="modal-title"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
          >
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"></div>
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
              <div className="flex flex-col items-center gap-8 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-[56px]">
                      <IoMdCheckmarkCircle />
                  </span>
                </div>
                <div className="space-y-4">
                  <h3
                    className="text-4xl font-bold text-text-main dark:text-white"
                    id="modal-title"
                  >
                     Successfully Changed!
                  </h3>
                  <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                   Instructor information has been successfully updated.
                  </p>
                </div>
                <div className="w-full mt-4">
                  <button className="w-full rounded-xl bg-primary px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-primary/50 transition-colors cursor-pointer"
                  onClick={handleClose}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
    }

    {
      instructorModal.openModal &&  instructorModal.status === "error" &&  <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
      >
        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"></div>
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400">
              <span className="material-symbols-outlined text-[56px]">
                <BsExclamationCircleFill/>
              </span>
            </div>
            <div className="space-y-1">
              <h3
                className="text-4xl font-bold text-text-main dark:text-white"
                id="modal-title"
              >
                Changes Failed
              </h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                {/* An unexpected error occurred while trying to delete{" "}
                <span className="font-bold text-text-main dark:text-white">
                  Introduction to Computer Science
                </span>
                . */}
                <br className="hidden sm:block" />
                Please check your connection and try again.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-6 mt-4">
              <button className="flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none  focus:ring-primary/50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button className="flex w-full items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none  focus:ring-orange-500/50 transition-colors cursor-pointer">
               <MdRefresh size={24} className="inline-block mr-1 mt-1 mb-1"/>
                Retry
              </button>
            </div>
          </div>
        </div>
        </div>

    }

    
   
     </>
  );
}

export default UpdateInstructorInfo;