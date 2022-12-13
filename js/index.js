"use strict";

let user = 1;

window.onload = getRandomIngredients();

window.onload = getRandomDrinks();


function getRandomIngredients() {

    const rqstIngredients = new Request("../php/topIngredients.json");

    fetch(rqstIngredients)
        .then(r => r.json())
        .then(ingredients => {
            const n = 3;
            let ingredient3 = ingredients
                .map(x => ({ x, r: Math.random() }))
                .sort((a, b) => a.r - b.r)
                .map(a => a.x)
                .slice(0, n);
            console.log(ingredient3);
        });

}

function getRandomDrinks() {

    const rqstDrinks = new Request("../php/topDrinks.json");

    fetch(rqstDrinks)
        .then(r => r.json())
        .then(drinks => {
            const n = 3;
            let drink3 = drinks
                .map(x => ({ x, r: Math.random() }))
                .sort((a, b) => a.r - b.r)
                .map(a => a.x)
                .slice(0, n);
            console.log(drink3);
        });
}

