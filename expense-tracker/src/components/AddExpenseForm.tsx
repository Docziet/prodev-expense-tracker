import React, { useEffect, useState } from 'react';
import { type Category, type Expense } from '../types/expense';
import dayjs from 'dayjs';

type Props = {
  initial?: Expense | null;
  onCancel?: () => void;
  onSave: (payload: Omit<Expense, 'id'> | Expense) => void;
};

const CATEGORIES: Category[] = ['Food', 'Transport', 'Health', 'Bills', 'Shopping', 'Other'];

export const AddExpenseForm: React.FC<Props> = ({ initial = null, onCancel, onSave }) => {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [amount, setAmount] = useState(initial?.amount ? String(initial.amount) : '');
  const [category, setCategory] = useState<Category>(initial?.category ?? 'Other');
  const [date, setDate] = useState(initial?.date ?? dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setAmount(String(initial.amount));
      setCategory(initial.category);
      setDate(initial.date);
    }
  }, [initial]);

  const submit = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    const numeric = Number(amount || 0);
    if (!title.trim() || numeric <= 0) return alert('Provide title and valid amount');
    const payload = { title: title.trim(), amount: numeric, category, date };
    if (initial) onSave({ ...(initial as Expense), ...payload });
    else onSave(payload);
    if (!initial) {
      setTitle('');
      setAmount('');
      setCategory('Other');
      setDate(dayjs().format('YYYY-MM-DD'));
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter expense title"
          className="
            w-full
            rounded-lg
            px-4 py-2
            border border-gray-300 dark:border-slate-600
            bg-white dark:bg-slate-700
            text-slate-900 dark:text-slate-100
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
            transition-all duration-300
          "
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="₦0"
          className="
            w-full
            rounded-lg
            px-4 py-2
            border border-gray-300 dark:border-slate-600
            bg-white dark:bg-slate-700
            text-slate-900 dark:text-slate-100
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
            transition-all duration-300
          "
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="
            w-full
            rounded-lg
            px-4 py-2
            border border-gray-300 dark:border-slate-600
            bg-white dark:bg-slate-700
            text-slate-900 dark:text-slate-100
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
            transition-all duration-300
            cursor-pointer
          "
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Date</label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="
            w-full
            rounded-lg
            px-4 py-2
            border border-gray-300 dark:border-slate-600
            bg-white dark:bg-slate-700
            text-slate-900 dark:text-slate-100
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
            transition-all duration-300
          "
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end mt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="
              px-4 py-2
              rounded-lg
              border border-gray-300 dark:border-slate-600
              text-slate-700 dark:text-slate-200
              hover:bg-gray-100 dark:hover:bg-slate-600
              transition-colors duration-300
            "
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="
            px-4 py-2
            rounded-lg
            bg-indigo-600 hover:bg-indigo-700
            text-white
            shadow-sm hover:shadow-md
            transition-all duration-300
          "
        >
          Save
        </button>
      </div>
    </form>
  );
};
