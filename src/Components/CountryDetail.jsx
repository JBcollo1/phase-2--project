import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./countryDetail.css"

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
    <div className="country-card-2">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="country-details">
          <img src={country.flags?.png} alt={country.name?.common} className="country-flag" />
          <div className="country-info">
            <h2>{country.name?.official}</h2>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Sub-Region:</strong> {country.subregion?.toLocaleString()}</p>
            <p><strong>Languages:</strong> {country.languages && Object.values(country.languages).join(', ')}</p>
            <p><strong>Area:</strong> {country.area?.toLocaleString()} sq km</p>
            <p><strong>Currencies:</strong> {country.currencies && Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
            <p><strong>Symbol:</strong> {country.currencies && Object.values(country.currencies).map(currency => currency.symbol).join(', ')}</p>
            <p><strong>Google Maps:</strong> <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">View Land Maps</a></p>
            <p><strong>Street Maps:</strong> <a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer">View Street Maps</a></p>
            <p><strong>Member in the UN:</strong> {country.unMember?.toLocaleString()}</p>
            <p><strong>Landlocked:</strong> {country.landlocked?.toLocaleString()}</p>
            {country.flags && country.flags.alt ? (
            <p><strong>Flag description:</strong> {country.flags.alt}</p>
             ) : (
             <p>Flag description for this country is not available</p>
             )}

            <Link to={"/research"} className="back-link">Back</Link>
          </div>
            {country.coatOfArms && country.coatOfArms.svg ? (
            <div className="coat-of-arms">
            <img src={country.coatOfArms.svg} alt="Coat of Arms" />
            </div>
            ) : (
          <p>Coat of Arms for this region is not present</p>
          )}

        </div>
      )}
    </div>
  );
};

export default CountryDetail;
