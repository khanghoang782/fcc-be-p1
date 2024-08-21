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
  let dateReq=req.params['date'];
  if(!isNaN(dateReq)){
    const newDate=new Date(dateReq*1000);
    return res.json({unix:dateReq,'utc':newDate.toUTCString()});
  }
  let date = new Date(dateReq);
  if(date.toString()==="Invalid Date"){
    return res.json({ error: "Invalid Date" });
  }
  if(dateReq.includes('-')){
    return res.json({unix:Math.floor(date.getTime()/1000),utc:date.toUTCString()})
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
