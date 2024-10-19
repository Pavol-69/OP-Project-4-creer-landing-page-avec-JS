function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close"); // close button - ISSUE 1
const formData = document.querySelectorAll(".formData");
const checkboxesVille = document.querySelectorAll(".checkbox_ville"); // checkbox ville - ISSUE 2
const checkboxCond = document.querySelectorAll(".checkbox_cond"); // checkbox conditions - ISSUE 2
let verif = false;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event - ISSUE 1
modalClose.addEventListener("click", closeModal);

// close modal form - ISSUE 1
function closeModal() {
  modalbg.style.display = "none";
}

// ISSUE 2
// Toutes les vérifs sont faites via le required dans le HTML
// Vu que ce n'est pas pas compatible avec un groupe de checkbox ou une checkbox cachée
// Il a fallu en rajouter une que l'on cache grâce à l'opacité
// Ensuite, selon les conditions réunies, on applique ou pas le required
const hiddenInputVille = document.getElementById("input_verif_ville"); // Checkbox caché pour les villes
const hiddenInputCond = document.getElementById("input_verif_cond"); // Checkbox caché pour les conditions
hiddenInputVille.setCustomValidity("Vous devez choisir une option."); // ISSUE 3 /!\ bien mettre le customvalidity dans script, sinon ça bug
hiddenInputCond.setCustomValidity(
  "Vous devez vérifier que vous acceptez les termes et conditions."
); // ISSUE 3

// Evénement sur chaque case Ville que l'on coche
checkboxesVille.forEach((checkbox) => {
  checkbox.addEventListener("change", validateCheckboxesVille);
});

// Evénement checkbox Condition
checkboxCond[0].addEventListener("change", validateCheckboxCond);

// Si une case est cochée, on enlève required, sinon on le rajoute
function validateCheckboxesVille() {
  const isCheckedVille = Array.from(checkboxesVille).some(
    (checkboxVille) => checkboxVille.checked
  );
  if (isCheckedVille) {
    hiddenInputVille.removeAttribute("required");
    hiddenInputVille.setCustomValidity("");
    hiddenInputVille.setAttribute("checked", true);
  } else {
    hiddenInputVille.setAttribute("required", true);
  }
}
function validateCheckboxCond() {
  if (checkboxCond[0].checked) {
    hiddenInputCond.removeAttribute("required");
    hiddenInputCond.setCustomValidity("");
    hiddenInputCond.setAttribute("checked", true);
    verif = true; // Si le dernier point a été respecté, c'est que toutes les vérifs sont ok
  } else {
    hiddenInputCond.setAttribute("required", true);
    hiddenInputCond.setCustomValidity(
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    hiddenInputCond.setAttribute("checked", false);
    verif = false;
  }
}

// submit event - ISSUE 4
modalbg.addEventListener("submit", function (e) {
  e.preventDefault(); // Aucun refresh après submit
  if (verif) {
    modalbg.style.display = "none";
    reinit();
    alert("Merci ! Votre réservation a été reçue.");
  }
});

//Réinitialise toutes les valeurs une fois la réservation validée
function reinit() {
  document.getElementById("first").value = "";
  document.getElementById("last").value = "";
  document.getElementById("email").value = "";
  document.getElementById("birthdate").value = "";
  document.getElementById("quantity").value = "";
  Array.from(checkboxesVille).forEach(
    (checkboxVille) => (checkboxVille.checked = false)
  );
  checkboxCond[0].checked = false;
}
