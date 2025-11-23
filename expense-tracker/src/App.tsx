import React, { useEffect, useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
  }, [dark]);

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Navbar dark={dark} toggleDark={() => setDark(d => !d)} />
        <main className="py-6">
          <Home />
        </main>
      </div>
    </ExpenseProvider>
  );
};
