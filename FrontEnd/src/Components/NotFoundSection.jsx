import React from 'react';

const NotFoundSection = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-6">
      
      {/* --- ICON SECTION --- */}
      <div className="relative mb-8 sm:mb-10">
        {/* Soft primary glow */}
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150"></div>
        
        <div className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-2xl">
          {/* 404 Visual: Using a Compass or Map-style icon */}
          <svg 
            className="w-16 h-16 sm:w-24 sm:h-24 text-primary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
            />
          </svg>
          {/* Warning badge */}
          
        </div>
      </div>

      {/* --- TEXT CONTENT --- */}
      <div className="text-center space-y-4 max-w-lg">
        <h2 className="text-3xl sm:text-5xl font-bold text-text-main dark:text-white font-display tracking-tight">
          Lost in Space?
        </h2>
        <p className="text-lg sm:text-xl text-secondary-text dark:text-gray-400 font-body leading-relaxed">
          The page you are looking for doesn't exist or has been moved to a new URL.
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
          Take Me Home
        </button>
      </div>

      {/* --- OPTIONAL SUBTLE TEXT --- */}
      <p className="mt-8 text-sm text-gray-400 dark:text-gray-600">
        Error Code: <span className="font-mono">ERR_ROUTE_NOT_FOUND</span>
      </p>
    </div>
  );
};

export default NotFoundSection;