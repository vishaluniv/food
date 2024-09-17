import React, { useState, useEffect } from "react";
import classes from "./paymentPage.module.css";
import { getNewOrderForCurrentUser } from "../../services/orderService";
import Title from "../../components/Title/Title";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import Map from "../../components/Map/Map";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

import Button from "../../components/Button/Button";

export default function PaymentPage() {
  const [order, setOrder] = useState();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return;

  const handleConfirm = () => {
    clearCart();
    toast.success("Order Placed Successfully", "Success");
    navigate("/");
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>
        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button text={"Confirm Order"} onClick={handleConfirm} />
          </div>
        </div>
      </div>
    </>
  );
}
