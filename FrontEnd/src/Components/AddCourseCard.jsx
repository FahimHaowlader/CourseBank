import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";


const AddCourseCard = () => {
  return (
  <div className="group relative bg-transparent rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 dark:border-primary/20 dark:hover:border-primary/50 flex flex-col justify-center items-center h-full min-h-[300px] cursor-pointer hover:bg-primary/5 transition-all duration-300">
            <div className="flex flex-col items-center gap-3 text-primary/80 group-hover:text-primary transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-3xl"><AiOutlinePlus/></span>
              </div>
              <span className="font-bold text-lg">Add Course </span>
            </div>
          </div>
  )
}

export default AddCourseCard
