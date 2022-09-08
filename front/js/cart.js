/*Récupération et suppression du noeud de démonstration*/
var section = document.getElementById("cart__items");
var defaultArticle = document.querySelector('#cart__items > article');
section.removeChild(defaultArticle);

/*Création de la fonction de génération des noeuds des produits*/
function CreateNodeFromBasket (customerBasket, products){
    for (var a in customerBasket) {
        for (var b in products) {
            if (customerBasket[a].id == products[b]._id) {
                /*Création de l'architecture des noeux de liste*/
                var articleProduct = document.createElement("article");
                var divImage = document.createElement("div");
                var image = document.createElement("img");
                var divContent = document.createElement("div");
                var divDescription = document.createElement("div");
                var productName = document.createElement("h2");
                var productColor = document.createElement("p");
                var productPrice = document.createElement("p");
                var divSetting = document.createElement("div");
                var divQuantity = document.createElement("div");
                var productQuantity = document.createElement("p");
                var selectQuantity = document.createElement("input");
                var divDelete = document.createElement("div");
                var productDelete = document.createElement("p");

                /*Formatage des noeux créés*/
                articleProduct.classList.add("cart__item");
                articleProduct.setAttribute('data-id', customerBasket[a].id);
                articleProduct.setAttribute('data-color', customerBasket[a].color);
                divImage.classList.add("cart__item__img");
                image.setAttribute('src', products[b].imageUrl);
                image.setAttribute('alt', products[b].altTxt);
                divContent.classList.add('cart__item__content');
                divDescription.classList.add('cart__item__content__description');
                productName.innerHTML = products[b].name;
                productColor.innerHTML = customerBasket[a].color;
                productPrice.innerHTML = products[b].price + " €";
                divSetting.classList.add('cart__item__content__settings');
                divQuantity.classList.add('cart__item__content__settings__quantity');
                productQuantity.innerHTML = `Qté : ${customerBasket[a].quantity}`;
                selectQuantity.setAttribute('id', customerBasket[a].IdC);
                selectQuantity.setAttribute('type', "number");
                selectQuantity.classList.add('itemQuantity');
                selectQuantity.setAttribute('name', "itemQuantity");
                selectQuantity.setAttribute('min', "1");
                selectQuantity.setAttribute('max', "100");
                selectQuantity.setAttribute('value', customerBasket[a].quantity);
                divDelete.classList.add('cart__item__content__settings__delete');
                productDelete.setAttribute('id', customerBasket[a].IdC);
                productDelete.classList.add('deleteItem');
                productDelete.innerHTML = 'Supprimer';

                /*Reconstruction de l'architecture du noeu*/
                divQuantity.appendChild(productQuantity);
                divQuantity.appendChild(selectQuantity);
                divDelete.appendChild(productDelete);
                divDescription.appendChild(productName);
                divDescription.appendChild(productColor);
                divDescription.appendChild(productPrice);
                divSetting.appendChild(divQuantity);
                divSetting.appendChild(divDelete);
                divImage.appendChild(image);
                divContent.appendChild(divDescription);
                divContent.appendChild(divSetting);
                articleProduct.appendChild(divImage);
                articleProduct.appendChild(divContent);
                section.appendChild(articleProduct);
                }}}};

/*Création des évènements de bouton de supression*/
function DeleteButtonForEachProduct(customerBasket){
    try {
        let deletesButton = document.querySelectorAll("p.deleteItem");
        for (let e in deletesButton) {
            let localNode = deletesButton[e];
            localNode.addEventListener("click", function (){
                for (let f in customerBasket) {
                    if (localNode.id == customerBasket[f].IdC) {
                        customerBasket.splice(f, 1);
                        sessionStorage.removeItem("customerBasket");
                        sessionStorage.setItem("customerBasket", JSON.stringify(customerBasket));
                        location.reload();
                    }}})}}
    catch {}
};

/*Création des évènements de selecteur de quantité pour modification*/
function QuantityInputForEachProduct(customerBasket) {
    try {
        let quantityModifiers = document.querySelectorAll("input.itemQuantity");
        for (let g in quantityModifiers) {
            let localModifier = quantityModifiers[g];
            localModifier.addEventListener("focusout", function () {
                for (let h in customerBasket) {
                    if (localModifier.id == customerBasket[h].IdC) {
                        customerBasket[h].quantity = localModifier.value;
                        sessionStorage.removeItem("customerBasket");
                        sessionStorage.setItem("customerBasket", JSON.stringify(customerBasket));
                        location.reload();
                    }}})}}
    catch {}
    };

/*Création de la fonction de calcul du prix et de la quantité*/
function CalculOfPriceandQuantity (customerBasket, products) {
    /*Calcul de quantité*/
    var totalQuantity = document.getElementById("totalQuantity");
    var quantity = 0;
    for (let d in customerBasket) {
        quantity += parseInt(customerBasket[d].quantity);
    }
    totalQuantity.innerHTML = quantity;
    /*Calcul du prix*/
    var totalPrice = document.getElementById("totalPrice");
    var price = 0;
    for (let e in customerBasket) {
        for ( let f in products) {
            if (customerBasket[e].id == products[f]._id) {
                price += parseInt(products[f].price) * parseInt(customerBasket[e].quantity);
            }
        }
    }
    totalPrice.innerHTML = price;
};

