/* Verif Nombre */
const verifNombre = function (nb) {
  nb = Number(nb);
  if (Number(nb) && nb > 0) {
    return true;
  } else {
    return false;
  }
};

/* Verification des Inputs avant creation produit */
ERRORDIV.classList.add("displayNone");
const INPUTVERIF = function () {
  let inputVerif = false;
  let elemVerif = false;
  //Input nom
  if (INOM.value == "") {
    INOM.style.border = "3px solid red";
    elemVerif = false;
  } else {
    INOM.style.border = "3px solid green";
    elemVerif = true;
  }
  //Input quantite
  if (elemVerif == true) {
    if (IQUANTITE.value == "" || verifNombre(IQUANTITE.value) != true) {
      IQUANTITE.style.border = "3px solid red";
      elemVerif = false;
    } else {
      IQUANTITE.style.border = "3px solid green";
      elemVerif = true;
    }
  }
  //Input prix d'achat
  if (elemVerif == true) {
    if (IPRIXACHAT.value == "" || verifNombre(IPRIXACHAT.value) != true) {
      IPRIXACHAT.style.border = "3px solid red";
      elemVerif = false;
    } else {
      IPRIXACHAT.style.border = "3px solid green";
      elemVerif = true;
    }
  }
  //Input prix de vente
  if (elemVerif == true) {
    if (IPRIXVENTE.value == "" || verifNombre(IPRIXVENTE.value) != true) {
      IPRIXVENTE.style.border = "3px solid red";
      elemVerif = false;
    } else {
      IPRIXVENTE.style.border = "3px solid green";
      elemVerif = true;
    }
  }

  //verif degré alcool
  if (ITYPE.value == "boissonHard" && elemVerif == true) {
    if (
      IDEGRE.value == "" ||
      verifNombre(IDEGRE.value) != true ||
      IDEGRE.value > 100
    ) {
      IDEGRE.style.border = "3px solid red";
      elemVerif = false;
    } else {
      IDEGRE.style.border = "3px solid green";
      elemVerif = true;
    }
  }

  //Return Boolean
  if (elemVerif == true) {
    if (!ERRORDIV.classList.contains("displayNone")) {
      ERRORDIV.classList.add("displayNone");
    }
    inputVerif = true;
    return inputVerif;
  } else {
    inputVerif = false;
    return inputVerif;
  }
};

/* Creation du produit et ajout au tableau */
const CREATIONPRODUIT = function () {
  if (INPUTVERIF() == true) {
    if (ITYPE.value == "boissonSoft") {
      let produit = new BoissonSoft(
        INOM.value,
        IQUANTITE.value,
        IPRIXACHAT.value,
        IPRIXVENTE.value
      );
      produitList.push(produit);
      save();
    } else if (ITYPE.value == "boissonHard") {
      let produit = new BoissonHard(
        INOM.value,
        IQUANTITE.value,
        IPRIXACHAT.value,
        IPRIXVENTE.value,
        IDEGRE.value
      );
      produitList.push(produit);
      save();
    } else {
      let produit = new BoissonAutres(
        INOM.value,
        IQUANTITE.value,
        IPRIXACHAT.value,
        IPRIXVENTE.value
      );
      produitList.push(produit);
      save();
    }
    INOM.value = "";
    IQUANTITE.value = "";
    IPRIXACHAT.value = "";
    IPRIXVENTE.value = "";
    IDEGRE.value = "";
    INOM.style.border = "unset";
    IQUANTITE.style.border = "unset";
    IPRIXACHAT.style.border = "unset";
    IPRIXVENTE.style.border = "unset";
    IDEGRE.style.border = "unset";
  } else {
    //INPUTVERIF();
  }
  INOM.select();
  AFFICHE();
};

