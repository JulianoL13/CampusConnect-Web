import express, { Request, Response } from "express";
import postRoutes from "../src/routes/postRoutes";
import postComments from "../src/routes/commentsRoutes";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../src/middlewares/swagger/swagger-output.json";

dotenv.config({ path: "../.env" });
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", postRoutes);
app.use("/api", postComments);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
