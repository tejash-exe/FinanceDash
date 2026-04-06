import { useContext } from 'react';
import { DashboardContext } from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';

const monthNames = {
  "01": "January", "02": "February", "03": "March", "04": "April",
  "05": "May", "06": "June", "07": "July", "08": "August",
  "09": "September", "10": "October", "11": "November", "12": "December"
};

const SortAndFilter = () => {
  const { filters, setFilters, sortConfig, setSortConfig, filterOptions } = useContext(DashboardContext);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    const [key, order] = e.target.value.split('-');
    setSortConfig({ key, order });
  };

  const selectStyle = "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer transition-colors";

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6 transition-colors duration-200">
      
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium text-sm">
          <FontAwesomeIcon icon={faFilter} /> Filters:
        </div>
        
        <select name="type" value={filters.type} onChange={handleFilterChange} className={selectStyle}>
          <option value="all">All Types</option>
          <option value="credit">Credits (Income)</option>
          <option value="debit">Debits (Expenses)</option>
        </select>

        <select name="category" value={filters.category} onChange={handleFilterChange} className={selectStyle}>
          <option value="all">All Categories</option>
          {filterOptions.categories.map(cat => (
             <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select name="year" value={filters.year} onChange={handleFilterChange} className={selectStyle}>
          <option value="all">All Years</option>
          {filterOptions.years.map(year => (
             <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select name="month" value={filters.month} onChange={handleFilterChange} className={selectStyle}>
          <option value="all">All Months</option>
          {filterOptions.months.map(month => (
             <option key={month} value={month}>{monthNames[month] || month}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium text-sm whitespace-nowrap">
          <FontAwesomeIcon icon={faSort} /> Sort By:
        </div>
        
        <select value={`${sortConfig.key}-${sortConfig.order}`} onChange={handleSortChange} className={`${selectStyle} w-full md:w-auto`}>
          <option value="date-desc">Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="amount-desc">Amount (Highest First)</option>
          <option value="amount-asc">Amount (Lowest First)</option>
        </select>
      </div>

    </div>
  );
};

export default SortAndFilter;