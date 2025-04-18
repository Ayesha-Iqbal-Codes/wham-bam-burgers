import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/login';
import CustomerMenu from './pages/customerMenu';
import CartPage from './pages/cartPage';
import CheckoutPage from './pages/checkoutPage';
import OrderHistoryPage from './pages/orderHistoryPage';
import ManageMenu from './pages/manageMenu';
import OrdersManagement from './pages/orderManagement';
import UpdateOrderStatus from './pages/updateOrderStatus';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/protectedRoute';
import { Navigate } from 'react-router-dom';
import { CartProvider } from './context/cartContext';
import { UserProvider } from './context/userContext'; // Import the UserProvider
import Footer from './components/footer'; // Import the Footer component

const AppContent = () => {
  // Simulate authentication state
  const isAdmin = true; // Replace with actual admin check
  const isLoggedIn = true; // Replace with actual login check
  const location = useLocation();

  // Check if the user is on an admin route or the login route
  const isAdminRoute = location.pathname.startsWith('/dashboard');
  const isLoginPage = location.pathname === '/login'; // Check if it's the login page

  return (
    <div className="flex flex-col min-h-screen"> {/* Ensures the page takes at least the full height */}
      <div className="flex-grow">
        <Routes>
          {/* Main page showing the website content */}
          <Route path="/" element={<CustomerMenu />} /> {/* Main website content */}

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />

          {/* Protected Admin Dashboard route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute 
                element={<Dashboard />} 
                isAdmin={isAdmin} 
                isLoggedIn={isLoggedIn} 
                requiredAdmin={true}
              />
            }
          />

          {/* Admin pages under Dashboard */}
          <Route 
            path="/dashboard/manage-menu" 
            element={
              <ProtectedRoute 
                element={<ManageMenu />} 
                isAdmin={isAdmin} 
                isLoggedIn={isLoggedIn} 
                requiredAdmin={true}
              />
            }
          />
          <Route 
            path="/dashboard/view-orders" 
            element={
              <ProtectedRoute 
                element={<OrdersManagement />} 
                isAdmin={isAdmin} 
                isLoggedIn={isLoggedIn} 
                requiredAdmin={true}
              />
            }
          />
          <Route 
            path="/dashboard/update-order-status" 
            element={
              <ProtectedRoute 
                element={<UpdateOrderStatus />} 
                isAdmin={isAdmin} 
                isLoggedIn={isLoggedIn} 
                requiredAdmin={true}
              />
            }
          />

          {/* Redirect to login if route is not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* Only show footer if not on an admin route or the login page */}
      {!isAdminRoute && !isLoginPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
