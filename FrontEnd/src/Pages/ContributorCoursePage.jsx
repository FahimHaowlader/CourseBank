import React, { useState, useEffect } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdRefresh, MdDeleteOutline, MdDelete } from "react-icons/md";
import { useAuth } from "../Contexts/Auth.Context.jsx";
import PrivateApi from "../Hooks/PrivateApi.jsx";
import CustomCourseCard from "../Components/CustomCourseCard";
import AddCourseCard from "../Components/AddCourseCard";

const ContributorCoursePage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

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

  const confirmDeleteCourse = (courseId, courseTitle) => {
    // FIXED: Changed status from "error" to "confirm" so it shows the delete screen
    setModal({ openModal: true, id: courseId, title: courseTitle, status: "confirm" });
  };

  const retryDeleteCourse = (courseId) => {
    setModal((prev) => ({ ...prev, status: "confirm" }));
  };

  const cancelDeleteCourse = () => {
    setModal({ openModal: false, id: null, title: "", status: "" });
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

  // Apple Spinner SVG
  const AppleSpinner = () => (
    <div className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
        <style>{`
          .spinner_blade { transform-origin: 12px 12px; animation: spinner_fade 1s linear infinite; }
          @keyframes spinner_fade { 0% { opacity: 1; } 100% { opacity: 0; } }
        `}</style>
        {[...Array(12)].map((_, i) => (
          <rect key={i} className="spinner_blade" x="11" y="2" width="2" height="5" rx="1"
            style={{ transform: `rotate(${i * 30}deg)`, animationDelay: `${(i - 12) * 0.083}s` }}
          />
        ))}
      </svg>
      <span>Deleting...</span>
    </div>
  );

  return (
    <div className="bg-background-light dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-5">
        <div>
          <div className=" mb-5">
            <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text  bg-primary-dark dark:bg-primary tracking-tight pb-1 font-extrabold">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CustomCourseCard key={course._id} Course={course} setModal={setModal} />
          ))}
          <AddCourseCard />
        </div>

        {/* DELETE CONFIRMATION MODAL - Logic adjusted for 'loading' status */}
        {modal.openModal && (modal.status === "confirm" || modal.status === "loading") && (
          <div aria-labelledby="modal-title" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"></div>
            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
              <div className="flex flex-col items-center gap-8 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400">
                  <span className="material-symbols-outlined text-[56px]"><MdDelete /></span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-text-main dark:text-white" id="modal-title">Delete Course?</h3>
                  <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                    Are you sure you want to delete <span className="font-bold text-text-main dark:text-white">{modal.title}</span>?
                  </p>
                </div>
                <div className="flex w-full gap-6 mt-8">
                  <button className="flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" onClick={cancelDeleteCourse}>
                    Cancel
                  </button>
                  <button className="flex w-full items-center justify-center rounded-xl bg-red-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-red-600 transition-colors cursor-pointer disabled:bg-red-400" disabled={modal.status === "loading"} onClick={() => handleDeleteCourse(modal.id)}>
                    {modal.status === "loading" ? <AppleSpinner /> : <span className="material-symbols-outlined flex justify-center items-center gap-1"><MdDeleteOutline size={26} /> Delete</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS MODAL */}
        {modal.openModal && modal.status === "success" && (
          <div aria-labelledby="modal-title" aria-modal="true" className="fixed inset-0 z-50 w-full flex items-center justify-center p-4 sm:p-6" role="dialog">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"></div>
            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
              <div className="flex flex-col items-center gap-8 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-[56px]"><IoMdCheckmarkCircle /></span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-text-main dark:text-white" id="modal-title">Course Successfully Deleted!</h3>
                  <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                    The course <span className="font-bold text-text-main dark:text-white">{modal.title}</span> has been removed successfully.
                  </p>
                </div>
                <div className="w-full mt-8">
                  <button className="w-full rounded-xl bg-primary px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors cursor-pointer" onClick={cancelDeleteCourse}>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ERROR MODAL */}
        {modal.openModal && modal.status === "error" && (
          <div aria-labelledby="modal-title" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog">
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"></div>
            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
              <div className="flex flex-col items-center gap-8 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400">
                  <span className="material-symbols-outlined text-[56px]"><BsExclamationCircleFill /></span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-text-main dark:text-white" id="modal-title">Deletion Failed</h3>
                  <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                    An unexpected error occurred while trying to delete <span className="font-bold text-text-main dark:text-white">{modal.title}</span>.
                  </p>
                </div>
                <div className="flex w-full gap-6 mt-8">
                  <button className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 transition-colors cursor-pointer" onClick={cancelDeleteCourse}>
                    Cancel
                  </button>
                  <button className="flex w-full items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors cursor-pointer" onClick={() => retryDeleteCourse(modal.id)}>
                    <MdRefresh size={24} className="inline-block mr-1 mt-1 mb-1" /> Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContributorCoursePage;