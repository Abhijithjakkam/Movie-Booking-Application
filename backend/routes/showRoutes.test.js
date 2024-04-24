const { app } = require("./../app.js");
const request = require("supertest");
const showModel = require("../models/showModel.js");
const movieModel = require("../models/movieModel.js");
const theatreModel = require("../models/theatreModel.js");


describe('show client api', () => {

    describe("search a show by id", () => {

        test("given no show id", async () => {

            //Mocks
            showModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/show/").send();

            //Checks
            expect(res.status).toBe(404);
            expect(showModel.findById).not.toHaveBeenCalled();

        })

        test("given invalid show id", async () => {

            //Mocks
            showModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/show/bekb32iubkiUbkOI").send();

            //Checks
            expect(res.status).toBe(400);
            expect(showModel.findById).not.toHaveBeenCalled();

        })

        test("given show id too short", async () => {

            //Mocks
            showModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/show/12345678901234567890123").send();

            //Checks
            expect(res.status).toBe(400);
            expect(showModel.findById).not.toHaveBeenCalled();

        })
        test("given show id too long", async () => {

            //Mocks
            showModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/show/1234567890123456789012345").send();

            //Checks
            expect(res.status).toBe(400);
            expect(showModel.findById).not.toHaveBeenCalled();

        })

        test("given show id right length but doesn't match anything", async () => {

            //Mocks
            showModel.findById = jest.fn().mockImplementation(() => null);

            //Request
            const res = await request(app).get("/api/show/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(404);
            expect(showModel.findById).toHaveBeenCalledTimes(1);

        })

        test("given a valid show id that matches a show, but broken movie referencial integrity", async () => {

            
            const show1={
                _id:"123456789012345678901234",
                movieId:"123456789012345678901231",
                theatreId:"123456789012345678901232"
            }
            const movie1=null;
            const theatre1={
                _id:show1.theatreId,
                name:"Theatre1"
            }
            //Mocks
            showModel.findById = jest.fn().mockImplementation((showId) => {
                if(showId==show1._id)
                {
                    return show1;
                }
                return null;
            });
            movieModel.findById = jest.fn().mockImplementationOnce(()=>movie1);
            theatreModel.findById = jest.fn().mockImplementation((theatreId)=>{
                if(theatreId==theatre1._id)
                {
                    return theatre1;
                }
                return null;
            });

            //Request
            const res = await request(app).get(`/api/show/${show1._id}`).send();

            //Checks
            expect(res.status).toBe(404);
            expect(showModel.findById).toHaveBeenCalledTimes(1);

        })

        test("given a valid show id that matches a show, but movie id is invalid", async () => {

            
            const show1={
                _id:"123456789012345678901234",
                movieId:"vkbew783y2hhVIBHKJh",
                theatreId:"123456789012345678901232"
            }
            const movie1=null;
            const theatre1={
                _id:show1.theatreId,
                name:"Theatre1"
            }
            //Mocks
            showModel.findById = jest.fn().mockImplementation((showId) => {
                if(showId==show1._id)
                {
                    return show1;
                }
                return null;
            });
            movieModel.findById = jest.fn().mockImplementationOnce(()=>movie1);
            theatreModel.findById = jest.fn().mockImplementation((theatreId)=>{
                if(theatreId==theatre1._id)
                {
                    return theatre1;
                }
                return null;
            });

            //Request
            const res = await request(app).get(`/api/show/${show1._id}`).send();

            //Checks
            expect(res.status).toBe(404);
            expect(showModel.findById).toHaveBeenCalledTimes(1);

        })

        test("given a valid show id that matches a show, but broken theatre referencial integrity", async () => {

            
            const show1={
                _id:"123456789012345678901234",
                movieId:"123456789012345678901231",
                theatreId:"123456789012345678901232"
            }
            const movie1={
                _id:show1.movieId,
                name:"Movie1"
            };
            const theatre1=null;
            //Mocks
            showModel.findById = jest.fn().mockImplementation((showId) => {
                if(showId==show1._id)
                {
                    return show1;
                }
                return null;
            });
            movieModel.findById = jest.fn().mockImplementationOnce((movieId)=>{
                if(movieId==movie1._id)
                {
                    return movie1;
                }
                return null;
            });
            theatreModel.findById = jest.fn().mockImplementation(()=>theatre1);

            //Request
            const res = await request(app).get(`/api/show/${show1._id}`).send();

            //Checks
            expect(res.status).toBe(404);
            expect(showModel.findById).toHaveBeenCalledTimes(1);

        })

        test("given a valid show id that matches a show, but theatre id is invalid", async () => {

            
            const show1={
                _id:"123456789012345678901234",
                movieId:"123456789012345678901231",
                theatreId:" je&7838*F8fgg"
            }
            const movie1={
                _id:show1.movieId,
                name:"Movie1"
            };
            const theatre1=null;
            //Mocks
            showModel.findById = jest.fn().mockImplementation((showId) => {
                if(showId==show1._id)
                {
                    return show1;
                }
                return null;
            });
            movieModel.findById = jest.fn().mockImplementationOnce((movieId)=>{
                if(movieId==movie1._id)
                {
                    return movie1;
                }
                return null;
            });
            theatreModel.findById = jest.fn().mockImplementation(()=>theatre1);

            //Request
            const res = await request(app).get(`/api/show/${show1._id}`).send();

            //Checks
            expect(res.status).toBe(404);
            expect(showModel.findById).toHaveBeenCalledTimes(1);

        })

        test("given a valid show id that matches a show, but broken theatre and movie referencial integrity", async () => {

            
            const show1={
                _id:"123456789012345678901234",
                movieId:"123456789012345678901231",
                theatreId:"123456789012345678901232"
            }
            const movie1=null;
            const theatre1=null;

            //Mocks
            showModel.findById = jest.fn().mockImplementation((showId) => {
                if(showId==show1._id)
                {
                    return show1;
                }
                return null;
            });
            movieModel.findById = jest.fn().mockImplementationOnce(()=>movie1);
            theatreModel.findById = jest.fn().mockImplementation(()=>theatre1);

            //Request
            const res = await request(app).get(`/api/show/${show1._id}`).send();

            //Checks
            expect(res.status).toBe(404);
            expect(showModel.findById).toHaveBeenCalledTimes(1);

        })

        test("given a valid show id that matches a show, but theatre id and movie id both are invalid", async () => {

            
            const show1={
                _id:"123456789012345678901234",
                movieId:"irrn&T^*gg99",
                theatreId:" je&7838*F8fgg"
            }
            const movie1=null;
            const theatre1=null;
            //Mocks
            showModel.findById = jest.fn().mockImplementation((showId) => {
                if(showId==show1._id)
                {
                    return show1;
                }
                return null;
            });
            movieModel.findById = jest.fn().mockImplementationOnce(()=>movie1);
            theatreModel.findById = jest.fn().mockImplementation(()=>theatre1);

            //Request
            const res = await request(app).get(`/api/show/${show1._id}`).send();

            //Checks
            expect(res.status).toBe(404);
            expect(showModel.findById).toHaveBeenCalledTimes(1);

        })

        test("given a valid show id that matches a show, and everything is correct", async () => {

            
            const show1={
                _id:"123456789012345678901234",
                movieId:"123456789012345678901231",
                theatreId:"123456789012345678901232"
            }
            const movie1={
                _id:show1.movieId,
                name:"Movie1"
            };
            const theatre1={
                _id:show1.theatreId,
                name:"Theatre1"
            }
            //Mocks
            showModel.findById = jest.fn().mockImplementation((showId) => {
                if(showId==show1._id)
                {
                    return show1;
                }
                return null;
            });
            movieModel.findById = jest.fn().mockImplementationOnce((movieId)=>{
                if(movieId==movie1._id)
                {
                    return movie1;
                }
                return null;
            });
            theatreModel.findById = jest.fn().mockImplementation((theatreId)=>{
                if(theatreId==theatre1._id)
                {
                    return theatre1;
                }
                return null;
            });

            //Request
            const res = await request(app).get(`/api/show/${show1._id}`).send();

            //Checks
            expect(res.status).toBe(200);
            expect(showModel.findById).toHaveBeenCalledTimes(1);
            expect(movieModel.findById).toHaveBeenCalledTimes(1);
            expect(theatreModel.findById).toHaveBeenCalledTimes(1);
            expect(res.body.movie.name).toBe(movie1.name);
            expect(res.body.theatre.name).toBe(theatre1.name);
        })

        test("database throws an error", async () => {

            //Mocks
            showModel.findById = jest.fn().mockImplementation(() => {throw new Error()});

            //Request
            const res = await request(app).get("/api/show/123456789012345678901234").send();

            //Checks
            expect(res.status).toBe(500);
            expect(showModel.findById).toHaveBeenCalledTimes(1);

        })
        

    })
})