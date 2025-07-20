import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../ui/DarkModeToggle';

const TopBar = ({ onMenuToggle }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, type: 'achievement', message: 'Congratulations! You\'ve stayed under budget for 5 days!', time: '2 min ago', icon: '🏆' },
    { id: 2, type: 'reminder', message: 'Don\'t forget to log your coffee expense', time: '1 hour ago', icon: '☕' },
    { id: 3, type: 'insight', message: 'You\'ve saved 15% more this month compared to last month', time: '3 hours ago', icon: '📈' },
  ]);

  useEffect(() => {
    // For now, set no user and not loading to avoid Firebase issues
    setUser(null);
    setIsLoading(false);
    
    // TODO: Add back auth service when Firebase is configured
    // const unsubscribe = authService.onAuthStateChanged((userData) => {
    //   setUser(userData);
    //   setIsLoading(false);
    // });
    // return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    console.log('Sign in - Firebase not configured yet');
    // TODO: Implement when Firebase is configured
  };

  const handleSignOut = async () => {
    console.log('Sign out - Firebase not configured yet');
    // TODO: Implement when Firebase is configured
  };

  const getUserInitials = () => {
    if (!user?.displayName) return 'U';
    return user.displayName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  };

  const getUserDisplayName = () => {
    return user?.displayName || 'Guest User';
  };

  return (
    <>
      {/* Top Bar with Glassmorphism */}
      <header className="sticky top-0 z-50 w-full">
        {/* Backdrop Blur Layer */}
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/50"></div>
        
        <div className="relative z-10 px-4 lg:px-6 h-16">
          <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo and Brand */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gradient">ExpenseTracker</h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-none">Financial Freedom</p>
                </div>
              </Link>
            </div>

            {/* Center Section - Search (Hidden on mobile) */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search transactions, categories..."
                  className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {/* Quick Add Button */}
              <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-primary text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-glow hover:shadow-glow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Add</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V7a4 4 0 00-8 0v5l-5 5h18z" />
                  </svg>
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-danger rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 glass-card p-4 animate-slide-down">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                      <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                        Mark all read
                      </button>
                    </div>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors duration-200">
                          <span className="text-2xl">{notification.icon}</span>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <DarkModeToggle className="p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105" />

              {/* User Profile */}
              <div className="relative">
                {isLoading ? (
                  <div className="w-8 h-8 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                ) : user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'User'}
                          className="w-8 h-8 rounded-xl object-cover ring-2 ring-primary-500/20"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                          {getUserInitials()}
                        </div>
                      )}
                      <span className="hidden lg:block text-sm font-medium text-gray-900 dark:text-gray-100">
                        {getUserDisplayName()}
                      </span>
                      <svg className="hidden lg:block w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* User Menu Dropdown */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 glass-card p-2 animate-slide-down">
                        <div className="px-3 py-2 border-b border-white/20 dark:border-gray-700/50 mb-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{getUserDisplayName()}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors duration-200">
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Profile</span>
                        </Link>
                        <Link to="/settings" className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors duration-200">
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Settings</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors duration-200 text-danger-600 dark:text-danger-400"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="text-sm">Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="btn-dopamine text-sm px-4 py-2"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </>
  );
};

export default TopBar;
