import { useState } from 'react';
import { formatCurrency, calculatePercentage } from '../utils/currency';
import { getStaggeredDelay, getEntranceAnimation, getHoverAnimation, getGlassMorphism } from '../utils/animations';

const Budgets = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: 'Groceries',
      icon: '🛒',
      budget: 8000,
      spent: 5840,
      period: 'Monthly',
      color: 'success',
      description: 'Food and household items'
    },
    {
      id: 2,
      category: 'Transportation',
      icon: '🚗',
      budget: 5000,
      spent: 3520,
      period: 'Monthly',
      color: 'primary',
      description: 'Fuel, maintenance, public transport'
    },
    {
      id: 3,
      category: 'Entertainment',
      icon: '🎬',
      budget: 4000,
      spent: 4200,
      period: 'Monthly',
      color: 'secondary',
      description: 'Movies, dining, hobbies'
    },
    {
      id: 4,
      category: 'Healthcare',
      icon: '🏥',
      budget: 3000,
      spent: 850,
      period: 'Monthly',
      color: 'danger',
      description: 'Medical expenses and insurance'
    },
    {
      id: 5,
      category: 'Utilities',
      icon: '💡',
      budget: 6000,
      spent: 4100,
      period: 'Monthly',
      color: 'warning',
      description: 'Electricity, water, internet'
    },
    {
      id: 6,
      category: 'Shopping',
      icon: '🛍️',
      budget: 7000,
      spent: 2340,
      period: 'Monthly',
      color: 'primary',
      description: 'Clothing, accessories, gadgets'
    }
  ]);

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budget, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  const getBudgetStatus = (spent, budget) => {
    const percentage = calculatePercentage(spent, budget);
    if (percentage >= 100) return { status: 'exceeded', color: 'danger' };
    if (percentage >= 80) return { status: 'warning', color: 'secondary' };
    if (percentage >= 60) return { status: 'good', color: 'primary' };
    return { status: 'excellent', color: 'success' };
  };

  const getProgressBarColor = (spent, budget) => {
    const percentage = calculatePercentage(spent, budget);
    if (percentage >= 100) return 'bg-gradient-danger';
    if (percentage >= 80) return 'bg-gradient-sunrise';
    if (percentage >= 60) return 'bg-gradient-secondary';
    return 'bg-gradient-success';
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8 bg-snow-mist dark:bg-neural-dark">
      {/* Header Section */}
      <div className={`${getEntranceAnimation('scale')}`}>
        <div className={`${getGlassMorphism('strong')} p-8 rounded-3xl shadow-glass-strong`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-skywave bg-clip-text text-transparent mb-2">
                🎯 Budgets
              </h1>
              <p className="text-lg text-slate-gray dark:text-gray-300">
                Set and track your spending limits to achieve financial goals
              </p>
            </div>
            <button className={`px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-primary shadow-dopamine ${getHoverAnimation('lift')} focus:ring-2 focus:ring-primary-500/50`}>
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Budget
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${getEntranceAnimation('up')}`} style={getStaggeredDelay(1)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {formatCurrency(totalBudget)}
              </p>
              <p className="text-xs text-slate-gray mt-1">This month</p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-danger-600 dark:text-danger-400">
                {formatCurrency(totalSpent)}
              </p>
              <p className="text-xs text-slate-gray mt-1">{calculatePercentage(totalSpent, totalBudget)}% of budget</p>
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
              <p className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Remaining</p>
              <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'}`}>
                {formatCurrency(Math.abs(totalRemaining))}
              </p>
              <p className="text-xs text-slate-gray mt-1">{totalRemaining >= 0 ? 'Under budget' : 'Over budget'}</p>
            </div>
            <div className={`p-3 ${totalRemaining >= 0 ? 'bg-success-100 dark:bg-success-900/30' : 'bg-danger-100 dark:bg-danger-900/30'} rounded-2xl`}>
              {totalRemaining >= 0 ? (
                <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-danger-600 dark:text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Cards */}
      <div className={`${getEntranceAnimation('up')}`} style={getStaggeredDelay(2)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass-strong`}>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-charcoal-ink dark:text-gray-100 mb-2">
              Category Budgets
            </h3>
            <p className="text-slate-gray dark:text-gray-400">
              Track your spending across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.map((budget, index) => {
              const percentage = calculatePercentage(budget.spent, budget.budget);
              const status = getBudgetStatus(budget.spent, budget.budget);
              const progressColor = getProgressBarColor(budget.spent, budget.budget);

              return (
                <div
                  key={budget.id}
                  className={`${getGlassMorphism('light')} p-6 rounded-2xl border border-glass-border group ${getHoverAnimation('lift')}`}
                  style={getStaggeredDelay(index, 0.1)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-glass flex items-center justify-center text-xl">
                        {budget.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal-ink dark:text-gray-100">
                          {budget.category}
                        </h4>
                        <p className="text-xs text-slate-gray dark:text-gray-400">
                          {budget.description}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      status.status === 'exceeded' ? 'bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-300' :
                      status.status === 'warning' ? 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300' :
                      status.status === 'good' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' :
                      'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300'
                    }`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-gray dark:text-gray-400">Spent</span>
                      <span className="font-semibold text-charcoal-ink dark:text-gray-100">
                        {formatCurrency(budget.spent)}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`${progressColor} h-3 rounded-full transition-all duration-1000 ease-out relative`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      >
                        {percentage > 100 && (
                          <div className="absolute inset-0 bg-gradient-danger animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-gray dark:text-gray-400">Budget</span>
                      <span className="font-semibold text-charcoal-ink dark:text-gray-100">
                        {formatCurrency(budget.budget)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-glass-line">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-medium ${
                          budget.budget - budget.spent >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
                        }`}>
                          {budget.budget - budget.spent >= 0 ? 'Remaining' : 'Over budget'}
                        </span>
                        <span className={`font-bold ${
                          budget.budget - budget.spent >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
                        }`}>
                          {formatCurrency(Math.abs(budget.budget - budget.spent))}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`}>
                      Edit
                    </button>
                    <button className={`px-3 py-2 rounded-xl text-xs font-medium ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
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

export default Budgets;
