const AccessDeniedSection = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-6">
      
      {/* --- ICON SECTION --- */}
      <div className="relative mb-8 sm:mb-10">
        {/* Amber/Gold warning glow for access restricted */}
        <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full scale-150"></div>
        
        <div className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-2xl">
          <svg 
            className="w-16 h-16 sm:w-24 sm:h-24 text-text-secondary dark:text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {/* Shield Icon */}
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1" 
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
            />
            {/* Red Lock Detail */}
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 11v3m0 0h.01m-1.01 0h.01" 
              className="text-rose-500"
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