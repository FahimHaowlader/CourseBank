import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

import { GrShareOption } from "react-icons/gr";
import { LuNotebook } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCloudDoneOutline } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

import AddElement from "../Components/AddElement";
import UpdateCourseInfo from "../Components/UpdateCourseInfo";
import UpdateInstructorInfo from "../Components/UpdateInstructorInfo";
import UpdateDescription from "../Components/UpdateDescription";
import UpdateHandbook from "../Components/UpdateHandbook";
import AddMaterial from "../Components/AddMaterial";
import AddBook from "../Components/AddBook";
import AddTask from "../Components/AddTask";
import AddAssessment from "../Components/AddAssessment";
import DeleteElement from "../Components/DeleteElement";
import SemesterDisplay from "../Components/semesterTransformer";
import { useCourse } from "../Contexts/Course.Context";
import CourseDetailsSkeleton from "../Components/CourseDetailsSkeleton.jsx";
import { DepartmentMap } from "../Components/DepartmentMap";
import AddFirstElement from "../Components/AddFirstElement";
import NoElement from "../Components/NoElement";
import { useAuth } from "../Contexts/Auth.Context";
import ElementDeleteConfirmation from "../Components/ElementDeleteConformation";

const CourseDetailsEditPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const from = "/my-courses"; // Default to my courses page if no previous path
  const {
    course,
    isLoading,
    addCourse,
    infoModal,
    setInfoModal,
    instructorModal,
    setInstructorModal,
    descriptionModal,
    setDescriptionModal,
    handbookModal,
    setHandbookModal,
    materialModal,
    setMaterialModal,
    bookModal,
    setBookModal,
    taskModal,
    setTaskModal,
    deleteModal,
    setDeleteModal,
    assessmentModal,
    setAssessmentModal,
    handleUpdateInfo,
    handleUpdateInstructorInfo,
    handleUpdateDescription,
    handleUpdateHandbook,
    handleUpdateMaterial,
    handleUpdateBook,
    handleUpdateTask,
    handleUpdateAssessment,
    handleDeleteElement,
    handleDelete,
    setDeleteItem,
    error,
  } = useCourse();

  // const [infoModal, setInfoModal] = useState({
  //   openModal: false,
  // });

  // const [instructorModal, setInstructorModal] = useState({
  //   openModal: false,
  //   status: "",
  // });

  // const [descriptionModal, setDescriptionModal] = useState({
  //   openModal: false,
  //   status: "",
  // });

  // const [handbookModal, setHandbookModal] = useState({
  //   openModal: false,
  //   status: "",
  // });

  // const [materialModal, setMaterialModal] = useState({
  //   openModal: false,
  //   status: "",
  // });

  // const [bookModal, setBookModal] = useState({
  //   openModal: false,
  //   status: "",
  // });

  // const [taskModal, setTaskModal] = useState({
  //   openModal: false,
  //   status: "",
  // });

  // const [deleteModal, setDeleteModal] = useState({
  //   openModal: false,
  //   status: "",
  // });

  // const [assessmentModal, setAssessmentModal] = useState({
  //   openModal: false,
  //   status: "",
  // });

  //   const handleUpdateInfo = () => {
  //     console.log("hello");
  //     setInfoModal((prev) => ({
  //       ...prev,
  //       openModal: true,
  //       status: "update",
  //     }));
  //     console.log(infoModal);
  //   };

  //   const handleUpdateInstructorInfo = () => {
  //     setInstructorModal((prev) => ({
  //       ...prev,
  //       openModal: true,
  //       status: "update",
  //     }));
  //   };

  //   const handleUpdateDescription = () => {
  //     setDescriptionModal((prev) => ({
  //       ...prev,
  //       openModal: true,
  //       status: "update",
  //     }));
  //   };

  //   const handleUpdateHandbook = () => {
  //     setHandbookModal((prev) => ({
  //       ...prev,
  //       openModal: true,
  //       status: "update",
  //     }));
  //   };

  //   const handleUpdateMaterial = () => {
  //     console.log("material");
  //     setMaterialModal((prev) => ({
  //       ...prev,
  //       openModal: true,
  //       status: "update",
  //     }));
  //   };

  //   const handleUpdateBook = () => {
  //     setBookModal((prev) => ({
  //       ...prev,
  //       openModal: true,
  //       status: "update",
  //     }));
  //   };

  //   const handleUpdateTask = () => {
  //     setTaskModal((prev) => ({
  //       ...prev,
  //       openModal: true,
  //       status: "update",
  //     }));
  //   };

  //   const handleUpdateAssessment = () => {
  //     setAssessmentModal((prev) => ({
  //       ...prev,
  //       openModal: true,
  //       status: "update",
  //     }));
  //   };

  //   const handleDeleteElement = () => {
  //       setDeleteModal((prev) => ({
  //       ...prev,
  //       openModal: true,
  //       status: "delete",
  //     }));

  //   };

  //  const handleDelete = (itemName) => {
  //       console.log("deleting", itemName);
  //       // Simulate deletion process
  //  }

   useEffect(() => {
    // 1. Try scrolling the window
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 2. Safety: Try scrolling the HTML element (for some mobile browsers)
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 3. Optional: If you have a specific container that scrolls, use:
    // document.getElementById('main-container').scrollTo({ top: 0 });
  }, []);

  const finalAssessment = course.assessments
    ? course.assessments.filter((assessment) => assessment.type === "final")
    : [];

  const nonFinalAssessments = course.assessments
    ? course.assessments.filter((assessment) => assessment.type !== "final")
    : [];
  const handleFinalizeClick = () => {
    setSubmitModal({
      openModal: true,
      title: "Submit for Review",
      status: "submit",
    });
  };

  const cancelDeleteCourse = () => {};

  const AppleSpinner = () => (
    /* Apply text-white to the container to color both the text and the SVG */
    <div className="flex items-center justify-center gap-2 text-white">
      <svg
        className="animate-spin h-6 w-6"
        viewBox="0 0 24 24"
        /* Ensure the rects inherit the currentColor from the parent div */
        fill="currentColor"
      >
        <style>{`
        .spinner_blade { transform-origin: 12px 12px; animation: spinner_fade 1s linear infinite; }
        @keyframes spinner_fade { 0% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            className="spinner_blade"
            x="11"
            y="2"
            width="2"
            height="6"
            rx="1"
            style={{
              transform: `rotate(${i * 30}deg)`,
              animationDelay: `${(i - 12) * 0.083}s`,
            }}
          />
        ))}
      </svg>
      {/* The text now inherits the white color from the container */}
      <span>Deleting...</span>
    </div>
  );

  const [submitModal, setSubmitModal] = useState({
    openModal: false,
    id: null,
    title: "Submit for Review", // Default title
    status: "", // 'confirm', 'loading', 'success', 'error', 'final-submit'
  });

  const closeModal = () => {
    setSubmitModal({
      openModal: false,
      id: null,
      title: "",
      status: "",
      loading: false,
    });
  };

  useEffect(() => {
    // If an error exists and we are no longer loading, redirect
    if (error && !isLoading) {
      navigate(from, {
        replace: true,
        state: {
          message: typeof error === "string" ? error : "Course error occurred",
        },
      });
    }
  }, [error, isLoading, navigate, from]);

  if (isLoading) {
    return (
      <div>
        <CourseDetailsSkeleton />
      </div>
    );
  }

  const handleFinalSubmit = async () => {
    setSubmitModal((prev) => ({ ...prev, loading: true }));
    try {
      // Replace with your actual submission endpoint
      // await PrivateApi.post(`/submit-all-courses`);

      // Simulate network delay
      // throw new Error("Simulated submission error"); // Uncomment to test error handling

      setSubmitModal({
        openModal: true,
        status: "success",
        title: "All courses",
        loading: false,
      });
    } catch (error) {
      setSubmitModal((prev) => ({ ...prev, status: "error", loading: false }));
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 font-sans antialiased selection:bg-teal-100 dark:selection:bg-teal-900">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
        <header className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* basic Info */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl text-transparent mb-2 bg-clip-text  bg-primary-dark dark:bg-primary tracking-tight font-extrabold">
                {course.title
                  ? course?.title?.charAt(0).toUpperCase() +
                    course.title.slice(1)
                  : ""}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                {DepartmentMap[course.department]
                  ? "Department of " + DepartmentMap[course.department]
                  : "Unknown Department"}
              </p>
              <p
                className="text-transparent bg-clip-text bg-primary-dark dark:bg-primary font-bold 
               selection:text-gray-600 dark:selection:text-gray-300 mb-6 uppercase"
              >
                {course.courseCode}
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm capitalize">
                  {/* <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span> */}
                  {course.degree}
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm capitalize">
                  {/* <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span> */}
                  {course.type}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm capitalize">
                  {/* <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span> */}
                  {course.format}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  {/* <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span> */}
                  {course.credits} Credits
                </div>

                {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  Undergraduate
                </div> */}

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  {/* <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span> */}
                  <SemesterDisplay code={11} />
                </div>
                {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  Mon/Wed 10:00 AM
                </div> */}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              {
                course.status === "draft" && (
                   <button
                className="flex w-full lg:w-auto  cursor-pointer items-center justify-center gap-2 px-6 py-2 bg-primary text-white text-lg rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
                onClick={handleUpdateInfo}
              >
                <span className="material-symbols-outlined ">
                  <FiEdit2 size={20} />
                </span>
                Edit
              </button>)
              }
            
             
              <UpdateCourseInfo />
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-8">
            <section>
              <div className="flex items-center justify-between pr-10 mb-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white ">
                  Instructor Info
                </h2>
                {
                  course.status === "draft" && (   <div
                  className="flex flex-col sm:items-center material-symbols-outlined text-slate-600 dark:text-slate-400 hover:text-primary cursor-pointer p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
                  onClick={handleUpdateInstructorInfo}
                >
                  <FiEdit2 size={22} />
                </div>)
                }
             
                <UpdateInstructorInfo
                  instructorModal={instructorModal}
                  setInstructorModal={setInstructorModal}
                />
              </div>
           

              <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* <div className="flex items-center gap-4">

                              <img

                               alt={course.instructorName}

                               className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700"

                               src={course.instructorImage.imageURL}

                             /> */}

                <div className="flex flex-col sm:items-center">
                  <h3 className="text-lg font-bold text-center text-slate-900 dark:text-white capitalize">
                    {course.instructorName}
                  </h3>

                  <p className="text-slate-500 text-center dark:text-slate-400 text-sm">
                    {DepartmentMap[course.instructorDepartment]
                      ? "Department of " +
                        DepartmentMap[course.instructorDepartment]
                      : "Unknown Department"}
                  </p>
                </div>

                {/* </div>  */}

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm">
                  <div className="flex flex-col text-center sm:text-right">
                    <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">
                      Course Start
                    </span>

                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {new Date(course.startingDate)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                      {/* 1//09/2024 */}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex  items-center justify-between pr-10 mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Course Description
                </h2>
                {/* <FiEdit2 className="text-slate-600 dark:text-slate-400 hover:text-primary cursor-pointer pb-0.5" size={22}/> */}
                        {
                  course.status === "draft" && (
                        
                <div
                  className="material-symbols-outlined text-slate-600 dark:text-slate-400 hover:text-primary cursor-pointer p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
                  onClick={handleUpdateDescription}
                >
                  <FiEdit2 size={22} />
                </div>)}
                <UpdateDescription
                  descriptionModal={descriptionModal}
                  setDescriptionModal={setDescriptionModal}
                />
              </div>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="mb-4 capitalize ">{course.description}</p>
              </div>
            </section>

            {/* Course Handbook Section */}
            <section>
              <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary dark:text-teal-300 text-2xl">
                      <LuNotebook />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      Full Course Handbook
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                      Download the complete guide including detailed policies,
                      grading rubric
                    </p>
                  </div>
                </div>

                <button
                  className="flex w-full lg:w-auto  cursor-pointer items-center justify-center gap-2 px-6 py-2 bg-primary text-white text-lg rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
                  onClick={handleUpdateHandbook}
                >
                  {course.handbook ? (
                    <>
                      <span className="material-symbols-outlined ">
                        <FiEdit2 size={20} />
                      </span>
                      Edit
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined ">
                        <AiOutlinePlus size={20} />
                      </span>
                      Add Handbook
                    </>
                  )}
                </button>
                <UpdateHandbook
                  handbookModal={handbookModal}
                  setHandbookModal={setHandbookModal}
                />
              </div>
            </section>
            {/*  Course Materials Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Course Materials
                </h2>
              </div>

              {/* FIXED LOGIC: 1 col for single item or empty, 2 cols for multiple items on md screens */}
              <div className={`grid gap-4 grid-cols-1 md:grid-cols-2`}>
                {course.materials && course.materials.length > 0 ? (
                  <>
                    {course.materials.map((material) => (
                      <div
                        key={material.id}
                        className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer min-w-0"
                      >
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="w-10 h-10 shrink-0 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                            <FaRegFilePdf size={24} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors capitalize break-all line-clamp-3 sm:line-clamp-2 pr-2">
                              {material.name || "Untitled Material"}
                            </h4>
                          </div>
                        </div>
                        <button
                          className="text-slate-400 hover:bg-red-50 hover:text-red-500 p-2 dark:hover:bg-slate-800 rounded-full transition-colors shrink-0 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModal({
                              openModal: true,
                              status: "delete",   
                            });
                            setDeleteItem({
                              id: material.id,
                              from: "materials",
                              name: material.name,
                            });
                          }}
                           >
                          <MdDeleteOutline size={26} />
                        </button>
                      </div>
                    ))}
                    {course.status === "draft" && (
                      <div
                        onClick={handleUpdateMaterial}
                        className="cursor-pointer"
                      >
                        <AddElement />
                      </div>
                    )}
                  </>
                ) : course.status === "draft" ? (
                  /* FIXED: Wrapped in col-span-full to ensure it spans the whole grid width */
                  <div className="col-span-full">
                    <AddFirstElement
                      title={"material"}
                      onAdd={handleUpdateMaterial}
                    />
                  </div>
                ) : (
                  <div className="col-span-full">
                  <NoElement title={"materials"} />
                  </div>
                )}
              </div>

              <AddMaterial
                materialModal={materialModal}
                setMaterialModal={setMaterialModal}
              />
              <DeleteElement />
            </section>

            {/* Suggested Books Section */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Suggested Books
              </h2>

              <div className="space-y-4">
                {course.books && course.books.length > 0 ? (
                  <>
                    {/* Render Book List */}

                    {course.books.map((book) => (
                      <div
                        key={book.id}
                        className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-sm transition-all min-w-0"
                      >
                        <div className="flex items-start gap-4 min-w-0 flex-1">
                          <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-800">
                            <MdOutlineMenuBook
                              size={24}
                              className="text-primary"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-white text-base break-all line-clamp-2 capitalize pr-2">
                              {book.title || "Untitled Book"}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 truncate capitalize pr-2">
                              {book.authorName || "Unknown Author"}
                            </p>
                          </div>
                        </div>
                        <button
                          className="text-slate-400 hover:bg-red-50 hover:text-red-500 cursor-pointer p-2 dark:hover:bg-slate-800 rounded-full transition-colors shrink-0 ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModal({
                              openModal: true,
                              status: "delete",   
                            });
                            setDeleteItem({
                              id: book.id,
                              from: "books",
                              name: book.title,
                            });
                          }}
                        >
                          <MdDeleteOutline size={26} />
                        </button>
                      </div>
                    ))}
                    {
                      course.status === "draft" && (
                        <div onClick={handleUpdateBook} className="cursor-pointer">
                          <AddElement />
                        </div>
                      )
                    }
                  </>
                ) : (
                  /* Empty State - Takes full width automatically in space-y-4 */
                  <AddFirstElement title={"book"} onAdd={handleUpdateBook} />
                )}
              </div>

              {/* Modals outside the list flow */}
              <AddBook bookModal={bookModal} setBookModal={setBookModal} />

            </section>
            {/* Tasks & Assignments Section */}
            <section className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Active Tasks &amp; Assignments
                </h2>
              </div>

              {/* Grid Logic: 1 column if 1 item or empty, 2 columns for 2+ items on medium screens */}
              <div className={`grid gap-4 grid-cols-1 md:grid-cols-2`}>
                {
                  course.tasks && course.tasks.length > 0 ? (
                    <>
                      {/* Render Task List */}
                      {course.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer min-w-0"
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="w-10 h-10 shrink-0 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                              <IoDocumentsOutline size={24} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors  break-all line-clamp-3 sm:line-clamp-2 capitalize pr-2">
                                {task.name || "Untitled Task"}
                              </h4>
                            </div>
                          </div>
                          <button
                            className="text-slate-400 cursor-pointer hover:bg-red-50 hover:text-red-500 p-2 dark:hover:bg-slate-800 rounded-full transition-colors shrink-0"
                             onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModal({
                              openModal: true,
                              status: "delete",   
                            });
                            setDeleteItem({
                              id: task.id,
                              from: "tasks",
                              name: task.name,
                            });
                          }}
                        >
                            <MdDeleteOutline size={26} />
                          </button>
                        </div>
                      ))}
                      {
                        course.status === "draft" && (
                          <div onClick={handleUpdateTask} className="cursor-pointer">
                            <AddElement />
                          </div>
                        )
                      }
                     
                    </>
                  
                  ) : (
                      course.status === "draft" ? (
                      <div className="col-span-full">
                      <AddFirstElement
                        title={"task"}
                        onAdd={handleUpdateTask}
                      />
                    </div>
                  ) :(
                    <div className="col-span-full">
                    <NoElement title={"tasks and assignments"} />
                    </div>
                  )

                  /* EMPTY STATE: Wrapped in col-span-full to ensure it takes the full width */
               ) }
              </div>

              {/* Modal Logic */}

              <AddTask taskModal={taskModal} setTaskModal={setTaskModal} />
            </section>
            {/* <NoElement/> */}

            {/* assessmnets  section */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Assessment Resources
              </h2>

              {course.assessments && course.assessments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {nonFinalAssessments && nonFinalAssessments.length > 0 ? (
                      <div>
                        <div className="space-y-3">
                          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-primary text-base">
                              <MdOutlineAssignment size={20} />
                            </span>
                            Term Test Questions
                          </h3>
                          {course.assessments
                            .filter((assessment) => assessment.type !== "final")
                            // Sort by date: Newest (latest) date first (Descending)
                            .sort(
                              (a, b) =>
                                new Date(a.date).getTime() -
                                new Date(b.date).getTime(),
                            )
                            .map((assessment) => (
                              <div
                                key={assessment.id}
                                className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded text-lg">
                                    <IoDocumentTextOutline size={24} />
                                  </span>
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                                      {assessment.type || "Untitled Assessment"}
                                    </p>
                                    <div className="flex items-center gap-5">
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {new Date(assessment.date)
                                          .toLocaleDateString("en-GB")
                                          .replace(/\//g, "-")}
                                      </p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                                        {assessment.mark} mark
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <button className="material-symbols-outlined  text-slate-400 hover:bg-red-50 hover:text-red-500 cursor-pointer p-2 dark:hover:bg-slate-800 rounded-full transition-colors"
                                   onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModal({
                              openModal: true,
                              status: "delete",   
                            });
                            setDeleteItem({
                              id: assessment.id,
                              from: "assessments",
                              name: assessment.type,
                            });
                          }}
                        >
                                  <MdDeleteOutline size={26} />
                                </button>
                              </div>
                            ))}
                            {
                              course.status === "draft" && (
                                <div
                            onClick={handleUpdateAssessment}
                            className="cursor-pointer"
                          >
                            <AddElement />
                          </div>
                           ) }
                          
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                          <span className="material-symbols-outlined text-primary text-base">
                            <MdOutlineAssignment size={20} />
                          </span>
                          Term Test Questions
                        </h3>
                        <div className="col-span-full">
                          <AddFirstElement
                            title={"assessment"}
                            onAdd={handleUpdateAssessment}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {finalAssessment && finalAssessment.length > 0 ? (
                      <div>
                        <div className="space-y-3">
                          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-primary text-base">
                              <MdOutlineAssignment size={20} />
                            </span>
                            Final Exam Questions
                          </h3>
                          {course.assessments
                            .filter((assessment) => assessment.type === "final")
                            // Sort by date: Earliest date first
                            .sort(
                              (a, b) =>
                                new Date(a.date).getTime() -
                                new Date(b.date).getTime(),
                            )
                            .map((assessment) => (
                              <div
                                key={assessment.id}
                                className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded text-lg">
                                    <IoDocumentTextOutline size={24} />
                                  </span>
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                                      {assessment.type || "Untitled Assessment"}
                                    </p>
                                    <div className="flex items-center gap-5">
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {new Date(assessment.date)
                                          .toLocaleDateString("en-GB")
                                          .replace(/\//g, "-")}
                                      </p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                                        {assessment.mark} mark
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <button className="material-symbols-outlined text-slate-400 hover:bg-red-50 hover:text-red-500 cursor-pointer p-2 dark:hover:bg-slate-800 rounded-full transition-colors"
                                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModal({
                              openModal: true,
                              status: "delete",   
                            });
                            setDeleteItem({
                              id: assessment.id,
                              from: "assessments",
                              name: assessment.type,
                            });
                          }}
                        >
                                  <MdDeleteOutline size={26} />
                                </button>
                              </div>
                            ))}
                        </div>
                        {
                          course.status === "draft" && (
                             <div
                          onClick={handleUpdateAssessment}
                          className="cursor-pointer"
                        >
                          <AddElement />
                        </div> )}
                       
                      </div>
                    ) : (
                      <div>
                        <div className="space-y-3">
                          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-primary text-base">
                              <MdOutlineAssignment size={20} />
                            </span>
                            Final Exam Questions
                          </h3>
                          <div className="col-span-full">
                            <AddFirstElement
                              title={"final assessment"}
                              onAdd={handleUpdateAssessment}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="col-span-full">
                  <AddFirstElement
                    title={"assessment"}
                    onAdd={handleUpdateAssessment}
                  />
                </div>
              )}
              <AddAssessment
                assessmentModal={assessmentModal}
                setAssessmentModal={setAssessmentModal}
              />
            </section>
          </div>
        </div>

        {/* --- RESTORED FEEDBACK & SUBMIT SECTION --- */}
        <div className="my-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {user.feedback ? (
            <div className="p-4 bg-amber-50 border-l-4 w-full border-amber-500 rounded-r-lg shadow-sm">
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-amber-600 mr-2 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                </svg>
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800">
                  Moderator's Feedback
                </h3>
              </div>
              <p className="text-amber-900 text-sm leading-relaxed">
                {user.feedback}
              </p>
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>

        {course.status === "draft" && (
          <div className="flex flex-col gap-4 w-full sm:flex-row lg:flex-col">
            {/* 1. Finalize & Submit Button */}
            <button
              type="button"
              onClick={handleFinalizeClick}
              className="group relative flex flex-1 items-center justify-center gap-3 overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-200 hover:bg-emerald-700 hover:shadow-emerald-900/40 active:scale-[0.98] cursor-pointer"
            >
              <IoCloudDoneOutline
                size={22}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="tracking-wide">Finalize & Submit Account</span>
            </button>

            {/* 2. Delete Course Button */}
            <button
              type="button"
              className="group flex flex-1 items-center justify-center gap-3 rounded-xl border border-rose-500/30 bg-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-900/20 transition-all duration-200 hover:bg-rose-700 hover:shadow-rose-900/40 active:scale-[0.98] cursor-pointer"
            >
              <MdDeleteOutline
                size={22}
                className="text-rose-100/90 transition-transform duration-300 group-hover:rotate-12"
              />
              <span className="tracking-wide">Delete Course</span>
            </button>
          </div>
        )}

        {course.status === "pending" && (
          <button
            type="button"
            onClick={() => {
              /* Your cancel logic here */
            }}
            className="group flex w-full items-center justify-center gap-3 rounded-xl 
               bg-amber-500 hover:bg-amber-600 
               text-white font-bold 
               border border-amber-400/30
               shadow-lg shadow-amber-900/20 
               transition-all duration-200 
               transform active:scale-[0.97] cursor-pointer py-3.5"
          >
            <IoMdClose
              size={22}
              className="transition-transform group-hover:rotate-90"
            />
            <span className="tracking-tight">Cancel Submission</span>
          </button>
        )}

        {/* --- WARNING MODAL --- */}
        {submitModal.openModal && submitModal.status === "warning" && (
          <div
            aria-labelledby="modal-title"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
              onClick={cancelDeleteCourse}
            ></div>
            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
              <div className="flex flex-col items-center gap-8 text-center">
                {/* Warning Icon */}
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500">
                  <span className="material-symbols-outlined text-[56px]">
                    <BsExclamationCircleFill />
                  </span>
                </div>

                <div className="space-y-4">
                  <h3
                    className="text-4xl font-bold text-text-main dark:text-white"
                    id="modal-title"
                  >
                    Cannot Submit Yet
                  </h3>
                  <div className="text-xl text-text-secondary dark:text-gray-400 space-y-3">
                    <p>
                      To finalize your account, you must meet the following:
                    </p>
                    {/* <ul className="text-left bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-dashed border-amber-300 inline-block mx-auto ">
            {
              myCourseCount < 3 && (<> 
                <li className={`flex items-center gap-2 text-red-500 `}>
                { '✕'+` Minimum 3 courses required to submit account`}
              </li>
               <li className={`flex items-center gap-2  text-emerald-500`}>              
                 ✓  Your course count ({"myCourseCount"})
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
              </li> 
            </ul> */}
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
          <div
            aria-labelledby="modal-title"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
              onClick={
                submitModal.status !== "submitting" ? cancelDeleteCourse : null
              }
            ></div>
            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
              <div className="flex flex-col items-center gap-8 text-center">
                {/* Icon: Using a checkmark or upload icon */}
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 dark:text-emerald-400">
                  <span className="material-symbols-outlined text-[56px]">
                    <IoMdCheckmarkCircle />
                  </span>
                </div>

                <div className="space-y-4">
                  <h3
                    className="text-4xl font-bold text-text-main dark:text-white"
                    id="modal-title"
                  >
                    Submit for Review?
                  </h3>
                  <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                    You are about to submit{" "}
                    <span className="font-bold text-text-main dark:text-white">
                      {"courses.length"} courses
                    </span>{" "}
                    to the moderator. You won't be able to edit them until the
                    review is complete.
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
                      <div className="text-white">
                        {" "}
                        <AppleSpinner />{" "}
                      </div>
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
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
          >
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"></div>
            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark transition-all">
              <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-primary/10 text-primary mb-8">
                <IoMdCheckmarkCircle size={56} />
              </div>
              <h3 className="text-4xl font-bold text-text-main dark:text-white mb-4">
                Submission Successful!
              </h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 mb-8 leading-relaxed">
                Your courses have been submitted for final review. You will be
                notified once the moderator completes the evaluation.
              </p>
              <button
                className="w-full py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover shadow-sm transition-colors cursor-pointer"
                onClick={() =>
                  setSubmitModal((prev) => ({
                    ...prev,
                    openModal: false,
                    status: "",
                    loading: false,
                  }))
                }
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* --- SUBMIT ERROR MODAL --- */}
        {submitModal.openModal && submitModal.status === "error" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
          >
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"></div>
            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark transition-all">
              <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 mb-8">
                <BsExclamationCircleFill size={56} />
              </div>
              <h3 className="text-4xl font-bold text-text-main dark:text-white mb-4">
                Submission Failed
              </h3>
              <p className="text-xl text-text-secondary dark:text-gray-400 mb-8 leading-relaxed">
                We couldn't process your final submission. This might be due to
                a connection issue. Please try again.
              </p>
              <div className="flex w-full gap-6">
                <button
                  className="flex-1 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() =>
                    setSubmitModal((prev) => ({
                      ...prev,
                      openModal: false,
                      status: "",
                      loading: false,
                    }))
                  }
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-4 rounded-xl bg-orange-500 text-white text-xl font-semibold shadow-sm hover:bg-orange-600 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                  onClick={() =>
                    setSubmitModal((prev) => ({
                      ...prev,
                      openModal: true,
                      status: "submit",
                      loading: false,
                    }))
                  }
                >
                  <MdRefresh size={24} /> Retry
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-12">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-2 text-primary font-bold text-lg">
               <span className="material-symbols-outlined icon-filled">
                 school
               </span>
               <span className="text-slate-900 dark:text-white">
                 University Portal
               </span>
             </div>
             <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
               © 2024 University Portal. All rights reserved.
             </p>
             <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
               <a className="hover:text-primary transition-colors" href="#">
                 Privacy
               </a>
               <a className="hover:text-primary transition-colors" href="#">
                 Terms
               </a>
               <a className="hover:text-primary transition-colors" href="#">
                 Help
               </a>
             </div>
           </div>
         </footer> */}
    </div>
  );
};

export default CourseDetailsEditPage;
