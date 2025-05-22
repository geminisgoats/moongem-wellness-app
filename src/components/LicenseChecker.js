import React, { useState } from 'react';

function LicenseChecker({ onSuccess }) {
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState(null);

  const validateLicense = async () => {
    try {
      const res = await fetch('https://api.gumroad.com/v2/licenses/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_permalink: 'your-product-permalink', // e.g. "moongem-premium"
          license_key: licenseKey,
        }),
      });
      const data = await res.json();

      if (data.success) {
        onSuccess(); // You can setPremiumUser(true)
        localStorage.setItem('isPremiumUser', 'true');
      } else {
        setError('Invalid license key. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="mt-4 bg-indigo-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Already Upgraded?</h3>
      <p className="text-sm mb-2">Enter your license key to unlock Premium features.</p>
      <input
        type="text"
        value={licenseKey}
        onChange={(e) => setLicenseKey(e.target.value)}
        placeholder="Enter your Gumroad license key"
        className="w-full px-3 py-2 rounded text-gray-900 mb-2"
      />
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
      <button
        onClick={validateLicense}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Unlock Premium
      </button>
    </div>
  );
}

export default LicenseChecker;