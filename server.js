const express = require("express");
const path = require("path")
const fs = require("fs");
const { Recoverable } = require("repl");
const app = express();

// This will allow Heroku to set the port for the application
const PORT = process.env.PORT || 8080;


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to load css and javascript files from the public folder
app.use(express.static('public'))


//This configures the app
app.use(express.static("public"))
const dbData = JSON.parse(fs.readFileSync("db/db.json", "utf8"))
let currentId = 2

//Data API routes

//reads the db.json file and returns all saved notes as JSON
app.get("/api/notes", function(req, res) {
    res.send(dbData)
});

//receives a new note and saves it on the request body
app.post("/api/notes", function(req, res) {
    dbData.push({
        ...req.body,
        id: currentId
    })
    //adds note to db.json and returns the new note to the client
    currentId++
    fs.writeFileSync("db/db.json", JSON.stringify(dbData), "utf8")
    res.send(dbData)
});

//API route to delete the notes by id
app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const dbDataTemp = dbData.findIndex(p => p.id == id);
    dbData.splice(dbDataTemp, 1);
    fs.writeFile("./db/db.json", JSON.stringify(dbData), err => {
        if (err) throw err
        res.json(dbData)
    })
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

//HTML Routes

//returns the notes.html file
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//returns the index.html file
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
    // Logging when the server has started
    console.log("Server listening on: http://localhost:" + PORT);
});

