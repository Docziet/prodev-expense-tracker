/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // use class strategy for dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#facc15',
        danger: '#ef4444',
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.2)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'slide-up': { '0%': { transform: 'translateY(20px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        'scale-fade-in': { '0%': { opacity: 0, transform: 'scale(0.95)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'scale-fade-in': 'scale-fade-in 0.3s ease-out forwards',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        colors: 'background-color, color, border-color, fill, stroke',
      },
      transitionDuration: { 250: '250ms', 400: '400ms', 600: '600ms' },
    },
  },
  plugins: [],
};
