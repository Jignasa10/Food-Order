import { useEffect, useState } from "react";
import { socket } from "../socket";


const OrderStatusPage = () => {

  const [status, setStatus] = useState("Waiting...");

  useEffect(() => {
    socket.on("orderStatusUpdated", (order) => {
      setStatus(order.status);
    });
  }, []);

  return (
    <div>
      <h2>📦 Live Order Tracking</h2>
      <h3>Status: {status}</h3>
    </div>
  );
};

export default OrderStatusPage;
