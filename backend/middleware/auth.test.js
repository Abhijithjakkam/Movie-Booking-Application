const userModel = require("../models/userModel.js");
const isAuth = require("./auth.js");

const adminUserTokenObject = {
    email: "geujewhk@hfijrk.com",
    sub: "6838719332"
}

describe("auth middleware",()=>{
    test("admin user",()=>{
        const req={
            cookies:{
                authToken:JSON.stringify(adminUserTokenObject)
            },
            body:{

            }
        }

        const next = jest.fn().mockImplementation(()=>{});

        const res={};

        userModel.findOne = jest.fn().mockImplementation(()=>({
            email:adminUserTokenObject.email,
            googleId:adminUserTokenObject.sub,
            isAdmin:true
        }));

        isAuth(req,res,next);
        expect(userModel.findOne).toHaveBeenCalled();

    })
    test("no user",()=>{
        const req={
            cookies:{
                authToken:JSON.stringify(adminUserTokenObject)
            },
            body:{

            }
        }

        const next = jest.fn().mockImplementation(()=>{});

        const res={};

        userModel.findOne = jest.fn().mockImplementation(()=>null);
        userModel.create = jest.fn().mockImplementation(()=>null);

        isAuth(req,res,next);
        expect(userModel.findOne).toHaveBeenCalled();

    })

    test("user fetch throws error",()=>{
        const req={
            cookies:{
                authToken:JSON.stringify(adminUserTokenObject)
            },
            body:{

            }
        }


        const next = jest.fn().mockImplementation(()=>{});

        const res={
            status:()=>({
                json:()=>{}
            })
        };

        userModel.findOne = jest.fn().mockImplementation(()=>{throw new Error()});
        userModel.create = jest.fn().mockImplementation(()=>null);

        isAuth(req,res,next);
        expect(userModel.findOne).toHaveBeenCalled();

    })
})