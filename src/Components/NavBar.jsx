import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          
         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
