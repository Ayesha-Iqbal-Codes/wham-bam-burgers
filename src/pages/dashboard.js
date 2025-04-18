import React, { useState } from 'react';
import ManageMenu from './manageMenu'; // Import the new component
import OrdersManagement from './orderManagement'; // Import the new component
import UpdateOrderStatus from './updateOrderStatus'; // Import the new component
import profilePic from '../assets/user.png.png'; // Adjust the path to your profile picture file
import { Menu, X } from 'lucide-react'; // Optional icons

// Sidebar Component
const Sidebar = ({ activeSection, onSectionChange, isOpen, toggleSidebar }) => (
  <>
    {/* Overlay for sidebar on mobile */}
    <div
      className={`fixed inset-0 bg-black opacity-50 z-40 md:hidden ${isOpen ? 'block' : 'hidden'}`}
      onClick={toggleSidebar}
    ></div>

    <div
      className={`fixed top-0 left-0 z-50 h-full bg-gradient-to-r from-black via-black-800 to-red-900 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}
    >
      <div className="p-6">
        {/* Close button on mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={toggleSidebar}>
            <X size={28} />
          </button>
        </div>
        <div className="flex items-center mb-6">
          <img
            src={profilePic}
            alt="User Profile"
            className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
          />
          <h1 className="text-3xl font-bold ml-4">Admin Dashboard</h1>
        </div>
        <div className="flex flex-col space-y-4">
          {/* Navigation buttons for different sections */}
          <button
            onClick={() => { onSectionChange('manageMenu'); toggleSidebar(); }}
            className={`px-4 py-2 rounded ${activeSection === 'manageMenu' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'} hover:bg-red-700`}
          >
            Manage Menu
          </button>
          <button
            onClick={() => { onSectionChange('ordersManagement'); toggleSidebar(); }}
            className={`px-4 py-2 rounded ${activeSection === 'ordersManagement' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'} hover:bg-red-700`}
          >
            View Orders
          </button>
          <button
            onClick={() => { onSectionChange('updateOrderStatus'); toggleSidebar(); }}
            className={`px-4 py-2 rounded ${activeSection === 'updateOrderStatus' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'} hover:bg-red-700`}
          >
            Update Order Status
          </button>
        </div>
      </div>
    </div>
  </>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('manageMenu'); // State to track the active section
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar toggle

  // Handler for setting the active section
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-red-900 text-white px-4 py-3 shadow-md">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <button onClick={toggleSidebar}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className={`flex-1 bg-gray-100 p-6 transition-all duration-300 md:ml-64`}>
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Render the active section based on state */}
          {activeSection === 'manageMenu' && <ManageMenu />}
          {activeSection === 'ordersManagement' && <OrdersManagement />}
          {activeSection === 'updateOrderStatus' && <UpdateOrderStatus />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
