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
    <form onSubmit={submit} className="space-y-5 animate-fade-in">

      {/* Title */}
      <div className="relative">
        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter expense title"
          className="w-full rounded-2xl px-4 py-3 border border-gray-300 dark:border-slate-600
                     bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                     shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400
                     dark:focus:ring-indigo-500 transition-all duration-300"
        />
      </div>

      {/* Amount */}
      <div className="relative">
        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="₦0"
          className="w-full rounded-2xl px-4 py-3 border border-gray-300 dark:border-slate-600
                     bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                     shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400
                     dark:focus:ring-indigo-500 transition-all duration-300"
        />
      </div>

      {/* Category */}
      <div className="relative">
        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full rounded-2xl px-4 py-3 border border-gray-300 dark:border-slate-600
                     bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                     shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400
                     dark:focus:ring-indigo-500 transition-all duration-300 cursor-pointer"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Date */}
      <div className="relative">
        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Date</label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="w-full rounded-2xl px-4 py-3 border border-gray-300 dark:border-slate-600
                     bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                     shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400
                     dark:focus:ring-indigo-500 transition-all duration-300"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end mt-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-2xl border border-gray-300 dark:border-slate-600
                       text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600
                       transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500
                     hover:from-indigo-600 hover:to-purple-600 text-white font-semibold
                     shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Save
        </button>
      </div>
    </form>
  );
};
