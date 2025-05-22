import React, { useState } from 'react';

function UpsellModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage or send to backend later
    console.log('User email for reminder:', email);
    setSubmitted(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-white text-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-2">Unlock Lunar Pattern Insights 🌕</h2>
        <p className="mb-4 text-sm text-gray-600">
          Discover what aligns with your energy over time. Premium includes pattern insights, journaling history, and lunar planning tools.
        </p>
        <a
          href="https://gumroad.com/l/your-product-stub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Upgrade for Full Access
        </a>

        {!submitted ? (
          <form onSubmit={handleEmailSubmit} className="mt-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Remind me later (email)"
              className="w-full px-3 py-2 mb-2 rounded text-gray-800"
            />
            <button type="submit" className="text-indigo-600 underline text-sm hover:text-indigo-800">
              Submit & Close
            </button>
          </form>
        ) : (
          <p className="text-sm mt-4 text-green-600">Thanks! We'll remind you soon.</p>
        )}
      </div>
    </div>
  );
}

export default UpsellModal;