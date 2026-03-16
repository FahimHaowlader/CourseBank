import React from 'react';
import { IoMdClose, IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";

const UpdateHandbook = ({ handbookModal, setHandbookModal }) => {
  const handleClose = () => setHandbookModal({ openModal: false, status: "update" });
  const handleUpdate = () => setHandbookModal({ openModal: true, status: "success" });
  const handleRetry = () => setHandbookModal({ openModal: true, status: "update" });

  if (!handbookModal.openModal) return null;

  // Consistent wrapper matching the Course Info and Description modals
  const ModalWrapper = ({ children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative w-full sm:max-w-lg md:min-w-3xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* 1. EDIT MODE */}
      {handbookModal.status === "update" && (
        <ModalWrapper>
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Course Handbook</h3>
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><IoMdClose size={26} /></button>
          </div>
          
          <div className="p-8 pt-5">
            <label className="block text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">Course Handbook</label>
            <input
              className="w-full h-11 pl-4 pr-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 outline-none text-sm text-slate-900 dark:text-white"
              placeholder="e.g. https://example.com/book.pdf"
              type="url"
              name="handbook"
            />
          </div>

          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/30 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-700">
            <button onClick={handleClose} className="px-5 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
            <button onClick={handleUpdate} className="px-5 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer">Update</button>
          </div>
        </ModalWrapper>
      )}

      {/* 2. SUCCESS MODE */}
      {handbookModal.status === "success" && (
        <ModalWrapper>
          <div className="p-10 text-center flex flex-col items-center">
            <div className="text-teal-600 mb-6"><IoMdCheckmarkCircle size={80} /></div>
            <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Successful!</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Course Handbook has been successfully updated.</p>
            <button onClick={handleClose} className="w-full max-w-sm py-4 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors cursor-pointer">Done</button>
          </div>
        </ModalWrapper>
      )}

      {/* 3. ERROR MODE */}
      {handbookModal.status === "error" && (
        <ModalWrapper>
          <div className="p-10 text-center flex flex-col items-center">
            <div className="text-orange-500 mb-6"><BsExclamationCircleFill size={80} /></div>
            <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Update Failed</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Please check your connection and try again.</p>
            <div className="flex gap-4 w-full max-w-sm">
              <button onClick={handleClose} className="flex-1 py-4 border border-slate-200 rounded-xl font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={handleRetry} className="flex-1 py-4 bg-orange-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                <MdRefresh size={20}/> Retry
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default UpdateHandbook;