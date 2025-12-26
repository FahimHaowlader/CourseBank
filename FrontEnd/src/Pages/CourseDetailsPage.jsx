import React from "react";
import { GrShareOption } from "react-icons/gr";
import { LuNotebook } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import NoCourse from "../Components/NoCourse";
import NoElement from "../Components/NoElement";

const CourseDetailsPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 font-sans antialiased selection:bg-teal-100 dark:selection:bg-teal-900">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10 pt-5">
        {/* <nav
          aria-label="Breadcrumb"
          className="flex text-sm text-slate-500 dark:text-slate-400 mb-6"
        >
          <ol className="flex items-center space-x-2">
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Courses
              </a>
            </li>
            <li>
              <span className="material-symbols-outlined text-xs text-slate-400">
                /
              </span>
            </li>
            <li className="font-medium text-slate-900 dark:text-white">
              CS101
            </li>
          </ol>
        </nav> */}
        <header className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* <div className="flex items-center gap-3 mb-3">
                <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  Spring 2024
                </span>
                <span className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  Open
                </span>
              </div> */}
              <h1 className="text-3xl sm:text-4xl mb-2 text-transparent bg-clip-text  bg-primary-dark dark:bg-primary tracking-tight font-extrabold">
                Introduction to Computer Science
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-5">
                Department of Engineering • School of Computing
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  3 Credits
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  Undergraduate
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  In-Person
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">
                    <GrShareOption />
                  </span>
                  Mon/Wed 10:00 AM
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {/* <button className="flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-all shadow-sm">
                <span className="material-symbols-outlined text-lg">
                  bookmark
                </span>
                Save
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-all shadow-sm">
                <span className="material-symbols-outlined text-lg">share</span>
                Share
              </button> */}
              <button className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-lg">
                  <GrShareOption />
                </span>
                Share Now
              </button>
            </div>
          </div>
        </header>
        {/* <div className="border-b border-border-light dark:border-border-dark mb-8">
          <nav className="flex space-x-8 -mb-px overflow-x-auto">
            <a
              className="border-b-2 border-primary text-primary font-semibold py-4 px-1 text-sm whitespace-nowrap"
              href="#"
            >
              Overview
            </a>
            <a
              className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 font-medium py-4 px-1 text-sm whitespace-nowrap transition-colors"
              href="#"
            >
              Syllabus
            </a>
            <a
              className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 font-medium py-4 px-1 text-sm whitespace-nowrap transition-colors"
              href="#"
            >
              Materials
            </a>
            <a
              className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 font-medium py-4 px-1 text-sm whitespace-nowrap transition-colors flex items-center gap-1"
              href="#"
            >
              Reviews
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded text-xs font-bold">
                4.8
              </span>
            </a>
          </nav>
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Instructor Info
              </h2>
              <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    alt="Dr. Sarah Jenkins"
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD916ur3Kw62VYw88YBsrNnkZ6ke42kDz0jYaHhQAqaXLhIwRuvwEuUrxicp0CetW2aGZFuonbY0jz1MWz_-C1ryyMAKpPuvGjiHTRYi8MB-RGQB4wRr3z3cTnpcGWLbst8PDjjg6VtLQ1XKoI_74KHsEISGlxppCAYWrT_5_-aXRldEBw0EGSlF5c3Ds3T6hRfCrZR1HxJwKbLxFSInIrkWZDsP2zdM_Otno_7_MgQBUtu73AyDbRWGpBCc0tr8oB5rGEK2EzfdLgP"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Dr. Sarah Jenkins
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      School of Computing
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm">
                  <div className="flex flex-col text-center sm:text-right">
                    <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">
                      Course Start
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      15th January 2024
                    </span>
                  </div>
                  {/* <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                  <div className="flex flex-col sm:text-right">
                    <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">
                      Format
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      Theory + Lab
                    </span>
                  </div> */}
                  {/* <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                  <span className="inline-flex items-center justify-center px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full font-mono text-xs font-semibold">
                    ● CS101-S24
                  </span> */}
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Course Description
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="mb-4">
                  Algebra of matrices: Various types of matrices: operations of
                  matrices: determinant of matrices: transpose and complex
                  conjugate of matrices: special types of matrices: block
                  matrices: adjoint und inverse of matrices: elementary row
                  operations und echelon forms of matrices: rank of a matrix:
                  System of lincar equations: Basic definitions, Linear
                  equations. degenerated linear equations, leading unknowns of a
                  non-degenerated linear equation, systems of linear equations
                  and their solutions, equivalent systems. and related theorems:
                  use of inverse matrix. rank. und echelon forms in solving
                  systems of homogeneous and non-homogencous linear equations;
                  LU decomposition and their application to solving the system
                  of linear equations: Vector space: Basie definitions and
                  examples: lincar combinations: spanning sets: subspaces:
                  linear span: row and column spaces of matrices: linear
                  dependence and independence of vectors: direct sum: basis and
                  dimension of vector space: quotient space: solution space of a
                  system of homogeneous linear equations: Linear
                  transformations: kernel. image, rank. and nullity: matris
                  representation: change of basis: similarity: bigenvalues and
                  cigenvectors: Polynomials of matrices; characteristics of
                  polynomials; characteristic equations: Cayloy-Hamilton
                  theorem: cigenvalues and cigenvectors: diagonalization of
                  matrices: Inner product space: Cauchy-Schwarz inequality:
                  orthogonal vectors and orthonormal basis: Gram-Schmidt
                  orthogonalization process and its application to QR
                  decomposition: bilinear and quadratic forms.
                </p>
              </div>
            </section>
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary dark:text-teal-300 text-2xl">
                    <LuNotebook />
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    Full Course Handbook
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                    Download the complete guide including detailed policies,
                    grading rubric
                  </p>
                </div>
              </div>
              <button className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-lg">
                  <MdOutlineFileDownload size={26} />
                </span>
                Download PDF
              </button>
              {/* <button className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition-all transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-lg">
                  <MdOutlineFileDownload/>
                </span>
                Download PDF
              </button> */}
            </div>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Course Materials
                </h2>
                {/* <a
                  className="text-sm font-semibold text-primary hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                  href="#"
                >
                  View All Files
                </a> */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                      <span className="material-symbols-outlined">
                        <FaRegFilePdf size={24} />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        Lecture Notes: Weeks 1-4
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        PDF • 2.4 MB • Updated yesterday
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <MdOutlineFileDownload size={26} />
                  </span>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                      <span className="material-symbols-outlined">
                        <FaRegFilePdf size={24} />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        Lecture Notes: Weeks 1-4
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        PDF • 2.4 MB • Updated yesterday
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <MdOutlineFileDownload size={26} />
                  </span>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                      <span className="material-symbols-outlined">
                        <FaRegFilePdf size={24} />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        Lecture Notes: Weeks 1-4
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        PDF • 2.4 MB • Updated yesterday
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <MdOutlineFileDownload size={26} />
                  </span>
                </div>
                {/* <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <span className="material-symbols-outlined">code</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        Lab Starter Code
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        ZIP • 156 KB • Week 2 Resources
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary">
                    download
                  </span>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <span className="material-symbols-outlined">
                        slideshow
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        Python Setup Guide
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        PPTX • 5.1 MB • Supplementary
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary">
                    download
                  </span>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <span className="material-symbols-outlined">
                        table_view
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        Dataset: Iris.csv
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        CSV • 12 KB • For Lab 3
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary">
                    download
                  </span>
                </div> */}
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Suggested Books
              </h2>
              <div className="space-y-4">
                <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-800">
                      <span className="material-symbols-outlined text-primary text-2xl ">
                        <MdOutlineMenuBook size={24} />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Think Python: How to Think Like a Computer Scientist
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Allen B. Downey • 2nd Edition • O'Reilly Media
                      </p>
                      {/* <p className="text-xs font-mono text-slate-400 mt-2">
                        ISBN: 978-1491939369
                      </p> */}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <MdOutlineFileDownload size={26} />
                  </span>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-800">
                      <span className="material-symbols-outlined text-primary text-2xl ">
                        <MdOutlineMenuBook size={24} />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Think Python: How to Think Like a Computer Scientist
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Allen B. Downey • 2nd Edition • O'Reilly Media
                      </p>
                      {/* <p className="text-xs font-mono text-slate-400 mt-2">
                        ISBN: 978-1491939369
                      </p> */}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <MdOutlineFileDownload size={26} />
                  </span>
                </div>
                {/* <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-16 bg-teal-50 dark:bg-teal-900/20 rounded flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-800">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        menu_book
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Clean Code: A Handbook of Agile Software Craftsmanship
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Robert C. Martin • 1st Edition • Prentice Hall
                      </p>
                      <p className="text-xs font-mono text-slate-400 mt-2">
                        ISBN: 978-0132350884
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    download
                  </span>
                </div> */}
              </div>
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Active Tasks &amp; Assignments
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                        <span className="material-symbols-outlined">
                          <IoDocumentsOutline size={24} />
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                          Lecture Notes: Weeks 1-4
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          PDF • 2.4 MB • Updated yesterday
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                        <span className="material-symbols-outlined">
                          <IoDocumentsOutline size={24} />
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                          Lecture Notes: Weeks 1-4
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          PDF • 2.4 MB • Updated yesterday
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark">
                        <span className="material-symbols-outlined">
                          <IoDocumentsOutline size={24} />
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                          Lecture Notes: Weeks 1-4
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          PDF • 2.4 MB • Updated yesterday
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                  {/* <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <span className="material-symbols-outlined">code</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        Lab Starter Code
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        ZIP • 156 KB • Week 2 Resources
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary">
                    download
                  </span>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <span className="material-symbols-outlined">
                        slideshow
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        Python Setup Guide
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        PPTX • 5.1 MB • Supplementary
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary">
                    download
                  </span>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <span className="material-symbols-outlined">
                        table_view
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                        Dataset: Iris.csv
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        CSV • 12 KB • For Lab 3
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 hover:text-primary">
                    download
                  </span>
                </div> */}
                </div>
              </section>
            </div>
            {/* <NoElement/> */}

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Assessment Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      <MdOutlineAssignment size={20} />
                    </span>
                    Term Test Questions
                  </h3>
                  <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded text-lg">
                        <IoDocumentTextOutline size={24} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Spring 2023 - Midterm Exam
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Practice questions with answer key
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                  <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded text-lg">
                        <IoDocumentTextOutline size={24} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Fall 2022 - Midterm Exam
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Questions only
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                  <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded text-lg">
                        <IoDocumentTextOutline size={24} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Sample Quiz Questions
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Logic &amp; Control Flow • Interactive PDF
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      <MdOutlineAssignment size={20} />
                    </span>
                    Final Exam Questions
                  </h3>
                  <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded text-lg">
                        <IoDocumentTextOutline size={24} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Spring 2023 - Final Exam
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Comprehensive review set
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                  <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded text-lg">
                        <IoDocumentTextOutline size={24} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Fall 2022 - Final Exam
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Past paper
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MdOutlineFileDownload size={26} />
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      {/* <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <span className="material-symbols-outlined icon-filled">
              school
            </span>
            <span className="text-slate-900 dark:text-white">
              University Portal
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
            © 2024 University Portal. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Help
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default CourseDetailsPage;
