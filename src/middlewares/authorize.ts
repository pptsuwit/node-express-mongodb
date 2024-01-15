import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const db = require("../config/database");
export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const secret = process.env.SECRET_JWT_TOKEN || "";
    const decoded = jwt.verify(token, secret) as { id: string };
    const user = await db.User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const refreshTokens = await db.RefreshToken.find({ user: user._id });
    // req.user!.ownsToken = (token: string) => !!refreshTokens.find((x: any) => x.token === token);
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    }
    next(error);
  }
  // try {
  //   // Verify the token
  //   const secret = process.env.SECRET_JWT_TOKEN || "";
  //   const decoded = jwt.verify(token, secret) as { id: string };
  //   // Attach the user ID to the request for further use
  //   // req.id = decoded.id;

  //   // Proceed to the next middleware
  //   next();
  // } catch (error) {
  //   return res.status(403).json({ message: "Access denied. Invalid token." });
  // }
};

// function authorize(): RequestHandler[] {
//   return [
//     jwt({ secret: process.env.SECRET_JWT_TOKEN, algorithms: ["HS256"] }),

//     async (req: Request, res: Response, next: NextFunction) => {
//       // try {
//       //   const user = await db.User.findById(req.user?.id);
//       //   if (!user) {
//       //     return res.status(401).json({ message: "Unauthorized" });
//       //   }
//       //   const refreshTokens = await db.RefreshToken.find({ user: user._id });
//       //   req.user!.ownsToken = (token: string) => !!refreshTokens.find((x: any) => x.token === token);
//       next();
//       // } catch (error) {
//       //   next(error);
//       // }
//     },
//   ];
// }

// export default authorize;
