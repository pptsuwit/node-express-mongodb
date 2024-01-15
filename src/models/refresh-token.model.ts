import mongoose, { Document, Model, Schema } from "mongoose";

interface IRefreshToken extends Document {
  user: Schema.Types.ObjectId;
  token: string;
  expires: Date;
  created: Date;
  createdByIp: string;
  revoked: Date;
  revokedByIp: string;
  replacedByToken: string;
  isExpired: boolean;
  isActive: boolean;
}

const refreshTokenSchema: Schema<IRefreshToken> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
});

refreshTokenSchema.virtual("isExpired").get(function (this: IRefreshToken) {
  return new Date() >= this.expires;
});

refreshTokenSchema.virtual("isActive").get(function (this: IRefreshToken) {
  return !this.revoked && !this.isExpired;
});

refreshTokenSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.id;
    delete ret.user;
  },
});

export const RefreshTokenModel: Model<IRefreshToken> = mongoose.model<IRefreshToken>("RefreshToken", refreshTokenSchema);

// export default RefreshTokenModel;
