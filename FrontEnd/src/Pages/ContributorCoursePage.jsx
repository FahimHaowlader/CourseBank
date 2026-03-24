import React, { useState, useEffect } from "react";


import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdRefresh, MdDeleteOutline, MdDelete } from "react-icons/md";
import { IoCloudDoneOutline } from "react-icons/io5";

import { useAuth } from "../Contexts/Auth.Context.jsx";
import PrivateApi from "../Hooks/PrivateApi.jsx";
import CustomCourseCard from "../Components/CustomCourseCard";
import AddCourseCard from "../Components/AddCourseCard";

const ContributorCoursePage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [submitModal, setSubmitModal] = useState({
  openModal: false,
  id: null,
  title: "Submit for Review", // Default title
  status: "", // 'confirm', 'loading', 'success', 'error', 'final-submit'
});

  useEffect(() => {
    const fetchContributorCourses = async () => {
      try {
        const response = await PrivateApi.get(`/courses-by-creator/${user.userId}`);
        setCourses(response.data.data);
      } catch (error) {
        console.log("Error fetching contributor's courses:", error);
      }
    };
    if (user) fetchContributorCourses();
  }, [user]);

  const [modal, setModal] = useState({
    openModal: false,
    id: null,
    title: "",
    status: "", // 'confirm', 'loading', 'success', 'error'
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
      <span>Deleting...</span>
    </div>
  );

  const myCourseCount = user?.myCourseCount || 0; 
  // const myCourseCount = 3; 
// Assuming approvedCourseCount comes from your Auth context or User data
const approvedCourseCount = user?.approvedCourseCount || 0; 
// const approvedCourseCount = 3; 

const handleFinalizeClick = () => {
  // Check conditions: 
  // 1. Must have more than 3 courses
  // 2. Local count must match the required approved count
  if (myCourseCount <= 2 || myCourseCount !== approvedCourseCount) {
    setSubmitModal({
      openModal: true,
      status: "warning",
      title: "Requirements Not Met",
    });
  } else {
    setSubmitModal({
      openModal: true,
      status: "submit",
      title: "Final Submission",
    });
  }
};
const closeModal = () => {
  setSubmitModal({
    openModal: false,
    id: null,
    title: "",
    status: "",
    loading: false,
  });
};

  const handleFinalSubmit = async () => {
  setSubmitModal((prev) => ({ ...prev, loading: true }));
  try {
    // Replace with your actual submission endpoint
    // await PrivateApi.post(`/submit-all-courses`);

   

     // Simulate network delay
    throw new Error("Simulated submission error"); // Uncomment to test error handling

    setSubmitModal({
      openModal: true,
      status: "success",
      title: "All courses",
      loading: false,
    });
 
  } catch (error) {
    setSubmitModal((prev) => ({ ...prev, status: "error" ,loading: false}));
   
  }
};

  return (
    <div className="bg-background-light dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-5">
        
        {/* Header Section */}
        <div>
          <div className=" mb-5">
            <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text bg-primary-dark dark:bg-primary tracking-tight pb-1 font-extrabold">
              My Courses
            </h1>
            <p className="mt-2 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-0.5">
              View, add, and manage all your courses in one place.
            </p>
          </div>
          <div className="text-sm md:text-base text-text-secondary dark:text-gray-400 self-start sm:self-center mb-6 pl-1">
            You have <span className="font-bold text-text-main dark:text-white">{courses.length}</span> {courses.length === 1 ? "course" : "courses"}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CustomCourseCard key={course._id} Course={course} setModal={setModal} />
          ))}
          { user.status === "active" &&  
          <AddCourseCard />}
        </div>

        {/* --- RESTORED FEEDBACK & SUBMIT SECTION --- */}
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          {
            user.feedback ? (<div className="p-4 bg-amber-50 border-l-4 w-full border-amber-500 rounded-r-lg shadow-sm">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-amber-600 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
              </svg>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800">
                Moderator's Feedback
              </h3>
            </div>
            <p className="text-amber-900 text-sm leading-relaxed">
              The course description is well-written and provides a clear overview of the course content. However, consider adding more details about the assessment methods and grading criteria...
            </p>
          </div>):(<div className=""></div>) 
          }
          
         
          <div className="flex justify-end w-full lg:w-auto">
                 <button 
                className="w-full lg:min-w-[300px] px-6 py-4 rounded-xl 
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
          </div>
          
        </div>

        {/* --- MODALS --- */}
        {modal.openModal && (modal.status === "confirm" || modal.status === "loading") && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={modal.status !== 'loading' ? cancelDeleteCourse : null}></div>
            <div className="relative w-full max-w-3xl transform rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl border border-border-light dark:border-border-dark">
              <div className="flex flex-col items-center gap-8 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500"><MdDelete size={56} /></div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold">Delete Course?</h3>
                  <p className="text-xl text-text-secondary dark:text-gray-400">Are you sure you want to delete <span className="font-bold text-text-main dark:text-white">{modal.title}</span>?</p>
                </div>
                <div className="flex w-full gap-6 mt-8">
                  <button disabled={modal.status === "loading"} className="flex-1 py-4 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold" onClick={cancelDeleteCourse}>Cancel</button>
                  <button disabled={modal.status === "loading"} className="flex-1 py-4 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 disabled:bg-red-400" onClick={() => handleDeleteCourse(modal.id)}>
                    {modal.status === "loading" ? <AppleSpinner /> : <span className="flex justify-center items-center gap-1"><MdDeleteOutline size={26} /> Delete</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success & Error Modals (kept identical to your design) */}
        {modal.openModal && modal.status === "success" && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"></div>
              <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark">
                <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-primary/10 text-primary mb-8"><IoMdCheckmarkCircle size={56} /></div>
                <h3 className="text-4xl font-bold mb-4">Successfully Deleted!</h3>
                <p className="text-xl text-text-secondary mb-8">The course <span className="font-bold">{modal.title}</span> was removed.</p>
                <button className="w-full py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors" onClick={cancelDeleteCourse}>Done</button>
              </div>
           </div>
        )}
          {/* Error Modal with Retry Option */}
          {modal.openModal && modal.status === "error" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
            <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark">
              <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-orange-50 text-orange-500 mb-8"><BsExclamationCircleFill size={56} /></div>
              <h3 className="text-4xl font-bold mb-4">Deletion Failed</h3>
              <div className="flex w-full gap-6 mt-8">
                <button className="flex-1 py-4 rounded-xl border border-gray-200" onClick={cancelDeleteCourse}>Cancel</button>
                <button className="flex-1 py-4 rounded-xl bg-orange-500 text-white font-semibold flex items-center justify-center gap-2" onClick={() => retryDeleteCourse(modal.id)}><MdRefresh size={24} /> Retry</button>
              </div>
            </div>
          </div>
        )}


