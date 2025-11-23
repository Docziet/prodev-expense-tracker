import React, { useMemo, useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { AddExpenseForm } from '../components/AddExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { FilterBar } from '../components/FilterBar';
import { Modal } from '../components/Modal';
import { type Expense } from '../types/expense';
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
    <div className="max-w-6xl mx-auto p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient bg-clip-text text-transparent from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Your Expenses
        </h2>
        <button
          onClick={() => setOpenAdd(true)}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          + Add Expense
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBar
          category={category}
          setCategory={setCategory}
          month={month}
          setMonth={setMonth}
          query={query}
          setQuery={setQuery}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row gap-4 items-center justify-between transition-colors duration-300"
          dropdownClassName="border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          searchInputClassName="border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 w-full sm:w-64"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Expense List */}
        <div className="md:col-span-2 space-y-5">
          <ExpenseList
            list={filtered}
            onEdit={(e) => { setEditing(e); setOpenAdd(true); }}
            onDelete={(id) => deleteExpense(id)}
            className="space-y-4"
            itemClassName="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
            titleClassName="font-semibold text-lg text-slate-900 dark:text-slate-100"
            categoryClassName="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100 rounded-full"
            dateClassName="text-sm text-gray-400 dark:text-gray-300"
            amountClassName="text-indigo-600 dark:text-indigo-400 font-bold text-lg"
          />
        </div>

        {/* Sidebar Total */}
        <aside className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center transition-all duration-300">
          <div className="text-sm text-gray-500 dark:text-gray-300 font-medium">Total (selected month)</div>
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
            ₦{totalForMonth(month || undefined).toLocaleString()}
          </div>
        </aside>
      </div>

      {/* Modal for Add/Edit */}
      <Modal
        open={openAdd}
        onClose={() => { setOpenAdd(false); setEditing(null); }}
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-lg mx-auto transition-all duration-300"
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
          {editing ? 'Edit Expense' : 'Add Expense'}
        </h3>
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
