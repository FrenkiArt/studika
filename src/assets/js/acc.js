/* acc.js */

accHandlers();

function accHandlers() {
  if (document.querySelector("[data-acc]")) {
    document.querySelectorAll("[data-acctrigger]").forEach((item) => {
      item.addEventListener("click", toggleAcc);
    });
  }
}

function toggleAcc(e) {
  e.currentTarget.closest("[data-acc]").classList.toggle("active");
}
