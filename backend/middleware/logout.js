const jwt = require('jsonwebtoken')
const UserData = require('../model/userSchema')



const logout = async (req, res, next) => {
    
    try {

        const token = req.cookies.jwtoken
        if (token) {
            console.log(token)
            
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await UserData.findOne({ _id: verifyToken._id, "tokens.token": token });


        if (!rootUser) { throw new Error('user not found') }
        else {
            rootUser.tokens = rootUser.tokens.filter(tokenObj => tokenObj.token !== token);
            await rootUser.save();

        }

        next();
    } catch (error) {
        res.status(401).send("unauthorized: token not provided")
    }


}
module.exports = logout;