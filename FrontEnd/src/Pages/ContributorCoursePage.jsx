import React, { useState, useEffect } from "react";

import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdRefresh, MdDeleteOutline, MdDelete, MdRestartAlt, 
  MdOutlineCancel,  } from "react-icons/md";

import { IoCloudDoneOutline } from "react-icons/io5";
import {IoCheckmarkCircle} from "react-icons/io5";
import { FiCheck } from 'react-icons/fi';

import { useAuth } from "../Contexts/Auth.Context.jsx";
import PrivateApi from "../Hooks/PrivateApi.jsx";
import CustomCourseCard from "../Components/CustomCourseCard";
import AddCourseCard from "../Components/AddCourseCard";
import SkeletonCard from "../Components/SkeletonCard.jsx";

const ContributorCoursePage = () => {
  // Destructure refreshUser from your Auth Context to sync data after API calls
  const { user, refreshUser } = useAuth(); 
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [submitModal, setSubmitModal] = useState({
    openModal: false,
    id: null,
    status: "", 
    loading: false, 
  });

  useEffect(() => {
    const fetchContributorCourses = async () => {
      try {
        const response = await PrivateApi.get(`/courses-by-creator/${user.userId}`);
        setCourses(response.data.data);
      } catch (error) {
        console.log("Error fetching contributor's courses:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchContributorCourses();
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [modal, setModal] = useState({
    openModal: false,
    id: null,
    title: "",
    status: "", 
  });

  const cancelDeleteCourse = () => {
    setModal({ openModal: false, id: null, title: "", status: "" });
  };

  const retryDeleteCourse = (courseId) => {
    setModal((prev) => ({ ...prev, status: "confirm" }));
  };

  const handleDeleteCourse = async (courseId) => {
    setModal((prev) => ({ ...prev, status: "loading" }));
    try {
      // throw new Error("Testing delete error handling"); // <-- Temporary line to test error modal
      await PrivateApi.delete(`/delete-course/${courseId}`);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
      setModal((prev) => ({ ...prev, status: "success" }));
    } catch (error) {
      setModal((prev) => ({ ...prev, status: "error" }));
      console.error(`Error deleting course:`, error);
    }
  };

  const AppleSpinner = () => (
    <div className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-6 w-6 text-current" viewBox="0 0 24 24">
        <style>{`
          .spinner_blade { transform-origin: 12px 12px; animation: spinner_fade 1s linear infinite; }
          @keyframes spinner_fade { 0% { opacity: 1; } 100% { opacity: 0; } }
        `}</style>
        {[...Array(12)].map((_, i) => (
          <rect key={i} className="spinner_blade" x="11" y="2" width="2" height="6" rx="1"
            style={{ transform: `rotate(${i * 30}deg)`, animationDelay: `${(i - 12) * 0.083}s` }}
          />
        ))}
      </svg>
    </div>
  );

  const myCourseCount = user?.myCourseCount || 0; 
  
  const approvedCourseCount = user?.approvedCourseCount || 0;

  const handleFinalizeClick = () => {
    if (myCourseCount <= 2 || myCourseCount !== approvedCourseCount) {
      setSubmitModal((prev) => ({
        ...prev,
        openModal: true,
        status: "warning",
      }));
    } else {
      setSubmitModal((prev) => ({
        ...prev,
        openModal: true,
        status: "submit",
      }));
    }
  };

  const closeModal = () => {
    setSubmitModal({
      openModal: false,
      id: null,
      status: "",
      loading: false,
    });
  };

  const handleConfirmCancel = async () => {
    setSubmitModal((prev) => ({ ...prev, loading: true }));
    try {
      await PrivateApi.post(`/cancel-account-submission`);
      // throw new Error("Testing cancel error handling"); // <-- Temporary line to test error modal
      
      // FIXED: Refresh user context so user.status becomes 'active' again
      if (refreshUser) await refreshUser();

      setSubmitModal((prev) => ({ ...prev, status: "cancel-success" }));
    } catch (error) {
      setSubmitModal((prev) => ({ ...prev, status: "cancel-error" }));
    } finally {    
      setSubmitModal((prev) => ({ ...prev, loading: false }));
    };
  }

  const handleCancelClick = () => {
    setSubmitModal({
      openModal: true,
      status: "cancel",
      loading: false
    });
  };

  const handleFinalSubmit = async () => {
    setSubmitModal((prev) => ({ ...prev, loading: true }));
    try {
      // throw new Error("Testing submit error handling"); // <-- Temporary line to test error modal
      const res = await PrivateApi.post(`/submit-account`);
      
      // FIXED: Refresh user context so user.status becomes 'pending'
      if (refreshUser) await refreshUser();

      setSubmitModal((prev) => ({
        ...prev,
        openModal: true,
        status: "submit-success",
        loading: false,
      }));
    } catch (error) {
      setSubmitModal((prev) => ({ ...prev, status: "submit-error" ,loading: false}));
    }
  };

  if(loading){
    return (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
       </div>
    )
  }

  return (
    <div className="bg-background-light dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-5">
        
        <div>
          <div className=" mb-5">
            <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text bg-primary-dark dark:bg-primary tracking-tight pb-1 font-extrabold">
              My Courses
            </h1>
            <p className="mt-2 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-0.5">
              View, add, and manage all your courses in one place.
            </p>
          </div>
          {courses.length > 0 && ( 
            <div className="text-sm md:text-base text-text-secondary dark:text-gray-400 self-start sm:self-center mb-6 pl-1">
              You have <span className="font-bold text-text-main dark:text-white">{courses.length}</span> {courses.length === 1 ? "course" : "courses"}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CustomCourseCard key={course._id} Course={course} setModal={setModal} />
          ))}
          { user.status === "active" && <AddCourseCard />}
        </div>

        <div className="mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {user.feedback ? (
            <div className="p-4 bg-amber-50 border-l-4 w-full border-amber-500 rounded-r-lg shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-amber-600 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                </svg>
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800">Moderator's Feedback</h3>
              </div>
              <p className="text-amber-900 text-sm leading-relaxed">The course description is well-written...</p>
            </div>
          ) : <div className=""></div>}
          
          <div className="flex justify-end w-full lg:w-auto">
            {user.status === "active" && (
               <button 
                className="w-full lg:min-w-[300px] px-6 py-3 rounded-xl 
                           bg-emerald-600 hover:bg-emerald-700 
                           text-emerald-50 font-bold 
                           border border-emerald-500/20
                           shadow-sm shadow-emerald-900/20 
                           transition-all duration-200 
                           transform active:scale-[0.97] 
                           flex items-center justify-center gap-3 cursor-pointer"
                onClick={handleFinalizeClick}
              >
                {/* Added an icon here to match the Delete button's visual weight */}
                <span className="material-symbols-outlined "><IoCloudDoneOutline size={22}/></span>
                <span className="tracking-tight">Finalize & Submit Account</span>
              </button>
            )}
            {!(user.reviewedBy) && user.status === "pending" && (
                           <button 
  className="w-full lg:min-w-[300px] px-6 py-3 rounded-xl 
             bg-rose-600 hover:bg-rose-700/90 
             text-rose-50 font-bold 
             border border-rose-500/20
             shadow-sm shadow-rose-900/20 
             transition-all duration-200 
             transform active:scale-[0.97] 
             flex items-center justify-center gap-3 cursor-pointer"
  onClick={handleCancelClick}
>
  <span className="flex items-center justify-center">
    <MdOutlineCancel size={22}/>
  </span>
  <span className="tracking-tight">Cancel Submission</span>
</button>
            )}
            {user.reviewedBy && user?.status === 'pending' && (
               <div className="w-full lg:min-w-[400px] group relative">
    {/* Decorative Glow Effect */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
    
    <button 
      className="relative w-full px-6 py-3 rounded-xl 
                 bg-white dark:bg-slate-900
                 text-emerald-600 dark:text-emerald-400 font-bold 
                 border border-emerald-500/30
                 shadow-sm flex items-center justify-center gap-3 cursor-default"
    >
      {/* Pinging Live Indicator */}
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>

      <span className="tracking-tight uppercase text-sm">Account Submitted Successfully</span>
      
      
    </button>
  </div>
            )}
          </div>
        </div>

    {/* --- MODALS --- */}

{/* --- MODALS --- */}

{/* 1. DELETE CONFIRMATION MODAL */}
{modal.openModal && (modal.status === "confirm" || modal.status === "loading") && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div 
      className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" 
      onClick={modal.status !== 'loading' ? cancelDeleteCourse : null}
    ></div>
    <div className="relative w-full max-w-3xl transform rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl border border-border-light dark:border-border-dark">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500">
          <MdDelete size={56} />
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-text-main dark:text-white">Delete Course?</h3>
          <p className="text-xl text-text-secondary dark:text-gray-400">
            Are you sure you want to delete <span className="font-bold text-text-main dark:text-white">{modal.title}</span>?
          </p>
        </div>
        <div className="flex w-full gap-6 mt-8">
          <button 
            disabled={modal.status === "loading"} 
            className="flex-1 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-colors" 
            onClick={cancelDeleteCourse}
          >
            Cancel
          </button>
          <button 
            disabled={modal.status === "loading"} 
            className="flex-1 py-4 rounded-xl bg-red-500 text-white text-lg font-semibold hover:bg-red-600 disabled:bg-red-400 shadow-sm flex justify-center items-center transition-all active:scale-95" 
            onClick={() => handleDeleteCourse(modal.id)}
          >
            {modal.status === "loading" ? (
              <AppleSpinner />
            ) : (
              <span className="flex justify-center items-center gap-2">
                <MdDeleteOutline size={26} /> Delete
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* 2. SUCCESS MODAL */}
{modal.openModal && modal.status === "success" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"></div>
    <div className="relative w-full max-w-3xl transform rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark">
      <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 mb-8">
        <IoMdCheckmarkCircle size={56} />
      </div>
      <div className="space-y-4 mb-8">
        <h3 className="text-4xl font-bold text-text-main dark:text-white">Successfully Deleted!</h3>
        <p className="text-xl text-text-secondary dark:text-gray-400">
          The course <span className="font-bold text-text-main dark:text-white">{modal.title}</span> was removed.
        </p>
      </div>
      <button 
        className="w-full py-4 rounded-xl bg-emerald-600 text-white text-lg font-semibold hover:bg-emerald-700 shadow-sm transition-all active:scale-[0.98]" 
        onClick={cancelDeleteCourse}
      >
        Done
      </button>
    </div>
  </div>
)}

{/* 3. DELETION ERROR MODAL */}
{modal.openModal && modal.status === "error" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
    <div className="relative w-full max-w-3xl transform rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark">
      <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 mb-8">
        <BsExclamationCircleFill size={56} />
      </div>
      <div className="space-y-4 mb-8">
        <h3 className="text-4xl font-bold text-text-main dark:text-white">Deletion Failed</h3>
        <p className="text-xl text-text-secondary dark:text-gray-400">
          We encountered an issue while trying to delete  <span className="font-bold text-text-main dark:text-white"> {modal.title}</span>. Please try again.
        </p>
      </div>
      <div className="flex w-full gap-6 mt-8">
        <button 
          className="flex-1 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 transition-colors" 
          onClick={cancelDeleteCourse}
        >
          Cancel
        </button>
        <button 
          className="flex-1 py-4 rounded-xl bg-orange-500 text-white text-lg font-semibold hover:bg-orange-600 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95" 
          onClick={() => retryDeleteCourse(modal.id)}
        >
          <MdRefresh size={24} /> Retry
        </button>
      </div>
    </div>
  </div>
)}

        {/* Additional Success/Error modals follow the same pattern... */}
        {submitModal.openModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={!submitModal.loading ? closeModal : null}></div>
            <div className="relative w-full max-w-3xl transform rounded-t-3xl sm:rounded-3xl bg-white dark:bg-card-dark p-6 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark">
              
              {/* 1. WARNING MODAL (Requirements Not Met) */}
      {submitModal.status === "warning" && (
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500">
            <BsExclamationCircleFill className="text-[40px] sm:text-[56px]" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white" id="modal-title">
              Cannot Submit Yet
            </h3>
            <div className="text-base sm:text-xl text-text-secondary dark:text-gray-400 space-y-3">
              <p>To finalize your account, you must meet the following:</p>
              <ul className="text-left bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-dashed border-amber-300 inline-block mx-auto w-full sm:w-auto">
                {myCourseCount < 3 && (
                  <> 
                    <li className="flex items-start gap-2 text-red-500 text-sm sm:text-base">
                      <span className="font-bold">✕</span> Minimum of 3 courses is required to submit this account for a refix.
                    </li>
                    <li className="flex items-center gap-2 text-emerald-500 text-sm sm:text-base ml-5">              
                      ✓ Your current course count ({myCourseCount})
                    </li>
                  </>
                )}
                {myCourseCount !== approvedCourseCount && myCourseCount >= 3 && (
                  <> 
                    <li className="flex items-start gap-2 text-red-500 text-sm sm:text-base">
                      <span className="font-bold">✕</span> All courses must be approved by moderators to submit the account
                    </li>
                    <li className="flex items-center gap-2 text-emerald-500 text-sm sm:text-base ml-5">              
                      ✓Your approved count ({approvedCourseCount})
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <button
            className="w-full rounded-xl bg-amber-500 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white shadow-sm hover:bg-amber-600 transition-all active:scale-95"
            onClick={closeModal}
          >
            Got it, I'll fix it
          </button>
        </div>
      )}

               {/* 2. FINAL SUBMIT MODAL (Confirmation) */}
      {submitModal.status === "submit" && (
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500">
            <IoMdCheckmarkCircle className="text-[40px] sm:text-[56px]" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
              Submit for Review?
            </h3>
            <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
              You are about to submit <span className="font-bold text-text-main dark:text-white">{myCourseCount} courses</span>. You won't be able to edit them until the review is complete.
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
            <button
              disabled={submitModal.loading}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 disabled:opacity-50"
              onClick={closeModal}
            >
              Not Now
            </button>
            <button
              disabled={submitModal.loading}
              className="w-full rounded-xl bg-emerald-600 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 flex justify-center items-center"
              onClick={handleFinalSubmit}
            >
              {submitModal.loading ? <AppleSpinner /> : "Confirm Submit"}
            </button>
          </div>
        </div>

      )}

              {/* ... Other modal states (submit-success, submit-error, cancel, etc.) kept as in your original ... */}
              {/* 3. SUCCESS MODAL */}
      {submitModal.status === "submit-success" && (
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IoMdCheckmarkCircle size={56} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
              Submission Successful!
            </h3>
            <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
              Your courses have been submitted for final review. We will notify you once complete.
            </p>
          </div>
          <button 
            className="w-full py-3 sm:py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover shadow-sm transition-all active:scale-95" 
            onClick={() => setSubmitModal({ openModal: false, status: "", loading: false })}
          >
            Done
          </button>
        </div>
      )}

              {/* 4. ERROR MODAL */}
      {submitModal.status === "submit-error" && (
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500">
            <BsExclamationCircleFill size={56} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
              Submission Failed
            </h3>
            <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
              We couldn't process your request. Please check your connection and try again.
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
            <button 
              className="w-full py-3 sm:py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg sm:text-xl font-semibold text-text-main hover:bg-gray-50" 
              onClick={closeModal}
            >
              Cancel
            </button>
            <button 
              className="w-full py-3 sm:py-4 rounded-xl bg-orange-500 text-white text-lg sm:text-xl font-semibold shadow-sm hover:bg-orange-600 flex items-center justify-center gap-2 transition-all active:scale-95" 
              onClick={() => setSubmitModal(prev => ({ ...prev, status: "submit", loading: false }))}
            >
              <MdRefresh size={24} /> Retry
            </button>
          </div>
        </div>
      )}

               {/* --- cencel SUBMISSION MODAL --- */}
{submitModal.status === "cancel" && (
  <div className="flex flex-col items-center gap-6 sm:gap-8">
    {/* Icon: Using a Warning/Undo style icon */}
    <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500">
      <MdRestartAlt className="text-[40px] sm:text-[56px]" />
    </div>
    
    <div className="space-y-4">
      <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
        Cancel Submission?
      </h3>
      <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
        This will move your account back to <span className="font-bold text-rose-600">Active mode</span>. 
        Your courses will no longer be under review, and you will need to submit again later.
      </p>
    </div>

    <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
      {/* Secondary Action: Stay Pending */}
      <button
        disabled={submitModal.loading}
        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        onClick={closeModal}
      >
        Keep Under Review
      </button>
      
      {/* Primary Action: Confirm Cancel */}
      <button
        disabled={submitModal.loading}
        className="w-full rounded-xl bg-rose-600 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white shadow-sm hover:bg-rose-700 disabled:opacity-50 flex justify-center items-center gap-2 transition-all active:scale-95"
        onClick={handleConfirmCancel} // This function calls your "cancel" API
      >
        {submitModal.loading ? (
          <AppleSpinner />
        ) : (
          <>
            <MdOutlineCancel size={24} />
            Confirm Cancel
          </>
        )}
      </button>
    </div>
  </div>
)}

              {/* --- CANCEL SUCCESS MODAL --- */}
{submitModal.status === "cancel-success" && (
  <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
    <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500">
      <MdRestartAlt className="text-[40px] sm:text-[56px]" />
    </div>
    <div className="space-y-2">
      <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
        Submission Cancelled
      </h3>
      <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
        Your request has been withdrawn. Your account is now back in <span className="font-bold text-rose-600">Active mode</span> and you can edit your courses again.
      </p>
    </div>
    <button 
      className="w-full py-3 sm:py-4 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 shadow-sm transition-all active:scale-95" 
      onClick={() => setSubmitModal({ openModal: false, status: "", loading: false })}
    >
      Done
    </button>
  </div>
)}
      {/* --- CANCEL ERROR MODAL --- */}
              {submitModal.status === "cancel-error" && (
  <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
    <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500">
      <BsExclamationCircleFill className="text-[40px] sm:text-[56px]" />
    </div>
    <div className="space-y-2">
      <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
        Cancellation Failed
      </h3>
      <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
        We encountered an error while trying to withdraw your submission. Your account is still under review.
      </p>
    </div>
    <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
      <button 
        className="w-full py-3 sm:py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg sm:text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 transition-colors" 
        onClick={closeModal}
      >
        Close
      </button>
      <button 
        className="w-full py-3 sm:py-4 rounded-xl bg-orange-500 text-white text-lg sm:text-xl font-semibold shadow-sm hover:bg-orange-600 flex items-center justify-center gap-2 transition-all active:scale-95" 
        onClick={() => setSubmitModal(prev => ({ ...prev, status: "cancel", loading: false }))}
      >
        <MdRefresh size={24} /> Retry
      </button>
    </div>
  </div>
)}

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContributorCoursePage;