
import React from 'react';
import { Link } from 'react-router-dom';

function CountryCard({ country }) {
  const { name, flags, capital, population, region } = country;

  return (
    <div className="country-card">
      <img src={flags.png} alt={name.common} />
      <h2>{name.common}</h2>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Region:</strong> {region}</p>
      <Link to={`/country/${country.name.common}`} key={country.name.common}>
     more
  </Link>
    </div>
  );
}

export default CountryCard;
