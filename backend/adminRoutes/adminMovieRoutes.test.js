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
describe('movie admin api', () => {
    describe('add movies', () => {


        test("adding all movie details", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(201);
            expect(movieModel.create).toHaveBeenCalled();
            expect(res.body).toEqual({
                ...movie1Input,
                id: exampleId
            });
        })


        test("adding movie details without name", async () => {

            const movie1Input = {
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details without duration", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details without name and duration", async () => {

            const movie1Input = {
                imageUrl: "https://www.somemovie.com",
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with name as number", async () => {

            const movie1Input = {
                name: 20,
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with duration as string", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: "82110rgewfw2",
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with name as object", async () => {

            const movie1Input = {
                name: {},
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with duration as object", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: {},
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details without image url", async () => {

            const movie1Input = {
                name: "Animal",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(201);
            expect(movieModel.create).toHaveBeenCalled();
        })

        test("adding movie details without description", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(201);
            expect(movieModel.create).toHaveBeenCalled();
        })

        test("adding movie details without image url and description", async () => {

            const movie1Input = {
                name: "Animal",
                durationInMilliseconds: 821102,
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(201);
            expect(movieModel.create).toHaveBeenCalled();
        })

        test("adding movie details with image url as number", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: 3123,
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with image url as object", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: {},
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with description as number", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: 31233
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with description as object", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: {}
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("adding movie details with no data", async () => {

            const movie1Input = {
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(400);
            expect(movieModel.create).not.toHaveBeenCalled();
        })

        test("database throws an error", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => {throw new Error()});

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(res.status).toBe(500);
        })
    })

    describe('get all movies', () => {


        test("get all movie details", async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(() => ([movie1, movie2]))
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).get("/api/admin/all_movies").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(200);
            expect(movieModel.find).toHaveBeenCalled();
        })


        test('given random parameters', async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(() => ([movie1, movie2]))
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const res = await request(app).get("/api/admin/all_movies/tf6t7tj").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(404);
            expect(movieModel.find).not.toHaveBeenCalledWith();
        })

        test("database throws an error", async () => {

            //Mocks
            movieModel.find = jest.fn().mockImplementationOnce(() => {throw new Error()})
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const res = await request(app).get("/api/admin/all_movies").set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            //Checks
            expect(res.status).toBe(500);
        })

    })

    describe("edit movie by id", () => {


        async function addEditandReturnResponse(movie1Input, exampleId, editParams) {
            //-----------------------------
            //-----Adding the Movie
            //------------------------------

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const addRes = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(addRes.status).toBe(201);
            expect(movieModel.create).toHaveBeenCalled();
            expect(addRes.body).toEqual({
                ...movie1Input,
                id: exampleId
            });


            //-----------------------------
            //-----Editing the Movie
            //------------------------------

            //Mocks
            movieModel.findByIdAndUpdate = jest.fn().mockImplementationOnce((id, editParams) => {
                if (id == exampleId) {
                    return { ...movie1Output, ...editParams }
                }
                else {
                    return null;
                }
            });

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const editRes = await request(app).put(`/api/admin/movie/${exampleId}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send(editParams);

            let { id, ...editedMovieWithoutId } = editRes.body;

            if (editRes.status == 400) {
                editedMovieWithoutId = movie1Input;
            }


            //-----------------------------
            //-----Checking the Movie
            //------------------------------

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce((id) => {
                if (id == exampleId) {
                    return { ...editedMovieWithoutId, _id: id };
                }
                else {
                    return null;
                }
            });
            showModel.find = jest.fn().mockImplementationOnce(() => []);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => []);

            //Request
            const getRes = await request(app).get(`/api/movie/${exampleId}`).send();
            return { editRes, getRes };
        }

        test("adding a movie and editing name", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                name: "ChangedName"
            }

            const { getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                ...editParams,
                shows: []
            })

        })

        test("adding a movie and editing imageUrl", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                imageUrl: "ChangedImage"
            }

            const { getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                ...editParams,
                shows: []
            })

        })

        test("adding a movie and editing description", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                description: "ChangedDescription"
            }

            const { getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                ...editParams,
                shows: []
            })

        })

        test("adding a movie and editing duration", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                durationInMilliseconds: 1334442
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(200);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
            expect(editRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                message: "Can't edit duration as it breaks consistency",
            })
            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })

        })

        test("adding a movie and editing name with number", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                name: 1334442
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(400);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })

        })

        test("adding a movie and editing duration with string", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                durationInMilliseconds: "133444der2"
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(200);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(editRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                message: "Can't edit duration as it breaks consistency",
            })

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })

        })

        test("adding a movie and editing name with object", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                name: {}
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(400);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })

        })

        test("adding a movie and editing duration with object", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                durationInMilliseconds: {}
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(200);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(editRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                message: "Can't edit duration as it breaks consistency",
            })

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })

        })

        test("adding a movie and editing image url with number", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                imageUrl: 1334442
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(400);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })
        })

        test("adding a movie and editing image url with object", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                imageUrl: {}
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(400);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })
        })

        test("adding a movie and editing description with number", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                description: 134424
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(400);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })
        })

        test("adding a movie and editing description with object", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                description: {}
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(400);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })
        })

        test("adding a movie and editing non existing values", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                xyz: "",
                abc: ""
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(200);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })
        })

        test("adding a movie and editing with an empty query", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(200);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                shows: []
            })
        })

        test("adding a movie and editing multiple values at once", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                name: "ChangedName",
                imageUrl: "ChangedImage"
            }

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(200);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                ...editParams,
                shows: []
            })
        })

        test("adding a movie and editing all values at once", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const editParams = {
                name: "ChangedName",
                imageUrl: "ChangedImage",
                durationInMilliseconds: 938203,
                description: "ChangedDescription"
            }

            const { durationInMilliseconds, ...editParamsWithoutDuration } = editParams;

            const { editRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId, editParams);


            //Checks
            expect(editRes.status).toBe(200);

            expect(getRes.status).toBe(200);
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();

            expect(getRes.body).toEqual({
                ...movie1Input,
                id: exampleId,
                ...editParamsWithoutDuration,
                shows: []
            })
        })

        test("save fails",async ()=>{
            //Mocks
            movieModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(null);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const res = await request(app).put(`/api/admin/movie/123456789012345678901234`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            expect(res.status).toBe(404);
        })

        test("database throws an error",async ()=>{
            //Mocks
            movieModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(()=>{throw new Error()});

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const res = await request(app).put(`/api/admin/movie/123456789012345678901234`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            expect(res.status).toBe(500);
        })

        
    })

    describe("delete movie by id",()=>{

        async function addEditandReturnResponse(movie1Input, exampleId) {
            //-----------------------------
            //-----Adding the Movie
            //------------------------------

            const movie1Output = {
                _id: exampleId,
                ...movie1Input
            }

            //Mocks
            movieModel.create = jest.fn().mockImplementationOnce(() => (movie1Output));
            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);

            //Request
            const addRes = await request(app).post("/api/admin/add_movie").set("Cookie", [
                "authToken=" + adminCookie
            ]).send(movie1Input);

            //Checks
            expect(addRes.status).toBe(201);
            expect(movieModel.create).toHaveBeenCalled();
            expect(addRes.body).toEqual({
                ...movie1Input,
                id: exampleId
            });


            //-----------------------------
            //-----Deleting the Movie
            //------------------------------

            //Mocks
            movieModel.findByIdAndDelete = jest.fn().mockImplementationOnce((id) => {
                if (id == exampleId) {
                    return { ...movie1Output }
                }
                else {
                    return null;
                }
            });


            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const deleteRes = await request(app).delete(`/api/admin/movie/${exampleId}`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();


            //-----------------------------
            //-----Checking the Movie
            //------------------------------

            //Mocks
            movieModel.findById = jest.fn().mockImplementationOnce((id) => {
                if (id == exampleId) {
                    return null;
                }
                else {
                    return {};
                }
            });
            showModel.find = jest.fn().mockImplementationOnce(() => []);
            theatreModel.findById = jest.fn().mockImplementationOnce(() => []);

            //Request
            const getRes = await request(app).get(`/api/movie/${exampleId}`).send();
            return { deleteRes, getRes };
        }

        test("adding a movie with all values and deleting it", async () => {

            const movie1Input = {
                name: "Animal",
                imageUrl: "https://www.somemovie.com",
                durationInMilliseconds: 821102,
                description: "this the Animal description"
            }

            const exampleId = "123456789012345678901234";

            const { deleteRes, getRes } = await addEditandReturnResponse(movie1Input, exampleId);


            //Checks
            expect(deleteRes.status).toBe(200);

            expect(getRes.status).toBe(404);
            expect(movieModel.findByIdAndDelete).toHaveBeenCalled();
            expect(movieModel.findById).toHaveBeenCalled();
            expect(showModel.find).not.toHaveBeenCalled();
            expect(theatreModel.findById).not.toHaveBeenCalled();
        })

        test("save fails",async ()=>{
            //Mocks
            movieModel.findByIdAndDelete = jest.fn().mockImplementationOnce(null);

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const res = await request(app).delete(`/api/admin/movie/123456789012345678901234`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            expect(res.status).toBe(404);
        })

        test("database throws an error",async ()=>{
            //Mocks
            movieModel.findByIdAndDelete = jest.fn().mockImplementationOnce(()=>{throw new Error()});

            userModel.findOne = jest.fn().mockImplementationOnce(() => adminUserObject);


            //Request
            const res = await request(app).delete(`/api/admin/movie/123456789012345678901234`).set("Cookie", [
                "authToken=" + adminCookie
            ]).send();

            expect(res.status).toBe(500);
        })


    })
})