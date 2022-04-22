import { useEffect } from "react";

const PurchasedCart = ({ createAfterPurchaseOrder }) => {
  useEffect(() => {
    createAfterPurchaseOrder();
  }, []);

  return (
    <>
      <h1>Thank you for your purchase!</h1>
    </>
  );
};

export default PurchasedCart;
