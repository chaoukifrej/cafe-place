//formulaire
const INPUTS = document.getElementsByClassName("inputs"); //sauf select & degré
const INOM = document.getElementById("nom");
const IQUANTITE = document.getElementById("quantite");
const IPRIXACHAT = document.getElementById("prixAchatHT");
const IPRIXVENTE = document.getElementById("prixVenteHT");
const ITYPE = document.getElementById("typeProduit");
const IDEGRE = document.getElementById("degreAlcool");
const DIVDEGRE = document.getElementById("inputDegre");
const BTNAJOUT = document.getElementById("btnAjout");
const ERRORDIV = document.getElementById("popup");

//Barre du container produits
const IRECHERCHER = document.getElementById("rechercher");
const TYPEPROD = document.getElementById("typeProd");

//container produit
const STOCKS = document.getElementById("produits");

//tableau des produits et Local Storage
let produitList = localStorage.getItem("produits")
  ? JSON.parse(localStorage.getItem("produits"))
  : [];

localStorage.setItem("produits", JSON.stringify(produitList));
//-------------
