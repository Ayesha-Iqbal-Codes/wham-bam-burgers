import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram,
  faYelp
} from '@fortawesome/free-brands-svg-icons';
import { 
  faUtensils, 
  faClock, 
  faPhone, 
  faMapMarkerAlt,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-amber-900 to-amber-800 text-amber-50 py-12 border-t-4 border-amber-600">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="mb-6">
            <Link to="/" className="flex items-center mb-4 group">
              <h3 className="text-2xl font-bold font-serif bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:to-amber-50 transition-all duration-300">
                Wham Bam Burgers
              </h3>
            </Link>
            <p className="text-amber-100 mb-4 text-sm leading-relaxed">
              Serving the juiciest, most flavorful burgers in town since 2010. 
              Made fresh daily with premium ingredients for that perfect bite.
            </p>
            <div className="flex items-center text-amber-100 mb-2 text-sm">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2" />
              <span>123 Burger Street, Burger Town, BT 12345</span>
            </div>
            <div className="flex items-center text-amber-100 mb-2 text-sm">
              <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center text-amber-100 text-sm">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2" />
              <span>hello@whambamburgers.com</span>
            </div>
          </div>

          {/* Hours */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FontAwesomeIcon icon={faClock} className="w-5 h-5 mr-2 text-amber-300" />
              Hours
            </h3>
            <ul className="space-y-2 text-amber-100">
              <li className="flex justify-between text-sm">
                <span>Monday - Thursday</span>
                <span>11AM - 10PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Friday - Saturday</span>
                <span>11AM - 11PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Sunday</span>
                <span>12PM - 9PM</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-amber-900/50 rounded-lg border border-amber-700">
              <p className="text-xs text-amber-200 italic">
                Kitchen closes 30 minutes before closing time
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FontAwesomeIcon icon={faUtensils} className="w-5 h-5 mr-2 text-amber-300" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/menu" 
                  className="text-amber-100 hover:text-amber-300 transition-all duration-300 flex items-center text-sm"
                >
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-2"></span>
                  Full Menu
                </Link>
              </li>
              <li>
                <Link 
                  to="/order-history" 
                  className="text-amber-100 hover:text-amber-300 transition-all duration-300 flex items-center text-sm"
                >
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-2"></span>
                  Order History
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className="text-amber-100 hover:text-amber-300 transition-all duration-300 flex items-center text-sm"
                >
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-2"></span>
                  Your Cart
                </Link>
              </li>
             
              <li>
                <Link 
                  to="/contact" 
                  className="text-amber-100 hover:text-amber-300 transition-all duration-300 flex items-center text-sm"
                >
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <p className="text-amber-100 mb-4 text-sm">
              Stay connected for daily specials, events, and burger news!
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-amber-100 transition-all duration-300"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-amber-100 transition-all duration-300"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-amber-100 transition-all duration-300"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              </a>
              <a 
                href="https://yelp.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-amber-100 transition-all duration-300"
                aria-label="Yelp"
              >
                <FontAwesomeIcon icon={faYelp} className="w-5 h-5" />
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-amber-300">Newsletter Signup</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-sm text-amber-900 bg-amber-100 rounded-l focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
                />
                <button className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-r text-sm font-medium transition-colors duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-amber-700">
          <p className="text-xs text-amber-200">
            &copy; {new Date().getFullYear()} Wham Bam Burgers. All Rights Reserved. | 
            <Link to="/privacy" className="hover:text-amber-300 ml-2">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-amber-300 ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;