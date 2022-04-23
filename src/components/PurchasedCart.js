import { useEffect } from "react";

const PurchasedCart = ({ createAfterPurchaseOrder, checkUser }) => {
  useEffect(() => {
    createAfterPurchaseOrder();
    checkUser();
  }, []);

  return (
    <>
      <h1>Thank you for your purchase!</h1>
    </>
  );
};

export default PurchasedCart;
