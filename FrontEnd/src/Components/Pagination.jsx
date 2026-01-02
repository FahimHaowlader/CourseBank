import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = ({page , setPage,totalDocs}) => {
      const totalPages = Math.ceil(totalDocs/ 12);
    const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'auto' for instant jump, 'smooth' for scrolling animation
    });
  };
    const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };
  const pageNumbers = getPageNumbers();
  return (
     <div className="flex flex-1 items-center justify-center mt-10">
           <div>
             <nav
               aria-label="Pagination"
               className="isolate inline-flex -space-x-px rounded-md shadow-sm"
             >
               <button
                 onClick={() => handlePageChange(Math.max(1, page - 1))}
                 disabled={page === 1}
                 className="relative inline-flex items-center rounded-l-md px-2 py-2 text-text-secondary ring-1 ring-inset ring-border-light hover:bg-primary/30 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
               >
                 <span className="sr-only">Previous</span>
                 <IoIosArrowBack className="text-[20px]" />
               </button>
   
               {/* First page */}
               <button
                 onClick={() => handlePageChange(1)}
                 className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                   page === 1
                     ? "bg-primary text-white"
                     : "text-text-secondary ring-1 ring-inset ring-border-light hover:bg-primary/30"
                 }`}
               >
                 1
               </button>
   
               {/* Ellipsis before middle pages */}
               {pageNumbers[0] > 2 && (
                 <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-secondary ring-1 ring-inset ring-border-light">
                   ...
                 </span>
               )}
   
               {/* Middle pages */}
               {pageNumbers.map((num) => (
                 <button
                   key={num}
                   onClick={() => handlePageChange(num)}
                   className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                     page === num
                       ? "bg-primary text-white"
                       : "text-text-secondary ring-1 ring-inset ring-border-light hover:bg-primary/30"
                   }`}
                 >
                   {num}
                 </button>
               ))}
   
               {/* Ellipsis after middle pages */}
               {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                 <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-secondary ring-1 ring-inset ring-border-light">
                   ...
                 </span>
               )}
   
               {/* Last page */}
               {totalPages > 1 && (
                 <button
                   onClick={() => handlePageChange(totalPages)}
                   className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                     page === totalPages
                       ? "bg-primary text-white"
                       : "text-text-secondary ring-1 ring-inset ring-border-light hover:bg-primary/30"
                   }`}
                 >
                   {totalPages}
                 </button>
               )}
   
               {/* Next */}
               <button
                 onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                 disabled={page === totalPages}
                 className="relative inline-flex items-center rounded-r-md px-2 py-2 text-text-secondary ring-1 ring-inset ring-border-light hover:bg-primary/30 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
               >
                 <span className="sr-only">Next</span>
                 <IoIosArrowForward className="text-[20px]" />
               </button>
             </nav>
           </div>
         </div>
  )
}

export default Pagination
