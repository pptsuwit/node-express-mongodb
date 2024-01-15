import "dotenv/config";
import mongoose from "mongoose";
const databseUrl = process.env.DATABASE_SEED_URL || "";

import { UserModel } from "../src/models/user.model";
export class mockModel {
  firstName: string;
  lastName: string;
  username: string;
  password: string;

  constructor({ firstName, lastName, username, password }: { firstName: string; lastName: string; username: string; password: string }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}
const mockData: mockModel[] = [
  {
    firstName: "test",
    lastName: "test",
    username: "test01@test.com",
    password: "$2a$10$641fgGqTRKYaWa801D7aMuV3dl6k3Qu1eSLrbHvfhrUvkPrnlEXFy", //test1234
  },
  {
    firstName: "test2",
    lastName: "test2",
    username: "test02@test.com",
    password: "$2a$10$641fgGqTRKYaWa801D7aMuV3dl6k3Qu1eSLrbHvfhrUvkPrnlEXFy", //test1234
  },
];
export async function dropData(): Promise<void> {
  try {
    await UserModel.deleteMany({});
    console.log("Documents deleted");
  } catch (error) {
    console.error("Error dropping database:", error);
  }
}

export async function seedData(data: mockModel[]): Promise<void> {
  try {
    const result = await UserModel.insertMany(data);
    console.log(`${result.length} documents inserted`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

export async function seedUser() {
  try {
    await mongoose.connect(databseUrl);
    console.log("Connected to database");

    await dropData();
    await seedData(mockData);
  } catch (error) {
    throw error;
  }
}
