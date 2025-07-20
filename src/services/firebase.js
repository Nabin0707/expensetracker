// Firebase v9 modular SDK configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

/**
 * Firebase configuration object
 * Replace with your actual Firebase project configuration
 */
const firebaseConfig = {
  // TODO: Add your Firebase configuration here
  // apiKey: "your-api-key",
  // authDomain: "your-project.firebaseapp.com",
  // projectId: "your-project-id",
  // storageBucket: "your-project.appspot.com",
  // messagingSenderId: "123456789",
  // appId: "your-app-id",
  // measurementId: "your-measurement-id"
};

// Check if Firebase config is available
const isFirebaseConfigured = firebaseConfig.apiKey && 
                             firebaseConfig.authDomain && 
                             firebaseConfig.projectId;

// Initialize Firebase app
let app;
let auth;
let db;
let analytics;

try {
  // Initialize Firebase only if config is provided
  if (isFirebaseConfigured) {
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase Authentication
    auth = getAuth(app);
    
    // Initialize Firestore
    db = getFirestore(app);
    
    // Initialize Analytics (only in browser environment)
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      });
    }
    
    console.log('✅ Firebase initialized successfully');
  } else {
    console.warn('⚠️ Firebase configuration not found. Please add your Firebase config to initialize the app.');
    console.log('The app will work in demo mode with mock data.');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  console.log('The app will continue in demo mode.');
}

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

/**
 * Get Firebase app instance
 * @returns {Object} Firebase app instance
 */
export const getFirebaseApp = () => {
  if (!app) {
    throw new Error('Firebase app is not initialized. Please check your configuration.');
  }
  return app;
};

/**
 * Get Firebase Auth instance
 * @returns {Object} Firebase Auth instance
 */
export const getFirebaseAuth = () => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please check your configuration.');
  }
  return auth;
};

/**
 * Get Firestore database instance
 * @returns {Object} Firestore instance
 */
export const getFirebaseFirestore = () => {
  if (!db) {
    throw new Error('Firestore is not initialized. Please check your configuration.');
  }
  return db;
};

/**
 * Get Firebase Analytics instance
 * @returns {Object} Firebase Analytics instance or null
 */
export const getFirebaseAnalytics = () => {
  return analytics || null;
};

/**
 * Sign in with Google
 * @returns {Promise<Object>} User object
 */
export const signInWithGoogle = async () => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized');
    }
    
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    console.log('✅ Google sign-in successful:', {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    });
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
  } catch (error) {
    console.error('❌ Google sign-in error:', error);
    
    // Handle specific error codes
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        throw new Error('Sign-in was cancelled. Please try again.');
      case 'auth/popup-blocked':
        throw new Error('Pop-up was blocked. Please allow pop-ups for this site.');
      case 'auth/network-request-failed':
        throw new Error('Network error. Please check your internet connection.');
      default:
        throw new Error(error.message || 'Failed to sign in with Google');
    }
  }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized');
    }
    
    await firebaseSignOut(auth);
    console.log('✅ User signed out successfully');
  } catch (error) {
    console.error('❌ Sign-out error:', error);
    throw new Error('Failed to sign out');
  }
};

/**
 * Get the current authenticated user
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
  if (!auth) {
    return null;
  }
  
  const user = auth.currentUser;
  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
  }
  
  return null;
};

/**
 * Listen to authentication state changes
 * @param {Function} callback - Callback function to handle auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  if (!auth) {
    console.warn('Firebase Auth is not initialized');
    // Call callback immediately with null user for demo mode
    setTimeout(() => callback(null), 0);
    return () => {};
  }
  
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      callback(userData);
    } else {
      callback(null);
    }
  });
};

/**
 * Enable Firestore network
 * @returns {Promise<void>}
 */
export const enableFirestoreNetwork = async () => {
  try {
    if (db) {
      await enableNetwork(db);
      console.log('✅ Firestore network enabled');
    }
  } catch (error) {
    console.error('❌ Error enabling Firestore network:', error);
  }
};

/**
 * Disable Firestore network
 * @returns {Promise<void>}
 */
export const disableFirestoreNetwork = async () => {
  try {
    if (db) {
      await disableNetwork(db);
      console.log('✅ Firestore network disabled');
    }
  } catch (error) {
    console.error('❌ Error disabling Firestore network:', error);
  }
};

// Export the initialized instances
export { app, auth, db, analytics };

// Default export
export default {
  app,
  auth,
  db,
  analytics,
  getFirebaseApp,
  getFirebaseAuth,
  getFirebaseFirestore,
  getFirebaseAnalytics,
  signInWithGoogle,
  signOut,
  getCurrentUser,
  onAuthStateChange,
  enableFirestoreNetwork,
  disableFirestoreNetwork,
};
