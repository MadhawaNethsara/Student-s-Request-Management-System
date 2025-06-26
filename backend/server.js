const connect = require("./connect.js")
const express = require("express")
const cors = require("cors")
const student = require("./studentRoutes")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json()) 
app.use(student)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server is running on port ${PORT}`)
})
