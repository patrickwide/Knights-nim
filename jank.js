const a = 5
for (let i = 0; i < a; i++) {
    const element = i;
    console.log(element);
}


// let myArr = [1, 2, 3, 4, 5, 6];
// let rand = myArr[(Math.random() * myArr.length | 0)]
// console.log(rand);
// const a = [1, 2, 3, 4];
// for (let i in a) {
//   console.log("Hello");
// }

// let eqZero = [0,0,0,0].every((e) => e === 0);
// console.log(eqZero);

// const game = new Nim();
// const available_actions = game.available_actions(game.piles);
// console.log(game.piles);
// game.move(2, 4);
// console.log(game.piles);

// const available = (action, available_actions) => {
//   let answer = false;
//   for (let each_action of available_actions) {
//     const valid_action = each_action.toString() === action.toString();
//     if (valid_action) answer = true;
//   }
//   return answer;
// };

// console.log(available([1, 2],available_actions));

// const game = new Set();
// const a = [1,2]
// const b = [3,4]
// const c = [5,6]

// game.add(a);
// game.add(b);
// game.add(c);

// const d = [3, 4];

// const available = (action, available_actions) => {
//     let answer = false;
//     for (let each_action of available_actions) {
//       const valid_action = each_action.toString() === action.toString();
//       if (valid_action) answer = true;
//     }
//     return answer
// }

// const check = available(d, game);
// console.log(check);

// const available = () => {
//     for (let arr of game) {
//         console.log(arr);
//         console.log(toString(arr) === toString(d));
//     }
// }
// available()
// const obj1 = [1, 2];
// const obj2 = [1, 3];

// const name1 = obj1.toString();
// const name2 = obj2.toString();

// console.log(name1 === name2);
// console.log(name1);
// console.log(name2);
// const game = [];
// const a = [1,2];
// const b = [2,3];
// const c = [3,4];
// game.push(a);
// game.push(b)
// game.push(c);

// const d = [1, 2];

// let eqZero = [0,0,0,1].every((e) => e === 0);
// console.log(eqZero);

// const a1 = [1, 2];
// const a2 = [1, 2, 3, 4, 3, 4, 5];
// const contain = a1.every((i) => a2.includes(i));
// console.log(contain);

// const a = 2
// const b = 0
// if (a > b || b > a) {
//   console.log("Ok");
// } else {
//     console.log("Not Ok");
// }
// if (a > b && b > a) {
//     console.log("Ok");
// } else {
//     console.log("Not Ok");
// }

// true and false
//   move(action) {
//     // """
//     // Make the move `action` for the current player.
//     // `action` must be a tuple `(i, j)`.
//     // """
//     let pile,
//       count = action;

//     // check for errors
//     if (this.winner === null) {
//       throw new Error("Game already won");
//     } else if (pile < 0 && pile >= this.piles.length) {
//       throw new Error("Invalid pile");
//     } else if (count < 1 && count > this.piles[pile]) {
//       throw new Error("Invalid number of objects");
//     }

//     // update pile
//     this.piles[pile] -= count;
//     this.switch_player();

//     // check for a winner
//     // if every
//   }
// }

// function* range(start, stop, step = 1) {
//   if (stop == null) {
//     // one param defined
//     stop = start;
//     start = 0;
//   }

//   for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
//     yield i;
//   }
// }

// for (let i of range(2,5)) {
//     console.log(i);
// }

// function myTuple(element) {
//     let x, y, z;
//     return [x,y,z]
// }

// Outputs => 0 1 2 3 4

// for (let i of range(0, 10, 2)) {
//     console.log(i);
// }
// // Outputs => 0 2 4 6 8

// for (let i of range(10, 0, -2)) {
//     console.log(i);
// }
// // Outputs => 10 8 6 4 2

// --------------------------------

// class Nim {
//   constructor(initial = [1, 3, 5, 7]) {
//     this.piles = initial;
//     this.player = 0;
//     this.winner = null;
//   }
//     available_actions(piles) {
//     //   console.log(cls);
//       console.log(piles);
//     // function* range(start, stop, step = 1) {
//     //   if (stop == null) {
//     //     // one param defined
//     //     stop = start;
//     //     start = 0;
//     //   }

//     //   for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
//     //     yield i;
//     //   }
//     // }

//     // const actions = new Set();
//     // for (let i = 0; i < piles.length; i++) {
//     //   const element = piles[i] + 1;
//     //   console.log(element);
//     //   for (var j in range(1, element)) {
//     //     console.log((i, j));
//     //   }
//     // }
//     // return actions;
//   }
//   other_player() {
//     // """
//     // Nim.other_player(player) returns the player that is not
//     // `player`. Assumes `player` is either 0 or 1.
//     // """
//     if (this.player === 1) return 0;
//     return 1;
//   }
//   switch_player() {
//     // """
//     // Switch the current player to the other player.
//     // """
//     this.player = Nim.other_player(this.player);
//   }
//   move(action) {
//     // """
//     // Make the move `action` for the current player.
//     // `action` must be a tuple `(i, j)`.
//     // """
//     let pile,
//       count = action;

//     // check for errors
//     if (this.winner === null) {
//       throw new Error("Game already won");
//     } else if (pile < 0 && pile >= this.piles.length) {
//       throw new Error("Invalid pile");
//     } else if (count < 1 && count > this.piles[pile]) {
//       throw new Error("Invalid number of objects");
//     }

//     // update pile
//     this.piles[pile] -= count;
//     this.switch_player();

