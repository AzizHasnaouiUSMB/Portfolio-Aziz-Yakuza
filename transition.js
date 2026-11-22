// transition.js : petit fondu quand on change de page
//
// L'apparition de la page est faite en CSS (voir style.css, "fondu").
// Ici, on gère seulement la sortie : quand on clique sur un lien vers
// une autre page, on ajoute la classe "sortie" (la page devient
// transparente), puis on change de page 200 ms plus tard.

const veutMoinsDAnimations = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function changerDePage(event) {
  const lien = event.currentTarget;

  // on laisse faire le navigateur si c'est un clic spécial
  // (nouvel onglet, Ctrl+clic...) ou un lien qui ne change pas de page
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
  if (lien.target === "_blank" || lien.hasAttribute("download")) return;
  if (lien.origin !== window.location.origin) return;           // lien externe
  if (lien.pathname === window.location.pathname) return;       // même page

  event.preventDefault();                                       // on bloque le changement immédiat
  document.body.classList.add("sortie");
  setTimeout(function () {
    window.location.href = lien.href;
  }, 200);
}

if (!veutMoinsDAnimations) {
  const liens = document.querySelectorAll("a[href]");
  liens.forEach(function (lien) {
    lien.addEventListener("click", changerDePage);
  });
}

// si on revient en arrière avec le bouton "précédent", la page peut
// rester transparente : on la remet visible
window.addEventListener("pageshow", function () {
  document.body.classList.remove("sortie");
});
