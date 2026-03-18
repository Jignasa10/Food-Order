import express from "express";
import cors from "cors";

import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("✅ API Running...");
});

export default app;
