import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes, faUser, faHistory } from '@fortawesome/free-solid-svg-icons';
import profilePic from '../assets/profile.png';
import { useUser } from '../context/userContext';
import { useCart } from '../context/cartContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, updateUser } = useUser();
  const { cartItems } = useCart(); 
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      updateUser(JSON.parse(storedUser));
    }
  }, [updateUser]);

  const toggleProfileDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    updateUser(null);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); 

  return (
    <header className="sticky top-0 bg-gradient-to-b from-amber-900 to-amber-800 text-white shadow-lg z-50 border-b-4 border-amber-600">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={logo}
            alt="Wham Bam Burgers Logo"
            className="w-12 h-12 rounded-full shadow-lg border-2 border-amber-400 group-hover:border-amber-300 transition-all duration-300"
          />
          <h1 className="text-xl sm:text-2xl font-bold font-serif bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:to-amber-50 transition-all duration-300">
            Wham Bam Burgers
          </h1>
        </Link>

        <div className="lg:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-full bg-amber-700 hover:bg-amber-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <FontAwesomeIcon 
              icon={menuOpen ? faTimes : faBars} 
              className="w-6 h-6 text-amber-100" 
            />
          </button>
        </div>

        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:justify-between lg:space-x-6 mt-2 lg:mt-0 absolute lg:static top-full left-0 w-full lg:w-auto bg-amber-800 lg:bg-transparent text-white z-40 shadow-lg lg:shadow-none`}
        >
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 px-6 lg:px-0 py-4 lg:py-0 text-base sm:text-lg items-center">
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center hover:text-amber-300 transition-all duration-300 ${
                location.pathname === '/menu' ? 'text-amber-300 font-bold' : ''
              }`}
            >
              <span className="hidden sm:inline-block mr-2">
                <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
              </span>
              Menu
            </Link>

            <Link
              to="/order-history"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center hover:text-amber-300 transition-all duration-300 ${
                location.pathname === '/order-history' ? 'text-amber-300 font-bold' : ''
              }`}
            >
              <span className="hidden sm:inline-block mr-2">
                <FontAwesomeIcon icon={faHistory} className="w-4 h-4" />
              </span>
              Order History
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className={`relative flex items-center hover:text-amber-300 transition-all duration-300 mr-4 ${
                location.pathname === '/cart' ? 'text-amber-300 font-bold' : ''
              }`}
            >
              <span className="hidden sm:inline-block mr-2">
                <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
              </span>
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-6 bg-amber-300 text-amber-900 text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="px-6 lg:px-0 py-2 lg:py-0 flex items-center">
            {!user ? (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-md"
              >
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2" />
                Login
              </Link>
            ) : (
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer group"
                  onClick={toggleProfileDropdown}
                >
                  <img
                    src={profilePic}
                    alt="User"
                    className="w-10 h-10 rounded-full shadow-lg border-2 border-amber-400 group-hover:border-amber-300 transition-all duration-300"
                  />
                  <span className="ml-2 hidden lg:inline-block font-medium group-hover:text-amber-300 transition-colors duration-300">
                    {user.name.split(' ')[0]}
                  </span>
                </div>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-amber-800 text-white rounded-lg shadow-xl z-50 border border-amber-700 overflow-hidden">
                    <div className="px-4 py-3 border-b border-amber-700 text-center font-semibold bg-amber-900 truncate">
                      {user.name}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-amber-700 transition-colors duration-200 flex items-center"
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
