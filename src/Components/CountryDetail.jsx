
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState({});

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => response.json())
      .then(data => setCountry(data[0])) // Assuming the API returns an array with one object for the country
      .catch(error => console.error('Error fetching country:', error));
  }, [name]);

  const { name: countryName, flags, capital, population, region } = country;

  return (
    <div className="country-card">
      <img src={flags?.png} alt={countryName?.common} />
      <h2>{countryName?.common}</h2>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population?.toLocaleString()}</p>
      <p><strong>Region:</strong> {region}</p>
      <Link to={"/"}>Back</Link>
    </div>
  );
};

export default CountryDetail;
