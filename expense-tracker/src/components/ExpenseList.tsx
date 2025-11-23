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
        p-6
        text-center
        text-sm text-slate-500 dark:text-slate-400
        border-2 border-dashed border-slate-200 dark:border-slate-700
        rounded-xl
        bg-slate-50 dark:bg-slate-900/50
        transition-colors duration-300
      ">
        No expenses found. Start by adding your first expense.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {list.map(item => (
        <ExpenseItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
