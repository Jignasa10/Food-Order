import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/cartSlice";

import {
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  console.log("Cart Items:", cartItems);

  // Total Price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">🛒 Your Cart</Typography>

      {cartItems.length === 0 && (
        <Typography sx={{ marginTop: 2 }}>
          Cart is empty 😢
        </Typography>
      )}

      {cartItems.map((item) => (
        <Card key={item._id} sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>

            <Typography>
              Price: ₹{item.price}
            </Typography>

            <Typography>
              Quantity: {item.quantity}
            </Typography>

            {/* Quantity Controls */}
            <Button
              onClick={() => dispatch(decreaseQty(item._id))}
            >
              ➖
            </Button>

            <Button
              onClick={() => dispatch(increaseQty(item._id))}
            >
              ➕
            </Button>

            {/* Remove */}
            <Button
              color="error"
              onClick={() => dispatch(removeFromCart(item._id))}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Total */}
      {cartItems.length > 0 && (
        <Typography variant="h5" sx={{ marginTop: 3 }}>
          Total: ₹{total}
        </Typography>
      )}
       {/* Checkout */}
      {cartItems.length > 0 && (
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, background: "#ff4d4d" }}
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </Button>
      )}

    </div>
  );
};

export default CartPage;
