//Dependencies
const express = require("express");
const app = express();

// This will allow Heroku to set the port for the application
const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to load css and javascript files from the public folder
app.use(express.static('public'))

// Routes
require("./Develop/routes/apiRoutes")(app);
require("./Develop/routes/htmlRoutes")(app);

// Logging when the server has started
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});

