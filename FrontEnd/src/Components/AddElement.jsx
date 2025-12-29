import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";

const AddElement = ({ title, onAdd }) => {
  return (
    <div onClick={onAdd}  className="cursor-pointer bg-surface-light hover:bg-primary/5 dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-5 py-[5px] flex flex-col items-center justify-center text-center">
      
      {/* <div className="w-16 h-16 cursor-pointer bg-teal-50 hover:bg-primary/5 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4"> */}
      <button
        
        className="w-16 h-16 cursor-pointer rounded-full flex items-center justify-center">
       
        <AiOutlinePlus className="text-primary  text-3xl cursor-pointer" />
        </button>
      {/* </div> */}

    </div>
  );
};

export default AddElement
