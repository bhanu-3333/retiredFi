import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getContract, getProvider } from '../utils/contract';

export const useCounter = () => {
  const { address } = useAccount();
  const [counterValue, setCounterValue] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCounter = async () => {
      setLoading(true);
      try {
        const provider = getProvider();
        const contract = getContract(provider);
        const value = await contract.x();
        setCounterValue(value.toString());
      } catch (error) {
        console.error('Counter fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounter();
  }, [address]);

  return { counterValue, loading };
};