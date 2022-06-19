let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

app.get("/json", (req, res) => {
  const mySecret = process.env['MESSAGE_STYLE']
  if (mySecret === "uppercase")
    res.json({message: "HELLO JSON"});
  else
    res.json({message: "Hello json"});
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
});

app.get("/name", (req, res) => {
  res.json({name: `${req.query.first} ${req.query.last}`});
});

app.post("/name", (req, res) => {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});
