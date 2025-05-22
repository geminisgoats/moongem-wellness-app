// src/components/MoodSelector.js
import React from 'react';

const moods = [
  { label: 'Low', emoji: '😞', value: 1 },
  { label: 'Tired', emoji: '😐', value: 2 },
  { label: 'Neutral', emoji: '🙂', value: 3 },
  { label: 'Upbeat', emoji: '😊', value: 4 },
  { label: 'Energized', emoji: '🤩', value: 5 },
];

const MoodSelector = ({ selectedMood, onSelect }) => {
  return (
    <div className="mb-4 text-center">
      <p className="text-indigo-300 mb-2">How are you feeling today?</p>
      <div className="flex justify-center space-x-4">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelect(mood.value)}
            className={`text-3xl transition-transform transform hover:scale-110 focus:outline-none ${
              selectedMood === mood.value ? 'ring-2 ring-white rounded-full' : ''
            }`}
            title={mood.label}
            aria-label={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      <p className="mt-2 text-indigo-400 text-sm">
        Mood: {selectedMood ? moods.find((m) => m.value === selectedMood).label : 'Not selected'}
      </p>
    </div>
  );
};

export default MoodSelector;