import errorHandler from "./errorHandler";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({
    message: "Backend is working!",
  });
});

app.use("/api/auth", authRoutes);

// Central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});