import SkeletonCard from "./SkeletonCard";

const GeneralSkeleton = () => {
  return (
    <div className="bg-background-light dark:bg-black min-h-screen flex flex-col font-display antialiased">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded skeleton mb-3"></div>
            <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-20 rounded-lg bg-gray-200 dark:bg-gray-700 skeleton"></div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div>
              <SkeletonCard />
              </div>
              <div>
              <SkeletonCard />
              </div>
              <div>
              <SkeletonCard />
              </div>
              <div>
              <SkeletonCard />
              </div>
              <div>
              <SkeletonCard />
              </div>
              <div>
              <SkeletonCard />
              </div>
              <div className="hidden xl:block">
              <SkeletonCard />
              </div>
             <div className="hidden xl:block">
              <SkeletonCard />
              </div>
                <div className="hidden xl:block">
              <SkeletonCard />
              </div>
                <div className="hidden lg:block">
              <SkeletonCard />
              </div>
                <div className="hidden lg:block">
              <SkeletonCard />
              </div>
              <div className="hidden lg:block">
              <SkeletonCard />
              </div>
             
            
         
            </div>
      </main>
    </div>
  );
};

export default GeneralSkeleton;