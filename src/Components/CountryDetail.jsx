import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        return response.json();
      })
      .then(data => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [name]);

  return (
    <div className="country-card">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <img src={country.flags?.png} alt={country.name?.common} />
          <h2>{country.name?.common}</h2>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p>
            <strong>Currencies:</strong> {country.currencies && Object.values(country.currencies).map(currency => currency.name).join(', ')}
          </p>
          <p>
            <strong>Symbol:</strong> {country.currencies && Object.values(country.currencies).map(currency => currency.symbol).join(', ')}
          </p>
          <Link to={"/research"}>Back</Link>
        </>
      )}
    </div>
  );
};

export default CountryDetail;
