import React from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import clsx from 'clsx';

type Props = { dark: boolean; toggleDark: () => void; };

export const Navbar: React.FC<Props> = ({ dark, toggleDark }) => {
  return (
    <header className="w-full py-4 bg-white dark:bg-slate-800 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <h1 className="font-semibold text-lg text-slate-900 dark:text-slate-100">SpendSmart</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {dark ? <BsSun /> : <BsMoon />}
          </button>
        </div>
      </div>
    </header>
  );
};
