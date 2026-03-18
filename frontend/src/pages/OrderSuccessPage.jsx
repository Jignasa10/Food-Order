import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";

const OrderSuccessPage = () => {
  const { id } = useParams(); // ✅ Order ID from URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`
        );

        setOrder(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <Typography sx={{ p: 3 }}>Loading Order...</Typography>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ Success Message */}
      <Typography variant="h4" mb={2} color="green">
        🎉 Order Placed Successfully!
      </Typography>

      <Typography variant="h6" mb={3}>
        Order ID: <span style={{ color: "#ff4d4d" }}>{order._id}</span>
      </Typography>

      <Button
  fullWidth
  variant="contained"
  sx={{ mt: 2 }}
  onClick={() => navigate(`/track-order/${order._id}`)}
>
  Track Order Live 🚀
</Button>

      {/* ✅ Order Summary Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            🧾 Order Summary
          </Typography>

          {order.items.map((item, index) => (
            <div key={index}>
              <Typography>
                {item.name} × {item.quantity} = ₹
                {item.price * item.quantity}
              </Typography>
            </div>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">
            Total Amount: ₹{order.totalAmount}
          </Typography>
        </CardContent>
      </Card>

      {/* ✅ Delivery Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            🚚 Delivery Details
          </Typography>

          <Typography>Name: {order.customer.name}</Typography>
          <Typography>Phone: {order.customer.phone}</Typography>
          <Typography>Address: {order.customer.address}</Typography>
        </CardContent>
      </Card>

      {/* ✅ Buttons */}
      <Button
        component={Link}
        to="/"
        variant="contained"
        fullWidth
        sx={{ background: "#ff4d4d" }}
      >
        Back to Menu 🍕
      </Button>
    </div>
  );
};

export default OrderSuccessPage;
