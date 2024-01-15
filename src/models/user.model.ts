import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export class userModel {
  id: string;
  firstName: string;
  lastName: string;
  username: string;

  constructor({ id, firstName, lastName, username }: { id: string; firstName: string; lastName: string; username: string }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
  }
}
// export default UserModel;
