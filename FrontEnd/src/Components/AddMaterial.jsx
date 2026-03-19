import React from "react";
import { IoMdClose, IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlinePersonSearch, MdRefresh } from "react-icons/md";
import { LuLink } from "react-icons/lu";
import { BsExclamationCircleFill } from "react-icons/bs";

import { useCourse } from '../Contexts/Course.Context';

const AddMaterial = () => {
  const { handleUpdateInfo, materialModal, setMaterialModal } = useCourse();
  const handleClose = () => setMaterialModal({ ...materialModal, openModal: false });
  const handleSuccess = () => setMaterialModal({ openModal: true, status: "success" });
  const handleRetry = () => setMaterialModal({ openModal: true, status: "update" });

  if (!materialModal.openModal) return null;

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
      {/* 1. ADD MODE */}
      {materialModal.status === "update" && (
        <ModalWrapper>
          <div className="px-6 py-5 border-b border-border-light dark:border-border-dark flex justify-between items-center">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Add Course Material</h3>
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <IoMdClose size={26} />
            </button>
          </div>
          <div className="p-8 pt-5 space-y-6">
            <label className="flex flex-col gap-1.5 w-full">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Material Name</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary"><MdOutlinePersonSearch size={20} /></span>
                <input type="text" placeholder="e.g. Lecture Notes" className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border-0 focus:ring-0 text-sm" />
              </div>
            </label>
            <label className="flex flex-col gap-1.5 w-full">
              <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Resource Link</span>
              <div className="relative flex items-center w-full border border-border-light dark:border-border-dark rounded-lg">
                <span className="absolute left-3 text-text-secondary"><LuLink size={20} /></span>
                <input type="url" placeholder="https://example.com/material" className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border-0 focus:ring-0 text-sm" />
              </div>
            </label>
          </div>
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-border-light dark:border-border-dark">
            <button onClick={handleClose} className="px-5 py-2 rounded-lg border border-border-light dark:border-border-dark text-sm font-medium hover:bg-slate-100 transition-colors cursor-pointer">Cancel</button>
            <button onClick={handleSuccess} className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer">Add Material</button>
          </div>
        </ModalWrapper>
      )}

      {/* 2. SUCCESS MODE */}
      {materialModal.status === "success" && (
        <ModalWrapper>
          <div className="p-10 text-center flex flex-col items-center">
            <div className="mb-6 text-primary"><IoMdCheckmarkCircle size={80} /></div>
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-2">Successful!</h3>
            <p className="text-xl text-text-secondary dark:text-gray-400 mb-8">Course Material has been added successfully.</p>
            <button onClick={handleClose} className="w-full max-w-sm rounded-xl bg-primary py-4 text-white font-semibold hover:bg-primary-hover transition-colors cursor-pointer">Done</button>
          </div>
        </ModalWrapper>
      )}

      {/* 3. ERROR MODE */}
      {materialModal.status === "error" && (
        <ModalWrapper>
          <div className="p-10 text-center flex flex-col items-center">
            <div className="mb-6 text-orange-500"><BsExclamationCircleFill size={80} /></div>
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-2">Addition Failed</h3>
            <p className="text-xl text-text-secondary dark:text-gray-400 mb-8">Please check your connection and try again.</p>
            <div className="flex gap-4 w-full max-w-sm">
              <button onClick={handleClose} className="flex-1 py-4 rounded-xl border border-border-light dark:border-border-dark font-semibold">Cancel</button>
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

export default AddMaterial;