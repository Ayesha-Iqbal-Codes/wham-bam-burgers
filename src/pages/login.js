import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full bg-gray-100 p-8 rounded-lg shadow-md">
      
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Wham Bam Burgers Logo" className="w-32 h-auto" />
        </div>

       
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

       
        <form onSubmit={handleSubmit}>
          
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
        
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          
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
