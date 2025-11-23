import React from 'react';
import { IoClose } from 'react-icons/io5'; // Using an icon for a pro-level close button

export const Modal: React.FC<{ open: boolean; onClose: () => void; children?: React.ReactNode }> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      <div className="
        relative
        bg-white dark:bg-slate-900
        rounded-2xl shadow-2xl
        w-full max-w-lg
        p-6
        animate-scale-in
        transition-transform duration-300
      ">
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            p-2 rounded-full
            text-slate-600 dark:text-slate-300
            hover:bg-slate-200 dark:hover:bg-slate-700
            transition-colors duration-200
          "
        >
          <IoClose size={20} />
        </button>

        {/* Modal content */}
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};
