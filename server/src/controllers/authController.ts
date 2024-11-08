import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/userService/authService";

type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any> | any;

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register: ExpressHandler = async (req, res) => {
    try {
      const user = await this.authService.register(req.body);
      return res.status(201).json({
        message: "User  registered successfully",
        user,
      });
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "Error registering user",
      });
    }
  };

  public login: ExpressHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.authService.login(email, password);
      return res.status(200).json({
        message: "Login successful",
        user,
        token,
      });
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Error logging in",
      });
    }
  };

  public protectedRoute: ExpressHandler = (req, res) => {
    try {
      const user = this.extractUserFromRequest(req);
      return res.status(200).json({
        message: "Protected content",
        user,
      });
    } catch (error) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
  };

  private extractUserFromRequest(req: Request): any {
    const user = (req as any).user;
    if (!user) {
      throw new Error("User  not found in the request");
    }
    return user;
  }
}
