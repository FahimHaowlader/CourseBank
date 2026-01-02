import React from "react";
import { AiOutlineSearch } from "react-icons/ai";


const NoCourse = () => {
  return (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white dark:bg-surface-dark border border-slate-300 dark:border-slate-700 rounded-2xl w-full">
    
    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
      No courses found
    </h2>

    <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-8 leading-relaxed text-lg">
      We couldn't find any courses matching{" "}
      <span className="font-semibold text-slate-900 dark:text-white">
        "BIO404"
      </span>
      <br />
      Try adjusting your Course ID or search for other criteria.
    </p>

    <div className="flex flex-col sm:flex-row gap-4">
      <button className="cursor-pointer px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-md flex items-center justify-center gap-2 focus:outline-none">
        <AiOutlineSearch size={20} />
        Browse Courses
      </button>
    </div>

  </div>

  );
};

export default NoCourse;
