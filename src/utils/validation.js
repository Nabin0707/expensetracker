/**
 * Transaction validation schema
 */
export const validateTransaction = (transaction) => {
  const errors = {};

  if (!transaction.description || transaction.description.trim() === '') {
    errors.description = 'Description is required';
  }

  if (!transaction.amount || transaction.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!transaction.category || transaction.category.trim() === '') {
    errors.category = 'Category is required';
  }

  if (!transaction.date) {
    errors.date = 'Date is required';
  }

  if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
    errors.type = 'Transaction type must be income or expense';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Budget validation schema
 */
export const validateBudget = (budget) => {
  const errors = {};

  if (!budget.name || budget.name.trim() === '') {
    errors.name = 'Budget name is required';
  }

  if (!budget.amount || budget.amount <= 0) {
    errors.amount = 'Budget amount must be greater than 0';
  }

  if (!budget.category || budget.category.trim() === '') {
    errors.category = 'Category is required';
  }

  if (!budget.period || !['monthly', 'weekly', 'yearly'].includes(budget.period)) {
    errors.period = 'Valid period is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Category validation schema
 */
export const validateCategory = (category) => {
  const errors = {};

  if (!category.name || category.name.trim() === '') {
    errors.name = 'Category name is required';
  }

  if (!category.type || !['income', 'expense'].includes(category.type)) {
    errors.type = 'Category type must be income or expense';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Email validation
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 */
export const validatePassword = (password) => {
  const errors = {};

  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
