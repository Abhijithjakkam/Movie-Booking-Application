const { app } = require("./../app.js");
const request = require("supertest");
const movieModel = require("./../models/movieModel.js");
const showModel = require("../models/showModel.js");
const theatreModel = require("../models/theatreModel.js");

const movie1 = {
    _id: "Some id",
    name: "Animal"
}
const movie2 = {
    _id: "Some id2",
    name: "An Umbrella"
}
describe('movie client api', () => {
    describe('search movies', () => {


        test("given empty string", async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(() => ({}));

            //Request
            const res = await request(app).get("/api/movie/search/").send();

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.find).not.toHaveBeenCalled();
        })


        test('given an actual movie', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(() => [
                            movie1, movie2
                        ])
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/search/Ani").send();

            //Checks
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body[0].name).toBe(movie1.name);
            expect(res.body[1].name).toBe(movie2.name);
            expect(movieModel.find).toHaveBeenCalledWith({ name: { $regex: /Ani/, $options: 'i' } });
        })

        test('given a string less than 3 characters', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(() => [])
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/search/An").send();

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.find).not.toHaveBeenCalled();
        })

        test('should not return more than 4 results', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(
                            (number) => Array.from({ length: number }, (_, index) => movie1)
                        )
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/search/Something").send();

            //Checks
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(4);

            res.body.forEach(movie => {

                expect(movie.name).toBe(movie1.name);

            })
        })

        test('database returns null', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(
                            () => null
                        )
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/search/something").send();

            //Checks
            expect(res.status).toBe(404);
        })

        test('database throws an error', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(
                            () => {throw new Error()}
                        )
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/search/something").send();

            //Checks
            expect(res.status).toBe(500);
        })
    })

    describe('recommended movies', () => {


        test("given no parameters", async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(() => [
                            movie1, movie2
                        ])
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/recommended").send();

            //Checks
            expect(res.status).toBe(200);
            expect(movieModel.find).toHaveBeenCalled();
        })


        test('given random parameters', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(() => [
                            movie1, movie2
                        ])
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/recommended/Ani").send();

            //Checks
            expect(res.status).toBe(404);
            expect(movieModel.find).not.toHaveBeenCalledWith();
        })

        test('should not return more than 20 results', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(
                            (number) => Array.from({ length: number }, (_, index) => movie1)
                        )
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/recommended").send();

            //Checks
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(20);

            res.body.forEach(movie => {

                expect(movie.name).toBe(movie1.name);

            })
        })

        test('database returns null', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(
                            () => null
                        )
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/recommended").send();

            //Checks
            expect(res.status).toBe(404);
        })

        test('database throws an error', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(
                () => (
                    {
                        limit: jest.fn().mockImplementationOnce(
                            () => {throw new Error()}
                        )
                    }
                )
            )

            //Request
            const res = await request(app).get("/api/movie/recommended").send();

            //Checks
            expect(res.status).toBe(500);
        })

        
    })

    describe("search a movie by id", () => {

        test("given no movie id", async () => {

            //Mocks
            movieModel.findbyId = jest.fn().mockImplementationOnce(() => null);

            //Request
            const res = await request(app).get("/api/movie").send();

            //Checks
            expect(res.status).toBe(404);
            expect(movieModel.findbyId).not.toHaveBeenCalled();

        })

        test("given invalid id", async () => {

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);

            //Request
            const res = await request(app).get("/api/movie/abcd").send();

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.findbyId).not.toHaveBeenCalled();

        })

        test("given id too short", async () => {

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);

            //Request
            const res = await request(app).get("/api/movie/12345678901234567890123").send();

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.findbyId).not.toHaveBeenCalled();

        })
        test("given id too long", async () => {

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);

            //Request
            const res = await request(app).get("/api/movie/1234567890123456789012345").send();

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.findbyId).not.toHaveBeenCalled();

        })

        test("given id right length but doesn't match anything", async () => {

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => null);

            //Request
            const res = await request(app).get("/api/movie/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(404);
            expect(movieModel.findById).toHaveBeenCalledTimes(1);

        })

        test("given a valid id that matches a movie but with no shows", async () => {

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            showModel.find = jest.fn().mockImplementationOnce(() => []);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => []);;

            //Request
            const res = await request(app).get("/api/movie/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalledTimes(1);
            expect(showModel.find).toHaveBeenCalledTimes(1);
            expect(res.body.shows.length).toBe(0);
            expect(theatreModel.findById).not.toHaveBeenCalled();
        })

        test("given a valid id that matches a movie but with 2 shows, one show has broken referencial integrity of theatre", async () => {

            const idwithOneLessCharacter="12345678901234567890123";

            //Example test data
            const show1 = {
                id: "1",
                theatreId: idwithOneLessCharacter+"1"
            }
            const show2 = {
                id: "1",
                theatreId: idwithOneLessCharacter+"2"
            }

            const theatreOfShow1 = {
                id: show1.theatreId,
                name: "Pvr"
            }
            const theatreOfShow2 = null

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            showModel.find = jest.fn().mockImplementationOnce(() => [show1, show2]);
            theatreModel.findById = jest.fn().mockImplementation((theatreID) => {
                if (theatreID == show1.theatreId) {
                    return theatreOfShow1;
                }
                else if (theatreID == show2.theatreId) {
                    return theatreOfShow2;
                }
                else {
                    return "Something else"
                }
            })

            //Request
            const res = await request(app).get("/api/movie/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalledTimes(1);
            expect(showModel.find).toHaveBeenCalledTimes(1);
            expect(res.body.shows.length).toBe(1);
            expect(theatreModel.findById).toHaveBeenCalledTimes(2);
            expect(res.body.shows[0].theatre.name).toBe(theatreOfShow1.name);
        })

        test("given a valid id that matches a movie but with 2 shows, both theatres exist", async () => {

            const idwithOneLessCharacter="12345678901234567890123"

            //Example test data
            const show1 = {
                id: "1",
                theatreId: idwithOneLessCharacter+"1"
            }
            const show2 = {
                id: "2",
                theatreId: idwithOneLessCharacter+"2"
            }

            const theatreOfShow1 = {
                id: show1.theatreId,
                name: "Pvr"
            }
            const theatreOfShow2 = {
                id: show2.theatreId,
                name: "Pvr2"
            }

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            showModel.find = jest.fn().mockImplementationOnce(() => [show1, show2]);
            theatreModel.findById = jest.fn().mockImplementation((theatreID) => {
                if (theatreID == show1.theatreId) {
                    return theatreOfShow1;
                }
                else if (theatreID == show2.theatreId) {
                    return theatreOfShow2;
                }
                else {
                    return "Something else"
                }
            })

            //Request
            const res = await request(app).get("/api/movie/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalledTimes(1);
            expect(showModel.find).toHaveBeenCalledTimes(1);
            expect(res.body.shows.length).toBe(2);
            expect(theatreModel.findById).toHaveBeenCalledTimes(2);
            expect(res.body.shows[0].theatre.name).toBe(theatreOfShow1.name);
            expect(res.body.shows[1].theatre.name).toBe(theatreOfShow2.name);
        })

        test("given a valid id that matches a movie but with 2 shows, both theatres exist and are the same theatre", async () => {

            const idwithOneLessCharacter="12345678901234567890123"

            //Example test data
            const show1 = {
                id: "1",
                theatreId: idwithOneLessCharacter+"1"
            }
            const show2 = {
                id: "2",
                theatreId: idwithOneLessCharacter+"1"
            }

            const theatreOfShow1And2 = {
                id: show1.theatreId,
                name: "Pvr"
            }
            const theatreOfShow2 = {
                id: show2.theatreId,
                name: "Pvr2"
            }

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            showModel.find = jest.fn().mockImplementationOnce(() => [show1, show2]);
            theatreModel.findById = jest.fn().mockImplementation((theatreID) => {
                if (theatreID == show1.theatreId) {
                    return theatreOfShow1And2;
                }
                else if (theatreID == show2.theatreId) {
                    return theatreOfShow2;
                }
                else {
                    return "Something else"
                }
            })

            //Request
            const res = await request(app).get("/api/movie/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalledTimes(1);
            expect(showModel.find).toHaveBeenCalledTimes(1);
            expect(res.body.shows.length).toBe(2);
            expect(theatreModel.findById).toHaveBeenCalledTimes(2);
            expect(res.body.shows[0].theatre.name).toBe(theatreOfShow1And2.name);
            expect(res.body.shows[1].theatre.name).toBe(theatreOfShow1And2.name);
        })

        test("given a valid id that matches a movie but with 2 shows with invalid theatreId", async () => {

            //Example test data
            const show1 = {
                id: "1",
                theatreId: 123
            }
            const show2 = {
                id: "2",
                theatreId: 456
            }

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => movie1);
            showModel.find = jest.fn().mockImplementationOnce(() => [show1, show2]);
            theatreModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/movie/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalledTimes(1);
            expect(showModel.find).toHaveBeenCalledTimes(1);
            expect(res.body.shows.length).toBe(0);
            expect(theatreModel.findById).toHaveBeenCalledTimes(0);
        })

        test("database throws an error", async () => {

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce(() => {throw new Error()});

            //Request
            const res = await request(app).get("/api/movie/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(500);
            expect(movieModel.findById).toHaveBeenCalledTimes(1);

        })
    })
})