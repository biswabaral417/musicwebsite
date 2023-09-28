const express = require('express');
const router = express.Router()
require('../db/connection')
const UserData = require('../model/userSchema');
const bcrypt = require('bcrypt')



router.post('/bend/admins/register', async (req, res) => {

    const { userName, userPhone, userEmail, userPassword, userConfirmPassword} = req.body //es6 prop object destructuring ir userName=req.body.userName to {userNAme}=req.body
    if (!userName && !userPhone &&!userEmail || !userPassword || !userConfirmPassword) {
        return res.status(422).json({ error: "enter all credintials" })
    }
    else {

        try {
            const userExists = await UserData.findOne({ userEmail: userEmail })
            if (userExists) {
                return res.status(422).json({ error: "user exists" })
            }
            else if (userConfirmPassword != userPassword) {
                return res.status(422).json({ error: "passwords donot match" }).send("error:passwords donot match")

            }
            else {
                const user = new UserData({ userName, userPhone, userEmail, userPassword,isAdmin:true })
                const userRegistered = await user.save()
                if (userRegistered) {
                    res.status(201).json({ sucess: " registered" });
                }
                else {
                    res.status(500).json({ failed: "server error" });
                }
            }

        } catch (error) {
            console.log(error);

        }

    }

})

module.exports=router