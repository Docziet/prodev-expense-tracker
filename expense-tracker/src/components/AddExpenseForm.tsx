import React, { useEffect, useState } from 'react';
import { Category, Expense } from '../types/expense';
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
    // reset if creating
    if (!initial) {
      setTitle('');
      setAmount('');
      setCategory('Other');
      setDate(dayjs().format('YYYY-MM-DD'));
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2 bg-white dark:bg-slate-700" />
      </div>
      <div>
        <label className="block text-sm">Amount</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="w-full border rounded p-2 bg-white dark:bg-slate-700" />
      </div>
      <div>
        <label className="block text-sm">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="w-full border rounded p-2 bg-white dark:bg-slate-700">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm">Date</label>
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full border rounded p-2 bg-white dark:bg-slate-700" />
      </div>
      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" onClick={onCancel} className="px-3 py-1 rounded border">Cancel</button>}
        <button type="submit" className="px-3 py-1 rounded bg-sky-600 text-white">Save</button>
      </div>
    </form>
  );
};
