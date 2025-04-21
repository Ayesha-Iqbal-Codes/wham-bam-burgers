import React, { useEffect, useState } from 'react';

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-6 container mx-auto">
        
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="border p-2 rounded w-full mb-2"
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            onClick={editingItem ? handleSaveEdit : handleAddItem}
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            {editingItem ? 'Save Changes' : 'Add Item'}
          </button>
        </div>

     
        <div className="mb-4">
          <div className="flex flex-wrap justify-start space-x-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`py-2 px-4 rounded ${selectedCategory === category ? 'bg-red-600 text-white' : 'bg-white text-gray-700'} border border-gray-300`}
              >
                {category}
              </button>
            ))}
            <button
              onClick={() => handleCategoryClick('')}
              className={`py-2 px-4 rounded ${selectedCategory === '' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'} border border-gray-300`}
            >
              All Categories
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-6">Manage Menu Items</h1>
        {categories.map(category => (
          (selectedCategory === '' || selectedCategory === category) && (
            <div key={category} className="mb-8">
              <h2 className="text-3xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuItems.filter(item => item.category === category).map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                    {item.image && (
                      <img src={item.image} alt={item.name || 'Menu Item'} className="w-full h-48 object-cover mb-4 rounded" />
                    )}
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <p className="text-green-500 font-bold">Rs {item.price.toFixed(2)}</p> {/* Changed the dollar sign to Rs */}
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
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
