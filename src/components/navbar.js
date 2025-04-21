import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
    <header className="sticky top-0 bg-gradient-to-r from-black via-red-800 to-red-900 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-2 px-3 sm:px-4 lg:px-6">
       
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Wham Bam Burgers Logo"
            className="w-10 h-10 sm:w-10 sm:h-10 rounded-full shadow-lg hover:shadow-red-400 transition duration-300"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold hover:text-yellow-300 transition duration-300">
            Wham Bam Burgers
          </h1>
        </Link>

     
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="w-5 h-5" />
          </button>
        </div>

        
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:space-x-4 mt-2 lg:mt-0 absolute lg:static top-full left-0 w-full lg:w-auto bg-red-900 lg:bg-transparent text-white z-40`}
        >
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 px-4 lg:px-0 py-2 lg:py-0 text-sm sm:text-base items-center">
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-yellow-300 transition duration-300 ${
                location.pathname === '/menu' ? 'text-yellow-300' : ''
              } lg:mt-1`}
            >
              Menu
            </Link>

           
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className={`relative hover:text-yellow-300 transition duration-300 ${
                location.pathname === '/cart' ? 'text-yellow-300' : ''
              } lg:mt-1`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/order-history"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-yellow-300 transition duration-300 ${
                location.pathname === '/order-history' ? 'text-yellow-300' : ''
              } lg:mt-1`}
            >
              Order History
            </Link>

            {!user ? (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition duration-300 lg:mt-1"
              >
                Login
              </Link>
            ) : (
              <div className="relative lg:mt-0.5">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleProfileDropdown}
                >
                  <img
                    src={profilePic}
                    alt="User"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shadow-lg"
                  />
                </div>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-red-900 text-white rounded-md shadow-lg z-50 text-sm">
                    <div className="px-4 py-2 border-b border-gray-700 text-center font-semibold truncate">
                      {user.name}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-800"
                    >
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