{/* --- WARNING MODAL (Requirements Not Met) --- */}
{submitModal.openModal && submitModal.status === "warning" && (
  <div aria-labelledby="modal-title" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog">
    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={cancelDeleteCourse}></div>
    <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* Warning Icon */}
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500">
          <span className="material-symbols-outlined text-[56px]">
            <BsExclamationCircleFill />
          </span>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-text-main dark:text-white" id="modal-title">
            Cannot Submit Yet
          </h3>
          <div className="text-xl text-text-secondary dark:text-gray-400 space-y-3">
            <p>To finalize your account, you must meet the following:</p>
            <ul className="text-left bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-dashed border-amber-300 inline-block mx-auto ">
            {
              myCourseCount < 3 && (<> 
                <li className={`flex items-center gap-2 text-red-500 `}>
                { '✕'+` Minimum 3 courses required to submit account`}
              </li>
               <li className={`flex items-center gap-2  text-emerald-500`}>              
                 ✓  Your course count ({myCourseCount})
              </li>
              </>
              ) 
            }
            {
              myCourseCount !== approvedCourseCount &&  myCourseCount > 2 && (<> 
                <li className={`flex items-center gap-2 text-red-500`}>
                 ✓  Must have all courses approved by moderator 
              </li>
               <li className={`flex items-center gap-2  text-emerald-500`}>              
                 ✓  Approved course count ({approvedCourseCount})
              </li>
              </>
              )
            }
             
              {/* <li className={`flex items-center gap-2  text-emerald-500`}>              
                 ✓  Approved Course Count ({approvedCourseCount})
              </li> */}
            </ul>
          </div>
        </div>

        <div className="w-full mt-8">
          <button
            className="w-full rounded-xl bg-amber-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-amber-600 transition-colors cursor-pointer"
            onClick={closeModal}
          >
            Got it, I'll fix it
          </button>
        </div>
      </div>
    </div>
  </div>
)}


