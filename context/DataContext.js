import React, { createContext, useState, useContext } from "react";

// Create context
const DataContext = createContext();

// Create provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});

  // Function to update the JSON object
  const updateData = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to access data context
export const useData = () => useContext(DataContext);
