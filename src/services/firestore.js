// Firestore database service for expense tracker data
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
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Firestore service class for managing expense tracker data
 */
class FirestoreService {
  constructor() {
    this.db = null;
    this.isInitialized = false;
    this.init();
  }

  /**
   * Initialize Firestore service
   */
  init() {
    try {
      this.db = getFirebaseFirestore();
      this.isInitialized = true;
      console.log('📊 Firestore service initialized');
    } catch (error) {
      console.warn('Firestore not yet initialized:', error.message);
    }
  }

  /**
   * Get current user ID for data operations
   * @returns {string} User ID
   * @throws {Error} If user is not authenticated
   */
  getCurrentUserId() {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to perform this operation');
    }
    return user.uid;
  }

  /**
   * Get user's collection reference
   * @param {string} collectionName - Name of the collection
   * @returns {Object} Firestore collection reference
   */
  getUserCollection(collectionName) {
    if (!this.db) {
      throw new Error('Firestore is not initialized');
    }
    const userId = this.getCurrentUserId();
    return collection(this.db, 'users', userId, collectionName);
  }

  // ================== CATEGORIES ==================

  /**
   * Add a new category
   * @param {Object} categoryData - Category data
   * @returns {Promise<string>} Document ID
   */
  async addCategory(categoryData) {
    try {
      const categoriesRef = this.getUserCollection('categories');
      const category = {
        ...categoryData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userId: this.getCurrentUserId()
      };

      const docRef = await addDoc(categoriesRef, category);
      console.log('✅ Category added:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error adding category:', error);
      throw new Error(`Failed to add category: ${error.message}`);
    }
  }

  /**
   * Get user's categories
   * @param {string} type - Category type ('income' or 'expense')
   * @returns {Promise<Array>} Array of categories
   */
  async getCategories(type = null) {
    try {
      const categoriesRef = this.getUserCollection('categories');
      let q = query(categoriesRef, orderBy('name'));

      if (type) {
        q = query(categoriesRef, where('type', '==', type), orderBy('name'));
      }

      const snapshot = await getDocs(q);
      const categories = [];
      
      snapshot.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt
        });
      });

      console.log(`📊 Retrieved ${categories.length} categories`);
      return categories;
    } catch (error) {
      console.error('❌ Error getting categories:', error);
      if (error.message.includes('not initialized')) {
        console.warn('⚠️ Firebase not configured, returning default categories');
        return this.getDefaultCategories();
      }
      throw new Error(`Failed to get categories: ${error.message}`);
    }
  }

  /**
   * Update a category
   * @param {string} categoryId - Category ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<void>}
   */
  async updateCategory(categoryId, updateData) {
    try {
      const categoriesRef = this.getUserCollection('categories');
      const docRef = doc(categoriesRef, categoryId);
      
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });

      console.log('✅ Category updated:', categoryId);
    } catch (error) {
      console.error('❌ Error updating category:', error);
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  /**
   * Delete a category
   * @param {string} categoryId - Category ID
   * @returns {Promise<void>}
   */
  async deleteCategory(categoryId) {
    try {
      const categoriesRef = this.getUserCollection('categories');
      const docRef = doc(categoriesRef, categoryId);
      
      await deleteDoc(docRef);
      console.log('✅ Category deleted:', categoryId);
    } catch (error) {
      console.error('❌ Error deleting category:', error);
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  /**
   * Get default categories for when Firebase is not configured
   * @returns {Array} Default categories
   */
  getDefaultCategories() {
    return [
      { id: 'food', name: 'Food & Dining', type: 'expense', color: '#FF6B6B', icon: '🍽️' },
      { id: 'transport', name: 'Transportation', type: 'expense', color: '#4ECDC4', icon: '🚗' },
      { id: 'shopping', name: 'Shopping', type: 'expense', color: '#45B7D1', icon: '🛍️' },
      { id: 'entertainment', name: 'Entertainment', type: 'expense', color: '#FFA07A', icon: '🎬' },
      { id: 'bills', name: 'Bills & Utilities', type: 'expense', color: '#98D8C8', icon: '💡' },
      { id: 'health', name: 'Healthcare', type: 'expense', color: '#FFB347', icon: '🏥' },
      { id: 'salary', name: 'Salary', type: 'income', color: '#95E1D3', icon: '💰' },
      { id: 'freelance', name: 'Freelance', type: 'income', color: '#F7DC6F', icon: '💼' },
      { id: 'investment', name: 'Investment', type: 'income', color: '#AED581', icon: '📈' },
    ];
  }

  // ================== BUDGETS ==================

  /**
   * Add/Update a budget
   * @param {Object} budgetData - Budget data
   * @returns {Promise<string>} Document ID
   */
  async setBudget(budgetData) {
    try {
      const budgetsRef = this.getUserCollection('budgets');
      const budget = {
        ...budgetData,
        updatedAt: serverTimestamp(),
        userId: this.getCurrentUserId()
      };

      // Use category and month as composite key
      const budgetId = `${budgetData.category}_${budgetData.month}_${budgetData.year}`;
      const docRef = doc(budgetsRef, budgetId);

      // Check if budget exists
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        budget.createdAt = serverTimestamp();
      }

      await setDoc(docRef, budget, { merge: true });
      console.log('✅ Budget set:', budgetId);
      return budgetId;
    } catch (error) {
      console.error('❌ Error setting budget:', error);
      throw new Error(`Failed to set budget: ${error.message}`);
    }
  }

  /**
   * Get user's budgets
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of budgets
   */
  async getBudgets(options = {}) {
    try {
      const budgetsRef = this.getUserCollection('budgets');
      let q = query(budgetsRef);

      if (options.month && options.year) {
        q = query(
          q,
          where('month', '==', options.month),
          where('year', '==', options.year)
        );
      }

      const snapshot = await getDocs(q);
      const budgets = [];
      
      snapshot.forEach((doc) => {
        budgets.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt
        });
      });

      console.log(`📊 Retrieved ${budgets.length} budgets`);
      return budgets;
    } catch (error) {
      console.error('❌ Error getting budgets:', error);
      if (error.message.includes('not initialized')) {
        console.warn('⚠️ Firebase not configured, returning empty budgets');
        return [];
      }
      throw new Error(`Failed to get budgets: ${error.message}`);
    }
  }

  /**
   * Delete a budget
   * @param {string} budgetId - Budget ID
   * @returns {Promise<void>}
   */
  async deleteBudget(budgetId) {
    try {
      const budgetsRef = this.getUserCollection('budgets');
      const docRef = doc(budgetsRef, budgetId);
      
      await deleteDoc(docRef);
      console.log('✅ Budget deleted:', budgetId);
    } catch (error) {
      console.error('❌ Error deleting budget:', error);
      throw new Error(`Failed to delete budget: ${error.message}`);
    }
  }

  // ================== USER PROFILE ==================

  /**
   * Update user profile settings
   * @param {Object} profileData - Profile data
   * @returns {Promise<void>}
   */
  async updateUserProfile(profileData) {
    try {
      const userId = this.getCurrentUserId();
      const userDocRef = doc(this.db, 'users', userId);
      
      await setDoc(userDocRef, {
        ...profileData,
        updatedAt: serverTimestamp()
      }, { merge: true });

      console.log('✅ User profile updated');
    } catch (error) {
      console.error('❌ Error updating user profile:', error);
      throw new Error(`Failed to update user profile: ${error.message}`);
    }
  }

  /**
   * Get user profile
   * @returns {Promise<Object|null>} User profile data
   */
  async getUserProfile() {
    try {
      const userId = this.getCurrentUserId();
      const userDocRef = doc(this.db, 'users', userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('❌ Error getting user profile:', error);
      if (error.message.includes('not initialized')) {
        console.warn('⚠️ Firebase not configured, returning null profile');
        return null;
      }
      throw new Error(`Failed to get user profile: ${error.message}`);
    }
  }

  // ================== UTILITY METHODS ==================

  /**
   * Initialize default data for new user
   * @returns {Promise<void>}
   */
  async initializeUserData() {
    try {
      const userId = this.getCurrentUserId();
      const userDocRef = doc(this.db, 'users', userId);
      
      // Check if user document exists
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        // Create user document with default settings
        await setDoc(userDocRef, {
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          currency: 'USD',
          theme: 'system',
          notifications: true
        });

        // Add default categories
        const defaultCategories = this.getDefaultCategories();

        for (const category of defaultCategories) {
          await this.addCategory(category);
        }

        console.log('✅ Default user data initialized');
      }
    } catch (error) {
      console.error('❌ Error initializing user data:', error);
      throw new Error(`Failed to initialize user data: ${error.message}`);
    }
  }

  /**
   * Check if service is ready
   * @returns {boolean} Ready status
   */
  isReady() {
    return this.isInitialized && this.db !== null;
  }
}

// Create and export singleton instance
const firestoreService = new FirestoreService();

export default firestoreService;

// Named exports for convenience
export { firestoreService as db };
