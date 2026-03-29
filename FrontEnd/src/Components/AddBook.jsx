import React, { useState, useEffect } from "react";
import { IoMdClose, IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlinePersonSearch, MdRefresh } from "react-icons/md";
import { LuLink, LuUser } from "react-icons/lu";
import { BsExclamationCircleFill } from "react-icons/bs";

import { useCourse } from '../Contexts/Course.Context';
import PrivateApi from "../Hooks/PrivateApi";

const ModalWrapper = ({ children, handleClose, loading }) => (
  <div className="fixed inset-0 z-9999 overflow-y-auto" role="dialog">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div 
        className="fixed inset-0 bg-slate-900/20 transition-opacity backdrop-blur-sm" 
        onClick={() => !loading && handleClose()}
      ></div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
      <div className="relative inline-block align-bottom bg-white dark:bg-slate-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:min-w-2xl md:min-w-3xl border border-slate-200 dark:border-slate-700">
        {children}
      </div>
    </div>
  </div>
);

const AddBook = () => {
  const { bookModal, setBookModal, setCourse, course } = useCourse();
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    bookName: "",
    authorName: "",
    fileUrl: ""
  });

  useEffect(() => {
    if (bookModal.openModal && bookModal.status === "update") {
      setData({ bookName: "", authorName: "", fileUrl: "" });
    }
  }, [bookModal.openModal]);

  const isValidGoogleUrl = (url) => {
    if (!url) return false;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === "google.com" || parsedUrl.hostname.endsWith(".google.com");
    } catch (e) {
      return false;
    }
  };

  const isUrlValid = isValidGoogleUrl(data.fileUrl);
  const isChanged = data.bookName.trim().length > 0 && data.authorName.trim().length > 0 && data.fileUrl.trim().length > 0;
  const canUpdate = isChanged && !loading && isUrlValid;

  const handleClose = () => {
    if (!loading) setBookModal({ openModal: false, status: "" });
  };

  const handleUpdate = async (e) => {
  if (e) e.preventDefault();
  if (!canUpdate) return;
  
  setLoading(true);
  try {
    // CAPTURE the response here
    const res = await PrivateApi.patch(`/add-new-suggested-book/${course?._id}`, {
      book: {
        title: data.bookName,
        authorName: data.authorName,
        fileUrl: data.fileUrl,
        id: Date.now() 
      }
    });

    // CHECK if the status is 200 (Success)
    // Your backend sends 200, but doesn't send "success: true"
    console.log("API Response:", res);
    if (res.data.success) {
       setCourse(prev => ({...prev, 
        books: [...(prev?.books || []), res?.data?.data?.newBook || {}] 
      }));
    }
      // CLEAR data and show success
      setData({ bookName: "", authorName: "", fileUrl: "" });
      setBookModal({ openModal: true, status: "success" });
    

  } catch (error) {
    // If the request fails entirely (Network error / 500 error)
    // console.error("Update Error:", error);
    setBookModal({ openModal: true, status: "error" });
  } finally {
    setLoading(false);
  }
};

  if (!bookModal.openModal) return null;

  return (
    <>
      {bookModal.status === "update" && (
        <ModalWrapper handleClose={handleClose} loading={loading}>
          <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-white">Add Suggested Book</h3>
              <button
                disabled={loading}
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-500 focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-700 p-1 rounded-full cursor-pointer transition-colors disabled:opacity-50"
              >
                <IoMdClose size={26} />
              </button>
            </div>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="px-4 py-5 sm:p-6 space-y-5">
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Book Name</span>
                <div className="relative flex items-center w-full">
                  <span className="absolute left-3 text-text-secondary"><MdOutlinePersonSearch size={20} /></span>
                  <input 
                    type="text" 
                    value={data.bookName}
                    onChange={(e) => setData({ ...data, bookName: e.target.value })}
                    placeholder="e.g. Introduction to Algorithms" 
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none text-sm text-text-main dark:text-white transition-all" 
                    required
                  />
                </div>
              </label>

              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Author Name</span>
                <div className="relative flex items-center w-full">
                  <span className="absolute left-3 text-text-secondary"><LuUser size={20} /></span>
                  <input 
                    type="text" 
                    value={data.authorName}
                    onChange={(e) => setData({ ...data, authorName: e.target.value })}
                    placeholder="e.g. Thomas H. Cormen" 
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark focus:border-primary focus:outline-none text-sm text-text-main dark:text-white transition-all" 
                    required
                  />
                </div>
              </label>

              <label className="flex flex-col gap-1.5 w-full relative">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">Resource Link</span>
                <div className="relative flex items-center w-full">
                  <span className="absolute left-3 text-text-secondary"><LuLink size={20} /></span>
                  <input 
                    type="text" 
                    value={data.fileUrl}
                    onChange={(e) => setData({ ...data, fileUrl: e.target.value })}
                    placeholder="https://google.com/..." 
                    className={`w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-background-dark border ${
                      !isUrlValid && data.fileUrl.length > 0 
                      ? "border-orange-500 focus:border-orange-600" 
                      : "border-border-light dark:border-border-dark focus:border-primary"
                    } focus:outline-none text-sm text-text-main dark:text-white transition-all`}
                    required
                  />
                </div>
                
                <div className="h-5 mt-1"> 
                  {!isUrlValid && data.fileUrl.length > 0 && (
                    <p className="text-xs text-orange-500 flex items-center gap-1.5 font-medium animate-in fade-in duration-200">
                      <BsExclamationCircleFill size={14} />
                      Please provide a valid Google URL.
                    </p>
                  )}
                </div>
              </label>

              <div className="px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
                <button
                  disabled={loading}
                  type="button"
                  onClick={handleClose}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-border-light dark:border-border-dark shadow-sm px-4 py-2 bg-white dark:bg-slate-800 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canUpdate}
                  className={`w-full inline-flex items-center justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white focus:outline-none sm:w-auto sm:text-sm transition-colors ${canUpdate ? "cursor-pointer hover:bg-teal-700" : "opacity-80 cursor-not-allowed"}`}
                >
                  {loading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Adding...
                    </>
                  ) : (
                    "Add Book"
                  )}
                </button>
              </div>
            </div>
          </form>
        </ModalWrapper>
      )}

      {bookModal.status === "success" && (
        <ModalWrapper handleClose={handleClose} loading={false}>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-teal-600">
              <IoMdCheckmarkCircle size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Successful!</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                Course Book has been added successfully.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-teal-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-teal-700 focus:outline-none transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </ModalWrapper>
      )}

      {bookModal.status === "error" && (
        <ModalWrapper handleClose={handleClose} loading={false}>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500">
              <BsExclamationCircleFill size={56} />
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Addition Failed</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400">Please check your connection and try again.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-6">
              <button onClick={handleClose} className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-4 text-xl font-semibold text-text-main dark:text-gray-300 cursor-pointer">
                Cancel
              </button>
              <button 
                onClick={() => setBookModal({ ...bookModal, status: "update" })} 
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

export default AddBook;