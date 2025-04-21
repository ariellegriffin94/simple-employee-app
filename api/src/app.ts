import express from "express";
import cors from "cors";
import { EmmployeeRouter } from "./router";
import { errorHandler } from "../middleware/errorHandler";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(express.json());

app.use(cors(corsOptions));

// Routes
app.use("/employee", EmmployeeRouter);

app.use(errorHandler);
// Global error handler (should be after routes)

export default app;
