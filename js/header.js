"use strict";

function header(user) {
    let header = document.querySelector("#header");
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
        document.querySelector("#signIn").addEventListener("click", function () {
            createLogin();

            document.querySelector(".sign_in").addEventListener('click', function () {
                let username = document.querySelector('[id="email"]').value;
                let psw = document.querySelector('[id="psw"]').value;

                header.innerHTML = "";
                logIn(username, psw);
            });
        });
    } else {
        let favourites = document.createElement("p");
        favourites.innerText = "Favourite drinks";
        favourites.classList.add("favourites", "menuElm");

        let signOut = document.createElement("div");
        signOut.innerHTML = "<img src='../profiles/standard_picture.png' class='standard profile'><p>Sign out</p>";
        signOut.classList.add("signOut", "menuElm");

        header.append(logga, scroll, about, favourites, signOut);

        favourites.onclick = function () {
            location.href = '../html/favorites.html';
        };

        let profilePic = document.querySelector('.profile');

        profilePic.onclick = function () {
            location.href = '../html/profile.html';
        };

        signOut.onclick = function () {
            sessionStorage.removeItem('user');
            header.innerHTML = "";
            logOut();
        };
    }

    logga.onclick = function () {
        location.href = 'index.html';
    };

    scroll.onclick = function () {
        location.href = '../html/search.html';
    };

    about.onclick = function () {
        location.href = '../html/about.html';
    };

}

header(0);