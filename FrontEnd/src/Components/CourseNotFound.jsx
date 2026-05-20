const CourseNotFound = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-6">
      
      {/* --- ICON SECTION --- */}
      <div className="relative mb-8 sm:mb-10">
        {/* Glow uses your --color-primary variable */}
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150"></div>
        
        <div className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-2xl">
          <svg 
            className="w-16 h-16 sm:w-24 sm:h-24 text-primary dark:text-primary/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {/* Book Icon Path */}
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1" 
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
            />
            {/* The "X" status - using a soft rose/coral that pairs well with teal */}
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10 11l4 4m0-4l-4 4" 
              className="text-rose-500/80"
            />
          </svg>
        </div>
      </div>

      {/* --- TEXT CONTENT --- */}
      <div className="text-center space-y-4 max-w-lg">
        <h2 className="text-3xl sm:text-5xl font-bold text-text-main dark:text-white font-display tracking-tight">
          Course Not Found
        </h2>
        <p className="text-lg sm:text-xl text-secondary-text dark:text-gray-400 font-body leading-relaxed">
          The course associated with this ID does not exist or has been moved to a different category.
        </p>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button
          onClick={() => window.history.back()}
          className="px-10 py-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark text-text-main dark:text-gray-300 font-semibold hover:bg-card-light dark:hover:bg-slate-800 transition-all active:scale-95 cursor-pointer font-body"
        >
          Go Back
        </button>
        <button
          onClick={() => window.location.href = '/courses'}
          className="px-10 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer font-display"
        >
          Browse Courses
        </button>
      </div>

    </div>
  );
};

export default CourseNotFound;