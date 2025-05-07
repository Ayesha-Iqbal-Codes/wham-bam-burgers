import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { FaUser, FaLock, FaUserShield, FaEnvelope, FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (isAdmin) {
      if (email === 'Admin' && password === 'admin123') {
        setError(''); 
        console.log('Admin login successful');
        navigate('/dashboard'); 
      } else {
        setError('Invalid admin credentials');
      }
    } else {
      if (!emailPattern.test(email)) {
        setError('Please enter a valid email address with "@" and ".com".');
        return;
      }

      setError(''); 
      localStorage.setItem('user', JSON.stringify({ name, email }));
      console.log('User login successful with', { name, email });
      navigate('/menu'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={logo} 
              alt="Wham Bam Burgers Logo" 
              className="w-20 h-20 rounded-full border-4 border-amber-300 shadow-lg" 
            />
          </div>
          <h1 className="text-2xl font-bold text-white font-serif">Welcome to Wham Bam Burgers</h1>
          <p className="text-amber-100 mt-1">
            {isAdmin ? 'Admin Portal' : 'Customer Login'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mt-6 px-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg flex items-center ${
                !isAdmin 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-white text-amber-800 hover:bg-amber-50'
              }`}
            >
              <FaUser className="mr-2" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center ${
                isAdmin 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-white text-amber-800 hover:bg-amber-50'
              }`}
            >
              <FaUserShield className="mr-2" />
              Admin
            </button>
          </div>
        </div>

        {/* Admin Demo Info */}
        {isAdmin && (
          <div className="bg-amber-100 border border-amber-200 rounded-lg mx-6 mt-4 p-3 text-center text-sm text-amber-800">
            <p>
              <strong>Demo Admin Login:</strong><br />
              Username: <span className="font-mono">Admin</span><br />
              Password: <span className="font-mono">admin123</span>
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {!isAdmin && (
            <div className="mb-4">
              <label className="block text-amber-800 text-sm font-semibold mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-amber-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-amber-800 text-sm font-semibold mb-2" htmlFor="email">
              {isAdmin ? 'Admin Username' : 'Email Address'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {isAdmin ? <FaUserShield className="text-amber-500" /> : <FaEnvelope className="text-amber-500" />}
              </div>
              <input
                type="text"
                id="email"
                placeholder={isAdmin ? 'Enter admin username' : 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  error ? 'border-red-500' : 'border-amber-200'
                }`}
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-amber-800 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-amber-500" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <FaSignInAlt className="mr-2" />
            {isAdmin ? 'Admin Login' : 'Customer Login'}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-amber-50 p-4 text-center text-xs text-amber-700 border-t border-amber-200">
          <p>© {new Date().getFullYear()} Wham Bam Burgers. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;