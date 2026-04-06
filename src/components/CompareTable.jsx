import { useContext } from 'react';
import { DashboardContext } from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown, faMinus } from '@fortawesome/free-solid-svg-icons';

const CompareTable = ({ data, periodA, periodB }) => {
  const { baseCurrency } = useContext(DashboardContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: baseCurrency || 'USD' }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto transition-colors duration-200">
      <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold border-b border-gray-100 dark:border-gray-700">
          <tr>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4 text-right text-blue-600 dark:text-blue-400">Period A ({periodA})</th>
            <th className="px-6 py-4 text-right text-purple-600 dark:text-purple-400">Period B ({periodB})</th>
            <th className="px-6 py-4 text-right">Difference</th>
            <th className="px-6 py-4 text-center">Trend (A → B)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center text-gray-400">No data to display.</td>
            </tr>
          ) : (
            data.map((row) => {
              const diff = row.periodB_amount - row.periodA_amount;
              let percentChange = 0;
              if (row.periodA_amount > 0) {
                percentChange = ((diff / row.periodA_amount) * 100).toFixed(1);
              } else if (row.periodB_amount > 0) {
                percentChange = 100;
              }

              return (
                <tr key={row.category} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{row.category}</td>
                  <td className="px-6 py-4 text-right font-semibold">{formatCurrency(row.periodA_amount)}</td>
                  <td className="px-6 py-4 text-right font-semibold">{formatCurrency(row.periodB_amount)}</td>
                  <td className={`px-6 py-4 text-right font-medium ${diff > 0 ? 'text-red-500' : diff < 0 ? 'text-green-500' : 'text-gray-500'}`}>
                    {diff > 0 ? '+' : ''}{formatCurrency(diff)}
                    <span className="text-xs ml-1 opacity-75">
                      ({diff > 0 ? '+' : ''}{percentChange}%)
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {diff > 0 ? (
                      <span className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-1.5 rounded-lg"><FontAwesomeIcon icon={faArrowTrendUp} /></span>
                    ) : diff < 0 ? (
                      <span className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-1.5 rounded-lg"><FontAwesomeIcon icon={faArrowTrendDown} /></span>
                    ) : (
                      <span className="bg-gray-50 dark:bg-gray-800 text-gray-500 p-1.5 rounded-lg"><FontAwesomeIcon icon={faMinus} /></span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;