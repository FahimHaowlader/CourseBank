import React, { useState, useEffect } from 'react';
import { IoMdClose, IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import { useCourse } from '../Contexts/Course.Context';

const UpdateDescription = () => {
  const { 
    course, 
    descriptionModal, 
    setDescriptionModal 
  } = useCourse();

  // 1. Local state to hold the text you are typing
  const [description, setDescription] = useState("");

  // 2. Sync local state with course data ONLY when the modal opens
  useEffect(() => {
    if (descriptionModal.openModal && descriptionModal.status === "update") {
      setDescription(course?.description || "");
    }
  }, [descriptionModal.openModal, course]);

  const handleClose = () => setDescriptionModal({ openModal: false, status: "update" });
  
  const handleUpdate = (e) => {
    // If this were a form, we'd use e.preventDefault()
    console.log("Saving to Database:", description);
    
    // Switch to success view
    setDescriptionModal({ openModal: true, status: "success" });
  };

  const handleRetry = () => setDescriptionModal({ openModal: true, status: "update" });

  if (!descriptionModal.openModal) return null;

  // Design-consistent Wrapper
  const ModalWrapper = ({ children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative w-full sm:max-w-lg md:min-w-3xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* 1. EDIT MODE */}
      {descriptionModal.status === "update" && (
        <ModalWrapper>
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Update Course Description</h3>
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <IoMdClose size={26} />
            </button>
          </div>
          
          <div className="p-6">
            <textarea
              // value + onChange allows you to type freely
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 outline-none transition-all text-sm h-60 resize-none text-slate-900 dark:text-white"
              placeholder="Provide a detailed overview of the course objectives..."
            ></textarea>
            
            {/* Optional: Character counter to show state is working */}
            <div className="text-right text-xs text-slate-400 mt-2">
              {description.length} characters
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/30 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-700">
            <button 
              onClick={handleClose} 
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdate} 
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors cursor-pointer"
            >
              Update
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* 2. SUCCESS MODE */}
      {descriptionModal.status === "success" && (
        <ModalWrapper>
          <div className="p-10 text-center flex flex-col items-center">
            <div className="mb-6 text-teal-600">
              <IoMdCheckmarkCircle size={80} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Successful!</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Course Description has been updated successfully.</p>
            <button onClick={handleClose} className="w-full rounded-xl bg-teal-600 py-4 text-white font-semibold hover:bg-teal-700 transition-colors cursor-pointer">Done</button>
          </div>
        </ModalWrapper>
      )}

      {/* 3. ERROR MODE */}
      {descriptionModal.status === "error" && (
        <ModalWrapper>
          <div className="p-10 text-center flex flex-col items-center">
            <div className="mb-6 text-orange-500">
              <BsExclamationCircleFill size={80} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Changes Failed</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Please check your connection and try again.</p>
            <div className="flex gap-4 w-full">
              <button onClick={handleClose} className="flex-1 py-4 rounded-xl border border-slate-200 font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={handleRetry} className="flex-1 py-4 rounded-xl bg-orange-500 text-white font-semibold flex items-center justify-center gap-2">
                <MdRefresh size={20} /> Retry
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default UpdateDescription;