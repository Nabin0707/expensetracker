import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Overview & Analytics'
    },
    {
      name: 'Transactions',
      href: '/transactions',
      icon: '💰',
      gradient: 'from-green-500 to-emerald-600',
      description: 'Income & Expenses'
    },
    {
      name: 'Categories',
      href: '/categories',
      icon: '🏷️',
      gradient: 'from-purple-500 to-pink-600',
      description: 'Organize & Tag'
    },
    {
      name: 'Budgets',
      href: '/budgets',
      icon: '🎯',
      gradient: 'from-orange-500 to-red-600',
      description: 'Goals & Limits'
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: '📈',
      gradient: 'from-cyan-500 to-blue-600',
      description: 'Insights & Trends'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: '⚙️',
      gradient: 'from-gray-500 to-slate-600',
      description: 'Preferences'
    },
  ];

  const quickActions = [
    { name: 'Add Income', icon: '⬆️', color: 'text-green-600' },
    { name: 'Add Expense', icon: '⬇️', color: 'text-red-600' },
    { name: 'New Budget', icon: '🎯', color: 'text-blue-600' },
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        onClose();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose]);

  const isActive = (href) => {
    if (href === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === href;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-80 lg:w-72 xl:w-80
        transform transition-all duration-300 ease-elastic
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 glass-card backdrop-blur-xl"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gradient">Navigation</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Financial Control Center</p>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
            {navigation.map((item, index) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    group relative block px-4 py-3 rounded-2xl transition-all duration-300
                    ${active 
                      ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-glow transform scale-105' 
                      : 'hover:bg-white/10 dark:hover:bg-gray-800/30 hover:scale-105'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background glow effect */}
                  {active && (
                    <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  )}
                  
                  <div className="relative flex items-center space-x-4">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-300
                      ${active 
                        ? 'bg-white/20 backdrop-blur-sm transform rotate-12' 
                        : 'group-hover:scale-110 group-hover:rotate-6'
                      }
                    `}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold transition-colors duration-200 ${
                        active ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {item.name}
                      </div>
                      <div className={`text-xs transition-colors duration-200 ${
                        active ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                    
                    {/* Hover indicator */}
                    {hoveredItem === index && !active && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    )}
                    
                    {/* Active indicator */}
                    {active && (
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    )}
                  </div>
                  
                  {/* Ripple effect on hover */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-gradient-to-r ${item.gradient}
                  `} style={{ 
                    background: `radial-gradient(circle at center, ${active ? 'transparent' : 'rgba(255,255,255,0.1)'} 0%, transparent 70%)`,
                    transform: hoveredItem === index ? 'scale(1)' : 'scale(0.8)',
                    transition: 'all 0.3s ease'
                  }}></div>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/10">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 px-2">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={action.name}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/30 transition-all duration-200 group hover:scale-105"
                  style={{ animationDelay: `${(navigation.length + index) * 0.1}s` }}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">{action.icon}</span>
                  <span className={`text-sm font-medium ${action.color} group-hover:text-opacity-80`}>
                    {action.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Stats/Profile Section */}
          <div className="p-4 border-t border-white/10">
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold text-sm">$</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Monthly Progress</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-gradient-success h-2 rounded-full transition-all duration-1000" style={{ width: '67%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">67% of budget used</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
