const request = require("supertest");
const app = require("../app"); // Adjust the path to where your Express app is exported

describe("POST /api/companies", () => {
  it("creates a new company", async () => {
    const newCompany = {
      name: "Test Company",
      description: "This is a test company",
    };

    const response = await request(app)
      .post("/api/companies")
      .send(newCompany)
      .expect(201);

    expect(response.body.name).toBe(newCompany.name);
    expect(response.body.description).toBe(newCompany.description);
    // Add more assertions as needed
  });
});
