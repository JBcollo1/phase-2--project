
import React from 'react';
import { Link } from 'react-router-dom';
import './CountryCard.css'


function CountryCard({ country }) {
  const { name, flags, capital, population, region } = country;

  return (
    <div className="country-card-1">
          <Link to={`/country/${country.name.common}`} key={country.name.common}>
          <img src={flags.png} alt={name.common} />
     </Link>
      
      <h2>{name.common}</h2>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Region:</strong> {region}</p>
  
    </div>
  );
}

export default CountryCard;
