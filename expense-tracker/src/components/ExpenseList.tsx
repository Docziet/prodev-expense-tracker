import React from 'react';
import { type Expense } from '../types/expense';
import { ExpenseItem } from './ExpenseItem';

type Props = {
  list: Expense[];
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
};

export const ExpenseList: React.FC<Props> = ({ list, onEdit, onDelete }) => {
  if (!list.length) return <div className="p-4 text-center text-sm text-slate-500">No expenses found.</div>;
  return (
    <div className="space-y-3">
      {list.map(item => <ExpenseItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  );
};
