/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ServitTax Professional Color Palette - Nouvelle palette personnalisée
        'servitax': {
          'primary': '#414a57',      // Nouveau bleu principal
          'secondary': '#6abe5e',    // Nouveau vert obligatoire  
          'accent': '#6abe5e',       // Accent vert
          'dark': '#2d3748',         // Dark slate - text
          'light': '#f8fafc',        // Ultra-light gray - backgrounds
          'blue': {
            50: '#f7f8fa',
            100: '#eef0f4', 
            200: '#dde2ea',
            300: '#c4cddb',
            400: '#a6b4c8',
            500: '#414a57',
            600: '#394048',
            700: '#2f353d',
            800: '#262b33',
            900: '#1f2328',
          },
          'green': {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#6abe5e',
            500: '#6abe5e',
            600: '#5ca856',
            700: '#4f914c',
            800: '#427a42',
            900: '#365638',
          },
          // Garde les anciennes couleurs pour compatibilité
          'teal': {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
          },
          'cyan': {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',  
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
          }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
      }
    },
  },
  plugins: [],
};