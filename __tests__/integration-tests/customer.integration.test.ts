const request = require("supertest");
const jwt = require("jsonwebtoken");
import "dotenv/config";
import createServer from "../../src/config/server";
const app = createServer();

describe("Customer API", () => {
  let token: string;
  const secret = process.env.SECRET_JWT_TOKEN as string;
  const userId = process.env.TEST_ID as string;
  let testId = "";
  beforeAll(() => {
    token = jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
  });

  it("should return a list of all data", async () => {
    const response = await request(app).get("/api/customer").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    // expect(Array.isArray(response.body)).toBe(true);
    // expect(response.body.length).toBeGreaterThan(0);
  });

  it("should create new data", async () => {
    const response = await request(app).post("/api/customer").set("Authorization", `Bearer ${token}`).send({
      customerId: "000",
      firstName: "test_firstname",
      lastName: "test_lastname",
      email: "test@mail.com",
      phone: "0000000000",
      birthdate: "2000-01-01",
      address: "address test",
    });
    expect(response.status).toBe(200);

    testId = response._body.id;
  });

  it("should update data", async () => {
    const response = await request(app).put("/api/customer").set("Authorization", `Bearer ${token}`).send({
      id: testId,
      firstName: "test_firstname1",
      lastName: "test_lastname1",
      email: "test1@mail.com",
      phone: "0000000001",
      birthdate: "2000-01-11",
      address: "address test1",
    });
    expect(response.status).toBe(200);
  });

  it("should get data by id", async () => {
    const response = await request(app).get(`/api/customer/${testId}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should not get data", async () => {
    const invalidTaskId = "invalidTaskId";
    const response = await request(app).get(`/api/customer/${invalidTaskId}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(500);
  });

  it("should delete data", async () => {
    const response = await request(app).delete(`/api/customer/${testId}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should not delete data", async () => {
    const invalidTaskId = "invalidTaskId";
    const response = await request(app).delete(`/api/customer/${invalidTaskId}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(500);
  });
});
