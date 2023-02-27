const rootElement = document.getElementById("root");
rootElement.insertAdjacentHTML(
  "beforeend",
  `
<div id="headline">

    
        <input list="filter" name="allergens" id="allergens" placeholder="filter by allergens" onfocus="this.value=''" onchange="this.blur();">
        <datalist id="filter"></datalist>

        <button id="cart">cart</button>
</div>
<div id="pizzas"></div>
<div id="footer"></div>
`
);

const elementOfAllThePizzas = document.getElementById("pizzas");

function createElementForPizza(pizza) {
  elementOfAllThePizzas.insertAdjacentHTML(
    "beforeend",
    `<div class="item" id="${pizza}">
        <div class="name">${pizza}</div>
        <button class="addBtn" id="${pizza}AddBtn">add</button>
        <input class="amountBtn" id="${pizza}AmountBtn">amount</input> 
    </div>`
  );
}

function createElementForPizzaAllergents(allergen, pizzaId) {
  document
    .getElementById(pizzaId)
    .insertAdjacentHTML("beforeend", `<div class="name">${allergen}</div>`);
}

function createOptionsForAllergens(allergen) {
  document
    .getElementById("filter")
    .insertAdjacentHTML("beforeend", `<option value="${allergen}">`);
}

async function fetchPizzas() {
  const response = await fetch("http://127.0.0.1:9001/api/pizza");
  const pizzas = await response.json();

  const res = await fetch("http://127.0.0.1:9001/api/allergen");
  const allergens = await res.json();

  pizzas.forEach((pizza) => {
    createElementForPizza(pizza.name);
    allergens.forEach((allerg) => {
      if (pizza.allergens.includes(allerg.id)) {
        createElementForPizzaAllergents(allerg.name, pizza.name);
      }
    });
  });

  allergens.forEach((allergen) => {
    createOptionsForAllergens(allergen.name);
  });

  function filterPizzasByAllergent() {
    document
      .getElementById("allergens")
      .addEventListener("change", function (event) {
        allergens.forEach((allergen) => {
          if (allergen.name === event.target.value) {
            document.getElementById("pizzas").replaceChildren();
            pizzas.filter((pizza) => {
              if (!pizza.allergens.includes(allergen.id)) {
                createElementForPizza(pizza.name);
                allergens.forEach((allerg) => {
                  if (pizza.allergens.includes(allerg.id)) {
                    createElementForPizzaAllergents(allerg.name, pizza.name);
                  }
                });
              }
            });
          }
        });
      });
  }
  filterPizzasByAllergent();
}
fetchPizzas();

async function sendFormData() {
  /* const myData = document.getElementById("myData");
  const formData = new FormData(myData);

  const obj = Object.fromEntries(formData); */

  const res = await fetch("http://127.0.0.1:9001/api/order", {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "user": {
      "email" : "email",
      "password" : "password"
    }}),
  });
  const response = await res.json();

  console.log(response);
}
sendFormData();
