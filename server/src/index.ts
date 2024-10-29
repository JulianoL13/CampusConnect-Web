import express, { Request, Response } from "express";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; // Usa a variável de ambiente PORT, se definida

// Rota simples para testar o servidor
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
