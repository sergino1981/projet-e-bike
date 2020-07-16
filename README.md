# projet e bike
Etudiant : KOUVAHE folly Serge

Classe : 1TM1

**Description du projet :**

 Mon projet a pour but :
 
 
•	L’achat de vélo électrique en ligne grâce à une page web sur laquelle on peut choisir le vélo désiré.


•	La connexion à son compte si on est déjà client ou la création d’un nouveau compte si ce n’est pas le cas ; tout cela via un formulaire


•	Le panier d’achat  reprenant les détails de la commande (les ou le vélo et la quantité choisie.



**Aspects implémentés :**


Backend : Une base de données permettant d’enregistrer les nouveaux clients, les commandes.


Backend :Un serveur web capable de fournir les pages html, js, css, ainsi que des webservices.


frontend : Une page web (html, js, css) permettant d'appeler les webservices et de traiter les réponses, qui propose une interface utilisateur pour:

-Commandes via le panier 

-connexion à son compte 

-création d’un compte client 

-La navigation entre les différentes pages du site (Accueil, Vélo, Administration, Contact...)



**Détail api rest:**



**Détails de la DB(Diagramme, Tables et champs)**


<img src="frontend/img/diagramme">

**Création des tables**


/* Table facture enregistre les factures*/


CREATE TABLE FACTURE(
NumFacture INTEGER NOT NULL DEFAULT AUTOINCREMENT  PRIMARY KEY, //Identifiant de la table; autoincrémentée


DateFacture DATE //Date d'émission de la facture
)

/* table client: Enregistre les nouveaux clients*/

CREATE TABLE CLIENT(
Idclient INTEGER NOT NULL DEFAULT  AUTOINCREMENT PRIMARY KEY, //Identifiant de la table; autoincrémentée


NomClient CHAR(50)NOT NULL, //Nom du client


PrenomClient CHAR(50)NOT NULL,//Prénom du client


SexeClient DSexe, // Sexe du client


AdresseClient CHAR(50)NOT NULL, //Adresse du client


CodePostalClient INTEGER NOT NULL , //Code postal du client


VilleClient CHAR(30)NOT NULL, //Ville du client


PaysClient CHAR(50) NOT NULL, //Pays du client


AdresseLivraisonClient CHAR(50), //Adresse du client


MailClient CHAR(50)NOT NULL, //Mail du client


MotDePasseClient CHAR(60), //Mot de passe du client

MotDePasseConfirmationClient CHAR(60), //Confirmation du mot de passe du client


TelephoneClient INTEGER, //Téléphone du client


DateNaissanceClient DATE, //Date naissance du client



)


/*table vélo*/


CREATE TABLE VELO(


IdVelo CHAR(10) PRIMARY KEY, //Identifiant de la table


NomVelo CHAR(50), //Nom du vélo


Caractéristiques LONG VARCHAR, // Caracteristique


DescriptionVelo LONG VARCHAR, //Description


Specificite LONG VARCHAR, //Spécificité


PrixVelo DECIMAL, //Prix


StockVelo INTEGER NOT NULL, //Stock


)




CREATE TABLE COMMANDE(


IdVelo CHAR (10), //Identifiant de la table venant de la table Velo


NumFacture INTEGER, //Identifiant de la table venant de la table Facture


quantite INTEGER, //Quantité achetée


dateAchat DATE, //Date d'achat


PRIMARY KEY (IdVelo,NumFacture),


FOREIGN KEY (IdVelo) REFERENCES  VELO (IdVelo),
FOREIGN KEY (NumFacture) REFERENCES  FACTURE(NumFacture)


)
