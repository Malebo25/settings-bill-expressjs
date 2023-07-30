import express from "express";
import exphbs from "express-handlebars";
import BillWithSettings from "./settings-bill.js";

// import pkg from "body-parser";
// const { bodyParser } = pkg;
// function urlToFilepath(url) {
//   return new URL(url).pathname;
// }

// const __filename = urlToFilepath(import.meta.url); //define path to main.handlebars
// const __dirname = path.dirname(__filename);

const app = express(); //instantiate app
// const viewsPath = path.join(__dirname, "views");
// const viewsPath = path.join(__dirname, "./views");
const settingsBill = BillWithSettings();

const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});
app.engine("handlebars", handlebarSetup); //configure express as middleware
app.set("view engine", "handlebars");

app.set("views", "./views");
app.use(express.static("public")); // middleware to make public folder visible

app.use(express.urlencoded({ extended: false })); // set up body parser to create middleware for when settings are updated
// parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // To handle JSON data

app.get("/", function (req, res) {
  //set default root
  res.render("index", {
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals(),
  }); //redirect back to defaul root and send data back to the screen
});

app.post("/settings", function (req, res) {
  // call, sms settings
  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel,
  });

  res.redirect("/");
});
app.post("/action", function (req, res) {
  //capture record type

  settingsBill.recordAction(req.body.actionType);
  res.redirect("/");
});
app.post("/action", function (req, res) {
  //
});

app.post("/actions/:type", function (req, res) {
  //helps us display call or sms
  //
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, function () {
  console.log("App started atport", PORT);
});
