class Boulangerie {
    nom;employes;produits;
    prixRevient;prixVente;
    constructor(nom) {
        this.nom=nom;
        this.employes = [];
        this.produits = [];
        this.prixRevient=0;
        this.prixVente=0;
        console.log(nom+' est une boulangerie');
    }
    ajouterEmploye(employe){
        this.employes.push(employe);
        console.log(this.nom+" embauche "+employe.nom);
    }
    ajouterProduit(produit){
        this.produits.push(produit);
    }
    bilan(){
        console.log("BILAN");
        this.employes.forEach(element => {
            var i=0
            var totalf=0;
            for (const key in element.fabrique) {
                if (Object.hasOwnProperty.call(element.fabrique, key)) {
                    const e = element.fabrique[key];
                    e.forEach((item)=>{
                        if(i===0){
                            console.log("Fabrication de "+element.nom+" : ");
                        }
                        i++;
                        var x = (item.quantité*item.produit.prixRevient);
                        this.prixRevient += x;
                        totalf += x;
                        console.log(item.quantité+" "+item.produit.nom+" * " + item.produit.prixRevient +" = "+x);
                    })
                }
            }
            if (totalf) {
                console.log("Total : "+totalf);  
            }
            var j=0
            var totalv=0;
            for (const key in element.vend) {
                if (Object.hasOwnProperty.call(element.vend, key)) {
                    const e = element.vend[key];
                    if(j===0){
                        console.log("Vente de "+element.nom+" : ");
                    }
                    j++;
                    var x = (e.quantité*e.produit.prixVente);
                    this.prixVente += x;
                    totalv += x;
                    console.log(e.quantité+" "+e.produit.nom+" * " + e.produit.prixVente +" = "+x);
                }
            }
            if (totalv) {
                console.log("Total : "+totalv);  
            }
        });
        console.log("Totaux :");
        console.log("Fabrications = "+this.prixRevient);
        console.log("Ventes = "+this.prixVente);
        console.log("Résultat = "+this.calculerProfit());
    }
    calculerProfit() {
        return (this.prixVente - this.prixRevient).toFixed(2);
    }
}

class Employe {
    nom;role;fabrique;vend;
    constructor(nom, role) {
        this.nom = nom;
        this.role = [];
        this.vend = [];
        this.fabrique = [];
        this.fabrique[role] = [];
        this.role.push(role);
        console.log(nom + " est un(e) "+role);
    }
    ajouterRole(role){
        this.role.push(role);
        this.fabrique[role] = [];
        console.log(this.nom + " est aussi un(e) "+role);
    }
    fabriquerProduit(produit,quantité,role){
        this.fabrique[role].push(new Action(produit,quantité));
        console.log(this.nom+" fabrique "+quantité+" "+ produit.nom);
    }
    vendreProduit(produit,quantité){
        this.vend.push(new Action(produit,quantité));
        console.log(this.nom+" vend "+quantité+" "+ produit.nom);
    }
    getAction(){
        for (const key in this.fabrique) {
            if (Object.hasOwnProperty.call(this.fabrique, key)) {
                const element = this.fabrique[key];
                element.forEach((item)=>{
                    console.log('En '+key+" "+this.nom+ " fabrique "+item.quantité+" "+item.produit.nom+"(s)" );
                })
            }
        }
        for (const key in this.vend) {
            if (Object.hasOwnProperty.call(this.vend, key)) {
                const element = this.vend[key];
                console.log(this.nom+ " vend "+element.quantité+" "+element.produit.nom+"(s)" );
            }
        }
    }
}

class Produit {
    nom; prixRevient; prixVente;description;
    constructor(nom, prixRevient, prixVente) {
        this.nom = nom;
        this.prixRevient = prixRevient;
        this.prixVente = prixVente;
        console.log(nom+" est un produit ("+prixRevient+"/"+prixVente+")");
    }
    ajouterDescription(description){
        this.description=description;
        console.log(this.nom+" est précisément un(e) "+description);
    }

    calculerProfitParUnité() {
        return (this.prixVente - this.prixRevient).toFixed(2);
    }
}
class Action{
    produit;quantité;
    constructor(produit,quantité){
       this.produit = produit;
       this.quantité = quantité;
    }
}
// boul=new Boulangerie("La Grande Boulangerie");
// bernard=new Employe("Bernard","boulanger");
// paul=new Employe("Paul","boulanger");
// violaine=new Employe("Violaine","vendeuse");
// virginie=new Employe("Virginie","vendeuse");
// paul.ajouterRole("pâtissier");
// baguette=new Produit("baguette",0.1,1.2);
// croissant=new Produit("croissant",0.15,1.5);
// pain=new Produit("pain de mie",0.4,4.5);
// charlotte=new Produit("charlotte",4,40);
// charlotte.ajouterDescription("pâtisserie au beurre")
// boul.ajouterEmploye(bernard);
// boul.ajouterEmploye(paul);
// boul.ajouterEmploye(violaine);
// boul.ajouterEmploye(virginie);

// boul.ajouterProduit(baguette);
// boul.ajouterProduit(croissant);
// boul.ajouterProduit(pain);
// boul.ajouterProduit(charlotte);


// bernard.fabriquerProduit(baguette,80,"boulanger");
// bernard.fabriquerProduit(croissant,60,"boulanger");
// violaine.vendreProduit(croissant,60);
// boul.bilan();
/*
UML
+-------------------+        +-------------------+       +-----------------+
|    Boulangerie    |        |      Employe      |       |     Produit     |
+-------------------+        +-------------------+       +-----------------+
| - nom: String      |       | - nom: String     |       | - nom: String   |
| - employes: Array  |       | - role: Array     |       | - prixRevient:  |
| - produits: Array  |       | - fabrique: Object|       |     Float       |
| - prixRevient:Float|       | - vend: Array     |       | - prixVente:    |
| - prixVente:Float  |       |                   |       |     Float       |
+-------------------+       +-------------------+       +-----------------+
| + ajouterEmploye()|       | + ajouterRole()   |       | + ajouterDescri- |
| + ajouterProduit()|       | + fabriquerProduit()|     |   ption()        |
| + bilan()         |       | + vendreProduit() |       | + calculerProfit-|
| + calculerProfit()|       | + getAction()     |       |   ParUnite()     |
+-------------------+       +-------------------+       +-----------------+

                      +---------------------+
                      |       Action        |
                      +---------------------+
                      | - produit: Produit  |
                      | - quantité: Integer |
                      +---------------------+
*/
function f(n) {
    return f(n-1);
  }
  console.log(f(3));