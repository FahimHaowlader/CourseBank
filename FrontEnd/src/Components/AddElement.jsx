import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";

const AddElement = ({ title, onAdd }) => {
  return (
    <div className="bg-surface-light hover:bg-primary/5 dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-5 py-[5px] flex flex-col items-center justify-center text-center">
      
      {/* <div className="w-16 h-16 cursor-pointer bg-teal-50 hover:bg-primary/5 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4"> */}
      <button
        onClick={onAdd} 
        className="w-16 h-16 cursor-pointer bg-primary/10 hover:bg-primary/20 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
       
        <AiOutlinePlus className="text-primary  text-3xl cursor-pointer" />
        </button>
      {/* </div> */}

      {/* <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
        Add a new {title}
      </h3> */}

      {/* <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
        Create and manage additional {title}s whenever you need.
      </p> */}

      {/* <button
        onClick={onAdd}
        className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
      >
        Add New {title}
      </button> */}

    </div>
  );
};

export default AddElement
