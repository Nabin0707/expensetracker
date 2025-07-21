/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // 🎨 Dopamine-Optimized Glassmorphism Color Palette
        // Base Background Colors
        'snow-mist': '#F9FAFB',
        'frosted-white': 'rgba(255, 255, 255, 0.6)',
        
        // Primary Brand Colors (Sky Energy Blue)
        primary: {
          50: '#f0f8ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#4EA8DE', // Sky Energy - main brand color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        
        // Secondary Accent Colors (Tangerine Glow)
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#F4A261', // Tangerine Glow - energizing accent
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        
        // Success Colors (Mint Fresh)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#2ECC71', // Mint Fresh - reward & satisfaction
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        
        // Danger/Alert Colors (Soft Coral)
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#FF6B6B', // Soft Coral - noticeable but not panic-inducing
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        
        // Warning Colors (keeping existing for consistency)
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        
        // Chart & Data Visualization Colors
        'teal-pop': '#38B2AC', // Energizing teal for positive data
        'lavender-blue': '#A78BFA', // Calm modern purple for categories
        
        // Text Colors
        'charcoal-ink': '#1F2937', // High contrast primary text
        'slate-gray': '#6B7280', // Secondary text and muted content
        
        // Border & Divider Colors
        'glass-line': '#E5E7EB', // Subtle borders and dividers
        
        // Glassmorphism Surface Colors
        glass: {
          white: 'rgba(255, 255, 255, 0.6)', // Frosted White for glass cards
          light: 'rgba(255, 255, 255, 0.4)', // Lighter glass effect
          dark: 'rgba(0, 0, 0, 0.08)', // Dark mode glass
          border: 'rgba(255, 255, 255, 0.2)', // Glass borders
        },
        
        // Neural backgrounds (keeping for compatibility)
        neural: {
          light: '#f0f2f5',
          dark: '#1a1a1a',
        }
      },
      backgroundImage: {
        // 🌈 Dopamine-Boosting Gradients
        'gradient-skywave': 'linear-gradient(135deg, #4EA8DE, #A78BFA)', // Sky Energy to Lavender Blue
        'gradient-sunrise': 'linear-gradient(135deg, #F4A261, #FF6B6B)', // Tangerine to Soft Coral
        'gradient-mint-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(46, 204, 113, 0.2))', // Mint Glass overlay
        
        // Updated Primary Gradients with New Colors
        'gradient-primary': 'linear-gradient(135deg, #4EA8DE 0%, #A78BFA 100%)', // Sky Energy to Lavender
        'gradient-secondary': 'linear-gradient(135deg, #F4A261 0%, #FF6B6B 100%)', // Tangerine to Coral
        'gradient-success': 'linear-gradient(135deg, #2ECC71 0%, #38B2AC 100%)', // Mint Fresh to Teal Pop
        'gradient-warning': 'linear-gradient(135deg, #F4A261 0%, #fbbf24 100%)', // Tangerine gradient
        'gradient-danger': 'linear-gradient(135deg, #FF6B6B 0%, #f87171 100%)', // Soft Coral gradient
        
        // Glass Effects
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)', // Enhanced glass
        'gradient-glass-subtle': 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)', // Subtle glass
        
        // Utility Gradients
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        
        // Enhanced Mesh Gradient with New Colors
        'mesh-gradient': `
          radial-gradient(at 40% 20%, rgba(78, 168, 222, 0.3) 0px, transparent 50%), 
          radial-gradient(at 80% 0%, rgba(167, 139, 250, 0.3) 0px, transparent 50%), 
          radial-gradient(at 0% 50%, rgba(244, 162, 97, 0.2) 0px, transparent 50%), 
          radial-gradient(at 80% 50%, rgba(255, 107, 107, 0.2) 0px, transparent 50%), 
          radial-gradient(at 0% 100%, rgba(46, 204, 113, 0.2) 0px, transparent 50%), 
          radial-gradient(at 80% 100%, rgba(56, 178, 172, 0.3) 0px, transparent 50%)
        `,
      },
      boxShadow: {
        // 🌟 Enhanced Glassmorphism Shadows
        'glass': '0 8px 32px 0 rgba(78, 168, 222, 0.15)', // Sky Energy glass
        'glass-subtle': '0 4px 16px 0 rgba(255, 255, 255, 0.1)', // Subtle glass
        'glass-strong': '0 12px 40px 0 rgba(78, 168, 222, 0.2)', // Strong glass with brand color
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)', // Dark mode glass
        
        // Neuomorphism (keeping existing)
        'neuro': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
        'neuro-dark': '8px 8px 16px #0a0a0a, -8px -8px 16px #1a1a1a',
        'neuro-inset': 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff',
        'neuro-inset-dark': 'inset 4px 4px 8px #0a0a0a, inset -4px -4px 8px #1a1a1a',
        
        // Dopamine Glow Effects
        'glow': '0 0 20px rgba(78, 168, 222, 0.3)', // Sky Energy glow
        'glow-lg': '0 0 40px rgba(78, 168, 222, 0.4)', // Large Sky Energy glow
        'glow-success': '0 0 20px rgba(46, 204, 113, 0.3)', // Mint Fresh glow
        'glow-secondary': '0 0 20px rgba(244, 162, 97, 0.3)', // Tangerine glow
        'glow-danger': '0 0 20px rgba(255, 107, 107, 0.3)', // Soft Coral glow
        
        // Soft Shadows for Cards
        'soft': '0 2px 8px rgba(31, 41, 55, 0.04), 0 1px 2px rgba(31, 41, 55, 0.02)', // Charcoal Ink soft
        'soft-lg': '0 10px 25px rgba(31, 41, 55, 0.08), 0 2px 6px rgba(31, 41, 55, 0.04)', // Large soft shadow
        'soft-xl': '0 20px 45px rgba(31, 41, 55, 0.1), 0 4px 12px rgba(31, 41, 55, 0.06)', // Extra large soft
        
        // Dopamine Interactive Shadows
        'dopamine': '0 8px 24px rgba(78, 168, 222, 0.3)', // Primary dopamine
        'dopamine-hover': '0 15px 35px rgba(78, 168, 222, 0.4)', // Hover state
        'dopamine-secondary': '0 8px 24px rgba(244, 162, 97, 0.3)', // Secondary dopamine
        'dopamine-success': '0 8px 24px rgba(46, 204, 113, 0.3)', // Success dopamine
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'slide-in-up': 'slideInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'shimmer': 'shimmer 2s infinite',
        'rotate': 'rotate 4s linear infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'micro-bounce': 'microBounce 0.3s ease-out',
      },
      keyframes: {
        gradientShift: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            'box-shadow': '0 0 20px rgba(78, 168, 222, 0.3), 0 0 40px rgba(78, 168, 222, 0.1)',
          },
          '50%': { 
            'box-shadow': '0 0 30px rgba(78, 168, 222, 0.5), 0 0 60px rgba(78, 168, 222, 0.2)',
          },
        },
        slideInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          from: {
            opacity: '0',
            transform: 'scale(0.8)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        shimmer: {
          '0%': { 'background-position': '-1000px 0' },
          '100%': { 'background-position': '1000px 0' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
          '70%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        glowPulse: {
          '0%, 100%': { 
            filter: 'brightness(1) saturate(1)',
            transform: 'scale(1)'
          },
          '50%': { 
            filter: 'brightness(1.1) saturate(1.2)',
            transform: 'scale(1.02)'
          },
        },
        microBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
