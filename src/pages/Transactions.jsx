import { useState, useEffect } from 'react';
import { formatCurrency, getCurrencyColorClass } from '../utils/currency';
import { getStaggeredDelay, getEntranceAnimation, getHoverAnimation, getGlassMorphism } from '../utils/animations';

const Transactions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'expense', category: 'Groceries', amount: 2840.00, date: '2025-07-19', description: 'Weekly shopping at BigBazar', icon: '🛒', merchant: 'BigBazar', status: 'completed' },
    { id: 2, type: 'income', category: 'Salary', amount: 75000.00, date: '2025-07-18', description: 'Monthly salary credit', icon: '💼', merchant: 'Tech Corp Ltd', status: 'completed' },
    { id: 3, type: 'expense', category: 'Transportation', amount: 1520.00, date: '2025-07-17', description: 'Petrol and metro card', icon: '⛽', merchant: 'Metro Station', status: 'completed' },
    { id: 4, type: 'expense', category: 'Entertainment', amount: 3200.00, date: '2025-07-16', description: 'Movie and dinner', icon: '🎬', merchant: 'PVR Cinemas', status: 'pending' },
    { id: 5, type: 'income', category: 'Freelance', amount: 12420.00, date: '2025-07-15', description: 'Website development project', icon: '💻', merchant: 'Client ABC', status: 'completed' },
    { id: 6, type: 'expense', category: 'Healthcare', amount: 850.00, date: '2025-07-14', description: 'Doctor consultation', icon: '🏥', merchant: 'Apollo Clinic', status: 'completed' },
    { id: 7, type: 'expense', category: 'Utilities', amount: 2100.00, date: '2025-07-13', description: 'Electricity bill', icon: '💡', merchant: 'State Electricity Board', status: 'completed' },
    { id: 8, type: 'income', category: 'Investment', amount: 5200.00, date: '2025-07-12', description: 'Dividend from mutual funds', icon: '📈', merchant: 'HDFC Mutual Fund', status: 'completed' },
  ]);

  const filters = [
    { key: 'all', label: 'All Transactions', color: 'primary' },
    { key: 'income', label: 'Income', color: 'success' },
    { key: 'expense', label: 'Expenses', color: 'danger' },
    { key: 'pending', label: 'Pending', color: 'secondary' },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = activeFilter === 'all' || 
                         transaction.type === activeFilter || 
                         transaction.status === activeFilter;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const getRelativeTime = (date) => {
    const now = new Date();
    const transactionDate = new Date(date);
    const diffInHours = Math.abs(now - transactionDate) / (1000 * 60 * 60);
    
    if (diffInHours < 24) return 'Today';
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
      pending: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300',
      failed: 'bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-300'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.completed}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8 bg-snow-mist dark:bg-neural-dark">
      {/* Header Section */}
      <div className={`${getEntranceAnimation('scale')}`}>
        <div className={`${getGlassMorphism('strong')} p-8 rounded-3xl shadow-glass-strong`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-skywave bg-clip-text text-transparent mb-2">
                💳 Transactions
              </h1>
              <p className="text-lg text-slate-gray dark:text-gray-300">
                View and manage all your financial activities
              </p>
            </div>
            <button className={`px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-primary shadow-dopamine ${getHoverAnimation('lift')} focus:ring-2 focus:ring-primary-500/50`}>
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Transaction
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${getEntranceAnimation('up')}`} style={getStaggeredDelay(1)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Total Income</p>
              <p className={`text-2xl font-bold ${getCurrencyColorClass('income')}`}>
                {formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-2xl">
              <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Total Expenses</p>
              <p className={`text-2xl font-bold ${getCurrencyColorClass('expense')}`}>
                {formatCurrency(totalExpenses)}
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
              <p className="text-sm font-medium text-slate-gray dark:text-gray-400 mb-1">Net Balance</p>
              <p className={`text-2xl font-bold ${getCurrencyColorClass('balance', totalIncome - totalExpenses)}`}>
                {formatCurrency(totalIncome - totalExpenses)}
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`${getEntranceAnimation('up')}`} style={getStaggeredDelay(2)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-2xl font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? `bg-gradient-${filter.color} text-white shadow-dopamine-${filter.color}`
                      : `${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`
                  }`}
                  style={getStaggeredDelay(index, 0.05)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-2xl border-0 ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-100 placeholder-slate-gray focus:ring-2 focus:ring-primary-500/50 transition-all duration-300`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className={`${getEntranceAnimation('up')}`} style={getStaggeredDelay(3)}>
        <div className={`${getGlassMorphism('medium')} rounded-3xl shadow-glass-strong overflow-hidden`}>
          <div className="p-6 border-b border-glass-line">
            <h3 className="text-xl font-bold text-charcoal-ink dark:text-gray-100">
              Transaction History
            </h3>
            <p className="text-slate-gray dark:text-gray-400">
              {filteredTransactions.length} transactions found
            </p>
          </div>

          <div className="divide-y divide-glass-line max-h-[600px] overflow-y-auto">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`p-6 ${getHoverAnimation('glass')} group`}
                  style={getStaggeredDelay(index, 0.05)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-glass flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                        {transaction.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-charcoal-ink dark:text-gray-100">
                            {transaction.description}
                          </h4>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-gray dark:text-gray-400">
                          <span>{transaction.category}</span>
                          <span>•</span>
                          <span>{transaction.merchant}</span>
                          <span>•</span>
                          <span>{getRelativeTime(transaction.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${getCurrencyColorClass(transaction.type)} group-hover:scale-105 transition-transform duration-300`}>
                        {transaction.type === 'income' ? '+' : ''}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-slate-gray capitalize mt-1">
                        {transaction.type}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-glass rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-charcoal-ink dark:text-gray-100 mb-2">
                  No transactions found
                </h3>
                <p className="text-slate-gray dark:text-gray-400">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
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

export default Transactions;
