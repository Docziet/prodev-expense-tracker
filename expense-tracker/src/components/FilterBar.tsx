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
  const months = Array.from({ length: 12 }).map((_, i) =>
    dayjs().subtract(i, 'month').format('YYYY-MM')
  ).reverse();

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between w-full animate-fade-in">

      {/* Category + Month */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-center w-full md:w-auto">

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            cursor-pointer
            rounded-full
            px-5 py-2
            border border-gray-300 dark:border-slate-600
            bg-white dark:bg-slate-700
            text-slate-900 dark:text-slate-100
            shadow-sm hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
            transition-all duration-300
            hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-slate-700 dark:hover:to-slate-800
          "
        >
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Month Dropdown */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="
            cursor-pointer
            rounded-full
            px-5 py-2
            border border-gray-300 dark:border-slate-600
            bg-white dark:bg-slate-700
            text-slate-900 dark:text-slate-100
            shadow-sm hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
            transition-all duration-300
            hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-slate-700 dark:hover:to-slate-800
          "
        >
          <option value="">All months</option>
          {months.map(m => (
            <option key={m} value={m}>{dayjs(m).format('MMM YYYY')}</option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="w-full md:w-auto">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title"
          className="
            w-full
            rounded-full
            px-5 py-2
            border border-gray-300 dark:border-slate-600
            bg-white dark:bg-slate-700
            text-slate-900 dark:text-slate-100
            shadow-sm hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500
            transition-all duration-300
            hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-slate-700 dark:hover:to-slate-800
          "
        />
      </div>
    </div>
  );
};
