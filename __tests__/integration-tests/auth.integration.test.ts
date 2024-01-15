import request from "supertest";

import createServer from "../../src/config/server";
const app = createServer();
let testId = "";
let token = "";
describe("Authentication Routes", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/register").send({
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("username", "johndoe");
  });

  it("should log in a user", async () => {
    const response = await request(app).post("/api/login").send({
      username: "johndoe",
      password: "password123",
    });
    testId = response.body.id;
    token = response.body.jwtToken;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("username", "johndoe");
    expect(response.headers["set-cookie"]).toBeDefined();
  });

  it("should delete data after test", async () => {
    const response = await request(app).delete(`/api/user/${testId}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
