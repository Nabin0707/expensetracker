import { useState, useEffect } from 'react';

const Dashboard = () => {
  // Mock data - this will be replaced with Firebase data later
  const [stats, setStats] = useState({
    totalIncome: 5420.00,
    totalExpenses: 3890.50,
    balance: 1529.50,
    monthlyBudget: 4000.00
  });

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'expense', category: 'Groceries', amount: 85.40, date: '2025-07-19', description: 'Weekly shopping' },
    { id: 2, type: 'income', category: 'Salary', amount: 2500.00, date: '2025-07-18', description: 'Monthly salary' },
    { id: 3, type: 'expense', category: 'Transportation', amount: 45.20, date: '2025-07-17', description: 'Gas station' },
    { id: 4, type: 'expense', category: 'Entertainment', amount: 120.00, date: '2025-07-16', description: 'Movie tickets' },
  ]);

  const budgetUsed = (stats.totalExpenses / stats.monthlyBudget) * 100;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="animate-slide-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-muted mt-1">
            Welcome back! Here's your financial overview for July 2025.
          </p>
        </div>
        <button className="btn-primary px-4 py-2 rounded-lg font-medium text-sm sm:text-base focus-ring shrink-0 hover:scale-105 transition-transform duration-200">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Transaction
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Income */}
        <div className="card p-4 sm:p-6 hover:shadow-soft-lg transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted">Total Income</p>
              <p className="text-xl sm:text-2xl font-bold text-success-600 dark:text-success-400 mt-1 group-hover:scale-105 transition-transform duration-200">
                {formatCurrency(stats.totalIncome)}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="card p-4 sm:p-6 hover:shadow-soft-lg transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted">Total Expenses</p>
              <p className="text-xl sm:text-2xl font-bold text-danger-600 dark:text-danger-400 mt-1 group-hover:scale-105 transition-transform duration-200">
                {formatCurrency(stats.totalExpenses)}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-danger-100 dark:bg-danger-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-danger-600 dark:text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="card p-4 sm:p-6 hover:shadow-soft-lg transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted">Current Balance</p>
              <p className={`text-xl sm:text-2xl font-bold mt-1 group-hover:scale-105 transition-transform duration-200 ${
                stats.balance >= 0 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-danger-600 dark:text-danger-400'
              }`}>
                {formatCurrency(stats.balance)}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

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
