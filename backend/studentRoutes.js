const express = require("express");
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId

let studentRoutes = express.Router()

//#1 retrive all
//http"//localhost:3000/student
studentRouters.route("/student").get(async(request, response) => {
    let db = database.getDb()
    let students = await db.collection("student").find({}).toArray()    
    if (students.length > 0) {
        respose.json(data)
    } else {
        throw new Error("Data was not found :(")    
    }
    })


//#2 retrive one
//http://localhost:3000/student/12345
studentRouters.route("/student/:id").get(async(request, response) => {
    let db = database.getDb()
    let students = await db.collection("student").findOne({_id: new ObjectId(request.params.id)})   
    if (Object.keys(data).length > 0) {
        respose.json(data)
    } else {
        throw new Error("Data was not found :(")    
    }
    })
//#3 create one
studentRouters.route("/student").post(async(request, response) => {
    let db = database.getDb()
    let mongoObject = {
        name: request.body.name,
        age: request.body.age,
        year: request.body.year,   
        degree: request.body.degree,
        email: request.body.email,  
    }
    let students = await db.collection("student").InsertOne(mongoObject)  
    response.json(data)
    })
//#4 update one
studentRouters.route("/studen/:id").post(async(request, response) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
          name: request.body.name,
         age: request.body.age,
         year: request.body.year,   
         degree: request.body.degree,
         email: request.body.email,  
    }
    }
    let students = await db.collection("student").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)  
    response.json(data)
    })
//#5 delete one
studentRouters.route("/student/:id").delete(async(request, response) => {
    let db = database.getDb()
    let students = await db.collection("student").deleteOne({_id: new ObjectId(request.params.id)})   
    response.json(data)
    })

    module.exports = studentRoutes