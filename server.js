const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const db = require("quick.db");
const { nanoid } = require("nanoid");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
const app = express();

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("view engine", "html");
app.engine("html", ejs.renderFile);
const port = 3000 || process.env.port;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home", db: db });
});

app.post("/api/add", (req, res) => {
  db.push(nanoid(), { title: DOMPurify.sanitize(req.body.title),
    content: DOMPurify.sanitize(req.body.content),
    author: DOMPurify.sanitize(req.body.author) });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});