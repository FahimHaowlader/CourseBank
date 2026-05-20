const UserNotFoundSection = () => {
  return (
  /* Apply these classes to the outer-most div or the main return */
<div className="fixed inset-0 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-6">
  
  {/* --- ICON SECTION --- */}
  <div className="relative mb-8 sm:mb-10">
    {/* Soft primary glow to match your teal theme */}
    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150"></div>
    
    <div className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-2xl">
      <svg 
        className="w-16 h-16 sm:w-24 sm:h-24 text-text-secondary dark:text-gray-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1" 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M15 15l3 3m0 0l3 3m-3-3l3-3m-3 3l-3 3" 
          className="text-rose-500"
        />
      </svg>
    </div>
  </div>

  {/* --- TEXT CONTENT --- */}
  <div className=" text-center space-y-4">
    <h2 className="text-3xl sm:text-5xl font-bold text-text-main dark:text-white font-display tracking-tight">
      User Not Found
    </h2>
    <p className="text-lg sm:text-xl text-secondary-text dark:text-gray-400 font-body leading-relaxed">
     The user profile associated with this ID does not exist or has been permanently removed.
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

export default UserNotFoundSection;