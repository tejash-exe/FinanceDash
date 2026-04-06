import { useContext } from 'react';
import { DashboardContext } from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarDays, 
  faArrowTrendDown, 
  faCircleInfo, 
  faLightbulb, 
  faCrown, 
  faChartPie 
} from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const HighlightCard = ({ 
  title, 
  totalSpent = 0, 
  chartData = [], 
  maxName = 'N/A', 
  maxAmount = 0, 
  avgValue = 0, 
  avgLabel = 'monthly', 
  formatCurrency 
}) => {
  
  const hasChartData = chartData && chartData.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
    
      <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-700 pb-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>{title}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
      
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <FontAwesomeIcon icon={faArrowTrendDown} className="text-red-500" />
              Total Spent
            </p>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              {formatCurrency(totalSpent)}
            </p>
          </div>
        
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800/30">
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mb-1 truncate flex items-center gap-1">
              <FontAwesomeIcon icon={faCrown} className="text-[8px]" /> Peak: {maxName}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-blue-100">
              {formatCurrency(maxAmount)}
            </p>
          </div>
        </div>

        <div className="h-32 w-full flex items-center justify-center">
          {hasChartData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={25}
                  outerRadius={45}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px', fontWeight: '600', backgroundColor: '#1f2937', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center text-gray-300 dark:text-gray-600">
              <FontAwesomeIcon icon={faChartPie} className="text-2xl mb-1" />
              <span className="text-[10px] uppercase font-bold">No Categories</span>
            </div>
          )}
        </div>
      </div>
    
      <div className="mt-auto bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 flex items-start gap-2 border border-gray-100 dark:border-gray-600/50">
        <FontAwesomeIcon icon={faCircleInfo} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
          Your historical {avgLabel} spend is <span className="text-gray-900 dark:text-white font-bold">{formatCurrency(avgValue)}</span>.
        </p>
      </div>
    </div>
  );
};

const Highlights = () => {
  const { 
    monthlyHighlights = [], 
    yearlyHighlights = [], 
    avgMonthlySpend = 0, 
    avgYearlySpend = 0, 
    baseCurrency 
  } = useContext(DashboardContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: baseCurrency || 'USD',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatLabel = (str) => {
    if (!str) return 'Unknown Period';
    if (str.length === 4) return str;
    try {
      const [year, month] = str.split('-');
      const date = new Date(year, month - 1);
      return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    } catch (e) {
      return str;
    }
  };

  const latestMonth = monthlyHighlights.length > 0 ? monthlyHighlights[0] : null;
  const latestYear = yearlyHighlights.length > 0 ? yearlyHighlights[0] : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <FontAwesomeIcon icon={faLightbulb} className="text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Smart Highlights</h3>
      </div>

     
      {!latestMonth && !latestYear ? (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-full mb-4 text-gray-400">
            <FontAwesomeIcon icon={faChartPie} className="text-3xl" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No spending data yet</h4>
          <p className="text-sm text-gray-500 max-w-xs">
            Add some expense (debit) transactions to unlock smart spending insights and category breakdowns.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {latestMonth && (
            <HighlightCard 
              title={`Month: ${formatLabel(latestMonth.label)}`}
              totalSpent={latestMonth.totalSpent}
              chartData={latestMonth.chartData}
              maxName={latestMonth.maxCategoryName}
              maxAmount={latestMonth.maxCategoryAmount}
              avgValue={avgMonthlySpend}
              avgLabel="monthly"
              formatCurrency={formatCurrency}
            />
          )}
          {latestYear && (
            <HighlightCard 
              title={`Year: ${formatLabel(latestYear.label)}`}
              totalSpent={latestYear.totalSpent}
              chartData={latestYear.chartData}
              maxName={latestYear.maxCategoryName}
              maxAmount={latestYear.maxCategoryAmount}
              avgValue={avgYearlySpend}
              avgLabel="yearly"
              formatCurrency={formatCurrency}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Highlights;