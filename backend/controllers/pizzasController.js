const fs = require('fs');

let pizzas = JSON.parse(fs.readFileSync(`${__dirname}/../pizzas.json`));

exports.sendPizzaJsonToRoute = (req, res) => {
  res.send(pizzas);
};

exports.sendFileIndexHtml = (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
};
