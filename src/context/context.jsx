import { createContext, useState, useEffect, useMemo } from 'react';

export const DashboardContext = createContext();

const getStoredState = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const defaultTransactions = [
  // --- 2022 TRANSACTIONS ---
  { id: 'tx_2022_01', date: '2022-01-01', time: '09:00:00', amount: 2800, category: 'Salary', type: 'credit', from: 'Tech Corp', to: 'Checking', description: 'January Salary', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_02', date: '2022-01-05', time: '10:15:00', amount: 1100, category: 'Housing', type: 'debit', from: 'Checking', to: 'Property Mgmt', description: 'January Rent', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_03', date: '2022-02-14', time: '19:30:00', amount: 120, category: 'Dining', type: 'debit', from: 'Credit Card', to: 'Bistro 42', description: 'Valentine\'s Dinner', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_04', date: '2022-03-10', time: '14:20:00', amount: 65, category: 'Utilities', type: 'debit', from: 'Checking', to: 'City Water', description: 'Water Bill', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_05', date: '2022-05-22', time: '08:45:00', amount: 450, category: 'Travel', type: 'debit', from: 'Credit Card', to: 'Delta Airlines', description: 'Flight to NY', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_06', date: '2022-06-01', time: '09:00:00', amount: 2800, category: 'Salary', type: 'credit', from: 'Tech Corp', to: 'Checking', description: 'June Salary', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_07', date: '2022-07-18', time: '16:00:00', amount: 200, category: 'Groceries', type: 'debit', from: 'Credit Card', to: 'Whole Foods', description: 'Weekly Groceries', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_08', date: '2022-08-30', time: '11:10:00', amount: 75, category: 'Healthcare', type: 'debit', from: 'Checking', to: 'City Clinic', description: 'Dental Cleaning', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_09', date: '2022-11-25', time: '10:05:00', amount: 350, category: 'Shopping', type: 'debit', from: 'Credit Card', to: 'Best Buy', description: 'Black Friday Electronics', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_10', date: '2022-12-15', time: '09:00:00', amount: 1500, category: 'Bonus', type: 'credit', from: 'Tech Corp', to: 'Checking', description: 'Year-End Bonus', status: 'completed', currency: 'USD' },
  { id: 'tx_2022_11', date: '2022-12-22', time: '18:00:00', amount: 400, category: 'Gifts', type: 'debit', from: 'Credit Card', to: 'Amazon', description: 'Holiday Gifts', status: 'completed', currency: 'USD' },

  // --- 2023 TRANSACTIONS ---
  { id: 'tx_2023_01', date: '2023-01-01', time: '09:00:00', amount: 3000, category: 'Salary', type: 'credit', from: 'Tech Corp', to: 'Checking', description: 'January Salary (Raise)', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_02', date: '2023-01-05', time: '10:00:00', amount: 1200, category: 'Housing', type: 'debit', from: 'Checking', to: 'Property Mgmt', description: 'January Rent', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_03', date: '2023-02-28', time: '08:30:00', amount: 60, category: 'Transport', type: 'debit', from: 'Checking', to: 'Metro Card', description: 'Monthly Transit Pass', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_04', date: '2023-04-15', time: '12:00:00', amount: 250, category: 'Investments', type: 'debit', from: 'Checking', to: 'Vanguard', description: 'Index Fund Deposit', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_05', date: '2023-06-10', time: '20:00:00', amount: 180, category: 'Entertainment', type: 'debit', from: 'Credit Card', to: 'Ticketmaster', description: 'Concert Tickets', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_06', date: '2023-07-01', time: '09:00:00', amount: 3000, category: 'Salary', type: 'credit', from: 'Tech Corp', to: 'Checking', description: 'July Salary', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_07', date: '2023-08-05', time: '10:00:00', amount: 1200, category: 'Housing', type: 'debit', from: 'Checking', to: 'Property Mgmt', description: 'August Rent', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_08', date: '2023-09-12', time: '17:45:00', amount: 210, category: 'Groceries', type: 'debit', from: 'Credit Card', to: 'Trader Joe\'s', description: 'Groceries', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_09', date: '2023-10-01', time: '09:00:00', amount: 3000, category: 'Salary', type: 'credit', from: 'Tech Corp', to: 'Checking', description: 'October Salary', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_10', date: '2023-10-22', time: '14:00:00', amount: 85, category: 'Utilities', type: 'debit', from: 'Checking', to: 'Electric Co', description: 'Electric Bill', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_11', date: '2023-11-15', time: '09:30:00', amount: 450, category: 'Transport', type: 'debit', from: 'Credit Card', to: 'Auto Shop', description: 'Car Maintenance', status: 'completed', currency: 'USD' },
  { id: 'tx_2023_12', date: '2023-12-05', time: '10:00:00', amount: 1200, category: 'Housing', type: 'debit', from: 'Checking', to: 'Property Mgmt', description: 'December Rent', status: 'completed', currency: 'USD' },

  // --- 2024 TRANSACTIONS ---
  { id: 'tx_2024_01', date: '2024-01-01', time: '09:00:00', amount: 3500, category: 'Salary', type: 'credit', from: 'Global Systems', to: 'Checking', description: 'January Salary (New Job)', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_02', date: '2024-01-05', time: '10:00:00', amount: 1500, category: 'Housing', type: 'debit', from: 'Checking', to: 'Chase Bank', description: 'Mortgage Payment', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_03', date: '2024-01-20', time: '15:30:00', amount: 800, category: 'Shopping', type: 'debit', from: 'Credit Card', to: 'IKEA', description: 'New Living Room Furniture', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_04', date: '2024-02-14', time: '20:00:00', amount: 150, category: 'Dining', type: 'debit', from: 'Credit Card', to: 'Steakhouse', description: 'Anniversary Dinner', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_05', date: '2024-03-01', time: '09:00:00', amount: 3500, category: 'Salary', type: 'credit', from: 'Global Systems', to: 'Checking', description: 'March Salary', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_06', date: '2024-04-10', time: '09:00:00', amount: 500, category: 'Investments', type: 'debit', from: 'Checking', to: 'Fidelity', description: 'Monthly IRA Transfer', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_07', date: '2024-05-05', time: '10:00:00', amount: 1500, category: 'Housing', type: 'debit', from: 'Checking', to: 'Chase Bank', description: 'Mortgage Payment', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_08', date: '2024-06-15', time: '11:00:00', amount: 95, category: 'Utilities', type: 'debit', from: 'Checking', to: 'Telecom Inc', description: 'Internet Bill', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_09', date: '2024-07-22', time: '08:00:00', amount: 850, category: 'Travel', type: 'debit', from: 'Credit Card', to: 'Airbnb', description: 'Summer Vacation Rental', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_10', date: '2024-08-30', time: '14:20:00', amount: 300, category: 'Education', type: 'debit', from: 'Checking', to: 'Coursera', description: 'Online Dev Course', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_11', date: '2024-09-01', time: '09:00:00', amount: 3500, category: 'Salary', type: 'credit', from: 'Global Systems', to: 'Checking', description: 'September Salary', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_12', date: '2024-10-15', time: '18:30:00', amount: 220, category: 'Groceries', type: 'debit', from: 'Credit Card', to: 'Whole Foods', description: 'Groceries', status: 'completed', currency: 'USD' },
  { id: 'tx_2024_13', date: '2024-10-28', time: '08:00:00', amount: 15, category: 'Subscription', type: 'debit', from: 'Credit Card', to: 'Netflix', description: 'Monthly Streaming', status: 'pending', currency: 'USD' }
];

export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => getStoredState('dash_transactions', defaultTransactions));
  const [role, setRole] = useState(() => getStoredState('dash_role', 'viewer'));
  const [theme, setTheme] = useState(() => getStoredState('dash_theme', 'light'));
  const [baseCurrency, setBaseCurrency] = useState(() => getStoredState('dash_currency', 'USD'));

  const [filters, setFilters] = useState(() => getStoredState('dash_filters', { 
    type: 'all', category: 'all', month: 'all', year: 'all' 
  }));
  const [sortConfig, setSortConfig] = useState(() => getStoredState('dash_sort', { 
    key: 'date', order: 'desc' 
  }));

  useEffect(() => localStorage.setItem('dash_transactions', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('dash_role', JSON.stringify(role)), [role]);
  useEffect(() => localStorage.setItem('dash_theme', JSON.stringify(theme)), [theme]);
  useEffect(() => localStorage.setItem('dash_currency', JSON.stringify(baseCurrency)), [baseCurrency]);
  useEffect(() => localStorage.setItem('dash_filters', JSON.stringify(filters)), [filters]);
  useEffect(() => localStorage.setItem('dash_sort', JSON.stringify(sortConfig)), [sortConfig]);

  const filterOptions = useMemo(() => {
    const categories = new Set();
    const years = new Set();
    const months = new Set();

    transactions.forEach(tx => {
      if (tx.category) categories.add(tx.category);
      if (tx.date) {
        const [year, month] = tx.date.split('-'); 
        if (year) years.add(year);
        if (month) months.add(month);
      }
    });

    return {
      categories: [...categories].sort(),
      years: [...years].sort((a, b) => b - a), 
      months: [...months].sort() 
    };
  }, [transactions]);

  const observedTransactions = useMemo(() => {
    let processed = [...transactions];

    if (filters.type !== 'all') {
      processed = processed.filter(tx => tx.type === filters.type);
    }
    if (filters.category !== 'all') {
      processed = processed.filter(tx => tx.category === filters.category);
    }
    if (filters.year !== 'all') {
      processed = processed.filter(tx => tx.date.startsWith(filters.year));
    }
    if (filters.month !== 'all') {
      processed = processed.filter(tx => {
        const [, txMonth] = tx.date.split('-');
        return txMonth === filters.month;
      });
    }

    processed.sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();
        return sortConfig.order === 'desc' ? dateB - dateA : dateA - dateB;
      } 
      if (sortConfig.key === 'amount') {
        return sortConfig.order === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
      return 0;
    });

    return processed;
  }, [transactions, filters, sortConfig]);

  const derivedData = useMemo(() => {
    let totalDebitSum = 0;
    let monthlyCategoryData = {}; 
    let yearlyCategoryData = {}; 
    const uniqueMonths = new Set();
    const uniqueYears = new Set();

    observedTransactions.forEach((tx) => {
      const amount = Number(tx.amount) || 0;
      const dateObj = new Date(tx.date);
      const year = dateObj.getFullYear().toString();
      const monthKey = `${year}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`; 

      if (tx.type === 'debit') {
        uniqueMonths.add(monthKey);
        uniqueYears.add(year);
        totalDebitSum += amount;

        if (!monthlyCategoryData[monthKey]) monthlyCategoryData[monthKey] = { total: 0, categories: {} };
        monthlyCategoryData[monthKey].total += amount;
        monthlyCategoryData[monthKey].categories[tx.category] = (monthlyCategoryData[monthKey].categories[tx.category] || 0) + amount;
          
        if (!yearlyCategoryData[year]) yearlyCategoryData[year] = { total: 0, categories: {} };
        yearlyCategoryData[year].total += amount;
        yearlyCategoryData[year].categories[tx.category] = (yearlyCategoryData[year].categories[tx.category] || 0) + amount;
      }
    });

    const avgMonthlySpend = totalDebitSum / (uniqueMonths.size || 1);
    const avgYearlySpend = totalDebitSum / (uniqueYears.size || 1);

    const monthlyHighlights = Object.entries(monthlyCategoryData).map(([month, data]) => {
      const chartArray = Object.entries(data.categories).map(([name, value]) => ({ name, value }));
      const maxCategory = chartArray.reduce((prev, curr) => (curr.value > prev.value ? curr : prev), { name: 'N/A', value: 0 });

      return {
        label: month,
        totalSpent: data.total,
        chartData: chartArray,
        maxCategoryName: maxCategory.name,
        maxCategoryAmount: maxCategory.value
      };
    }).sort((a, b) => b.label.localeCompare(a.label));

    const yearlyHighlights = Object.entries(yearlyCategoryData).map(([year, data]) => {
      const chartArray = Object.entries(data.categories).map(([name, value]) => ({ name, value }));
      const maxCategory = chartArray.reduce((prev, curr) => (curr.value > prev.value ? curr : prev), { name: 'N/A', value: 0 });

      return {
        label: year, 
        totalSpent: data.total,
        chartData: chartArray,
        maxCategoryName: maxCategory.name,
        maxCategoryAmount: maxCategory.value
      };
    }).sort((a, b) => b.label.localeCompare(a.label));

    return { avgMonthlySpend, avgYearlySpend, monthlyHighlights, yearlyHighlights };
  }, [observedTransactions]);

  return (
    <DashboardContext.Provider value={{ ...derivedData, transactions, setTransactions, role, setRole, theme, setTheme, baseCurrency, setBaseCurrency, observedTransactions, filters, setFilters, sortConfig, setSortConfig, filterOptions }}>
      {children}
    </DashboardContext.Provider>
  );
};