import { useState, useMemo } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { GrShareOption } from "react-icons/gr";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { GoCircleSlash } from "react-icons/go";
import { MdCallMade } from "react-icons/md";


const DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  role: i % 2 ? "Member" : "Admin",
  email: `user${i + 1}@example.com`,
}));

const ROWS_PER_PAGE = 15;

export default function GmailTableWithSort() {
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAllGlobal, setSelectAllGlobal] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // example sort state

  const totalPages = Math.ceil(DATA.length / ROWS_PER_PAGE);

  const pageData = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return DATA.slice(start, start + ROWS_PER_PAGE);
  }, [page]);

  const pageIds = pageData.map((r) => r.id);

  const selectionMode = selectAllGlobal || selectedIds.length > 0;

  const allOnPageSelected =
    pageIds.length > 0 &&
    pageIds.every((id) => selectAllGlobal || selectedIds.includes(id));

  const toggleRow = (id) => {
    if (selectAllGlobal) {
      setSelectAllGlobal(false);
      setSelectedIds(DATA.map((r) => r.id).filter((x) => x !== id));
    } else {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const toggleAllOnPage = () => {
    setSelectedIds((prev) => {
      if (allOnPageSelected) {
        return prev.filter((id) => !pageIds.includes(id));
      }
      return [...new Set([...prev, ...pageIds])];
    });
  };

  const selectAllPages = () => {
    setSelectAllGlobal(true);
    setSelectedIds([]);
  };

  const clearSelection = () => {
    setSelectAllGlobal(false);
    setSelectedIds([]);
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Pagination numbers logic (3 pages around current)
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };
  const pageNumbers = getPageNumbers();

  return (
    <div className="space-y-3">
      {/* Action bar */}
       <div className={`${selectionMode ? "flex flex-col sm:flex-row gap-3 justify-between items-center":"flex justify-between " }  p-3 rounded`}> 
    
        <div className="flex items-center gap-4 ">
          {selectionMode && (
            <span className="text-sm border-r-2 border-primary pr-4 font-semibold">
              {selectAllGlobal
                ? `${DATA.length} selected`
                : `${selectedIds.length} selected`}
            </span>
          )}
          {/* Clear button only if any row selected */}
          {selectionMode && (
            <button
              onClick={clearSelection}
              className="text-red-600 text-sm border-r-2 font-semibold border-primary pr-4 cursor-pointer hover:underline"
            >
              Clear
            </button>
          )}

          {/* Select all button */}
          <button
            onClick={selectAllPages}
            className="text-primary font-semibold text-sm cursor-pointer w-20 hover:underline"
          >
            Select all
          </button>
        </div>

        {/* Sort section, only visible when no row selected */}
        {!selectionMode && (
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <span className="hidden sm:inline text-sm font-medium text-text-secondary dark:text-gray-400 whitespace-nowrap">
                Sort by:
              </span>
              <div className="relative">
                <select className="pl-3 pr-10 py-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm font-medium text-text-main dark:text-white focus:border-primary focus:ring-0 cursor-pointer appearance-none shadow-sm hover:shadow transition-shadow">
                  <option>Course Title (A-Z)</option>
                  <option>Professor Name (A-Z)</option>
                  <option>Year (Newest First)</option>
                  <option>Credit (High to Low)</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary material-symbols-outlined text-[20px]">
                  <IoIosArrowDown />
                </span>
              </div>
            </div>
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm font-medium text-text-secondary dark:text-gray-400 shadow-sm whitespace-nowrap">
                     <span className="material-symbols-outlined text-[20px] text-primary">
                       layers
                     </span>
                     <span className="hidden sm:inline">Total:</span>{" "}
                     <span className="font-bold text-text-main dark:text-white ml-0.5">
                       9
                     </span>{" "}
                     pages
                   </div> */}
          </div>
        )}
        {/* Sort section, only visible when row selected */}
        {/* {selectionMode && (
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div class="flex-1 flex justify-end items-center gap-2 ml-auto">
              
              <button
                class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors text-md font-medium shadow-sm cursor-pointer active:scale-95"
                title="Give Access"
              >
                <span class="material-icons text-base">
                  <IoMdCheckmarkCircle  size={18}/>
                </span>
                <span className="hidden sm:block">Allow </span>
                <span class="hidden lg:inline"> Access</span>
              </button>
              <button
                class="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-xl text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors text-md font-medium shadow-sm cursor-pointer active:scale-95"
                title="Deny Access"
              >
                <span class="material-icons text-base">
                  <GoCircleSlash  />
                </span>
                 <span className="hidden sm:block">Deny </span>
                <span class="hidden lg:inline"> Access</span>
              </button>
              <button
                class="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors text-md font-medium shadow-sm cursor-pointer active:scale-95"
                title="Delete selected"
              >
                <span class="material-icons text-base">
                  <MdDeleteOutline size={18} />
                </span>
                <span class="hidden sm:inline">Delete</span>
              </button>
              <button
                class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-700 border border-blue-200 dark:border-blue-600 text-blue-600 dark:text-blue-300 hover:bg-blue-100  dark:hover:bg-blue-600 transition-colors text-md font-medium shadow-sm rounded-xl cursor-pointer active:scale-95"
                title="Share selected"
              >
                <span class="material-icons text-base">
                  <GrShareOption />
                </span>
                <span class="hidden sm:inline">Share</span>
              </button>
            </div>
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm font-medium text-text-secondary dark:text-gray-400 shadow-sm whitespace-nowrap">
                     <span className="material-symbols-outlined text-[20px] text-primary">
                       layers
                     </span>
                     <span className="hidden sm:inline">Total:</span>{" "}
                     <span className="font-bold text-text-main dark:text-white ml-0.5">
                       9
                     </span>{" "}
                     pages
                   </div> 
          </div>
        )} */}
        {/* Sort section, only visible when row selected */}
        {selectionMode && (
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
             <div class="flex-1 flex justify-end items-center gap-2 ml-auto">
               <button
                 class="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-xl text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors text-md font-medium shadow-sm cursor-pointer active:scale-95"
                title="Deny Access"
              >
                <span class="material-icons text-base">
                  <FiEdit size={18}/>
                </span>
                <span class="">Change</span>
              </button>
              <button
                class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors text-md font-medium shadow-sm cursor-pointer active:scale-95"
                title="Give Access"
              >
                <span class="material-icons text-base">
                  <MdCallMade  size={18}/>
                </span>
                <span class="">Create</span>
              </button>
             
            </div>
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-sm font-medium text-text-secondary dark:text-gray-400 shadow-sm whitespace-nowrap">
                     <span className="material-symbols-outlined text-[20px] text-primary">
                       layers
                     </span>
                     <span className="hidden sm:inline">Total:</span>{" "}
                     <span className="font-bold text-text-main dark:text-white ml-0.5">
                       9
                     </span>{" "}
                     pages
                   </div> */}
          </div>
        )}

      </div>
      {/* this one to create new moderators */}
      {/* Table */}
      <table className="w-full  rounded-lg">
        <thead>
          <tr className="flex justify-between bg-primary text-white rounded-t-lg">
            <th className="p-3 w-40 ">Moderator ID</th>
            <th className="p-3 w-40 text-center">Password</th>
            <th className="p-3 hidden sm:block w-40  text-center ">Access</th>
           {/*  <th className="p-3 w-20 sm:w-28 lg:w-32 text-center">Courses</th> */}
            {/* <th className={`p-3 hidden lg:block lg:w-40 xl:w-80 text-center`}>Gmail</th> */}
            <th className={selectionMode ? "hidden" : " p-3  hidden sm:block w-40 lg:w-80"}>
              <span className={selectionMode ? "hidden" : " hidden sm:block"}>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((row) => {
            const checked = selectAllGlobal || selectedIds.includes(row.id);

            return (
              <>
                <tr
                  key={row.id}
                  onClick={() => toggleRow(row.id)}
                  className={`flex justify-between cursor-pointer ${
                    checked ? "bg-primary/5" : "hover:bg-primary/10"
                  }`}
                >
                  <td className="w-40 flex items-center  pl-3 ">
                    <div className={selectionMode ? "bolck" : "hidden"}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleRow(row.id)}
                        onClick={(e) => e.stopPropagation()}
                        // className={selectionMode ? "p-3 w-6" : "hidden"}
                      />
                    </div>
                    <h1 className="p-3 pl-4">{"CSE2023233"}</h1>
                  </td>
                  <td className="py-3 inline-flex justify-center items-center w-44 ">{"drfdgfgfggrfddqq"}</td>
                 <td className="p-3 hidden w-40 sm:inline-flex justify-center items-center">
                    Allow
                  </td>
                   {/* <td className="p-3 w-20 sm:w-28 lg:w-32 inline-flex justify-center items-center">
                    <a
                      href="#"
                      className="hover:cursor-pointer hover:underline text-primary font-semibold"
                    >
                      View
                    </a>
                  </td> */}
                  {/* <td className={`p-3 hidden ${checked ? "w-80":" w-40 xl:w-80"} lg:inline-flex items-center overflow-hidden mr-5`}>
                    fcvftg
                  </td> */}
                  <td className={selectionMode ? "hidden" : " p-3 w-40 hidden sm:block lg:w-80 "}>
                      <div class="flex-1 flex justify-evenly items-center gap-2 ml-auto">
               <button
                 class="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-xl text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors text-md font-medium shadow-sm cursor-pointer active:scale-95"
                title="Deny Access"
              >
                <span class="material-icons text-base">
                  <FiEdit size={18}/>
                </span>
                <span class="hidden  lg:inline">Change</span>
              </button>
              <button
                class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors text-md font-medium shadow-sm cursor-pointer active:scale-95"
                title="Give Access"
              >
                <span class="material-icons text-base">
                  <MdCallMade  size={18}/>
                </span>
                <span class="hidden lg:inline">Create</span>
              </button>
             
            </div>
                  </td>
                </tr>
                {/* <tr
                key={row.id}
                onClick={() => toggleRow(row.id)}
                className={`border-t cursor-pointer ${
                  checked ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <td className="p-3 w-12">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRow(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    className={selectionMode ? "" : "invisible"}
                  />
                </td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.role}</td>
                <td className="p-3">
                  <span className={selectionMode ? "invisible" : ""}>
                    {row.email}
                  </span>
                </td>
              </tr> */}
              </>
            );
          })}
        </tbody>
      </table>

      {/* done one for already exists user  */}
      {/* <table className="w-full  rounded-lg">
        <thead>
          <tr className="flex justify-between bg-primary text-white rounded-t-lg">
            <th className="p-3 w-40 ">Moderator ID</th>
            <th className="p-3 hidden sm:block w-40 text-center">Password</th>
            <th className="p-3 hidden sm:block w-28 lg:w-32  text-center ">Access</th>
            <th className="p-3 w-20 sm:w-28 lg:w-32 text-center">Courses</th>
            <th className={`p-3 hidden lg:block lg:w-40 xl:w-80 text-center`}>Gmail</th>
            <th className={selectionMode ? "hidden" : " hidden sm:block p-3 w-40 lg:w-40 xl:w-80"}>
              <span className={selectionMode ? "hidden" : "p-3"}>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((row) => {
            const checked = selectAllGlobal || selectedIds.includes(row.id);

            return (
              <>
                <tr
                  key={row.id}
                  onClick={() => toggleRow(row.id)}
                  className={`flex justify-between cursor-pointer ${
                    checked ? "bg-primary/5" : "hover:bg-primary/10"
                  }`}
                >
                  <td className="w-40 flex items-center  pl-3 ">
                    <div className={selectionMode ? "bolck" : "hidden"}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleRow(row.id)}
                        onClick={(e) => e.stopPropagation()}
                        // className={selectionMode ? "p-3 w-6" : "hidden"}
                      />
                    </div>
                    <h1 className="p-3 pl-4">{"CSE2023233"}</h1>
                  </td>
                  <td className="py-3 hidden sm:inline-flex justify-center items-center w-44 ">{"drfdgfgfggrfddqq"}</td>
                  <td className="p-3 w-28 lg:w-32  hidden sm:inline-flex justify-center items-center">
                    Allow
                  </td>
                  <td className="p-3 w-20 sm:w-28 lg:w-32 inline-flex justify-center items-center">
                    <a
                      href="#"
                      className="hover:cursor-pointer hover:underline text-primary font-semibold"
                    >
                      View
                    </a>
                  </td>
                  <td className={`p-3 hidden ${checked ? "w-80":" w-40 xl:w-80"} lg:inline-flex items-center overflow-hidden mr-5`}>
                    Fahimhaoggffgwlader07jahidfcddfssddsd@gmail.com
                  </td>
                  <td className={selectionMode ? "hidden" : "hidden sm:block p-3 w-40 lg:w-40 xl:w-80 "}>
                    <div className="flex items-center justify-evenly">
                      <button
                        className="hidden xl:flex h-9 cursor-pointer  items-center justify-center rounded-xl bg-slate-200 text-slate-600 transition-colors duration-300 hover:bg-orange-50 hover:text-orange-500 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700"
                        title="Edit Course"
                      >
                        <span className="material-symbols-outlined text-md px-3">
                          Give Access
                        </span>
                      </button>
                      <button
                        className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-xl bg-slate-200 text-slate-600 transition-colors duration-300 hover:bg-primary/20 hover:text-primary dark:bg-gray-800 dark:text-primary dark:hover:bg-gray-700"
                        title="Edit Course"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          <FiEdit />
                        </span>
                      </button>
                      <button
                        className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-xl bg-slate-200 text-slate-600 transition-colors duration-300 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        title="Delete Course"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          <MdDeleteOutline size={24} />
                        </span>
                      </button>
                      <button
                        className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-xl bg-slate-200 text-slate-600 transition-colors duration-300 hover:bg-blue-50 hover:text-blue-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                        title="Share Course"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          <GrShareOption size={24} />
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* <tr
                key={row.id}
                onClick={() => toggleRow(row.id)}
                className={`border-t cursor-pointer ${
                  checked ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <td className="p-3 w-12">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRow(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    className={selectionMode ? "" : "invisible"}
                  />
                </td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.role}</td>
                <td className="p-3">
                  <span className={selectionMode ? "invisible" : ""}>
                    {row.email}
                  </span>
                </td>
              </tr> 
              </>
            );
          })}
        </tbody>
      </table> */}

      {/* Styled Pagination */}
      <div className="flex flex-1 items-center justify-center mt-10">
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-text-secondary ring-1 ring-inset ring-border-light hover:bg-primary/30 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <IoIosArrowBack className="text-[20px]" />
            </button>

            {/* First page */}
            <button
              onClick={() => setPage(1)}
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
                onClick={() => setPage(num)}
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
                onClick={() => setPage(totalPages)}
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
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-text-secondary ring-1 ring-inset ring-border-light hover:bg-primary/30 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <IoIosArrowForward className="text-[20px]" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
