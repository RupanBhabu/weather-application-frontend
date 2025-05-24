import React from 'react';

const LanguageSettings = ({ currentLang, onLangChange }) => {
  // Placeholder for languages - OpenWeather supports many
  const languages = [
    { id: 'en', name: 'English' },
    { id: 'es', name: 'Español' },
    { id: 'fr', name: 'Français' },
  ];

  return (
    <div style={{ border: '1px solid #eee', padding: '16px', marginTop: '20px' }}>
      <h4>Settings: Language (Optional)</h4>
      <select value={currentLang} onChange={(e) => onLangChange(e.target.value)}>
        {languages.map(lang => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
       <p style={{fontSize: '0.8em', marginTop: '10px'}}>
        Selected: {languages.find(l => l.id === currentLang)?.name || 'English'}
      </p>
    </div>
  );
};

export default LanguageSettings;
