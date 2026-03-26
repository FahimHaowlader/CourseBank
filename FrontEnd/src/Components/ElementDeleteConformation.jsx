import React, { useRef, useEffect } from 'react';
import { MdDeleteOutline, MdDelete, MdRefresh } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { useCourse } from '../Contexts/Course.Context';

const ElementDeleteConfirmation = ({data,deleteFunction}) => {
 const { deleteModal, setDeleteModal } = useCourse();
 const { openModal, status } = deleteModal;
 const taskName = data ? data.name : "this item";
 const state = status === "delete" ? "confirm" : status === "error" ? "error" : "success";

 const onClose = () => {
  setDeleteModal({ openModal: false, status: "" });
 };

 if (!openModal) return null; 

  // Configuration for different states based on your theme
  const configs = {
    confirm: {
      icon: <MdDelete size={56} />,
      iconBg: "bg-rose-50 dark:bg-rose-900/20 text-rose-600",
      title: "Delete Task?",
      message: <>Are you sure you want to delete <span className="font-bold text-text-main dark:text-white">{taskName}</span>?</>,
      actionBtn: "bg-rose-600 hover:bg-rose-700",
      actionText: "Delete",
      actionIcon: <MdDeleteOutline size={28} className="mr-2" />
    },
    error: {
      icon: <BsExclamationCircleFill size={56} />,
      iconBg: "bg-amber-50 dark:bg-amber-900/20 text-amber-500",
      title: "Deletion Failed",
      message: <>An unexpected error occurred while deleting <span className="font-bold text-text-main dark:text-white">{taskName}</span>. Please check your connection.</>,
      actionBtn: "bg-rose-600 hover:bg-rose-700",
      actionText: "Retry",
      actionIcon: <MdRefresh size={26} className="mr-2" />
    },
    success: {
      icon: <IoMdCheckmarkCircle size={56} />,
      iconBg: "bg-primary/10 dark:bg-primary/20 text-primary",
      title: "Successfully Deleted!",
      message: <><span className="font-bold text-text-main dark:text-white">{taskName}</span> has been removed successfully.</>,
      actionBtn: "bg-primary hover:bg-primary-hover",
      actionText: "Done",
      actionIcon: null
    }
  };

  const config = configs[state];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>

      {/* Modal Content */}
      <div 
        
        className="relative w-full max-w-3xl transform rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl border border-border-light dark:border-border-dark"
      >
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Dynamic Icon */}
          <div className={`flex h-28 w-28 items-center justify-center rounded-full ${config.iconBg}`}>
            {config.icon}
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-text-main dark:text-white">{config.title}</h3>
            <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
              {config.message}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-6 mt-8">
            {state !== 'success' && (
              <button 
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
            
            <button 
              className={`flex w-full items-center justify-center rounded-xl px-8 py-4 text-xl font-semibold text-white shadow-sm transition-colors ${config.actionBtn}`}
              onClick={state === 'success' ? onClose : undefined}
            >
              {config.actionIcon}
              {config.actionText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementDeleteConfirmation;