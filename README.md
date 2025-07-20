# Expense Tracker

A responsive financial tracker web application built with React + Vite.

## Features

- 📊 **Dashboard** - Overview of financial data with statistics and recent transactions
- 💰 **Transaction Management** - Track income and expenses with detailed categorization
- 🏷️ **Category Management** - Organize transactions with custom categories
- 💳 **Budget Tracking** - Set and monitor spending limits
- 📈 **Reports & Analytics** - Analyze spending patterns and financial trends
- 🔧 **Settings** - Customize application preferences

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context + useReducer
- **Backend**: Firebase (to be integrated)

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (TopBar, Sidebar, Layout)
│   └── ui/              # Reusable UI components
├── pages/               # Page components
├── context/             # React Context for state management
├── services/            # API services (Firebase integration)
├── hooks/               # Custom React hooks
├── utils/               # Utility functions and constants
└── assets/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expensetracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Implementation Status

- ✅ **Project Setup** - React + Vite + Tailwind CSS
- ✅ **Routing** - React Router DOM setup
- ✅ **Layout System** - Responsive layout with sidebar and topbar
- ✅ **Dashboard** - Basic dashboard with mock data
- ✅ **State Management** - React Context setup
- ✅ **Utility Functions** - Helper functions and constants
- 🔄 **Firebase Integration** - Coming next
- 🔄 **Authentication** - User signup/signin
- 🔄 **Real Data Management** - CRUD operations
- 🔄 **Charts & Analytics** - Data visualization

## Next Steps

1. **Firebase Setup** - Configure Firebase project and integrate authentication
2. **Database Design** - Set up Firestore collections and security rules
3. **Authentication Flow** - Implement user registration and login
4. **Data Management** - Connect components to Firebase services
5. **Charts Integration** - Add data visualization with Chart.js or Recharts
6. **Advanced Features** - Export data, recurring transactions, notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
