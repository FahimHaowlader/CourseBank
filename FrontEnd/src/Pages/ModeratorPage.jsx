import React from "react";
import { MdOutlineAssignment, MdEditNote,MdOutlineGavel } from "react-icons/md";
import { IoArrowForwardSharp } from "react-icons/io5";

const ModeratorPage = () => {
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
                      class="group relative bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
                      href="#"
                    >
                     <div class="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <span class="material-symbols-outlined text-[28px]">
                          <MdOutlineGavel />
                        </span>
                      </div>
                      <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">
                        Content Moderation
                      </h3>
                      <p class="text-sm text-text-secondary dark:text-gray-400 mb-6 flex-1">
                        Review reported content, manage feedback, and ensure community
                        guidelines.
                      </p>
                       <div class="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm mt-auto hover:underline">
                        <span>Access Module</span>
                        <span class="material-symbols-outlined text-[18px] ml-1 transition-transform group-hover:translate-x-1">
                          <IoArrowForwardSharp />
                        </span>
                      </div>
                    </a>
          
        </div>
        </div>
      </main>
    </div>
  );
};

export default ModeratorPage;