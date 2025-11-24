import React from 'react';
import { type Expense } from '../types/expense';
import { ExpenseItem } from './ExpenseItem';

type Props = {
  list: Expense[];
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
};

export const ExpenseList: React.FC<Props> = ({ list, onEdit, onDelete }) => {
  if (!list.length) {
    return (
      <div className="
        p-8
        text-center
        text-sm sm:text-base
        text-slate-500 dark:text-slate-400
        border-2 border-dashed border-slate-200 dark:border-slate-700
        rounded-2xl
        bg-slate-50 dark:bg-slate-900/40
        shadow-inner
        flex flex-col items-center justify-center
        gap-2
        transition-all duration-300
      ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-slate-300 dark:text-slate-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M6.938 4h10.124a2 2 0 012 2v12a2 2 0 01-2 2H6.938a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
        No expenses found. Start by adding your first expense.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {list.map(item => (
        <div
          key={item.id}
          className="animate-fade-in"
        >
          <ExpenseItem item={item} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};
