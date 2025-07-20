# Firebase Integration Setup Guide

Your Firebase integration has been set up with the v9 modular SDK! Here's how to complete the configuration:

## 🔧 Firebase Configuration

### Step 1: Update Firebase Config

Replace the placeholder configuration in `src/services/firebase.js` with your actual Firebase project settings:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "your-measurement-id" // Optional for Analytics
};
```

### Step 2: Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google Sign-in provider
   - Add your domain to authorized domains
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)

### Step 3: Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User's subcollections (transactions, categories, budgets)
      match /{collection=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## 🚀 Features Implemented

### ✅ Authentication Service (`src/services/auth.js`)
- Google Sign-In with popup
- Authentication state management
- User profile management
- Session persistence

### ✅ Firebase Service (`src/services/firebase.js`)
- Firebase v9 modular SDK integration
- Firestore, Auth, and Analytics initialization
- Error handling and fallbacks
- Network state management

### ✅ Transaction Service (`src/services/transactions.js`)
- CRUD operations for transactions
- Date range filtering
- Category filtering
- Transaction statistics
- Real-time Firestore integration

### ✅ Firestore Service (`src/services/firestore.js`)
- Categories management
- Budget tracking
- User profile settings
- Default data initialization

## 🔗 Integration with Components

### Authentication Integration

Update your components to use the auth service:

```javascript
import authService from '../services/auth.js';

// In your component
const handleGoogleSignIn = async () => {
  const result = await authService.signInWithGoogle();
  if (result.success) {
    console.log('Signed in:', result.user);
  } else {
    console.error('Sign-in failed:', result.error);
  }
};

// Listen to auth state changes
useEffect(() => {
  const unsubscribe = authService.onAuthStateChanged((user) => {
    if (user) {
      console.log('User signed in:', user);
    } else {
      console.log('User signed out');
    }
  });

  return unsubscribe;
}, []);
```

### Transaction Integration

```javascript
import { getTransactions, addTransaction } from '../services/transactions.js';

// Get transactions
const loadTransactions = async () => {
  try {
    const transactions = await getTransactions({
      limit: 50,
      orderBy: 'date',
      orderDirection: 'desc'
    });
    setTransactions(transactions);
  } catch (error) {
    console.error('Failed to load transactions:', error);
  }
};

// Add transaction
const handleAddTransaction = async (transactionData) => {
  try {
    const newTransaction = await addTransaction(transactionData);
    console.log('Transaction added:', newTransaction);
  } catch (error) {
    console.error('Failed to add transaction:', error);
  }
};
```

## 🎯 Next Steps

1. **Configure Firebase**: Add your actual Firebase config
2. **Test Authentication**: Try Google Sign-In
3. **Update Components**: Integrate auth state with your UI
4. **Add Transaction Forms**: Connect forms to transaction service
5. **Implement Categories**: Use Firestore service for categories
6. **Add Error Handling**: Show user-friendly error messages

## 📱 Component Updates Needed

### TopBar Component
- Add sign-in/sign-out buttons
- Show user avatar and name
- Handle authentication state

### Dashboard Component  
- Load real transactions from Firestore
- Show loading states
- Handle empty states

### Add Protection Routes
- Redirect to login if not authenticated
- Show different UI for authenticated/guest users

## 🔒 Security Considerations

- ✅ Firestore rules restrict data access to authenticated users
- ✅ Client-side auth state validation
- ✅ Server-side validation through Firestore rules
- ✅ Secure token handling by Firebase SDK

## 🐛 Troubleshooting

- If you see "Firebase not configured" warnings, add your config
- Check browser console for detailed error messages
- Ensure your domain is added to Firebase authorized domains
- Verify Firestore rules allow read/write access

Your expense tracker now has a complete Firebase backend! 🎉
