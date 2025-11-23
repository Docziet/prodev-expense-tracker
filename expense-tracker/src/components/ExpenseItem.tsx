import React from 'react';
import { type Expense } from '../types/expense';
import dayjs from 'dayjs';

type Props = {
  item: Expense;
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
};

// Map category to a color badge
const CATEGORY_COLORS: Record<string, string> = {
  Food: 'bg-green-100 text-green-800 dark:bg-green-700/30 dark:text-green-200',
  Transport: 'bg-blue-100 text-blue-800 dark:bg-blue-700/30 dark:text-blue-200',
  Health: 'bg-red-100 text-red-800 dark:bg-red-700/30 dark:text-red-200',
  Bills: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700/30 dark:text-yellow-200',
  Shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-700/30 dark:text-pink-200',
  Other: 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-200',
};

export const ExpenseItem: React.FC<Props> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="
      flex items-center justify-between p-4
      bg-white dark:bg-slate-800
      rounded-xl
      shadow-sm hover:shadow-md
      transition-all duration-300
    ">
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg">{item.title}</div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${CATEGORY_COLORS[item.category]}`}>
            {item.category}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-300">
            {dayjs(item.date).format('DD MMM, YYYY')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-lg font-bold text-slate-900 dark:text-slate-50">₦{item.amount.toLocaleString()}</div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="
              px-3 py-1 rounded-lg
              border border-gray-300 dark:border-slate-600
              text-slate-700 dark:text-slate-200
              hover:bg-gray-100 dark:hover:bg-slate-700
              transition-colors duration-200
              text-sm font-medium
            "
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="
              px-3 py-1 rounded-lg
              bg-red-600 hover:bg-red-700
              text-white
              transition-colors duration-200
              text-sm font-medium
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
