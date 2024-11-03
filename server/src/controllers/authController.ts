import { Request, Response } from "express";
import * as authService from "../services/userService/authService";

export async function register(req: Request, res: Response) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: "Usuário registrado com sucesso", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    res.status(201).json({ message: "Login bem-sucedido" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
