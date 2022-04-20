import { Link } from "react-router-dom";

const Admin = ({ products, setProducts, fetchProducts }) => {
  return (
    <>
      <h1>Admin</h1>
      <Link to="/add-shoe">
        <button>Add New Product</button>
      </Link>
    </>
  );
};

export default Admin;
