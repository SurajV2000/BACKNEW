const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model")
const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body
    let user = await UserModel.findOne({ email })
        if (user) {
        return res.send({"msg":"already registered"})
        }
    try {
        bcrypt.hash(password, 5, async(err, hash) => {
         user = new UserModel({ name, email, gender, password: hash })
            console.log(user)
            await user.save()
        res.status(200).send({"msg":"New user has been registered"})
        });
    } catch (error) {
        res.status(500).send({"err":error.message})
    }
})

userRouter.get("/",async (req,res) => {
    let userData = await UserModel.find()
    res.send(userData)
})



userRouter.post("/login", async (req,res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({course:"backend",},"masai")
                    res.status(200).send({ "msg": "Login Successfully", "token": token })
                } else {
                    res.status(200).send({ "msg": "Wrong Credentials"})
              }
            });
        } else {
            res.status(200).send({ "msg": "Wrong Credentials"})
        }
    } catch (error) {
        res.status(500).send({"err":error.message})
    }
})

module.exports = {
    userRouter
}