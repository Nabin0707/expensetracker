/**
 * Currency Utility Functions
 * Following clean architecture principles
 */

/**
 * Format currency amount to Indian Rupees
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rs. 0.00';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount).replace('₹', 'Rs.');
};

/**
 * Format large numbers with Indian number system (Lakhs, Crores)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted number string
 */
export const formatLargeNumber = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rs. 0';
  }

  if (amount >= 10000000) { // 1 Crore
    return `Rs. ${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 Lakh
    return `Rs. ${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) { // 1 Thousand
    return `Rs. ${(amount / 1000).toFixed(1)}K`;
  }
  
  return formatCurrency(amount);
};

/**
 * Parse currency string to number
 * @param {string} currencyString - String like "Rs. 1,234.56"
 * @returns {number} Parsed amount
 */
export const parseCurrency = (currencyString) => {
  if (typeof currencyString !== 'string') {
    return 0;
  }
  
  const cleanString = currencyString
    .replace(/Rs\.?\s*/g, '')
    .replace(/,/g, '')
    .trim();
    
  const parsed = parseFloat(cleanString);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Calculate percentage with proper rounding
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage (0-100)
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100 * 10) / 10; // Round to 1 decimal
};

/**
 * Get currency color class based on type and amount
 * @param {string} type - 'income', 'expense', 'balance'
 * @param {number} amount - The amount
 * @returns {string} Tailwind color class
 */
export const getCurrencyColorClass = (type, amount = 0) => {
  switch (type) {
    case 'income':
      return 'text-success-600 dark:text-success-400';
    case 'expense':
      return 'text-danger-600 dark:text-danger-400';
    case 'balance':
      return amount >= 0 
        ? 'text-primary-600 dark:text-primary-400' 
        : 'text-danger-600 dark:text-danger-400';
    default:
      return 'text-charcoal-ink dark:text-gray-100';
  }
};
