import { Link } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = ({setUserInfo, userInfo}) => {

  if(userInfo.username) {
    return (
      <div className="navbar_main">
        <Link to="/">HOME</Link>
        <Link to="/products">SHOP ALL</Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            setUserInfo({});
          }}
        >
          LOG OUT
        </button>
        <Link to="/cart">CART</Link>
      </div> 
    );
  } else if(!userInfo.username){
      return (
        <div className="navbar_main">
          <Link to="/">HOME</Link>
          <Link to="/products">SHOP ALL</Link>
          <Link to="/register">REGISTER</Link>
          <Link to="/login">LOG IN</Link>
          <Link to="/cart">CART</Link>
        </div>
      );
  }
};

export default Navbar;
