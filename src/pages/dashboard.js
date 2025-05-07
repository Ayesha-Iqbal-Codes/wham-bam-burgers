import React, { useState } from 'react';
import ManageMenu from './manageMenu'; 
import OrdersManagement from './orderManagement'; 
import UpdateOrderStatus from './updateOrderStatus'; 
import profilePic from '../assets/user.png.png'; 
import { Menu, X, Utensils, ListOrdered, Truck, LogOut } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange, isOpen, toggleSidebar }) => (
  <>
    {/* Overlay for mobile */}
    <div
      className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 block' : 'opacity-0 hidden'
      }`}
      onClick={toggleSidebar}
    ></div>

    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 z-50 h-full bg-gradient-to-b from-amber-900 to-amber-800 text-white w-64 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 shadow-xl`}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Mobile close button */}
        <div className="md:hidden flex justify-end mb-6">
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-amber-700 transition-colors duration-200"
          >
            <X size={24} className="text-amber-100" />
          </button>
        </div>

        {/* Profile section */}
        <div className="flex items-center mb-8 px-2 py-3 bg-amber-800/50 rounded-lg border border-amber-700">
          <img
            src={profilePic}
            alt="User Profile"
            className="w-12 h-12 rounded-full border-2 border-amber-300 shadow-md"
          />
          <div className="ml-4">
            <h2 className="text-lg font-bold text-amber-50">Admin User</h2>
            <p className="text-xs text-amber-200">Restaurant Manager</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col space-y-2">
          <button
            onClick={() => { onSectionChange('manageMenu'); toggleSidebar(); }}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === 'manageMenu'
                ? 'bg-amber-700 text-white shadow-inner'
                : 'text-amber-100 hover:bg-amber-800/50'
            }`}
          >
            <Utensils size={20} className="mr-3" />
            <span className="font-medium">Manage Menu</span>
          </button>

          <button
            onClick={() => { onSectionChange('ordersManagement'); toggleSidebar(); }}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === 'ordersManagement'
                ? 'bg-amber-700 text-white shadow-inner'
                : 'text-amber-100 hover:bg-amber-800/50'
            }`}
          >
            <ListOrdered size={20} className="mr-3" />
            <span className="font-medium">View Orders</span>
          </button>

          <button
            onClick={() => { onSectionChange('updateOrderStatus'); toggleSidebar(); }}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === 'updateOrderStatus'
                ? 'bg-amber-700 text-white shadow-inner'
                : 'text-amber-100 hover:bg-amber-800/50'
            }`}
          >
            <Truck size={20} className="mr-1" />
            <span className="font-medium">Update Order Status</span>
          </button>
        </div>

        {/* Logout button */}
        <button className="flex items-center px-4 py-3 rounded-lg text-amber-100 hover:bg-amber-800/50 mt-auto transition-colors duration-200">
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  </>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('manageMenu');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col bg-amber-50">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-amber-800 text-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-amber-700/50 transition-colors duration-200"
        >
          <Menu size={28} />
        </button>
      </div>

      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className={`flex-1 p-6 transition-all duration-300 md:ml-64`}>
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-amber-100">
          {/* Section title */}
          <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
            {activeSection === 'manageMenu' && (
              <>
                <Utensils size={24} className="mr-3 text-amber-600" />
                Menu Management
              </>
            )}
            {activeSection === 'ordersManagement' && (
              <>
                <ListOrdered size={24} className="mr-3 text-amber-600" />
                Order Management
              </>
            )}
            {activeSection === 'updateOrderStatus' && (
              <>
                <Truck size={24} className="mr-3 text-amber-600" />
                Order Status Updates
              </>
            )}
          </h2>

          {/* Content */}
          {activeSection === 'manageMenu' && <ManageMenu />}
          {activeSection === 'ordersManagement' && <OrdersManagement />}
          {activeSection === 'updateOrderStatus' && <UpdateOrderStatus />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;