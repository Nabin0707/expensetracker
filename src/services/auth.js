// Authentication service for user management
import { 
  signInWithGoogle as firebaseSignInWithGoogle,
  signOut as firebaseSignOut,
  getCurrentUser,
  onAuthStateChange
} from './firebase.js';

/**
 * Authentication service class
 */
class AuthService {
  constructor() {
    this.currentUser = null;
    this.authStateListeners = [];
    this.isInitialized = false;
    
    // Initialize auth state monitoring
    this.init();
  }

  /**
   * Initialize the authentication service
   */
  init() {
    try {
      // Set up auth state listener
      this.unsubscribeAuthState = onAuthStateChange((user) => {
        const previousUser = this.currentUser;
        this.currentUser = user;
        
        // Notify all listeners about auth state changes
        this.authStateListeners.forEach(listener => {
          try {
            listener(user, previousUser);
          } catch (error) {
            console.error('Error in auth state listener:', error);
          }
        });
        
        if (!this.isInitialized) {
          this.isInitialized = true;
          console.log('🔐 Auth service initialized');
        }
      });
    } catch (error) {
      console.warn('⚠️ Firebase not configured, auth service running in demo mode');
      this.isInitialized = true;
    }
  }

  /**
   * Sign in with Google
   * @returns {Promise<Object>} User data
   */
  async signInWithGoogle() {
    try {
      const userData = await firebaseSignInWithGoogle();
      return {
        success: true,
        user: userData,
        message: 'Successfully signed in with Google'
      };
    } catch (error) {
      console.error('Auth service - Google sign-in error:', error);
      return {
        success: false,
        user: null,
        error: error.message
      };
    }
  }

  /**
   * Sign out the current user
   * @returns {Promise<Object>} Sign out result
   */
  async signOut() {
    try {
      await firebaseSignOut();
      return {
        success: true,
        message: 'Successfully signed out'
      };
    } catch (error) {
      console.error('Auth service - Sign out error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get the current user
   * @returns {Object|null} Current user data or null
   */
  getUser() {
    return this.currentUser;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return this.currentUser !== null;
  }

  /**
   * Check if the service is initialized
   * @returns {boolean} Initialization status
   */
  isReady() {
    return this.isInitialized;
  }

  /**
   * Add a listener for authentication state changes
   * @param {Function} listener - Function to call when auth state changes
   * @returns {Function} Function to remove the listener
   */
  onAuthStateChanged(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Auth state listener must be a function');
    }

    this.authStateListeners.push(listener);

    // If already initialized, call the listener immediately with current state
    if (this.isInitialized) {
      try {
        listener(this.currentUser, null);
      } catch (error) {
        console.error('Error calling auth state listener:', error);
      }
    }

    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(listener);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  /**
   * Get user profile information
   * @returns {Object|null} User profile data
   */
  getUserProfile() {
    if (!this.currentUser) {
      return null;
    }

    return {
      uid: this.currentUser.uid,
      email: this.currentUser.email,
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
      emailVerified: this.currentUser.emailVerified,
      isAuthenticated: true,
      signedInAt: Date.now()
    };
  }

  /**
   * Get user's display name or email as fallback
   * @returns {string} User's display name or email
   */
  getUserDisplayName() {
    if (!this.currentUser) {
      return 'Guest';
    }

    return this.currentUser.displayName || 
           this.currentUser.email?.split('@')[0] || 
           'User';
  }

  /**
   * Cleanup the authentication service
   */
  destroy() {
    if (this.unsubscribeAuthState) {
      this.unsubscribeAuthState();
    }
    this.authStateListeners = [];
    this.currentUser = null;
    this.isInitialized = false;
  }
}

// Create and export a singleton instance
const authService = new AuthService();

export default authService;

// Named exports for convenience
export { authService as auth };

// Legacy function exports for backward compatibility
export const signUp = async (email, password) => {
  console.warn('Email/password authentication not implemented. Use Google Sign-In instead.');
  throw new Error('Email/password authentication not implemented');
};

export const signIn = async (email, password) => {
  console.warn('Email/password authentication not implemented. Use Google Sign-In instead.');
  throw new Error('Email/password authentication not implemented');
};

export const signOut = async () => {
  const result = await authService.signOut();
  if (!result.success) {
    throw new Error(result.error);
  }
};

export const getCurrentUser = async () => {
  return authService.getUser();
};

export const resetPassword = async (email) => {
  console.warn('Password reset not implemented yet.');
  throw new Error('Password reset not implemented');
};

export const updateProfile = async (userData) => {
  console.warn('Profile update not implemented yet.');
  throw new Error('Profile update not implemented');
};
