import React from "react";
import { MdDelete, MdDeleteOutline, MdRefresh } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";

const DeleteElement = ({ deleteModal, setDeleteModal, handleDelete, itemName }) => {
  // Helper to close the modal and reset to default delete state
  const handleClose = () => setDeleteModal({ openModal: false, status: "delete" });

  // Do not render if the modal is not active
  if (!deleteModal.openModal) return null;

  // Shared Modal Container for consistent sizing/backdrop
  const ModalWrapper = ({ children }) => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative w-full sm:max-w-lg md:min-w-[480px] bg-white dark:bg-card-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden transform transition-all">
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* 1. DELETE CONFIRMATION MODE */}
      {deleteModal.status === "delete" && (
        <ModalWrapper>
          <div className="p-10 text-center flex flex-col items-center">
            <div className="mb-6 h-24 w-24 flex items-center justify-center rounded-full bg-red-50 dark:bg-orange-900/20 text-red-500">
              <MdDelete size={60} />
            </div>
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-2">Delete Item?</h3>
            <p className="text-xl text-text-secondary dark:text-gray-400 mb-8">
              Are you sure you want to delete <span className="font-bold text-text-main dark:text-white">{itemName}</span>? This action cannot be undone.
            </p>
            <div className="flex w-full gap-4">
              <button onClick={handleClose} className="flex-1 py-4 rounded-xl border border-border-light dark:border-border-dark font-semibold text-text-main dark:text-slate-300 hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
              <button onClick={() => handleDelete(itemName)} className="flex-1 py-4 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <MdDeleteOutline size={20}/> Delete
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* 2. SUCCESS MODE */}
      {deleteModal.status === "success" && (
        <ModalWrapper>
          <div className="p-10 text-center flex flex-col items-center">
            <div className="mb-6 text-primary"><IoMdCheckmarkCircle size={80} /></div>
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-2">Successfully Deleted!</h3>
            <p className="text-xl text-text-secondary dark:text-gray-400 mb-8">{itemName} has been removed successfully.</p>
            <button onClick={handleClose} className="w-full max-w-sm rounded-xl bg-primary py-4 text-white font-semibold hover:bg-primary-hover transition-colors cursor-pointer">Done</button>
          </div>
        </ModalWrapper>
      )}

      {/* 3. ERROR MODE */}
      {deleteModal.status === "error" && (
        <ModalWrapper>
          <div className="p-10 text-center flex flex-col items-center">
            <div className="mb-6 text-orange-500"><BsExclamationCircleFill size={80} /></div>
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-2">Deletion Failed</h3>
            <p className="text-xl text-text-secondary dark:text-gray-400 mb-8">An unexpected error occurred. Please try again.</p>
            <div className="flex gap-4 w-full max-w-sm">
              <button onClick={handleClose} className="flex-1 py-4 rounded-xl border border-border-light dark:border-border-dark font-semibold text-text-main dark:text-slate-300 cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-4 rounded-xl bg-orange-500 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer">
                <MdRefresh size={20} /> Retry
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default DeleteElement;