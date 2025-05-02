import React, { createContext, useState } from 'react';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [families, setFamilies] = useState([]);
  const [expenses, setExpenses] = useState([]);

  return (
    <TripContext.Provider value={{ families, setFamilies, expenses, setExpenses }}>
      {children}
    </TripContext.Provider>
  );
};
