// creating variables to require all dependencies
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const util = require("util");

// Use promisify to read and write files
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Module export function
module.exports = function (app) {

    // Get API requests
    app.get("/api/notes", function (req, res) {
        // Reads the db.json file
        return readFileAsync(path.join(__dirname + "/../db/db.json"), "utf8").then(data => {
            // Returns all saved notes as JSON 
            res.json(JSON.parse(data));
        }).catch(err => {
            if (err) throw err;
        })
    });

    // Post API requests
    app.post("/api/notes", function (req, res) {
        const { title, text } = req.body
        console.log(req.body);
        id = uuidv1();
        const newData = {
            id,
            title,
            text,
        }

        let db = readFileAsync(path.join(__dirname + "../db/db.json"), "utf8").then(data => {
            // Return response as json object
            db = JSON.parse(data);
            db.push(newData);
            fs.writeFile(path.join(__dirname + "../db/db.json"), JSON.stringify(db), (err) => err ? console.error(err) : console.log("Note added"));
            res.json(db);
        }).catch(err => {
            if (err) throw err;
        })
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


}