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

function renderRandomFav(usr) {
    fetch(new Request('../php/favorites.json'))
        .then(r => r.json())
        .then(rsc => {
            let allFavorites = rsc;
            let myFavorites = [];
            allFavorites.forEach(fav => {
                if (fav.userId == usr) {
                    myFavorites.push(fav);
                }
            });

            let randomId = myFavorites[Math.floor(Math.random() * myFavorites.length)].drinkId;

            fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomId}`))
                .then(r => r.json())
                .then(rsc => {
                    let imgSrc = rsc.drinks[0].strDrinkThumb;
                    let imgWrap = document.querySelector('#oneFav');

                    imgWrap.innerHTML = `<img src='${imgSrc}'>`;
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
                    renderRandomFav(user);

                    let settingsIcon = document.getElementById("settingsIcon");
                    settingsIcon.addEventListener("click", function(){
                        document.getElementById("updateOverlay").style.display = "flex";

                        createSettingsPopUp(u)
                        closebtn()
                    })
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




function createSettingsPopUp (user) {

    let updateUser = document.createElement("div");
    updateUser.classList.add("updateContainer");

    updateUser.innerHTML = `
        <div class="update-popup" >

            <div class="updateContent" id="update-close">

                <h2>Update your account</h2>

                <label for="name"><b>Your first name? </b></label>
                <input value="${user.name}" type="text" id="name" required>

                <label for="email"><b>Your email?</b></label>
                <input value="${user.email}" type="text" id="mail" required>

                <label for="password"><b>Select a password</b></label>
                <input value="${user.password}" type="password" id="password" required>

                <label for="age"><b>Your age?</b></label>
                <input value="${user.age}" type="text" id="age" required>

                <label for="occupation"><b>Your occupation?</b></label>
                <input value="${user.occupation}" type="text" id="occupation" required>

                <label for="profilePic"><b>Choose a profile picture</b></label>
                <input type="file" id="profilePic">

                <button class="updateDone"> Update profile </button>

            </div>
         </div>
    `
    document.getElementById("updateOverlay").append(updateUser)

    let btnUpdate = document.querySelector(".updateDone");
    btnUpdate.addEventListener("click", function (){
        let updUser = {
            id: sessionStorage.getItem("user"),
            email: document.getElementById("mail").value,
            password: document.getElementById("password").value,
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            occupation: document.getElementById("occupation").value,
            picture: document.getElementById("profilePic").value
        };
    
        const addUpdUser = new Request("../php/editUser.php", {
            method: 'PUT',
            body: JSON.stringify(updUser),
            headers: { "Content-type": "application/json" }
        });
    
        fetch(addUpdUser)
            .then(r => r.json())
            .then(rsc => console.log(rsc));
        
        location.reload();
    })

}

function closebtn(){
    let close = document.createElement('a');
    close.classList.add('closeUpdateHeart');
    close.addEventListener('click', function() {
        document.getElementById("updateOverlay").style.display = "none";
    });

    document.getElementById("update-close").append(close)
}