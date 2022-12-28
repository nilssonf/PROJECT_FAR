"use strict";

function header(user) {

    let header = document.querySelector("#header");
    header.innerHTML = "";
    header.classList.add("header");

    let logga = document.createElement("h2");
    logga.innerText = "Bottled";
    logga.classList.add("logga", "menuElm");

    let scroll = document.createElement("p");
    scroll.innerText = "Scroll Drinks";
    scroll.classList.add("scroll", "menuElm");

    let about = document.createElement("p");
    about.innerText = "About";
    about.classList.add("about", "menuElm");

    if (user == 0) {
        let signIn = document.createElement("div");
        signIn.innerHTML = `
        <img src="../profiles/circle.png" class="circle">
            <p class="menuElm" id="signIn""> Sign in</p> `;

        signIn.classList.add("signIn");
        header.append(logga, scroll, about, signIn);
        document.querySelector("#signIn").addEventListener("click", function() {
            createLogin();
            closeSignInBtn();
            document.querySelector(".sign_in").addEventListener('click', function() {
                let username = document.querySelector('[id="email"]').value;
                let psw = document.querySelector('[id="psw"]').value;
                document.querySelector(".signInForm").remove();

                header.innerHTML = "";
                logIn(username, psw);
                // setTimeout(() => {
                //     currentUser();
                // }, "1000");
            });
        });
    } else {

        createSmallImage(user)

        let favourites = document.createElement("p");
        favourites.innerText = "Favourite drinks";
        favourites.classList.add("favourites", "menuElm");

        let signOut = document.createElement("div");
        signOut.innerHTML = `<p  class='standard'>Sign out</p>`;
        signOut.classList.add("signOut", "menuElm");

        header.append(logga, scroll, about, favourites, signOut);

        favourites.onclick = function() {
            location.href = '../html/favorites.html';
        };

        document.querySelector('.signOut p').onclick = function() {
            location.href = 'index.html';
            sessionStorage.removeItem('user');
            header.innerHTML = "";
            logOut();
        }
    }

    logga.onclick = function() {
        location.href = 'index.html';
    };

    scroll.onclick = function() {
        location.href = '../html/search.html';
    };

    about.onclick = function() {
        location.href = '../html/about.html';
    };

}

header(sessionStorage.getItem("user"));


function createSmallImage(user) {
    fetch('../php/users.json')
        .then(r => r.json())
        .then(rsc => {
            rsc.forEach(u => {
                if (u.id === user) {
                    let smallImage = document.createElement("img")
                    let userPic = u.picture
                    smallImage.classList.add("smallImage")
                    smallImage.src = userPic;

                    document.querySelector(".signOut").append(smallImage)

                    smallImage.onclick = function() {
                        location.href = '../html/profile.html'
                    }
                }

            })
        })
}