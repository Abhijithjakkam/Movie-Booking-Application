const { app } = require("./../app.js");
const request = require("supertest");
const movieModel = require("./../models/movieModel.js");
const showModel = require("../models/showModel.js");
const theatreModel = require("../models/theatreModel.js");
const userModel = require("../models/userModel.js");

const movie1 = {
    _id: "Some id",
    name: "Animal",
    imageUrl: "https://www.somemovie.com",
    durationInMilliseconds: 821102,
    description: "this the Animal description"
}
const movie2 = {
    _id: "Some id2",
    name: "An Umbrella",
    imageUrl: "https://www.somemovie2.com",
    durationInMilliseconds: 234151,
    description: "this the an umbrella description"
}
const adminCookie = process.env.ADMIN_COOKIE;
const adminUserObject = {
    email: "geujewhk@hfijrk.com",
    name: "Someone",
    googleId: "6838719332",
    isAdmin: true
}
describe('theatre admin api', () => {
    describe('add theatre', () => {


        test("adding all theatre details", async () => {

            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.create = jest.fn().mockImplementationOnce(() => (theatre1Output));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_theatre").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(theatre1Input);

            //Checks
            expect(res.status).toBe(201);
            expect(theatreModel.create).toHaveBeenCalled();
            expect(res.body).toEqual({
                ...theatre1Input,
                id: exampleId
            });
        })


        test("adding theatre details without name", async () => {

            const theatre1Input = {
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.create = jest.fn().mockImplementationOnce(() => (theatre1Output));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_theatre").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(theatre1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.create).not.toHaveBeenCalled();
        })

        test("adding theatre details without totalSeats", async () => {

            const theatre1Input = {
                name: "Theatre 1"
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.create = jest.fn().mockImplementationOnce(() => (theatre1Output));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_theatre").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(theatre1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with no data", async () => {

            const theatre1Input = {
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.create = jest.fn().mockImplementationOnce(() => (theatre1Output));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_theatre").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(theatre1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with name as number", async () => {

            const theatre1Input = {
                name: 200,
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.create = jest.fn().mockImplementationOnce(() => (theatre1Output));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_theatre").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(theatre1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with totalSeats as string", async () => {

            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:"20bbr4iewn"
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.create = jest.fn().mockImplementationOnce(() => (theatre1Output));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_theatre").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(theatre1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with name as object", async () => {

            const theatre1Input = {
                name: {},
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.create = jest.fn().mockImplementationOnce(() => (theatre1Output));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_theatre").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(theatre1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with totalSeats as object", async () => {

            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:{}
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.create = jest.fn().mockImplementationOnce(() => (theatre1Output));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_theatre").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(theatre1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.create).not.toHaveBeenCalled();
        })

        test("database throws an error", async () => {

            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.create = jest.fn().mockImplementationOnce(() => {throw new Error()});

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_theatre").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(theatre1Input);

            //Checks
            expect(res.status).toBe(500);
        })

    })

    describe('get all theatres', () => {


        test("get all theatres", async () => {

            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.find = jest.fn().mockImplementationOnce(() => ([theatre1Output]))
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).get("/api/admin/all_theatres").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(200);
            expect(theatreModel.find).toHaveBeenCalled();
        })


        test('given random parameters', async () => {

            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.find = jest.fn().mockImplementationOnce(() => ([theatre1Output]))
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).get("/api/admin/all_theatres/ycugb").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(404);
            expect(theatreModel.find).not.toHaveBeenCalled();
        })

        test("database throws an error",async ()=>{
            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.find = jest.fn().mockImplementationOnce(() => {throw new Error()})
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).get("/api/admin/all_theatres").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(500);
            expect(theatreModel.find).toHaveBeenCalled();
        })

    })

    describe("edit theatre by id", () => {

        test("giving invalid id",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => null)
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).put(`/api/admin/theatre/23rf24t`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.findByIdAndUpdate).not.toHaveBeenCalled();
        })

        test("giving valid id that matches no theatre",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => null)
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).put(`/api/admin/theatre/${theatre1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                name:"Something"
            });

            //Checks
            expect(res.status).toBe(404);
            expect(theatreModel.findByIdAndUpdate).toHaveBeenCalled();
        })

        test("giving valid id that matches theatre but no edit data",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => theatre1Output)
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).put(`/api/admin/theatre/${theatre1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
            });

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.findByIdAndUpdate).not.toHaveBeenCalled();
        })

        test("giving valid id that matches theatre and editing name",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndUpdate = jest.fn().mockImplementationOnce((id,edits) => ({
                ...theatre1Output,
                ...edits
            }));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).put(`/api/admin/theatre/${theatre1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                name:"Something"
            });

            //Checks
            expect(res.status).toBe(200);
            expect(theatreModel.findByIdAndUpdate).toHaveBeenCalled();
            expect(res.body).toEqual({
                ...theatre1Input,
                id:theatre1Output._id,
                name:"Something"
            })
        })

        test("giving valid id that matches theatre and editing totalSeats",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => theatre1Output)
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).put(`/api/admin/theatre/${theatre1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                totalSeats:30
            });

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.findByIdAndUpdate).not.toHaveBeenCalled();
        })

        test("database throws an error",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => {throw new Error()})
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).put(`/api/admin/theatre/${theatre1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                name:"Something"
            });

            //Checks
            expect(res.status).toBe(500);
            expect(theatreModel.findByIdAndUpdate).toHaveBeenCalled();
        })
        
    })

    describe("delete theatre by id",()=>{

        test("giving invalid id",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndDelete = jest.fn().mockImplementationOnce(() => null)
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).delete(`/api/admin/theatre/23rf24t`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(400);
            expect(theatreModel.findByIdAndDelete).not.toHaveBeenCalled();
        })

        test("giving valid id that matches no theatre",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndDelete = jest.fn().mockImplementationOnce(() => null)
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).delete(`/api/admin/theatre/${theatre1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                name:"Something"
            });

            //Checks
            expect(res.status).toBe(404);
            expect(theatreModel.findByIdAndDelete).toHaveBeenCalled();
        })

        test("giving valid id that matches a theatre",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndDelete = jest.fn().mockImplementationOnce(() => theatre1Output)
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).delete(`/api/admin/theatre/${theatre1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                name:"Something"
            });

            //Checks
            expect(res.status).toBe(200);
            expect(theatreModel.findByIdAndDelete).toHaveBeenCalled();
        })

        test("database throws an error",async ()=>{


            const theatre1Input = {
                name: "Theatre 1",
                totalSeats:20
            }

            const exampleId = "123456789012345678901234";

            const theatre1Output = {
                _id: exampleId,
                ...theatre1Input
            }

            //Mocks
            theatreModel.findByIdAndDelete = jest.fn().mockImplementationOnce(() => {throw new Error()})
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).delete(`/api/admin/theatre/${theatre1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                name:"Something"
            });

            //Checks
            expect(res.status).toBe(500);
            expect(theatreModel.findByIdAndDelete).toHaveBeenCalled();
        })

    })
})