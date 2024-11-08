import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export class AuthMiddleware {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET!;
  }

  public authenticateToken: RequestHandler = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Access denied, token missing" });
      return;
    }

    try {
      const decoded = jwt.verify(token, this.secret);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ error: "Invalid token" });
      return;
    }
  };
}
