import React from "react";

const CourseDetailsSkeleton = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen antialiased animate-pulse">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-8">
        
        {/* --- Header Skeleton --- */}
        <header className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 space-y-4">
              {/* Title */}
              <div className="h-8 sm:h-10 w-3/4 rounded-xl skeleton-shimmer"></div>
              {/* Dept Subtitle */}
              <div className="h-6 w-1/2 rounded-lg skeleton-shimmer opacity-60"></div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-28 rounded-lg skeleton-shimmer"></div>
                ))}
              </div>
            </div>
            
            {/* Share Button */}
            <div className="h-10 w-40 rounded-xl skeleton-shimmer shrink-0"></div>
          </div>
        </header>

        <div className="space-y-12">
          
          {/* --- Instructor Section Skeleton --- */}
          <section>
            <div className="h-7 w-40 rounded-lg skeleton-shimmer mb-4"></div>
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full">
                <div className="w-16 h-16 rounded-2xl skeleton-shimmer shrink-0"></div>
                <div className="space-y-2 w-full">
                  <div className="h-5 w-40 rounded skeleton-shimmer"></div>
                  <div className="h-4 w-28 rounded skeleton-shimmer opacity-50"></div>
                </div>
              </div>

             <div className="space-y-2 flex flex-col items-center md:items-end">
                  <div className="h-5 w-40 rounded skeleton-shimmer"></div>
                  <div className="h-4 w-28 rounded skeleton-shimmer opacity-50 "></div>
                </div>
            </div>
          </section>

          {/* --- Description & Handbook Grid --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-3 space-y-4">
              <div className="h-7 w-48 rounded-lg skeleton-shimmer"></div>
              <div className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-6 space-y-3">
                <div className="h-4 w-full rounded skeleton-shimmer"></div>
                <div className="h-4 w-full rounded skeleton-shimmer"></div>
                <div className="h-4 w-11/12 rounded skeleton-shimmer"></div>
                <div className="h-4 w-4/5 rounded skeleton-shimmer"></div>
              </div>
            </div>
            
           
          </div>
              
                  <div className="flex bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800 rounded-2xl p-6 h-full gap-4">
                   <div className="w-12 h-12 rounded-xl skeleton-shimmer mx-auto sm:mx-0"></div>
                   <div className="h-6 w-3/4 rounded skeleton-shimmer"></div>
                   <div className="h-12 w-full rounded-xl skeleton-shimmer mt-auto"></div>
                
                </div>
          {/* --- Materials Grid Skeleton --- */}
          <section>
            <div className="h-7 w-56 rounded-lg skeleton-shimmer mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark flex items-center justify-between">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-xl skeleton-shimmer shrink-0"></div>
                    <div className="space-y-2 w-full">
                      <div className="h-4 w-1/2 rounded skeleton-shimmer"></div>
                      <div className="h-3 w-1/3 rounded skeleton-shimmer opacity-50"></div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full skeleton-shimmer shrink-0"></div>
                </div>
              ))}
            </div>
          </section>

          {/* --- Assessment Resources Skeleton --- */}
          <section className="bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-border-light dark:border-border-dark">
            <div className="h-7 w-64 rounded-lg skeleton-shimmer mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="h-4 w-32 rounded skeleton-shimmer mb-4"></div>
                <div className="h-16 w-full rounded-xl skeleton-shimmer"></div>
                <div className="h-16 w-full rounded-xl skeleton-shimmer"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-32 rounded skeleton-shimmer mb-4"></div>
                <div className="h-16 w-full rounded-xl skeleton-shimmer"></div>
                <div className="h-16 w-full rounded-xl skeleton-shimmer"></div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default CourseDetailsSkeleton;