//     // check for a winner
//     // if every
//   }
// }

// const game = new Nim();
// const available_actions = game.available_actions();

// console.log(game);
// console.log(available_actions);

// function StopWatch() {
//     let startTime, endTime,running,duration=0
//     this.start = function () {
//         if (running)
//             throw new Error('Stopwatch has already started');
//         running = true;
//         startTime = new Date();
//     };
//     this.stop = function () {
//         if (!running)
//             throw new Error('Stopwatch in not running');
//         running = false;
//         endTime = new Date();
//         const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
//         duration+=seconds
//     };
//     this.reset = function () {
//         startTime = null,
//         endTime = null,
//         running = false;
//         duration = 0;
//     };
//     Object.defineProperty(this, 'duration', {
//         get: function () {
//             return duration
//         }
//     });
// }

// Getters/Setters
// ...

//     function Circle(radius) {
//         this.radius = radius;

//         let defaultLocation = { x: 0, y: 0 };
//         // if we want to display the defaultLocation some were in the app
//         // option 1
//         this.getDefaultLocation = function () {
//             return defaultLocation;
//         }

//         this.draw = function () {
//             console.log('draw');
//         }
//         Object.defineProperty(this, 'defaultLocation', {
//             get: function () {
//                 return defaultLocation;
//             },
//             set: function (value) {
//                 if (!value.x || !value)
//                     throw new Error('Invalid location');
//                 defaultLocation=value
//             }
//         })
//     }
//     // now i can b=not the bale to access the
//     // defaultLocation & computeOptimazationLocation
// const circle = new Circle(10);
// circle.defaultLocation = 1;
// circle.draw()

// Abstraction
// ...

// function Circle() {
//     let a = [1, 3, 5, 7];
//     this.radius = a;
//     let defaultLocation = { x: 0, y: 0 };
//     let computeOptimazationLocation = function (factor) {
//         // ...
//     }

//     this.draw = function () {
//         computeOptimazationLocation();
//         // defaultLocation
//         // this.radius
//         console.log('draw');
//     }
// }
// // now i can b=not the bale to access the
// // defaultLocation & computeOptimazationLocation
// const circle = new Circle();
// console.log(circle);
// console.log(circle.radius);

// Enumerating Properties(looping)
// ...

// function Circle(radius) {
//     this.radius = radius;
//     this.draw = function () {
//         console.log('draw');
//     }
// }

// const circle = new Circle(10);

// for (let key in circle) {
//     if (typeof circle[key] !== 'function')
//         console.log(key, circle[key]);
// }

// // this method you can not separate properties from methods
// const keys = Object.keys(circle);
// console.log(keys);

// // to know if a method is in an object
// if ('radius' in circle)
//     console.log("circle has a radius");

// Adding/Removing Properties
//...

// function Circle(radius) {
//     this.radius = radius;
//     this.draw = function () {
//         console.log('draw');
//     }
// }
// // adding
// Circle.location = { x: 1 };
// // or
// Circle['location'] = { y: 1 };

// // usefullness of bracket notation
// // 1
// const propertyName = 'location';
// Circle[propertyName] = { x: 1 };
// // 2
// const propertyName2 = 'center-location';
// Circle["center-location"] = { x: 1 }; // due to the special cha...

// // removing
// delete Circle.location;
// // or
// delete Circle['location'];

// Value vs Reference Types
// ...

// primitives
// ...

// let x = 10
// let y = x
// x = 20
// output:
// x : 20
// y : 10

// when we assign a variablew to an object we don't
// hold the valuew but the address to were the valuew is stored
// objects
// ...

// let x = {value:10}
// let y = x
// x.value = 20
// output:
// x = {value: 20}
// y = {value: 20}

// N/B
// primitives - are copied by thir value
// Objects - are copied by there reference

// Functions are Objects
// ...

// function Circle(radius) {
//     console.log(this);
//     this.radius = radius;
//     this.draw = function () {
//         console.log('draw');
//     }
// }

// methods availabel in our object
// call =>
// (this) with ref the ({})
// then the args will flow
// Circle.call({}, 1) // this is also the same to (const another = new Circle(1);)
// also if new key world is not used eg - (const another = new Circle(1);)
// it's also the same as Circle.call(window, 1)
// const another = new Circle(1);

// apply =>
// exaclly like the call method but insted of passing all the arg/params
// we pass them in an a array
// Circle.apply({}, [1, 2, 3, 4])

// const Circle1 = new Function("radius",`
//     console.log(this);
//     this.radius = radius;
//     this.draw = function () {
//         console.log('draw');
//     }
//     `
// );
// const circle = new Circle1(1);

// constructor property
// ...

// every object have a constructor property
// e.g
// new String(); // '',"",``
// new Boolean(); // true , false
// new Number(); // 1, 2, 3, ...

// let x = {};

// let x = new Object();

// Constructors functions
// ...

// function Circle(radius) {
//     console.log(this);
//     this.radius = radius;
//     this.draw = function () {
//         console.log('draw');
//     }
// }
// const another = new Circle(1);

// Factories functions
// ...

// function createCircle(radius) {
//     return {
//         radius,
//         draw: function () {
//             console.log('draw');
//         }
//     };
// };
// const circle = createCircle(1)
// console.log(circle.radius);

// ...
// ...

// const circle = {
//     // prop
//     radius: 1,
//     location: {
//         x: 1,
//         y: 1,
//     },
//     // method
//     draw: function() {
//         console.log("draw");
//     }
// };

// circle.draw();
