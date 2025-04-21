import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);

      
      if (storedUser.email) {
        localStorage.setItem('loggedInUserEmail', storedUser.email);
      }
    }
  }, []);

 
  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));

    if (user?.email) {
      localStorage.setItem('loggedInUserEmail', user.email);
    }
  };

 
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loggedInUserEmail');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
