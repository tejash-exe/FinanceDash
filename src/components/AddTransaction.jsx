import { useState, useContext, useEffect } from 'react';
import { DashboardContext } from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

const defaultFormState = {
  description: '',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  time: new Date().toTimeString().split(' ')[0].slice(0, 5),
  type: 'debit',
  category: '',
  from: '',
  to: '',
  status: 'completed'
};

const AddTransaction = ({ editingTx, clearEdit }) => {
  const { role, transactions, setTransactions, baseCurrency, filterOptions } = useContext(DashboardContext);
  const [formData, setFormData] = useState(defaultFormState);

  useEffect(() => {
    if (editingTx) {
      setFormData(editingTx);
    } else {
      setFormData(defaultFormState);
    }
  }, [editingTx]);

  if (role !== 'admin') return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedData = { 
      ...formData, 
      amount: Number(formData.amount),
      currency: baseCurrency
    };

    if (editingTx) {
      const updatedTransactions = transactions.map(tx => 
        tx.id === editingTx.id ? processedData : tx
      );
      setTransactions(updatedTransactions);
      clearEdit(); 
    } else {
      const newTransaction = { ...processedData, id: `tx_${Date.now()}` };
      setTransactions([newTransaction, ...transactions]);
      setFormData(defaultFormState);
    }
  };

  const inputClass = "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-colors";
  const labelClass = "block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <FontAwesomeIcon icon={editingTx ? faPenToSquare : faPlus} className={editingTx ? "text-yellow-500" : "text-blue-600"} />
          {editingTx ? 'Edit Transaction' : 'Add New Transaction'}
        </h2>
        
        {editingTx && (
          <button onClick={clearEdit} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm flex items-center gap-1 transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faXmark} /> Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Description / Title *</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} required placeholder="e.g. Weekly Groceries" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Amount ({baseCurrency}) *</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required min="0" step="0.01" placeholder="0.00" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className={inputClass}>
              <option value="debit">Debit (Expense)</option>
              <option value="credit">Credit (Income)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Category *</label>
            <input type="text" name="category" list="category-options" value={formData.category} onChange={handleChange} required placeholder="e.g. Housing, Food..." className={inputClass} />
            <datalist id="category-options">
              {filterOptions.categories.map(cat => <option key={cat} value={cat} />)}
            </datalist>
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>From Account/Entity</label>
            <input type="text" name="from" value={formData.from} onChange={handleChange} placeholder="e.g. Checking" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>To Account/Entity</label>
            <input type="text" name="to" value={formData.to} onChange={handleChange} placeholder="e.g. Landlord" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Date *</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Time</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className={`px-6 cursor-pointer py-2.5 rounded-lg text-white font-medium transition-colors flex items-center gap-2 ${editingTx ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            <FontAwesomeIcon icon={editingTx ? faPenToSquare : faPlus} />
            {editingTx ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;