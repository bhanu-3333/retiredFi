import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import WalletConnect from '../components/WalletConnect';
import { getProvider, getContract } from '../utils/contract';
import { useCounter } from '../hooks/useCounter';
import { gsap } from 'gsap';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { isConnected } = useAccount();
  const { counterValue, loading } = useCounter();
  const [incrementBy, setIncrementBy] = useState('');

  useEffect(() => {
    if (isConnected) {
      gsap.from('.dashboard-content > *', {
        opacity: 0,
        x: -50,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }
  }, [isConnected]);

  const handleIncrement = async () => {
    try {
      const signer = await getProvider().getSigner();
      const contract = getContract(signer);
      await contract.inc();
      toast.success('Counter incremented by 1!');
    } catch (error) {
      console.error('Increment error:', error);
      toast.error(`Failed to increment: ${error.message}`);
    }
  };

  const handleIncrementBy = async () => {
    if (!incrementBy || isNaN(incrementBy) || Number(incrementBy) <= 0) {
      toast.error('Please enter a positive number');
      return;
    }
    try {
      const signer = await getProvider().getSigner();
      const contract = getContract(signer);
      await contract.incBy(ethers.parseUnits(incrementBy, 0));
      toast.success(`Counter incremented by ${incrementBy}!`);
    } catch (error) {
      console.error('IncrementBy error:', error);
      toast.error(`Failed to increment: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 dashboard-content">
        <h1 className="text-2xl font-bold mb-4">Counter Dashboard</h1>
        {isConnected ? (
          <WalletConnect>
            <div className="space-y-4">
              <p>Current Counter Value: {loading ? 'Loading...' : counterValue || '0'}</p>
              <button
                onClick={handleIncrement}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Increment by 1
              </button>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Amount to increment"
                  value={incrementBy}
                  onChange={(e) => setIncrementBy(e.target.value)}
                  className="border p-2 w-full"
                />
                <button
                  onClick={handleIncrementBy}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Increment By
                </button>
              </div>
            </div>
          </WalletConnect>
        ) : (
          <WalletConnect />
        )}
      </div>
    </div>
  );
};

export default Dashboard;