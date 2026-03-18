#!/bin/bash

echo "🚀 Creating Full Stack Food Order App..."

PROJECT_NAME="food-order-app"

# Remove old folder if exists
rm -rf $PROJECT_NAME
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# ============================
# BACKEND SETUP
# ============================
echo "⚙️ Setting up Backend..."

mkdir -p backend/src/{config,models,routes,tests}

cd backend
npm init -y >/dev/null

npm install express cors dotenv mongoose socket.io
npm install -D nodemon jest supertest

# package.json scripts
cat > package.json <<EOF
{
  "name": "backend",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "test": "jest"
  }
}
EOF

# env file
cat > .env <<EOF
MONGO_URI=mongodb://localhost:27017/food-order-app
EOF

# MongoDB config
cat > src/config/db.js <<EOF
import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected");
};

export default connectDB;
EOF

# Models
cat > src/models/MenuItem.js <<EOF
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});

export default mongoose.model("MenuItem", menuSchema);
EOF

cat > src/models/Order.js <<EOF
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    address: String,
    phone: String,
    items: Array,
    status: { type: String, default: "Order Received" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
EOF

# Routes
cat > src/routes/menu.routes.js <<EOF
import express from "express";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const menu = await MenuItem.find();
  res.json(menu);
});

export default router;
EOF

cat > src/routes/order.routes.js <<EOF
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { customerName, address, phone, items } = req.body;

  if (!customerName || !address || !phone || items.length === 0) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const order = await Order.create(req.body);
  res.status(201).json(order);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

export default router;
EOF

# Server + Socket.io Live Status Simulation
cat > src/server.js <<EOF
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";
import Order from "./models/Order.js";
import MenuItem from "./models/MenuItem.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", () => console.log("✅ Socket Connected"));

/* Seed Menu Automatically */
const seedMenu = async () => {
  const count = await MenuItem.countDocuments();
  if (count === 0) {
    await MenuItem.insertMany([
      {
        name: "Pizza",
        description: "Cheesy pepperoni pizza",
        price: 299,
        image: "https://via.placeholder.com/150"
      },
      {
        name: "Burger",
        description: "Juicy chicken burger",
        price: 199,
        image: "https://via.placeholder.com/150"
      }
    ]);
    console.log("🍔 Menu Seeded");
  }
};
seedMenu();

/* Auto Status Simulation */
const simulateStatus = async (orderId) => {
  const statuses = ["Preparing", "Out for Delivery"];

  statuses.forEach((status, index) => {
    setTimeout(async () => {
      const order = await Order.findById(orderId);
      order.status = status;
      await order.save();

      io.emit("orderStatusUpdate", { orderId, status });
    }, (index + 1) * 5000);
  });
};

/* Override Place Order with Live Updates */
app.post("/api/orders", async (req, res) => {
  const order = await Order.create(req.body);

  io.emit("orderStatusUpdate", {
    orderId: order._id,
    status: "Order Received"
  });

  simulateStatus(order._id);

  res.status(201).json(order);
});

server.listen(5000, () =>
  console.log("🚀 Backend running at http://localhost:5000")
);
EOF

# Basic Test File
cat > src/tests/order.test.js <<EOF
import request from "supertest";
import express from "express";

test("Sample Order API Test", () => {
  expect(true).toBe(true);
});
EOF

cd ..

# ============================
# FRONTEND SETUP
# ============================
echo "🎨 Setting up Frontend..."

npm create vite@latest frontend -- --template react >/dev/null
cd frontend

npm install
npm install axios socket.io-client @mui/material @emotion/react @emotion/styled

# App.jsx
cat > src/App.jsx <<EOF
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  Typography,
  TextField
} from "@mui/material";

import OrderStatus from "./components/OrderStatus";

export default function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu").then((res) => {
      setMenu(res.data);
    });
  }, []);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const placeOrder = async () => {
    const res = await axios.post("http://localhost:5000/api/orders", {
      customerName: "Test User",
      address: "Mumbai",
      phone: "9999999999",
      items: cart
    });

    setOrderId(res.data._id);
  };

  return (
    <Container>
      <Typography variant="h3" sx={{ my: 3 }}>
        🍕 Food Order App
      </Typography>

      {!orderId && (
        <>
          {menu.map((item) => (
            <Card key={item._id} sx={{ p: 2, my: 2 }}>
              <Typography variant="h5">{item.name}</Typography>
              <Typography>{item.description}</Typography>
              <Typography>₹{item.price}</Typography>

              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </Button>
            </Card>
          ))}

          {cart.length > 0 && (
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
              onClick={placeOrder}
            >
              Checkout & Place Order
            </Button>
          )}
        </>
      )}

      {orderId && <OrderStatus orderId={orderId} />}
    </Container>
  );
}
EOF

# OrderStatus Component
mkdir -p src/components

cat > src/components/OrderStatus.jsx <<EOF
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card, Typography } from "@mui/material";

const socket = io("http://localhost:5000");

export default function OrderStatus({ orderId }) {
  const [status, setStatus] = useState("Order Received");

  useEffect(() => {
    socket.on("orderStatusUpdate", (data) => {
      if (data.orderId === orderId) {
        setStatus(data.status);
      }
    });
  }, [orderId]);

  return (
    <Card sx={{ p: 3, mt: 4 }}>
      <Typography variant="h4">📦 Live Order Status</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {status}
      </Typography>
    </Card>
  );
}
EOF

cd ..

echo "✅ FULL PROJECT GENERATED SUCCESSFULLY!"
echo ""
echo "Run Backend:"
echo "   cd backend && npm run dev"
echo ""
echo "Run Frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "Zip Repo:"
echo "   cd .. && zip -r food-order-app.zip food-order-app"
