const db = require("../config/database");
import { userModel } from "../models/user.model";
import { registerModel } from "../models/auth.model";
import { userDetails as details } from "../utils/utils";
import bcrypt from "bcryptjs";
export default {
  getAll,
  getById,
  getRefreshTokens,
  deleteById,
  updateUserById,
  createUser,
  getTotalRecord,
};
async function getAll(page: number = 1, pageSize: number = 10) {
  const entity = await db.User.find()
    .sort({ _id: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const data = entity.map((entity: userModel) => {
    return details(entity);
  });
  const totalData = await countData();
  return { data, totalData };
}
async function getAllData() {
  const entity = await db.User.find();

  return entity.map((entity: userModel) => {
    return details(entity);
  });
}
async function getTotalRecord() {
  const entity = await db.User.find();
  return entity.length;
}

async function getById(id: string) {
  const entity = await getUser(id);
  return details(entity);
}

async function createUser({ firstName, lastName, username, password }: registerModel) {
  const entity = await db.User.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: bcrypt.hashSync(password, 10),
  });

  return {
    ...details(entity),
  };
}
async function updateUserById({ id, firstName, lastName, username }: userModel) {
  await updateUser({ id, firstName, lastName, username });
  const entity = await getUser(id);
  return details(entity);
}

async function deleteById(id: string) {
  const entity = await deleteUser(id);
  return details(entity);
}
async function getUser(id: string) {
  if (!db.isValidId(id)) throw new Error("User not found");
  const entity = await db.User.findById(id);
  if (!entity) throw new Error("User not found");
  return entity;
}

async function getRefreshTokens(id: string) {
  await getUser(id);

  const refreshTokens = await db.RefreshToken.find({ entity: id });
  return refreshTokens;
}

async function updateUser({ id, firstName, lastName, username }: userModel) {
  if (!db.isValidId(id)) throw new Error("User not found");
  const entity = await db.User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    username,
  });
  if (!entity) throw new Error("User not found");
  return entity;
}

async function deleteUser(id: string) {
  if (!db.isValidId(id)) throw new Error("User not found");
  const entity = await db.User.findByIdAndDelete(id);
  if (!entity) throw new Error("User not found");
  return entity;
}

async function countData() {
  return await db.User.count({});
}
