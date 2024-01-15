import mongoose, { Document, Model, Schema } from "mongoose";

interface ICustomer extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
}

const schema: Schema<ICustomer> = new Schema({
  customerId: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  birthdate: { type: String },
  address: { type: String },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    // delete ret.customerId;
  },
});

export const CustomerModel: Model<ICustomer> = mongoose.model<ICustomer>("Customer", schema);

export class customerModel {
  id: string;
  customerId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;

  constructor({
    id,
    customerId,
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    address,
  }: {
    id: string;
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthdate: string;
    address: string;
  }) {
    this.id = id;
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.birthdate = birthdate;
    this.address = address;
  }
}
export class createCustomerModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;

  constructor({
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    address,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthdate: string;
    address: string;
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.birthdate = birthdate;
    this.address = address;
  }
}
// export default CustomerModel;
