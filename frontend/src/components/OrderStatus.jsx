import { useEffect, useState } from "react";
import { socket } from "../socket";

const OrderStatus = () => {
  const [status, setStatus] = useState("Waiting...");

  useEffect(() => {
    socket.on("orderStatusUpdated", (order) => {
      setStatus(order.status);
    });
  }, []);

  return (
    <h2>Live Status: {status}</h2>
  );
};

export default OrderStatus;
