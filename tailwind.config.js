/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'servitax': {
          'primary': '#1e40af',    // Bleu principal (header/navigation)
          'secondary': '#3b82f6',  // Bleu secondaire (boutons)
          'accent': '#60a5fa',     // Bleu clair (accents)
          'dark': '#374151',       // Gris foncé
          'light': '#f3f4f6',      // Gris clair
        }
      }
    },
  },
  plugins: [],
};
