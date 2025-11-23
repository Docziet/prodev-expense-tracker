import React, { useMemo, useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { AddExpenseForm } from '../components/AddExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { FilterBar } from '../components/FilterBar';
import { Modal } from '../components/Modal';
import { Expense } from '../types/expense';
import dayjs from 'dayjs';

export const Home: React.FC = () => {
  const { expenses, addExpense, updateExpense, deleteExpense, totalForMonth } = useExpenses();
  const [openAdd, setOpenAdd] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);

  const [category, setCategory] = useState<string>('All');
  const [month, setMonth] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const filtered = useMemo(() => {
    let list = expenses;
    if (category !== 'All') list = list.filter(e => e.category === category);
    if (month) list = list.filter(e => dayjs(e.date).format('YYYY-MM') === month);
    if (query.trim()) list = list.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));
    return list.sort((a,b) => +new Date(b.date) - +new Date(a.date));
  }, [expenses, category, month, query]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Your expenses</h2>
        <div>
          <button onClick={() => setOpenAdd(true)} className="px-3 py-1 bg-sky-600 text-white rounded">+ Add Expense</button>
        </div>
      </div>

      <FilterBar category={category} setCategory={setCategory} month={month} setMonth={setMonth} query={query} setQuery={setQuery} />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ExpenseList list={filtered} onEdit={(e) => { setEditing(e); setOpenAdd(true); }} onDelete={(id) => deleteExpense(id)} />
        </div>
        <aside className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm">
          <div className="text-sm text-slate-500 dark:text-slate-300">Total (selected month)</div>
          <div className="text-2xl font-semibold mt-2">₦{totalForMonth(month || undefined).toLocaleString()}</div>
        </aside>
      </div>

      <Modal open={openAdd} onClose={() => { setOpenAdd(false); setEditing(null); }}>
        <h3 className="text-lg font-semibold mb-2">{editing ? 'Edit Expense' : 'Add Expense'}</h3>
        <AddExpenseForm
          initial={editing ?? undefined}
          onCancel={() => { setOpenAdd(false); setEditing(null); }}
          onSave={(data) => {
            if ((data as Expense).id) {
              const d = data as Expense;
              updateExpense(d.id, d);
            } else {
              addExpense(data as Omit<Expense, 'id'>);
            }
            setOpenAdd(false);
            setEditing(null);
          }}
        />
      </Modal>
    </div>
  );
};
