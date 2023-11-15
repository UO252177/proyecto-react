import React, { createContext, useState, useContext } from 'react';
import { firestore } from "../database/firebase";
import { getDoc, doc } from "@firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const updateBalance = async (theId, tableName) => {
    const docRef = doc(firestore, tableName, theId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userDetails = {
        id: theId,
        name: docSnap.data().name,
        email: docSnap.data().email,
        phone: docSnap.data().phone,
        balance: docSnap.data().balance,
      };
      setUser(userDetails);                
    } else {
      console.log("No such user!");
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    updateBalance
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
