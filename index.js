import express from "express";
import exphbs from "express-handlebars";
import BillWithSettings from "./settings-bill.js";
import moment from "moment";

const app = express(); //instantiate app

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

app.use(express.json()); // To handle JSON data

app.get("/", function (req, res) {
  //set default root
  res.render("index", {
    settings: settingsBill.getSettings(),
    totals: {
      ...settingsBill.totals(),
      grandTotalClass: settingsBill.hasReachedCriticalLevel()
        ? "danger"
        : settingsBill.hasReachedWarningLevel()
        ? "warning"
        : "",
    },
    settingsBill, // to pass the settingsBill object
  });
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

  settingsBill.recordAction(req.body.actionType, moment());
  res.redirect("/");
});
app.get("/actions", function (req, res) {
  res.render("actions", { actions: settingsBill.actions() });
});

app.get("/actions/:actionType", function (req, res) {
  const actionType = req.params.actionType;

  const allActions = settingsBill.actionsFor(actionType);

  const timeAgo = allActions.forEach((list) => {
    list.timestamp = moment().startOf("minute").fromNow();
  });

  res.render("actions", {
    actions: settingsBill.actionsFor(actionType),
    timeAgo,
  });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, function () {
  console.log("App started atport", PORT);
});
