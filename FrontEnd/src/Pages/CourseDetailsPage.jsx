// Design Elements for Course Details Page
import { GrShareOption } from "react-icons/gr";
import { LuNotebook } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";


// Functional Elements and Hooks
import { useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

// Components
import NoCourse from "../Components/NoCourse";
import NoElement from "../Components/NoElement";
import SemesterDisplay from "../Components/semesterTransformer";

const CourseDetailsPage = () => {
  const [course, setCourse] =useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
   useEffect(() => {
    // 1. Try scrolling the window
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 2. Safety: Try scrolling the HTML element (for some mobile browsers)
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 3. Optional: If you have a specific container that scrolls, use:
    // document.getElementById('main-container').scrollTo({ top: 0 });
  }, []);
  useEffect(() => {
    // Simulate data fetching
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://coursebank.onrender.com/api/v1/course-details/${id}`);
        setCourse(response.data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
    
    // setTimeout(() => {  
    //   setCourse({
    //     "instructorImage": {
    //         "imageURL": "https://example.com/ludwig.jpg"
    //     },
    //     "handbook": {
    //         "fileUrl": "https://edu.com/music-handbook.pdf"
    //     },
    //     "_id": "6957c3679ad2a10d20c2cdfc",
    //     "title": "classical music theory classical music theory classical music theory classical music theory",
    //     "courseCode": "MUS101",
    //     "department": "music",
    //     "staringDate": "2025-02-01T00:00:00.000Z",
    //     "degree": "bachelors",
    //     "semester": 1,
    //     "description": "Notation, harmony, and rhythm.",
    //     "credits": 2,
    //     "category": "non-major",
    //     "type": "core",
    //     "instructorName": "ludwig van beethoven",
    //     "instructorDepartment": "music",
    //     "books": [
    //         {
    //             "_id": "6958373c971f79c164d2fe0a",
    //             "title": "Tonal Harmony",
    //             "authorName": "Kostka",
    //             "fileUrl": "https://edu.com/music.pdf"
    //         }
    //     ],
    //     "materials": [
    //         {
    //             "_id": "6958373c971f79c164d2fe0b",
    //             "name": "Scale Sheets",
    //             "fileUrl": "https://edu.com/scales.pdf"
    //         },
    //         {
    //             "_id": "6958373c971f79c164d2fe0b",
    //             "name": "Scale Sheets",
    //             "fileUrl": "https://edu.com/scales.pdf"
    //         },
    //     ],
    //     "tasks": [
    //         {
    //             "_id": "6958373c971f79c164d2fe0c",
    //             "name": "Composition 1",
    //             "fileUrl": "https://edu.com/comp.pdf"
    //         }
    //     ],
    //      "assessments": [
    //         {
    //             "_id": "6958373c971f79c164d2fe0c",
    //             "name": "midterm",
    //             "fileUrl": "https://edu.com/comp.pdf"
    //         },
    //         {
    //             "_id": "6958373c971f79c164d2fe0c",
    //             "name": "final",
    //             "fileUrl": "https://edu.com/comp.pdf"
    //         }

    //     ]
    // });
    // }, 2000); // Simulate a 2-second delay
  }, []);


  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 font-sans antialiased selection:bg-teal-100 dark:selection:bg-teal-900">
      { course  && (
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
  
        <header className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            
            <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl mb-2 text-transparent bg-clip-text bg-primary-dark dark:bg-primary font-extrabold 
               selection:text-gray-600 dark:selection:text-gray-300">
                  {course.title.charAt(0).toUpperCase() + course.title.slice(1) }
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-5">
                Department of Engineering • School of Computing
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                   {course.degree.charAt(0).toUpperCase() + course.degree.slice(1)}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  {course.credits} Credits
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  {/* <SemesterDisplay code={course.semester} /> */}
                  <SemesterDisplay code={11} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-lg">
                  <GrShareOption />
                </span>
                Share Now
              </button>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Instructor Info
              </h2>
              <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    alt={course.instructorName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700"
                    src={course.instructorImage.imageURL}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                      {course.instructorName}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      School of Computing
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm">
                  <div className="flex flex-col text-center sm:text-right">
                    <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">
                      Course Start
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {new Date(course.staringDate).toLocaleDateString('en-GB').replace(/\//g, '-')}
                    </span>
                  </div>
                 
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Course Description
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="mb-4">
                 {course.description}
                </p>
              </div>
            </section>
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
                    Download the complete hand written guide 
                  </p>
                </div>
              </div>
              {
                course.handbook ? (
                  <button className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-lg">
                  <MdOutlineFileDownload size={26} />
                </span>
                Download PDF
              </button>
                ) : (
                 <p className="text-sm text-slate-600 text-center dark:text-slate-400">
                  No handbook available for this course right now.
                </p>
                )
              }
              
            </div>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Course Materials
                </h2>
              </div>
              { course.materials?.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                  course.materials.map((material) => (
                    <div key={material._id} className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                      <span className="material-symbols-outlined">
                        <FaRegFilePdf size={24} />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        {material.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        PDF • {material?.size} MB 
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <MdOutlineFileDownload size={26} />
                  </span>
                </div>
                  ))
                }
                
               
               
              </div>):(
                < NoElement title={'material'} />
              )}
             
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Suggested Books
              </h2>
              {
                course.books?.length > 0 ? ( <div className="space-y-4">
                  { course.books.map((book) => (
                    <div key={book._id} className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-800">
                      <span className="material-symbols-outlined text-primary text-2xl ">
                        <MdOutlineMenuBook size={24} />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {book.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {book.authorName}
                      </p>
                      {/* <p className="text-xs font-mono text-slate-400 mt-2">
                        ISBN: 978-1491939369
                      </p> */}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <MdOutlineFileDownload size={26} />
                  </span>
                </div>
                  ))}
              </div> ) : ( < NoElement title={'suggested book'} /> )
              }
             
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Active Tasks &amp; Assignments
                  </h2>
                </div>
                {
                  course.tasks?.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                      course.tasks.map((task) => (
                        <div key={task._id} className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                        <span className="material-symbols-outlined">
                          <IoDocumentsOutline size={24} />
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                          {task.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {task?.type} Updated yesterday
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                      ))
                    }
                </div> ) : ( < NoElement title={'task or assignment'} /> )
                }
                
              </section>
            </div>
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Assessment Resources
              </h2>
              {
                course.assessments?.length <= 0 ? (
                  < NoElement title={'assessment resource'} />
                ) : (
                  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      <MdOutlineAssignment size={20} />
                    </span>
                    Term Test Questions
                  </h3>
                  {
                    course.assessments?.filter((assessment) => assessment.name !== 'final').length === 0 ? (<NoElement title={"term test question"} />)  : ( course.assessments?.filter((assessment) => assessment.name !== 'final').map((assessment) => (
                      <div key={assessment._id} className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded text-lg">
                        <IoDocumentTextOutline size={24} />
                      </span>
                      <div>
                         <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                            {assessment.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                            {assessment?.type} paper test
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                    )))
                  }
                
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      <MdOutlineAssignment size={20} />
                    </span>
                    Final Exam Questions
                  </h3>
                  { 
                    course.assessments?.filter((assessment) => assessment.name === 'final').length === 0 ? (<NoElement title={"final question"} />)  : ( course.assessments?.filter((assessment) => assessment.name === 'final').map((assessment) => (
                      <div key={assessment._id} className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded text-lg">
                        <IoDocumentTextOutline size={24} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                          {assessment.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                          {assessment?.type} paper test
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                    )))}

                </div>
              </div>
              )
              }           
            </section>
          </div>
        </div>
      </main>
      )}
    </div>
  );
};

export default CourseDetailsPage;
