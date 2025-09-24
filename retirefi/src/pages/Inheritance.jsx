import React from 'react';
import WalletConnect from '../components/WalletConnect';

const Inheritance = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Inheritance</h1>
      <WalletConnect>
        <p>Inheritance: Coming soon</p>
      </WalletConnect>
      <div className="test-tailwind m-4">Test Tailwind Styles</div>
    </div>
  </div>
);

export default Inheritance;