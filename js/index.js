'use strict';


window.onload = getRandomIngredients();
window.onload = getRandomDrinks();

function setFavicons(src) {
    let headTitle = document.querySelector('head');
    let setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel', 'shortcut icon');
    setFavicon.setAttribute('href', src);
    headTitle.appendChild(setFavicon);
}


function getRandomIngredients() {
    const rqstIngredients = new Request('../php/topIngredients.json');

    fetch(rqstIngredients)
        .then(r => r.json())
        .then(ingredients => {
            const n = 3;
            let ingredient3 = ingredients
                .map(x => ({ x, r: Math.random() }))
                .sort((a, b) => a.r - b.r)
                .map(a => a.x)
                .slice(0, n);

            showTopIngredients(ingredient3);
        });
}

function getRandomDrinks() {
    const rqstDrinks = new Request('../php/topDrinks.json');

    fetch(rqstDrinks)
        .then(r => r.json())
        .then(drinks => {
            const n = 3;
            let drink3 = drinks
                .map(x => ({ x, r: Math.random() }))
                .sort((a, b) => a.r - b.r)
                .map(a => a.x)
                .slice(0, n);

            showTopDrinks(drink3);
        });
}

function showTopDrinks(drink3) {
    const numbers = ['One', 'Two', 'Three'];

    drink3.forEach((drink, index) => {
        fetch(new Request(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.drinkId}`))
            .then(r => r.json())
            .then(rsc => {
                let class_name = '.drink' + numbers[index];
                let roundTopDrink = document.createElement('img');
                roundTopDrink.classList.add('round', 'top');
                roundTopDrink.src = rsc.drinks[0].strDrinkThumb;
                document.querySelector(class_name).append(roundTopDrink);

                let class_drinkName = '.drinkName' + numbers[index]
                let textName = document.createElement("p")
                textName.classList.add("drinkName")
                textName.innerText = rsc.drinks[0].strDrink
                document.querySelector(class_drinkName).append(textName)

                roundTopDrink.addEventListener("click", function() {
                    let topDrinkId = rsc.drinks[0].idDrink;
                    sessionStorage.setItem("topDrinkId", topDrinkId);
                    location.href = "../html/search.html";

                });
            });
    });
}

function showTopIngredients(ingredient3) {
    const numbers = ['One', 'Two', 'Three'];

    ingredient3.forEach((ingredient, index) => {
        console.log(ingredient)
        let class_name = '.ingredient' + numbers[index];
        let topIngredientOne = document.createElement('img');
        topIngredientOne.classList.add('top');
        topIngredientOne.src = ingredient.ingImg;
        document.querySelector(class_name).append(topIngredientOne);

        let class_ingredientName = '.ingredientName' + numbers[index]
        let textName = document.createElement("p")
        textName.classList.add("ingredientName")
        textName.innerText = ingredient.ingName
        document.querySelector(class_ingredientName).append(textName)

        topIngredientOne.addEventListener("click", function() {
            sessionStorage.setItem("ingName", String(ingredient.ingName));
            location.href = "./search.html";
        });
    });
}

setFavicons("../images/logo_bottled.png");