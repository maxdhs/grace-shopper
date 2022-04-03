import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/">Productly</Link>
      <Link to="/products">Products</Link>
    </>
  );
};

export default Navbar;
