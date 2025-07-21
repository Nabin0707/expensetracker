import { useState } from 'react';
import { formatCurrency } from '../utils/currency';
import { getStaggeredDelay, getEntranceAnimation, getHoverAnimation, getGlassMorphism } from '../utils/animations';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      avatar: '👤',
    },
    preferences: {
      currency: 'INR',
      language: 'English',
      theme: 'auto',
      notifications: true,
      emailReports: true,
      budgetAlerts: true,
      transactionAlerts: false,
      darkMode: false,
    },
    security: {
      twoFactorAuth: false,
      biometricAuth: true,
      sessionTimeout: '30',
      passwordLastChanged: '2 months ago',
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      personalization: true,
      marketingEmails: false,
    }
  });

  const tabs = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'preferences', label: 'Preferences', icon: '⚙️' },
    { key: 'security', label: 'Security', icon: '🔒' },
    { key: 'privacy', label: 'Privacy', icon: '🛡️' },
    { key: 'about', label: 'About', icon: 'ℹ️' },
  ];

  const currencies = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
  ];

  const themes = [
    { key: 'light', label: 'Light Mode', icon: '☀️' },
    { key: 'dark', label: 'Dark Mode', icon: '🌙' },
    { key: 'auto', label: 'Auto', icon: '🌓' },
  ];

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const SettingItem = ({ label, description, children, icon }) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl ${getGlassMorphism('light')} ${getHoverAnimation('glass')}`}>
      <div className="flex items-center gap-3 flex-1">
        {icon && <span className="text-xl">{icon}</span>}
        <div>
          <div className="font-semibold text-charcoal-ink dark:text-gray-100">
            {label}
          </div>
          {description && (
            <div className="text-sm text-slate-gray dark:text-gray-400 mt-1">
              {description}
            </div>
          )}
        </div>
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
        checked
          ? 'bg-gradient-primary shadow-dopamine'
          : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
          checked ? 'left-7' : 'left-1'
        }`}
      />
    </button>
  );

  const Select = ({ value, onChange, options, placeholder }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-4 py-2 rounded-xl border-none ${getGlassMorphism('medium')} text-charcoal-ink dark:text-gray-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.code || option.key} value={option.code || option.key}>
          {option.name || option.label}
        </option>
      ))}
    </select>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className={`${getGlassMorphism('medium')} p-8 rounded-3xl shadow-glass text-center`}>
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-4xl text-white shadow-dopamine">
            {settings.profile.avatar}
          </div>
          <button className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-secondary text-white shadow-dopamine-secondary ${getHoverAnimation('bounce')} focus:ring-2 focus:ring-secondary-500/50`}>
            ✏️
          </button>
        </div>
        <h3 className="text-xl font-bold text-charcoal-ink dark:text-gray-100 mb-2">
          {settings.profile.name}
        </h3>
        <p className="text-slate-gray dark:text-gray-400">
          {settings.profile.email}
        </p>
      </div>

      {/* Profile Information */}
      <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass space-y-4`}>
        <h4 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-4">
          Personal Information
        </h4>
        
        <SettingItem label="Full Name" icon="👤">
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => updateSetting('profile', 'name', e.target.value)}
            className={`px-4 py-2 rounded-xl border-none ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none`}
          />
        </SettingItem>

        <SettingItem label="Email Address" icon="📧">
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => updateSetting('profile', 'email', e.target.value)}
            className={`px-4 py-2 rounded-xl border-none ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none`}
          />
        </SettingItem>

        <SettingItem label="Phone Number" icon="📱">
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
            className={`px-4 py-2 rounded-xl border-none ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none`}
          />
        </SettingItem>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* General Preferences */}
      <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass space-y-4`}>
        <h4 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-4">
          General Preferences
        </h4>
        
        <SettingItem 
          label="Currency" 
          description="Choose your preferred currency"
          icon="💰"
        >
          <Select
            value={settings.preferences.currency}
            onChange={(value) => updateSetting('preferences', 'currency', value)}
            options={currencies}
          />
        </SettingItem>

        <SettingItem 
          label="Language" 
          description="Select your preferred language"
          icon="🌐"
        >
          <Select
            value={settings.preferences.language}
            onChange={(value) => updateSetting('preferences', 'language', value)}
            options={languages}
          />
        </SettingItem>

        <SettingItem 
          label="Theme" 
          description="Choose your preferred theme"
          icon="🎨"
        >
          <div className="flex gap-2">
            {themes.map((theme) => (
              <button
                key={theme.key}
                onClick={() => updateSetting('preferences', 'theme', theme.key)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  settings.preferences.theme === theme.key
                    ? 'bg-gradient-primary text-white shadow-dopamine'
                    : `${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`
                }`}
              >
                <span>{theme.icon}</span>
                <span className="hidden lg:inline">{theme.label}</span>
              </button>
            ))}
          </div>
        </SettingItem>
      </div>

      {/* Notifications */}
      <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass space-y-4`}>
        <h4 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-4">
          Notifications
        </h4>
        
        <SettingItem 
          label="Push Notifications" 
          description="Receive notifications on your device"
          icon="🔔"
        >
          <Toggle
            checked={settings.preferences.notifications}
            onChange={(value) => updateSetting('preferences', 'notifications', value)}
          />
        </SettingItem>

        <SettingItem 
          label="Email Reports" 
          description="Get weekly financial reports via email"
          icon="📊"
        >
          <Toggle
            checked={settings.preferences.emailReports}
            onChange={(value) => updateSetting('preferences', 'emailReports', value)}
          />
        </SettingItem>

        <SettingItem 
          label="Budget Alerts" 
          description="Get notified when approaching budget limits"
          icon="⚠️"
        >
          <Toggle
            checked={settings.preferences.budgetAlerts}
            onChange={(value) => updateSetting('preferences', 'budgetAlerts', value)}
          />
        </SettingItem>

        <SettingItem 
          label="Transaction Alerts" 
          description="Get notified for each transaction"
          icon="💳"
        >
          <Toggle
            checked={settings.preferences.transactionAlerts}
            onChange={(value) => updateSetting('preferences', 'transactionAlerts', value)}
          />
        </SettingItem>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Authentication */}
      <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass space-y-4`}>
        <h4 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-4">
          Authentication
        </h4>
        
        <SettingItem 
          label="Two-Factor Authentication" 
          description="Add an extra layer of security to your account"
          icon="🔐"
        >
          <Toggle
            checked={settings.security.twoFactorAuth}
            onChange={(value) => updateSetting('security', 'twoFactorAuth', value)}
          />
        </SettingItem>

        <SettingItem 
          label="Biometric Authentication" 
          description="Use fingerprint or face recognition"
          icon="👆"
        >
          <Toggle
            checked={settings.security.biometricAuth}
            onChange={(value) => updateSetting('security', 'biometricAuth', value)}
          />
        </SettingItem>

        <SettingItem 
          label="Session Timeout" 
          description="Automatically log out after inactivity"
          icon="⏱️"
        >
          <Select
            value={settings.security.sessionTimeout}
            onChange={(value) => updateSetting('security', 'sessionTimeout', value)}
            options={[
              { key: '15', label: '15 minutes' },
              { key: '30', label: '30 minutes' },
              { key: '60', label: '1 hour' },
              { key: '120', label: '2 hours' },
            ]}
          />
        </SettingItem>
      </div>

      {/* Password */}
      <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass space-y-4`}>
        <h4 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-4">
          Password & Recovery
        </h4>
        
        <SettingItem 
          label="Change Password" 
          description={`Last changed ${settings.security.passwordLastChanged}`}
          icon="🔑"
        >
          <button className={`px-4 py-2 rounded-xl font-medium text-white bg-gradient-secondary shadow-dopamine-secondary ${getHoverAnimation('lift')} focus:ring-2 focus:ring-secondary-500/50`}>
            Change
          </button>
        </SettingItem>

        <SettingItem 
          label="Backup Codes" 
          description="Generate backup codes for account recovery"
          icon="🎫"
        >
          <button className={`px-4 py-2 rounded-xl font-medium ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')} focus:ring-2 focus:ring-gray-400/50`}>
            Generate
          </button>
        </SettingItem>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass space-y-4`}>
        <h4 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-4">
          Privacy Controls
        </h4>
        
        <SettingItem 
          label="Data Sharing" 
          description="Share anonymized data to improve our services"
          icon="📊"
        >
          <Toggle
            checked={settings.privacy.dataSharing}
            onChange={(value) => updateSetting('privacy', 'dataSharing', value)}
          />
        </SettingItem>

        <SettingItem 
          label="Analytics" 
          description="Help us understand how you use the app"
          icon="📈"
        >
          <Toggle
            checked={settings.privacy.analytics}
            onChange={(value) => updateSetting('privacy', 'analytics', value)}
          />
        </SettingItem>

        <SettingItem 
          label="Personalization" 
          description="Personalize your experience based on usage"
          icon="🎯"
        >
          <Toggle
            checked={settings.privacy.personalization}
            onChange={(value) => updateSetting('privacy', 'personalization', value)}
          />
        </SettingItem>

        <SettingItem 
          label="Marketing Emails" 
          description="Receive promotional emails and updates"
          icon="📧"
        >
          <Toggle
            checked={settings.privacy.marketingEmails}
            onChange={(value) => updateSetting('privacy', 'marketingEmails', value)}
          />
        </SettingItem>
      </div>

      {/* Data Management */}
      <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass space-y-4`}>
        <h4 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-4">
          Data Management
        </h4>
        
        <SettingItem 
          label="Export Data" 
          description="Download all your financial data"
          icon="📤"
        >
          <button className={`px-4 py-2 rounded-xl font-medium text-white bg-gradient-primary shadow-dopamine ${getHoverAnimation('lift')} focus:ring-2 focus:ring-primary-500/50`}>
            Export
          </button>
        </SettingItem>

        <SettingItem 
          label="Delete Account" 
          description="Permanently delete your account and all data"
          icon="⚠️"
        >
          <button className={`px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-danger-500 to-danger-600 shadow-danger ${getHoverAnimation('lift')} focus:ring-2 focus:ring-danger-500/50`}>
            Delete
          </button>
        </SettingItem>
      </div>
    </div>
  );

  const renderAboutTab = () => (
    <div className="space-y-6">
      {/* App Info */}
      <div className={`${getGlassMorphism('medium')} p-8 rounded-3xl shadow-glass text-center`}>
        <div className="text-6xl mb-4">💰</div>
        <h3 className="text-2xl font-bold text-charcoal-ink dark:text-gray-100 mb-2">
          Expense Tracker
        </h3>
        <p className="text-slate-gray dark:text-gray-400 mb-4">
          Version 2.1.0
        </p>
        <p className="text-sm text-slate-gray dark:text-gray-400 max-w-md mx-auto">
          Your smart financial companion that helps you track expenses, manage budgets, and achieve your financial goals with beautiful, intuitive design.
        </p>
      </div>

      {/* App Details */}
      <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass space-y-4`}>
        <h4 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-4">
          Application Details
        </h4>
        
        <SettingItem label="Version" icon="📱">
          <span className="text-slate-gray dark:text-gray-400">2.1.0</span>
        </SettingItem>

        <SettingItem label="Last Updated" icon="📅">
          <span className="text-slate-gray dark:text-gray-400">December 2024</span>
        </SettingItem>

        <SettingItem label="Storage Used" icon="💾">
          <span className="text-slate-gray dark:text-gray-400">12.5 MB</span>
        </SettingItem>

        <SettingItem label="Developer" icon="👨‍💻">
          <span className="text-slate-gray dark:text-gray-400">ExpenseTracker Team</span>
        </SettingItem>
      </div>

      {/* Support */}
      <div className={`${getGlassMorphism('medium')} p-6 rounded-3xl shadow-glass space-y-4`}>
        <h4 className="text-lg font-bold text-charcoal-ink dark:text-gray-100 mb-4">
          Support & Legal
        </h4>
        
        <SettingItem label="Help Center" icon="❓">
          <button className={`px-4 py-2 rounded-xl font-medium ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')} focus:ring-2 focus:ring-gray-400/50`}>
            Open
          </button>
        </SettingItem>

        <SettingItem label="Privacy Policy" icon="📄">
          <button className={`px-4 py-2 rounded-xl font-medium ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')} focus:ring-2 focus:ring-gray-400/50`}>
            View
          </button>
        </SettingItem>

        <SettingItem label="Terms of Service" icon="📜">
          <button className={`px-4 py-2 rounded-xl font-medium ${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')} focus:ring-2 focus:ring-gray-400/50`}>
            View
          </button>
        </SettingItem>

        <SettingItem label="Contact Support" icon="💬">
          <button className={`px-4 py-2 rounded-xl font-medium text-white bg-gradient-primary shadow-dopamine ${getHoverAnimation('lift')} focus:ring-2 focus:ring-primary-500/50`}>
            Contact
          </button>
        </SettingItem>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'preferences':
        return renderPreferencesTab();
      case 'security':
        return renderSecurityTab();
      case 'privacy':
        return renderPrivacyTab();
      case 'about':
        return renderAboutTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8 bg-snow-mist dark:bg-neural-dark">
      {/* Header */}
      <div className={`${getEntranceAnimation('scale')}`}>
        <div className={`${getGlassMorphism('strong')} p-8 rounded-3xl shadow-glass-strong`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-skywave bg-clip-text text-transparent mb-2">
                ⚙️ Settings
              </h1>
              <p className="text-lg text-slate-gray dark:text-gray-300">
                Customize your expense tracking experience
              </p>
            </div>
            <button className={`px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-primary shadow-dopamine ${getHoverAnimation('lift')} focus:ring-2 focus:ring-primary-500/50`}>
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${getEntranceAnimation('up')}`} style={getStaggeredDelay(1)}>
        <div className={`${getGlassMorphism('medium')} p-2 rounded-3xl shadow-glass`}>
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-gradient-primary text-white shadow-dopamine'
                    : `${getGlassMorphism('light')} text-charcoal-ink dark:text-gray-300 ${getHoverAnimation('glass')}`
                }`}
                style={getStaggeredDelay(index, 0.05)}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className={`${getEntranceAnimation('up')}`} style={getStaggeredDelay(2)}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;
