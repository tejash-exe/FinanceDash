import { useContext } from 'react';
import { DashboardContext } from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Tableview = ({ onEdit, onDeleteRequest }) => {
  const { observedTransactions, baseCurrency, role } = useContext(DashboardContext);

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto transition-colors duration-200">
      <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold border-b border-gray-100 dark:border-gray-700 transition-colors">
          <tr>
            <th className="px-6 py-4">Date & Time</th>
            <th className="px-6 py-4">Transaction Details</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4 text-right">Amount</th>
            <th className="px-6 py-4 text-center">Status</th>
            {role === 'admin' && <th className="px-6 py-4 text-center">Actions</th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {observedTransactions && observedTransactions.length > 0 ? (
            observedTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-gray-100">{tx.date}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{tx.time}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-gray-100">{tx.description}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {tx.type === 'credit' ? `From: ${tx.from}` : `To: ${tx.to}`}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {tx.category}
                  </span>
                </td>

                <td className="px-6 py-4 text-right whitespace-nowrap font-semibold">
                  <span className={tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'}>
                    {tx.type === 'credit' ? '+' : '-'}
                    {formatCurrency(tx.amount, tx.currency || baseCurrency)}
                  </span>
                </td>

                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                    tx.status === 'completed'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {tx.status}
                  </span>
                </td>

                {role === 'admin' && (
                  <td className="px-6 py-4 text-center whitespace-nowrap flex justify-center gap-3">
                    <button onClick={() => onEdit(tx)} className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors p-1 cursor-pointer" title="Edit Transaction">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>

                    <button onClick={() => onDeleteRequest(tx)} className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 cursor-pointer" title="Delete Transaction">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={role === 'admin' ? 6 : 5} className="px-6 py-12 text-center text-gray-400 dark:text-gray-500">
                No transactions match your current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tableview;