{/* --- FINAL SUBMIT MODAL --- */}
{submitModal.openModal && submitModal.status === "submit" && (
  <div aria-labelledby="modal-title" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog">
    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={submitModal.status !== 'submitting' ? cancelDeleteCourse : null}></div>
    <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* Icon: Using a checkmark or upload icon */}
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 dark:text-emerald-400">
          <span className="material-symbols-outlined text-[56px]">
            <IoMdCheckmarkCircle />
          </span>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-text-main dark:text-white" id="modal-title">
            Submit for Review?
          </h3>
          <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
            You are about to submit <span className="font-bold text-text-main dark:text-white">{courses.length} courses</span> to the moderator. You won't be able to edit them until the review is complete.
          </p>
        </div>

        <div className="flex w-full gap-6 mt-8">
          <button
            disabled={submitModal.loading}
            className="flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50"
            onClick={closeModal}
          >
            Not Now
          </button>
          <button
            disabled={submitModal.loading}
            className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors cursor-pointer"
            onClick={handleFinalSubmit}
          >
            {submitModal.loading ? (
              <div className="text-white">   <AppleSpinner  /> </div>
            
            ) : (
              <span className="flex justify-center items-center gap-2">
                Confirm Submit
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      

      {/* --- SUBMIT SUCCESS MODAL --- */}
{submitModal.openModal && submitModal.status === "success" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog">
    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"></div>
    <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark transition-all">
      <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-primary/10 text-primary mb-8">
        <IoMdCheckmarkCircle size={56} />
      </div>
      <h3 className="text-4xl font-bold text-text-main dark:text-white mb-4">
        Submission Successful!
      </h3>
      <p className="text-xl text-text-secondary dark:text-gray-400 mb-8 leading-relaxed">
        Your courses have been submitted for final review. You will be notified once the moderator completes the evaluation.
      </p>
      <button 
        className="w-full py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover shadow-sm transition-colors cursor-pointer" 
        onClick={() => setSubmitModal((prev) => ({ ...prev, openModal: false, status: "",loading: false }))}
      >
        Done
      </button>
    </div>
  </div>
)}

{/* --- SUBMIT ERROR MODAL --- */}
{submitModal.openModal && submitModal.status === "error" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog">
    <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"></div>
    <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark transition-all">
      <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 mb-8">
        <BsExclamationCircleFill size={56} />
      </div>
      <h3 className="text-4xl font-bold text-text-main dark:text-white mb-4">
        Submission Failed
      </h3>
      <p className="text-xl text-text-secondary dark:text-gray-400 mb-8 leading-relaxed">
        We couldn't process your final submission. This might be due to a connection issue. Please try again.
      </p>
      <div className="flex w-full gap-6">
        <button 
          className="flex-1 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" 
          onClick={() => setSubmitModal((prev) => ({ ...prev, openModal: false, status: "",loading: false }))}
        >
          Cancel
        </button>
        <button 
          className="flex-1 py-4 rounded-xl bg-orange-500 text-white text-xl font-semibold shadow-sm hover:bg-orange-600 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer" 
          onClick={() => setSubmitModal((prev)=> ({ ...prev,openModal: true, status: "submit",loading: false }))}
        >
          <MdRefresh size={24} /> Retry
        </button>
      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
};

export default ContributorCoursePage;