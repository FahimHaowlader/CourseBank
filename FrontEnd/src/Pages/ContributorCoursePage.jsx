import React from "react";
import CustomCourseCard from "../Components/CustomCourseCard";
import AddCourseCard from "../Components/AddCourseCard";
import CourseDeleteConformation from "../Components/CourseDeleteConformation";
import { GiCogLock } from "react-icons/gi";
import { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";


// import DeleteConformation from "../Components/DeleteConformation";

const ContributorCoursePage = () => {
  const course = [
    {
        "instructorImage": {
            "imageURL": "https://example.com/ludwig.jpg"
        },
        "handbook": {
            "fileUrl": "https://edu.com/music-handbook.pdf"
        },
        "_id": "6957c3679ad2a10d20c2cdfc",
        "title": "classical music theory classical music theory classical music theory classical music theory",
        "courseCode": "MUS101",
        "department": "music",
        "staringDate": "2025-02-01T00:00:00.000Z",
        "degree": "bachelors",
        "semester": 1,
        "description": "Notation, harmony, and rhythm.",
        "credits": 2,
        "category": "non-major",
        "type": "core",
        "instructorName": "ludwig van beethoven",
        "instructorDepartment": "music",
        "books": [
            {
                "_id": "6958373c971f79c164d2fe0a",
                "title": "Tonal Harmony",
                "authorName": "Kostka",
                "fileUrl": "https://edu.com/music.pdf"
            }
        ],
        "materials": [
            {
                "_id": "6958373c971f79c164d2fe0b",
                "name": "Scale Sheets",
                "fileUrl": "https://edu.com/scales.pdf"
            },
            {
                "_id": "6958373c971f79c164d2fe0b",
                "name": "Scale Sheets",
                "fileUrl": "https://edu.com/scales.pdf"
            },
        ],
        "tasks": [
            {
                "_id": "6958373c971f79c164d2fe0c",
                "name": "Composition 1",
                "fileUrl": "https://edu.com/comp.pdf"
            }
        ],
         "assessments": [
            {
                "_id": "6958373c971f79c164d2fe0c",
                "name": "midterm",
                "fileUrl": "https://edu.com/comp.pdf"
            },
            {
                "_id": "6958373c971f79c164d2fe0c",
                "name": "final",
                "fileUrl": "https://edu.com/comp.pdf"
            }

        ]
    }
  ]
  const [modal, setModal] = useState({
    openModal: false,
    id: null,
    title : '',
    status: '', // 'confirm', 'loading', 'success', 'error'
  });

  const confirmDeleteCourse = (courseId) => {
    setModal({ openModal: true, id: courseId, status:'error' });
    console.log(`Course with ID ${courseId} deleted successfully.`);
  };

  const retryDeleteCourse = (courseId) => {
    setModal({ openModal: true, id: courseId, status:'success' });
    // Implement retry logic here
  };

  const cancelDeleteCourse = () => {
    setModal({ openModal: false, id: null, status: '' });
  };

    const deleteCourse = (courseId) => {
    
    // Implement your delete logic here, e.g., make an API call to delete the course
    console.log(`Deleting course with ID: ${courseId}`);
    setModal({ openModal: false, id: courseId, status: '' });
    // After deletion, you can update the state to reflect the changes in the UI
  };

  return (
    <div className="bg-background-light dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-5">
        {/* <div className="flex flex-col mb-8 gap-5">
          <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">
            Course Bank
          </h1>
          <div className="w-full">
            <label
              className="block text-sm font-semibold text-text-main dark:text-gray-200 mb-2"
              for="course-search"
            >
              Course Title
            </label>
            <div className="relative flex items-center w-full">
              <span className="absolute left-3 text-text-secondary material-symbols-outlined text-[20px]">
                search
              </span>
              <input
                className="w-full h-12 pl-10 pr-4 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary text-text-main dark:text-white placeholder-text-secondary text-sm transition-all shadow-sm"
                id="course-search"
                placeholder="Search by Course Title"
                type="text"
              />
            </div>
          </div>
        </div> */}
        <div>

       
         <div className=" mb-5">
              <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text  bg-primary-dark dark:bg-primary tracking-tight pb-1 font-extrabold">
           My Courses
          </h1>
          <p className="mt-2 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-0.5">
            View, add, and manage all your courses in one place.
          </p>
          </div>
            {/* <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary tracking-tight">
            My Courses
          </h2>
           <h3  className="mt-1 text-lg text-secondary-text dark:text-gray-400 max-w-3xl pl-0.5">View, add, and manage all your courses in one place</h3>
            </div> */}
         <div className="text-sm md:text-base text-text-secondary dark:text-gray-400 self-start sm:self-center mb-6 pl-1">
            Showing{" "}
            <span className="font-bold text-text-main dark:text-white">12</span>{" "}
            courses
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           < CustomCourseCard Course={course[0]} setModal={setModal}/>
           {/* < CustomCourseCard Course={course[0]} setDeleteModalId={setDeleteModalId}/> */}
            
           {/* < CustomCourseCard/> */}
           {/* < CustomCourseCard/> */}
           < AddCourseCard/>
          
         </div>

                {
                modal.openModal && modal.status == "confirm" && <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
    >
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"></div>
      <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400">
            <span className="material-symbols-outlined text-[56px]">
              <MdDelete />
            </span>
          </div>
          <div className="space-y-4">
            <h3
              className="text-4xl font-bold text-text-main dark:text-white"
              id="modal-title"
            >
              Delete Course?
            </h3>
            <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
              Are you sure you want to delete {" "}
              <span className="font-bold text-text-main dark:text-white">
                {modal.title}
              </span>
              ?
            </p>
          </div>
           <div className="flex w-full gap-6 mt-8">
             <button className="flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-primary/50 transition-colors cursor-pointer"
             onClick={cancelDeleteCourse}
             >
               Cancel
             </button>
             <button className="flex w-full items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none  focus:ring-orange-500/50 transition-colors cursor-pointer"
               onClick={() => confirmDeleteCourse(modal.id)}
             >
                <span className="material-symbols-outlined pr-1">
               <MdDeleteOutline size={26}/>
            </span>
              Delete
            </button>
           </div>
         </div>
       </div>
     </div>
              }

          

            
          
              {
                modal.openModal && modal.status == "success" && <div
                      aria-labelledby="modal-title"
                      aria-modal="true"
                      className="fixed inset-0 z-50 w-full flex items-center justify-center p-4 sm:p-6"
                      role="dialog"
                    >
                      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"></div>
                      <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
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
                                {modal.title}
                              </span>{" "}
                              has been removed successfully.
                            </p>
                          </div>
                          <div className="w-full mt-8">
                            <button className="w-full rounded-xl bg-primary px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-primary/50 transition-colors cursor-pointer"
                            onClick = {() => deleteCourse(modal.id)}
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
              }
         
             {
                 modal.openModal && modal.status == "error" &&  <div
                       aria-labelledby="modal-title"
                       aria-modal="true"
                       className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                       role="dialog"
                     >
                       <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"></div>
                       <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white dark:bg-card-dark p-10 sm:p-14 text-left shadow-2xl transition-all border border-border-light dark:border-border-dark">
                         <div className="flex flex-col items-center gap-8 text-center">
                           <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400">
                             <span className="material-symbols-outlined text-[56px]">
                               <BsExclamationCircleFill/>
                             </span>
                           </div>
                           <div className="space-y-4">
                             <h3
                               className="text-4xl font-bold text-text-main dark:text-white"
                               id="modal-title"
                             >
                               Deletion Failed
                             </h3>
                             <p className="text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                               An unexpected error occurred while trying to delete{" "}
                               <span className="font-bold text-text-main dark:text-white">
                                 {modal.title}
                               </span>
                               .
                               <br className="hidden sm:block" />
                               Please check your connection and try again.
                             </p>
                           </div>
                           <div className="flex w-full gap-6 mt-8">
                             <button className="flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none  focus:ring-primary/50 transition-colors cursor-pointer"
                              onClick={cancelDeleteCourse}
                             >
                               Cancel
                             </button>
                             <button className="flex w-full items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none  focus:ring-orange-500/50 transition-colors cursor-pointer"
                             onClick={() => retryDeleteCourse(modal.id)}
                             >
                              <MdRefresh size={24} className="inline-block mr-1 mt-1 mb-1"/>
                               Retry
                             </button>
                           </div>
                         </div>
                       </div>
                     </div>
              }
          {/* <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Core
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    4 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  CSE-2023-101-K003
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Introduction to Computer Science
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Dr. Sarah Jenkins</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2023 - Fall Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>
          <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Elective
                  </span>
                  <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    3 Credits
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-text-secondary dark:text-gray-400 bg-white dark:bg-background-dark px-2 py-1 rounded border border-border-light dark:border-border-dark tracking-tighter">
                  ART-2024-HIS-L206
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-text-main dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                History of Modern Art &amp; Design
              </h3>
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    person
                  </span>
                  <span className="font-medium">Prof. Alan Grant</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px] opacity-70">
                    calendar_month
                  </span>
                  <span>2024 - Spring Semester</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <button className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5">
                View Details
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                  title="Edit Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  title="Delete Course"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </article>  */}
          {/* <div className="group relative bg-transparent rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 dark:border-primary/20 dark:hover:border-primary/50 flex flex-col justify-center items-center h-full min-h-80 cursor-pointer hover:bg-primary/5 transition-all duration-300">
            <div className="flex flex-col items-center gap-3 text-primary/80 group-hover:text-primary transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <span className="font-bold text-lg">Add Card</span>
            </div>
          </div> */}
       
      </main>
      {/* <footer className="bg-background-light dark:bg-card-dark border-t border-border-light dark:border-border-dark py-8 mt-auto">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-secondary dark:text-gray-500">
          <p>© 2024 University Portal System. All rights reserved.</p>
        </div>
      </footer> */}
      {/* <CourseDeleteConformation/> */}
    </div>
  );                           
};

export default ContributorCoursePage;
