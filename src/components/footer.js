// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Company Info Section */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-2xl font-semibold mb-4">Wham Bam Burgers</h3>
            <p className="text-sm mb-4">Serving the best burgers in town. Freshly made, deliciously satisfying!</p>
            <p className="text-sm">123 Burger Street, Burger Town</p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-sm hover:text-yellow-300 transition duration-300">Menu</Link>
              </li>
              <li>
                <Link to="/order-history" className="text-sm hover:text-yellow-300 transition duration-300">Order History</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm hover:text-yellow-300 transition duration-300">Cart</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-yellow-300">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-yellow-300">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-yellow-300">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Wham Bam Burgers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
