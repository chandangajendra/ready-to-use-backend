require('dotenv').config();
require("./db/conn")
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const registers = require("./models/register");
const port = process.env.PORT || 8000;

// setting the path 
const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const bootstrapPath = path.join(__dirname, "../node_modules/bootstrap/dist/css")
const jsPath = path.join(__dirname, "../node_modules/bootstrap/dist/js")
const jqPath = path.join(__dirname, "../node_modules/jquerry/dist")
const partials_path = path.join(__dirname, "../templates/partials");

// middlewares
app.use('/css', express.static(bootstrapPath));
app.use('/js', express.static(jsPath));
app.use('/jq', express.static(jqPath));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path)

// our Routers
app.get('/', (req, res) => {
    res.render("index");
})

// listening to the port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})