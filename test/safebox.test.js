const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Safebox = require("../src/models/safeboxModel");
const { expect } = require("chai");

describe("Safebox Creation API Tests", () => {
  let authToken; // Store the Basic Auth token here

  // Authenticate and store the Basic Auth token before running the tests
  before(async () => {
    const credentials = Buffer.from("testuser:Test@442pass").toString("base64");
    authToken = `Basic ${credentials}`;
  });

  after(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the Safebox collection before each test
    await Safebox.deleteMany({});
  });

  // *********************************************************************************
  it("should register a new user successfully", async () => {
    const userData = {
      username: "testuser",
      password: "Test@442pass",
    };

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .set("Accept", "application/json")
      .send(userData);

    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal("User registered successfully");
  });

  // *********************************************************************************
  it("should create a new safebox successfully", async () => {
    const safeboxData = {
      name: "My Safebox",
      password: "Test@442pass",
    };

    const response = await request(app)
      .post("/api/v1/safeboxes")
      .set("Authorization", authToken) // Use the stored Basic Auth token
      .send(safeboxData);

    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal("Safebox created successfully");
    expect(response.body.data.name).to.equal("My Safebox");
  });

  // *********************************************************************************
  it("should return a validation error for invalid input", async () => {
    const invalidSafeboxData = {
      // Missing required password field
      name: "My Safebox",
    };

    const response = await request(app)
      .post("/api/v1/safeboxes")
      .set("Authorization", authToken) // Use the stored Basic Auth token
      .send(invalidSafeboxData);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.an("array");
  });
});
