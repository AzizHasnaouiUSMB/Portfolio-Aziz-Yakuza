// video.js : la vidéo de fond
//
// Certaines personnes demandent "moins d'animations" dans les réglages
// de leur ordinateur. Dans ce cas, on arrête la vidéo.

const wantsLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (wantsLessMotion) {
  document.querySelector(".bg-video").pause();
}
