const express = require("express");
const path = require("path")
const fs = require("fs");
const { Recoverable } = require("repl");
const app = express();

// This will allow Heroku to set the port for the application
const PORT = process.env.PORT || 8080;


/*The “extended” syntax allows for rich objects and arrays to be encoded into 
the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
Reference: https://expressjs.com/en/4x/api.html#express.urlencoded*/
app.use(express.urlencoded({ extended: true }));

// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

//This configures the app
app.use(express.static("public"))
const dbData = JSON.parse(fs.readFileSync("db/db.json", "utf8"))
let currentId = 2