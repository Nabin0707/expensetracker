import { useState, useEffect } from 'react';

const Dashboard = () => {
  // Mock data - this will be replaced with Firebase data later
  const [stats, setStats] = useState({
    totalIncome: 5420.00,
    totalExpenses: 3890.50,
    balance: 1529.50,
    monthlyBudget: 4000.00,
    savingsGoal: 2000.00,
    currentSavings: 1529.50
  });

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'expense', category: 'Groceries', amount: 85.40, date: '2025-07-19', description: 'Weekly shopping', icon: '🛒', color: '#ef4444' },
    { id: 2, type: 'income', category: 'Salary', amount: 2500.00, date: '2025-07-18', description: 'Monthly salary', icon: '💼', color: '#10b981' },
    { id: 3, type: 'expense', category: 'Transportation', amount: 45.20, date: '2025-07-17', description: 'Gas station', icon: '⛽', color: '#f59e0b' },
    { id: 4, type: 'expense', category: 'Entertainment', amount: 120.00, date: '2025-07-16', description: 'Movie tickets', icon: '🎬', color: '#8b5cf6' },
    { id: 5, type: 'income', category: 'Freelance', amount: 750.00, date: '2025-07-15', description: 'Website project', icon: '💻', color: '#06b6d4' },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Spending Streak', description: 'Under budget for 5 days!', icon: '🔥', progress: 100, unlocked: true },
    { id: 2, title: 'Savings Master', description: 'Saved $500 this month', icon: '💰', progress: 76, unlocked: false },
    { id: 3, title: 'Budget Ninja', description: 'Track 50 transactions', icon: '🥷', progress: 60, unlocked: false },
  ]);

  const budgetUsed = (stats.totalExpenses / stats.monthlyBudget) * 100;
  const savingsProgress = (stats.currentSavings / stats.savingsGoal) * 100;

  // Format currency with money font
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

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
    <div className="min-h-screen p-4 lg:p-8 space-y-8">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-success rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header Section with Welcome Message */}
      <div className="relative z-10 animate-in">
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
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
              <button className="btn-dopamine">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Transaction
              </button>
              <button className="neuro-button px-6 py-3 text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards with Micro-interactions */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in-delay-1">
        {/* Total Income Card */}
        <div className="stat-card group">
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
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Income</h3>
            <p className="text-3xl font-bold text-money text-success-600 dark:text-success-400 group-hover:scale-105 transition-transform duration-300">
              {formatCurrency(stats.totalIncome)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">vs last month</p>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="stat-card group">
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
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Expenses</h3>
            <p className="text-3xl font-bold text-money text-danger-600 dark:text-danger-400 group-hover:scale-105 transition-transform duration-300">
              {formatCurrency(stats.totalExpenses)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">vs last month</p>
          </div>
        </div>

        {/* Current Balance Card */}
        <div className="stat-card group">
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
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Current Balance</h3>
            <p className="text-3xl font-bold text-money text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform duration-300">
              {formatCurrency(stats.balance)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">in checking account</p>
          </div>
        </div>

        {/* Savings Progress Card */}
        <div className="stat-card group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-warning-100 dark:bg-warning-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs font-medium text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-900/20 px-2 py-1 rounded-full">
                {Math.round(savingsProgress)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Savings Goal</h3>
            <p className="text-3xl font-bold text-money text-warning-600 dark:text-warning-400 group-hover:scale-105 transition-transform duration-300">
              {formatCurrency(stats.currentSavings)}
            </p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                <div 
                  className="bg-gradient-warning h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(savingsProgress, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">of {formatCurrency(stats.savingsGoal)} goal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <div className="relative z-10 animate-in-delay-2">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">🏆 Achievements</h2>
              <p className="text-gray-600 dark:text-gray-400">Your financial milestones</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={achievement.id} className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                achievement.unlocked 
                  ? 'bg-gradient-success border-success-300 shadow-glow' 
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}>
                <div className="text-center">
                  <div className={`text-4xl mb-3 ${achievement.unlocked ? 'animate-bounce-in' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-bold mb-1 ${
                    achievement.unlocked ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    achievement.unlocked ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        achievement.unlocked ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs mt-1 ${
                    achievement.unlocked ? 'text-white/60' : 'text-gray-500'
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
      <div className="relative z-10 animate-in-delay-3">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Transactions</h2>
              <p className="text-gray-600 dark:text-gray-400">Your latest financial activity</p>
            </div>
            <button className="neuro-button px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-white/20 dark:border-gray-700/50 hover:scale-[1.02] hover:shadow-soft-lg transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${transaction.color}20` }}
                  >
                    {transaction.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{transaction.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{transaction.category}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{getRelativeTime(transaction.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-money text-lg ${
                    transaction.type === 'income' 
                      ? 'text-success-600 dark:text-success-400' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {transaction.type === 'income' ? '+' : ''}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fab">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default Dashboard;

        {/* Budget Usage */}
        <div className="card p-4 sm:p-6 hover:shadow-soft-lg transition-all duration-200 group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted">Budget Used</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1 group-hover:scale-105 transition-transform duration-200">
                {budgetUsed.toFixed(1)}%
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                budgetUsed > 90 
                  ? 'gradient-danger' 
                  : budgetUsed > 70 
                    ? 'gradient-warning' 
                    : 'gradient-success'
              }`}
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Transactions
            </h2>
            <button className="text-accent hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-200 focus-ring rounded px-2 py-1">
              View All →
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${
                    transaction.type === 'income' 
                      ? 'bg-success-100 dark:bg-success-900/30' 
                      : 'bg-danger-100 dark:bg-danger-900/30'
                  }`}>
                    {transaction.type === 'income' ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-danger-600 dark:text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-muted truncate">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-semibold ${
                    transaction.type === 'income' 
                      ? 'text-success-600 dark:text-success-400' 
                      : 'text-danger-600 dark:text-danger-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="card-hover p-4 sm:p-6 group">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Add Transaction</h3>
              <p className="text-sm text-muted truncate">Record a new income or expense</p>
            </div>
          </div>
        </div>

        <div className="card-hover p-4 sm:p-6 group">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Set Budget</h3>
              <p className="text-sm text-muted truncate">Create or update your monthly budget</p>
            </div>
          </div>
        </div>

        <div className="card-hover p-4 sm:p-6 group sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">View Reports</h3>
              <p className="text-sm text-muted truncate">Analyze your spending patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
