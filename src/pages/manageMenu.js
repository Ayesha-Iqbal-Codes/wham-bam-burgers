import React, { useEffect, useState } from 'react';
import { FaUtensils, FaHamburger, FaPizzaSlice, FaIceCream, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', image: '', category: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageFile, setImageFile] = useState(null); 

  useEffect(() => {
    const savedMenuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    setMenuItems(savedMenuItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const handleAddItem = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setMenuItems([...menuItems, { ...newItem, id: menuItems.length + 1, price: parseFloat(newItem.price), image: e.target.result }]);
      setNewItem({ name: '', description: '', price: '', image: '', category: '' });
      setImageFile(null);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem(item);
    setImageFile(null);
  };

  const handleSaveEdit = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id ? { ...newItem, price: parseFloat(newItem.price), image: e.target.result } : item
      ));
      setNewItem({ name: '', description: '', price: '', image: '', category: '' });
      setEditingItem(null);
      setImageFile(null);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id ? { ...newItem, price: parseFloat(newItem.price) } : item
      ));
      setNewItem({ name: '', description: '', price: '', image: '', category: '' });
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const categories = ['Burgers', 'Value Meals', 'Sides', 'Shakes'];

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Burgers': return <FaHamburger className="mr-2" />;
      case 'Value Meals': return <FaUtensils className="mr-2" />;
      case 'Sides': return <FaPizzaSlice className="mr-2" />;
      case 'Shakes': return <FaIceCream className="mr-2" />;
      default: return <FaUtensils className="mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <FaUtensils className="text-3xl text-amber-700 mr-3" />
          <h1 className="text-3xl font-bold text-amber-900 font-serif">Manage Menu Items</h1>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-amber-100">
          <h3 className="text-xl font-semibold mb-4 text-amber-800 flex items-center">
            <FaPlus className="mr-2" />
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs)</label>
              <input
                type="number"
                placeholder="Item price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                placeholder="Item description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
          <button
            onClick={editingItem ? handleSaveEdit : handleAddItem}
            className={`mt-4 py-2 px-6 rounded-lg font-medium text-white ${
              editingItem ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'
            } transition-colors duration-300 shadow-md`}
          >
            {editingItem ? 'Save Changes' : 'Add Item'}
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleCategoryClick('')}
            className={`flex items-center px-4 py-2 rounded-full ${
              selectedCategory === '' ? 'bg-amber-700 text-white' : 'bg-white text-amber-800'
            } border border-amber-300 shadow-sm hover:shadow-md transition-all`}
          >
            <FaUtensils className="mr-2" />
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex items-center px-4 py-2 rounded-full ${
                selectedCategory === category ? 'bg-amber-700 text-white' : 'bg-white text-amber-800'
              } border border-amber-300 shadow-sm hover:shadow-md transition-all`}
            >
              {getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {categories.map(category => (
          (selectedCategory === '' || selectedCategory === category) && (
            <div key={category} className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-amber-900 flex items-center">
                {getCategoryIcon(category)}
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.filter(item => item.category === category).map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition duration-300">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name || 'Menu Item'} 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-amber-900">{item.name}</h3>
                      <p className="text-gray-600 my-2">{item.description}</p>
                      <p className="text-amber-700 font-bold mb-4">Rs {item.price.toFixed(2)}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                        >
                          <FaTrash className="mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ManageMenu;