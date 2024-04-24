
const checkAdmin = async (req, res, next) => {
    try {
        const user = req.body.userDetails;
        if(typeof(user)!=="object")
        {
            return res.status(403).json({
                message:"Please login!"
            })
        }
        if(!user.isAdmin)
        {
            return res.status(403).json({
                message:"You are not an admin!"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            message: "Oops! Something went wrong. Try again later!"
        })
    }
};
module.exports = checkAdmin;