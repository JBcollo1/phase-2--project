
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const CountryDetail = () => {
//   const { name } = useParams();
//   const [country, setCountry] = useState({});

//   useEffect(() => {
//     fetch(`https://restcountries.com/v3.1/name/${name}`)
//       .then(response => response.json())
//       .then(data => setCountry(data[0])) 
//       .catch(error => console.error('Error fetching country:', error));
//   }, [name]);

//   const { name: countryName, flags, capital, population, region, currencies } = country;

//   return (
//     <div className="country-card">
//       <img src={flags?.png} alt={countryName?.common} />
//       <h2>{countryName?.common}</h2>
//       <p><strong>Capital:</strong> {capital}</p>
//       <p><strong>Population:</strong> {population?.toLocaleString()}</p>
//       <p><strong>Region:</strong> {region}</p>
//       <p><strong>Currencies:</strong> {Object.values(currencies).map(currency => currency.name).join(', ')}</p>
//       {/* <p><strong>Currency💲:</strong> {currencies}</p> */}
//       <Link to={"/"}>Back</Link>
//     </div>
//   );
// };

// export default CountryDetail;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError('Country not found');
        }
      })
      .catch(error => {
        console.error('Error fetching country:', error);
        setError('Error fetching country data');
      })
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="country-card">
      <img src={country.flags?.png} alt={country.name?.common} />
      <h2>{country.name?.common}</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p>
        <div> <strong>Currencies:</strong> {country.currencies && Object.values(country.currencies).map(currency => currency.name).join(', ')}</div>
       
      <div> <strong>Symbol:</strong> {country.currencies && Object.values(country.currencies).map(currency => currency.symbol).join(', ')}</div>
      </p>
      <Link to={"/"}>Back</Link>
    </div>
  );
};

export default CountryDetail;
