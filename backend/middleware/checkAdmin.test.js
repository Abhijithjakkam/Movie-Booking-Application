const checkAdmin = require("./checkAdmin");

describe("checkAdmin middleware",()=>{
    test("admin user",()=>{
        const req={
            body:{
                userDetails:{
                    isAdmin:true
                }
            }
        }

        const next = jest.fn().mockImplementation(()=>{});

        const res={
            status:()=>({
                json:()=>{}
            })
        };

        checkAdmin(req,res,next);

    })
    test("no user",()=>{
        const req={
            body:{
            }
        }

        const next = jest.fn().mockImplementation(()=>{});

        const res={
            status:()=>({
                json:()=>{}
            })
        };

        checkAdmin(req,res,next);

    })

    test("non admin user",()=>{
        const req={
            body:{
                userDetails:{
                    isAdmin:false
                }
            }
        }

        const next = jest.fn().mockImplementation(()=>{});

        const res={
            status:()=>({
                json:()=>{}
            })
        };

        checkAdmin(req,res,next);

    })

    test("error in req body",()=>{
        const req={
        }

        const next = jest.fn().mockImplementation(()=>{});

        const res={
            status:()=>({
                json:()=>{}
            })
        };

        checkAdmin(req,res,next);

    })
})