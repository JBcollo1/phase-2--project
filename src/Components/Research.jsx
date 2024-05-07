

import { useState } from 'react';
import CountryCard from './CountryCard';

function Research({ countries }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        className='search-bar'
        type="text"
        placeholder="Search Country..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <div className="country-list">
        {filteredCountries.map(country => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Research