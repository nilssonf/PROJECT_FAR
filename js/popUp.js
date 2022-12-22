function buildDrinkPopUp(id) {

    document.getElementById("overlay").style.display = "flex";

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(r => r.json())
        .then(rsc => {
            choosenDrink(rsc);
            let comt = document.querySelector('textarea');
            comt.addEventListener('keyup', function () {
                let maxLength = 120;
                let currentLength = comt.value.length;
                let left = maxLength - currentLength;

                document.querySelector('.charsLeft').innerText = `${left} characters remaining`;
            });

            let commentCount = document.querySelector('.comHeader h3');
            setTimeout(() => {
                let count = document.querySelectorAll('.comment').length;
                if (count > 0) {
                    commentCount.innerText += ` (${count})`;
                }
            }, 200);

            let btn = document.querySelector('.postCom');
            btn.addEventListener('click', function () {
                setTimeout(() => {
                    postComment(id, user, document.querySelector(".showOneDrinkDiv"));
                }, 1000);
            });
        });
}

function renderComments(id, parent) {
    let commentBox = document.createElement('div');
    commentBox.classList.add('comments');
    commentBox.innerHTML = `
    <div class='comHeader'>
        <h3>Comments</h3>
        <div>
            <textarea class="cmt" name="cmt" minlength="1" maxlength="120" rows="5" cols="45" placeholder="What did you think about this drink?"></textarea>
        <div class='sendInfo'>
            <p class='charsLeft'>120 characters remaining</p>
            <button class='postCom'>Comment</button>
        <div>
    </div>
    `;
    parent.append(commentBox);

    fetch(new Request('../php/comments.json'))
        .then(r => r.json())
        .then(comments => {
            comments.forEach(comment => {
                if (comment.drinkId == id) {
                    let com = document.createElement('div');
                    com.classList.add('comment');
                    commentBox.append(com);

                    fetch(new Request('../php/users.json'))
                        .then(r => r.json())
                        .then(users => {
                            users.forEach(usr => {
                                if (comment.userId == usr.id) {

                                    com.innerHTML = `
                                <div>
                                    <p class='userName'>${usr.name}</p>
                                    <p class='date'>${comment.date}</p>
                                </div>
                                <p class='content'>${comment.comment}</p>
                                `;
                                }
                            });
                        });
                }
            });
        });
}

function postComment(id, user, parent) {
    let commentText = document.querySelector('.cmt').value;
    let commentBody = {
        drinkId: id,
        userId: user,
        comment: commentText
    };

    fetch(new Request('../php/createComment.php'), {
        method: 'POST',
        body: JSON.stringify(commentBody),
        headers: { "Content-type": "application/json" }
    })
        .then(r => r.json())
        .then(rsc => {
            console.log(rsc);
            let currentList = document.querySelector('.comments');
            currentList.remove();
            renderComments(id, parent);
        });
}

function choosenDrink(rsc) {
    document.getElementById('searchWrapper').innerHTML = '';

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

    let gridCol = ingr.length;

    imgDiv.style.gridColumn = `repeat(${gridCol}, 1fr)`;
    ingrDiv.style.gridColumn = `repeat(${gridCol}, 1fr)`;
    measureDiv.style.gridColumn = `repeat(${gridCol}, 1fr)`;


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
        </div>
        <div class="align-right">
            <img src="../images/gilla.png" class="heartImg" id="${drinkId}">
            <div id="instruct">
            <div class="steps">
            <h3 class="oneDrinkH3">Steps:</h3>
            <p class="align-left">${drinkInstructions}</p>
            </div>
            <div class="steps">
            <h3 class="oneDrinkH3">Recommended glass:</h3>
            <p>${drinkGlass}</p>
            </div>
            </div>
        </div>

    `;

    overlay.append(drinkBox);
    renderComments(drinkId, drinkBox);

    let heart = document.querySelectorAll('.heartImg');
    heart.forEach(h => {

        h.addEventListener('click', function () {
            console.log('Hej');


            if (user === 0) {
                createLoginViaHeart();
            } else {
                h.src = '../images/gillasvart.png';
                let heartId = h.id;
                addNewFavorite(heartId);
            }
        });
    });


    let close = document.createElement("a");
    close.classList.add("close");
    close.href = "#";
    overlay.append(close);

    close.addEventListener("click", function (event) {
        document.getElementById("overlay").style.display = "none";

        window.location.href = "../html/search.html";
    });
}

// keyup(function () {
//     var length = $(this).val().length;
//     var length = maxLength - length;
//     $('#chars').text(length);
// });