import { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  MdOutlineAssignment,
  MdRefresh,
  MdRestartAlt,
  MdEditNote,
  MdOutlineGavel,
  MdOutlineDeleteSweep,
  MdOutlineCancel,
  MdCheckCircleOutline,
} from "react-icons/md";
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoCloudDoneOutline } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";

import { useAuth } from "../Contexts/Auth.Context.jsx";
import AccessDeniedSection from "../Components/AccessDeniedSection.jsx";
import PrivateApi from "../Hooks/PrivateApi.jsx";
import UserNotFoundSection from "../Components/UserNotFoundSection.jsx";

const ModeratorPage = () => {
  const { user } = useAuth();
  const { moderatorUserId } = useParams(); // Get the moderator user ID from the URL
  const [error, setError] = useState(null);
  const [moderator, setModerator] = useState(null);
  const [feedback, setFeedback] = useState(""); // For storing moderator feedback when canceling submission
  const isOwner = user?.userId === moderator?.userId; // Placeholder - replace with actual ownership logic

  const myCourseCount = moderator?.myCourseCount || 0; // Placeholder - replace with actual course count logic
  const approvedCourseCount = moderator?.approvedCourseCount || 0; // Placeholder - replace with actual approved course count logic

  const [submitModal, setSubmitModal] = useState({
    openModal: true,
    id: null,
    status: "delete-success", // 'warning', 'submit', 'cancel', 'cancel-success', 'cancel-error', 'submit-success', 'submit-error', 'approved', 'approved-success', 'approved-error', 'delete'
    loading: false,
  });

  useEffect(() => {
    const fetchModeratorData = async () => {
      try {
        // if(user.role === "moderator" && user.userId !== moderatorUserId) {
        //   return <AccessDeniedSection/>
        // }
        const res = await PrivateApi.get(
          `/get-moderator-by-userId/${moderatorUserId}`,
        );
        // console.log("Fetched moderator data:", res.data.data);
        setModerator(res?.data?.data); // Store the fetched moderator
      } catch (err) {
        setError(err.message || "Failed to fetch moderator details.");
        setModerator(null); // Clear moderator data on error
      }
    };

    if (moderatorUserId) fetchModeratorData();
  }, [moderatorUserId]);
  const handleDeleteClick = async () => {
    if (user?.role !== "contributor") {
      setSubmitModal((prev) => ({
        ...prev,
        status: "delete",
        loading: false,
        openModal: true,
      }));
    }
  };

  const handleFinalizeClick = () => {
    if ( myCourseCount !== approvedCourseCount) {
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

  const handleCancelClick = () => {
    if (user?.role === "contributor" || isOwner) {
      setSubmitModal({
        openModal: true,
        status: "cancel",
        loading: false,
      });
    } else {
      setSubmitModal({
        openModal: true,
        status: "feedback",
        loading: false,
      });
    }
  };

  const handleAcceptClick = async () => {
    setSubmitModal((prev) => ({
      ...prev,
      status: "approved",
      loading: false,
      openModal: true,
    }));
  };

  const closeModal = () => {
    setSubmitModal({
      openModal: false,
      id: null,
      status: "",
      loading: false,
    });
  };

  const handleFinalSubmit = async () => {
    setSubmitModal((prev) => ({ ...prev, loading: true }));
    let res;
    try {
      // throw new Error("Testing submit error handling"); // <-- Temporary line to test error modal
      if (user.role === "contributor") {
        res = await PrivateApi.post(`/request-submit-contributor-account`);
      } else {
        res = await PrivateApi.post(`/request-submit-contributor-account`, {
          contributorUserId: userId,
        });
      }

      // FIXED: Refresh user context so user.status becomes 'pending'
      if (refreshUser) await refreshUser();

      setSubmitModal((prev) => ({
        ...prev,
        openModal: true,
        status: "submit-success",
        loading: false,
      }));
      setContributor((prev) => ({ ...prev, status: "pending", feedback: "" })); // Immediate UI update for better UX
    } catch (error) {
      // console.log("Error submitting account:", error);
      setSubmitModal((prev) => ({
        ...prev,
        status: "submit-error",
        loading: false,
      }));
    }
  };

  const handleConfirmCancel = async () => {
    setSubmitModal((prev) => ({ ...prev, loading: true }));
    try {
      if (user.role === "contributor") {
        await PrivateApi.post(`/cancel-contributor-account-submission`);
      } else {
        await PrivateApi.post(`/cancel-contributor-account-submission`, {
          contributorUserId: userId,
          feedback: feedback.trim(),
        });
      }
      // throw new Error("Testing cancel error handling"); // <-- Temporary line to test error modal

      // FIXED: Refresh user context so user.status becomes 'active' again
      if (refreshUser) await refreshUser();

      setSubmitModal((prev) => ({ ...prev, status: "cancel-success" }));
      setContributor((prev) => ({ ...prev, status: "active", feedback })); // Immediate UI update for better UX
    } catch (error) {
      setSubmitModal((prev) => ({ ...prev, status: "cancel-error" }));
    } finally {
      setSubmitModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleApproveClick = async () => {
    setSubmitModal((prev) => ({ ...prev, loading: true }));
    if (user?.role === "contributor") {
      return;
    }
    const today = new Date().toDateString();
    try {
      await PrivateApi.post(`/approve-contributor-account-submission`, {
        contributorUserId: userId,
      });
      if (refreshUser) await refreshUser();
      setSubmitModal((prev) => ({
        ...prev,
        status: "approved-success",
        loading: false,
      }));
      setContributor((prev) => ({
        ...prev,
        status: "approved",
        feedback:
          "Your contributor account submission was approved on " +
          today +
          ". You can now log in and see your courses for 30 days. If you have any questions, please contact to the moderators.",
      })); // Immediate UI update for better UX
    } catch (error) {
      setSubmitModal((prev) => ({
        ...prev,
        status: "submit-error",
        loading: false,
      }));
    }
  };

  const handleDeleteAccount = async () => {
    setSubmitModal((prev) => ({ ...prev, loading: true }));
    if (user?.role === "contributor") {
      return;
    }
    setTimeout(() => {}, 3000);
    try {
      await PrivateApi.delete(`/delete-contributor-account/${userId}`);
      if (refreshUser) await refreshUser();
      setSubmitModal((prev) => ({
        ...prev,
        status: "delete-success",
        loading: false,
      }));
    } catch (error) {
      setSubmitModal((prev) => ({
        ...prev,
        status: "delete-error",
        loading: false,
      }));
    }
  };

  const handleGiveFeedback = async () => {
    setSubmitModal((prev) => ({
      ...prev,
      status: "cancel",
      loading: false,
      openModal: true,
    }));
  };

  const handleReturnHome = () => {
    setSubmitModal({loading: false ,status: "", openModal: false, id: null});
    window.location.href = "/";
  };

  if (
    moderatorUserId &&
    moderator?.userId !== moderatorUserId &&
    user?.role === "moderator"
  ) {
    return <AccessDeniedSection />;
  }
  if (error) {
    return <UserNotFoundSection />;
  }

    if (!moderator) {
       return <UserNotFoundSection />;
  }



  return (
    <div className="bg-background-light dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-primary-dark dark:bg-primary tracking-tight font-extrabold">
              Moderator Dashboard
            </h1>
            <p className="text-secondary-text dark:text-gray-400 mt-0.5 text-lg max-w-3xl pl-1">
              Review course curriculum and manage academic contributors.
            </p>
          </div>
        </div>

        {/* Dashboard Grid - Only 2 Modules */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Module 1: Manage Courses */}
            <a
              className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              href="#"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="text-[28px]">
                  <MdOutlineAssignment />
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                Manage Courses
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
                Create new courses, edit existing curriculum, and manage course
                availability.
              </p>
              <div className="flex items-center text-primary font-semibold text-sm mt-auto hover:underline">
                <span>Access Module</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  <IoArrowForwardSharp />
                </span>
              </div>
            </a>

            {/* Module 2: Manage Contributors */}
            <a
              className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1 transition-all duration-300"
              href="#"
            >
              <div className="h-12 w-12 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                <span className="text-[32px]">
                  <MdEditNote />
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                Manage Contributors
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
                Manage permissions, track scholarly input, and collaborate with
                academic staff across departments.
              </p>
              <div className="flex items-center text-sky-600 dark:text-sky-400 font-semibold text-sm mt-auto hover:underline">
                <span>Access Module</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  <IoArrowForwardSharp />
                </span>
              </div>
            </a>

            <a
              className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              href="#"
            >
              <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[28px]">
                  <MdOutlineGavel />
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                Content Moderation
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
                Review reported content, manage feedback, and ensure community
                guidelines.
              </p>
              <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm mt-auto hover:underline">
                <span>Access Module</span>
                <span className="material-symbols-outlined text-[18px] ml-1 transition-transform group-hover:translate-x-1">
                  <IoArrowForwardSharp />
                </span>
              </div>
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {user?.feedback ? (
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
                {user?.feedback}
              </p>
            </div>
          ) : (
            <div className=""></div>
          )}

          <div className="flex flex-col gap-3 justify-end w-full lg:w-auto">
            {
              <button
                className="w-full lg:min-w-75 px-6 py-3 rounded-xl 
                                   bg-primary hover:bg-primary-hover 
                                   text-white font-bold 
                                   border border-primary/20
                                   shadow-sm shadow-primary/20 
                                   transition-all duration-200 
                                   transform active:scale-[0.97] 
                                   flex items-center justify-center gap-3 cursor-pointer"
                onClick={handleFinalizeClick}
              >
                {/* Added an icon here to match the Delete button's visual weight */}
                <span className="material-symbols-outlined ">
                  <IoCloudDoneOutline size={22} />
                </span>
                <span className="tracking-tight">
                  Finalize & Submit Account
                </span>
              </button>
            }
            {moderator?.status === "pending" && (
              <button
                className="w-full lg:min-w-75 px-6 py-3 rounded-xl 
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
                  <MdOutlineCancel size={22} />
                </span>
                <span className="tracking-tight">
                  {`${isOwner ? "Cancel Submission" : "Reject Submission"}`}{" "}
                </span>
              </button>
            )}

            {user?.role === "admin" && moderator?.status === "pending" && (
              <button
                className="w-full lg:min-w-75 px-6 py-3 rounded-xl 
            bg-emerald-600 hover:bg-emerald-700/90 
            text-emerald-50 font-bold 
            border border-emerald-500/20
            shadow-sm shadow-emerald-900/20 
            transition-all duration-200 
            transform active:scale-[0.97] 
            flex items-center justify-center gap-3 cursor-pointer"
                onClick={handleAcceptClick} // Ensure you update your handler name
              >
                <span className="flex items-center justify-center">
                  <MdCheckCircleOutline size={22} />
                </span>
                <span className="tracking-tight">Accept Submission</span>
              </button>
            )}

            {moderator?.status === "approved" && (
              <div className="w-full lg:min-w-100 group relative">
                {/* Decorative Glow Effect */}
                <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

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

                  <span className="tracking-tight  text-base">
                    Account Submitted Successfully
                  </span>
                </button>
              </div>
            )}
            {/* {user?.role !=="contributor"  && (
              <div className="w-full lg:min-w-100 group relative">
          <button
            onClick={handleDeleteClick}
            // Added 'flex justify-center' here to center the contents
            className="relative w-full overflow-hidden px-6 py-3 rounded-xl
            bg-rose-50/50 dark:bg-rose-950/10 
            hover:bg-rose-100 dark:hover:bg-rose-950/20
            text-rose-600 dark:text-rose-400 
            border border-rose-200/50 dark:border-rose-800/30
            backdrop-blur-md shadow-xs
            transition-all duration-500 ease-out group cursor-pointer
            flex items-center justify-center gap-3"
          >
            {/* Sliding Background Element *
            <div className="absolute inset-0 w-2 bg-rose-500 transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-5"></div>
        
            {/* Modern Icon: Sits directly on button background *
            <MdOutlineDeleteSweep 
              size={24} 
              className="relative transition-transform duration-300 group-hover:scale-110" 
            />
            
            {/* Text *
            <p className="relative text-base font-extrabold leading-tight">
              Delete Account
            </p>
          </button>
        </div>
                    )} */}
            {user?.role === "admin" && (
              <div className="w-full lg:min-w-100 group relative">
                <button
                  onClick={handleDeleteClick}
                  // Added 'flex justify-center' here to center the contents
                  className="relative w-full overflow-hidden px-6 py-3 rounded-xl
            bg-rose-50/50 dark:bg-rose-950/10 
            hover:bg-rose-100 dark:hover:bg-rose-950/20
            text-rose-600 dark:text-rose-400 
            border border-rose-200/50 dark:border-rose-800/30
            backdrop-blur-md shadow-xs
            transition-all duration-500 ease-out group cursor-pointer
            flex items-center justify-center gap-3"
                >
                  {/* Sliding Background Element */}
                  <div className="absolute inset-0 w-2 bg-rose-500 transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-5"></div>

                  {/* Modern Icon: Sits directly on button background */}
                  <MdOutlineDeleteSweep
                    size={24}
                    className="relative transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Text */}
                  <p className="relative text-base font-extrabold leading-tight ">
                    Delete Account
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Success/Error modals follow the same pattern... */}
        {submitModal.openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={!submitModal.loading ? closeModal : null}
            ></div>
            <div className="relative w-full max-w-3xl transform rounded-2xl sm:rounded-3xl bg-white dark:bg-card-dark p-6 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark">
              {/* 1. WARNING MODAL (Requirements Not Met) */}
              {submitModal.status === "warning" && (
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500">
                    <BsExclamationCircleFill className="text-[40px] sm:text-[56px]" />
                  </div>

                  <div className="space-y-4">
                    <h3
                      className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white"
                      id="modal-title"
                    >
                      Cannot Submit Yet
                    </h3>
                    <div className="text-base sm:text-xl text-text-secondary dark:text-gray-400 space-y-3">
                      <p>
                        To finalize{" "}
                        {`${isOwner ? "your" : "moderator"}`}{" "}
                        account, you must meet the following:
                      </p>
                      <ul className="text-left bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-dashed border-amber-300 inline-block mx-auto w-full sm:w-auto">
                        {myCourseCount !== approvedCourseCount &&
                          (
                            <>
                              <li className="flex items-start gap-2 text-red-500 text-sm sm:text-base">
                                <span className="font-bold">✕</span> All courses
                                must be approved to submit the
                                account
                              </li>
                              <li className="flex items-center gap-2 text-emerald-500 text-sm sm:text-base ml-5">
                                ✓
                                {`${isOwner ? "Your" : "Moderator"}`}{" "}
                                approved course ({approvedCourseCount}) out of ({myCourseCount})
                              </li>
                            </>
                          )}
                      </ul>
                    </div>
                  </div>

                  <button
                    className="w-full rounded-xl cursor-pointer bg-amber-500 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white shadow-sm hover:bg-amber-600 transition-all active:scale-95"
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
                      You are about to submit the account .
                      {`${isOwner ? "Your" : "Moderator"}`}{" "}
                      won't be able to edit them until the review is complete.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
                    <button
                      disabled={submitModal.loading}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 disabled:opacity-50 cursor-pointer transition-colors"
                      onClick={closeModal}
                    >
                      Not Now
                    </button>
                    <button
                      disabled={submitModal.loading}
                      className="w-full rounded-xl bg-emerald-600 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 flex justify-center items-center cursor-pointer"
                      onClick={handleFinalSubmit}
                    >
                      {submitModal.loading ? (
                        <AppleSpinner />
                      ) : (
                        "Confirm Submit"
                      )}
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
                      {`${isOwner ? "Your" : "Moderator"}`}{" "}
                      account have been submitted for final review. We will
                      notify you once it complete.
                    </p>
                  </div>
                  <button
                    className="w-full py-3 sm:py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover shadow-sm transition-all active:scale-95 cursor-pointer"
                    onClick={() =>
                      setSubmitModal({
                        openModal: false,
                        status: "",
                        loading: false,
                      })
                    }
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
                      We couldn't process your request. Please check your
                      connection and try again.
                    </p>
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
                    <button
                      className="w-full py-3 sm:py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg sm:text-xl font-semibold text-text-main hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-full py-3 sm:py-4 rounded-xl bg-orange-500 text-white text-lg sm:text-xl font-semibold shadow-sm hover:bg-orange-600 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      onClick={() =>
                        setSubmitModal((prev) => ({
                          ...prev,
                          status: "submit",
                          loading: false,
                        }))
                      }
                    >
                      <MdRefresh size={24} /> Retry
                    </button>
                  </div>
                </div>
              )}
              {/* --- MODERATOR FEEDBACK MODAL --- */}
              {submitModal.status === "feedback" && (
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  {/* Icon: Using a soft Sky Blue theme */}
                  <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-500 dark:text-sky-400 shrink-0">
                    <svg
                      className="w-10 h-10 sm:w-14 sm:h-14"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>

                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 font-display">
                      Submission Feedback
                    </h3>
                    <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 font-body">
                      Please describe the changes needed for this submission.
                    </p>
                  </div>

                  {/* Textarea: Border and Focus rings updated to Sky */}
                  <div className="w-full relative">
                    <textarea
                      rows={4}
                      className="w-full p-4 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-main dark:text-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-400 transition-all outline-none resize-none text-base sm:text-lg font-body"
                      placeholder="Type your feedback here..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-2">
                    <button
                      disabled={submitModal.loading}
                      className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-3 sm:py-4 text-lg font-semibold text-slate-600 dark:text-slate-300 hover:bg-sky-50/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                    {/* Primary Action Button: Sky Blue-500 */}
                    <button
                      disabled={
                        submitModal.loading || feedback?.trim().length < 10
                      }
                      className="w-full rounded-xl bg-sky-500 py-3 sm:py-4 text-lg font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-all active:scale-[0.98] cursor-pointer font-display"
                      onClick={handleGiveFeedback}
                    >
                      {submitModal.loading ? <AppleSpinner /> : "Give Feedback"}
                    </button>
                  </div>
                </div>
              )}{" "}
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
                      This will move{" "}
                      {`${isOwner ? "your" : "moderator"}`}{" "}
                      account back to{" "}
                      <span className="font-bold text-rose-600">
                        Active mode
                      </span>
                      .{" "}
                      {`${isOwner ? "Your" : "Moderator"}`}{" "}
                      account will no longer be under review, and you will need
                      to submit again later.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
                    {/* Secondary Action: Stay Pending */}
                    <button
                      disabled={submitModal.loading}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
                      onClick={closeModal}
                    >
                      Keep Under Review
                    </button>

                    {/* Primary Action: Confirm Cancel */}
                    <button
                      disabled={submitModal.loading}
                      className="w-full rounded-xl bg-rose-600 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white shadow-sm hover:bg-rose-700 disabled:opacity-50 flex justify-center items-center gap-2 transition-all active:scale-95 cursor-pointer"
                      onClick={handleConfirmCancel} // This function calls your "cancel" API
                    >
                      {submitModal.loading ? (
                        <AppleSpinner />
                      ) : (
                        <>
                          <MdOutlineCancel size={24} />
                          Cancel Submission
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
                      {`${isOwner ? "Your" : "Moderator"}`}{" "}
                      request has been withdrawn.{" "}
                      {`${isOwner ? "Your" : "Moderator"}`}{" "}
                      account is now back in{" "}
                      <span className="font-bold text-rose-600">
                        Active mode
                      </span>{" "}
                      and you can edit{" "}
                      {`${user?.role === "contributor" ? "your" : "contributor"}`}{" "}
                      courses again.
                    </p>
                  </div>
                  <button
                    className="w-full py-3 sm:py-4 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 shadow-sm transition-all active:scale-95 cursor-pointer"
                    onClick={() =>
                      setSubmitModal({
                        openModal: false,
                        status: "",
                        loading: false,
                      })
                    }
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
                      We encountered an error while trying to withdraw your
                      submission.{" "}
                      {`${isOwner ?  "Your" : "Moderator"}`}{" "}
                      account is still under review.
                    </p>
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
                    <button
                      className="w-full py-3 sm:py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg sm:text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      className="w-full py-3 sm:py-4 rounded-xl bg-orange-500 text-white text-lg sm:text-xl font-semibold shadow-sm hover:bg-orange-600 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      onClick={() =>
                        setSubmitModal((prev) => ({
                          ...prev,
                          status: "cancel",
                          loading: false,
                        }))
                      }
                    >
                      <MdRefresh size={24} /> Retry
                    </button>
                  </div>
                </div>
              )}
              {submitModal.status === "approved" && (
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  {/* Icon: Emerald/Green checkmark circle */}
                  <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500">
                    <IoMdCheckmarkCircle className="text-[40px] sm:text-[56px]" />
                  </div>

                  <div className="space-y-4 text-center">
                    <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
                      Approve Submission?
                    </h3>
                    <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                      You are about to approve the account. This will notify the
                      moderator.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
                    <button
                      disabled={submitModal.loading}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 disabled:opacity-50 cursor-pointer transition-colors"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={submitModal.loading}
                      className="w-full rounded-xl bg-emerald-600 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 flex justify-center items-center cursor-pointer transition-all active:scale-95"
                      onClick={handleApproveClick}
                    >
                      {submitModal.loading ? (
                        <AppleSpinner text="Confirming..." />
                      ) : (
                        "Confirm Submission"
                      )}
                    </button>
                  </div>
                </div>
              )}
              {submitModal.status === "approved-success" && (
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  {/* Icon: Primary/Theme checkmark circle */}
                  <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <IoMdCheckmarkCircle size={56} />
                  </div>

                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
                      Approval Successful!
                    </h3>
                    <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                      The account have been officially approved and the courses
                      are now visible in the curriculum.
                    </p>
                  </div>

                  <button
                    className="w-full py-3 sm:py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover shadow-sm transition-all active:scale-95 cursor-pointer"
                    onClick={() =>
                      setSubmitModal({
                        openModal: false,
                        status: "",
                        loading: false,
                      })
                    }
                  >
                    Done
                  </button>
                </div>
              )}
              {submitModal.status === "approved-error" && (
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  {/* Icon: Rose/Red warning icon */}
                  <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500">
                    <BsExclamationCircleFill size={56} />
                  </div>

                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
                      Approval Failed
                    </h3>
                    <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                      Something went wrong while processing the approval. Please
                      try again or check your permissions.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
                    <button
                      className="w-full py-3 sm:py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg sm:text-xl font-semibold text-text-main hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      className="w-full py-3 sm:py-4 rounded-xl bg-rose-500 text-white text-lg sm:text-xl font-semibold shadow-sm hover:bg-rose-600 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      onClick={() =>
                        setSubmitModal((prev) => ({
                          ...prev,
                          status: "approved",
                          loading: false,
                        }))
                      }
                    >
                      <MdRefresh size={24} /> Retry
                    </button>
                  </div>
                </div>
              )}
              {submitModal.status === "delete" && (
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500">
                    <MdOutlineDeleteSweep className="text-[40px] sm:text-[56px]" />
                  </div>

                  <div className="space-y-4 text-center">
                    <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
                      Delete Contrinutor?
                    </h3>
                    <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                      This action is{" "}
                      <span className="text-rose-600 font-bold uppercase">
                        permanent
                      </span>
                      .Moderator account will be removed, but moderator's
                      courses and contributor account will stay live and move to the admin pool. Are
                      you sure you want to proceed?
                    </p>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
                    <button
                      disabled={submitModal.loading}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-text-main dark:text-gray-300 hover:bg-gray-50 disabled:opacity-50 cursor-pointer transition-colors"
                      onClick={closeModal}
                    >
                      Keep Account
                    </button>
                    <button
                      disabled={submitModal.loading}
                      className="w-full rounded-xl bg-rose-600 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white shadow-sm hover:bg-rose-700 disabled:opacity-50 flex justify-center items-center cursor-pointer transition-all active:scale-95"
                      onClick={handleDeleteAccount}
                    >
                      {submitModal.loading ? (
                        <AppleSpinner text="Deleting..." />
                      ) : (
                        "Delete Contributor"
                      )}
                    </button>
                  </div>
                </div>
              )}            
              {submitModal.status === "delete-error" && (
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500">
                    <BsExclamationCircleFill size={56} />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
                      Deletion Failed
                    </h3>
                    <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                      We encountered a security error while trying to delete the
                      moderator account . Please try again.
                    </p>
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-6 mt-4">
                    <button
                      className="w-full py-3 sm:py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg sm:text-xl font-semibold text-text-main hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-full py-3 sm:py-4 rounded-xl bg-rose-500 text-white text-lg sm:text-xl font-semibold shadow-sm hover:bg-rose-600 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      onClick={() =>
                        setSubmitModal((prev) => ({
                          ...prev,
                          status: "delete",
                          loading: false,
                        }))
                      }
                    >
                      <MdRefresh size={24} /> Retry Deletion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

         {submitModal.openModal && submitModal.status === "delete-success" &&  (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              // onClick={!submitModal.loading ? closeModal : null}
            ></div>
            <div className="relative w-full max-w-3xl transform rounded-2xl sm:rounded-3xl bg-white dark:bg-card-dark p-6 sm:p-14 text-center shadow-2xl border border-border-light dark:border-border-dark">
                <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
                  <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    <IoMdCheckmarkCircle size={56} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-4xl font-bold text-text-main dark:text-white">
                      Account Deleted
                    </h3>
                    <p className="text-base sm:text-xl text-text-secondary dark:text-gray-400 leading-relaxed">
                      Moderator account has been successfully removed. We're
                      sorry to see you go.
                    </p>
                  </div>
                  <button
                    className="w-full py-3 sm:py-4 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-semibold hover:opacity-90 shadow-sm transition-all cursor-pointer"
                    onClick={() => (window.location.href = "/")} // Usually you redirect after deletion
                  >
                    Return to Home
                  </button>
                </div>
             </div>
             </div>
            )}
      </main>
    </div>
  );
};

export default ModeratorPage;
