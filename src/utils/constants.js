/**
 * Default categories for expense tracking
 */
export const DEFAULT_CATEGORIES = {
  income: [
    { id: 'salary', name: 'Salary', icon: '💼', color: '#10B981' },
    { id: 'freelance', name: 'Freelance', icon: '💻', color: '#059669' },
    { id: 'investments', name: 'Investments', icon: '📈', color: '#34D399' },
    { id: 'business', name: 'Business', icon: '🏢', color: '#6EE7B7' },
    { id: 'other-income', name: 'Other Income', icon: '💰', color: '#A7F3D0' },
  ],
  expense: [
    { id: 'groceries', name: 'Groceries', icon: '🛒', color: '#EF4444' },
    { id: 'transportation', name: 'Transportation', icon: '🚗', color: '#DC2626' },
    { id: 'utilities', name: 'Utilities', icon: '💡', color: '#B91C1C' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#991B1B' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#7F1D1D' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#F87171' },
    { id: 'dining', name: 'Dining Out', icon: '🍽️', color: '#FCA5A5' },
    { id: 'education', name: 'Education', icon: '📚', color: '#FECACA' },
    { id: 'travel', name: 'Travel', icon: '✈️', color: '#FEE2E2' },
    { id: 'other-expense', name: 'Other Expenses', icon: '📝', color: '#FEF2F2' },
  ],
};

/**
 * Transaction types
 */
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

/**
 * Budget periods
 */
export const BUDGET_PERIODS = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

/**
 * Date ranges for reports
 */
export const DATE_RANGES = {
  THIS_WEEK: 'this_week',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_QUARTER: 'this_quarter',
  THIS_YEAR: 'this_year',
  LAST_YEAR: 'last_year',
  CUSTOM: 'custom',
};

/**
 * Currency options
 */
export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

/**
 * Chart colors
 */
export const CHART_COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280',
];

/**
 * Application routes
 */
export const ROUTES = {
  DASHBOARD: '/',
  TRANSACTIONS: '/transactions',
  CATEGORIES: '/categories',
  BUDGETS: '/budgets',
  REPORTS: '/reports',
  SETTINGS: '/settings',
};
