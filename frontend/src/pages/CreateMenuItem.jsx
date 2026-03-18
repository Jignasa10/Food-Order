import { useState } from "react";
import axios from "axios";

import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const CreateMenuItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/menu`, formData);

      setMessage("✅ Menu Item Created Successfully!");

      // Reset Form
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
      });
    } catch (error) {
      setMessage("❌ Failed to create menu item");
      console.log(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "30px auto", padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          ➕ Create Menu Item
        </Typography>

        {message && (
          <Typography sx={{ marginBottom: 2 }}>{message}</Typography>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <TextField
            fullWidth
            label="Food Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Price */}
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Image URL */}
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Create Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateMenuItem;
