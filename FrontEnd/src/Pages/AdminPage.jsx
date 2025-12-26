import React from "react";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineGavel } from "react-icons/md";
import { MdOutlineCampaign } from "react-icons/md";
import { IoArrowForwardSharp } from "react-icons/io5";




const AdminPage = () => {
  return (
    <div class="bg-background-light dark:bg-black text-text-main dark:text-white font-display antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-5  gap-4 ">
          <div>
            <h1 class="text-3xl sm:text-4xl text-transparent bg-clip-text  bg-primary-dark dark:bg-primary tracking-tight pb-1 font-extrabold">
              Admin Dashboard
            </h1>
            <p class="text-secondary-text dark:text-gray-400 mt-2 text-lg max-w-3xl pl-1">
              Manage university resources, users, and system settings.
            </p>
          </div>
          
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            class="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            href="#"
          >
            <div class="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <span class="material-symbols-outlined text-[28px]">
                <MdOutlineAssignment/>
              </span>
            </div>
            <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">
              Manage Courses
            </h3>
            <p class="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
              Create new courses, edit existing curriculum, and manage course
              availability.
            </p>
            <div class="flex items-center text-primary font-semibold text-sm mt-auto hover:underline">
              <span>Access Module</span>
              <span class="material-symbols-outlined text-[18px] ml-1 transition-transform group-hover:translate-x-1">
                <IoArrowForwardSharp />
              </span>
            </div>
          </a>
          <a
            class="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            href="#"
          >
            <div class="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <span class="material-symbols-outlined text-[28px]"><MdOutlinePeopleAlt/></span>
            </div>
            <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">
              Manage Users
            </h3>
            <p class="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
              Oversee student enrollments, faculty profiles, and administrative
              permissions.
            </p>
            <div class="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm mt-auto hover:underline">
              <span>Access Module</span>
              <span class="material-symbols-outlined text-[18px] ml-1 transition-transform group-hover:translate-x-1">
               <IoArrowForwardSharp />
              </span>
            </div>
          </a>
          <a
            class="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            href="#"
          >
            <div class="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <span class="material-symbols-outlined text-[28px]">
                <LuChartNoAxesCombined />
              </span>
            </div>
            <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">
              View Analytics
            </h3>
            <p class="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
              Track system usage, course popularity trends, and student
              engagement metrics.
            </p>
            <div class="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm mt-auto hover:underline">
              <span>Access Module</span>
              <span class="material-symbols-outlined text-[18px] ml-1 transition-transform group-hover:translate-x-1">
                <IoArrowForwardSharp />
              </span>
            </div>
          </a>
          <a
            class="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            href="#"
          >
            <div class="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center mb-4 group-hover:bg-slate-600 group-hover:text-white transition-colors">
              <span class="material-symbols-outlined text-[28px]">
                <IoSettingsOutline />
              </span>
            </div>
            <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">
              System Settings
            </h3>
            <p class="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
              Configure global platform settings, integrations, and maintenance
              preferences.
            </p>
            <div class="flex items-center text-slate-600 dark:text-slate-400 font-semibold text-sm mt-auto hover:underline">
              <span>Access Module</span>
              <span class="material-symbols-outlined text-[18px] ml-1 transition-transform group-hover:translate-x-1">
                <IoArrowForwardSharp />
              </span>
            </div>
          </a>
          <a
            class="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            href="#"
          >
            <div class="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <span class="material-symbols-outlined text-[28px]"><MdOutlineGavel /></span>
            </div>
            <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">
              Content Moderation
            </h3>
            <p class="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
              Review reported content, manage feedback, and ensure community
              guidelines.
            </p>
            <div class="flex items-center text-amber-600 dark:text-amber-400 font-semibold text-sm mt-auto hover:underline">
              <span>Access Module</span>
              <span class="material-symbols-outlined text-[18px] ml-1 transition-transform group-hover:translate-x-1">
                <IoArrowForwardSharp />
              </span>
            </div>
          </a>
          <a
            class="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            href="#"
          >
            <div class="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <span class="material-symbols-outlined text-[28px]">
                <MdOutlineCampaign />
              </span>
            </div>
            <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">
              Announcements
            </h3>
            <p class="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
              Broadcast important updates, alerts, and news to the entire
              university network.
            </p>
            <div class="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-auto hover:underline">
              <span>Access Module</span>
              <span class="material-symbols-outlined text-[18px] ml-1 transition-transform group-hover:translate-x-1">
                <IoArrowForwardSharp />
              </span>
            </div>
          </a>
        </div>
      </main>

    </div>
  );
};

export default AdminPage;
