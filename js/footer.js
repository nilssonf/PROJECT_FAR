"use strict";

function buildFooter() {
    let footer = document.querySelector("#footer");
    footer.classList.add("footer");
<<<<<<< Updated upstream
    footer.innerText = "footer";
=======

    let companyInfo = document.createElement("div");
    companyInfo.classList.add("companyInfo");
    companyInfo.innerText = "© 2022  | Bottled Co.";

    footer.append(companyInfo);

    let bottled = document.createElement("div");
    bottled.classList.add("bottled");
    bottled.innerText = "Bottled";

    footer.append(bottled);
>>>>>>> Stashed changes
}

buildFooter()