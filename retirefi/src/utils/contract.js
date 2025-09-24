import { ethers } from 'ethers';
import CounterABI from '../abis/CounterABI.json';
import { CONTRACT_ADDRESS } from './constants';

export const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  throw new Error('No wallet provider found');
};

export const getContract = (signerOrProvider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CounterABI, signerOrProvider);
};