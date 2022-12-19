"use strict";

function renderProfile(usr) {
    let firstName = document.querySelector("#info h1");
    let age = document.querySelector("#age");
    let occupation = document.querySelector("#occupation");

    firstName.innerText = usr.name;
    age.innerText += ` ${usr.age}`;
    occupation.innerText += ` ${usr.occupation}`;
}

function renderComments(usr) {
    let comments = document.getElementById("comments");

    fetch(new Request('../php/comments.json'))
        .then(r => r.json())
        .then(rsc => {
            let commentList = rsc;
            commentList.forEach(c => {
                if (c.userId == usr) {
                    let comment = document.createElement('div');
                    comment.classList.add('comment');
                    comments.append(comment);

                    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${Number(c.drinkId)}`))
                        .then(r => r.json())
                        .then(rsc => {
                            let drinkName = rsc.drinks[0].strDrink;

                            comment.innerHTML = `
                                <div>
                                <p class='date'>${c.date}</p>
                                <p class='drink'>${drinkName}</p>
                                </div>
                                <p class'content'>${c.comment}</p>
                            `;

                        });
                }
            });
        });
}

function currentUser(user) {

    fetch(new Request('../php/users.json'))
        .then(r => r.json())
        .then(rsc => {
            let usersList = rsc;

            usersList.forEach(u => {
                if (u.id == user) {
                    renderProfile(u);
                    renderComments(u.id);
                }
            });
        });
}

currentUser(user);

setTimeout(() => {
    let drinks = document.querySelectorAll('.drink');
    drinks.forEach(drink => {
        let drinkName = drink.textContent;

        drink.addEventListener("click", function () {
            fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`))
                .then(r => r.json())
                .then(rsc => {
                    let topDrinkId = rsc.drinks[0].idDrink;
                    sessionStorage.setItem("topDrinkId", topDrinkId);
                    location.href = "../html/search.html";
                });
        });
    });
}, 1000);