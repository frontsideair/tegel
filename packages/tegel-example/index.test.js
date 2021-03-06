const request = require("supertest");
const app = require("./app");

test("It should read hello universe", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello, universe!");
});

test("It should switch universe flag on", async () => {
  const response = await request(app)
    .post("/tegel")
    .send("universal=off");
  expect(response.status).toBe(200);
});

test("It should read hello world", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello, world!");
});
