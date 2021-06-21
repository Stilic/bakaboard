const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');
const db = require("quick.db");
const app = express();

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
const port = 3000 || process.env.port;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});