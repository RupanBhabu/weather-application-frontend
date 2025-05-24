import React from 'react';

const WeatherCard = ({ city }) => {
  // In a real application, you would fetch weather data for the city here.
  // For now, we'll use placeholder data.
  const weatherData = {
    temperature: '25°C',
    description: 'Sunny',
    icon: '☀️', // Placeholder icon
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '8px', width: '200px' }}>
      <h3>{city.name}</h3>
      <p>Country: {city.country}</p>
      <p>Temperature: {weatherData.temperature}</p>
      <p>Weather: {weatherData.description} {weatherData.icon}</p>
    </div>
  );
};

export default WeatherCard;
