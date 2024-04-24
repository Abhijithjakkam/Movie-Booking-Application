const { app } = require("./../app.js");
const request = require("supertest");
const movieModel = require("./../models/movieModel.js");
const showModel = require("../models/showModel.js");
const theatreModel = require("../models/theatreModel.js");
const userModel = require("../models/userModel.js");

const Id23characters = "12345678901234567890123";
const movie1 = {
    _id: Id23characters + "1",
    name: "Some Movie",
    durationInMilliseconds: 12134321,
    description: "This is some movie description",
    imageurl: "Some Image"
}
const theatre1 = {
    _id: Id23characters + "2",
    name: "Some Theatre",
    totalSeats: 20
}
const show1Input = {
    movieId: movie1._id,
    theatreId: theatre1._id,
    startTimeTimestamp: 678765787654
}
const show1Output = {
    ...show1Input,
    _id: Id23characters + "3"
}

const adminCookie = process.env.ADMIN_COOKIE;
const adminUserObject = {
    email: "geujewhk@hfijrk.com",
    name: "Someone",
    googleId: "6838719332",
    isAdmin: true
}
describe('show admin api', () => {
    describe('add show', () => {


        test("adding a show with movieId as a number", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, movieId: 123 });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with movieId as a object", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, movieId: {} });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with movieId too short", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, movieId: "12345" });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with movieId too long", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, movieId: "123456789012345678901234567" });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with movieId correct but refers to no movie", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => theatre1);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input });

            expect(res.status).toBe(400);
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with theatreId as a number", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, theatreId: 123 });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with theatreId as a object", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, theatreId: {} });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with theatreId too short", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, theatreId: "12345" });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with theatreId too long", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, theatreId: "123456789012345678901234567" });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with theatreId correct but refers to no theatre", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input });

            expect(res.status).toBe(400);
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with startTimeTimestamp as string", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, startTimeTimestamp: "t7g768" });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with startTimeTimestamp as object", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input, startTimeTimestamp: {} });

            expect(res.status).toBe(400);
            expect(movieModel.findById).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(showModel.create).not.toHaveBeenCalled();
        })

        test("adding a show with everything correct", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => theatre1);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input });

            expect(res.status).toBe(201);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(theatreModel.findById).toHaveBeenCalled();
            expect(showModel.create).toHaveBeenCalled();
            expect(res.body).toEqual(
                {
                    ...show1Input,
                    id: show1Output._id,
                    totalSeats: theatre1.totalSeats,
                    endTimeTimestamp: show1Input.startTimeTimestamp + movie1.durationInMilliseconds
                })
        })

        test("database throws an error", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => { throw new Error() });
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.create = jest.fn().mockImplementationOnce((show => (
                {
                    ...show,
                    _id: show1Output._id
                }
            )));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).post("/api/admin/add_show").set("Cookie", [
                "authToken=" + adminCookie
            ]).send({ ...show1Input });

            expect(res.status).toBe(500);
            expect(showModel.create).not.toHaveBeenCalled();
        })


    })

    describe('get all shows', () => {


        test("get all shows", async () => {

            //Mocks
            showModel.find = jest.fn().mockImplementationOnce(() => ([show1Output]))
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).get("/api/admin/all_shows").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(200);
            expect(showModel.find).toHaveBeenCalled();
        })


        test('given random parameters', async () => {

            //Mocks
            showModel.find = jest.fn().mockImplementationOnce(() => ([show1, show2]))
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const res = await request(app).get("/api/admin/all_shows/tf6t7tj").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(404);
            expect(showModel.find).not.toHaveBeenCalledWith();
        })

        test('database returns no shows', async () => {

            //Mocks
            showModel.find = jest.fn().mockImplementationOnce(() => ([]))
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const res = await request(app).get("/api/admin/all_shows").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(200);
            expect(showModel.find).toHaveBeenCalledWith();
            expect(res.body).toEqual([]);
        })

        test('database throws an error', async () => {

            //Mocks
            showModel.find = jest.fn().mockImplementationOnce(() => { throw new Error() })
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const res = await request(app).get("/api/admin/all_shows").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(500);
        })

    })

    describe("edit show by id", () => {

        test("edit movieId", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => show1Output);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).put(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                movieId:"Something"
            });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                ...show1Input,
                id:show1Output._id,
                message: "movieId,theatreId,endTimeTimestamp,totalSeats or emptySeats can't be edited"
            });
        })

        test("edit theatreId", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => show1Output);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).put(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                theatreId:"Something"
            });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                ...show1Input,
                id:show1Output._id,
                message: "movieId,theatreId,endTimeTimestamp,totalSeats or emptySeats can't be edited"
            });
        })

        test("edit endTimeTimestamp", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => show1Output);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).put(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                endTimeTimestamp:"Something"
            });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                ...show1Input,
                id:show1Output._id,
                message: "movieId,theatreId,endTimeTimestamp,totalSeats or emptySeats can't be edited"
            });
        })

        test("edit totalSeats", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => show1Output);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).put(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                totalSeats:"Something"
            });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                ...show1Input,
                id:show1Output._id,
                message: "movieId,theatreId,endTimeTimestamp,totalSeats or emptySeats can't be edited"
            });
        })

        test("edit empty seats", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => show1Output);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).put(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                emptySeats:"Something"
            });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                ...show1Input,
                id:show1Output._id,
                message: "movieId,theatreId,endTimeTimestamp,totalSeats or emptySeats can't be edited"
            });
        })

        test("edit startTimeTimestamp of a non existent show", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => show1Output);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).put(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                startTimeTimestamp:6789685
            });

            expect(res.status).toBe(400);
            expect(res.body).toEqual({
                message:"Show not found"
            });
        })

        test("edit startTimeTimestamp of an existing show", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce((showId,show) => ({
                ...show1Output,
                ...show

            }));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const newValueStartTimeTimestamp=6789685;

            const res = await request(app).put(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                startTimeTimestamp:newValueStartTimeTimestamp
            });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                ...show1Input,
                id:show1Output._id,
                startTimeTimestamp:newValueStartTimeTimestamp,
                endTimeTimestamp:newValueStartTimeTimestamp+movie1.durationInMilliseconds
            });
        })

        test("update fails", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce((showId,show) => null);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const newValueStartTimeTimestamp=6789685;

            const res = await request(app).put(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                startTimeTimestamp:newValueStartTimeTimestamp
            });

            expect(res.status).toBe(500);
        })

        test("database throws an error", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce((showId,show) => {throw new Error()});

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const newValueStartTimeTimestamp=6789685;

            const res = await request(app).put(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                startTimeTimestamp:newValueStartTimeTimestamp
            });

            expect(res.status).toBe(500);
        })

        test("edit with invalid showId", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => show1Output);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).put(`/api/admin/show/f44`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send({
                startTimeTimestamp:6789685
            });

            expect(res.status).toBe(400);
        })

    })

    describe("delete show by id", () => {

        test("delete with invalid showId", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.findByIdAndDelete = jest.fn().mockImplementationOnce(() => show1Output);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).delete(`/api/admin/show/f44`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            expect(res.status).toBe(400);
        })

        test("delete with valid showId but show doesnt exist", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => null);

            showModel.findByIdAndDelete = jest.fn().mockImplementationOnce(() => null);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).delete(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            expect(res.status).toBe(404);
        })

        test("delete with valid showId and show exists", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndDelete = jest.fn().mockImplementationOnce(() => show1Output);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).delete(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            expect(res.status).toBe(200);
        })

        test("database throws an error", async () => {
            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => show1Output);

            showModel.findByIdAndDelete = jest.fn().mockImplementationOnce(() => {throw new Error()});

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            const res = await request(app).delete(`/api/admin/show/${show1Output._id}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            expect(res.status).toBe(500);
        })


    })
})