import { useState, useRef, useContext } from 'react';
import Navbar from '../components/Navbar';
import Highlights from '../components/Highlights';
import SortAndFilter from '../components/SortAndFilter';
import Table from '../components/Tableview';
import AddTransaction from '../components/AddTransaction';
import { DashboardContext } from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faTriangleExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { transactions, setTransactions } = useContext(DashboardContext);
  const [editingTx, setEditingTx] = useState(null);
  const [txToDelete, setTxToDelete] = useState(null); 
  const formRef = useRef(null); 

  const handleEditRequest = (tx) => {
    setEditingTx(tx);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const confirmDelete = () => {
    if (txToDelete) {
      setTransactions(transactions.filter(t => t.id !== txToDelete.id));
      setTxToDelete(null);
      if (editingTx?.id === txToDelete.id) setEditingTx(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        <section>
          <Highlights />
        </section>

        <section ref={formRef} className="scroll-mt-24"> 
           <AddTransaction 
             editingTx={editingTx} 
             clearEdit={() => setEditingTx(null)} 
           />
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faListUl} className="text-blue-600 dark:text-blue-400 text-lg" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Transaction History
            </h2>
          </div>
          
          <SortAndFilter />
          
          <Table 
            onEdit={handleEditRequest} 
            onDeleteRequest={(tx) => setTxToDelete(tx)} 
          />
        </section>
      </main>

      {txToDelete && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
              <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-600 dark:text-red-500 text-xl" />
            </div>
            
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
              Delete Transaction?
            </h3>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-800 dark:text-gray-200">"{txToDelete.description}"</span>? 
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button onClick={() => setTxToDelete(null)} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                Cancel
              </button>

              <button onClick={confirmDelete} className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer" >
                <FontAwesomeIcon icon={faTrash} />
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;