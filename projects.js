// projects.js : la page des projets (projects.html)
//
// Dans la page HTML, il y a trois choses :
//   - les boutons de filtre         (class="filter")
//   - la liste des projets          (class="log-item")
//   - une fiche détaillée par projet (class="project")
//
// Ce fichier fait deux choses :
//   1. quand on clique sur un projet de la liste, on montre sa fiche et on cache les autres ;
//   2. quand on clique sur un filtre, on garde seulement les projets qui ont cette techno.


// --- Étape 1 : on va chercher les éléments de la page ---

const filterButtons = document.querySelectorAll(".filter");
const projectButtons = document.querySelectorAll(".log-item");
const projectSheets = document.querySelectorAll(".project");


// --- Étape 2 : montrer la fiche d'un projet ---
// "id" est le nom du projet, par exemple "gym".

function showProject(id) {

  // Dans la liste, seul le bouton du projet choisi devient rouge ("selected").
  for (const button of projectButtons) {
    if (button.dataset.id === id) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  }

  // Parmi les fiches, on montre seulement celle du projet choisi.
  for (const sheet of projectSheets) {
    sheet.hidden = (sheet.id !== "project-" + id);
  }
}


// --- Étape 3 : filtrer les projets ---
// "tag" est la techno choisie : "all", "data", "csharp" ou "web".

function filterProjects(tag) {

  // Le bouton de filtre sur lequel on a cliqué devient rouge.
  for (const button of filterButtons) {
    if (button.dataset.filter === tag) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  }

  // On regarde chaque projet de la liste : on le montre ou on le cache.
  let firstVisibleId = "";
  for (const button of projectButtons) {

    // Dans le HTML on a écrit data-tags="data csharp".
    // split(" ") coupe ce texte en morceaux : ["data", "csharp"].
    const tagsOfProject = button.dataset.tags.split(" ");

    // Le projet reste visible si on a choisi "all" ou si sa liste contient le tag.
    const isVisible = (tag === "all") || tagsOfProject.includes(tag);

    // Le bouton est dans un <li> : c'est ce <li> qu'on cache ou qu'on montre.
    button.parentElement.hidden = !isVisible;

    // On retient le premier projet visible, on en aura besoin juste après.
    if (isVisible && firstVisibleId === "") {
      firstVisibleId = button.dataset.id;
    }
  }

  // Si le projet affiché vient d'être caché, on affiche le premier projet visible.
  const selectedButton = document.querySelector(".log-item.selected");
  if (selectedButton.parentElement.hidden) {
    showProject(firstVisibleId);
  }
}


// --- Étape 4 : réagir aux clics ---

// Clic sur un bouton de filtre
for (const button of filterButtons) {
  button.addEventListener("click", function () {
    filterProjects(button.dataset.filter);
  });
}

// Clic sur un projet de la liste
for (const button of projectButtons) {
  button.addEventListener("click", function () {
    showProject(button.dataset.id);
  });
}


// --- Étape 5 : ouvrir un projet directement depuis l'adresse ---
// Exemple : projects.html#gym ouvre directement le projet "gym".

const idInAddress = window.location.hash.substring(1);   // on enlève le "#" du début
if (document.getElementById("project-" + idInAddress) !== null) {
  showProject(idInAddress);
}
