import { useContext, useState } from 'react';
import axios from 'axios';
import walletContext from '../contexts/WalletContext';

// Custom Hook: useAddressData
const useAddressData = () => {
  const [data, setData] = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const { setEthBalance, walletData } = useContext(walletContext);
  const { ethBalance } = walletData;  // Ensure you use this value if needed

  // Function to fetch data from the BlockScout API
  const fetchAddressData = async (address) => {
    console.log("Fetch address sepolia add1,", address);
    
    if (!address) return;
    console.log("Fetch address sepolia add2,", address);

    // Set loading state
    // setLoadingApi(true);
    // setErrorApi(null);  // Reset any previous errors

    try {
    console.log("Fetch address sepolia add3,", address);

      const apiUrl = `https://optimism-sepolia.blockscout.com/api/v2/addresses/0xb974C9Aaf445ba8ABEe973E36781F658c98743Fa`;
      const response = await axios.get(apiUrl);
    console.log("Fetch address sepolia add3,", response);

      
      // On success, store the data
      setData(response.data);
      console.log("Fetched data:", response?.data);
      
      
      // Optional: Reset ethBalance if it's part of the desired functionality
      setEthBalance(response?.data?.coin_balance); // Only do this if intended behavior

    } catch (err) {
      // Handle error
    console.log("Fetch address sepolia add4 error,", err);
    if(err?.response?.data?.message)
    {
        setEthBalance(0)   
    }

      console.error("Error fetching data:", err);
      setErrorApi('Error fetching data');
    } finally {
      // Stop loading state
      console.log("5");
      
      setLoadingApi(false);
    }
  };

  return {
    data,
    loadingApi,
    errorApi,
    fetchAddressData,
  };
};

export default useAddressData;
