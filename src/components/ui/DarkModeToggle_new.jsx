import { useState, useEffect } from 'react';

const DarkModeToggle = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(false);

  // Initialize dark mode based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 hover:scale-105 ${
        isDark 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-glow' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-glow'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <div
        className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-300 ease-elastic flex items-center justify-center ${
          isDark ? 'translate-x-7' : 'translate-x-0.5'
        }`}
      >
        {/* Sun/Moon Icon */}
        <div className={`transition-all duration-300 ${isDark ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
          <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className={`absolute transition-all duration-300 ${isDark ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>
          <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </div>

      {/* Background Stars (Dark Mode) */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-3 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-2 left-6 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      )}

      {/* Background Glow */}
      <div className={`absolute -inset-1 rounded-full blur transition-opacity duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 opacity-40'
      }`}></div>
    </button>
  );
};

export default DarkModeToggle;
