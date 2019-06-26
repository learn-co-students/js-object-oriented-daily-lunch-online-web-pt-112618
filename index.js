// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let customerId = 0;
let neighborhoodId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood{
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this)
  }
  // customers() {
  //   return store.customers.filter(function(customer){
  //     return customer.neighborhoodId == this.id;
  //   })
  // }

 //  customers() {
 //   return [...new Set(this.deliveries().map(delivery =>
 //     delivery.customer()
 //   ))]
 // }

  // meals() {
  //   return store.meals.filter(function(meal){
  //     return meal.neighborhoodId == this.id;
  //   })
  // }

  // meals() {
  //   return  [...new Set(this.deliveries().map(delivery =>
  //     delivery.meal()
  //   ))]
  // }

//   deliveries() {
//     return store.deliveries.filter(function(delivery){
//       return delivery.neighborhoodId == this.id;
//     })
//   }
// }
//


  deliveries() {
    return store.deliveries.filter(delivery =>
      delivery.neighborhoodId === this.id
  )}

  customers() {
    return [...new Set(this.deliveries().map(delivery =>
      delivery.customer()
    ))]
  }

  meals() {
    return  [...new Set(this.deliveries().map(delivery =>
      delivery.meal()
    ))]
  }
}


class Customer{
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
  return store.deliveries.filter(delivery =>
    delivery.customerId === this.id
)}


  // deliveries(){
  //   return store.deliveries.filter(function(delivery){
  //     return delivery.customerId == this.id;
  //   })
  // }

  // meals(){
  //   return store.meals.filter(function(meal){
  //     return meal.customerId == this.id;
  //   })
  // }

  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    })
  }



  totalSpent() {
     return this.meals().reduce(function (total, meal) {
       return total + meal.price
     }, 0)
   }
 }

class Meal{
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  // deliveries(){
  //   return store.deliveries.filter(function(delivery){
  //     return delivery.mealId == this.id
  //   })
  // }

  deliveries() {
    return store.deliveries.filter(delivery =>
      delivery.mealId === this.id
  )}

//
//   customers(){
//     return this.deliveries.filter(function(customer){
//       return delivery.customer();
//     })
// }


customers() {
  return [...new Set(this.deliveries().map(delivery =>
    delivery.customer()
  ))]
}

static byPrice() {
  return store.meals.sort(function(a,b){
    return b.price - a.price
  })
}
}

// class Delivery{
//   constructor(mealId, neighborhoodId, customerId) {
//     this.mealId = mealId;
//     this.neighborhoodId = neighborhoodId;
//     this.customerId = customerId;
//     this.id = ++deliveryId;
//     store.deliveries.push(this)
//
//   }
//   meal() {
//     return store.meals.filter(function(meal){
//       return this.mealId == meal.id
//     })
//   }
//
//   customer() {
//     return store.customers.filter(function(customer){
//       return this.customerId == customer.id
//     })
//   }
//
//   neighborhood() {
//     return store.neighborhoods.filter(function(neighborhood){
//       return this.neighborhoodId == neighborhood.id
//     })
//   }
// }

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal =>
      meal.id === this.mealId
  )}

  customer() {
    return store.customers.find(customer =>
      customer.id === this.customerId
  )}

  neighborhood() {
    return store.neighborhoods.find(neighborhood =>
      neighborhood.id === this.neighborhoodId
  )}
}
