"use strict";

let idCli;

//Vérification si le mot de passe existe déjà ou non
function testMail() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET','http://localhost/http_getTestEmail?email='+formValid.email.value);
        xhr.onload = function () {
            reslutTest(JSON.parse(xhr.responseText))
        }
        xhr.send;
}

function reslutTest(data) {
        console.log(data);
        if(data.length == 0)
        {
            alert("Cet e-mail n'existe pas")
        }else{
            idCli = data[0].Idclient;
        }
    }

//Vérification du mot de passe et la confirmation du mot de passe.
function checkPassword() {
    let mp=document.getElementById('password1');
    let confirmMp = document.getElementById('password2');
    if(mp.value != confirmMp.value){
        alert('Les mots de passe ne sont pas identiques');
    }
}


//Modification du mot de passe
function modifyPassword() {

    let xhr = XMLHttpRequest();
    xhr.open('GET', 'http://localhost/http_getChangePassword?idClient='+ idCli +'&password1='+ formValid.password1.value + '&password2=' + formValid.password2.value)
    xhr.onload = function () {
    xhr.responseText();
    }
    xhr.send();
    console.log('La mise à jour a été faite');
}