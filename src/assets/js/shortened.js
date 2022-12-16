/* shortened.js */

shortenedHandlers();

function shortenedHandlers() {
  if (document.querySelector(".shortened-text")) {
    document.querySelectorAll(".shortened-text__trigger").forEach((item) => {
      item.addEventListener("click", toggleShortened);
    });
  }
}

function toggleShortened(e) {
  e.preventDefault();
  e.currentTarget.closest(".shortened-text").classList.toggle("active");
}
