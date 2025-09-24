// src/pages/Settings.jsx
import React from 'react';
import WalletConnect from '../components/WalletConnect';

const Settings = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <WalletConnect>
        <p>Settings: Configure preferences (Coming soon)</p>
      </WalletConnect>
    </div>
  </div>
);

export default Settings;