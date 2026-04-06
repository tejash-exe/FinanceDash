import { useContext, useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router';
import { DashboardContext } from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTableColumns, faMoon, faSun, faScaleBalanced, faChartLine, faBars, faXmark,
  faCheck, faUser, faUserShield, faChevronDown
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { role, setRole, theme, setTheme } = useContext(DashboardContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const roleMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target)) {
        setIsRoleMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const navBtnClass = ({ isActive }) => `
    flex items-center gap-2 px-4 py-2 md:py-1.5 rounded-lg text-sm font-medium transition-all duration-200
    ${isActive 
      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800' 
      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 border border-transparent'}
  `;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 py-4 sticky top-0 z-30 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-8">
            <div className='flex items-center align-center gap-4'>
            <FontAwesomeIcon icon={faTableColumns} className="text-blue-600 dark:text-blue-400 text-xl group-hover:rotate-12 transition-transform" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Finance<span className="text-blue-600 dark:text-blue-400">Dash</span>
            </h1>
            </div>

          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/dashboard" className={navBtnClass}>
              <FontAwesomeIcon icon={faChartLine} /> Dashboard
            </NavLink>
            <NavLink to="/compare" className={navBtnClass}>
              <FontAwesomeIcon icon={faScaleBalanced} /> Compare
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          
          <div className="relative" ref={roleMenuRef}>
            <button onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer">
              <FontAwesomeIcon icon={role === 'admin' ? faUserShield : faUser} className="text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                {role}
              </span>
              <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] text-gray-400 transition-transform duration-200 ${isRoleMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl pt-2 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Access Level</p>
                
                <button onClick={() => { setRole('viewer'); setIsRoleMenuOpen(false); }} className={`w-full cursor-pointer flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${role === 'viewer' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faUser} className="w-4" />
                    <span className="font-medium">Viewer</span>
                  </div>
                  {role === 'viewer' && <FontAwesomeIcon icon={faCheck} className="text-xs" />}
                </button>

                <button onClick={() => { setRole('admin'); setIsRoleMenuOpen(false); }} className={`w-full cursor-pointer flex items-center justify-between px-4 pt-2.5 pb-4.5 text-sm transition-colors ${role === 'admin' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faUserShield} className="w-4" />
                    <span className="font-medium">Administrator</span>
                  </div>
                  {role === 'admin' && <FontAwesomeIcon icon={faCheck} className="text-xs" />}
                </button>
              </div>
            )}
          </div>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer active:scale-90">
            <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} />
          </button>

          <button className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="text-xl" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={navBtnClass}>
            <FontAwesomeIcon icon={faChartLine} /> Dashboard
          </NavLink>
          <NavLink to="/compare" onClick={() => setIsMobileMenuOpen(false)} className={navBtnClass}>
            <FontAwesomeIcon icon={faScaleBalanced} /> Compare
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;