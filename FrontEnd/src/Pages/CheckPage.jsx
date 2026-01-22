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
// import Skeleton from "../Components/SkeletonCard";

const CheckPage = () => {
  console.log("https://drive.google.com/file/d/1z8zIFj_LU-ouTF2Vm0xoeZ-8DynDY9yw/view?usp=sharing");
  return (
    // <div className='min-h-screen' >
    <div className="min-h-screen">
      <h1>Hello World</h1>
      <img src='https://drive.google.com/file/d/1z8zIFj_LU-ouTF2Vm0xoeZ-8DynDY9yw/view?usp=sharing' alt="pic" className="border-2 border-red-400" />
    </div>
  );
};

export default CheckPage;
