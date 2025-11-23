import React from 'react';
import { Expense } from '../types/expense';
import dayjs from 'dayjs';

type Props = {
  item: Expense;
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
};

export const ExpenseItem: React.FC<Props> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded shadow-sm">
      <div>
        <div className="font-medium text-slate-800 dark:text-slate-100">{item.title}</div>
        <div className="text-sm text-slate-500 dark:text-slate-300">{item.category} • {dayjs(item.date).format('DD MMM, YYYY')}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">₦{item.amount.toLocaleString()}</div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(item)} className="text-sm px-2 py-1 border rounded">Edit</button>
          <button onClick={() => onDelete(item.id)} className="text-sm px-2 py-1 rounded bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>
  );
};
