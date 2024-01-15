import mongoose from "mongoose";
import { isValidId } from "@utils/utils"; // Import your utils if needed
import { UserModel as User } from "@models/user.model";
import { CustomerModel as Customer } from "@models/customer.model";
import { RefreshTokenModel as RefreshToken } from "@models/refresh-token.model";

const databaseUrl = process.env.DATABASE_URL || "";
const dbName = process.env.DATABASE_NAME || "";
mongoose.connect(`${databaseUrl}${dbName}`);
mongoose.Promise = global.Promise;
export { User, Customer, RefreshToken, isValidId };
const db = { User, Customer, RefreshToken, isValidId };
export default db;
