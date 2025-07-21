import { useState } from 'react';
import { formatCurrency, formatLargeNumber } from '../utils/currency';
import { getStaggeredDelay, getEntranceAnimation, getHoverAnimation, getGlassMorphism } from '../utils/animations';

const Reports = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('month');
  const [activeReport, setActiveReport] = useState('overview');

  // Mock report data
  const reportData = {
    monthlyTrends: [
      { month: 'Jan', income: 75000, expenses: 45000 },
      { month: 'Feb', income: 78000, expenses: 52000 },
      { month: 'Mar', income: 72000, expenses: 48000 },
      { month: 'Apr', income: 80000, expenses: 55000 },
      { month: 'May', income: 75000, expenses: 47000 },
      { month: 'Jun', income: 82000, expenses: 60000 },
      { month: 'Jul', income: 87000, expenses: 63000 },
    ],
    categoryBreakdown: [
      { category: 'Groceries', amount: 15840, percentage: 25.2, color: '#2ECC71' },
      { category: 'Transportation', amount: 8520, percentage: 13.5, color: '#4EA8DE' },
      { category: 'Shopping', amount: 12340, percentage: 19.6, color: '#F4A261' },
      { category: 'Utilities', amount: 9100, percentage: 14.5, color: '#A78BFA' },
      { category: 'Entertainment', amount: 6200, percentage: 9.9, color: '#FF6B6B' },
      { category: 'Healthcare', amount: 4850, percentage: 7.7, color: '#38B2AC' },
      { category: 'Others', amount: 6050, percentage: 9.6, color: '#94A3B8' },
    ],
    insights: [
      { title: 'Spending Pattern', description: 'Your highest spending is on weekends', trend: 'up', value: '+23%' },
      { title: 'Savings Rate', description: 'You saved 28% of your income this month', trend: 'up', value: '28%' },
      { title: 'Budget Efficiency', description: 'You stayed under budget in 5/7 categories', trend: 'neutral', value: '71%' },
      { title: 'Monthly Growth', description: 'Income increased compared to last month', trend: 'up', value: '+12%' },
    ]
  };

  const timeframes = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'quarter', label: 'This Quarter' },
    { key: 'year', label: 'This Year' },
  ];

  const reportTypes = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'income', label: 'Income Analysis', icon: '💰' },
    { key: 'expenses', label: 'Expense Tracking', icon: '💸' },
    { key: 'trends', label: 'Trends', icon: '📈' },
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-success-600 dark:text-success-400';
    if (trend === 'down') return 'text-danger-600 dark:text-danger-400';
    return 'text-slate-gray dark:text-gray-400';
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8 bg-snow-mist dark:bg-neural-dark">
      {/* Header Section */}
      <div className={`${getEntranceAnimation('scale')}`}>
        <div className={`${getGlassMorphism('strong')} p-8 rounded-3xl shadow-glass-strong`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-skywave bg-clip-text text-transparent mb-2">
                📈 Reports & Analytics
              </h1>
              <p className="text-lg text-slate-gray dark:text-gray-300">
                Analyze your financial data with detailed insights
              </p>
            </div>
            <button className={`px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-primary shadow-dopamine ${getHoverAnimation('lift')} focus:ring-2 focus:ring-primary-500/50`}>
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`${getEntranceAnimation('up')}`} style={getStaggeredDelay(1)}>
        <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Timeframe Selector */}
            <div className="flex gap-2">
              {timeframes.map((timeframe, index) => (
                <button
                  key={timeframe.key}
                  onClick={() => setActiveTimeframe(timeframe.key)}
                  className={`px-4 py-2 rounded-2xl font-medium transition-all duration-300 ${
                    activeTimeframe === timeframe.key
                      ? 'bg-gradient-primary text-white shadow-dopamine'
                      : `${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`
                  }`}
                  style={getStaggeredDelay(index, 0.05)}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>

            {/* Report Type Selector */}
            <div className="flex gap-2">
              {reportTypes.map((report, index) => (
                <button
                  key={report.key}
                  onClick={() => setActiveReport(report.key)}
                  className={`px-4 py-2 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeReport === report.key
                      ? 'bg-gradient-secondary text-white shadow-dopamine-secondary'
                      : `${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`
                  }`}
                  style={getStaggeredDelay(index, 0.05)}
                >
                  <span>{report.icon}</span>
                  <span className="hidden lg:inline">{report.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Insights Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${getEntranceAnimation('up')}`} style={getStaggeredDelay(2)}>
        {reportData.insights.map((insight, index) => (
          <div
            key={index}
            className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass group ${getHoverAnimation('lift')}`}
            style={getStaggeredDelay(index, 0.1)}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{getTrendIcon(insight.trend)}</span>
              <span className={`text-2xl font-bold ${getTrendColor(insight.trend)}`}>
                {insight.value}
              </span>
            </div>
            <h4 className="font-bold text-charcoal-ink dark:text-gray-100 mb-2">
              {insight.title}
            </h4>
            <p className="text-sm text-slate-gray dark:text-gray-400">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className={`lg:col-span-2 space-y-6 ${getEntranceAnimation('left')}`} style={getStaggeredDelay(3)}>
          {/* Monthly Trends Chart */}
          <div className={`${getGlassMorphism('medium')} p-8 rounded-3xl shadow-glass`}>
            <h3 className="text-xl font-bold text-charcoal-ink dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className="text-2xl">📊</span>
              Monthly Income vs Expenses
            </h3>
            <div className="space-y-4">
              {reportData.monthlyTrends.map((month, index) => (
                <div key={month.month} className="space-y-2" style={getStaggeredDelay(index, 0.05)}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-charcoal-ink dark:text-gray-200">{month.month}</span>
                    <div className="flex gap-4 text-sm">
                      <span className="text-success-600 dark:text-success-400">
                        Income: {formatCurrency(month.income)}
                      </span>
                      <span className="text-danger-600 dark:text-danger-400">
                        Expenses: {formatCurrency(month.expenses)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="space-y-1">
                    {/* Income Bar */}
                    <div className="relative h-2 bg-snow-mist dark:bg-neural-dark rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-success-400 to-success-600 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${(month.income / 90000) * 100}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                    
                    {/* Expense Bar */}
                    <div className="relative h-2 bg-snow-mist dark:bg-neural-dark rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-danger-400 to-danger-600 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${(month.expenses / 90000) * 100}%`,
                          animationDelay: `${index * 0.1 + 0.2}s`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spending Timeline */}
          <div className={`${getGlassMorphism('medium')} p-8 rounded-3xl shadow-glass`}>
            <h3 className="text-xl font-bold text-charcoal-ink dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className="text-2xl">📈</span>
              Spending Timeline
            </h3>
            <div className="space-y-4">
              {[
                { date: 'Today', amount: 2500, trend: 'up', percentage: '+15%' },
                { date: 'Yesterday', amount: 1800, trend: 'down', percentage: '-8%' },
                { date: '3 days ago', amount: 3200, trend: 'up', percentage: '+25%' },
                { date: 'This week', amount: 12500, trend: 'neutral', percentage: '+2%' },
                { date: 'Last week', amount: 11800, trend: 'down', percentage: '-5%' },
              ].map((item, index) => (
                <div
                  key={item.date}
                  className={`flex items-center justify-between p-4 rounded-2xl ${getGlassMorphism('light')} ${getHoverAnimation('glass')}`}
                  style={getStaggeredDelay(index, 0.1)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getTrendIcon(item.trend)}</span>
                    <div>
                      <div className="font-semibold text-charcoal-ink dark:text-gray-100">
                        {item.date}
                      </div>
                      <div className="text-sm text-slate-gray dark:text-gray-400">
                        {formatCurrency(item.amount)}
                      </div>
                    </div>
                  </div>
                  <span className={`font-bold ${getTrendColor(item.trend)}`}>
                    {item.percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`space-y-6 ${getEntranceAnimation('right')}`} style={getStaggeredDelay(4)}>
          {/* Category Breakdown */}
          <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass`}>
            <h3 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className="text-xl">🎯</span>
              Category Breakdown
            </h3>
            <div className="space-y-4">
              {reportData.categoryBreakdown.map((category, index) => (
                <div
                  key={category.category}
                  className={`space-y-2 ${getHoverAnimation('scale')}`}
                  style={getStaggeredDelay(index, 0.05)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-charcoal-ink dark:text-gray-200 text-sm">
                      {category.category}
                    </span>
                    <span className="text-xs font-bold text-slate-gray dark:text-gray-400">
                      {category.percentage}%
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-snow-mist dark:bg-neural-dark rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          backgroundColor: category.color,
                          width: `${category.percentage}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-charcoal-ink dark:text-gray-300">
                      {formatCurrency(category.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass`}>
            <h3 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className="text-xl">⚡</span>
              Quick Stats
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Total Income', value: 567000, icon: '💰', color: 'text-success-600 dark:text-success-400' },
                { label: 'Total Expenses', value: 389000, icon: '💸', color: 'text-danger-600 dark:text-danger-400' },
                { label: 'Net Savings', value: 178000, icon: '🏦', color: 'text-primary-600 dark:text-primary-400' },
                { label: 'Average/Day', value: 12580, icon: '📅', color: 'text-secondary-600 dark:text-secondary-400' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex items-center justify-between p-4 rounded-2xl ${getGlassMorphism('light')} ${getHoverAnimation('lift')}`}
                  style={getStaggeredDelay(index, 0.1)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{stat.icon}</span>
                    <span className="font-medium text-charcoal-ink dark:text-gray-200 text-sm">
                      {stat.label}
                    </span>
                  </div>
                  <span className={`font-bold ${stat.color}`}>
                    {formatCurrency(stat.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Health Score */}
          <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass`}>
            <h3 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className="text-xl">🎯</span>
              Financial Health
            </h3>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    className="dark:stroke-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#healthGradient)"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                    strokeLinecap="round"
                    className="transition-all duration-2000"
                  />
                  <defs>
                    <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2ECC71" />
                      <stop offset="100%" stopColor="#4EA8DE" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-charcoal-ink dark:text-gray-100">75%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-success-600 dark:text-success-400 mb-2">
                Good Financial Health
              </p>
              <p className="text-xs text-slate-gray dark:text-gray-400">
                Based on spending patterns and savings rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