/*Ajout de pattern de controle pour la protection du formulaire*/
/*Protection du champs "prénom" avec seulement les lettres minuscules et majuscules autorisées*/
var firstName = document.getElementById("firstName");
firstName.setAttribute('pattern', '[A-Za-z]{1,32}');
firstName.addEventListener("focusout", function () {
    if (firstName.validity.typeMismatch || firstName.validity.patternMismatch) {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerHTML = "Prénom incorrect";
    } else {firstNameErrorMsg.innerHTML = "";}
});
/*Protection du champs "nom de famille" avec seulement les lettres minuscules et majuscules autorisées*/
var lastName = document.getElementById("lastName");
lastName.setAttribute('pattern', '[A-Za-z]{1,255}');
lastName.addEventListener("focusout", function () {
    if (lastName.validity.typeMismatch || lastName.validity.patternMismatch) {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
        lastNameErrorMsg.innerHTML = "Nom Incorrect";
    } else {lastNameErrorMsg.innerHTML = "";}
});
/*Protection du champs "adresse" avec ajout du support des chiffres*/
var address = document.getElementById("address");
address.setAttribute('pattern', '[A-Za-z0-9]{1,255}');/*A améliorer*/
address.addEventListener("focusout", function () {
    if (address.validity.typeMismatch || address.validity.patternMismatch) {
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerHTML= "Adresse invalide";
    } else {addressErrorMsg.innerHTML = ""}
    });
/*Protection du champs "ville"*/
var city = document.getElementById("city");
city.setAttribute('pattern', '[A-Za-z]{1,255}');
city.addEventListener("focusout", function (){
    if (city.validity.typeMismatch || city.validity.patternMismatch) {
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerHTML = "Ville incorrect";
    } else {cityErrorMsg.innerHTML = ""}
});
/*Protection du champs "email"*/
var email = document.getElementById("email");
email.addEventListener("focusout", function () {
    if (email.validity.typeMismatch) {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerHTML = "Email incorrect";
    } else {emailErrorMsg.innerHTML = ""};
});

/*Récupération parallèle des infos des produits dans le panier*/
var customerBasket = sessionStorage.getItem('customerBasket');
customerBasket = JSON.parse(customerBasket);
var productsInfo = [];
fetch(`http://localhost:3000/api/products/`)
.then(function(res){
    return res.json();
})
.then(function(products){
    CreateNodeFromBasket(customerBasket, products);
    CalculOfPriceandQuantity(customerBasket, products);
    DeleteButtonForEachProduct(customerBasket);
    QuantityInputForEachProduct(customerBasket);
})
.catch(function(err){
    console.log(err);
    alert("Erreur liaison API impossible");
});

/*Fonction de redirection en cas de réussite d'envoie au serveur*/
function RedirectionAfterSucessForSendAPI (confirmation) {
    var url = document.location.pathname.split("/");
    url[3] = "confirmation.html";
    url = url.join("/")
    url = document.location.protocol + "//" + document.location.host + url;
    var redirection = new URL (url);
    var params = new URLSearchParams(redirection.search);
    params.append("orderId", confirmation.orderId);
    params.toString("orderId");
    redirection = redirection + "?" + params;
    window.location.replace(redirection);
};

/*Création du formulaire de contact et envoie au serveur*/
class contactClass {
    constructor (firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
};
/*Écoute du click*/
var response = "";
var order = document.getElementById("order");
order.addEventListener("click", function SendOrderToServer () {
    /*Désactivation du bouton de commande si formulaire incorrect*/
    if (firstName.validity.typeMismatch || firstName.validity.patternMismatch ||
        lastName.validity.typeMismatch || lastName.validity.patternMismatch ||
        address.validity.typeMismatch || address.validity.patternMismatch ||
        city.validity.typeMismatch || city.validity.patternMismatch ||
        email.validity.typeMismatch) {
            event.preventDefault();
        }
        else if (firstName.value == "" || lastName.value == "" || address.value == "" || city.value == "" || email.value == "") {
            event.preventDefault();
        }
    else {
        /*Création du tableau liste produits*/
        var products = [];
        for (var c in customerBasket) {
            products.push(customerBasket[c].id);
        };
        /*Création de l'objet contact avec les coordonnées client*/
        var contact = new contactClass (
            document.getElementById("firstName").value,
            document.getElementById("lastName").value,
            document.getElementById("address").value,
            document.getElementById("city").value,
            document.getElementById("email").value
        );
        /*Création du paquet à envoier*/
        var package = {contact, products};
        /*Envoie du paquet au serveur et attente de la réponse de confirmation*/
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body : JSON.stringify(package),
        })
        .then(function(res){
            return res.json();
        })
        .then(function(confirmation){
            RedirectionAfterSucessForSendAPI(confirmation);
        })
        .catch(function(err){
            console.log(err);
            alert("Erreur liaison API impossible");
        });
        }
});