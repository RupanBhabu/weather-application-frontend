import React from 'react';

const DetailedForecast = ({ city }) => {
  if (!city) {
    return <p>Select a city to see the detailed forecast.</p>;
  }

  // In a real application, you would fetch detailed forecast data here.
  // For now, we'll use placeholder data.
  const forecastData = [
    { time: '12:00', temp: '26°C', description: 'Sunny' },
    { time: '15:00', temp: '27°C', description: 'Mostly Sunny' },
    { time: '18:00', temp: '25°C', description: 'Partly Cloudy' },
    { time: '21:00', temp: '22°C', description: 'Clear' },
  ];

  return (
    <div style={{ border: '1px solid #eee', padding: '16px', marginTop: '20px' }}>
      <h3>Detailed Forecast for {city.name}</h3>
      {forecastData.map(item => (
        <div key={item.time} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>{item.time}</span>
          <span>{item.temp}</span>
          <span>{item.description}</span>
        </div>
      ))}
      {/* Placeholder for next/previous 12 hours navigation */}
    </div>
  );
};

export default DetailedForecast;
