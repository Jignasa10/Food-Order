import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import io from "socket.io-client";

import { Typography, Card, CardContent } from "@mui/material";

// ✅ Connect Socket
const socket = io(import.meta.env.VITE_BACKEND_URL_S);

const OrderTrackingPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  // ✅ Fetch Order Initially
  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`
      );

      setOrder(res.data);
      setStatus(res.data.status);
    };

    fetchOrder();
  }, [id]);

  // ✅ Listen for Live Updates
  useEffect(() => {
    socket.emit("joinOrderRoom", id);

    socket.on("statusUpdated", (newStatus) => {
      console.log("🔥 Live Status:", newStatus);
      setStatus(newStatus);
    });

    return () => {
      socket.off("statusUpdated");
    };
  }, [id]);

  if (!order) return <Typography>Loading...</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" mb={3}>
        📦 Live Order Tracking
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">
            Order ID: {order._id}
          </Typography>

          <Typography variant="h5" mt={2} color="primary">
            Status: {status}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTrackingPage;
