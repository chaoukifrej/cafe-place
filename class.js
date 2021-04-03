class Boisson {
  constructor(n, q, pa, pv) {
    this.nom = n;
    this.quantite = parseInt(q);
    this.prixAchatHT = Number(pa);
    this.prixVenteHT = Number(pv);
    this.id = n + Date.now();
    this.marge = pv - pa;
    this.prixVenteTTC = pv * 1.2;
    this.qrCodeOption = {
      text: this.id,
      width: 36,
      height: 36,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    };
  }

  incQuantite() {
    if (this.quantite >= 0) {
      this.quantite++;
    }
  }
  decQuantite() {
    if (this.quantite > 0) {
      this.quantite--;
    }
  }
}

class BoissonSoft extends Boisson {
  constructor(n, q, pa, pv) {
    super(n, q, pa, pv);
    this.type = "Boisson Soft";
  }
}

class BoissonHard extends Boisson {
  constructor(n, q, pa, pv, d) {
    super(n, q, pa, pv);
    this.degre = parseFloat(d);
    this.type = "Boisson Alcoolisée";
  }
}

class BoissonAutres extends Boisson {
  constructor(n, q, pa, pv) {
    super(n, q, pa, pv);
    this.type = "Autres";
  }
}
