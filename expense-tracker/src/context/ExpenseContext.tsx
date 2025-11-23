import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Expense } from '../types/expense';
import { loadExpenses, saveExpenses } from '../utils/storage';
import { sampleExpenses } from '../data/sampleExpenses';
import dayjs from 'dayjs';

type ContextType = {
  expenses: Expense[];
  addExpense: (e: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, data: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  totalForMonth: (monthIso?: string) => number;
};

const ExpenseContext = createContext<ContextType | undefined>(undefined);

export const useExpenses = () => {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpenses must be used within ExpenseProvider');
  return ctx;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const fromStorage = loadExpenses();
    return fromStorage.length ? fromStorage : sampleExpenses;
  });

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (e: Omit<Expense, 'id'>) => {
    const newExpense: Expense = { ...e, id: String(Date.now()) };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, data: Partial<Expense>) => {
    setExpenses(prev => prev.map(x => (x.id === id ? { ...x, ...data } : x)));
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(x => x.id !== id));
  };

  const totalForMonth = (monthIso?: string) => {
    const target = monthIso ?? dayjs().format('YYYY-MM');
    return expenses
      .filter((e) => dayjs(e.date).format('YYYY-MM') === target)
      .reduce((s, x) => s + x.amount, 0);
  };

  const value = useMemo(
    () => ({ expenses, addExpense, updateExpense, deleteExpense, totalForMonth }),
    [expenses]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
