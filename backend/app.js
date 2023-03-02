const express = require('express');
const path = require('path');
const fs = require('fs');
const filePath = path.join(`${__dirname}/order.json`);

const pizzasRouter = require('./routes/pizzasRoutes');
const allergensRoute = require('./routes/allergensRoutes');
const ordersRoute = require('./routes/ordersRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/pizza', pizzasRouter);
app.use('/api/allergen', allergensRoute); //mounting
app.use('/api/order', ordersRoute);

const sendFileIndexHtml = (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
};

app.get('/pizza/list', sendFileIndexHtml);
app.use('/public', express.static(`${__dirname}/../frontend/public`));

if (fs.existsSync('./backend/order.json')) {
  orders = JSON.parse(fs.readFileSync('./backend/order.json')).orders;
}

module.exports = app;
