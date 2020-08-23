"use strict";

let nvoStock =0;

/**
 * @Description Chargement de ta table  velo
 */
function chargement() {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/http_getLoadVTT_Serious');
    xhr.onload = function () {
        affichage(JSON.parse(xhr.responseText));
    }
    xhr.send();
}

/**
 *@Description Fonction permettant l'affichage du nom , du prix, de la description et des caractéristiques du vélo sur la page  depuis la base de donnée
 *@param {data}
 *@type {string}
 */

function affichage(data) {
    console.log(data);
    let strNom = " ", strDescription= " ", strCaracteristique = " ", strcaractéristiquesBis= " ", strPrix =0;
    for(let d in data){
        strNom = "<p>"+data[d]["nomVelo"]+"</p>";
        strPrix = "<p>"+ data[d]["prixVelo"].toFixed(2.4)+" €"+"</p>";
        strDescription = "<p>"+data[d]["descriptionVelo"]+"</p>";
        strCaracteristique ="<p>"+ data[d]["caractéristiques"]+"</p>";
        strcaractéristiquesBis ="<p>"+ data[d]["caractéristiquesBis"]+"</p>";

        if(d == 6){ document.getElementById("descriNom").innerHTML = strNom;}
        if(d == 6){document.getElementById("descriPrix").innerHTML = strPrix;}
        if(d == 6){document.getElementById("descriDescription").innerHTML = strDescription;}
        if(d == 6){document.getElementById("descriCaracteristique").innerHTML = strCaracteristique;}
        if(d == 6){document.getElementById("descriCaracteristique").innerHTML = strCaracteristique;}
        if(d == 6){document.getElementById("descriCaracteristique2").innerHTML = strcaractéristiquesBis;}
    }
}

/**
 *@description Vérification du stock existant
 */

function checkStock() {
    let refVelo = document.formulaireProd.prodId.value;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/http_getStock?prodId=' + refVelo,true);
    xhr.onload = function () {
        resultatStock(JSON.parse(xhr.responseText));
    }
    xhr.send();
}


function resultatStock(data) {
    let quantiteAchetee = formulaireProd.quantite.value;
    console.log(quantiteAchetee);
    let stockRestant = data[0].stock;
    nvoStock = data[0].stock - quantiteAchetee;
    console.log(stockRestant);
    console.log(quantiteAchetee);
    console.log(nvoStock);
    if (stockRestant < quantiteAchetee) {
        alert("Veuillez choisir une quantité à " + stockRestant);
    }
}

/**
 *@Description Fonction pour tester un champ input non nul
 */

function required(inputtx)
{
    if (inputtx.value.length == 0)
    {
        return false;
    }
    return true;
}
/**
 *@Description  valider la quantité par rapport à l'existant
 */
function valider() {
    let refVelo = document.formulaireProd.prodId.value;
    let qteAchat = document.formulaireProd.quantite.value;
    console.log(refVelo+" "+ qteAchat);
    if(required(document.getElementById("quantite"))){
        window.location.href="page?url=connexion";
        localStorage.setItem("prodId",JSON.stringify(refVelo));
        localStorage.setItem("qteProd", JSON.stringify(qteAchat));
        localStorage.setItem("stock",JSON.stringify(nvoStock));
    }else{
        alert("Ne peut être nulle");
    }
}
