import { useState } from 'react';
import { formatCurrency } from '../utils/currency';
import { getStaggeredDelay, getEntranceAnimation, getHoverAnimation, getGlassMorphism } from '../utils/animations';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Groceries', icon: '🛒', color: 'success', totalSpent: 15840, transactionCount: 23, description: 'Food and household items' },
    { id: 2, name: 'Transportation', icon: '🚗', color: 'primary', totalSpent: 8520, transactionCount: 12, description: 'Fuel, maintenance, public transport' },
    { id: 3, name: 'Entertainment', icon: '🎬', color: 'secondary', totalSpent: 6200, transactionCount: 8, description: 'Movies, dining, hobbies' },
    { id: 4, name: 'Healthcare', icon: '🏥', color: 'danger', totalSpent: 4850, transactionCount: 5, description: 'Medical expenses and insurance' },
    { id: 5, name: 'Utilities', icon: '💡', color: 'warning', totalSpent: 9100, transactionCount: 6, description: 'Electricity, water, internet' },
    { id: 6, name: 'Shopping', icon: '🛍️', color: 'primary', totalSpent: 12340, transactionCount: 15, description: 'Clothing, accessories, gadgets' },
    { id: 7, name: 'Education', icon: '📚', color: 'secondary', totalSpent: 5600, transactionCount: 4, description: 'Courses, books, training' },
    { id: 8, name: 'Investment', icon: '📈', color: 'success', totalSpent: 25000, transactionCount: 3, description: 'Stocks, mutual funds, FD' },
  ]);

  const [activeView, setActiveView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSpent = categories.reduce((sum, cat) => sum + cat.totalSpent, 0);
  const totalTransactions = categories.reduce((sum, cat) => sum + cat.transactionCount, 0);

  const getGradientByColor = (color) => {
    const gradients = {
      primary: 'bg-gradient-primary',
      secondary: 'bg-gradient-secondary',
      success: 'bg-gradient-success',
      danger: 'bg-gradient-danger',
      warning: 'bg-gradient-warning'
    };
    return gradients[color] || gradients.primary;
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8 bg-snow-mist dark:bg-neural-dark">
      {/* Header Section */}
      <div className={`${getEntranceAnimation('scale')}`}>
        <div className={`${getGlassMorphism('strong')} p-8 rounded-3xl shadow-glass-strong`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-skywave bg-clip-text text-transparent mb-2">
                🏷️ Categories
              </h1>
              <p className="text-lg text-slate-gray dark:text-gray-300">
                Organize your transactions with custom categories
              </p>
            </div>
            <div className="flex gap-3">
              <button className={`px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-primary shadow-dopamine ${getHoverAnimation('lift')} focus:ring-2 focus:ring-primary-500/50`}>
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Category
              </button>
              <div className="flex rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveView('grid')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    activeView === 'grid'
                      ? 'bg-gradient-primary text-white'
                      : `${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300`
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    activeView === 'list'
                      ? 'bg-gradient-primary text-white'
                      : `${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300`
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${getEntranceAnimation('up')}`} style={getStaggeredDelay(1)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Total Categories</p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {categories.length}
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-danger-600 dark:text-danger-400">
                {formatCurrency(totalSpent)}
              </p>
            </div>
            <div className="p-3 bg-danger-100 dark:bg-danger-900/30 rounded-2xl">
              <svg className="w-6 h-6 text-danger-600 dark:text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Total Transactions</p>
              <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">
                {totalTransactions}
              </p>
            </div>
            <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl">
              <svg className="w-6 h-6 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`${getEntranceAnimation('up')}`} style={getStaggeredDelay(2)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-3 w-full rounded-2xl border-0 ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-100 placeholder-slate-gray focus:ring-2 focus:ring-primary-500/50 transition-all duration-300`}
            />
          </div>
        </div>
      </div>

      {/* Categories Display */}
      <div className={`${getEntranceAnimation('up')}`} style={getStaggeredDelay(3)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass-strong`}>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-charcoal-ink dark:text-gray-100 mb-2">
              Your Categories
            </h3>
            <p className="text-slate-gray dark:text-gray-400">
              {filteredCategories.length} of {categories.length} categories
            </p>
          </div>

          {activeView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={`${getGlassMorphism('light')} p-6 rounded-2xl border border-glass-border group ${getHoverAnimation('lift')}`}
                  style={getStaggeredDelay(index, 0.1)}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto ${getGradientByColor(category.color)} rounded-2xl flex items-center justify-center text-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h4 className="font-bold text-charcoal-ink dark:text-gray-100 mb-2">
                      {category.name}
                    </h4>
                    <p className="text-sm text-slate-gray dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-gray">Total Spent</span>
                        <span className="font-semibold text-danger-600 dark:text-danger-400">
                          {formatCurrency(category.totalSpent)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-gray">Transactions</span>
                        <span className="font-semibold text-charcoal-ink dark:text-gray-100">
                          {category.transactionCount}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`}>
                        Edit
                      </button>
                      <button className={`px-3 py-2 rounded-xl text-xs font-medium ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={`flex items-center justify-between p-4 ${getGlassMorphism('light')} rounded-2xl border border-glass-border group ${getHoverAnimation('lift')}`}
                  style={getStaggeredDelay(index, 0.05)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${getGradientByColor(category.color)} rounded-2xl flex items-center justify-center text-xl text-white`}>
                      {category.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal-ink dark:text-gray-100">
                        {category.name}
                      </h4>
                      <p className="text-sm text-slate-gray dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-semibold text-danger-600 dark:text-danger-400">
                        {formatCurrency(category.totalSpent)}
                      </p>
                      <p className="text-xs text-slate-gray">
                        {category.transactionCount} transactions
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className={`p-2 rounded-xl ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className={`p-2 rounded-xl ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gradient-glass rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-charcoal-ink dark:text-gray-100 mb-2">
                No categories found
              </h3>
              <p className="text-slate-gray dark:text-gray-400">
                Try adjusting your search terms or create a new category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-primary rounded-full shadow-dopamine flex items-center justify-center ${getHoverAnimation('lift')} focus:ring-2 focus:ring-primary-500/50 z-20`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default Categories;
