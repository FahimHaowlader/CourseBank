import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';


import PublicApi from '../Hooks/PublicApi';
// 1. Create the Context
const CourseContext = createContext();


// 2. Create the Provider Component
export const CourseProvider = ({ children }) => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);


   const [infoModal, setInfoModal] = useState({
      openModal: false,
    });
  
    const [instructorModal, setInstructorModal] = useState({
      openModal: false,
      status: "",
    });
  
    const [descriptionModal, setDescriptionModal] = useState({
      openModal: false,
      status: "",
    });
  
    const [handbookModal, setHandbookModal] = useState({
      openModal: false,
      status: "",
    });
  
    const [materialModal, setMaterialModal] = useState({
      openModal: false,
      status: "",
    });
  
    const [bookModal, setBookModal] = useState({
      openModal: false,
      status: "",
    });
  
    const [taskModal, setTaskModal] = useState({
      openModal: false,
      status: "",
    });
  
    const [deleteModal, setDeleteModal] = useState({
      openModal: false,
      status: "",
    });
  
    const [assessmentModal, setAssessmentModal] = useState({
      openModal: false,
      status: "",
    });

     const handleUpdateInfo = () => {
    console.log("hello");
    setInfoModal((prev) => ({
      ...prev,
      openModal: true,
      status: "update",
    }));
    console.log(infoModal);
  };

  const handleUpdateInstructorInfo = () => {
    setInstructorModal((prev) => ({
      ...prev,
      openModal: true,
      status: "update",
    }));
  };

  const handleUpdateDescription = () => {
    setDescriptionModal((prev) => ({
      ...prev,
      openModal: true,
      status: "update",
    }));
  };

  const handleUpdateHandbook = () => {
    setHandbookModal((prev) => ({
      ...prev,
      openModal: true,
      status: "update",
    }));
  };

  const handleUpdateMaterial = () => {
    console.log("material");
    setMaterialModal((prev) => ({
      ...prev,
      openModal: true,
      status: "update",
    }));
  };

  const handleUpdateBook = () => {
    setBookModal((prev) => ({
      ...prev,
      openModal: true,
      status: "update",
    }));
  };

  const handleUpdateTask = () => {
    setTaskModal((prev) => ({
      ...prev,
      openModal: true,
      status: "update",
    }));
  };

  const handleUpdateAssessment = () => {
    setAssessmentModal((prev) => ({
      ...prev,
      openModal: true,
      status: "update",
    }));
  };

  const handleDeleteElement = () => {
      setDeleteModal((prev) => ({
      ...prev,
      openModal: true,
      status: "delete",
    }));
   
  };

   const handleDelete = (itemName) => {
      console.log("deleting", itemName);
      // Simulate deletion process
 }


  // Simulated API fetch
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     // Simulating a network delay
  //     setTimeout(() => {
  //       setCourse([
  //         { id: 1, title: 'Foundations of C', semester: 0 },
  //         { id: 2, title: 'Database Systems with Mongoose', semester: 1 },
  //       ]);
  //       setIsLoading(false);
  //     }, 1200);
  //   };

  //   fetchData();
  // }, []);



    useEffect(() => {
    // Simulate data fetching
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await PublicApi.get(`/course-details-for-edit/${id}`);
        setCourse(response.data.data);
        // console.log(response.data.data); 
      
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
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


  // Function to add a course (supports semester 0)
  const addCourse = (newCourse) => {
    setCourse((prev) => [...prev, newCourse]);
  };

  return (
    <CourseContext.Provider 
      value={{ 
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
        handleDelete
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// 3. Custom hook for cleaner imports
export const useCourse = () => {
  const context = useContext(CourseContext);
  
  // High-priority check to catch the "used outside provider" error
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  
  return context;
};