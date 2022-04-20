import { Link } from "react-router-dom";


const Navbar = ({ setToken, userData, setUserData, cartInfo }) => {
  return (
    <>
      <div id="navbar">
        <img id="nav-title" src="SickKicksLogo.png"></img>
        <div id="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/all-shoes">
            All Shoes
          </Link>
          <Link className="link" to="/boots">
            Boots
          </Link>
          <Link className="link" to="/heels">
            Heels
          </Link>
          <Link className="link" to="/sandals">
            Sandals
          </Link>
          <Link className="link" to="/sneakers">
            Sneakers
          </Link>

          <Link className="link" to={`/cart`}>
            Cart
          </Link>

          {
            <Link
              className="link"
              to="/admin"
              //hidden={userData.isAdmin ? false : true}
            >
              Admin
            </Link>
          }

          {userData ? null : (
            <Link className="link" to="/register">
              Register
            </Link>
          )}
          <Link
            className="link"
            to="/"
            hidden={userData ? false : true}
            onClick={() => {
              setUserData(null);
              setToken("");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
