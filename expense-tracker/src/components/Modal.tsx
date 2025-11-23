import React from 'react';

export const Modal: React.FC<{ open: boolean; onClose: () => void; children?: React.ReactNode }> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-md shadow-lg w-full max-w-lg p-4">
        <button className="text-sm mb-2" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};
