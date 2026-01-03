import React from "react";
import { MdOutlineFolderOff } from "react-icons/md";

const NoElement = ({title}) => {
  return (
    <div className="bg-surface-light hover:bg-primary/5 dark:bg-surface-dark border  border-border-light dark:border-border-dark rounded-xl px-5 py-6  flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-primary/10 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
        <span className="material-symbols-outlined  text-slate-400 dark:text-slate-500 text-3xl">
          <MdOutlineFolderOff className="text-primary text-3xl" />
        </span>
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
        No {title} available at this time
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        Check back later for {title}
      </p>
    </div>
  );
};

export default NoElement;
