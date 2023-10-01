const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { before, beforeEach } = require("mocha");
const User = require("../src/models/userModel");
const { expect } = require("chai");

describe("User Signup API Tests", () => {
  before(async () => {
    // Establish a connection to the test database
  });

  after(async () => {
    // Disconnect from the test database
    // await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the User collection before each test
    await User.deleteMany({});
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
  it("should return an error if the username already exists", async () => {
    const existingUser = new User({
      username: "testuser1",
      password: "Testpass@442",
    });
    await existingUser.save();

    const userData = {
      username: "testuser1",
      password: "Testpass@442",
    };

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .set("Accept", "application/json")
      .send(userData);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Username already exists");
  });

  // *********************************************************************************
  it("should return a validation error for invalid input", async () => {
    const invalidUserData = {
      // Missing required password field
      username: "testuser",
    };

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .set("Accept", "application/json")
      .send(invalidUserData);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.an("array");
  });
});
