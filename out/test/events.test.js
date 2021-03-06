// Generated by CoffeeScript 1.3.3
(function() {
  var EventSystem, Person, assert, debug, joe,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  assert = require('assert');

  joe = require('joe');

  EventSystem = require(__dirname + '/../lib/balutil').EventSystem;

  debug = false;

  Person = (function(_super) {

    __extends(Person, _super);

    function Person() {
      return Person.__super__.constructor.apply(this, arguments);
    }

    /*
    	A person can eat while they drink, but they can't drink while they eat
    	This has come from the fact that if you have food in your mouth, you can still drink things
    	Whereas if you have drink in your mouth, then put food in your mouth, the drink goes everywhere
    */


    Person.prototype.eat = function(something, next) {
      var _this = this;
      if (debug) {
        console.log("" + something + ": started food");
      }
      if (debug) {
        console.log("" + something + ": start eating");
      }
      return this.start('eating', function(err) {
        if (debug) {
          console.log("" + something + ": eating");
        }
        if (err) {
          return typeof next === "function" ? next(err) : void 0;
        }
        return setTimeout(function() {
          if (debug) {
            console.log("" + something + ": swallowed food");
          }
          if (typeof next === "function") {
            next(null, something);
          }
          if (debug) {
            console.log("" + something + ": start finish");
          }
          return _this.finished('eating', function(err) {
            if (debug) {
              console.log("" + something + ": finished food");
            }
            if (err) {
              return typeof next === "function" ? next(err) : void 0;
            }
          });
        }, 2 * 1000);
      });
    };

    Person.prototype.drink = function(something, next) {
      var _this = this;
      if (debug) {
        console.log("" + something + ": started drink");
      }
      if (debug) {
        console.log("" + something + ": blocking eating");
      }
      return this.block('eating', function(err) {
        if (debug) {
          console.log("" + something + ": blocked eating");
        }
        if (err) {
          return typeof next === "function" ? next(err) : void 0;
        }
        if (debug) {
          console.log("" + something + ": start drinking");
        }
        return _this.start('drinking', function(err) {
          if (debug) {
            console.log("" + something + ": drinking");
          }
          if (err) {
            return typeof next === "function" ? next(err) : void 0;
          }
          return setTimeout(function() {
            if (debug) {
              console.log("" + something + ": swallowed drink");
            }
            if (typeof next === "function") {
              next(null, something);
            }
            if (debug) {
              console.log("" + something + ": start finish");
            }
            return _this.finished('drinking', function(err) {
              if (debug) {
                console.log("" + something + ": finished drink");
              }
              if (err) {
                return done(err);
              }
              if (debug) {
                console.log("" + something + ": unblocking eating");
              }
              return _this.unblock('eating', function(err) {
                if (debug) {
                  console.log("" + something + ": unblocked eating");
                }
                if (err) {
                  return done(err);
                }
              });
            });
          }, 1 * 1000);
        });
      });
    };

    return Person;

  })(EventSystem);

  joe.describe('EventSystem', function(describe, it) {
    return it('should work as expected', function(done) {
      var ateAFood, drankADrink, drink, drinking, drinks, drinksDrunk, eating, food, foods, foodsAte, myPerson, myPersonTriedToDrinkThenEat, _i, _j, _len, _len1;
      foods = ['apple', 'orange', 'grape'];
      drinks = ['coke', 'fanta', 'water'];
      myPerson = new Person();
      foodsAte = [];
      drinksDrunk = [];
      myPersonTriedToDrinkThenEat = false;
      eating = false;
      drinking = false;
      myPerson.on('eating:locked', function() {
        if (debug) {
          return console.log('eating:locked');
        }
      });
      myPerson.on('eating:unlocked', function() {
        if (debug) {
          return console.log('eating:unlocked');
        }
      });
      myPerson.on('eating:started', function() {
        if (debug) {
          console.log('eating:started');
        }
        if (drinking === true) {
          if (debug) {
            console.log('myPerson just tried to eat then drink');
          }
          myPersonTriedToDrinkThenEat = true;
        }
        return eating = true;
      });
      myPerson.on('eating:finished', function() {
        if (debug) {
          console.log('eating:finished');
        }
        return eating = false;
      });
      myPerson.on('drinking:locked', function() {
        if (debug) {
          return console.log('drinking:locked');
        }
      });
      myPerson.on('drinking:unlocked', function() {
        if (debug) {
          return console.log('drinking:unlocked');
        }
      });
      myPerson.on('drinking:started', function() {
        if (debug) {
          console.log('drinking:started');
        }
        return drinking = true;
      });
      myPerson.on('drinking:finished', function() {
        if (debug) {
          console.log('drinking:finished');
        }
        return drinking = false;
      });
      ateAFood = function(err, something) {
        if (err) {
          return done(err);
        }
        foodsAte.push(something);
        if (debug) {
          return console.log("completely finished eating " + something + " - " + foodsAte.length + "/" + foods.length);
        }
      };
      drankADrink = function(err, something) {
        if (err) {
          return done(err);
        }
        drinksDrunk.push(something);
        if (debug) {
          return console.log("completely finished drinking " + something + " - " + drinksDrunk.length + "/" + drinks.length);
        }
      };
      for (_i = 0, _len = foods.length; _i < _len; _i++) {
        food = foods[_i];
        myPerson.eat(food, ateAFood);
      }
      for (_j = 0, _len1 = drinks.length; _j < _len1; _j++) {
        drink = drinks[_j];
        myPerson.drink(drink, drankADrink);
      }
      return setTimeout(function() {
        assert.equal(foods.length, foodsAte.length, 'myPerson ate all his foods');
        assert.equal(drinks.length, drinksDrunk.length, 'myPerson ate all his drinks');
        assert.equal(false, myPersonTriedToDrinkThenEat, 'myPerson tried to drink then eat, when he shouldn\'t have');
        return done();
      }, 14000);
    });
  });

}).call(this);
