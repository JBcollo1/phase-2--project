import React from 'react';

function CountryCard({ country }) {
  const { name, flags, capital, population, region } = country;

  return (
    <div className="country-card">
      <img src={flags.png} alt={name.common} />
      <h2>{name.common}</h2>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Region:</strong> {region}</p>
    </div>
  );
}

export default CountryCard;
