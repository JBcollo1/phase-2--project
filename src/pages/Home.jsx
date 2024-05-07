import Navbar from './Navbar'; 
import { Link } from 'react-router-dom'; 

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <h1>Welcome to Global Counties</h1>
                <p>Explore our platform to learn more about countries from around the globe, their diverse cultures, traditions, and landmarks.</p>
                <Link to="/countries">Explore Countries</Link>
            </div>
        </div>
    );
}

export default Home;



