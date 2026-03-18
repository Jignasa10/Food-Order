import { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);

  // ✅ Add dispatch here (inside component)
  const dispatch = useDispatch();

  // Fetch menu from backend
  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/menu`
      );

      setMenuItems(res.data);
    };

    fetchMenu();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🍕 Food Menu</h2>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="180"
            image={item.image}
            alt={item.name}
          />

          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography>{item.description}</Typography>
            <Typography>₹{item.price}</Typography>

            {/* ✅ Dispatch action on button click */}
            
            <Button
  variant="contained"
  onClick={() => {
    console.log("Clicked:", item);
    dispatch(addToCart(item));
    console.log("Dispatched AddToCart");
  }}
>
  Add to Cart
</Button>
          </CardContent>
          </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MenuPage;
