import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        p-4
        animate-fade-in
      "
      onClick={onClose} // close when clicking outside modal
    >
      <div
        className="
          relative
          bg-white dark:bg-slate-900
          rounded-3xl shadow-2xl
          w-full max-w-lg
          p-6 sm:p-8
          transform scale-100 opacity-100
          transition-all duration-300
        "
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            p-2 rounded-full
            text-slate-600 dark:text-slate-300
            hover:bg-slate-200 dark:hover:bg-slate-700
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
          "
          aria-label="Close modal"
        >
          <IoClose size={22} />
        </button>

        {/* Modal content */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
