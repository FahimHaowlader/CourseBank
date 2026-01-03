import React from "react";
import NoCourse from "../Components/NoCourse";
import NoElement from "../Components/NoElement";
import AddElement from "../Components/AddElement";
// import SelectBox from '../Components/SelectBox'
// import InputBox from '../Components/InputBox'
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import AddFirstElement from "../Components/AddFirstElement";
import CourseDeleteConformation from "../Components/CourseDeleteConformation";
import ElementDeleteConfirmation from "../Components/ElementDeleteConformation";
import AddMaterial from "../Components/AddMaterial";
import AddTask from "../Components/AddTask";
import AddBook from "../Components/AddBook";
import AddAssessment from "../Components/AddAssessment";
import UpdateDescription from "../Components/UpdateDescription";
import UpdateHandbook from "../Components/UpdateHandbook";
import SelectAbleTable from "../Components/SelectAbleTable";
import SemesterDisplay from "../Components/semesterTransformer";
import Pagination from "../Components/Pagination";
import CourseDetailsSkeleton from "../Components/CourseDetailsSkeleton";
import GeneralSkeleton from "../Components/GeneralSkeleton"; 
// import Skeleton from "../Components/SkeletonCard";

const CheckPage = () => {
  return (
    // <div className='min-h-screen' >
    <div className="min-h-screen">
      {/* <h1 className='text-primary border p-6 rounded-xl'>Hello world </h1> */}
      {/* <SelectBox
  label="Year"
  options={["All Years", "2025", "2024", "2023"]}
  value={['All Years']}
  onChange={(v) => setFilters({ ...filters, year: v })}
/> */}
      {/* <InputBox
  label="Course Title"
  icon="search"
  placeholder="e.g. Intro to Computer Science"
//   value={filters.title}
  onChange={(e) =>
    setFilters({ ...filters, title: e.target.value })
  }
/> */}
      {/* <NoCourse/> */}
      {/* <NoElement/> */}
      {/* <CourseDeleteConformation/> */}
      {/* <ElementDeleteConfirmation/> */}
      {/* <AddMaterial/> */}
      {/* <AddTask/> */}
      {/* <AddBook/> */}
      {/* <AddAssessment/> */}
      {/* <UpdateDescription /> */}
      {/* <UpdateDescription /> */}
      {/* <UpdateHandbook/> */}
      {/* <SelectAbleTable /> */}
      {/* <SemesterDisplay code={11} />
<SemesterDisplay code={50} />  */}
{/* <CourseDetailsSkeleton /> */}
<GeneralSkeleton />
  {/* <Pagination page={3} setPage={(p) => console.log(p)} totalDocs={244} /> */}
  {/* <Skeleton /> */}
      {/* <AddElement title="Module" onAdd={() => alert("Add Module clicked")} /> */}
      {/* <AddFirstElement title="Document" onAdd={() => alert("Add Document clicked")} /> */}

      {/* <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
            <span className="material-symbols-outlined">
              <IoDocumentsOutline size={24} />
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
              Lecture Notes: Weeks 1-4
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              PDF • 2.4 MB • Updated yesterday
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
          <MdOutlineFileDownload size={26} />
        </span>
      </div> */}
    </div>
  );
};

export default CheckPage;
