import React, { useState } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import clsx from 'clsx';

type Props = {
  dark: boolean;
  toggleDark: () => void;
};

export const Navbar: React.FC<Props> = ({ dark, toggleDark }) => {
  const [rotation, setRotation] = useState(0);

  // Animate icon rotation
  const handleToggle = () => {
    setRotation(prev => prev + 360);
    toggleDark(); // trigger dark mode toggle
  };

  return (
    <header
      className={clsx(
        'w-full py-4 shadow-md transition-colors duration-500 backdrop-blur-sm border-b',
        'border-slate-200 dark:border-slate-700',
        'bg-white/80 dark:bg-slate-800/80'
      )}
    >
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <h1 className="font-extrabold text-2xl text-slate-900 dark:text-slate-100 tracking-wide select-none">
          SpendSmart
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            aria-label="Toggle theme"
            className={clsx(
              'p-2 rounded-md text-slate-600 dark:text-slate-300',
              'hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300',
              'shadow-sm hover:shadow-md transform hover:scale-105'
            )}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.6s ease-in-out',
              }}
            >
              {dark ? <BsSun size={22} /> : <BsMoon size={22} />}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
