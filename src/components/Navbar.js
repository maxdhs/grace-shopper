import { Link } from "react-router-dom";

const Navbar = ({ setToken, userData, setUserData }) => {
  return (
    <>
      <div id="navbar">
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
    </>
  );
};

export default Navbar;
