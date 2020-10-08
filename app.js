const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

/* command line setting Environment variables and secret info 
  export/set app_password=12345
  set NODE_ENV=production setup production
*/

// configuration
console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
console.log("Mail password:" + config.get("mail.password"));
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);by default development

/* view template */
app.set("view engine", "pug");
app.set("views", "./views"); //default views

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled!"); //console.log shorter function
}
/* debugger setup on command Line 
  set DEBUG=app:startup
  for reseting env debugging info
  set DEBUG=
  set DEBUG=app:startup,ap:db multiple messages OR
  set DEBUG=app:* all namespaces
  shorcut env setup
  DEBUG=app:db nodemon app.js

*/

/* db work */
dbDebugger("Connected to the database ...");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
