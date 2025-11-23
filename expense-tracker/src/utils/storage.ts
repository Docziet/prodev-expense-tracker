import { Expense } from '../types/expense';

const KEY = 'spendsmart_expenses_v1';

export const loadExpenses = (): Expense[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Expense[];
  } catch {
    return [];
  }
};

export const saveExpenses = (expenses: Expense[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(expenses));
  } catch {
    // ignore
  }
};
