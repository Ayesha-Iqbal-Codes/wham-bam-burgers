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
import saladImage from '../assets/salad.jpg';
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
    if (selectedItem && quantity >= 1) {
      addToCart({ ...selectedItem, quantity });
      toast.success(`${quantity} x ${selectedItem.name} added to cart!`);
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar />

      <div className="p-4 sm:p-6 container mx-auto">
        <div className="mb-8">
          <Carousel items={featuredItems} />
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-amber-900 font-serif">Our Delicious Menu</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Handcrafted with the finest ingredients for an unforgettable taste experience
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center mb-10 gap-2 sm:gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-5 py-3 rounded-full font-bold transition-all duration-300 text-sm sm:text-base 
                ${
                  selectedCategory === (category === 'All' ? '' : category)
                    ? 'bg-amber-700 text-white shadow-lg scale-105 ring-2 ring-amber-400'
                    : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-md'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {categories.slice(1).map(category => (
          (selectedCategory === '' || selectedCategory === category) && (
            <div key={category} className="mb-16">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 font-serif">{category}</h2>
                <div className="ml-4 flex-1 h-0.5 bg-amber-200"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...permanentItems[category], ...menuItems.filter(item => item.category === category)].map(item => (
                  <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                    <div className="relative overflow-hidden h-60">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Rs {item.price}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-2 text-amber-900">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <button
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
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
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-4 border-amber-500">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-amber-900">Add to Order</h2>
                <button 
                  onClick={() => {
                    setSelectedItem(null);
                    setQuantity(1);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-amber-900">{selectedItem.name}</h3>
                    <p className="text-amber-700 font-semibold">Rs {selectedItem.price}</p>
                  </div>
                </div>
                
                <label className="block text-lg font-semibold mb-2 text-amber-900">Quantity:</label>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="bg-amber-100 text-amber-800 hover:bg-amber-200 font-bold py-2 px-4 rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity === "" ? "" : quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setQuantity("");
                      } else if (!isNaN(value)) {
                        setQuantity(parseInt(value));
                      }
                    }}
                    onBlur={() => {
                      if (!quantity || quantity < 1) {
                        setQuantity(1);
                      }
                    }}
                    className="border-t border-b border-amber-300 p-2 text-center w-16 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="bg-amber-100 text-amber-800 hover:bg-amber-200 font-bold py-2 px-4 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleConfirmAddToCart}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Add {quantity} to Cart - Rs {selectedItem.price * quantity}
              </button>
            </div>
          </div>
        )}

        <ToastContainer 
          position="top-center" 
          autoClose={2500}
          toastClassName="bg-amber-100 text-amber-900 font-medium rounded-lg shadow-lg"
          progressClassName="bg-amber-500"
        />
      </div>
    </div>
  );
};

export default CustomerMenu;