'use strict';

function getDrinksByLetter(letter) {
    fetch(
            new Request(
                `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
            )
        )
        .then(r => r.json())
        .then(rsc => {
            createDrinks(rsc.drinks);
        });
}

function getDrinksByName(name) {
    fetch(
            new Request(
                `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
            )
        )
        .then(r => r.json())
        .then(rsc => {
            createDrinks(rsc.drinks);
        });
}

function createDrinks(rsc) {
    document.querySelector('#wrapper').innerHTML = ' ';

    if (rsc === null) {
        let noDrinks = document.createElement("p");
        noDrinks.classList.add("noDrinks");
        noDrinks.innerHTML = "Sorry, there is no drinks that matches your search";
        document.querySelector('#wrapper').append(noDrinks);
        wrapper.style.paddingBottom = "200px";
    }

    rsc.forEach(drink => {
        let id = drink.idDrink;
        let oneDrink = drink.strDrink;
        let drinkImg = drink.strDrinkThumb;
        let drinkAlcoholic = drink.strAlcoholic;
        let drinkCategory = drink.strCategory;
        let drinkGlass = drink.strGlass;

        let drinkBox = document.createElement('div');
        drinkBox.innerHTML = `

               <div class="imgWrap">
                   <img src="${drinkImg}" class="drinkImg">
               </div>
               <div class="text searchDiv" id='${id}'>
                   <h3>${oneDrink} </h3>
                   <div class="tags">
                       <p> ${drinkAlcoholic} </p>
                       <p>${drinkCategory} </p>
      
                       <p>${drinkGlass} </p>
                   </div>
               </div>
                <img src="../images/gilla.png" class="heartImg" id="${id}">
               `;

        drinkBox.classList.add('drinkBox');
        document.querySelector('#wrapper').append(drinkBox);
    });

    let heart = document.querySelectorAll('.heartImg');
    heart.forEach(h => {
        h.addEventListener('click', function() {
            if (user === 0) {
                createLoginViaHeart();
            } else {
                h.src = '../images/gillasvart.png';
                let heartId = h.id;
                addNewFavorite(heartId);
            }
        });
    });

    let all = document.querySelectorAll('.text');
    all.forEach(div => {
        div.addEventListener('click', function() {
            buildDrinkPopUp(div.id);
            if (div.classList.contains("searchDiv")) {
                sessionStorage.setItem("class", "searchDiv")
            }
        });
    });
    sessionStorage.removeItem('ingName');
}

function createLoginViaHeart() {
    let close = document.createElement('a');
    close.classList.add('closeSignInHeart');
    close.addEventListener('click', function() {
        location.href = '../html/search.html';
        document.getElementById('myForm').innerHTML = '';
    });

    let signInFormByHeart = document.createElement('div');
    signInFormByHeart.classList.add('signInFormByHeart');
    signInFormByHeart.innerHTML = `
            <div class="form-popup-heart" id="myFormHeart">
            <div class="form-container-heart">
            
            <h2 class="notH2">You are not logged in</h2>
            <p class="createP">Create an account or log in on an already excisting one</p>

            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Email" id="email" class="inputByHeart" required>
        
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" id="psw" class="inputByHeart" required>
        
            <button class="btn sign_in">Sign in </button>
            <button class="btn createFromHeart">Create Account</button>
        
            </div>

            </div>
            
            
            `;

    document.querySelector('body').append(signInFormByHeart);
    document.getElementById('myFormHeart').append(close);
    document.getElementById('myFormHeart').style.display = 'flex';

    document
        .querySelector('.createFromHeart')
        .addEventListener('click', function() {
            document.getElementById('myFormHeart').style.display = 'none';
            createProfilePopup();
        });

    document.querySelector(".sign_in").addEventListener('click', function() {
        let username = document.querySelector('[id="email"]').value;
        let psw = document.querySelector('[id="psw"]').value;

        logIn(username, psw);
        document.querySelector(".form-popup-heart").remove();
    });
}

function getsearchedDrink() {
    document.getElementById('drinkName').addEventListener('keyup', function() {
        let search = document.getElementById('drinkName').value;
        getDrinksByName(search);

        if (search == "") {
            getDrinksByLetter('a');
        }
    });
}

