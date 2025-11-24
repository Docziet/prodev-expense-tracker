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

  // Filtered list based on category, month, and search query
  const filtered = useMemo(() => {
    let list = expenses;
    if (category !== 'All') list = list.filter(e => e.category === category);
    if (month) list = list.filter(e => dayjs(e.date).format('YYYY-MM') === month);
    if (query.trim()) list = list.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));
    return list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [expenses, category, month, query]);

  // Open modal for adding a new expense
  const handleAdd = () => {
    setEditing(null);
    setOpenAdd(true);
  };

  // Open modal for editing an existing expense
  const handleEdit = (expense: Expense) => {
    setEditing(expense);
    setOpenAdd(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent 
                      bg-gradient-to-r from-indigo-600 to-purple-600
                      dark:from-indigo-400 dark:to-purple-400">
          Your Expenses
        </h2>
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 
                     hover:from-indigo-600 hover:to-purple-600 
                     text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl
                     transform hover:-translate-y-1 transition-all duration-300"
        >
          + Add Expense
        </button>
      </div>

      {/* Filters */}
      <FilterBar
        category={category}
        setCategory={setCategory}
        month={month}
        setMonth={setMonth}
        query={query}
        setQuery={setQuery}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-5 flex flex-col sm:flex-row 
                   gap-4 items-center justify-between transition-colors duration-300 animate-fade-in"
        dropdownClassName="border border-gray-300 dark:border-slate-600 rounded-xl px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
                           bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 
                           hover:shadow-md transition-shadow duration-300"
        searchInputClassName="border border-gray-300 dark:border-slate-600 rounded-xl px-3 py-2
                              focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
                              bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 w-full sm:w-64
                              hover:shadow-md transition-shadow duration-300"
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Expense List */}
        <div className="md:col-span-2 space-y-5">
          <ExpenseList
            list={filtered}
            onEdit={handleEdit}
            onDelete={(id) => deleteExpense(id)}
            className="space-y-4 animate-fade-in"
          />
        </div>

        {/* Sidebar Total */}
        <aside className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900
                           p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center
                           transition-all duration-300 animate-slide-up">
          <div className="text-sm text-gray-500 dark:text-gray-300 font-medium tracking-wide">Total (selected month)</div>
          <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
            ₦{totalForMonth(month || undefined).toLocaleString()}
          </div>
        </aside>
      </div>

      {/* Modal for Add/Edit Expense */}
      <Modal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
          {editing ? 'Edit Expense' : 'Add Expense'}
        </h3>
        <AddExpenseForm
          initial={editing ?? undefined}
          onCancel={() => setOpenAdd(false)}
          onSave={(data) => {
            if ((data as Expense).id) {
              updateExpense((data as Expense).id, data as Expense);
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
