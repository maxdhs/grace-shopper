import { Link } from "react-router-dom";

const Navbar = ({ setToken, userData, setUserData }) => {
  return (
    <>
      <div id="navbar">
        <h1 id="nav-title">Sick Kicks</h1>
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
          {userData ? (
            <Link className="link" to="/my-orders">
              My Orders
            </Link>
          ) : (
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
