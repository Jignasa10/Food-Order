import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  // ✅ Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Total quantity count
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <AppBar position="sticky" sx={{ background: "#ff4d4d" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* ✅ Logo / Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
        >
          🍔 Food Order App
        </Typography>

        {/* ✅ Cart Icon */}
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={totalItems} color="warning">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
