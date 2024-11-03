import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
