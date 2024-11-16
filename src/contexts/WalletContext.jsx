import React, { createContext, useState } from "react";

// Create a Context with default value
const WalletContext = createContext();

// Create a Provider Component
export function WalletProvider({ children }) {
  // Theme state and function to toggle it
  const [theme, setTheme] = useState("light"); // Default theme is 'light'

  // Wallet data state
  const initialData = {
    walletAddress: "",
    walletBalance: "0",
    isNewUser: true,
    connected: false,
    ethBalance: 0,
  };

  const [walletData, setWalletData] = useState(initialData);

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Setter functions for walletData
  const setWalletAddress = (address) => {
    setWalletData((prevData) => ({ ...prevData, walletAddress: address }));
  };

  const setWalletBalance = (walletBalance) => {
    setWalletData((prevData) => ({ ...prevData, walletBalance }));
  };

  const setEthBalance = (ethBalance) => {
    setWalletData((prevData) => ({ ...prevData, ethBalance }));
  };

  const setIsNewUser = (isNewUser) => {
    setWalletData((prevData) => ({ ...prevData, isNewUser }));
  };

  const setConnected = (connected) => {
    setWalletData((prevData) => ({ ...prevData, connected }));
  };
  const value = {
    walletData,
    setWalletAddress,
    setWalletAddress,
    setWalletBalance,
    setIsNewUser,
    setConnected,
    setEthBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children} {/* Make children components available to the context */}
    </WalletContext.Provider>
  );
}

export default WalletContext;
