/*Création de la fonction de modification du DOM produit*/
function DOMProductModifier (currentProduct){
    /*Récupération des DOM à modifier*/
    var imageDOM = document.querySelector('div.item__img img');
    var titleDOM = document.getElementById('title');
    var priceDOM = document.getElementById('price');
    var descriptionDOM = document.getElementById('description');
    var colorsDOM = document.getElementById('color-select');

    /*Changement des données HTML par les données produits serveur*/
    imageDOM.removeAttribute('src');
    imageDOM.removeAttribute('alt');
    imageDOM.setAttribute('src', currentProduct.imageUrl);
    imageDOM.setAttribute('alt', currentProduct.altTxt);
    titleDOM.innerHTML = currentProduct.name;
    priceDOM.innerHTML = currentProduct.price;
    descriptionDOM.innerHTML = currentProduct.description;
    colorsDOM.remove(1);
    colorsDOM.remove(1);
    for (let i in currentProduct.colors) {
        let child = document.createElement('option');
        child.setAttribute('value', currentProduct.colors[i]);
        child.innerHTML = currentProduct.colors[i];
        colorsDOM.appendChild(child);
    };
};

/*Création de la fonction de récupération de la commande et d'injection dans le panier client*/
function AddToBasket(currentProduct, customerBasket) {
    class order {
        constructor (id, color, quantity) {
            this.IdC = `${id}+${color}`;
            this.id = id;
            this.color = color;
            this.quantity = quantity;
    }};
    var buttonAddToCart = document.getElementById('addToCart');
    buttonAddToCart.addEventListener('click', function () {
        var selectColor = document.getElementById("color-select").value;
        var quantity = document.getElementById("itemQuantity").value;
        let newOrder = new order (currentProduct._id, selectColor, quantity);
        let flag = 0;
        if (customerBasket.length > 0) {
            for (var b in customerBasket) {
                if (customerBasket[b].IdC == newOrder.IdC) {
                    customerBasket[b].quantity = parseInt(newOrder.quantity) + parseInt(customerBasket[b].quantity);
                    flag = 1;
                }
        }}
        if (flag == 0) {
            customerBasket.push(newOrder);
        }
        sessionStorage.removeItem('customerBasket');
        sessionStorage.setItem('customerBasket', JSON.stringify(customerBasket));
    })};

/*Récupération du panier client et lecture si existant*/
try {
    let localBasket = sessionStorage.getItem('customerBasket');
    var customerBasket = JSON.parse(localBasket);
}
catch {
    console.log(sessionStorage.getItem('customerBasket'));
    console.log('JSON.parse() non exécutable')
    var customerBasket = [];
};

/*Récupération de l'ID du procduit et appel de l'API sur ce produit précisemment*/
var url = new URL (window.location.href);
var productId = url.searchParams.get("id");
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function(res) {
        return res.json();
    })
    .then(function(product){
        DOMProductModifier(product);
        AddToBasket(product, customerBasket);
    })
    .catch(function(err){
        console.log(err);
        alert("Erreur liaison API impossible");
    });