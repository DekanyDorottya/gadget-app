const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 9001;

app.get("/", (req, res) => {
  res.redirect(301, "/pizza/list");
});
app.get(["/pizza/list", "/pizza/list:id"], (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});
app.use("/public", express.static(`${__dirname}/../frontend/public`));

let pizzas = JSON.parse(fs.readFileSync("./backend/pizzas.json"));
let allergens = JSON.parse(fs.readFileSync("./backend/allergens.json"));
let order = JSON.parse(fs.readFileSync("./backend/order.json"));

app.get("/api/pizza", (req, res) => {
  res.send(pizzas);
});
app.get("/api/allergen", (req, res) => {
  res.send(allergens);
});
app.get("/api/order", (req, res) => {
  res.send(order);
});

app.use(express.json());

app.post("/api/order", (req, res) => {
  res.send(req.body)
});

app.listen(port, (_) => console.log(`http://127.0.0.1:${port}`));
