import { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: null,
  transactions: [],
  categories: [],
  budgets: [],
  loading: false,
  error: null,
};

// Action types
export const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  ADD_CATEGORY: 'ADD_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
  SET_CATEGORIES: 'SET_CATEGORIES',
  ADD_BUDGET: 'ADD_BUDGET',
  UPDATE_BUDGET: 'UPDATE_BUDGET',
  DELETE_BUDGET: 'DELETE_BUDGET',
  SET_BUDGETS: 'SET_BUDGETS',
  CLEAR_DATA: 'CLEAR_DATA',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ActionTypes.SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    
    case ActionTypes.ADD_TRANSACTION:
      return { 
        ...state, 
        transactions: [...state.transactions, action.payload] 
      };
    
    case ActionTypes.UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        ),
      };
    
    case ActionTypes.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        ),
      };
    
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    
    case ActionTypes.ADD_CATEGORY:
      return { 
        ...state, 
        categories: [...state.categories, action.payload] 
      };
    
    case ActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    
    case ActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.id !== action.payload
        ),
      };
    
    case ActionTypes.SET_BUDGETS:
      return { ...state, budgets: action.payload };
    
    case ActionTypes.ADD_BUDGET:
      return { 
        ...state, 
        budgets: [...state.budgets, action.payload] 
      };
    
    case ActionTypes.UPDATE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.map(budget =>
          budget.id === action.payload.id ? action.payload : budget
        ),
      };
    
    case ActionTypes.DELETE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.filter(budget => budget.id !== action.payload),
      };
    
    case ActionTypes.CLEAR_DATA:
      return {
        ...initialState,
        user: state.user, // Keep user data
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
