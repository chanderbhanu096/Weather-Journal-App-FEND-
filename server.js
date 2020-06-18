// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const Cors = require('cors');
app.use(Cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Spin up the server
function listening() {
    // console.log(server);
    console.log('server is running');
    console.log(`running on localhost: ${port}`);
};
app.listen(port, listening);

// Post Route
const data = [];
app.post('/add', addInfo);

function addInfo(req, res) {
    newEntry = { date: req.body.date, temp: req.body.temp, content: req.body.content };
    projectData.push(newEntry);

    res.send(projectData);
    console.log(req.body)


}

// Callback function to complete GET '/all'
app.get('/all', getInfo);

function getInfo(req, res) {
    res.send(projectData);
}