
import { Link } from 'react-router-dom'; 

const Home = () => {
    return (
        <div>
            
            <div className="home-container">
                <h1>Welcome to Global Counties</h1>
                <p>Explore our place</p>
                
                <Link to="/research"><button>Explore Countries</button></Link>
                
            </div>
        </div>
    );
}

export default Home;



