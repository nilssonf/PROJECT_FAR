"use strict";

function renderProfile(usr) {
    let firstName = document.querySelector("#info h1");
    let age = document.querySelector("#age");
    let occupation = document.querySelector("#occupation");

    firstName.innerText = usr.name;
    age.innerText += ` ${usr.age}`;
    occupation.innerText += ` ${usr.occupation}`;

    let profileImg = document.createElement("img");
    profileImg.classList.add("profileImg");

    profileImg.src = usr.picture; 

    document.getElementById("photo").append(profileImg);
}


function renderComments(usr) {
    let comments = document.getElementById("comments");

    fetch(new Request('../php/comments.json'))
        .then(r => r.json())
        .then(rsc => {
            let commentList = rsc;
            let notLiked = [];
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
                } else if (c.userId != usr) {
                    let drinkId = c.userId
                    notLiked.push(drinkId)

                    if (notLiked.length == commentList.length) {
                        let noFav = document.querySelector('#comments');
                        noFav.innerHTML = "You have not commented any drinks"
                    }
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
            let notLiked = [];
            allFavorites.forEach(fav => {
                if (fav.userId == usr) {
                    myFavorites.push(fav);
                } else if (fav.userId != usr) {
                    let drinkId = fav.userId
                    notLiked.push(drinkId)

                    if (notLiked.length == allFavorites.length) {
                        let noFav = document.querySelector('#oneFav');
                        noFav.innerHTML =
                            `You don't have any favorite drinks`
                    }
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
                    settingsIcon.addEventListener("click", function() {
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

        drink.addEventListener("click", function() {
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




function createSettingsPopUp(user) {

    let updateUser = document.createElement("div");
    updateUser.classList.add("updateContainer");

    updateUser.innerHTML = `
        <div class="update-popup" >

            <div class="updateContent" id="update-close">

                <h2 class="updateH2">Update your account</h2>

                <label class="updateStyle" for="name"><b class="updateLabels">Your first name? </b></label>
                <input class="updateInput" value="${user.name}" type="text" id="name" required>

                <label class="updateStyle" for="email"><b class="updateLabels">Your email?</b></label>
                <input class="updateInput" value="${user.email}" type="text" id="mail" required>

                <label class="updateStyle" for="password"><b class="updateLabels">Select a password</b></label>
                <input class="updateInput" value="${user.password}" type="password" id="password" required>

                <label class="updateStyle" for="age"><b class="updateLabels">Your age?</b></label>
                <input class="updateInput" value="${user.age}" type="text" id="age" required>

                <label class="updateStyle" for="occupation"><b class="updateLabels">Your occupation?</b></label>
                <input class="updateInput" value="${user.occupation}" type="text" id="occupation" required>

                <form action="../php/addProfilePicture.php" method="POST" id="uploadForm"
                    <label class="updateStyle" for="profilePic"><b class="updateLabels paddingbtm">Choose a profile picture</b></label>
                    <input type="file" name="uploadProfilePic" id="profilePic">
                    <button type="submit" class="savePicture"> Save picture </button>

                </form>
                <button class="updateDone"> Update profile </button>

            </div>
         </div>
    `
    document.getElementById("updateOverlay").append(updateUser)

    const form = document.getElementById("uploadForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        const request = new Request("../php/addProfilePicture.php", {
            method: "POST",
            body: formData
        });

        fetch(request)
            .then(r => r.json())
            .then(data => {
                console.log(data);
            })
    })

    let btnUpdate = document.querySelector(".updateDone");

    btnUpdate.addEventListener("click", function (){

        let searchPath = "../profiles/" + document.getElementById("profilePic").files[0].name;

        let updUser = {
            id: sessionStorage.getItem("user"),
            email: document.getElementById("mail").value,
            password: document.getElementById("password").value,
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            occupation: document.getElementById("occupation").value,
            picture: searchPath
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
        document.getElementById("updateOverlay").remove();

    })

}

function closebtn() {
    let close = document.createElement('a');
    close.classList.add('closeUpdateHeart');
    close.addEventListener('click', function() {
        document.getElementById("updateOverlay").remove();
    });

    document.getElementById("update-close").append(close)
}