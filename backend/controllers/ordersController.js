const fs = require('fs');
const path = require('path');

const filePath = path.join(`${__dirname}/../order.json`);

let orders = [];

exports.writeNewOrdersToOrderJson = async (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder);
  fs.writeFileSync(filePath, JSON.stringify({ orders: orders }, null, 4));
  res.send({ result: 'Done' });
};
exports.sendOrdersJsonToRoute = (req, res) => {
  res.send(orders);
};
