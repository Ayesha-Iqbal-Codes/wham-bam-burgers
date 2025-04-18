// Dashboard.js

import React, { useState } from 'react';
import ManageMenu from './manageMenu'; // Import the new component
import OrdersManagement from './orderManagement'; // Import the new component
import UpdateOrderStatus from './updateOrderStatus'; // Import the new component
import profilePic from '../assets/user.png.png'; // Adjust the path to your profile picture file

// Sidebar Component
const Sidebar = ({ activeSection, onSectionChange }) => (
  <div className="w-64 bg-gradient-to-r from-black via-black-800 to-red-900 text-white h-full fixed top-0 left-0">
    <div className="p-6">
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
          onClick={() => onSectionChange('manageMenu')}
          className={`px-4 py-2 rounded ${activeSection === 'manageMenu' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'} hover:bg-red-700`}
        >
          Manage Menu
        </button>
        <button
          onClick={() => onSectionChange('ordersManagement')}
          className={`px-4 py-2 rounded ${activeSection === 'ordersManagement' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'} hover:bg-red-700`}
        >
          View Orders
        </button>
        <button
          onClick={() => onSectionChange('updateOrderStatus')}
          className={`px-4 py-2 rounded ${activeSection === 'updateOrderStatus' ? 'bg-black text-white' : 'bg-gray-800 text-gray-300'} hover:bg-red-700`}
        >
          Update Order Status
        </button>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('manageMenu'); // State to track the active section

  // Handler for setting the active section
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Render the active section based on state */}
          <div>
            {activeSection === 'manageMenu' && <ManageMenu />}
            {activeSection === 'ordersManagement' && <OrdersManagement />}
            {activeSection === 'updateOrderStatus' && <UpdateOrderStatus />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
