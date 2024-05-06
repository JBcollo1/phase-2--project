import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Research from './pages/Research';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Research countries={countries} />} />
      </Routes>
    </div>
  );
}

export default App;
