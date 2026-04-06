import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTriangleExclamation, 
  faChartLine, 
  faScaleBalanced 
} from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-200">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">

          <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-20">
            <div className="w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <FontAwesomeIcon icon={faTriangleExclamation} className="text-8xl text-blue-600 dark:text-blue-500 relative z-10" />

        </div>

        <div className="space-y-3">
          <h1 className="text-6xl font-black text-gray-900 dark:text-white">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Page Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400">The financial records you're looking for don't exist or have been moved to a different vault.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/dashboard" className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95">
            <FontAwesomeIcon icon={faChartLine} />
            Go to Dashboard
          </Link>

          <Link to="/compare" className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95 shadow-sm">
            <FontAwesomeIcon icon={faScaleBalanced} />
            Compare Data
          </Link>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest pt-8">
          FinanceDash Security Protocol
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;