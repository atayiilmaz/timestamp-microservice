// index.js
// where your node app starts
//hi

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/:date?", function (req, res,next) {
  const inputDate = req.params.date;

let date;
let unixTimestamp;

// Check if the input date is empty
if (!inputDate) {
  date = new Date();
  unixTimestamp = date.getTime();
} else if (!isNaN(inputDate)) {
  // Check if the input date is a valid Unix timestamp
  unixTimestamp = parseInt(inputDate);
  date = new Date(unixTimestamp);
} else {
  // Check if the input date is a valid UTC date string
  date = new Date(inputDate);
  unixTimestamp = date.getTime();
}

// Check if the date is valid
if (isNaN(date)) {
  return res.json({ error: 'Invalid date' });
}

// Format the date string in the required format
const utcDateString = date.toUTCString();

// Return the JSON object with the Unix timestamp or formatted date string
if (!inputDate) {
  return res.json({ unix: unixTimestamp, utc: utcDateString});
} else {
  return res.json({ unix: unixTimestamp, utc: utcDateString });
}
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});




// Helper function to validate the date format
function isValidDate(dateString) {
return !isNaN(Date.parse(dateString));
}




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
