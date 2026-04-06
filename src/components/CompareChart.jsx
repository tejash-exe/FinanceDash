import { useContext } from 'react';
import { DashboardContext } from '../context/context';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompareChart = ({ data, periodA, periodB }) => {
  const { baseCurrency } = useContext(DashboardContext);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-100 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 shadow-sm h-80 flex items-center justify-center">
        No expense data available for comparison in the selected periods.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Visual Comparison</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
            <XAxis dataKey="category" stroke="#9ca3af" fontSize={12} tickLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}`} />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '8px', border: 'none' }}
              formatter={(value) => [`${value.toLocaleString()} ${baseCurrency}`, '']}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="periodA_amount" name={`Period A (${periodA})`} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="periodB_amount" name={`Period B (${periodB})`} fill="#a855f7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompareChart;