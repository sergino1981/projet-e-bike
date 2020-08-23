"use strict";
/**
    * @Description Récuperation de l'id du velo venant du formulaire d'ajout du vélo grâce au localStorage
    * @type {any}
 */
let prodCle  = JSON.parse(localStorage.getItem("prodId"));

/**
  * @Description Récuperation de la quantité achtée venant du formulaire d'ajout du vélo grâce au localStorage
 */
let qteProd = JSON.parse(localStorage.getItem("qteProd"));

/**
    * @Description Récuperation de l'id du client venant du formulaire de connexion grâce au localStorage
 */
let clientCle = JSON.parse(localStorage.getItem("clientId"));

/**
    * @Récupération du stockRestant
    * @type {any}
 */
let StockRestant = JSON.parse(localStorage.getItem('stock'));

console.log(+prodCle+" "+ qteProd+" "+clientCle +" "+StockRestant);


/**
    * @description Mise à jour du stock
  */
function MajStock() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/http_getUpdateStock?refprod=' + prodCle + '&nvoStock='+ StockRestant,true);
    xhr.onload = function () {
        xhr.responseText;
    }
    xhr.send();
    console.log('La mise à jour a été faite');
}

/**
    * @Description Chargement du numéro de la dernière facture
 */
function chargementNumFacture() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/http_getNumFacture', true);
    xhr.onload = function () {
        loadNumber(JSON.parse(xhr.responseText));
    }
    xhr.send();
}

/**
    * @Description Incrémentation du numéro de la facture et chargement des autres champs de la page
    *@param{data}
    *@type {string}
 */
function loadNumber(data) {
    let nvo_Num = (data[data.length-1].numFact)+1;
    console.log(data);
    console.log(nvo_Num);
    document.form1.loadNumber.value = nvo_Num;
    let ladate = new Date();
    document.form1.numClt.value = clientCle;
    document.form1.numCommande.value = (document.form1.loadNumber.value+"-"+(ladate.getFullYear()+"-"+(ladate.getMonth()+1)+"-"+ladate.getDate()));
}

/** @Description fonction pour récupérer le prix vélo depuis la base de donnée **/
function facture() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/http_getNom_Prix?refVelo='+prodCle, true);
    xhr.onload = function () {
        loadDescriPrix(JSON.parse(xhr.responseText));
    }
    xhr.send();
}

/** @Description Affichage et calcul de chaque colonne du tableau
 *@param {JSON} data (resultat de la requete SQL)
 * @typedef {JSON}
 **/
function loadDescriPrix(data) {
    let prixHT = qteProd* data[0].prix;
    const TVA = 21;
    console.log(data);
    console.log(TVA);
    console.log(prixHT * (TVA /100));
    document.getElementById("eltDescri").innerText = data[0].nom;
    document.getElementById('eltPU').innerText = data[0].prix;
    document.getElementById("eltQte").innerHTML = qteProd;

    document.getElementById('eltPHT').innerHTML = prixHT;
    document.getElementById('eltTVA').innerHTML = (prixHT *(TVA /100)).toFixed(2.6)
    document.getElementById('eltTTC').innerHTML  = (prixHT *((100+TVA)/100)).toFixed(2.6);

    document.getElementById('eltPrix').innerText += (prixHT *((100+TVA)/100)).toFixed(2.6);

}

/**
 * @Description Fonction pour l'insertion de la facture dans la table facture de base de donnés
 **/
function insertFacture() {

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost/http_getInsertFacture?factDate='+form1.dateFact.value
                                                                             + '&cltId='+ form1.numClt.value);
xhr.onload = function () {
xhr.responseText;
}
xhr.send();
alert(" Merci pour votre achat  et à la prochaine ");
}

/**
 * @Description Fonction permettant l'insertion d'une commande dans la base de donnée
 **/

function insertCommande() {
    let idVelo = prodCle;
    let qteAchetee = qteProd;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/http_getInsertCommande?veloId='+ idVelo
                                                                                + '&FactNum='+ form1.loadNumber.value
                                                                                + '&qte='+ qteAchetee
                                                                                +'&dateCmde='+ form1.dateFact.value);
    xhr.onload = function () {
    xhr.responseText;
    }
    xhr.send();
}

/**
    * @Description Teste l'égalité entre la date du jour et celle entrée

 */
function testDate() {

    let today = new Date();

    let today_formatted = today.getFullYear()  + (today.getMonth() + 1) + today.getDate();

    let d1 = document.getElementById("dateFact").value;
    console.log(today_formatted);

    let som_d1Year = d1[0]+d1[1]+d1[2]+d1[3];
    console.log(som_d1Year);

    let som_d1Month = d1[5]+d1[6];
    console.log(som_d1Month);

    let som_d1Day = d1[8]+d1[9];
    console.log(som_d1Day);

    let dateInput = Number(som_d1Year) + Number(som_d1Month) + Number(som_d1Day);
    console.log(dateInput);

    if(dateInput !=today_formatted){
        return false;
    }

}
/**
    *@Description

 */
function payer() {
    if (testDate() == false){
        alert("Date incorrette");
    }
    else{
        insertFacture();
        MajStock();
    }
    insertCommande();
    window.location.href="page?url=accueil";
}