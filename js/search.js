"use strict";

function getDrinksByLetter(letter) {
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`))
        .then(r => r.json())
        .then(rsc => {
            createDrinks(rsc.drinks)

        })
}

function getDrinksByName(name) {
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`))
        .then(r => r.json())
        .then(rsc => {
            createDrinks(rsc.drinks)

        })
}

function createDrinks(rsc) {
    document.querySelector("#wrapper").innerHTML = " "


    rsc.forEach(drink => {
        let oneDrink = drink.strDrink
        let drinkImg = drink.strDrinkThumb
        let drinkAlcoholic = drink.strAlcoholic
        let drinkCategory = drink.strCategory
        let drinkGlass = drink.strGlass

        let drinkBox = document.createElement("div");
        drinkBox.innerHTML = `
                <div class="imgWrap">
                    <img src="${drinkImg}" class="drinkImg">
                </div>
                <div class="text">
                    <h3>${oneDrink} </h3>
                    <div class="tags">
                        <p> ${drinkAlcoholic} </p>
                        <p>${drinkCategory} </p>
        
                        <p>${drinkGlass} </p> 
                    </div>
                </div>
                 <img src="../images/gilla.png" class="heartImg">
                `;

        drinkBox.classList.add("drinkBox");
        document.querySelector("#wrapper").append(drinkBox);



    })
}

function getsearchedDrink() {
    document.getElementById("click").addEventListener("click", function() {
        let search = document.getElementById("drinkName").value
        getDrinksByName(search)

    })
}

function createAlphabet() {

    let alphabetOne = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

    let alphabetTwo = [
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'
    ];

    let alphabetThree = ['V', 'W', 'X',
        'Y', 'Z'
    ];


    alphabetOne.forEach(letter => {
        let text = document.createElement("p");
        text.innerHTML = letter;
        let aDiv = document.querySelector(".alphabetOne");
        aDiv.append(text)

        text.addEventListener("click", function(e) {
            let clickedLetter = e.target.innerHTML
            clickedLetter = clickedLetter.toLowerCase()
            getDrinksByLetter(clickedLetter)
        })
    })

    alphabetTwo.forEach(letter => {
        let text = document.createElement("p");
        text.innerHTML = letter;
        let aDiv = document.querySelector(".alphabetTwo");
        aDiv.append(text)

        text.addEventListener("click", function(e) {
            let clickedLetter = e.target.innerHTML
            clickedLetter = clickedLetter.toLowerCase()
            getDrinksByLetter(clickedLetter)
        })
    })

    alphabetThree.forEach(letter => {
        let text = document.createElement("p");
        text.innerHTML = letter;
        let aDiv = document.querySelector(".alphabetThree");
        aDiv.append(text)

        text.addEventListener("click", function(e) {
            let clickedLetter = e.target.innerHTML
            clickedLetter = clickedLetter.toLowerCase()
            getDrinksByLetter(clickedLetter)
        })
    })

}

function getAlcoholic() {
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`))
        .then(r => r.json())
        .then(rsc => {
            createFilterAlcohol(rsc.drinks)
        })
}

function getCategory() {
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`))
        .then(r => r.json())
        .then(rsc => {
            createFilterCategory(rsc.drinks)
        })
}

function getGlass() {
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`))
        .then(r => r.json())
        .then(rsc => {
            createFilterGlass(rsc.drinks)
        })
}

function getIngrediants() {
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`))
        .then(r => r.json())
        .then(rsc => {
            createFilterIngrediant(rsc.drinks)
        })
}

let alcoholDrinksById = [];

function createFilterAlcohol(alcohol) {

    let chooseAlcohol = document.getElementById("chooseAlcohol");

    alcohol.forEach((a) => {
        let option = document.createElement("option");
        option.text = a.strAlcoholic;
        chooseAlcohol.append(option);

        option.addEventListener("click", function() {
            fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${option.value}`))
                .then(r => r.json())
                .then(rsc => {
                    rsc.drinks.forEach(drink => {
                        let id = drink.idDrink;

                        fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`))
                            .then(r => r.json())
                            .then(rsc => {
                                alcoholDrinksById.push(rsc.drinks[0]);
                                createDrinks(alcoholDrinksById)
                            })

                    })
                    alcoholDrinksById = [];

                })
        })
    })
}

let categoryDrinksById = [];

function createFilterCategory(category) {

    let chooseCategory = document.getElementById("chooseCategory");

    category.forEach((c) => {
        let option = document.createElement("option");
        option.text = c.strCategory;
        chooseCategory.append(option);

        option.addEventListener("click", function() {
            fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${option.value}`))
                .then(r => r.json())
                .then(rsc => {
                    rsc.drinks.forEach(drink => {
                        let id = drink.idDrink;

                        fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`))
                            .then(r => r.json())
                            .then(rsc => {
                                categoryDrinksById.push(rsc.drinks[0]);
                                createDrinks(categoryDrinksById)
                            })
                    })
                    categoryDrinksById = [];
                })
        })
    })
}

let glassDrinksById = [];

function createFilterGlass(glass) {

    let chooseGlass = document.getElementById("chooseGlass");

    glass.forEach((g) => {
        let option = document.createElement("option");
        option.text = g.strGlass;
        chooseGlass.append(option);

        option.addEventListener("click", function() {

            fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${option.value}`))
                .then(r => r.json())
                .then(rsc => {
                    rsc.drinks.forEach(drink => {
                        let id = drink.idDrink;

                        fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`))
                            .then(r => r.json())
                            .then(rsc => {
                                glassDrinksById.push(rsc.drinks[0]);
                                createDrinks(glassDrinksById)
                            })
                    })
                    glassDrinksById = [];
                })
        })
    })
}

let ingrediantDrinksById = [];

function createFilterIngrediant(ingrediant) {

    let chooseIngrediant = document.getElementById("chooseIngrediant");

    ingrediant.forEach((i) => {
        let option = document.createElement("option");
        option.text = i.strIngredient1;
        chooseIngrediant.append(option);

        option.addEventListener("click", function() {

            fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${option.value}`))
                .then(r => r.json())
                .then(rsc => {
                    rsc.drinks.forEach(drink => {
                        let id = drink.idDrink;

                        fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`))
                            .then(r => r.json())
                            .then(rsc => {
                                ingrediantDrinksById.push(rsc.drinks[0]);
                                createDrinks(ingrediantDrinksById)
                            })
                    })
                    ingrediantDrinksById = [];
                })
        })
    })
}



function getClickedIngretidant() {
    let name = sessionStorage.getItem("ingName")
    console.log(name)
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`))
        .then(r => r.json())
        .then(rsc => {
            rsc.drinks.forEach(drink => {
                let id = drink.idDrink;

                fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`))
                    .then(r => r.json())
                    .then(rsc => {
                        ingrediantDrinksById.push(rsc.drinks[0]);
                        createDrinks(ingrediantDrinksById)
                    })
            })
            ingrediantDrinksById = [];

        })


}



getDrinksByLetter("a")
getsearchedDrink()
createAlphabet()
getAlcoholic()
getCategory()
getGlass()
getIngrediants()
getClickedIngretidant()