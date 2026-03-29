import React, { useState, useEffect } from 'react';
import { IoMdClose, IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import { useCourse } from '../Contexts/Course.Context';
import PrivateApi from '../Hooks/PrivateApi';

// Stable Wrapper outside to prevent re-mounting and focus loss while typing
const ModalWrapper = ({ children, handleClose, loading }) => (
  <div
    aria-labelledby="modal-title"
    aria-modal="true"
    className="fixed inset-0 z-50 overflow-y-auto"
    role="dialog"
  >
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-slate-900/20 transition-opacity backdrop-blur-sm"
        onClick={() => !loading && handleClose()}
      ></div>
      <span aria-hidden="true" className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
      <div className="relative inline-block align-bottom bg-white dark:bg-slate-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:min-w-2xl md:min-w-3xl border border-slate-200 dark:border-slate-700">
        {children}
      </div>
    </div>
  </div>
);

const UpdateHandbook = () => {
  const [loading, setLoading] = useState(false);
  const { course, handbookModal, setHandbookModal, setCourse } = useCourse();
  
  const [handbook, setHandbook] = useState("");

  useEffect(() => {
    if (handbookModal.openModal && handbookModal.status === "update") {
      setHandbook(course?.handbook || "");
    }
  }, [handbookModal.openModal, course]);

  const isValidGoogleUrl = (url) => {
    if (!url) return false;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === "google.com" || parsedUrl.hostname.endsWith(".google.com");
    } catch (e) {
      return false;
    }
  };

  const isUrlValid = isValidGoogleUrl(handbook);
  const isChanged = handbook !== (course?.handbook || "");
  const canUpdate = isChanged && !loading && isUrlValid;

  const handleClose = () => {
    if (!loading) {
      setHandbookModal({ openModal: false, status: "" });
    }
  };

  const handleUpdate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!canUpdate || loading) return;

    setLoading(true);
    try {
      const res = await PrivateApi.patch(`/update-course-handbook/${course._id}`, { handbook });
      if (res.data.success) {
        setCourse((prev) => ({
          ...prev,
          handbook: handbook 
        }));
        setHandbookModal((prev) => ({ ...prev, status: "success" }));
      } 
    } catch (error) {
      setHandbookModal((prev) => ({ ...prev, status: "error" }));
    } finally {
      setLoading(false);
    }
  };

  if (!handbookModal.openModal) return null;

  return (
    <>
      {/* 1. EDIT MODE */}
      {handbookModal.status === "update" && (
        <ModalWrapper handleClose={handleClose} loading={loading}>
          <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-white" id="modal-title">
                Edit Course Handbook
              </h3>
              <button
                disabled={loading}
                className="text-slate-400 hover:text-slate-500 focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-700 p-1 rounded-full cursor-pointer transition-colors disabled:opacity-50"
                type="button"
                onClick={handleClose}
              >
                <IoMdClose size={26} />
              </button>
            </div>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="px-4 py-5 sm:p-6 space-y-4">
              <label className="flex flex-col gap-1.5 w-full">
                <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Handbook URL
                </span>
                <input
                  disabled={loading}
                  className={`w-full h-11 px-4 rounded-lg bg-white dark:bg-background-dark border ${
                    !isUrlValid && handbook.length > 0 
                    ? "border-orange-500 focus:border-orange-600" 
                    : "border-border-light dark:border-border-dark focus:border-primary"
                  } focus:outline-none text-text-main dark:text-white text-sm transition-all placeholder-text-secondary disabled:opacity-70`}
                  placeholder="e.g. https://google.com..."
                  type="text"
                  value={handbook}
                  onChange={(e) => setHandbook(e.target.value)}
                  required
                />
              </label>

              <div className="h-5">
                {!isUrlValid && handbook.length > 0 && (
                  <p className="text-xs text-orange-500 flex items-center gap-1.5 font-medium animate-in fade-in duration-200">
                    <BsExclamationCircleFill size={14} className="shrink-0" />
                    Please provide a valid Google URL (e.g. google.com).
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
                <button
                  disabled={loading}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-border-light dark:border-border-dark shadow-sm px-4 py-2 bg-white dark:bg-slate-800 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className={`w-full inline-flex items-center justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white focus:outline-none sm:w-auto sm:text-sm transition-colors ${canUpdate ? "cursor-pointer hover:bg-teal-700 " : "opacity-80 cursor-not-allowed"}`}
                  type="submit"
                  disabled={!canUpdate}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* 2. SUCCESS MODE */}
      {handbookModal.status === "success" && (
        <ModalWrapper handleClose={handleClose} loading={false}>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-teal-600">
              <IoMdCheckmarkCircle size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Successful!</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                Course Handbook has been successfully updated.
              </p>
            </div>
            <button
              className="w-full rounded-xl bg-teal-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-teal-700 focus:outline-none transition-colors cursor-pointer"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* 3. ERROR MODE - Design and Loading Fixed */}
      {handbookModal.status === "error" && (
        <ModalWrapper handleClose={handleClose} loading={loading}>
          <div className="p-10 sm:p-14 text-center flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500">
              <BsExclamationCircleFill size={56} />
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-bold text-text-main dark:text-white">Update Failed</h3>
              <p className="text-xl text-text-secondary dark:text-gray-400">Please check your connection and try again.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-6">
              <button 
                disabled={loading}
                onClick={handleClose} 
                className="flex-1 cursor-pointer rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-4 text-xl font-semibold text-text-main dark:text-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                disabled={loading}
                onClick={() => handleUpdate()} 
                className={`flex-1 rounded-xl bg-orange-500 py-4 text-xl font-semibold text-white flex items-center justify-center transition-all min-h-[64px] ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:bg-orange-600"}`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Retrying...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MdRefresh size={28} /> <span>Retry</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default UpdateHandbook;