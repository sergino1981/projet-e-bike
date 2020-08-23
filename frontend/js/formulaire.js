"use strict";

function checkBirthDate(){
    let dateSaisie = document.getElementById("eltBirthday").value;
    let dateSaisieObject = new Date(dateSaisie);
    let today = new Date().getFullYear();
    let saisieYear = dateSaisieObject.getFullYear();
    while((today - saisieYear) < 18) {
        alert("Desolé vous n'êtes pas majeur");
        return true;
    }
}


function validationEmail(){
    let expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if (expressionReguliere.test(formulaire.eltMail.value)){
        return true;
    }
    else{
        alert('E mail invalide');
        return false;
    }
}


function checkPassword() {
let mp=document.getElementById('eltMP');
let confirmMp = document.getElementById('eltConfirm');
    if(mp.value != confirmMp.value){
    alert('Les mots de passe ne sont pas identiques');
    }
}

function getId(id){
    return document.getElementById('id');
};

/*Insertion d'un nouveau client dans la base de donnée*/
function insertionClient() {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    event.preventDefault();
    if(!validationEmail()){
        alert("On stop adresse email invalide.");
    }
    else{
        if(checkBirthDate()){
            alert("Desolé vous n'êtes pas majeur")
        }
        else{

            xhr.open('GET', 'http://localhost/http_getInsertClient?nom=' + formulaire.eltNom.value
                                                                    + '&prenom=' + formulaire.eltPrenom.value
                                                                    + '&sexe=' + formulaire.eltSexe.value
                                                                    + '&adresse='+ formulaire.eltAdresse.value
                                                                    + '&ville=' + formulaire.eltVille.value
                                                                    + '&codePostal=' + formulaire.eltCP.value
                                                                    + '&pays=' + formulaire.eltPays.value
                                                                    + '&adresseLivraison=' + formulaire.eltAdLivraison.value
                                                                    + '&email=' + formulaire.eltMail.value
                                                                    + '&motPasse=' + formulaire.eltMP.value
                                                                    + '&confirmationMotPasse=' + formulaire.eltConfirm.value
                                                                    + '&telephone=' + formulaire.eltPhone.value
                                                                    + '&dateNaissance=' + formulaire.eltBirthday.value)
            xhr.onload=function(){
                let reponse = JSON.stringify(xhr.responseText);
                getId("zoneTexte").innerHTML = message;
                console.log(reponse);
            }
            xhr.send();

            console.log(" client bien enregistré fait");
            alert("Merci pour votre inscription ");
            window.location.href='page?url=accueil';
        }
    }
}
