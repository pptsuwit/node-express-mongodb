const mongoose = require("mongoose");
import { isValidId, userDetails } from "../../src/utils/utils"; // Replace with actual module path
import { userModel } from "../../src/models/user.model";

describe("isValidId function", () => {
  it("should return true for a valid ObjectId", () => {
    const validId = new mongoose.Types.ObjectId().toHexString();
    const result = isValidId(validId);
    expect(result).toBe(true);
  });

  it("should return false for an invalid ObjectId", () => {
    const invalidId = "invalid-id";
    const result = isValidId(invalidId);
    expect(result).toBe(false);
  });
});

describe("userDetails function", () => {
  it("should return the user details", () => {
    const user: userModel = {
      id: "user-id",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
    };

    const result = userDetails(user);

    expect(result).toEqual({
      id: "user-id",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
    });
  });
});
