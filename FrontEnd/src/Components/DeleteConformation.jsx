import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";

const DeleteConformation = () => {
  return (
    // <div
    //   aria-labelledby="modal-title"
    //   aria-modal="true"
    //   className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    //   role="dialog"
    // >
    //   <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"></div>
    //   <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
    //     <div className="flex flex-col items-center gap-8 text-center">
    //       <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400">
    //         <span className="material-symbols-outlined text-[56px]">
    //           <MdDelete />
    //         </span>
    //       </div>
    //       <div className="space-y-4">
    //         <h3
    //           className="text-4xl font-bold text-text-main dark:text-white"
    //           id="modal-title"
    //         >
    //           Delete Course?
    //         </h3>
    //         <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
    //           Are you sure you want to delete
    //           <span className="font-bold text-text-main dark:text-white">
    //             Introduction to Computer Science
    //           </span>
    //           ?
    //         </p>
    //       </div>
    //       <div className="flex w-full gap-6 mt-8">
    //         <button className="flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-primary/50 transition-colors cursor-pointer">
    //           Cancel
    //         </button>
    //         <button className="flex w-full items-center justify-center rounded-xl bg-red-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none  focus:ring-red-500/50 transition-colors cursor-pointer">
    //            <span className="material-symbols-outlined pr-1">
    //           <MdDeleteOutline size={26}/>
    //         </span>
    //           Delete
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div
    //   aria-labelledby="modal-title"
    //   aria-modal="true"
    //   className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    //   role="dialog"
    // >
    //   <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"></div>
    //   <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
    //     <div className="flex flex-col items-center gap-8 text-center">
    //       <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400">
    //         <span className="material-symbols-outlined text-[56px]">
    //           <BsExclamationCircleFill/>
    //         </span>
    //       </div>
    //       <div className="space-y-4">
    //         <h3
    //           className="text-4xl font-bold text-text-main dark:text-white"
    //           id="modal-title"
    //         >
    //           Deletion Failed
    //         </h3>
    //         <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
    //           An unexpected error occurred while trying to delete{" "}
    //           <span className="font-bold text-text-main dark:text-white">
    //             Introduction to Computer Science
    //           </span>
    //           .
    //           <br className="hidden sm:block" />
    //           Please check your connection and try again.
    //         </p>
    //       </div>
    //       <div className="flex w-full gap-6 mt-8">
    //         <button className="flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none  focus:ring-primary/50 transition-colors cursor-pointer">
    //           Cancel
    //         </button>
    //         <button className="flex w-full items-center justify-center rounded-xl bg-red-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none  focus:ring-red-500/50 transition-colors cursor-pointer">
    //          <MdRefresh size={24} className="inline-block mr-1 mt-1 mb-1"/>
    //           Retry
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
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
              Course Successfully Deleted!
            </h3>
            <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
              The course{" "}
              <span className="font-bold text-text-main dark:text-white">
                Introduction to Computer Science
              </span>{" "}
              has been removed successfully.
            </p>
          </div>
          <div className="w-full mt-8">
            <button className="w-full rounded-xl bg-primary px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-primary/50 transition-colors cursor-pointer">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConformation;
