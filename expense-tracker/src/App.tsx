import React, { useEffect, useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

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
        <Navbar
          dark={dark}
          toggleDark={() => setDark((d) => !d)}
        />

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
