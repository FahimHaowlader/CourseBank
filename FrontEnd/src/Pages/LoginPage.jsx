import React, { useState } from "react";
import { MdLock, MdOutlinePersonOutline } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useAuth } from "../Contexts/Auth.Context.jsx";
import axios from "axios";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginWithUserIdAndPassword, error, setError, loading, setLoading } =
    useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const userid = e.target.userid.value;
    const password = e.target.password.value;

    // 1. Validation Logic
    if (!userid || !password) {
      setError("Please enter both User ID and password.");
      return;
    }
    // if (userid.length !== 11 && userid.length !== 10) {
    //   setError("Invalid User ID .");
    //   return;
    // }
    // if (password.length !== 6) {
    //   setError("wrong password .");
    //   return;
    // }

    // 2. Simulated Login Logic
    setLoading(true);
    console.log("Logging in with:", userid.toLowerCase());

    // const response =  await loginWithUserIdAndPassword(userid.toLowerCase(), password);
    // console.log("Login response:", response);
    
    try {
      const response = await axios.post(
        `https://coursebank.onrender.com/api/v1/login`,
        {
          userId: userid.toLowerCase(),
          password: password,
        },
        { withCredentials: true }
      );
      console.log("Login response:", response.data);
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Login failed. Please check your User ID and password.");
      setLoading(false);
      return;
    }
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      // Handle actual login redirect or logic here
    }, 1500);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans antialiased min-h-screen flex flex-col selection:bg-teal-100 dark:selection:bg-teal-900">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-8 sm:p-10">
            {/* Header Section */}
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdLock className="text-teal-600 dark:text-teal-400 text-3xl" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                Please sign in to access your course bank.
              </p>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                {/* <span className="material-symbols-outlined text-base">error</span> */}
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* UserID Input */}
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  htmlFor="userid"
                >
                  User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <MdOutlinePersonOutline className="text-xl" />
                  </div>
                  <input
                    id="userid"
                    name="userid"
                    type="text"
                    placeholder="CSE2023XXXX"
                    required
                    autoComplete="username"
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <IoMdKey className="text-xl" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="block w-full pl-10 pr-12 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {passwordVisible ? (
                      <TbEyeClosed className="text-xl" />
                    ) : (
                      <TbEye className="text-xl" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg shadow-sm text-base font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
