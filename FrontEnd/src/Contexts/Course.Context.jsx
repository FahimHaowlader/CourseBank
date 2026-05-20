import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PrivateApi from '../Hooks/PrivateApi';

// 1. Create the Context (Internal only to fix HMR Invalidation)
const CourseContext = createContext();

// 2. Create the Provider Component
export const CourseProvider = ({ children }) => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal States
  const [infoModal, setInfoModal] = useState({ openModal: false, status: "" });
  const [instructorModal, setInstructorModal] = useState({ openModal: false, status: "" });
  const [descriptionModal, setDescriptionModal] = useState({ openModal: false, status: "" });
  const [handbookModal, setHandbookModal] = useState({ openModal: false, status: "" });
  const [materialModal, setMaterialModal] = useState({ openModal: false, status: "" });
  const [bookModal, setBookModal] = useState({ openModal: false, status: "" });
  const [taskModal, setTaskModal] = useState({ openModal: false, status: "" });
  const [deleteModal, setDeleteModal] = useState({ openModal: false, status: "" });
  const [assessmentModal, setAssessmentModal] = useState({ openModal: false, status: "" });
  const [deleteItem, setDeleteItem] = useState({name : "",from:"",id:null}); // To hold the item being deleted

  // Update Handlers
  const handleUpdateInfo = () => {
    setInfoModal((prev) => ({ ...prev, openModal: true, status: "update" }));
  };

  const handleUpdateInstructorInfo = () => {
    setInstructorModal((prev) => ({ ...prev, openModal: true, status: "update" }));
  };

  const handleUpdateDescription = () => {
    setDescriptionModal((prev) => ({ ...prev, openModal: true, status: "update" }));
  };

  const handleUpdateHandbook = () => {
    setHandbookModal((prev) => ({ ...prev, openModal: true, status: "update" }));
  };

  const handleUpdateMaterial = () => {
    setMaterialModal((prev) => ({ ...prev, openModal: true, status: "update" }));
  };

  const handleUpdateBook = () => {
    setBookModal((prev) => ({ ...prev, openModal: true, status: "update" }));
  };

  const handleUpdateTask = () => {
    setTaskModal((prev) => ({ ...prev, openModal: true, status: "update" }));
  };

  const handleUpdateAssessment = () => {
    setAssessmentModal((prev) => ({ ...prev, openModal: true, status: "update" }));
  };

  const handleDeleteElement = () => {
    setDeleteModal((prev) => ({ ...prev, openModal: true, status: "delete" }));
  };

  const handleDelete = (itemName) => {
     // console.log("deleting", itemName);
    // Logic for deletion goes here
  };

  // API Fetching
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await PrivateApi.get(`/course-details-for-edit/${id}`);
        setCourse(response.data.data);
      } catch (error) {
        setError("Failed to load course data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) fetchCourse();
  }, [id]);

  const addCourse = (newCourse) => {
    setCourse((prev) => [...prev, newCourse]);
  };

  return (
    <CourseContext.Provider 
      value={{ 
        course, 
        setCourse,
        isLoading, 
        setIsLoading,
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
        error,
        deleteItem,
        setDeleteItem,
        setError
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// 3. Custom hook for cleaner imports
export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
