'use strict'

var app = angular.module('myApp', [ ]);

app.controller('PizzaFormController', ['$scope', function($scope) {
        
	// Initialise order object
    $scope.order = {
        customer: {},
        pizza: {
            toppings: [],
            quantity: 1
        },
        total: 0,
        complete: false
    };
    
    // Initialise form submitted state
    $scope.formSubmitted = false;
    
	// Initialise option arrays
    $scope.pizzaSizes = [
        { name: "Small", val: "S", price: 3.99 },
        { name: "Medium", val: "M", price: 5.99 },
        { name: "Large", val: "L", price: 7.99 }
    ];

    $scope.pizzaBases = [
        { name: "Thin Crust", val: "thinCrust", price: 0 },
        { name: "Original", val: "original", price: 0 },
        { name: "Deep Pan", val: "deepPan", price: 0 },
        { name: "Stuffed", val: "stuffed", price: 1.99 }
    ];
    
    $scope.pizzaToppings = [
        { name: "Extra Cheese", val: "extraCheese", price: 0.50 },
        { name: "Bacon", val: "bacon", price: 0.50 },
        { name: "Beef", val: "beef", price: 0.99 },
        { name: "Chicken", val: "chicken", price: 0.99 },
        { name: "Jalapeños", val: "jalapeños", price: 0.50 },
        { name: "Mixed Peppers", val: "mixedPeppers", price: 0.50 },
        { name: "Mushrooms", val: "mushrooms", price: 0.50 },
        { name: "Olives", val: "olives", price: 0.50 },
        { name: "Pineapple", val: "pineapple", price: 0.50 },
        { name: "Sweetcorn", val: "sweetcorn", price: 0.50 },
        { name: "Tuna", val: "tuna", price: 0.99 }
    ];
    
    /*
     * On click of a pizza topping checkbox, remove the topping
     * if already added, otherwise add it. Then update the order total.
     * 
     * @method updateToppings
     * @param {String} pizzaTopping The selected pizza topping.
     */
    $scope.updateToppings = function ( pizzaTopping ) {
        var addTopping = true;
        
        if( $scope.order.pizza.toppings.length > 0 ) {
            for( var i=0; i < $scope.order.pizza.toppings.length; i++ ) {
                if( pizzaTopping === $scope.order.pizza.toppings[ i ] ) {
                    $scope.order.pizza.toppings.splice( i, 1 );
                    addTopping = false;
                }
            }
        }
        if( addTopping === true ) {
            $scope.order.pizza.toppings.push( pizzaTopping );
        }
        $scope.updateOrderTotal();
    };
    
    /*
     * Recalculate the order total from scratch for all ordered options.
     * 
     * @method updateOrderTotal
     */
    $scope.updateOrderTotal = function () {
        $scope.order.total = 0;
        if( $scope.order.pizza.hasOwnProperty( 'size' ) ) {
            $scope.order.total += $scope.lookUpOption( $scope.pizzaSizes, $scope.order.pizza.size, 'price' );
        }
        if( $scope.order.pizza.hasOwnProperty( 'base' ) ) {
            $scope.order.total += $scope.lookUpOption( $scope.pizzaBases, $scope.order.pizza.base, 'price' );
        }
        if( $scope.order.pizza.toppings.length > 0 ) {
            angular.forEach( $scope.order.pizza.toppings, function( orderedTopping ) {
                $scope.order.total += $scope.lookUpOption( $scope.pizzaToppings, orderedTopping, 'price' );
            });
        }
        $scope.order.total *= $scope.order.pizza.quantity;
    };
    
    /*
     * Form submit
     */
    $scope.submit = function () {
        $scope.formSubmitted = true;
        
        if( $scope.pizzaForm.$valid ) {
            $scope.order.complete = true;
        }
    };
    
    /*
     * Helper function to retrieve an option property from a provided option array.
     * 
     * @method lookUpOption
     * @param {Array} itemList The option array to be searched.
     * @param {String} optionVal The option value to be looked up.
     * @param {String} requiredVal The option value to be retrieved.
     * @return The retrieved value found in the option array.
     */
    $scope.lookUpOption = function ( itemList, optionVal, requiredVal ) {
        var foundVal;
        angular.forEach( itemList, function( item ) {
            if( optionVal === item.val ) {
                foundVal = item[ requiredVal ];
            }
        });
        return foundVal;
    };
    
}]);
