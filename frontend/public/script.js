// cart format:
//
//  [{id: 1, amount: 2}
//   {id: 8, amount: 1}],
const cart = {
  pizzas: [],
  date: generateCurrentDate(),
  customer: {
    name: "",
    email: "",
    address: {
      city: "",
      street: ""
    }
  }
};

const rootElement = document.getElementById("root");
rootElement.insertAdjacentHTML(
  "beforeend",
  `
<div id="headline">

    
        <input list="filter" name="allergens" id="allergens" placeholder="filter by allergens" onfocus="this.value=''" onchange="this.blur();">
        <datalist id="filter"></datalist>

        <button id="cart">cart</button>
        <div id="cartContent">
          <div id="itemName"><div>
          <div id="itemAmount"></div>
        </div>
</div>
<div id="pizzas"></div>
<div id="footer"></div>
`
);

rootElement.insertAdjacentHTML("afterbegin", `<div id="form"></div>`)
let formElement = document.getElementById("form")
formElement.insertAdjacentHTML("beforeend",
  `<form id="packageForm" class="packageForm" name="packageForm">
<div><input id="customerName" type="text" name="customerName"></div>
<div><input id="email" type="text" name="email"></div>
<div id="adress">
Adress
<div><input id="city" type="text" name="city"></div>
<div><input id="street" type="text" name="street"></div>
</div>
<div><input type="submit" value="Save Package"/></div>
</form>`
);

let packageFormElement = document.getElementById("packageForm");
const elementOfAllThePizzas = document.getElementById("pizzas");
let customerNameElement = document.getElementById("customerName")
let emailElement = document.getElementById("email")
let cityElement = document.getElementById("city")
let streetElement = document.getElementById("street")


function createElementForPizza(pizza) {
  elementOfAllThePizzas.insertAdjacentHTML(
    "beforeend",
    `<div class="item" id="${pizza.name}">
        <div class="name">${pizza.name}</div>
        <button class="addBtn" id="${pizza.name}AddBtn">add</button>
        <input class="amountBtn" id="${pizza.name}AmountBtn">amount</input> 
    </div>`
  );

  document
    .getElementById(`${pizza.name}AddBtn`)
    .addEventListener("click", function () {
      handleAddToCart(pizza.id);
    });
}

document.getElementById("cart").addEventListener("click", function () {
  packageFormElement.classList.remove("packageForm")
})

packageFormElement.addEventListener("submit", function (event) {
  event.preventDefault()

  cart.customer.name = customerNameElement.value
  cart.customer.email = emailElement.value
  cart.customer.address.city = cityElement.value
  cart.customer.address.street = streetElement.value
  console.log(cart)
})

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

function createDivForAddedItems(addedItem) {
  document
    .getElementById("itemName")
    .insertAdjacentHTML("beforeend", `<div id="${addedItem}"></div>`);
}

function createElementForImage(pizzaId, url) {
  document
    .getElementById(pizzaId)
    .insertAdjacentHTML(
      "afterbegin",
      `<div class="image"><img src="${url}" width="200" height="300"></div>`
    );
}

function handleAddToCart(pizzaId) {
  let cartItemList = cart.pizzas.filter((item) => item.id === pizzaId)

  if (cartItemList.length === 0) {
    cart.pizzas.push({ id: pizzaId, amount: 1 })
  } else {
    cartItemList[0].amount += 1;
  }
  console.log("cart", cart);
}

function generateCurrentDate() {

  const currentDate = new Date().toJSON().slice(0, 10)
  const currentMinSec = new Date().toJSON().slice(11, 16)
  let split = currentDate.split("-")
  let splitMinSec = currentMinSec.split(":")
  const date = {
    year: split[0],
    month: split[1],
    day: split[2],
    hour: splitMinSec[0],
    minute: splitMinSec[1]
  }
  // console.log(currentMinSec)
  return date

}


async function fetchPizzas() {
  const response = await fetch("http://127.0.0.1:9001/api/pizza");
  const pizzas = await response.json();

  const res = await fetch("http://127.0.0.1:9001/api/allergen");
  const allergens = await res.json();

  pizzas.forEach((pizza) => {
    createElementForPizza(pizza);
    createElementForImage(pizza.name, pizza.imgUrl);
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
            console.log("allergen.name", allergen.name);
            console.log("event.target.value", event.target.value);
            document.getElementById("pizzas").replaceChildren();
            pizzas.filter((pizza) => {
              if (pizza.allergens.includes(allergen.id)) {
                createElementForPizza(pizza);
                createElementForImage(pizza.name, pizza.imgUrl);
                allergens.forEach((allerg) => {
                  if (pizza.allergens.includes(allerg.id)) {
                    console.log("tartalmazza");
                    document
                      .getElementById(pizza.name)
                      .insertAdjacentHTML(
                        "beforeend",
                        `<div class="name">${allerg.name}</div>`
                      ); 
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
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        email: "email",
        password: "password",
      },
    }),
  });
  const response = await res.json();

  console.log(response);
}
sendFormData();
