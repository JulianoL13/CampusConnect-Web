import express, { Request, Response } from "express";
import postRoutes from "../src/routes/postRoutes";
import postComments from "../src/routes/commentsRoutes";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api", postRoutes);
app.use("/api", postComments);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
