// email: {
//     type: String,
//     unique: true
// },
// name: {
//     type: String,
//     default: "Name not Set"
// },
// googleId: {
//     type: String,
//     required: true
// },
// isAdmin: {
//     type: Boolean,
//     default: false
// }

const userModel = require("../models/userModel");

const isAuth = async (req, res, next) => {
    try {
        req.body.authDetails = (req.cookies?.authToken) ? JSON.parse(req.cookies?.authToken) : undefined;
        let authDetails = req.body.authDetails;
        let email = authDetails?.email;
        let name = authDetails?.name;
        let googleId = authDetails?.sub;
        if (!googleId) {
            authDetails = undefined;
            next();
            return;
        }
        if (!name) {
            name = "Name not Set";
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            const savedUser = await userModel.create({
                email,
                name,
                googleId,
                isAdmin: false
            });
            req.body.userDetails = savedUser;
        }
        else {
            req.body.userDetails = user;
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            message: "Oops! Something went wrong. Try again later!"
        })
    }
};
module.exports = isAuth;