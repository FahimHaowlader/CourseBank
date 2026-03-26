import React, { useState } from "react";
import { MdDelete, MdDeleteOutline, MdRefresh } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { useCourse } from '../Contexts/Course.Context';

const DeleteElement = () => {
  const { deleteModal, setDeleteModal, deleteItem,course } = useCourse();
  const [loading, setLoading] = useState(false);

  if (!deleteModal.openModal) return null;

  

  const handleClose = () => {
    if (!loading) setDeleteModal({ openModal: false, status: "delete" });
  };

  const handleDelete = async () => {
    setLoading(true);

    if(deleteItem.from === "material"){
      // Call your API to delete material here, using deleteItem.id and course.id
      console.log("Deleting material with ID:", deleteItem.id, "from course ID:", course.id);
    }

    if(deleteItem.from === "book"){
      // Call your API to delete book here, using deleteItem.id and course.id
      console.log("Deleting book with ID:", deleteItem.id, "from course ID:", course.id);
    }

    if(deleteItem.from === "task"){
      // Call your API to delete task here, using deleteItem.id and course.id
      console.log("Deleting task with ID:", deleteItem.id, "from course ID:", course.id);
    }
     if(deleteItem.from === "assessment"){
      // Call your API to delete assessment here, using deleteItem.id and course.id
      console.log("Deleting assessment with ID:", deleteItem.id, "from course ID:", course.id);
    }

    // Simulation logic - Replace this with your actual API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const isSuccess = Math.random() < 0.1; // 90% success rate for testing
      if (isSuccess) {
        setDeleteModal({ ...deleteModal, status: "success" });
      } else {
        setDeleteModal({ ...deleteModal, status: "error" });
      }
    } catch (error) {
      setDeleteModal({ ...deleteModal, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Reusing the exact layout structure from your AddBook ModalWrapper
  const ModalWrapper = ({ children }) => (
    <div className="fixed inset-0 z-[9999] overflow-y-auto" role="dialog">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900/40 transition-opacity backdrop-blur-sm" 
          onClick={handleClose}
        ></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
        <div className="relative inline-block align-bottom bg-white dark:bg-card-dark rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full border border-border-light dark:border-border-dark">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. CONFIRMATION MODE */}
      {deleteModal.status === "delete" && (
        <ModalWrapper>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600">
              <MdDelete size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Delete Item?</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="font-bold text-text-main dark:text-white">{deleteItem.name}</span> {" "} from {" "} <span className="font-bold text-text-main dark:text-white">{deleteItem.from}</span> ? 
                This action cannot be undone.
              </p>
            </div>
            <div className="flex w-full gap-6 mt-8">
              <button
                disabled={loading}
                onClick={handleClose}
                className="flex-1 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 flex items-center justify-center rounded-xl bg-rose-600 py-4 text-xl font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors cursor-pointer disabled:opacity-80"
              >
                {loading ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <MdDeleteOutline size={28} className="mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* 2. SUCCESS MODE */}
      {deleteModal.status === "success" && (
        <ModalWrapper>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-teal-600">
              <IoMdCheckmarkCircle size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Successfully Deleted!</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
            <span className="font-bold text-text-main dark:text-white">{deleteItem.name} </span> has been removed from your course successfully.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-teal-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* 3. ERROR MODE */}
      {deleteModal.status === "error" && (
        <ModalWrapper>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500">
              <BsExclamationCircleFill size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Deletion Failed</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                An unexpected error occurred while deleting <span className="font-bold text-text-main dark:text-white">{deleteItem.name}</span>.
              </p>
            </div>
            <div className="flex w-full gap-6 mt-8">
              <button 
                onClick={handleClose} 
                className="flex-1 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 py-4 text-xl font-semibold text-text-main dark:text-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => setDeleteModal({ ...deleteModal, status: "delete" })} 
                className="flex-1 rounded-xl bg-orange-500 py-4 text-xl font-semibold text-white flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-600"
              >
                <MdRefresh size={24} /> Retry
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default DeleteElement;