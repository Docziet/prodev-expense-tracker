

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // ISO date
}

export type Category = 'Food' | 'Transport' | 'Health' | 'Bills' | 'Shopping' | 'Other';
