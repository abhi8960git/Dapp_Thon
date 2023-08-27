import React,{ useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const VrNFT = () => {

  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);



  const connectWallet = async () => {
    try {
      // @ts-ignore
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsConnected(true);
  
      const state = { address: accounts[0] };
      const address = accounts[0];
      const searchParams = new URLSearchParams(state).toString();
  
      router.push({
        pathname: './game',
        search: `?state=${searchParams}`,
        // query:{address}
      });
  
      console.log(accounts[0]); // Output: 0x1234567890abcdef
    } catch (error) {
      console.error(error);
    }
  };


  const disconnectWallet = async () => {
    try {
      // @ts-ignore
      await window.ethereum.disconnect();
      setIsConnected(false);
    } catch (error) {
      console.error(error);
    }

    window.location.reload();

  };



  return (
    <div>
    {isConnected ? (
      <button onClick={disconnectWallet}>Disconnect Wallet</button>
    ) : (
      <button onClick={connectWallet}>Connect Wallet</button>
    )}
  </div>
  )
}

export default VrNFT