import React from 'react';

const UomSettings = ({ currentUom, onUomChange }) => {
  const uomSchemes = [
    { id: 'standard', name: 'Standard (K, m/s)' },
    { id: 'metric', name: 'Metric (°C, m/s)' },
    { id: 'imperial', name: 'Imperial (°F, mph)' },
  ];

  return (
    <div style={{ border: '1px solid #eee', padding: '16px', marginTop: '20px' }}>
      <h4>Settings: Units of Measurement</h4>
      <select value={currentUom} onChange={(e) => onUomChange(e.target.value)}>
        {uomSchemes.map(scheme => (
          <option key={scheme.id} value={scheme.id}>
            {scheme.name}
          </option>
        ))}
      </select>
      {/* Information card for UOM can be added here later */}
      <p style={{fontSize: '0.8em', marginTop: '10px'}}>
        Selected: {uomSchemes.find(s => s.id === currentUom)?.name || 'Metric'}
      </p>
    </div>
  );
};

export default UomSettings;