function createAlphabet() {
    let alphabetOne = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M'
    ];
    let alphabetTwo = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'];
    let alphabetThree = ['V', 'W', 'X', 'Y', 'Z'];
    alphabetOne.forEach(letter => {
        let text = document.createElement('p');
        text.innerHTML = letter;
        let aDiv = document.querySelector('.alphabetOne');
        aDiv.append(text);
        text.addEventListener('click', function(e) {
            let clickedLetter = e.target.innerHTML;
            clickedLetter = clickedLetter.toLowerCase();
            getDrinksByLetter(clickedLetter);
        });
    });
    alphabetTwo.forEach(letter => {
        let text = document.createElement('p');
        text.innerHTML = letter;
        let aDiv = document.querySelector('.alphabetTwo');
        aDiv.append(text);
        text.addEventListener('click', function(e) {
            let clickedLetter = e.target.innerHTML;
            clickedLetter = clickedLetter.toLowerCase();
            getDrinksByLetter(clickedLetter);
        });
    });
    alphabetThree.forEach(letter => {
        let text = document.createElement('p');
        text.innerHTML = letter;
        let aDiv = document.querySelector('.alphabetThree');
        aDiv.append(text);
        text.addEventListener('click', function(e) {
            let clickedLetter = e.target.innerHTML;
            clickedLetter = clickedLetter.toLowerCase();
            getDrinksByLetter(clickedLetter);
        });
    });
}

let sortArrayA = [];

function getAlcoholic() {
    fetch(
            new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`)
        )
        .then(r => r.json())
        .then(rsc => {
            for (let drink of rsc.drinks) {
                sortArrayA.push(drink.strAlcoholic);
            }
            let sortAlcoholic = sortArrayA.sort();
            createFilterAlcohol(sortAlcoholic);
        });
}

let sortArrayC = [];

function getCategory() {
    fetch(
            new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
        )
        .then(r => r.json())
        .then(rsc => {
            for (let drink of rsc.drinks) {
                sortArrayC.push(drink.strCategory);
            }
            let sortCategory = sortArrayC.sort();
            createFilterCategory(sortCategory);
        });
}

let sortArrayG = [];

function getGlass() {
    fetch(
            new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`)
        )
        .then(r => r.json())
        .then(rsc => {
            for (let drink of rsc.drinks) {
                sortArrayG.push(drink.strGlass);
            }
            let sortGlass = sortArrayG.sort();
            createFilterGlass(sortGlass);
        });
}

let sortArrayI = [];

function getIngrediants() {
    fetch(
            new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
        )
        .then(r => r.json())
        .then(rsc => {
            for (let drink of rsc.drinks) {
                sortArrayI.push(drink.strIngredient1);
            }
            let sortIngrediants = sortArrayI.sort();

            createFilterIngrediant(sortIngrediants);

        });
}
let alcoholDrinksById = [];

function createFilterAlcohol(alcohol) {
    let chooseAlcohol = document.getElementById('chooseAlcohol');
    alcohol.forEach(a => {
        let option = document.createElement('option');
        option.text = a;
        chooseAlcohol.append(option);
        option.addEventListener('click', function() {
            fetch(
                    new Request(
                        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${option.value}`
                    )
                )
                .then(r => r.json())
                .then(rsc => {
                    rsc.drinks.forEach(drink => {
                        let id = drink.idDrink;
                        fetch(
                                new Request(
                                    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                                )
                            )
                            .then(r => r.json())
                            .then(rsc => {
                                alcoholDrinksById.push(rsc.drinks[0]);
                                createDrinks(alcoholDrinksById);
                            });
                    });
                    alcoholDrinksById = [];

                });
        });
    });
}
let categoryDrinksById = [];

function createFilterCategory(category) {
    let chooseCategory = document.getElementById('chooseCategory');
    category.forEach(c => {
        let option = document.createElement('option');
        option.text = c;
        chooseCategory.append(option);
        option.addEventListener('click', function() {
            fetch(
                    new Request(
                        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${option.value}`
                    )
                )
                .then(r => r.json())
                .then(rsc => {
                    rsc.drinks.forEach(drink => {
                        let id = drink.idDrink;
                        fetch(
                                new Request(
                                    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                                )
                            )
                            .then(r => r.json())
                            .then(rsc => {
                                categoryDrinksById.push(rsc.drinks[0]);
                                createDrinks(categoryDrinksById);
                            });
                    });
                    categoryDrinksById = [];
                });
        });
    });
}
let glassDrinksById = [];

