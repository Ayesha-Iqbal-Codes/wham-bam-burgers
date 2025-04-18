import React, { useEffect, useState } from 'react';
import Carousel from '../components/carousel';
import Navbar from '../components/navbar';
import { useCart } from '../context/cartContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cheeseburgerImage from '../assets/pic (6).jpg';
import veggieBurgerImage from '../assets/pic (12).jpg';
import chickenBurgerImage from '../assets/pic (14).jpg';
import chickenMealImage from '../assets/pic (7).jpg';
import beefMealImage from '../assets/pic (2).jpg';
import veggieMealImage from '../assets/pic (13).jpg';
import friesImage from '../assets/pic (4).jpg';
import onionRingsImage from '../assets/pic (0).webp';
import saladImage from '../assets/pic (2).jpg';
import chocolateShakeImage from '../assets/pic (5).jpg';
import vanillaShakeImage from '../assets/pic (11).jpg';
import strawberryShakeImage from '../assets/pic (1).jpg';

const permanentItems = {
  Burgers: [
    { id: 'burger1', name: 'Cheeseburger', description: 'A classic cheeseburger with cheddar cheese, lettuce, and tomato.', price: 599, category: 'Burgers', image: cheeseburgerImage },
    { id: 'burger2', name: 'Veggie Burger', description: 'A plant-based burger with fresh vegetables and special sauce.', price: 649, category: 'Burgers', image: veggieBurgerImage },
    { id: 'burger3', name: 'Chicken Burger', description: 'Juicy chicken patty with pickles and mayo.', price: 699, category: 'Burgers', image: chickenBurgerImage },
  ],
  'Value Meals': [
    { id: 'meal1', name: 'Chicken Meal', description: 'Delicious fried chicken with fries and a drink.', price: 899, category: 'Value Meals', image: chickenMealImage },
    { id: 'meal2', name: 'Beef Meal', description: 'Tender beef steak served with mashed potatoes and gravy.', price: 949, category: 'Value Meals', image: beefMealImage },
    { id: 'meal3', name: 'Veggie Meal', description: 'Healthy vegetable stir-fry with rice and tofu.', price: 799, category: 'Value Meals', image: veggieMealImage },
  ],
  Sides: [
    { id: 'side1', name: 'Fries', description: 'Crispy golden fries.', price: 249, category: 'Sides', image: friesImage },
    { id: 'side2', name: 'Onion Rings', description: 'Crispy onion rings served with dipping sauce.', price: 349, category: 'Sides', image: onionRingsImage },
    { id: 'side3', name: 'Salad', description: 'Fresh mixed greens with a light vinaigrette.', price: 499, category: 'Sides', image: saladImage },
  ],
  Shakes: [
    { id: 'shake1', name: 'Chocolate Shake', description: 'Rich and creamy chocolate milkshake.', price: 399, category: 'Shakes', image: chocolateShakeImage },
    { id: 'shake2', name: 'Vanilla Shake', description: 'Smooth and delicious vanilla milkshake.', price: 349, category: 'Shakes', image: vanillaShakeImage },
    { id: 'shake3', name: 'Strawberry Shake', description: 'Sweet strawberry milkshake made with fresh fruit.', price: 429, category: 'Shakes', image: strawberryShakeImage },
  ]
};

const fetchMenuItems = () => {
  return JSON.parse(localStorage.getItem('menuItems')) || [];
};

const fetchFeaturedItems = () => {
  return JSON.parse(localStorage.getItem('featuredItems')) || [];
};

const CustomerMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setMenuItems(fetchMenuItems());
    setFeaturedItems(fetchFeaturedItems());
  }, []);

  const categories = ['All', 'Burgers', 'Value Meals', 'Sides', 'Shakes'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === 'All' ? '' : category);
  };

  const handleAddToCart = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmAddToCart = () => {
    if (selectedItem) {
      addToCart({ ...selectedItem, quantity });
      toast.success(`${quantity} x ${selectedItem.name} added to cart!`);
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <Navbar />

      <div className="p-4 sm:p-6 container mx-auto">
        <Carousel items={featuredItems} />
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Our Menu</h1>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center mb-6 gap-3 sm:gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                selectedCategory === (category === 'All' ? '' : category)
                  ? 'bg-[#4B2B16] text-white shadow-md scale-105'
                  : 'bg-red-600 text-white hover:bg-[#4B2B16]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {categories.slice(1).map(category => (
          (selectedCategory === '' || selectedCategory === category) && (
            <div key={category} className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...permanentItems[category], ...menuItems.filter(item => item.category === category)].map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <p className="text-green-600 font-bold">Rs {item.price}</p>
                    <div className="flex justify-center mt-4 w-full">
                      <button
                        className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition-transform duration-300 transform hover:scale-105"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add {selectedItem.name} to Cart</h2>
              <div className="mb-4">
                <p className="text-lg font-semibold">Quantity:</p>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleConfirmAddToCart}
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-center" autoClose={2500} />
      </div>
    </div>
  );
};

export default CustomerMenu;
