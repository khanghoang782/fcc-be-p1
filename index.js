// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api", function (req, res) {
  var date =new Date();
  var unixTime=date.getTime();
  res.json({unix:unixTime,utc:date.toUTCString()});
});
app.get("/api/:date",(req,res)=>{
  var dateParam=req.params['date'];
  var parsedDate=Date.parse(dateParam);
  console.log(dateParam+" - "+parsedDate);
  if(!isNaN(parsedDate)){
    let utc = new Date(dateParam);
    let unix=Number(parsedDate);
    //console.log("parsed: "+utc+"- "+unix);
    res.json({'unix':unix,'utc':utc.toUTCString()});
  }else{
    let unix=Number(dateParam);
    let utc = new Date(unix);
    console.log("parsed 2: "+utc.toUTCString()+"- "+unix);
    if(utc.toString()==="Invalid Date"){
      res.json({'error':"Invalid Date"});
    }else{
      res.json({'unix':unix,'utc':utc.toUTCString()});
    }
  }
});
app.use((req, res, next) => {
  console.log(req.method+" - "+req.path+" - "+req.ip);
  next();
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
