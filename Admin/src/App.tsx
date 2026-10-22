import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as Sonner } from '../src/components/ui/sonner';
import { TooltipProvider } from '../src/components/ui/tooltip';
import { Toaster } from '../src/components/ui/toaster';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import Requests from './pages/Requests';
import Products from './pages/AddProduct';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Help } from './pages/Help';
import { BuyerHelp } from './pages/Buyer Dashboard/BuyerHelp';
import Menu from './components/menu/Menu';
import ToasterProvider from './components/ToasterProvider';
import SoldProducts from './pages/SoldProducts';
import BuyerProducts from './pages/Buyer Dashboard/BuyerProducts';
import History from './pages/Buyer Dashboard/History';
import BuyerAnalytics from './pages/Buyer Dashboard/BuyerAnalytics';
// import { BuyerProfile } from './pages/Buyer Dashboard/BuyerProfile';
import BuyerDashboard from './pages/Buyer Dashboard/BuyerDashboard';
import { Farmers } from './pages/Admin/Farmers';
import Buyers from './pages/Admin/Buyers';
import { Issues } from './pages/Admin/Issues';
import { Helpdesk } from './pages/Helpdesk';
import { AdminAnalytics } from './pages/Admin/AdminAnalytics';
import { AdminProfile } from './pages/Admin/AdminProfile';
import Helper from './components/Helper';
import ManageProducts from "./pages/ManageProdcut";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ToasterProvider />
        <ScrollRestoration />

        {/* Toastify container for global toasts */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Navbar */}
        {!isLoginPage && (
          <div className="fixed top-0 left-0 w-full z-50 bg-[#FBF9F5] border-b border-[#E8E4DA] shadow-soft-xs">
            <Navbar />
          </div>
        )}

        <div className="min-h-screen bg-[#FBF9F5] w-full max-w-full overflow-x-hidden">
          {/* Sidebar */}
          {!isLoginPage && (
            <aside className="hidden lg:block fixed left-0 top-16 w-[260px] bg-[#FAF8F3] border-r border-[#E8E4DA] px-3 py-4 h-[calc(100vh-4rem)] overflow-y-auto z-40">
              <Menu />
            </aside>
          )}

          {/* Main Content */}
          <main
            className={`min-h-screen bg-[#FBF9F5] font-sans antialiased text-[#1A261D] transition-all ${
              !isLoginPage ? 'lg:pl-[260px] pt-16' : ''
            }`}
          >
            <div className="w-full max-w-full min-w-0 px-4 sm:px-6 lg:px-8 py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Login /> },
      { path: ':role/:token', element: <Helper /> },

      { path: '/home', element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/manageProduct', element: <ManageProducts /> },
      { path: '/sold-products', element: <SoldProducts /> },
      { path: '/analytics', element: <Analytics /> },
      { path: '/view-products', element: <Products /> },
      { path: '/requests', element: <Requests /> },
      { path: '/help', element: <Help /> },
      { path: '/buyer-products', element: <BuyerProducts /> },
      { path: '/history', element: <History /> },
      { path: '/buyer-analytics', element: <BuyerAnalytics /> },
      // { path: '/buyer-profile', element: <BuyerProfile /> },
      { path: '/buyer-dashboard', element: <BuyerDashboard /> },
      { path: '/buyer-help', element: <BuyerHelp /> },
      { path: '/farmers', element: <Farmers /> },
      { path: '/buyers', element: <Buyers /> },
      { path: '/issues', element: <Issues /> },
      { path: '/help-desk', element: <Helpdesk /> },
      { path: '/admin-analytics', element: <AdminAnalytics /> },
      { path: '/admin-profile', element: <AdminProfile /> },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
