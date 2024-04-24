const axios = require("axios");
const { app } = require("./../app.js");
const request = require("supertest");

jest.mock('axios');

describe("signin routes", () => {

    describe("auth google", () => {

        test("normal flow", async () => {

            const res = await request(app).get("/api/auth/google").send();
            expect(res.status).toBe(302);

        })

    })
    describe("auth google callback", () => {

        test("normal flow", async () => {


            jest.spyOn(axios, 'post').mockResolvedValueOnce({
                data: {
                    access_token: 10
                }
            })
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: {
                    access_token: 10
                }
            });

            const res = await request(app).get("/api/auth/google/callback?code=10").send({
                query: {
                    code: 10
                }
            });

            expect(res.status).toBe(302);

        })

        test("error flow", async () => {


            jest.spyOn(axios, 'post').mockImplementationOnce(()=>{
                throw new Error()
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: {
                    access_token: 10
                }
            });

            const res = await request(app).get("/api/auth/google/callback?code=10").send({
                query: {
                    code: 10
                }
            });

            expect(res.status).toBe(500);

        })

    })
})