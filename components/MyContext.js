import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const contextValue = {
    user,
    updateUser,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;