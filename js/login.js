"use strict";

let user = 0;

function logIn(username, pw) {

    let userObj = {
        email: username,
        password: pw
    };

    const logInRqst = new Request("../php/logIn.php", {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: { "Content-type": "application/json" }
    });

    fetch(logInRqst)
        .then(resp => {
            if (resp.status != 200) {
                user = 0;

            }
            return resp.json();
        }
        )
        .then(rsc => {
            user = rsc.id;
            console.log(user);
        });
}

logIn("anna@gmail.com", "blueOrange96!%%");