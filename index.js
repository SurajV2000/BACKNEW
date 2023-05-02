const { connection } = require("./db")
const express = require("express")
const { userRouter } = require("./routes/user.route")
const { auth } = require("./Middleware/middleware")
const { postRouter } = require("./routes/post.route")
const cors=require("cors")


const app = express()
app.use(express.json())
app.use("/users", userRouter)
app.use("/post",auth,postRouter)

app.listen(8080, async () => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running at port 8080")
})