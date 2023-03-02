const fs = require('fs');

let allergens = JSON.parse(fs.readFileSync('./backend/allergens.json'));

exports.sendAllergenJsonToRoute = (req, res) => {
  res.send(allergens);
};
