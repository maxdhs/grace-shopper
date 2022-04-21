import { Link } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar_main">
      <Link to="/">HOME</Link>
      <Link to="/products">SHOP ALL</Link>
      <Link to="/register">REGISTER</Link>
      <Link to="/login">LOG IN</Link>
      <Link to="/cart">CART</Link>
    </div>
  );
};

export default Navbar;
