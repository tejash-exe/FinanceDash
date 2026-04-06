import { useContext } from 'react';
import { DashboardContext } from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';

const CompareControls = ({ compareType, setCompareType, periodA, setPeriodA, periodB, setPeriodB, uniqueMonths }) => {
  const { filterOptions } = useContext(DashboardContext);

  const selectStyle = "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer transition-colors w-full sm:w-auto";

  const formatMonth = (yyyy_mm) => {
    if (!yyyy_mm) return '';
    const [year, month] = yyyy_mm.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-colors duration-200">
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium text-sm whitespace-nowrap">
          <FontAwesomeIcon icon={faCodeCompare} /> Compare By:
        </div>
        <select 
          value={compareType} 
          onChange={(e) => setCompareType(e.target.value)} 
          className={selectStyle}
        >
          <option value="year">Years</option>
          <option value="month">Months</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">Period A:</span>
          <select value={periodA} onChange={(e) => setPeriodA(e.target.value)} className={selectStyle}>
            {compareType === 'year' 
              ? filterOptions.years.map(y => <option key={y} value={y}>{y}</option>)
              : uniqueMonths.map(m => <option key={m} value={m}>{formatMonth(m)}</option>)
            }
          </select>
        </div>

        <div className="hidden sm:block text-gray-400 dark:text-gray-600">VS</div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400 whitespace-nowrap">Period B:</span>
          <select value={periodB} onChange={(e) => setPeriodB(e.target.value)} className={selectStyle}>
            {compareType === 'year' 
              ? filterOptions.years.map(y => <option key={y} value={y}>{y}</option>)
              : uniqueMonths.map(m => <option key={m} value={m}>{formatMonth(m)}</option>)
            }
          </select>
        </div>
      </div>
    </div>
  );
};

export default CompareControls;