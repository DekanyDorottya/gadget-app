// cart format:
//
//  [{id: 1, name: "Dry Feet", amount: 2}
//   {id: 8, name: "Making Toast with Musk", amount: 1}],
const cart = [];

const rootElement = document.getElementById("root");
rootElement.insertAdjacentHTML(
  "beforeend",
  `
<div id="headline" class="main">

    
        <input list="filter" name="allergens" id="allergens" placeholder="filter by allergens" onfocus="this.value=''" onchange="this.blur();">
        <datalist id="filter"></datalist>

        <button id="cart">cart</button>

</div>
<div id="pizzas" class="main"></div>
<div id="footer" class="main"></div>
`
);

rootElement.insertAdjacentHTML("beforeend", `<div id="form"></div>`)
let formElement = document.getElementById("form")
formElement.insertAdjacentHTML("beforeend", 
`<form id="packageForm" class="packageForm" name="packageForm">
<div><input id="customerName" type="text" name="customerName"></div>
<div><input id="email" type="text" name="email"></div>
<div id="address">
Address
<div><input id="city" type="text" name="city"></div>
<div><input id="street" type="text" name="street"></div>
</div>
</form>`
)



const packageFormElement = document.getElementById("packageForm");

const elementOfAllThePizzas = document.getElementById("pizzas");

let itemsInCart = [];

function createElementForPizza(pizza) {
  elementOfAllThePizzas.insertAdjacentHTML(
    "beforeend",
    `<div class="item" id="${pizza.name}">
        <div class="name">${pizza.name}</div>
        <button class="addBtn" id="${pizza.name}AddBtn">add</button>
        <input class="amountBtn" id="${pizza.name}AmountBtn">amount</input> 
    </div>`
  );

  document.getElementById(`${pizza.name}AddBtn`).addEventListener("click", function () {
    handleAddToCart(pizza.id, pizza.name);
  })
}
//console.log('cart', cart)
//console.log('itemsInCart', itemsInCart);




document.getElementById("cart").addEventListener("click", function() {
  packageFormElement.classList.remove("packageForm");
  console.log('cart', cart)
  itemsInCart.push(cart);
  itemsInCart[0].forEach(item => {

  rootElement.insertAdjacentHTML('afterbegin', `
    <div id="cartContent" class="cartContent">
    <div id="itemName">item: ${item.name}<div>
    <div id="itemAmount">amount: ${item.amount}</div>
    </div>
  `)


    console.log('id', item.id);
    console.log('amount', item.amount);
  })

  const mainElements = document.getElementsByClassName('main');
  console.log(mainElements);
  Array.from(mainElements).forEach(el => {
    el.style.display = "none";
  })
})

const cartContentElement = document.getElementById("cartContent");
console.log(cartContentElement);

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
  document.getElementById('itemName').insertAdjacentHTML('beforeend', `<div id="${addedItem}"></div>`);
}

function createElementForImage(pizzaId, url) {
  document.getElementById(pizzaId).insertAdjacentHTML("afterbegin",
    `<div class="image"><img src="${url}" width="200" height="300"></div>`)
}



function handleAddToCart(pizzaId, pizzaName) {
  let cartItemList = cart.filter((item) => item.id === pizzaId)

  if (cartItemList.length === 0) {
    cart.push({ id: pizzaId, name: pizzaName, amount: 1 })
  } else {
    cartItemList[0].amount += 1;
  }
  
  console.log("cart", cart)
}

async function fetchPizzas() {
  const response = await fetch("http://127.0.0.1:9001/api/pizza");
  const pizzas = await response.json();

  const res = await fetch("http://127.0.0.1:9001/api/allergen");
  const allergens = await res.json();

  pizzas.forEach((pizza) => {
    createElementForPizza(pizza);
    createElementForImage(pizza.name, pizza.imgUrl)
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "user": {
        "email": "email",
        "password": "password"
      }
    }),
  });
  const response = await res.json();

  console.log(response);
}
sendFormData();
