import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import DetailedForecast from '../components/DetailedForecast';
import UomSettings from '../components/UomSettings';
import LanguageSettings from '../components/LanguageSettings';
import GoogleSignInButton from '../components/GoogleSignInButton';

const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [uom, setUom] = useState('metric');
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null); 
  const [favoriteCities, setFavoriteCities] = useState([]); 
  const [favouritesPageSize, setFavouritesPageSize] = useState(8); 
  // Add state for current page number for favorites
  const [favouritesCurrentPage, setFavouritesCurrentPage] = useState(1); 

  const popularCities = [ 
    { id: 1, name: 'London', country: 'GB', isPopular: true },
    { id: 2, name: 'New York', country: 'US', isPopular: true },
    { id: 3, name: 'Tokyo', country: 'JP', isPopular: true },
  ];
  const userFavoriteCitiesData = [ // Ensure this has enough data
    { id: 101, name: 'Paris', country: 'FR', isFavorite: true },
    { id: 102, name: 'Berlin', country: 'DE', isFavorite: true },
    { id: 103, name: 'Madrid', country: 'ES', isFavorite: true },
    { id: 104, name: 'Rome', country: 'IT', isFavorite: true },
    { id: 105, name: 'Amsterdam', country: 'NL', isFavorite: true },
    { id: 106, name: 'Vienna', country: 'AT', isFavorite: true },
    { id: 107, name: 'Prague', country: 'CZ', isFavorite: true },
    { id: 108, name: 'Lisbon', country: 'PT', isFavorite: true },
    { id: 109, name: 'Dublin', country: 'IE', isFavorite: true },
    { id: 110, name: 'Brussels', country: 'BE', isFavorite: true },
    { id: 111, name: 'Copenhagen', country: 'DK', isFavorite: true },
    { id: 112, name: 'Stockholm', country: 'SE', isFavorite: true },
    { id: 113, name: 'Oslo', country: 'NO', isFavorite: true },
    { id: 114, name: 'Helsinki', country: 'FI', isFavorite: true },
    { id: 115, name: 'Warsaw', country: 'PL', isFavorite: true },
    { id: 116, name: 'Budapest', country: 'HU', isFavorite: true },
  ];

  useEffect(() => {
    if (user) {
      // Calculate the number of cities to display based on current page and page size
      const startIndex = 0; // For "View More", we always start from the beginning
      const endIndex = favouritesCurrentPage * favouritesPageSize;
      console.log(`Fetching favorite cities for user: ${user.name}, Page: ${favouritesCurrentPage}, PageSize: ${favouritesPageSize}, Total: ${endIndex}`);
      setFavoriteCities(userFavoriteCitiesData.slice(startIndex, endIndex));
    } else {
      setFavoriteCities([]);
      setFavouritesCurrentPage(1); // Reset page number on logout
    }
  }, [user, favouritesPageSize, favouritesCurrentPage]); // Re-run on these changes

  const handleCitySelect = (city) => { setSelectedCity(city); };
  const handleUomChange = (newUom) => { setUom(newUom); console.log('UOM changed to:', newUom);};
  const handleLanguageChange = (newLang) => { setLanguage(newLang); console.log('Language changed to:', newLang);};

  const handleSignIn = () => {
    setUser({ name: 'Test User', email: 'test@example.com' }); 
    setFavouritesPageSize(8); 
    setFavouritesCurrentPage(1); // Reset to page 1 on new sign-in
  };

  const handleSignOut = () => {
    setUser(null);
    setSelectedCity(null);
    setFavouritesPageSize(8);
    setFavouritesCurrentPage(1); // Reset page number on sign out
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setFavouritesPageSize(newSize);
    setFavouritesCurrentPage(1); // Reset to page 1 when page size changes
  };

  const handleViewMore = () => {
    setFavouritesCurrentPage(prevPage => prevPage + 1);
    // The useEffect will handle updating the favoriteCities list
  };

  const pageSizeOptions = [3, 4, 6, 8, 9, 12];
  const canViewMore = userFavoriteCitiesData.length > favoriteCities.length;

  return (
    <div>
      <h1>Home Page</h1>

      <section style={{ padding: '10px', border: '1px solid #ddd', margin: '10px 0', backgroundColor: '#f9f9f9' }}>
        {!user ? (
          <GoogleSignInButton onSignIn={handleSignIn} />
        ) : (
          <div>
            <h3>User Details</h3>
            <p>Welcome, <strong>{user.name}</strong> ({user.email})!</p>
            <button onClick={handleSignOut} style={{marginTop: '10px'}}>Sign Out</button>
            {/* Add Navigation Button to Manage Favorite Cities */}
            <button 
              onClick={() => console.log('Navigate to Manage Favorite Cities page...')} 
              style={{marginLeft: '10px', marginTop: '10px'}}
            >
              Manage Favorite Cities
            </button>
          </div>
        )}
      </section>

      {user ? (
        <section>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>Your Favorite Cities</h2>
            <div>
              <label htmlFor="pageSizeSelect" style={{marginRight: '8px'}}>Cities per page:</label>
              <select 
                id="pageSizeSelect" 
                value={favouritesPageSize} 
                onChange={handlePageSizeChange}
              >
                {pageSizeOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          
          {favoriteCities.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
              {favoriteCities.map(city => (
                <div key={city.id} onClick={() => handleCitySelect(city)} style={{ cursor: 'pointer' }}>
                  <WeatherCard city={city} />
                </div>
              ))}
            </div>
          ) : (
            <p>No favorite cities to display. Add some in "Manage Favorite Cities"!</p>
          )}
          
          {canViewMore && (
             <button onClick={handleViewMore} style={{marginTop: '20px', display: 'block', width: '100%'}}>
               View More ({userFavoriteCitiesData.length - favoriteCities.length} remaining)
             </button>
          )}
        </section>
      ) : (
        <section>
          <h2>Popular Cities</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {popularCities.map(city => (
              <div key={city.id} onClick={() => handleCitySelect(city)} style={{ cursor: 'pointer' }}>
                <WeatherCard city={city} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section><DetailedForecast city={selectedCity} /></section>
      <section><UomSettings currentUom={uom} onUomChange={handleUomChange} /></section>
      <section><LanguageSettings currentLang={language} onLangChange={handleLanguageChange} /></section>
    </div>
  );
};

export default HomePage;
