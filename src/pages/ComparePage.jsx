import { useState, useContext, useMemo } from 'react';
import Navbar from '../components/Navbar';
import CompareControls from '../components/CompareControls';
import CompareChart from '../components/CompareChart';
import CompareTable from '../components/CompareTable';
import { DashboardContext } from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

const ComparePage = () => {
  const { transactions, filterOptions } = useContext(DashboardContext);

  const uniqueMonths = useMemo(() => {
    const months = new Set();
    transactions.forEach(tx => {
      if (tx.date) months.add(tx.date.substring(0, 7)); 
    });
    return [...months].sort((a, b) => b.localeCompare(a)); 
  }, [transactions]);

  const [compareType, setCompareType] = useState('year'); 
  
  const [periodA, setPeriodA] = useState(filterOptions.years[0] || '');
  const [periodB, setPeriodB] = useState(filterOptions.years[1] || filterOptions.years[0] || '');

  const handleTypeChange = (type) => {
    setCompareType(type);
    if (type === 'year') {
      setPeriodA(filterOptions.years[0] || '');
      setPeriodB(filterOptions.years[1] || filterOptions.years[0] || '');
    } else {
      setPeriodA(uniqueMonths[0] || '');
      setPeriodB(uniqueMonths[1] || uniqueMonths[0] || '');
    }
  };

  const comparisonData = useMemo(() => {
    if (!periodA || !periodB) return [];

    const categoryMap = {};

    transactions.forEach(tx => {
      if (tx.type !== 'debit') return;

      const isYear = compareType === 'year';
      const txPeriod = isYear ? tx.date.substring(0, 4) : tx.date.substring(0, 7);

      if (txPeriod === periodA || txPeriod === periodB) {
        if (!categoryMap[tx.category]) {
          categoryMap[tx.category] = { category: tx.category, periodA_amount: 0, periodB_amount: 0 };
        }
        if (txPeriod === periodA) categoryMap[tx.category].periodA_amount += tx.amount;
        if (txPeriod === periodB) categoryMap[tx.category].periodB_amount += tx.amount;
      }
    });

    return Object.values(categoryMap).sort((a, b) => b.periodA_amount - a.periodA_amount);
  }, [transactions, compareType, periodA, periodB]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
            <FontAwesomeIcon icon={faScaleBalanced} className="text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Compare Spending</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Analyze your expenses across different time periods.</p>
          </div>
        </div>

        <CompareControls 
          compareType={compareType} 
          setCompareType={handleTypeChange}
          periodA={periodA} 
          setPeriodA={setPeriodA}
          periodB={periodB} 
          setPeriodB={setPeriodB}
          uniqueMonths={uniqueMonths}
        />

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <CompareChart data={comparisonData} periodA={periodA} periodB={periodB} />
          <CompareTable data={comparisonData} periodA={periodA} periodB={periodB} />
        </div>

      </main>
    </div>
  );
};

export default ComparePage;