function createFilterGlass(glass) {
    let chooseGlass = document.getElementById('chooseGlass');
    glass.forEach(g => {
        let option = document.createElement('option');
        option.text = g;
        chooseGlass.append(option);
        option.addEventListener('click', function() {
            fetch(
                    new Request(
                        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${option.value}`
                    )
                )
                .then(r => r.json())
                .then(rsc => {
                    rsc.drinks.forEach(drink => {
                        let id = drink.idDrink;
                        fetch(
                                new Request(
                                    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                                )
                            )
                            .then(r => r.json())
                            .then(rsc => {
                                glassDrinksById.push(rsc.drinks[0]);
                                createDrinks(glassDrinksById);
                            });
                    });
                    glassDrinksById = [];
                });
        });
    });
}
let ingrediantDrinksById = [];

function createFilterIngrediant(ingrediant) {
    let chooseIngrediant = document.getElementById('chooseIngrediant');
    ingrediant.forEach(i => {

        let option = document.createElement('option');
        option.text = i;
        chooseIngrediant.append(option);
        option.addEventListener('click', function() {
            fetch(
                    new Request(
                        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${option.value}`
                    )
                )
                .then(r => r.json())
                .then(rsc => {
                    rsc.drinks.forEach(drink => {
                        let id = drink.idDrink;
                        fetch(
                                new Request(
                                    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                                )
                            )
                            .then(r => r.json())
                            .then(rsc => {
                                ingrediantDrinksById.push(rsc.drinks[0]);
                                createDrinks(ingrediantDrinksById);
                            });
                    });
                    ingrediantDrinksById = [];
                });
        });
    });
}

function getClickedIngretidant() {
    let name = sessionStorage.getItem('ingName');

    fetch(
            new Request(
                `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`
            )
        )
        .then(r => r.json())
        .then(rsc => {
            rsc.drinks.forEach(drink => {
                let id = drink.idDrink;
                fetch(
                        new Request(
                            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                        )
                    )
                    .then(r => r.json())
                    .then(rsc => {
                        ingrediantDrinksById.push(rsc.drinks[0]);
                        createDrinks(ingrediantDrinksById);
                    });
            });
            ingrediantDrinksById = [];
        });
}

function getClickedDrink() {

    let clickedDrinkId = sessionStorage.getItem('topDrinkId');
    console.log(clickedDrinkId)

    if (clickedDrinkId != null) {
        buildDrinkPopUp(clickedDrinkId);
        document.getElementById('wrapper').innerHTML = '';
    }
    sessionStorage.removeItem('topDrinkId');



}

function clearSelect() {
    let alcohol = document.getElementById("chooseAlcohol");
    let category = document.getElementById("chooseCategory");
    let glass = document.getElementById("chooseGlass");
    let ingrediant = document.getElementById("chooseIngrediant");
    let clearAll = document.getElementById("clearFilters");
    alcohol.addEventListener("change", function(event) {
        category.value = "";
        glass.value = "";
        ingrediant.value = "";
    });

    category.addEventListener("change", function(event) {
        alcohol.value = "";
        glass.value = "";
        ingrediant.value = "";
    });

    glass.addEventListener("change", function(event) {
        alcohol.value = "";
        category.value = "";
        ingrediant.value = "";
    });

    ingrediant.addEventListener("change", function(event) {
        alcohol.value = "";
        category.value = "";
        glass.value = "";
    });

    clearAll.addEventListener("click", function() {
        alcohol.value = "";
        category.value = "";
        glass.value = "";
        ingrediant.value = "";
        getDrinksByLetter('a');
    });


}

function backToTop() {

    let toTop = document.getElementById("toTop");

    // When the user scrolls down 220px from the top of the document, show the button
    window.onscroll = function() { scrollFunction(); };

    function scrollFunction() {
        if (document.body.scrollTop > 220 || document.documentElement.scrollTop > 220) {
            toTop.style.display = "block";
        } else {
            toTop.style.display = "none";
        }
    }

    toTop.addEventListener('click', function() {

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

}

getClickedDrink()
getDrinksByLetter('a');
getsearchedDrink();
createAlphabet();
getAlcoholic();
getCategory();
getGlass();
getIngrediants();
getClickedIngretidant();
clearSelect();
backToTop();