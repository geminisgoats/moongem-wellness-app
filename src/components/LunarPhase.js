// src/components/LunarPhase.js
import React, { useEffect } from 'react';
import { Moon } from 'lunarphase-js';
import SunCalc from 'suncalc';

const moonIcons = {
  'New Moon': '🌑',
  'Waxing Crescent': '🌒',
  'First Quarter': '🌓',
  'Waxing Gibbous': '🌔',
  'Full Moon': '🌕',
  'Waning Gibbous': '🌖',
  'Last Quarter': '🌗',
  'Waning Crescent': '🌘',
};

const formatTime = (date) =>
  date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A';

const LunarPhase = ({ setPhaseName }) => {
  const today = new Date();
  const phaseName = Moon.lunarPhase(today);
  const moonIcon = moonIcons[phaseName] || '🌑';
  const moonIllumination = SunCalc.getMoonIllumination(today);
  const illuminationPercent = (moonIllumination.fraction * 100).toFixed(1);
  const moonTimes = SunCalc.getMoonTimes(today, 0, 0); // Using UTC position

  useEffect(() => {
    if (setPhaseName) {
      setPhaseName(phaseName);
    }
  }, [phaseName, setPhaseName]);

  return (
    <div className="bg-indigo-700 p-6 rounded-xl shadow-md text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Today’s Lunar Phase</h2>

      <div className="text-5xl mb-2">{moonIcon}</div>
      <p className="text-white text-lg font-semibold">{phaseName}</p>

      <p className="text-indigo-200 mt-2">Illumination: {illuminationPercent}%</p>
      <p className="text-indigo-200">Moonrise: {formatTime(moonTimes.rise)}</p>
      <p className="text-indigo-200">Moonset: {formatTime(moonTimes.set)}</p>
    </div>
  );
};

export default LunarPhase;
