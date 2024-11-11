// DOM Elements
const modalbg = document.querySelector(".bground");
const formPanel = document.getElementById("modal-body");
const validPanel = document.getElementById("validation-ctn");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close"); // close button - ISSUE 1
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birth = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const options = document.getElementById("location");
const condition = document.getElementById("checkbox1");
const myLabel = document.getElementById("qty_label");
const validClose = document.getElementById("fermer");
const burger = document.getElementById("burger");

// Change le label des quantités, conformément à la maquette
function verifLabelQty() {
  if (window.innerWidth <= 800) {
    myLabel.textContent = "À combien de tournois avez-vous déjà participé ?";
  } else {
    myLabel.textContent =
      "À combien de tournois GameOn avez-vous déjà participé ?";
  }
}

function editNav() {
  var x = document.getElementById("myTopnav");
  var burger = document.getElementById("burger");
  if (x.className === "topnav") {
    x.className += " responsive";
    burger.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  } else {
    x.className = "topnav";
    burger.innerHTML = `<i class="fa-regular fa-bars"></i>`;
  }
}

// On fait attention à changer le label aussi quand on change la taille de la fenêtre
const mql = window.matchMedia("(max-width: 800px)");
mql.onchange = (e) => verifLabelQty();

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "flex";
  verifLabelQty();
}

// close modal event - ISSUE 1
modalClose.addEventListener("click", closeModal);
validClose.addEventListener("click", closeModal);
burger.addEventListener("click", closeModal); // pour éviter que le menu burger et le formulaire n'empiète l'un sur l'autre

// close modal form - ISSUE 1
function closeModal() {
  modalbg.style.display = "none";
  validPanel.style.display = "none";
  formPanel.style.display = "block";
}

// ISSUE 2
// Vérification de chaque champ au moment du submit
const myForm = document.getElementById("form");
myForm.addEventListener("submit", (e) => {
  e.preventDefault(); // pour ne pas rafraîchir la page

  // Si toutes les conditions sont réunies, on peut valider l'inscription
  if (
    verifName(first) &&
    verifName(last) &&
    verifMail() &&
    verifBirthdate() &&
    verifQuantity() &&
    verifOptions() &&
    verifConditions()
  ) {
    console.log("toto");
    validationInscription();
  }
});

// Vérification que le Nom et Prénom soient présenté et ont bien plus de 2 caractères
function verifName(name) {
  if (name.value.trim() == "") {
    name.parentNode.setAttribute("data-error-visible", "true");
    name.parentNode.setAttribute("data-error-1-visible", "false");
    return false;
  } else if (name.value.trim().length < 2) {
    name.parentNode.setAttribute("data-error-1-visible", "true");
    name.parentNode.setAttribute("data-error-visible", "false");
    return false;
  } else {
    name.parentNode.setAttribute("data-error-visible", "false");
    name.parentNode.setAttribute("data-error-1-visible", "false");
    return true;
  }
}

// Vérification de si l'adresse mail est correctement renseignée
function verifMail() {
  const verif = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérifie que le format de l'adresse mail est ***@***.***
  if (verif.test(String(email.value.trim()).toLowerCase())) {
    email.parentNode.setAttribute("data-error-visible", "false");
    return true;
  } else {
    email.parentNode.setAttribute("data-error-visible", "true");
    return false;
  }
}

// Vérification de si une date de naissance est bien renseignée
function verifBirthdate() {
  // On transforme la date de l'input en vraie variable date
  const birthDate = new Date(birth.value.trim());

  // une date valide est forcément un nombre, ce n'est pas le cas d'une non valide
  if (isNaN(birthDate)) {
    birth.parentNode.setAttribute("data-error-visible", "true");
    return false;
  } else {
    birth.parentNode.setAttribute("data-error-visible", "false");
    return true;
  }
}

// Vérification de si une quantité est bien renseignée
function verifQuantity() {
  // On veut une valeur positive ou 0
  // Attention pour 0, le fait de ne rien remplir donne aussi le résultat 0, il faudra donc vérifier que la longueur de l'input soit >= 1
  if (quantity.value.trim() >= 0 && quantity.value.trim().length >= 1) {
    quantity.parentNode.setAttribute("data-error-visible", "false");
    return true;
  } else {
    quantity.parentNode.setAttribute("data-error-visible", "true");
    return false;
  }
}

// Vérification de si au moins une des options est bien cochée
function verifOptions() {
  let myCheck = false;
  // Parcours de chaque éléments, on ne s'intéresse qu'aux inputs, et on vérifie leur valeur
  options.childNodes.forEach((elt) => {
    if (elt.tagName == "INPUT") {
      if (elt.checked) {
        myCheck = true;
      } // il faut qu'un seul élément soit coché
    }
  });

  if (myCheck) {
    options.setAttribute("data-error-visible", "false");
  } else {
    options.setAttribute("data-error-visible", "true");
  }

  return myCheck;
}

// Vérification de si les conditions générales ont bien été acceptées
function verifConditions() {
  if (condition.checked) {
    condition.parentNode.setAttribute("data-error-visible", "false");
    return true;
  } else {
    condition.parentNode.setAttribute("data-error-visible", "true");
    return false;
  }
}

// Validation inscription
function validationInscription() {
  // Affichage des bon éléments
  validPanel.style.display = "flex";
  formPanel.style.display = "none";
  cleanPanel();
}

// Nettoyage du formulaire
function cleanPanel() {
  first.value = "";
  last.value = "";
  email.value = "";
  birth.value = "";
  quantity.value = "";
  options.childNodes.forEach((elt) => {
    if (elt.tagName == "INPUT") {
      elt.checked = false;
    }
  });
  condition.checked = false;
}
