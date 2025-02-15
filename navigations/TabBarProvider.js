import React, { createContext, useState, useContext } from "react";

// Create a context to manage tab bar visibility
const TabBarContext = createContext({
  showTabBar: true, // Default to showing the tab bar
  setShowTabBar: () => {}, // Function to update the visibility
});

// Custom hook to use the TabBar context
export const useTabBar = () => useContext(TabBarContext);

// Provider component to wrap the app
export const TabBarProvider = ({ children }) => {
  const [showTabBar, setShowTabBar] = useState(true); // Default is to show the tab bar

  return (
    <TabBarContext.Provider value={{ showTabBar, setShowTabBar }}>
      {children}
    </TabBarContext.Provider>
  );
};

export default TabBarProvider;
