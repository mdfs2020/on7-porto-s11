const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//rotas
const index = require("./routes/index");
const series = require("./routes/seriesRoute");
//const musicas = require("./routes/musicasRoute");

// configurar body parser

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use("/", index);
app.use("/series", series);

module.exports = app;