/* Fonction Affichage des produits */
const AFFICHE = function () {
  STOCKS.innerText = "";
  for (const elem of produitList) {
    //creation DOM produit
    let div = document.createElement("div");
    let pCheckbox = document.createElement("input");
    let pNom = document.createElement("p");
    let pQuantite = document.createElement("p");
    let pBtn = document.createElement("p");
    let bHQ = document.createElement("button");
    let bLQ = document.createElement("button");
    let pAchatHT = document.createElement("p");
    let pMarge = document.createElement("p");
    let pVenteHT = document.createElement("p");
    let pVenteTTC = document.createElement("p");
    let pType = document.createElement("p");
    let QrCode = document.createElement("p");
    let pBtnEnd = document.createElement("p");
    let btnModif = document.createElement("button");
    let btnSuppr = document.createElement("button");

    //remplissage des elements crées
    pCheckbox.type = "checkbox";
    pNom.innerHTML = elem.nom;
    pQuantite.innerHTML = elem.quantite;
    bHQ.innerText = "+";
    bLQ.innerText = "-";
    pAchatHT.innerHTML = `${elem.prixAchatHT.toFixed(2)} €`;
    pMarge.innerHTML = `${elem.marge.toFixed(2)} €`;
    pVenteHT.innerHTML = `${elem.prixVenteHT.toFixed(2)} €`;
    pVenteTTC.innerHTML = `${elem.prixVenteTTC.toFixed(2)} €`;

    if (elem instanceof BoissonHard) {
      pType.innerHTML = `${elem.type} <span>(${elem.degre}°)</span>`;
    } else {
      pType.innerHTML = elem.type;
    }
    btnModif.innerText = "Modifier";
    btnSuppr.innerText = "Supprimer";
    pBtnEnd.classList.add("btnEnd");

    //QRCODE
    let qrcode = new QRCode(QrCode, {
      text: elem.nom,
      width: 55,
      height: 55,
      colorDark: "#333333",
      colorLight: "#f5f5f5",
      correctLevel: QRCode.CorrectLevel.H,
    });

    //insertion dans une div global
    div.appendChild(pCheckbox);
    div.appendChild(pNom);
    div.appendChild(pQuantite);
    pBtn.appendChild(bHQ);
    bHQ.style.color = "rgba(6, 138, 6, 0.6)";
    bHQ.style.border = "1px solid rgb(228, 228, 228)";
    bHQ.style.fontWeight = "bold";
    bLQ.style.color = "rgba(207, 15, 15, 0.6)";
    bLQ.style.border = "1px solid rgb(228, 228, 228)";
    bLQ.style.fontWeight = "bold";
    pBtn.appendChild(bLQ);
    div.appendChild(pBtn);
    div.appendChild(pAchatHT);
    div.appendChild(pMarge);
    div.appendChild(pVenteHT);
    div.appendChild(pVenteTTC);
    div.appendChild(pType);
    div.appendChild(QrCode);
    pBtnEnd.appendChild(btnModif);
    btnModif.style.backgroundColor = "rgb(74, 74, 223)";
    btnSuppr.style.backgroundColor = "rgb(207, 15, 15)";
    pBtnEnd.appendChild(btnSuppr);
    div.appendChild(pBtnEnd);
    pBtnEnd.classList.add("displayNone");

    //insertion dans le DOM
    STOCKS.insertAdjacentElement("afterbegin", div);

    /*Gestion du produit en live*/

    //Listener btn incrementation quantité
    bHQ.addEventListener("click", function (e) {
      bLQ.classList.remove("displayNone");
      erase.replaceWith(pQuantite);
      elem.incQuantite();
      pQuantite.innerHTML = elem.quantite;
      couleurQuantité();
      save();
    });
    //Listener btn decrementation quantité
    let erase = document.createElement("button");
    erase.classList.add("eraseBtn");
    bLQ.addEventListener("click", function () {
      elem.decQuantite();
      pQuantite.innerHTML = elem.quantite;
      couleurQuantité();
      if (elem.quantite === 0) {
        erase.innerText = "Supprimer";
        pQuantite.replaceWith(erase);
        bLQ.classList.add("displayNone");
        erase.addEventListener("click", function () {
          supprProduit(elem);
          AFFICHE();
        });
      }
      save();
    });

    //Listener fonction rechercher
    IRECHERCHER.addEventListener("keyup", function () {
      TYPEPROD.value = "all";

      let input = IRECHERCHER.value;
      if (IRECHERCHER.value != "") {
        const RESULT = produitList.filter(
          (product) =>
            !product.nom.toLocaleLowerCase().includes(input.toLocaleLowerCase())
        );
        for (const product of RESULT) {
          if (product.id === elem.id) {
            div.classList.add("displayNone");
          }
        }
      } else {
        div.classList.remove("displayNone");
      }
    });

    //Listener sur SELECT type de produit a affiché
    TYPEPROD.addEventListener("click", function () {
      if (TYPEPROD.value == "all") {
        div.classList.remove("displayNone");
      } else if (TYPEPROD.value == "boissonSoft") {
        if (elem instanceof BoissonSoft) {
          div.classList.remove("displayNone");
        }
        if (elem instanceof BoissonHard) {
          div.classList.add("displayNone");
        }
        if (elem instanceof BoissonAutres) {
          div.classList.add("displayNone");
        }
      } else if (TYPEPROD.value == "boissonHard") {
        if (elem instanceof BoissonHard) {
          div.classList.remove("displayNone");
        }
        if (elem instanceof BoissonSoft) {
          div.classList.add("displayNone");
        }
        if (elem instanceof BoissonAutres) {
          div.classList.add("displayNone");
        }
      } else {
        if (elem instanceof BoissonAutres) {
          div.classList.remove("displayNone");
        }
        if (elem instanceof BoissonSoft) {
          div.classList.add("displayNone");
        }
        if (elem instanceof BoissonHard) {
          div.classList.add("displayNone");
        }
      }
    });

    //Listener CHECKBOX
    pCheckbox.addEventListener("click", function () {
      pBtnEnd.classList.toggle("displayNone");
      QrCode.classList.toggle("displayNone");
    });

    //Listener BOUTON supprimer
    btnSuppr.addEventListener("click", function () {
      if (!btnSuppr.classList.contains("displayNone")) {
        btnSuppr.remove();
      }
      supprProduit(elem);
      AFFICHE();
    });

    //MODIFIER LE PRODUIT
    btnModif.addEventListener("click", function () {
      div.classList.add("modification");
      pCheckbox.classList.add("displayNone");
      pNom.classList.add("displayNone");
      pQuantite.classList.add("displayNone");
      pMarge.classList.add("displayNone");
      pAchatHT.classList.add("displayNone");
      pVenteHT.classList.add("displayNone");
      pVenteTTC.classList.add("displayNone");
      QrCode.classList.add("displayNone");
      pBtn.classList.add("displayNone");
      pBtnEnd.classList.add("displayNone");
      //Nom
      let iDivNom = document.createElement("div");
      let ipNom = document.createElement("label");
      let iNom = document.createElement("input");

      iDivNom.appendChild(ipNom);
      iDivNom.appendChild(iNom);
      div.appendChild(iDivNom);

      ipNom.innerText = "Nom";
      iNom.value = elem.nom;
      iNom.select();
      //Quantité
      let iDivQuantite = document.createElement("div");
      let ipQuantite = document.createElement("label");
      let iQuantite = document.createElement("input");

      iDivQuantite.appendChild(ipQuantite);
      iDivQuantite.appendChild(iQuantite);
      div.appendChild(iDivQuantite);

      ipQuantite.innerText = "Quantité";
      iQuantite.type = "number";
      iQuantite.step = "1";
      iQuantite.min = "1";
      iQuantite.value = elem.quantite;
      //Prix Achat HT
      let iDivAchatHT = document.createElement("div");
      let ipAchatHT = document.createElement("label");
      let iAchatHT = document.createElement("input");

      iDivAchatHT.appendChild(ipAchatHT);
      iDivAchatHT.appendChild(iAchatHT);
      div.appendChild(iDivAchatHT);

      ipAchatHT.innerText = "Prix d'achat HT";
      iAchatHT.type = "number";
      iAchatHT.min = "0";
      iAchatHT.step = "0.01";
      iAchatHT.value = elem.prixAchatHT;
      //Prix Vente HT
      let iDivVenteHT = document.createElement("div");
      let ipVenteHT = document.createElement("label");
      let iVenteHT = document.createElement("input");

      iDivVenteHT.appendChild(ipVenteHT);
      iDivVenteHT.appendChild(iVenteHT);
      div.appendChild(iDivVenteHT);

      ipVenteHT.innerText = "Prix de vente HT";
      iVenteHT.type = "number";
      iVenteHT.min = "0";
      iVenteHTstep = "0.01";
      iVenteHT.value = elem.prixVenteHT;

      //degre si alcool
      let iDivDegre = document.createElement("div");
      let ipDegre = document.createElement("label");
      let iDegre = document.createElement("input");
      if (elem instanceof BoissonHard) {
        pType.classList.add("displayNone");

        iDivDegre.appendChild(ipDegre);
        iDivDegre.appendChild(iDegre);
        div.appendChild(iDivDegre);

        ipDegre.innerText = "Degré d'alcool";
        iDegre.value = elem.degre;
      }
      //btn Validation modif
      let iBtn = document.createElement("button");
      div.appendChild(iBtn);

      iBtn.innerText = "Valider modification";

      //Verification des Inputs avant MODIFICATION produit
      const IVERIF = function () {
        let iVerif = false;
        let eVerif = false;
        //Input nom
        if (iNom.value == "") {
          iNom.style.border = "3px solid red";
          eVerif = false;
        } else {
          iNom.style.border = "3px solid green";
          eVerif = true;
        }
        //Input quantite
        if (eVerif == true) {
          if (iQuantite.value == "" || verifNombre(iQuantite.value) != true) {
            iQuantite.style.border = "3px solid red";
            eVerif = false;
          } else {
            iQuantite.style.border = "3px solid green";
            eVerif = true;
          }
        }
        //Input prix d'achat
        if (eVerif == true) {
          if (iAchatHT.value == "" || verifNombre(iAchatHT.value) != true) {
            iAchatHT.style.border = "3px solid red";
            eVerif = false;
          } else {
            iAchatHT.style.border = "3px solid green";
            eVerif = true;
          }
        }
        //Input prix de vente
        if (eVerif == true) {
          if (iVenteHT.value == "" || verifNombre(iVenteHT.value) != true) {
            iVenteHT.style.border = "3px solid red";
            eVerif = false;
          } else {
            iVenteHT.style.border = "3px solid green";
            eVerif = true;
          }
        }

        //verif degré alcool
        if (ITYPE.value == "boissonHard" && eVerif == true) {
          if (
            iDegre.value == "" ||
            verifNombre(iDegre.value) != true ||
            iDegre.value > 100
          ) {
            iDegre.style.border = "1px solid red";
            eVerif = false;
          } else {
            iDegre.style.border = "1px solid green";
            eVerif = true;
          }
        }

        //Return Boolean
        if (eVerif == true) {
          iVerif = true;
          return iVerif;
        } else {
          iVerif = false;
          return iVerif;
        }
      };

      //Validation des modification
      iBtn.addEventListener("click", function () {
        if (IVERIF() == true) {
          elem.nom = iNom.value;
          elem.quantite = parseInt(iQuantite.value);
          elem.prixAchatHT = Number(iAchatHT.value);
          elem.prixVenteHT = Number(iVenteHT.value);
          elem.marge = elem.prixVenteHT - elem.prixAchatHT;
          elem.prixVenteTTC = elem.prixVenteHT * 1.2;
          if (elem instanceof BoissonHard) {
            elem.degre = iDegre.value;
          }
          AFFICHE();
        } else {
          IVERIF();
        }
      });
    });
    //fonction couleur Quantité
    function couleurQuantité() {
      if (elem.quantite < 5) {
        pQuantite.style.color = "rgb(207, 15, 15)";
        div.style.borderLeft = "5px solid rgb(207, 15, 15)";
        //div.style.borderRight = "5px solid rgb(207, 15, 15)";
      } else if (elem.quantite < 10) {
        pQuantite.style.color = "rgb(233, 155, 12)";
        div.style.borderLeft = "5px solid transparent";
        //div.style.borderRight = "5px solid rgb(233, 155, 12)";
      } else {
        pQuantite.style.color = "rgb(6, 138, 6)";
        div.style.borderLeft = "5px solid transparent";
        //div.style.borderRight = "5px solid rgb(6, 138, 6)";
      }
    }
    couleurQuantité();
  }
  save();
};

/* fonction supprimer */
function supprProduit(elem) {
  let index = produitList.findIndex(function (produit) {
    return produit.id === elem.id;
  });
  produitList.splice(index, 1);
}

/* fonction de sauvegarde */
function save() {
  localStorage.setItem("produits", JSON.stringify(produitList));
}
