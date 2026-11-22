// home.js : la page d'accueil (index.html)
//
// Quand on passe la souris sur un bouton du menu, le gros titre
// au milieu de l'écran change. Quand on enlève la souris, mon nom revient.
//
// Les textes à afficher sont écrits dans le HTML, sur chaque lien :
//   <a href="about.html" data-title="..." data-sub="...">


// --- Étape 1 : on va chercher les éléments de la page ---

const titleBox = document.getElementById("titleBox");     // la boîte du titre
const titleText = document.getElementById("titleText");   // le gros titre
const titleSub = document.getElementById("titleSub");     // la ligne en dessous
const links = document.querySelectorAll(".menu a");       // tous les boutons du menu


// --- Étape 2 : on garde en mémoire le titre de départ (mon nom) ---

const startTitle = titleText.textContent;
const startSub = titleSub.textContent;


// --- Étape 3 : une fonction qui change le titre ---

function showTitle(title, sub) {
  titleText.textContent = title;
  titleSub.textContent = sub;

  // Petite animation : on enlève la classe "swap" puis on la remet
  // un tout petit peu plus tard, pour que l'animation recommence.
  titleBox.classList.remove("swap");
  setTimeout(function () {
    titleBox.classList.add("swap");
  }, 10);
}


// --- Étape 4 : on réagit à la souris et au clavier sur chaque bouton ---

for (const link of links) {

  // La souris arrive sur le bouton (ou on le sélectionne au clavier) :
  // on affiche son titre.
  link.addEventListener("mouseover", function () {
    showTitle(link.dataset.title, link.dataset.sub);
  });
  link.addEventListener("focus", function () {
    showTitle(link.dataset.title, link.dataset.sub);
  });

  // La souris quitte le bouton : on remet mon nom.
  link.addEventListener("mouseout", function () {
    showTitle(startTitle, startSub);
  });
  link.addEventListener("blur", function () {
    showTitle(startTitle, startSub);
  });
}


// --- Étape 5 : les flèches du clavier (haut et bas) ---
// Elles servent à passer d'un bouton à l'autre.

const linkList = Array.from(links);   // une vraie liste, pour pouvoir utiliser indexOf

document.addEventListener("keydown", function (event) {

  // On regarde quel bouton est sélectionné (-1 s'il n'y en a aucun).
  let position = linkList.indexOf(document.activeElement);

  if (event.key === "ArrowDown") {
    position = position + 1;
    if (position >= linkList.length) {
      position = 0;                          // après le dernier, on revient au premier
    }
  } else if (event.key === "ArrowUp") {
    position = position - 1;
    if (position < 0) {
      position = linkList.length - 1;        // avant le premier, on va au dernier
    }
  } else {
    return;                                  // autre touche : on ne fait rien
  }

  event.preventDefault();                    // la page ne descend pas toute seule
  linkList[position].focus();                // on sélectionne le bouton
});
