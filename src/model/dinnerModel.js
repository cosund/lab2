//DinnerModel class
class DinnerModel {

  constructor() {
    //this.dishes = dishesConst;
    this.guests = 0;
    this.menu = [];
    //TODO Lab 1
    // implement the data structure that will hold number of guests
    // and selected dishes for the dinner menu

  }

  setNumberOfGuests(num) {
    //TODO Lab 1
    this.guests = num > 0 ? num : 1;
  }

  getNumberOfGuests() {
    //TODO Lab 1
    console.log(this);
    return this.guests;
  }

  //Returns the dishes that are on the menu for selected type
  getSelectedDishes(type) {
    //TODO Lab 1
    //procedural
    /*
    const listOfDishes = [];
    this.dishes.forEach(dish => {
      if(dish.dishTypes.includes(type))
        listOfDishes.push(dish);
    });

    return listOfDishes;
    */
    //functional
    return this.menu.filter(e => e.dishTypes.includes(type));
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    //TODO Lab 1
    return this.menu;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    //TODO Lab 1
    //procedural
    /*
    const listOfIngrediens = [];
    this.dishes.forEach(dish => {
      dish.extendedIngredients.forEach(ingredient => {
        if(!listOfDishes.includes(ingredient.name))
          listOfIngrediens.push(ingredient.name);
      });
    });
    return listOfIngrediens;
    */
    return this.menu.map(({extendedIngredients}) => extendedIngredients).flat();
  }

  //Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
  getTotalMenuPrice() {
    //TODO Lab 1
    //procedural
    /*
    var totalPrice = 0;
    this.dishes.forEach(dish => {
      dish.
    })
    */
    //functional
    let totalSum = this.menu.reduce((currentSum, dish) => currentSum + dish.pricePerServing, 0);
    return (totalSum * this.guests);
  }

  //Adds the passed dish to the menu.
  addDishToMenu(dish) {
    //TODO Lab 1
    this.menu.push(dish);
  }

  //Removes dish with specified id from menu
  removeDishFromMenu(id) {
    //TODO Lab 1
    this.menu = this.menu.filter(dish => dish.id !== id);
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
async  getAllDishes(type, query) {

    // return this.dishes.filter(function (dish) {
    //   let found = true;
    //   if (query) {
    //     found = false;
    //     dish.extendedIngredients.forEach(function (ingredient) {
    //       if (ingredient.name.indexOf(query) !== -1) {
    //         found = true;
    //       }
    //     });
    //     if (dish.name.indexOf(query) !== -1) {
    //       found = true;
    //     }
    //   }
    //   return (dish.dishTypes.includes(type) || !type) && found;
    // });
    var fetchAddress = ENDPOINT.concat("/recipes/Search?");
    console.log(ENDPOINT);

    if((type == null)){
      type = "";
    }
    if(query == null){
      query = "";
    }
    fetchAddress = fetchAddress.concat("type=").concat(type).concat("&query=").concat(query);

    console.log(fetchAddress);
    var dish;
    await fetch(fetchAddress, {
  	"headers": {
  		"x-Mashape-key": API_KEY
  	}
  })
  .then(response => response.json())
  .then(prom => dish = prom)
  console.log(dish);
  return dish["results"];
  }

  //Returns a dish of specific ID
  async getDish(id) {
  //   for (let dish of this.dishes) {
  //     if (dish.id === id) {
  //       return dish;
  //     }
  //   }
  //   return undefined;
  // }
  var address = ENDPOINT.concat("/recipes/").concat(id).concat("/information");
  var dish;
  await fetch(address, {
  "headers": {
    "x-Mashape-key": API_KEY
  }
})
.then(response => response.json())
.then(prom => dish = prom)
console.log(dish);
return dish;
}
}

// the dishes constant contains an array of all the
// dishes in the database. Each dish has id, name, array of dishTypes,
// image (name of the image file), instructions and
// array of ingredients. Each ingredient has name,
// amount (a number) and unit (string
// defining the unit i.e. "g", "slices", "ml". Unit
// can sometimes be empty like in the example of eggs where
// you just say "5 eggs" and not "5 pieces of eggs" or anything else.

// Deepfreeze, you can ignore this function
// https://github.com/substack/deep-freeze/blob/master/index.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
        && o[prop] !== null
        && (typeof o[prop] === "object" || typeof o[prop] === "function")
        && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
}

deepFreeze(dishesConst);
