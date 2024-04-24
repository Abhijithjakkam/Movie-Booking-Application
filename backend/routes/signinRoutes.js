const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const axios = require("axios");
const { json } = require("body-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

// GET /api/auth/google
authRouter.get("/google", (req, res) => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;
    res.redirect(authUrl);
});

// GET /api/auth/google/callback
authRouter.get("/google/callback", async (req, res) => {
    const code = req.query.code;
    try {
        // console.log(await axios.post(),await axios.get())
        const { data } = await axios.post("https://oauth2.googleapis.com/token", {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: process.env.REDIRECT_URI,
        });

        const { access_token } = data;
        // Use the access_token to make requests to the Google API
        // Example: Fetch user information using the access_token
        const { data: userData } = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );

        res.cookie("authToken", JSON.stringify(userData), {
            sameSite: "none",
            secure:true
        });

        res.redirect("https://localhost:5173/");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/auth/emailandpassword
authRouter.post("/emailandpassword", async (req, res) => {
    try {
        const email = req.body.email;

        res.cookie(
            "authToken",
            JSON.stringify({
                email,
                name: "Name not set",
                sub: "1234",
            }),
            {
                sameSite: "none",
            }
        );

        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = { authRouter };
