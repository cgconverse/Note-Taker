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

//This configures the app
app.use(express.static("public"))
const dbData = JSON.parse(fs.readFileSync("db/db.json", "utf8"))
let currentId = 2

//Data API routes

app.get("/api/notes", function(req, res) {
    res.send(dbData)
});

app.post("/api/notes", function(req, res) {
    dbData.push({
        ...req.body,
        id: currentId
    })
    currentId++
    fs.writeFileSync("db/db.json", JSON.stringify(dbData), "utf8")
    res.send(dbData)
});

//API route to delete notes
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