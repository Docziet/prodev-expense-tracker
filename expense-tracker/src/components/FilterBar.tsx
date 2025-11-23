import React from 'react';
import { type Category } from '../types/expense';
import dayjs from 'dayjs';

type Props = {
  category: string;
  setCategory: (c: string) => void;
  month: string;
  setMonth: (m: string) => void;
  query: string;
  setQuery: (q: string) => void;
};

const CATS: (Category | 'All')[] = ['All', 'Food', 'Transport', 'Health', 'Bills', 'Shopping', 'Other'];

export const FilterBar: React.FC<Props> = ({ category, setCategory, month, setMonth, query, setQuery }) => {
  // generate this month options (6 months back to next)
  const months = Array.from({ length: 12 }).map((_, i) => dayjs().subtract(i, 'month').format('YYYY-MM')).reverse();

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="flex gap-2 items-center">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2 bg-white dark:bg-slate-700">
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="border rounded p-2 bg-white dark:bg-slate-700">
          <option value="">All months</option>
          {months.map(m => <option key={m} value={m}>{dayjs(m).format('MMM YYYY')}</option>)}
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title" className="border rounded p-2 bg-white dark:bg-slate-700" />
      </div>
    </div>
  );
};
