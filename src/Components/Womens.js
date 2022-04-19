import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from ".";
import { fetchPeoducts } from "../api";

const Womens = ({}) => {
  const history = useNavigate();
  return (
    <>
      <h4>All Women's clothing</h4>
      <div>
        {Products.map((product) => {
          return <h1> {product.title}</h1>;
        })}
      </div>
    </>
  );
};
export default Womens;
