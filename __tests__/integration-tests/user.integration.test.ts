import request from "supertest";
import "dotenv/config";
import createServer from "../../src/config/server";
const app = createServer();
let id = "";
let token = "";
describe("User Routes", () => {
  it("should log in a user", async () => {
    const response = await request(app).post("/api/login").send({
      username: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    });
    token = response.body.jwtToken;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("username", process.env.TEST_USER);
    expect(response.headers["set-cookie"]).toBeDefined();
  });
  it("should create a new user", async () => {
    const response = await request(app)
      .post("/api/user")
      .send({
        firstName: "test",
        lastName: "user",
        username: "testuser",
        password: "password123",
      })
      .set("Authorization", `Bearer ${token}`);
    id = response.body.id;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("username", "testuser");
  });

  it("should update a user", async () => {
    const response = await request(app)
      .put("/api/user")
      .send({
        id: id,
        firstName: "UpdatedTest",
        lastName: "UpdatedUser",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should get all users", async () => {
    const response = await request(app).get("/api/user").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should get a user by ID", async () => {
    const response = await request(app).get(`/api/user/${id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should delete a user by ID", async () => {
    const response = await request(app).delete(`/api/user/${id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
