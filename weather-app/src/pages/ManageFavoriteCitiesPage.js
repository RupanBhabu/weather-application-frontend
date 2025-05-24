import React, { useState, useEffect } from 'react';

// FavoriteCityRow component (no changes)
const FavoriteCityRow = ({ city, onRemove }) => (
  <tr style={{borderBottom: '1px solid #eee'}}>
    <td style={{padding: '8px'}}>{city.name}</td>
    <td style={{padding: '8px'}}>{city.country}</td>
    <td style={{padding: '8px'}}>{city.lat || 'N/A'}</td>
    <td style={{padding: '8px'}}>{city.lon || 'N/A'}</td>
    <td style={{padding: '8px'}}>
      <button onClick={() => onRemove(city.id)}>Remove</button>
    </td>
  </tr>
);

const ManageFavoriteCitiesPage = () => {
  // All favorite cities (would be fetched once, or page by page from backend)
  const [allFavoriteCities, setAllFavoriteCities] = useState([
    { id: 101, name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
    { id: 102, name: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 },
    { id: 103, name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 },
    { id: 104, name: 'Rome', country: 'IT', lat: 43.2134, lon: 11.3455 },
    { id: 105, name: 'Amsterdam', country: 'NL', lat: 52.3676, lon: 4.9041 },
    { id: 106, name: 'Vienna', country: 'AT', lat: 48.2082, lon: 16.3738 },
    { id: 107, name: 'Prague', country: 'CZ', lat: 50.0755, lon: 14.4378 }
  ]);
  // State for currently displayed (paginated) cities
  const [displayedFavoriteCities, setDisplayedFavoriteCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Or any number of your choice

  const [user, setUser] = useState({ id: 'testUser123', name: 'Test User' }); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Effect to update displayed cities when allFavoriteCities, currentPage, or pageSize changes
  useEffect(() => {
    if (user) {
      // Simulate API call: /favorite-cities/:userId/:currentPage/:pageSize
      console.log(`Simulating fetch for page: ${currentPage}, size: ${pageSize}`);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setDisplayedFavoriteCities(allFavoriteCities.slice(startIndex, endIndex));
    }
  }, [user, allFavoriteCities, currentPage, pageSize]);

  const handleRemoveCity = (cityId) => {
    console.log('Removing city:', cityId);
    // Remove from the main list
    setAllFavoriteCities(prevCities => prevCities.filter(city => city.id !== cityId));
    // API call: DELETE /api/favorite-cities/:userId/:cityId
    // The useEffect will then update the displayedFavoriteCities.
    // If the current page becomes empty after deletion, and it's not page 1, navigate to prev page.
    if (displayedFavoriteCities.length === 1 && currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      console.log('Searching for:', e.target.value);
      setSearchResults([
        { id: Date.now(), name: e.target.value + ' Option 1', country: 'XY', lat: 1, lon: 1, isNew: true },
        { id: Date.now() + 1, name: e.target.value + ' Option 2', country: 'XZ', lat: 2, lon: 2, isNew: true },
      ]);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddCity = (cityToAdd) => {
    console.log('Adding city:', cityToAdd);
    if (!allFavoriteCities.find(city => city.name === cityToAdd.name && city.country === cityToAdd.country)) { // Simple check by name/country for demo
      // Add to top of the main list
      const newCity = { ...cityToAdd, id: cityToAdd.id || Date.now() }; // Ensure ID
      setAllFavoriteCities(prevCities => [newCity, ...prevCities]);
      // API call: POST /api/favorite-cities/:userId with cityToAdd data
      // After adding, go to page 1 to see the new city
      setCurrentPage(1); 
    } else {
      alert(cityToAdd.name + " is already in your favorites.");
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  const totalPages = Math.ceil(allFavoriteCities.length / pageSize);

  if (!user) {
    return <p>Please log in to manage your favorite cities.</p>;
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>Manage Favorite Cities</h1>
      
      <section style={{marginBottom: '20px', padding: '15px', border: '1px solid #ddd'}}>
        <h2>Add New Favorite City</h2>
        <input 
          type="text"
          placeholder="Enter city name..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{width: '300px', padding: '8px'}}
        />
        {searchResults.length > 0 && (
          <ul style={{listStyleType: 'none', paddingLeft: 0, border: '1px solid #eee', marginTop: '5px'}}>
            {searchResults.map(city => (
              <li 
                key={city.id} 
                onClick={() => handleAddCity(city)}
                style={{padding: '8px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0'}}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Your Saved Favorites ({allFavoriteCities.length})</h2>
        {displayedFavoriteCities.length > 0 ? (
          <>
            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '10px'}}>
              <thead>
                <tr style={{backgroundColor: '#f0f0f0'}}>
                  <th style={{padding: '8px', textAlign: 'left'}}>Name</th>
                  <th style={{padding: '8px', textAlign: 'left'}}>Country</th>
                  <th style={{padding: '8px', textAlign: 'left'}}>Latitude</th>
                  <th style={{padding: '8px', textAlign: 'left'}}>Longitude</th>
                  <th style={{padding: '8px', textAlign: 'left'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedFavoriteCities.map(city => (
                  <FavoriteCityRow 
                    key={city.id} 
                    city={city} 
                    onRemove={handleRemoveCity} 
                  />
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{textAlign: 'center', marginTop: '20px'}}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span style={{margin: '0 10px'}}>
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p>You haven't added any favorite cities yet.</p>
        )}
      </section>
    </div>
  );
};

export default ManageFavoriteCitiesPage;
