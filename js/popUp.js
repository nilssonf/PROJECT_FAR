function buildDrinkPopUp(id) {

    document.getElementById("overlay").style.display = "block";

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(r => r.json())
        .then(rsc => {
            choosenDrink(rsc);
        });
}

function choosenDrink(rsc) {
    let overlay = document.getElementById("overlay");

    let drinkId = rsc.drinks[0].idDrink;
    let drinkName = rsc.drinks[0].strDrink;
    let drinkImg = rsc.drinks[0].strDrinkThumb;
    let drinkInstructions = rsc.drinks[0].strInstructions;
    let drinkGlass = rsc.drinks[0].strGlass;

    let ingr = [];
    let measures = [];

    let drinkObject = rsc.drinks[0];

    for (let key in drinkObject) {

        if (key.includes("strIngredient") && drinkObject[key] != null) {
            ingr.push(drinkObject[key]);
        }
    }

    for (let key in drinkObject) {

        if (key.includes("strMeasure") && drinkObject[key] != null) {
            measures.push(drinkObject[key]);
        }
    }

    let imgDiv = document.createElement('div');
    imgDiv.classList.add("imgDiv");
    let ingrDiv = document.createElement('div');
    ingrDiv.classList.add("ingrDiv");
    let measureDiv = document.createElement('div');
    measureDiv.classList.add("measureDiv");

    for (let i = 0; i < ingr.length; i++) {
        let ingrP = document.createElement("p");
        ingrP.innerText = ingr[i];

        ingrDiv.append(ingrP);
    }

    for (let j = 0; j < measures.length; j++) {
        let measureP = document.createElement("p");
        measureP.innerText = measures[j];

        measureDiv.append(measureP);
    }

    for (let i = 0; i < ingr.length; i++) {
        let picName = ingr[i].toLowerCase().replace(/\s/g, '%20');
        imgDiv.innerHTML += `
        <img class="ingrImg" src="https://www.thecocktaildb.com/images/ingredients/${picName}-Small.png">
        `;
    }

    let drinkBox = document.createElement("div");
    drinkBox.classList.add("showOneDrinkDiv");

    drinkBox.innerHTML = `
        <div><img class="overlayDrinkImg" src="${drinkImg}"></div>
        <div>
            <h2 class="oneDrinkName">${drinkName}</h2>
            <h3 class="oneDrinkH3">Ingredients:</h3>
            <div class="ingredientsDiv">
                <div class="imgContainer">${imgDiv.innerHTML}</div>
                <div class="ingrContainer">${ingrDiv.innerHTML}</div>
                <div class="measureContainer">${measureDiv.innerHTML}</div>
            </div>
            <h3 class="oneDrinkH3">Recommended glass:</h3>
            <p>${drinkGlass}</p>
        </div>
        <div class="align-right">
            <img src="../images/gilla.png" class="heartImg" id="${drinkId}">
            <h3 class="oneDrinkH3">Steps:</h3>
            <p class="align-left">${drinkInstructions}</p>
        </div>

    `;


    overlay.append(drinkBox);

    let heart = document.querySelectorAll('.heartImg')
    heart.forEach(h => {
<<<<<<< Updated upstream
    h.addEventListener('click', function () {
        console.log('Hej')

        if (user === 0) {
        createLoginViaHeart()
        } else {
        h.src = '../images/gillasvart.png'
        let heartId = h.id
        addNewFavorite(heartId)
        }
    })
    })
=======
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
>>>>>>> Stashed changes

    let close = document.createElement("a");
    close.classList.add("close");
    close.href = "#";
    overlay.append(close);

    close.addEventListener("click", function(event) {
        document.getElementById("overlay").style.display = "none";

        window.location.href = "../html/search.html";
    });
}