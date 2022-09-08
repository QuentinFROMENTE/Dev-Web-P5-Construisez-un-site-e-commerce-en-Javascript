/*Fonction de création des nouveaux noeuds*/
function CreateCardForProducts(products) {
    for (var i in products) {

        /*Création de l'architecture des cartes*/
        var link = document.createElement('a');
        var presentation = document.createElement('article');
        var picture = document.createElement('img');
        var nameKanap = document.createElement('h3');
        var descriptionKanap = document.createElement('p');

        /*Création de l'URL de produit*/
        let productsURL = `./product.html?id=${products[i]._id}`;

        /*Affectation des classes, attributs et des textes aux différents enfants des cartes*/
        link.setAttribute('href', productsURL);
        picture.setAttribute('src', products[i].imageUrl);
        picture.setAttribute('alt', products[i].altTxt);
        nameKanap.classList.add('productName');
        nameKanap.innerHTML= products[i].name;
        descriptionKanap.classList.add('productDescription');
        descriptionKanap.innerHTML = products[i].description;

        /*Ajout des enfants créés au noeu parent "carte"*/
        presentation.appendChild(picture);
        presentation.appendChild(nameKanap);
        presentation.appendChild(descriptionKanap);
        link.appendChild(presentation);
        
        /*Ajout des "carte" créé et noeu final "elt"*/
        elt.appendChild(link);
}};

/*Récupération du noeuds de deémonstration pour supression*/
var elt = document.getElementById('items');
const defaultCard = document.querySelector('#items > a');
elt.removeChild(defaultCard);

/*Appel API par fetch pour récupérer les informations du catalogues*/
fetch('http://localhost:3000/api/products')
    .then(function(res){
        return res.json();
    })
    .then(function(products){
        CreateCardForProducts(products);
    })
    .catch(function(err){
        console.log(err);
        alert("Erreur liaison API");
    });

/*Création du panier client si première visite*/
if (!sessionStorage.getItem('customerBasket')) {
    sessionStorage.setItem('customerBasket','');
}