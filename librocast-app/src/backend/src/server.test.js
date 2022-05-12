const server = require("./server");
const supertest = require("supertest");
const request = supertest(server);

test("/api/searchUser/:userName", async () => {
  const userName = "kihoon";

  await supertest(app)
    .get("/api/searchUser/" + userName)
    .expect(200)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expoect(response.body.length).toEqual(1);
    });
});
