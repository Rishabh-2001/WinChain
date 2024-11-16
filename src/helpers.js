import axios from "axios";
import toast from "react-hot-toast";

 
export async function getConnectedWalletInfo (){
  
        // Check if MetaMask is available in the browser
        if (!window.ethereum) {
          alert("MetaMask is not installed. Please install MetaMask to use this.");
          return;
        }
    
        // setConnecting(true); // Start the loading state
        setError(null);      // Clear any previous errors
    
        try {
          // Requesting user's MetaMask account
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
    
          // Requesting the user to connect their MetaMask account
          await provider.send("eth_requestAccounts", []);
    
          // Getting the address of the connected wallet
          const userAddress = await signer.getAddress();
         
          return {isWalletConnected: true, userAddress: userAddress};
        } catch (err) {
          console.error("Error connecting wallet", err);
          setError("Failed to connect wallet. Please try again.");
          return false;
        } finally {
        //   setConnecting(false); // End loading state
        }
   
}



export async function depositIntoWallet(amount, walletAddress)
{
    const type = 'deposit';
    try {
      const requestBody = {
        walletAddress: walletAddress,
        amount: parseFloat(amount),
      };
  
      // Step 2: Make the API request after deposit is successful
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_ORIGIN}${type}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Handle the response from the API
      const data = response.data;
      console.log('>>game money cut', data);
  
      if (response.status !== 200) {
        throw new Error(data.message || `Failed to ${type}`);
      }
  
      // On success, notify the user and perform further actions
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
      return true;
    } catch (error) {
       console.log("Error found", error);
       return false;
    }

}

export async function withdrawFromWallet(amount, walletAddress)
{
    const type = 'withdraw';
    try {
      const requestBody = {
        walletAddress: walletAddress,
        amount: parseFloat(amount),
      };
  
      // Step 2: Make the API request after deposit is successful
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_ORIGIN}${type}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Handle the response from the API
      const data = response.data;
      console.log('>>game money cut', data);
  
      if (response.status !== 200) {
        throw new Error(data.message || `Failed to ${type}`);
      }
  
      // On success, notify the user and perform further actions
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
      return true;
    } catch (error) {
       console.log("Error found", error);
       return false;
    }

}