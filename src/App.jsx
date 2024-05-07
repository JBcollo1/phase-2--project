
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Research from './Components/Research';
import CountryDetail from './Components/CountryDetail';
import Navbar from './Components/NavBar'
import Home from './pages/Home'
import FeedbackForm from './Components/FeedbackForm';
import './App.css'

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
     <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/feedback' element={<FeedbackForm />}/>
        <Route path="/research" element={<Research countries={countries} />} />
        <Route path="/country/:name" element={<CountryDetail countries={countries} />} />
      </Routes>

    </div>
  );
}

export default App;
