const express = require("express");
const path = require("path");
const fs = require("fs");
const filePath = path.join(`${__dirname}/order.json`);



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
let orders = [];
if(fs.existsSync("./backend/order.json")) {
  orders = JSON.parse(fs.readFileSync("./backend/order.json")).orders
};


app.get("/api/pizza", (req, res) => {
  res.send(pizzas);
});
app.get("/api/allergen", (req, res) => {
  res.send(allergens);
});
app.get("/api/order", (req, res) => {
  res.send(orders);
});

app.use(express.json());

app.post("/api/order", async (req, res) => {
  const newOrder = req.body
  orders.push(newOrder)
  fs.writeFileSync(filePath, JSON.stringify({ orders: orders }, null, 4))
  res.send({result: "Done"})
});

app.listen(port, (_) => console.log(`http://127.0.0.1:${port}`));
