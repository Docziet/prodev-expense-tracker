import React, { useEffect, useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => {
  // Initialize dark mode from localStorage directly
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // Apply dark/light theme by toggling class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');

    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Toggle dark mode
  const toggleDark = () => setDark((prev) => !prev);

  return (
    <ExpenseProvider>
      <div
        className={`
          min-h-screen transition-colors duration-500
          bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800
          text-slate-900 dark:text-slate-100
          flex flex-col
        `}
      >
        {/* Navbar */}
        <Navbar dark={dark} toggleDark={toggleDark} />

        {/* Main Content */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
          <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 transition-all duration-500">
            <Home />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} SpendSmart. All rights reserved.
        </footer>
      </div>
    </ExpenseProvider>
  );
};
