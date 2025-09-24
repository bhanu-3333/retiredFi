import React, { useEffect, useState, useRef } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { metaMask } from '@wagmi/connectors';
import { gsap } from 'gsap';
import { CHAIN_ID } from '../utils/constants';
import { toast } from 'react-toastify';

const WalletConnect = ({ children }) => {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, error: connectError, isSuccess: connectSuccess } = useConnect({
    connector: metaMask(),
  });
  const { disconnect } = useDisconnect();
  const { switchChain, error: switchError } = useSwitchChain();
  const [isManuallyConnected, setIsManuallyConnected] = useState(false);
  const [connectionAttempted, setConnectionAttempted] = useState(false);
  const buttonRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleConnect = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      toast.error('MetaMask is not detected. Please install it from https://metamask.io and try again.');
      return;
    }

    setConnectionAttempted(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setConnectionAttempted(false);
      toast.error('Connection timed out. Please try again.');
    }, 15000); // 15-second timeout

    try {
      console.log('Initiating MetaMask connection...');
      await connect();
      console.log('Waiting for MetaMask approval...');

      const checkAccounts = () => new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            clearInterval(interval);
            resolve(accounts);
          }
        }, 500);
        setTimeout(() => {
          clearInterval(interval);
          reject(new Error('MetaMask approval timed out'));
        }, 10000); // 10-second approval timeout
      });

      await checkAccounts();
      console.log('Switching to Sepolia...');
      await switchChain({ chainId: CHAIN_ID });
      setIsManuallyConnected(true);
      toast.success('MetaMask connected successfully!');
      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current, { scale: 1 }, { scale: 1.1, duration: 0.5, ease: 'power2.out' });
      }
    } catch (error) {
      console.error('Connection error:', error);
      if (error.code === 4902) {
        toast.info('Sepolia network not found. Adding it now...');
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${CHAIN_ID.toString(16)}`,
            chainName: 'Sepolia Test Network',
            rpcUrls: ['https://rpc.sepolia.org'],
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            blockExplorerUrls: ['https://sepolia.etherscan.io'],
          }],
        });
        toast.success('Sepolia added. Please switch to it in MetaMask and retry.');
      } else if (error.message.includes('User rejected')) {
        toast.warn('Connection rejected by user. Please approve in MetaMask.');
      } else {
        toast.error('Connection failed. Ensure MetaMask is unlocked and on Sepolia. Retry or check console.');
      }
      setIsManuallyConnected(false);
    } finally {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setConnectionAttempted(false);
    }
  };

  useEffect(() => {
    if (connectSuccess && !switchError && !connectionAttempted) {
      setIsManuallyConnected(true);
      console.log('Connection confirmed:', { isConnected, address });
    }
  }, [connectSuccess, switchError, connectionAttempted, isConnected, address]);

  useEffect(() => {
    if (isConnecting && buttonRef.current) {
      gsap.to(buttonRef.current, { className: '+=animate-pulse-connect', duration: 0 });
    } else if (!isConnecting && buttonRef.current) {
      gsap.to(buttonRef.current, { className: '-=animate-pulse-connect', duration: 0 });
    }
  }, [isConnecting]);

  if (connectError || switchError) {
    console.error('Error details:', connectError || switchError);
    if (!connectionAttempted) {
      toast.error('An error occurred. Please try connecting again.');
    }
  }

  return (
    <div>
      {(isConnecting || connectionAttempted || (!isConnected && !isManuallyConnected)) ? (
        <button
          ref={buttonRef}
          onClick={handleConnect}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          disabled={isConnecting || connectionAttempted}
        >
          {isConnecting || connectionAttempted ? 'Connecting...' : 'Connect MetaMask'}
        </button>
      ) : (
        <button
          ref={buttonRef}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition flex items-center space-x-2"
          onClick={() => disconnect()}
        >
          <span>Connected</span>
          <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </button>
      )}
      {children}
    </div>
  );
};

export default WalletConnect;