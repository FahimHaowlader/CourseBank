import React from 'react';

const AccessDeniedSection = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-6">
      
      {/* --- ICON SECTION --- */}
      <div className="relative mb-8 sm:mb-10">
        {/* Soft warning glow centered behind the lock */}
        <div className="absolute inset-0 bg-rose-500/10 dark:bg-rose-500/5 blur-3xl rounded-full scale-150"></div>
        
        <div className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-2xl">
          {/* Main SVG Container */}
          <svg 
            className="w-16 h-16 sm:w-24 sm:h-24" 
            viewBox="0 0 24 24"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shackle (Top curved part) - Subtle grey */}
            <path 
              d="M7 10V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10" 
              className="stroke-gray-400 dark:stroke-gray-600"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Lock Body - Solid Rose-500 */}
            <rect 
              x="5" 
              y="10" 
              width="14" 
              height="11" 
              rx="2.5" 
              className="fill-rose-500"
              strokeWidth="0"
            />

            {/* Keyhole Details (Knocked out of the rose body) */}
            <circle 
              cx="12" 
              cy="14.5" 
              r="1.5" 
              className="fill-card-light dark:fill-card-dark"
            />
            <rect 
              x="11.25" 
              y="15.5" 
              width="1.5" 
              height="3.5" 
              rx="0.75" 
              className="fill-card-light dark:fill-card-dark"
            />
          </svg>
        </div>
      </div>

      {/* --- TEXT CONTENT --- */}
      <div className="text-center space-y-4 max-w-lg">
        <h2 className="text-3xl sm:text-5xl font-bold text-text-main dark:text-white font-display tracking-tight">
          Access Denied
        </h2>
        <p className="text-lg sm:text-xl text-secondary-text dark:text-gray-400 font-body leading-relaxed">
          You don't have the required permissions to view this page. Please contact your administrator if you believe this is an error.
        </p>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button
          onClick={() => window.history.back()}
          className="px-10 py-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark text-text-main dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
        >
          Go Back
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="px-10 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer"
        >
          Return Home
        </button>
      </div>

    </div>
  );
};

export default AccessDeniedSection;