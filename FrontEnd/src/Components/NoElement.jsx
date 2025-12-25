import React from "react";
import { MdOutlineFolderOff } from "react-icons/md";

const NoElement = ({title}) => {
  return (
    <div class="bg-surface-light dark:bg-surface-dark border  border-border-light dark:border-border-dark rounded-xl px-5 py-6  flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-3xl">
          <MdOutlineFolderOff />
        </span>
      </div>
      <h3 class="text-base font-semibold text-slate-900 dark:text-white mb-1">
        No {title} available at this time
      </h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        Check back later for {title}
      </p>
    </div>
  );
};

export default NoElement;
