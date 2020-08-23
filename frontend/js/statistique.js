"use strict";

function validate() {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/http_getStatistique?specificite='+formSpecificite.choixSpecificite.value
        +'&date1='+formSpecificite.date1.value
        + '&date2='+formSpecificite.date2.value,true);
    xhr.onload = function () {
        affichage(JSON.parse(xhr.responseText));
    }
    xhr.send();
    console.log(formSpecificite.choixSpecificite.value);
}

function affichage(data) {
    let str;
    console.log(data);
    if(data.length==0){
    document.getElementById(' tableau').innerHTML ="Aucune recherche correspondante"
    }else{
        for(let d in data){
            str= "";
            str += "<tr>";
            str += "<th>" + data[d].nbre + "</th>";
            str += "<th>" + data[d].nameBicycle + "</th>";
            str += "<th>" + data[d].price +"</th>";
            str += "<th>" + data[d].buyDate+" </th>";
            str += "</tr>";
            document.getElementById('corps').innerHTML = str;
        }
        str +="</table>";
    }
    document.getElementById('table').style.display ='block';
}

function test() {
    let d1 = Date.parse(document.getElementById(" date1").value);
    let d2 = Date.parse(document.getElementById("date2").value) ;
        if(d2 <d1){
            alert("La date de sortie ne peut être supérieure à la date de début recherche");
        }

}

