import React from 'react';

const SkeletonCard = () => (
  <div className="bg-card-light min-w-80 dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full animate-pulse">
   
    {/* Title Lines */}
    <div className="h-7 w-11/12 rounded-lg skeleton-shimmer mb-2"></div>
    <div className="h-7 w-1/2 rounded-lg skeleton-shimmer mb-4"></div>
    
    {/* Tag Pills */}
    <div className="flex gap-2 mb-8 flex-wrap">
      <div className="h-6 w-16 rounded-md skeleton-shimmer"></div>
      <div className="h-6 w-20 rounded-md skeleton-shimmer"></div>
    </div>
    <div className="flex gap-2 mb-8 flex-wrap">
      <div className="h-6 w-16 rounded-md skeleton-shimmer"></div>
      <div className="h-6 w-20 rounded-md skeleton-shimmer"></div>
      <div className="h-6 w-20 rounded-md skeleton-shimmer"></div>
    </div>

    <div className="mt-auto">
      <div className="h-px w-full bg-slate-100 dark:bg-slate-700 mb-5"></div>
      
      {/* Instructor Section */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full skeleton-shimmer shrink-0"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-3.5 w-32 rounded skeleton-shimmer"></div>
          <div className="h-3 w-20 rounded skeleton-shimmer opacity-60"></div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between">
        
        <div className="h-9 w-28 rounded-lg skeleton-shimmer"></div>
      </div>
    </div>
  </div>
);

// const Skeleton = () => {
//   // Create an array of 8 items to represent 2 rows of loading cards
//   const skeletonCards = Array(8).fill(null);

//   return (
//     <div className="bg-white dark:bg-black min-h-screen p-6 md:p-10">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Skeleton */}
//         {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div className="space-y-3">
//             <div className="h-10 w-64 rounded-xl skeleton-shimmer"></div>
//             <div className="h-4 w-80 rounded-lg skeleton-shimmer opacity-40"></div>
//           </div>
//           <div className="flex gap-3">
//             <div className="h-11 w-32 rounded-xl skeleton-shimmer"></div>
//           </div>
//         </div> */}

//         {/* Grid of Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {skeletonCards.map((_, index) => (
//             <SkeletonCard key={index} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

export default SkeletonCard;