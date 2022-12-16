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
        .then(resp => resp.json())
        .then(rsc => {
            user = rsc.id;
        });
}


function createLogin() {

    let close = document.createElement("a");
    close.classList.add("closeSignIn");
    close.addEventListener("click", function() {
        document.getElementById("myForm").style.display = "none";
    })

    let signInForm = document.createElement("div");
    signInForm.innerHTML =

        `
            <div class="form-popup" id="myForm">
            <form action="" class="form-container">
            
            <h2>Sign in</h2>

            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Email" name="email" required>
        
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required>
        
            <button type="submit" class="btn">Sign in </button>
            <button type="button" class="btn create">Create Account</button>
        
            </form>

            </div>
            
            
            `;


    document.querySelector("body").append(signInForm)
    signInForm.append(close)
    document.getElementById("myForm").style.display = "block";

}