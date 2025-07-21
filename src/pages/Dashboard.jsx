import { useState, useEffect } from 'react';
import { formatCurrency, formatLargeNumber, calculatePercentage, getCurrencyColorClass } from '../utils/currency';
import { getStaggeredDelay, getEntranceAnimation, getHoverAnimation, getGlassMorphism } from '../utils/animations';

const Dashboard = () => {
  // Mock data with Indian currency
  const [stats, setStats] = useState({
    totalIncome: 87420.00,
    totalExpenses: 62890.50,
    balance: 24529.50,
    monthlyBudget: 75000.00,
    savingsGoal: 50000.00,
    currentSavings: 24529.50
  });

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'expense', category: 'Groceries', amount: 2840.00, date: '2025-07-19', description: 'Weekly shopping at BigBazar', icon: '🛒', color: '#FF6B6B' },
    { id: 2, type: 'income', category: 'Salary', amount: 75000.00, date: '2025-07-18', description: 'Monthly salary credit', icon: '💼', color: '#2ECC71' },
    { id: 3, type: 'expense', category: 'Transportation', amount: 1520.00, date: '2025-07-17', description: 'Petrol and metro card', icon: '⛽', color: '#F4A261' },
    { id: 4, type: 'expense', category: 'Entertainment', amount: 3200.00, date: '2025-07-16', description: 'Movie and dinner', icon: '🎬', color: '#A78BFA' },
    { id: 5, type: 'income', category: 'Freelance', amount: 12420.00, date: '2025-07-15', description: 'Website development project', icon: '💻', color: '#38B2AC' },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Spending Champion', description: 'Under budget for 7 days!', icon: '🔥', progress: 100, unlocked: true },
    { id: 2, title: 'Savings Master', description: 'Saved Rs. 15,000 this month', icon: '💰', progress: 78, unlocked: false },
    { id: 3, title: 'Budget Ninja', description: 'Track 100 transactions', icon: '🥷', progress: 65, unlocked: false },
  ]);

  const budgetUsed = calculatePercentage(stats.totalExpenses, stats.monthlyBudget);
  const savingsProgress = calculatePercentage(stats.currentSavings, stats.savingsGoal);

  // Get relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const transactionDate = new Date(date);
    const diffInHours = Math.abs(now - transactionDate) / (1000 * 60 * 60);
    
    if (diffInHours < 24) return 'Today';
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8 bg-snow-mist dark:bg-neural-dark">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-skywave rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-sunrise rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-success rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header Section with Welcome Message */}
      <div className={`relative z-10 ${getEntranceAnimation('scale')}`}>
        <div className={`${getGlassMorphism('strong')} p-8 mb-8 rounded-3xl shadow-glass-strong`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-skywave bg-clip-text text-transparent mb-2">
                Welcome back! 🎉
              </h1>
              <p className="text-lg text-slate-gray dark:text-gray-300">
                Here's your financial overview for <span className="font-semibold text-primary-600">July 2025</span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></span>
                  All systems healthy
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className={`px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-primary shadow-dopamine ${getHoverAnimation('lift')} focus:ring-2 focus:ring-primary-500/50`}>
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Transaction
              </button>
              <button className={`px-6 py-3 rounded-2xl font-semibold ${getGlassMorphism('medium')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`}>
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards with Micro-interactions */}
      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${getEntranceAnimation('up')}`} style={getStaggeredDelay(1)}>
        {/* Total Income Card */}
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              <span className="text-xs font-medium text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20 px-2 py-1 rounded-full">
                +12.5%
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Total Income</h3>
            <p className={`text-3xl font-bold ${getCurrencyColorClass('income')} group-hover:scale-105 transition-transform duration-300`}>
              {formatCurrency(stats.totalIncome)}
            </p>
            <p className="text-xs text-slate-gray dark:text-gray-500 mt-1">vs last month</p>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-danger-100 dark:bg-danger-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-danger-600 dark:text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
              <span className="text-xs font-medium text-danger-600 dark:text-danger-400 bg-danger-50 dark:bg-danger-900/20 px-2 py-1 rounded-full">
                +3.2%
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Total Expenses</h3>
            <p className={`text-3xl font-bold ${getCurrencyColorClass('expense')} group-hover:scale-105 transition-transform duration-300`}>
              {formatCurrency(stats.totalExpenses)}
            </p>
            <p className="text-xs text-slate-gray dark:text-gray-500 mt-1">vs last month</p>
          </div>
        </div>

        {/* Current Balance Card */}
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded-full">
                Available
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Current Balance</h3>
            <p className={`text-3xl font-bold ${getCurrencyColorClass('balance', stats.balance)} group-hover:scale-105 transition-transform duration-300`}>
              {formatCurrency(stats.balance)}
            </p>
            <p className="text-xs text-slate-gray dark:text-gray-500 mt-1">in savings account</p>
          </div>
        </div>

        {/* Savings Progress Card */}
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs font-medium text-secondary-600 dark:text-secondary-400 bg-secondary-50 dark:bg-secondary-900/20 px-2 py-1 rounded-full">
                {Math.round(savingsProgress)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Savings Goal</h3>
            <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 group-hover:scale-105 transition-transform duration-300">
              {formatCurrency(stats.currentSavings)}
            </p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                <div 
                  className="bg-gradient-secondary h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(savingsProgress, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-gray dark:text-gray-500">of {formatCurrency(stats.savingsGoal)} goal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <div className={`relative z-10 ${getEntranceAnimation('up')}`} style={getStaggeredDelay(2)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass-strong`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-charcoal-ink dark:text-gray-100">🏆 Achievements</h2>
              <p className="text-slate-gray dark:text-gray-400">Your financial milestones</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${getHoverAnimation('lift')} ${
                  achievement.unlocked 
                    ? 'bg-gradient-success border-success-300 shadow-glow-success' 
                    : `${getGlassMorphism('light')} border-glass-line`
                }`}
                style={getStaggeredDelay(index, 0.1)}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-3 ${achievement.unlocked ? 'animate-bounce-in' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-bold mb-1 ${
                    achievement.unlocked ? 'text-white' : 'text-charcoal-ink dark:text-gray-100'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    achievement.unlocked ? 'text-white/80' : 'text-slate-gray dark:text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        achievement.unlocked ? 'bg-white' : 'bg-primary-300 dark:bg-primary-600'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs mt-1 ${
                    achievement.unlocked ? 'text-white/60' : 'text-slate-gray'
                  }`}>
                    {achievement.progress}% complete
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions with Enhanced UI */}
      <div className={`relative z-10 ${getEntranceAnimation('up')}`} style={getStaggeredDelay(3)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass-strong`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-charcoal-ink dark:text-gray-100">Recent Transactions</h2>
              <p className="text-slate-gray dark:text-gray-400">Your latest financial activity</p>
            </div>
            <button className={`px-4 py-2 rounded-2xl text-sm font-semibold ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`}>
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div 
                key={transaction.id} 
                className={`flex items-center justify-between p-4 ${getGlassMorphism('light')} rounded-2xl border border-glass-border ${getHoverAnimation('lift')} group`}
                style={getStaggeredDelay(index, 0.1)}
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${transaction.color}20` }}
                  >
                    {transaction.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-ink dark:text-gray-100">{transaction.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-gray dark:text-gray-400">{transaction.category}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-slate-gray">{getRelativeTime(transaction.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${getCurrencyColorClass(transaction.type)}`}>
                    {transaction.type === 'income' ? '+' : ''}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-slate-gray capitalize">{transaction.type}</p>
                </div>
              </div>
            ))}
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

export default Dashboard;
