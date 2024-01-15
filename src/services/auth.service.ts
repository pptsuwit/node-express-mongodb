import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { loginModel, registerModel, refreshTokenModel, revokeTokenModel } from "../models/auth.model";
import { userModel } from "@models/user.model";
import { userDetails } from "@utils/utils";
const db = require("@config/database");

export default {
  login,
  register,
  // refreshToken,
  // revokeToken,
  // getRefreshToken,
};

async function login({ username, password, ipAddress }: loginModel) {
  const user = await db.User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error("Username or password is incorrect");
  }

  const { jwtToken, refreshToken: refresh } = generateTokens(user, ipAddress);

  return {
    ...userDetails(user),
    ...{ token: jwtToken },
    refreshToken: refresh,
  };
}

async function register({ firstName, lastName, username, password }: registerModel) {
  const user = await db.User.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: bcrypt.hashSync(password, 10),
  });

  return {
    ...userDetails(user),
  };
}

// async function refreshToken({ token, ipAddress }: refreshTokenModel) {
//   const refreshToken = await getRefreshToken(token);
//   const { user } = refreshToken;

//   refreshToken.revoked = Date.now();
//   refreshToken.revokedByIp = ipAddress;

//   const newRefreshToken = generateRefreshToken(user, ipAddress);
//   refreshToken.replacedByToken = newRefreshToken.token;

//   await refreshToken.save();
//   await newRefreshToken.save();

//   const { jwtToken, refreshToken: refresh } = generateTokens(user, ipAddress);

//   return {
//     ...userDetails(user),
//     jwtToken,
//     refreshToken: refresh,
//   };
// }

// async function revokeToken({ token, ipAddress }: revokeTokenModel) {
//   const refreshToken = await getRefreshToken(token);

//   refreshToken.revoked = Date.now();
//   refreshToken.revokedByIp = ipAddress;

//   await refreshToken.save();
// }

// async function getRefreshToken(id: string) {
//   const refreshToken = await db.RefreshToken.findOne({ user: id }).populate("user");
//   if (!refreshToken || !refreshToken) throw new Error("Invalid token x");
//   return refreshToken;
// }

function generateTokens(user: userModel, ipAddress: string) {
  const jwtToken = generateJwtToken(user);
  const refreshToken = generateRefreshToken(user, ipAddress);

  return { jwtToken, refreshToken: refreshToken.token };
}

function generateJwtToken(user: userModel) {
  const secret = process.env.SECRET_JWT_TOKEN as string;
  return jwt.sign({ id: user.id }, secret, {
    expiresIn: "3d",
  });
}

function generateRefreshToken(user: userModel, ipAddress: string) {
  return new db.RefreshToken({
    user: user.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
}

function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}
