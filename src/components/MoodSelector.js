// src/components/MoodSelector.js
import React from 'react';

const moods = [
  { label: 'Low', emoji: '😞', value: 1 },
  { label: 'Tired', emoji: '😐', value: 2 },
  { label: 'Neutral', emoji: '🙂', value: 3 },
  { label: 'Upbeat', emoji: '😊', value: 4 },
  { label: 'Energized', emoji: '🤩', value: 5 },
];

const MoodSelector = ({ mood, setMood }) => {
  const handleMoodClick = (value) => {
    console.log('Mood clicked:', value);
    setMood(value);
  };

  return (
    <div className="mb-4 text-center">
      <p className="text-indigo-300 mb-2">How are you feeling today?</p>
      <div className="flex justify-center space-x-4">
        {moods.map((moodOption) => (
          <button
            key={moodOption.value}
            onClick={() => handleMoodClick(moodOption.value)}
            className={`text-3xl p-2 transition-all duration-200 transform hover:scale-110 focus:outline-none ${
              mood === moodOption.value 
                ? 'ring-4 ring-white ring-opacity-80 rounded-full bg-indigo-500 bg-opacity-30 scale-110' 
                : 'hover:bg-indigo-500 hover:bg-opacity-20 rounded-full'
            }`}
            title={moodOption.label}
            aria-label={moodOption.label}
            type="button"
          >
            {moodOption.emoji}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <p className="text-indigo-400 text-sm">
          Selected mood: {mood ? moods.find((m) => m.value === mood)?.label || 'Unknown' : 'None selected'}
        </p>
        {mood && (
          <p className="text-indigo-300 text-xs mt-1">
            Value: {mood} | {moods.find((m) => m.value === mood)?.emoji}
          </p>
        )}
      </div>
    </div>
  );
};

export default MoodSelector;