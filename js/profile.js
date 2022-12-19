"use strict";

function currentUser() {
    let currentUser = user;

    fetch(new Request('../php/users.json'))
        .then(r => r.json())
        .then(rsc => {
            let usersList = rsc;

            usersList.forEach(u => {
                if (u.id == currentUser) {
                    let firstName = document.querySelector("#info h1");
                    let age = document.querySelector("#age");
                    let occupation = document.querySelector("#occupation");

                    firstName.innerText = u.name;
                    age.innerText += ` ${u.age}`;
                    occupation.innerText += ` ${u.occupation}`;
                }
            });
        });
}