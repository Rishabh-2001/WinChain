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