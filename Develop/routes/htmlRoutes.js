// Dependencies
const path = require("path");

// Page routing
module.exports = function(app) {
//returns the notes.html file
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//returns the index.html file
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
    
};