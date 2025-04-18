import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp'; // Import the logo

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State to track user name
  const [isAdmin, setIsAdmin] = useState(false); // State to toggle between admin and user
  const [error, setError] = useState(''); // State to track validation errors
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation regex for checking "@" and ".com"
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Admin login check
    if (isAdmin) {
      if (email === 'Admin' && password === 'admin123') {
        setError(''); // Clear any error messages
        console.log('Admin login successful');
        navigate('/dashboard'); // Redirect to admin dashboard
      } else {
        setError('Invalid admin credentials');
      }
    } else {
      // User email validation
      if (!emailPattern.test(email)) {
        setError('Please enter a valid email address with "@" and ".com".');
        return;
      }

      setError(''); // Clear error if email is valid

      // Save the user name and email in local storage
      localStorage.setItem('user', JSON.stringify({ name, email }));
      console.log('User login successful with', { name, email });
      navigate('/menu'); // Redirect to user menu
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full bg-gray-100 p-8 rounded-lg shadow-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Wham Bam Burgers Logo" className="w-32 h-auto" />
        </div>

        {/* Toggle between User and Admin login */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsAdmin(false)}
            className={`px-4 py-2 mr-2 ${!isAdmin ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} rounded focus:outline-none`}
          >
            User
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            className={`px-4 py-2 ${isAdmin ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} rounded focus:outline-none`}
          >
            Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* If not admin, show name input */}
          {!isAdmin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          )}

          {/* Email or Admin Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              {isAdmin ? 'Admin Name' : 'Email'}
            </label>
            <input
              type="text"
              id="email"
              placeholder={isAdmin ? 'Enter admin name' : 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
              required
            />
            {/* Display validation error under email input */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Login Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
