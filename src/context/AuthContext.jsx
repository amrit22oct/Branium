// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

// Context object (named export, if you want to access it elsewhere)
export const AuthContextObject = createContext();

// Provider component (default export for wrapping)
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContextObject.Provider value={{ user, setUser }}>
      {children}
    </AuthContextObject.Provider>
  );
};

export default AuthContext;
