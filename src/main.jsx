import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { DashboardProvider } from './context/context.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ComparePage from './pages/ComparePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Compare",
    element: <ComparePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <DashboardProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </DashboardProvider>
)