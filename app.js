//Listener sur select du type de boisson (hide input degré)
ITYPE.addEventListener("change", function () {
  if (ITYPE.value == "boissonHard") {
    DIVDEGRE.classList.remove("displayNone");
  } else {
    DIVDEGRE.classList.add("displayNone");
  }
});

//Listener bouton ajout de produit
BTNAJOUT.addEventListener("click", CREATIONPRODUIT);

//LOCAL STORAGE REPRISE
let newProduitsList = [];
produitList.forEach((produit) => {
  if (produit.type == "Boisson Soft") {
    produit = new BoissonSoft(
      produit.nom,
      produit.quantite,
      produit.prixAchatHT,
      produit.prixVenteHT
    );
    newProduitsList.push(produit);
  } else if (produit.type == "Boisson Alcoolisée") {
    produit = new BoissonHard(
      produit.nom,
      produit.quantite,
      produit.prixAchatHT,
      produit.prixVenteHT,
      produit.degre
    );
    newProduitsList.push(produit);
  } else {
    produit = new BoissonAutres(
      produit.nom,
      produit.quantite,
      produit.prixAchatHT,
      produit.prixVenteHT
    );
    newProduitsList.push(produit);
  }
});
newProduitsList.sort(function (a, b) {
  return a.id - b.id;
});
produitList = newProduitsList;
AFFICHE();
