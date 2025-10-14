// src/context/UIContext.jsx
import React, { createContext, useState } from 'react';

export const UIContextObject = createContext();

const UIContext = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <UIContextObject.Provider value={{ loading, setLoading }}>
      {children}
    </UIContextObject.Provider>
  );
};

export default UIContext;
