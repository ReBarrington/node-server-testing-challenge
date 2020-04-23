const request = require("supertest");

const barringtonRouter = require("../barringtons/barringtons-router.js");
const db = require("../data/dbConfig.js");

describe("server", function () {
  describe("GET /", function () {
    it("should return 200 OK", function () {
      // make a GET request to / endpoint on the server
      return request(barringtonRouter) // return the async call to let jest know it should wait
        .get("/")
        .then(res => {
          // assert that the HTTP status code is 200
          expect(res.status).toBe(200);
        });
    });
  });

  describe("POST /barringtons", function () {
    beforeEach(async () => {
      await db("barringtons").truncate(); // empty the table and reset the id back to 1
    });

    it("return 201 on success", function () {
      return request(barringtonRouter)
        .post("/barringtons")
        .send({ name: "Hugs" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it('should return a message saying "Barrington created successfully"', function () {
      return request(barringtonRouter)
        .post("/barringtons")
        .send({ name: "Hugs" })
        .then(res => {
          expect(res.body.message).toBe("Barrington created successfully");
        });
    });

    it("add the barrington to the db", async function () {
      const barringtonName = "Hugs";

      const existing = await db("barringtons").where({ name: barringtonName });
      expect(existing).toHaveLength(0);

      await request(barringtonRouter)
        .post("/barringtons")
        .send({ name: barringtonName })
        .then(res => {
          expect(res.body.message).toBe("Barrington created successfully");
        });
      await request(barringtonRouter)
        .post("/barringtons")
        .send({ name: "Hugs" })
        .then(res => {
          expect(res.body.message).toBe("Barrington created successfully");
        });

      const inserted = await db("barringtons"); //.where({ name: barringtonName });
      expect(inserted).toHaveLength(2);
    });
  });
});
