/*Récupération et suppression du numéro de commande*/
var url = new URL (window.location.href);
var orderIdServer = url.searchParams.get("orderId");

/*modification et ajout du numéro de commande sur l'interface*/
var orderIdPage = document.getElementById("orderId");
orderIdPage.innerHTML = orderIdServer;