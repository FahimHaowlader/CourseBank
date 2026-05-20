import React from 'react'
import { MdOutlinePersonOutline, MdDeleteOutline, MdDelete, MdRefresh } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoArrowForwardSharp } from "react-icons/io5";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FiEdit, FiCheck } from 'react-icons/fi'; 
import { Link } from 'react-router';

import SemesterDisplay from './semesterTransformer';
import { useAuth } from '../Contexts/Auth.Context.jsx';

const CustomCourseCard = ({ Course, setModal }) => {
  
  const { user } = useAuth();

  // Helper for Edit/Delete Buttons (Admin / Owner access)
  const ActionButtons = () => (
    <div className="flex items-center gap-2">
      <Link
        className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
        title="Edit Course"
        to={`edit/${Course?._id}`}
      >
        <FiEdit className="text-[20px]" />
      </Link>
      <button
        className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-xl bg-slate-200 text-slate-600 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
        title="Delete Course"
        onClick={() => setModal({ openModal: true, id: Course?._id, title: Course?.title, status: 'confirm' })}
      >
        <MdDeleteOutline size={24} />
      </button>
    </div>
  );

  // Helper for Review Button (Moderator on others' pending)
  const ReviewButton = () => (
    <Link to={`review/${Course?._id}`}  
      onClick={() => typeof handleReview === 'function' && handleReview(Course?._id)}
      className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-amber-500/30 bg-amber-50/50 px-3 h-8 text-amber-700 transition-all duration-300 hover:bg-amber-500 hover:text-white hover:shadow-lg hover:shadow-amber-500/20 dark:bg-amber-500/5 dark:text-amber-400 dark:border-amber-500/30 dark:hover:bg-amber-500 dark:hover:text-white cursor-pointer"
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 " />
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 group-hover:bg-white transition-colors"></span>
      </span>
      <span className="text-[11px] font-black tracking-widest uppercase">Review </span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 -translate-x-1 opacity-100 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );

  // Helper for Approved Badge
  const ApprovedBadge = () => (
    <div className="flex items-center">
      <div className="relative group overflow-hidden px-2.5 h-8 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-50/50 text-emerald-700 transition-all duration-500 hover:shadow-md hover:shadow-emerald-500/10 dark:bg-emerald-500/5 dark:text-emerald-400 dark:border-emerald-500/30 cursor-default">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <span className="text-[12px] font-bold tracking-widest uppercase">Approved</span>
      </div>
    </div>
  );

  const renderStatusActions = () => {
    const isOwner = user?._id?.toString() === Course?.createdBy?.toString();
    const role = user?.role;
    const status = Course?.status;

    // 1. ADMIN: Always show Edit/Delete
    if (role === 'admin') return <ActionButtons />;

    // 2. MODERATOR logic
    if (role === 'moderator') {
      if (status === 'draft' && user?.status === 'active') {
        return isOwner ? <ActionButtons /> : null;
      }
      if (status === 'pending' && user?.status === 'active') {
        return isOwner ? <ActionButtons /> : <ReviewButton />;
      }
      if (status === 'approved') return <ApprovedBadge />;
    }

    // 3. CONTRIBUTOR logic
    if (role === 'contributor') {
      
      if ((status === 'draft' || status === 'pending') && user?.status === 'active') {
        return isOwner ? <ActionButtons /> : null;
      }
      if (status === 'approved') return <ApprovedBadge />;
    }

    // Fallback for general approved visibility
    if (status === 'approved') return <ApprovedBadge />;
    return null;
  };

  return (
    <article className="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold tracking-tight text-text-main dark:text-white mb-2 line-clamp-1 leading-tight group-hover:text-primary transition-colors">
          {Course?.title?.charAt(0).toUpperCase() + Course?.title?.slice(1)}
        </h3>

        {/* Info Grid */}
        <div className="flex justify-between items-start mb-3 flex-wrap gap-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
            {Course?.courseCode.toUpperCase()}
          </div>
        </div>

        <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
            {Course?.degree?.charAt(0).toUpperCase() + Course?.degree?.slice(1)}
          </div>
          <div className="inline-flex capitalize items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
            {Course?.format}
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
            {Course?.credits} Credits
          </div>
        </div>

        <div className="flex justify-between items-start mb-4 flex-wrap gap-y-2 gap-x-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
            {Course?.type?.charAt(0).toUpperCase() + Course?.type?.slice(1)}
          </div>
          <div className="inline-flex max-w-[72%] items-center justify-center px-2.5 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-600 group-hover:text-slate-800 dark:text-slate-300 shadow-sm">
            <SemesterDisplay code={Course.semester} />
          </div>
        </div>

        <div className="mt-auto space-y-2.5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-500 group-hover:text-slate-600 dark:text-slate-300 shadow-sm">
            <span className="material-symbols-outlined text-[18px] opacity-70">
              <MdOutlinePersonOutline className="font-semibold" />
            </span>
            <span className="font-semibold capitalize">{Course?.instructorName}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-semibold text-slate-500 group-hover:text-slate-600 dark:text-slate-300 shadow-sm">
            <span className="material-symbols-outlined text-[18px] opacity-70">
              <LuCalendarDays />
            </span>
            <span>{new Date(Course?.startingDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 flex items-center justify-between">
        <Link
          className="w-auto px-4 h-8 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white font-semibold text-sm transition-colors flex items-center gap-1.5 hover:cursor-pointer"
          to={`${Course?._id}`}
        >
          View Details
          <span className="transition-transform group-hover:translate-x-0.5">
            <IoArrowForwardSharp size={18} />
          </span>
        </Link>

        {/* Dynamic Status Logic */}
       
        {renderStatusActions()}
      </div>
    </article>
  )
}

export default CustomCourseCard;