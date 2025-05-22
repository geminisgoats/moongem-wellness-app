// src/components/LunarNotes.js
import React, { useState } from 'react';
import MoodSelector from './MoodSelector';

const LunarNotes = ({ phaseName, setSavedNotes }) => {
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('');

  const handleSaveNote = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const newEntry = {
      date: today,
      phase: phaseName,
      mood,
      note,
    };

    const storedNotes = JSON.parse(localStorage.getItem('lunarNotes')) || [];
    const updatedNotes = [...storedNotes, newEntry];
    localStorage.setItem('lunarNotes', JSON.stringify(updatedNotes));

    if (setSavedNotes) {
      setSavedNotes(updatedNotes); // Keep state in sync
    }

    setNote('');
    setMood('');
    alert('Note saved!');
  };

  return (
    <div className="bg-indigo-600 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Save Your Mood</h2>
      <MoodSelector mood={mood} setMood={setMood} />

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your ritual, experience, or reflection..."
        className="w-full mt-4 p-3 rounded-lg text-black"
        rows={4}
      />

      <button
        onClick={handleSaveNote}
        className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow-md"
      >
        Save Note
      </button>
    </div>
  );
};

export default LunarNotes;