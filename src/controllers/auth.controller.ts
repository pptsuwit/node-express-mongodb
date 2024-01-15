import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import validateRequest from "@middlewares/validate-request";
import { authorize } from "@middlewares/authorize";
import service from "@services/auth.service";

const router = express.Router();

// routes
// router.post("/revoke-token", authorize, revokeTokenSchema, revokeToken);
// router.post("/refresh-token", refreshToken);
// router.post("/refresh-tokens", authorize, getRefreshTokens);

router.post("/login", loginSchema, login);
router.post("/register", registerSchema, register);

export default router;

function registerSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, res, next, schema);
}

function loginSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, res, next, schema);
}

async function login(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  const ipAddress = req.ip as string;
  try {
    const { refreshToken, ...user } = await service.login({ username, password, ipAddress });
    setTokenCookie(res, refreshToken);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, username, password } = req.body;
  try {
    const user = await service.register({ firstName, lastName, username, password });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

// async function refreshToken(req: Request, res: Response, next: NextFunction) {
//   const token = req.cookies.refreshToken;
//   const ipAddress = req.ip;
//   try {
//     const { refreshToken, ...user } = await service.refreshToken({ token, ipAddress });
//     setTokenCookie(res, refreshToken);
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// }

// function revokeTokenSchema(req: Request, res: Response, next: NextFunction) {
//   const schema = Joi.object({
//     token: Joi.string().empty(""),
//   });
//   validateRequest(req, res, next, schema);
// }

// async function revokeToken(req: Request, res: Response, next: NextFunction) {
//   const token = req.body.token || req.cookies.refreshToken;
//   const ipAddress = req.ip;

//   if (!token) return res.status(400).json({ message: "Token is required" });

//   // if (!req.user?.ownsToken(token)) {
//   //   return res.status(401).json({ message: "Unauthorized" });
//   // }

//   try {
//     await service.revokeToken({ token, ipAddress });
//     res.json({ message: "Token revoked" });
//   } catch (error) {
//     next(error);
//   }
// }

// async function getRefreshTokens(req: Request, res: Response, next: NextFunction) {
//   try {
//     const tokens = await service.getRefreshToken(req.body.id);
//     tokens ? res.json(tokens) : res.sendStatus(404);
//   } catch (error) {
//     next(error);
//   }
// }

function setTokenCookie(res: Response, token: string) {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
}
