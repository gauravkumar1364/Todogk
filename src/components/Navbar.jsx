import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./usetheme.js";

const Navbar = () => {
  // The logic part is already done!
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      {/* STEP 1: Background and border updated */}
      <div className="bg-white dark:bg-[#2A2A2A] flex justify-between py-3 border-b border-gray-200 dark:border-transparent transition-colors">
        
        {/* STEP 2: Text color updated */}
        <div className="text-gray-800 dark:text-[#E0E0E0] font-sans px-7 font-medium transition-all duration-100 hover:text-[#893aff] hover:scale-105 cursor-pointer">
          Todo GK
        </div>
        
        {/* STEP 2: Text color updated */}
        <ul className="flex items-center gap-9 text-gray-800 dark:text-[#E0E0E0] justify-end px-8 font-sans cursor-pointer ">
          <li className="hover:font-medium duration-50">Home</li>
          <li className="hover:font-medium duration-50">TODOs</li>
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 transition"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;