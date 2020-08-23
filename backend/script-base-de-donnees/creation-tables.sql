/* Table facture enregistre les factures*/

CREATE TABLE FACTURE( NumFacture INTEGER NOT NULL DEFAULT AUTOINCREMENT PRIMARY KEY, //Identifiant de la table; autoincrémentée

DateFacture DATE, //Date d'émission de la facture

Idclient INTEGER, // Clée étrangère venant de la table Client

FOREIGN KEY (Idclient) REFERENCES CLIENT ON DELETE SET NULL

)

/* table client: Enregistre les nouveaux clients*/

CREATE TABLE CLIENT( Idclient INTEGER NOT NULL DEFAULT AUTOINCREMENT PRIMARY KEY, //Identifiant de la table; autoincrémentée

NomClient CHAR(50)NOT NULL, //Nom du client

PrenomClient CHAR(50)NOT NULL,//Prénom du client

SexeClient DSexe, // Sexe du client

AdresseClient CHAR(50)NOT NULL, //Adresse du client

VilleClient CHAR(30)NOT NULL, //Ville du client

CodePostalClient INTEGER NOT NULL , //Code postal du client

PaysClient CHAR(50) NOT NULL, //Pays du client

AdresseLivraisonClient CHAR(50), //Adresse du client

MailClient CHAR(50)NOT NULL, //Mail du client

MotDePasseClient CHAR(60), //Mot de passe du client

MotDePasseConfirmationClient CHAR(60), //Confirmation du mot de passe du client

TelephoneClient INTEGER, //Téléphone du client

DateNaissanceClient DATE, //Date naissance du client

)

/table vélo/

CREATE TABLE VELO(

IdVelo CHAR(10) PRIMARY KEY, //Identifiant de la table

NomVelo CHAR(50), //Nom du vélo

Caractéristiques1 LONG VARCHAR, // Caracteristique

DescriptionVelo LONG VARCHAR, //Description

Specificite LONG VARCHAR, //Spécificité

PrixVelo DECIMAL, //Prix

StockVelo INTEGER NOT NULL, //Stock

Caractéristiques1 LONG VARCHAR, // Caracteristique

)

CREATE TABLE COMMANDE(

IdVelo CHAR (10), //Identifiant de la table venant de la table Velo

NumFacture INTEGER, //Identifiant de la table venant de la table Facture

quantite INTEGER, //Quantité achetée

dateAchat DATE, //Date d'achat

PRIMARY KEY (IdVelo,NumFacture),

FOREIGN KEY (IdVelo) REFERENCES VELO (IdVelo), FOREIGN KEY (NumFacture) REFERENCES FACTURE(NumFacture)

)
