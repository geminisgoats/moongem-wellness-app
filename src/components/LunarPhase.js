// src/components/LunarPhase.js
import React, { useEffect, useState } from 'react';
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

const zodiacSigns = [
  { name: 'Aries', emoji: '♈', start: 0, end: 30 },
  { name: 'Taurus', emoji: '♉', start: 30, end: 60 },
  { name: 'Gemini', emoji: '♊', start: 60, end: 90 },
  { name: 'Cancer', emoji: '♋', start: 90, end: 120 },
  { name: 'Leo', emoji: '♌', start: 120, end: 150 },
  { name: 'Virgo', emoji: '♍', start: 150, end: 180 },
  { name: 'Libra', emoji: '♎', start: 180, end: 210 },
  { name: 'Scorpio', emoji: '♏', start: 210, end: 240 },
  { name: 'Sagittarius', emoji: '♐', start: 240, end: 270 },
  { name: 'Capricorn', emoji: '♑', start: 270, end: 300 },
  { name: 'Aquarius', emoji: '♒', start: 300, end: 330 },
  { name: 'Pisces', emoji: '♓', start: 330, end: 360 },
];

const formatTime = (date) =>
  date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A';

const getMoonZodiacSign = (date, lat, lng) => {
  const moonPos = SunCalc.getMoonPosition(date, lat, lng);
  // Convert azimuth to ecliptic longitude approximation
  let eclipticLongitude = (moonPos.azimuth * 180 / Math.PI + 180) % 360;
  
  // Rough approximation - for more accuracy, would need full astronomical calculation
  eclipticLongitude = (eclipticLongitude + 80) % 360; // Offset adjustment
  
  const sign = zodiacSigns.find(sign => 
    eclipticLongitude >= sign.start && eclipticLongitude < sign.end
  ) || zodiacSigns[0];
  
  return sign;
};

const LunarPhase = ({ setPhaseName }) => {
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [locationStatus, setLocationStatus] = useState('getting_location');
  
  const today = new Date();
  const phaseName = Moon.lunarPhase(today);
  const moonIcon = moonIcons[phaseName] || '🌑';
  const moonIllumination = SunCalc.getMoonIllumination(today);
  const illuminationPercent = (moonIllumination.fraction * 100).toFixed(1);
  
  // Use actual location for moon times and zodiac sign
  const moonTimes = SunCalc.getMoonTimes(today, location.lat, location.lng);
  const zodiacSign = getMoonZodiacSign(today, location.lat, location.lng);

  // Get user's location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus('location_found');
        },
        (error) => {
          console.log('Location access denied, using default location');
          setLocationStatus('location_denied');
        },
        {
          timeout: 10000,
          enableHighAccuracy: true
        }
      );
    } else {
      setLocationStatus('location_not_supported');
    }
  }, []);

  useEffect(() => {
    if (setPhaseName) {
      setPhaseName(phaseName);
    }
  }, [phaseName, setPhaseName]);

  return (
    <div className="bg-indigo-700 p-6 rounded-xl shadow-md text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Today's Lunar Phase</h2>

      <div className="text-5xl mb-2">{moonIcon}</div>
      <p className="text-white text-lg font-semibold mb-1">{phaseName}</p>
      <p className="text-indigo-200 text-sm mb-4">
        Moon in {zodiacSign.name} {zodiacSign.emoji}
      </p>

      <p className="text-indigo-200 mt-2">Illumination: {illuminationPercent}%</p>
      <p className="text-indigo-200">Moonrise: {formatTime(moonTimes.rise)}</p>
      <p className="text-indigo-200">Moonset: {formatTime(moonTimes.set)}</p>
      
      {locationStatus === 'getting_location' && (
        <p className="text-indigo-300 text-xs mt-2">📍 Getting your location for accurate times...</p>
      )}
      {locationStatus === 'location_denied' && (
        <p className="text-indigo-400 text-xs mt-2">📍 Using NYC times (enable location for local times)</p>
      )}
      {locationStatus === 'location_found' && (
        <p className="text-indigo-300 text-xs mt-2">📍 Times for your location</p>
      )}
    </div>
  );
};

export default LunarPhase;