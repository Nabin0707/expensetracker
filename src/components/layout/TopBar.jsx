import { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../ui/DarkModeToggle';

const TopBar = ({ onMenuToggle }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 lg:px-6 transition-colors duration-200">
      {/* Logo and Menu Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus-ring"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            ExpenseTracker
          </span>
        </Link>
      </div>

      {/* User Menu */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <DarkModeToggle />
        
        {/* Notifications */}
        <button className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus-ring relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.405-3.405A2.032 2.032 0 0118 12V9a6.002 6.002 0 00-4-5.659V3a2 2 0 10-4 0v.341C7.67 4.165 6 6.388 6 9v3c0 .79-.301 1.56-.839 2.139L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <div className="relative">
          <button className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-medium text-sm hover:scale-105 focus-ring transition-transform duration-200">
            JD
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
