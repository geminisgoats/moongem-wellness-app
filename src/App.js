// src/App.js
import React, { useState, useEffect } from 'react';
import LunarPhase from './components/LunarPhase';
import LunarNotes from './components/LunarNotes';
import PastPatternInsights from './components/PastPatternInsights';
import UpsellModal from './components/UpsellModal';
import LicenseChecker from './components/LicenseChecker';

function App() {
  const [phaseName, setPhaseName] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  // Check for saved notes + premium status on load
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('lunarNotes')) || [];
    setSavedNotes(notes);

    const premiumFlag = localStorage.getItem('isPremiumUser') === 'true';
    setIsPremiumUser(premiumFlag);
  }, []);

  const handleAttemptPremiumAccess = () => {
    console.log('User clicked Upgrade CTA - timestamp:', new Date().toISOString());
    if (!isPremiumUser) {
      setShowUpsell(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white font-sans">
      <header className="p-6 shadow-lg bg-indigo-800">
        <h1 className="text-3xl font-bold tracking-wide">MoonGem Wellness</h1>
        <p className="text-indigo-300 mt-1">A Lunar Ritual & Wellness Tracker for Aligned Living</p>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <section className="my-8 p-6 bg-indigo-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
          <p>
            This is your personal lunar wellness planner 🌙. Track your moods, rituals & wellness goals, and sync with the lunar cycle.
          </p>
        </section>

        <section className="my-8">
          <LunarPhase setPhaseName={setPhaseName} />
        </section>

        <section className="my-8">
          <LunarNotes phaseName={phaseName} />
        </section>

        <section className="my-12">
          {isPremiumUser ? (
            <PastPatternInsights isPremiumUser={true} savedNotes={savedNotes} />
          ) : (
            <div className="text-center">
              <button
                onClick={handleAttemptPremiumAccess}
                className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                See Pattern Insights 🔒
              </button>
            </div>
          )}

          {!isPremiumUser && (
            <div className="my-6">
              <LicenseChecker onSuccess={() => setIsPremiumUser(true)} />
            </div>
          )}

          <div className="text-center mt-4 text-sm">
            <button
              onClick={() => {
                setIsPremiumUser(!isPremiumUser);
                localStorage.setItem('isPremiumUser', String(!isPremiumUser));
              }}
              className="text-indigo-300 underline hover:text-white"
            >
              {isPremiumUser ? 'Switch to Free Mode' : 'Switch to Premium Mode'}
            </button>
          </div>
        </section>
      </main>

      {showUpsell && <UpsellModal onClose={() => setShowUpsell(false)} />}

      <footer className="p-4 text-center text-indigo-300">
        &copy; 2025 MoonGem Wellness. Aligned with the rhythm of the moon 🌑
      </footer>
    </div>
  );
}

export default App;