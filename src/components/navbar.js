import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import profilePic from '../assets/profile.png';
import { useUser } from '../context/userContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, updateUser } = useUser();
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

  return (
    <header className="sticky top-0 bg-gradient-to-r from-black via-red-800 to-red-900 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Wham Bam Burgers Logo"
            className="w-12 h-12 rounded-full shadow-lg hover:shadow-red-400 transition duration-300"
          />
          <h1 className="text-2xl font-bold ml-4 hover:text-yellow-300 transition duration-300">
            Wham Bam Burgers
          </h1>
        </Link>

        {/* Hamburger icon */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:space-x-4 mt-4 lg:mt-0 absolute lg:static top-full left-0 w-full lg:w-auto bg-red-900 lg:bg-transparent text-white lg:text-inherit z-40`}
        >
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 px-4 lg:px-0 py-2 lg:py-0">
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-yellow-300 transition duration-300 ${
                location.pathname === '/menu' ? 'text-yellow-300' : ''
              }`}
            >
              Menu
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-yellow-300 transition duration-300 ${
                location.pathname === '/cart' ? 'text-yellow-300' : ''
              }`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" />
            </Link>
            <Link
              to="/order-history"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-yellow-300 transition duration-300 ${
                location.pathname === '/order-history' ? 'text-yellow-300' : ''
              }`}
            >
              Order History
            </Link>

            {!user ? (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition duration-300"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleProfileDropdown}
                >
                  <img
                    src={profilePic}
                    alt="User"
                    className="w-10 h-10 rounded-full shadow-lg"
                  />
                </div>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-red-900 text-white rounded-md shadow-lg z-50">
                    <div className="px-4 py-2 border-b border-gray-700 text-center font-semibold">
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
