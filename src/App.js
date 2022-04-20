import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Meat, Home, Navbar } from "./components";

const App = () => {
  const [meats, setMeat] = useState([]);
  const [cow, setCow] = useState([]);
  const [gnarwall, setGnarwall] = useState([]);
  const [bison, setBison] = useState([]);

  const fetchMeat = async () => {
    const resp = await fetch(`api/meats`);

    const info = await resp.json();

    setMeat(info);
  };

  useEffect(() => {
    fetchMeat();
  }, []);

  return (
    <div id="container">
      <Navbar />
      <div id="main-section">
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route
            exact
            path="/meat"
            element={<Meat meats={(meats, cow, gnarwall, bison)} />}
          />
        </Routes>
      </div>
    </div>
  );
};
export default App;
