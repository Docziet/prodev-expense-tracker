import React from 'react';
import { type Expense } from '../types/expense';
import dayjs from 'dayjs';

type Props = {
  item: Expense;
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
};

// Map category to a gradient badge
const CATEGORY_COLORS: Record<string, string> = {
  Food: 'bg-gradient-to-r from-green-200 to-green-300 dark:from-green-700/40 dark:to-green-600/30 text-green-800 dark:text-green-200',
  Transport: 'bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-700/40 dark:to-blue-600/30 text-blue-800 dark:text-blue-200',
  Health: 'bg-gradient-to-r from-red-200 to-red-300 dark:from-red-700/40 dark:to-red-600/30 text-red-800 dark:text-red-200',
  Bills: 'bg-gradient-to-r from-yellow-200 to-yellow-300 dark:from-yellow-700/40 dark:to-yellow-600/30 text-yellow-800 dark:text-yellow-200',
  Shopping: 'bg-gradient-to-r from-pink-200 to-pink-300 dark:from-pink-700/40 dark:to-pink-600/30 text-pink-800 dark:text-pink-200',
  Other: 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700/30 dark:to-slate-600/20 text-gray-800 dark:text-slate-200',
};

export const ExpenseItem: React.FC<Props> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="
      flex items-center justify-between p-4 sm:p-5
      bg-white dark:bg-slate-800
      rounded-2xl
      shadow-sm hover:shadow-lg
      transform hover:-translate-y-1
      transition-all duration-300
    ">
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg sm:text-xl">
          {item.title}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${CATEGORY_COLORS[item.category]}`}>
            {item.category}
          </span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-slate-300">
            {dayjs(item.date).format('DD MMM, YYYY')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400">
          ₦{item.amount.toLocaleString()}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="
              px-3 sm:px-4 py-1 sm:py-2
              rounded-lg
              border border-gray-300 dark:border-slate-600
              text-slate-700 dark:text-slate-200
              hover:bg-gray-100 dark:hover:bg-slate-700
              transition-colors duration-200
              text-sm sm:text-base font-medium
            "
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="
              px-3 sm:px-4 py-1 sm:py-2
              rounded-lg
              bg-red-600 hover:bg-red-700
              text-white
              transition-colors duration-200
              text-sm sm:text-base font-medium
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
