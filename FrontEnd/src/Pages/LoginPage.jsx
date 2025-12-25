import React from "react";
import { MdLock } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { TbEye } from "react-icons/tb";
import { TbEyeClosed } from "react-icons/tb";

const LoginPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 font-sans antialiased h-screen flex flex-col selection:bg-teal-100 dark:selection:bg-teal-900">
      {/* <nav className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <a
                className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight"
                href="#"
              >
                <span className="material-symbols-outlined icon-filled text-3xl">
                  school
                </span>
                <span className="text-slate-900 dark:text-white">
                  University Portal
                </span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                href="#"
              >
                Help Center
              </a>
            </div>
          </div>
        </div>
      </nav> */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-3xl icon-filled">
                  <MdLock />
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                Please sign in to access your course bank.
              </p>
            </div>
            <form action="#" className="space-y-6" method="POST">
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  htmlFor="email"
                >
                  Userid
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-xl">
                      <MdOutlinePersonOutline />
                    </span>
                  </div>
                  <input
                    autoComplete="username"
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                    id="userid"
                    name="userid"
                    placeholder="CSE2023XXXX"
                    required=""
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-xl">
                      <IoMdKey />
                    </span>
                  </div>
                  <input
                    autoComplete="current-password"
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required=""
                    type="password"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 -top-10 right-5 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-xl">
                      <TbEye />
                      {/* <TbEyeClosed/> */}
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  />
                  <label
                    className="ml-2 block text-sm text-slate-600 dark:text-slate-400"
                    for="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    className="font-medium text-primary hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
              </div> */}
              <div>
                <button
                  className="w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-primary hover:bg-teal-700 focus:outline-none  focus:ring-offset-2 focus:ring-primary transition-all transform hover:-translate-y-0.5"
                  type="submit"
                >
                  Login
                  {/* <div className="flex items-center justify-center">
                        <div className="h-7 w-7 animate-spin rounded-full border-4 border-slate-300  border-t-primary"></div>  
                      </div> */}
                </button>
              </div>
            </form>
            {/* <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-700 pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?
                <a
                  className="font-medium text-primary hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                  href="#"
                >
                  Register now
                </a>
              </p>
            </div> */}
          </div>
          {/* <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex justify-center gap-6">
            <a
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              href="#"
              title="Login with Google"
            >
              <span className="sr-only">Login with Google</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
              </svg>
            </a>
            <a
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              href="#"
              title="Login with Microsoft"
            >
              <span className="sr-only">Login with Microsoft</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"></path>
              </svg>
            </a>
          </div> */}
        </div>
      </main>
      {/* <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
            © 2024 University Portal. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default LoginPage;
