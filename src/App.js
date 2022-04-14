import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  // const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   const response = await fetch("/api/products");
  //   const info = await response.json();
  //   setProducts(info);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login_register" element={<Login_Register />} />
        <Route exact path="/allshoes" element={<AllShoes />} />
        <Route exact path="/boots" element={<Boots />} />
        <Route exact path="/heels" element={<Heels />} />
        <Route exact path="/sandals" element={<Sandals />} />
        <Route exact path="/sneakers" element={<Sneakers />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
