const { app } = require("./../app.js");
const request = require("supertest");
const theatreModel = require("../models/theatreModel.js");

describe('theatre client api', () => {

    describe("search a theatre by id", () => {

        test("given no theatre id", async () => {

            //Mocks
            theatreModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/theatre/").send();

            //Checks
            expect(res.status).toBe(404);
            expect(theatreModel.findById).not.toHaveBeenCalled();

        })

        test("given invalid theatre id", async () => {

            //Mocks
            theatreModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/theatre/rwt3244t5h3NENJ").send();

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.findById).not.toHaveBeenCalled();

        })

        test("given theatre id too short", async () => {

            //Mocks
            theatreModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/theatre/12345678901234567890123").send();

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.findById).not.toHaveBeenCalled();

        })
        test("given theatre id too long", async () => {

            //Mocks
            theatreModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/theatre/1234567890123456789012345").send();

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.findById).not.toHaveBeenCalled();

        })

        test("given theatre id right length but doesn't match anything", async () => {

            //Mocks
            theatreModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/theatre/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(404);
            expect(theatreModel.findById).toHaveBeenCalledTimes(1);

        })

        test("given a valid theatreId that matches a theatre", async () => {

            const theatre1={
                _id:"123456789012345678901234",
                name:"Theatre1"
            }
            //Mocks
            theatreModel.findById = jest.fn().mockImplementation((theatreId) => {
                if(theatreId==theatre1._id)
                {
                    return theatre1;
                }
                return null;
            });

            //Request
            const res = await request(app).get(`/api/theatre/${theatre1._id}`).send();

            //Checks
            expect(res.status).toBe(200);
            expect(theatreModel.findById).toHaveBeenCalledTimes(1);
            expect(res.body.name).toBe(theatre1.name);

        })

        test("database throws an error", async () => {

            const theatre1={
                _id:"123456789012345678901234",
                name:"Theatre1"
            }
            //Mocks
            theatreModel.findById = jest.fn().mockImplementation((theatreId) => {throw new Error()});

            //Request
            const res = await request(app).get(`/api/theatre/${theatre1._id}`).send();

            //Checks
            expect(res.status).toBe(500);

        })

    })
})