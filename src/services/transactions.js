// Transaction service with Firestore integration
import { 
  getFirebaseFirestore,
  getCurrentUser
} from './firebase.js';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Get Firestore database instance
 */
const getDb = () => {
  try {
    return getFirebaseFirestore();
  } catch (error) {
    throw new Error('Firestore not initialized. Please configure Firebase first.');
  }
};

/**
 * Get current user ID
 */
const getCurrentUserId = () => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('User must be authenticated to access transactions');
  }
  return user.uid;
};

/**
 * Get user's transactions collection reference
 */
const getTransactionsCollection = () => {
  const db = getDb();
  const userId = getCurrentUserId();
  return collection(db, 'users', userId, 'transactions');
};

/**
 * Convert Firestore document to transaction object
 */
const docToTransaction = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    date: data.date?.toDate?.() || data.date,
    createdAt: data.createdAt?.toDate?.() || data.createdAt,
    updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
  };
};

/**
 * Get all transactions for the current user
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of transactions
 */
export const getTransactions = async (options = {}) => {
  try {
    const transactionsRef = getTransactionsCollection();
    let q = query(transactionsRef);

    // Apply filters
    if (options.type) {
      q = query(q, where('type', '==', options.type));
    }
    if (options.category) {
      q = query(q, where('category', '==', options.category));
    }

    // Apply ordering
    const orderField = options.orderBy || 'date';
    const orderDirection = options.orderDirection || 'desc';
    q = query(q, orderBy(orderField, orderDirection));

    // Apply limit
    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    const snapshot = await getDocs(q);
    const transactions = [];
    
    snapshot.forEach((doc) => {
      transactions.push(docToTransaction(doc));
    });

    console.log(`📊 Retrieved ${transactions.length} transactions`);
    return transactions;
  } catch (error) {
    console.error('❌ Error getting transactions:', error);
    if (error.message.includes('not initialized')) {
      // Return empty array if Firebase is not configured yet
      console.warn('⚠️ Firebase not configured, returning empty transactions');
      return [];
    }
    throw new Error(`Failed to get transactions: ${error.message}`);
  }
};

/**
 * Add a new transaction
 * @param {Object} transaction - Transaction data
 * @returns {Promise<Object>} Created transaction with ID
 */
export const addTransaction = async (transaction) => {
  try {
    const transactionsRef = getTransactionsCollection();
    const transactionData = {
      ...transaction,
      userId: getCurrentUserId(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // Convert date to Firestore timestamp if it's a Date object
      date: transaction.date instanceof Date ? Timestamp.fromDate(transaction.date) : transaction.date
    };

    const docRef = await addDoc(transactionsRef, transactionData);
    
    const newTransaction = {
      id: docRef.id,
      ...transaction,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('✅ Transaction added:', docRef.id);
    return newTransaction;
  } catch (error) {
    console.error('❌ Error adding transaction:', error);
    throw new Error(`Failed to add transaction: ${error.message}`);
  }
};

/**
 * Update an existing transaction
 * @param {string} id - Transaction ID
 * @param {Object} updates - Updated transaction data
 * @returns {Promise<Object>} Updated transaction
 */
export const updateTransaction = async (id, updates) => {
  try {
    const transactionsRef = getTransactionsCollection();
    const docRef = doc(transactionsRef, id);
    
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp(),
      // Convert date to Firestore timestamp if it's a Date object
      ...(updates.date && { 
        date: updates.date instanceof Date ? Timestamp.fromDate(updates.date) : updates.date 
      })
    };

    await updateDoc(docRef, updateData);

    const updatedTransaction = {
      id,
      ...updates,
      updatedAt: new Date()
    };

    console.log('✅ Transaction updated:', id);
    return updatedTransaction;
  } catch (error) {
    console.error('❌ Error updating transaction:', error);
    throw new Error(`Failed to update transaction: ${error.message}`);
  }
};

/**
 * Delete a transaction
 * @param {string} id - Transaction ID
 * @returns {Promise<void>}
 */
export const deleteTransaction = async (id) => {
  try {
    const transactionsRef = getTransactionsCollection();
    const docRef = doc(transactionsRef, id);
    
    await deleteDoc(docRef);
    console.log('✅ Transaction deleted:', id);
  } catch (error) {
    console.error('❌ Error deleting transaction:', error);
    throw new Error(`Failed to delete transaction: ${error.message}`);
  }
};

/**
 * Get transactions by date range
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Promise<Array>} Array of transactions
 */
export const getTransactionsByDateRange = async (startDate, endDate) => {
  try {
    const transactionsRef = getTransactionsCollection();
    const q = query(
      transactionsRef,
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate)),
      orderBy('date', 'desc')
    );

    const snapshot = await getDocs(q);
    const transactions = [];
    
    snapshot.forEach((doc) => {
      transactions.push(docToTransaction(doc));
    });

    console.log(`📊 Retrieved ${transactions.length} transactions in date range`);
    return transactions;
  } catch (error) {
    console.error('❌ Error getting transactions by date range:', error);
    if (error.message.includes('not initialized')) {
      console.warn('⚠️ Firebase not configured, returning empty transactions');
      return [];
    }
    throw new Error(`Failed to get transactions by date range: ${error.message}`);
  }
};

/**
 * Get transactions by category
 * @param {string} categoryId - Category ID or name
 * @returns {Promise<Array>} Array of transactions
 */
export const getTransactionsByCategory = async (categoryId) => {
  try {
    const transactionsRef = getTransactionsCollection();
    const q = query(
      transactionsRef,
      where('category', '==', categoryId),
      orderBy('date', 'desc')
    );

    const snapshot = await getDocs(q);
    const transactions = [];
    
    snapshot.forEach((doc) => {
      transactions.push(docToTransaction(doc));
    });

    console.log(`📊 Retrieved ${transactions.length} transactions for category: ${categoryId}`);
    return transactions;
  } catch (error) {
    console.error('❌ Error getting transactions by category:', error);
    if (error.message.includes('not initialized')) {
      console.warn('⚠️ Firebase not configured, returning empty transactions');
      return [];
    }
    throw new Error(`Failed to get transactions by category: ${error.message}`);
  }
};

/**
 * Get transaction statistics
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Transaction statistics
 */
export const getTransactionStats = async (options = {}) => {
  try {
    const transactions = await getTransactions(options);
    
    const stats = {
      total: transactions.length,
      totalIncome: 0,
      totalExpenses: 0,
      netIncome: 0,
      categories: {},
      byMonth: {}
    };

    transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount) || 0;
      
      if (transaction.type === 'income') {
        stats.totalIncome += amount;
      } else if (transaction.type === 'expense') {
        stats.totalExpenses += amount;
      }

      // Category breakdown
      if (!stats.categories[transaction.category]) {
        stats.categories[transaction.category] = {
          income: 0,
          expense: 0,
          count: 0
        };
      }
      
      stats.categories[transaction.category][transaction.type] += amount;
      stats.categories[transaction.category].count++;

      // Monthly breakdown
      const date = transaction.date instanceof Date ? transaction.date : new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!stats.byMonth[monthKey]) {
        stats.byMonth[monthKey] = {
          income: 0,
          expense: 0,
          count: 0
        };
      }
      
      stats.byMonth[monthKey][transaction.type] += amount;
      stats.byMonth[monthKey].count++;
    });

    stats.netIncome = stats.totalIncome - stats.totalExpenses;

    console.log('📈 Transaction statistics calculated');
    return stats;
  } catch (error) {
    console.error('❌ Error calculating transaction stats:', error);
    throw new Error(`Failed to calculate transaction stats: ${error.message}`);
  }
};
