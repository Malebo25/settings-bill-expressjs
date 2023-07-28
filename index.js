import express from "express";
import { engine } from "express-handlebars";

const app = express(); //instntiate app

app.engine("handlebars", engine({ defaultLayout: "main" })); //configure express as middleware
app.set("view engine", "handlebars");
// app.set("views", "./views");

app.use(express.static("public"));

app.get("/", function (req, res) {
  //set default root
  res.render("index");
});

app.post("/settings", function (req, res) {
  //
});
app.post("/action", function (req, res) {
  //
});
app.post("/action", function (req, res) {
  //
});

app.post("/actions/:type", function (req, res) {
  //helps us display call or sms
  //
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log("App started atport", PORT);
});
