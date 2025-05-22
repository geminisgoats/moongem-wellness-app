// src/components/PastPatternInsights.js
import React from 'react';

const PastPatternInsights = ({ isPremiumUser, savedNotes }) => {
  if (!isPremiumUser) {
    return (
      <div className="text-center p-4 border-t border-indigo-200 mt-6">
        <p className="text-white">🔒 Unlock lunar pattern insights with Premium.</p>
        <button className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600">
          Learn More
        </button>
      </div>
    );
  }

  if (!savedNotes || savedNotes.length === 0) {
    return <p className="text-indigo-200 mt-4">Not enough data to detect patterns yet.</p>;
  }

  const phaseGroups = savedNotes.reduce((acc, note) => {
    const phase = note.phase || 'Unknown';
    if (!acc[phase]) acc[phase] = [];
    acc[phase].push(note.mood || 0);
    return acc;
  }, {});

  const insights = Object.entries(phaseGroups).map(([phase, moods]) => {
    const average = (moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(2);
    return { phase, average, count: moods.length };
  });

  return (
    <div className="bg-indigo-800 p-4 rounded-xl shadow-md mt-6 max-w-md mx-auto">
      <h3 className="text-white font-bold mb-4 text-xl">🌙 Your Lunar Mood Patterns</h3>
      <ul className="text-indigo-200 space-y-2">
        {insights.map(({ phase, average, count }) => (
          <li key={phase}>
            <strong>{phase}:</strong> avg mood {average} ({count} entries)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastPatternInsights;