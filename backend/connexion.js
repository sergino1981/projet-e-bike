"use strict";
/**
 * @ Description Connexion à un compte pour achat
 */
function connexion() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/http_getConnexion?mail=' + connexionForm.eltMail.value + '&paswoord='+ connexionForm.eltPasswoord.value, true);
    xhr.onload = function () {
        openConnexion(JSON.parse(xhr.responseText));
    }
    xhr.send();
}


function openConnexion(data) {
console.log(data);
    if(data.length == 0){
        alert("Veuillez vérifier votre mail ou mot de passe");
    }else {
        console.log(data[0].cltId);
       let refClient = (document.getElementById("clientId").value = data[0].cltId);
        console.log(refClient);
        localStorage.setItem("cltId",JSON.stringify(refClient));
        window.location.href="page?url=facture";
        localStorage.setItem("clientId", JSON.stringify(data[0].cltId));
    }
}


