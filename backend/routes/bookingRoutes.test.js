const { app } = require("../app");
const bookingModel = require("../models/bookingModel");
const movieModel = require("../models/movieModel");
const showModel = require("../models/showModel");
const theatreModel = require("../models/theatreModel");
const userModel = require("../models/userModel");
const request = require("supertest");

describe("booking client api route", () => {

    describe("book route", () => {

        const userCookie = process.env.ADMIN_COOKIE;
        const userObject = {
            _id: "123456789012345678901234",
            email: "geujewhk@hfijrk.com",
            name: "Someone",
            googleId: "6838719332",
            isAdmin: false
        }

        test("seats available", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 3, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.create = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).post(`/api/booking/book`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(201);

        })

        test("seats not available", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.create = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).post(`/api/booking/book`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(403);

        })

        test("not logged in", async () => {

            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.create = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).post(`/api/booking/book`).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(403);

        })

        test("not user id", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => ({ ...userObject, _id: undefined }));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.create = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).post(`/api/booking/book`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(403);

        })

        test("show doesn't exist", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => (userObject));
            showModel.findById = jest.fn().mockImplementationOnce(() => null)

            bookingModel.create = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).post(`/api/booking/book`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(404);
            // expect(res.body).toBe(200);

        })

        test("seat Numbers empty array", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => (userObject));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.create = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).post(`/api/booking/book`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: []
            });

            expect(res.status).toBe(400);

        })

        test("didn't send seat Numbers", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => (userObject));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.create = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).post(`/api/booking/book`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193"
            });

            expect(res.status).toBe(400);

        })

        test("database save failed", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => (userObject));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 4],
                save: jest.fn().mockImplementationOnce(() => null)
            }))

            bookingModel.create = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).post(`/api/booking/book`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2]
            });

            expect(res.status).toBe(500);

        })

        test("booking create fail", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => (userObject));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.create = jest.fn().mockImplementationOnce(() => (null));

            //Request
            const res = await request(app).post(`/api/booking/book`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2]
            });

            expect(res.status).toBe(500);

        })

        test("database throws an error", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => (userObject));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.create = jest.fn().mockImplementationOnce(() => { throw new Error() });

            //Request
            const res = await request(app).post(`/api/booking/book`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2]
            });

            expect(res.status).toBe(500);

        })

    })

    describe("get booking", () => {

        const userCookie = process.env.ADMIN_COOKIE;
        const userObject = {
            _id: "123456789012345678901234",
            email: "geujewhk@hfijrk.com",
            name: "Someone",
            googleId: "6838719332",
            isAdmin: false
        }

        test("booking id doesn't refer to any booking", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 3, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.findById = jest.fn().mockImplementationOnce(() => null);
            userModel.findById = jest.fn().mockImplementationOnce(() => ({}));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({}));
            movieModel.findById = jest.fn().mockImplementationOnce(() => ({}));
            theatreModel.findById = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).get(`/api/booking/123456789012345678901234`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(404);

        })

        test("user account deleted", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 3, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            const booking1 = {
                userId: "123456789012345678901231",
                showId: "123456789012345678901232"
            };

            bookingModel.findById = jest.fn().mockImplementationOnce(() => booking1);
            userModel.findById = jest.fn().mockImplementationOnce(() => null);
            showModel.findById = jest.fn().mockImplementationOnce(() => ({}));
            movieModel.findById = jest.fn().mockImplementationOnce(() => ({}));
            theatreModel.findById = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).get(`/api/booking/123456789012345678901234`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(403);

        })

        test("accessing some other user's booking", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                emptySeats: [1, 2, 3, 4],
                save: jest.fn().mockImplementationOnce(() => ({}))
            }))

            bookingModel.findById = jest.fn().mockImplementationOnce(() => ({
                userId: "12345678901234567890123" + "1",
                showId: "12345678901234567890123" + "2"
            }));
            userModel.findById = jest.fn().mockImplementationOnce(() => ({
                _id: {

                    equals: jest.fn().mockImplementationOnce(() => false)
                }
            }));
            movieModel.findById = jest.fn().mockImplementationOnce(() => ({}));
            theatreModel.findById = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).get(`/api/booking/123456789012345678901234`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(403);

        })

        test("show doesn't exist", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);


            bookingModel.findById = jest.fn().mockImplementationOnce(() => ({
                userId: "12345678901234567890123" + "1",
                showId: "12345678901234567890123" + "2"
            }));
            userModel.findById = jest.fn().mockImplementationOnce(() => ({
                _id: {

                    equals: jest.fn().mockImplementationOnce(() => true)
                }
            }));
            showModel.findById = jest.fn().mockImplementationOnce(() => null)
            movieModel.findById = jest.fn().mockImplementationOnce(() => ({}));
            theatreModel.findById = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).get(`/api/booking/123456789012345678901234`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(403);

        })

        test("movie doesn't exist", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);


            bookingModel.findById = jest.fn().mockImplementationOnce(() => ({
                userId: "12345678901234567890123" + "1",
                showId: "12345678901234567890123" + "2"
            }));
            userModel.findById = jest.fn().mockImplementationOnce(() => ({
                _id: {

                    equals: jest.fn().mockImplementationOnce(() => true)
                }
            }));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                movieId:"12345678901234567890123" + "6",
                theatreId:"12345678901234567890123" + "7"
            }))
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).get(`/api/booking/123456789012345678901234`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(403);

        })

        test("theatre doesn't exist", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);


            bookingModel.findById = jest.fn().mockImplementationOnce(() => ({
                userId: "12345678901234567890123" + "1",
                showId: "12345678901234567890123" + "2"
            }));
            userModel.findById = jest.fn().mockImplementationOnce(() => ({
                _id: {

                    equals: jest.fn().mockImplementationOnce(() => true)
                }
            }));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                movieId:"12345678901234567890123" + "6",
                theatreId:"12345678901234567890123" + "7"
            }))
            movieModel.findById = jest.fn().mockImplementationOnce(() => ({}));
            theatreModel.findById = jest.fn().mockImplementationOnce(() => null);

            //Request
            const res = await request(app).get(`/api/booking/123456789012345678901234`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(403);

        })

        test("everything exists", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);


            bookingModel.findById = jest.fn().mockImplementationOnce(() => ({
                userId: "12345678901234567890123" + "1",
                showId: "12345678901234567890123" + "2"
            }));
            userModel.findById = jest.fn().mockImplementationOnce(() => ({
                _id: {

                    equals: jest.fn().mockImplementationOnce(() => true)
                }
            }));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                movieId:"12345678901234567890123" + "6",
                theatreId:"12345678901234567890123" + "7"
            }))
            movieModel.findById = jest.fn().mockImplementationOnce(() => ({}));
            theatreModel.findById = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).get(`/api/booking/123456789012345678901234`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(200);

        })

        test("database throws an error", async () => {

            userModel.findOne = jest.fn().mockImplementationOnce(() => userObject);


            bookingModel.findById = jest.fn().mockImplementationOnce(() => ({
                userId: "12345678901234567890123" + "1",
                showId: "12345678901234567890123" + "2"
            }));
            userModel.findById = jest.fn().mockImplementationOnce(() => ({
                _id: {

                    equals: jest.fn().mockImplementationOnce(() => true)
                }
            }));
            showModel.findById = jest.fn().mockImplementationOnce(() => ({
                movieId:"12345678901234567890123" + "6",
                theatreId:"12345678901234567890123" + "7"
            }))
            movieModel.findById = jest.fn().mockImplementationOnce(() => {throw new Error()});
            theatreModel.findById = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).get(`/api/booking/123456789012345678901234`).set("Cookie", [
                "authToken=" + userCookie
            ]).send({
                showId: "y87h193",
                seatNumbers: [1, 2, 3]
            });

            expect(res.status).toBe(500);

        })
    })

})