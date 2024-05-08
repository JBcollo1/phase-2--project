
import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css'; // Import your CSS file

const Home = () => {
    return (
        <div className="home-container">
            <h2>Global Insight Hub</h2>
            <h1>Welcome to Global Counties</h1>
            <p>Explore our place Learn from us and others accross the globe, share your experience with the world right here on Global Insight Hub</p>
           
            <Link to="/research"><button>Explore Countries</button></Link>
        </div>
    );
}

export default Home;



