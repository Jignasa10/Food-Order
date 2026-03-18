import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";

import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // ✅ Total Price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        customer,
        items: cartItems,
        totalAmount: totalPrice,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/orders`,
        orderData
      );

      alert("✅ Order Placed Successfully!");

      // ✅ Clear Cart
      dispatch(clearCart());

      // ✅ Redirect
      navigate(`/order-success/${res.data.order._id}`);
    } catch (error) {
      console.log(error);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" mb={3}>
        🧾 Checkout
      </Typography>

      {/* ✅ Customer Form */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Delivery Details</Typography>

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />

          <TextField
            fullWidth
            label="Address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      {/* ✅ Order Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Order Summary</Typography>

          {cartItems.map((item) => (
            <Typography key={item._id}>
              {item.name} × {item.quantity} = ₹
              {item.price * item.quantity}
            </Typography>
          ))}

          <Typography variant="h6" mt={2}>
            Total: ₹{totalPrice}
          </Typography>
        </CardContent>
      </Card>

      {/* ✅ Place Order Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{ background: "#ff4d4d" }}
        onClick={handlePlaceOrder}
      >
        Place Order 🚀
      </Button>
    </div>
  );
};

export default CheckoutPage;
