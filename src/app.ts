import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app: Application = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Allow all origins if not specified
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRoutes from "./route/user.route";
import taskRoutes from "./route/task.route";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

export { app };
