function popupHandler(e) {
  e.preventDefault();
  //[data-popuptrigger]
  const popupSelector = e.currentTarget.dataset.popuptrigger;
  const popupEl = document.querySelector(popupSelector);

  showOverlay();
  popupEl.classList.add("active");
}

function anyInClosePopupOverlay(e) {
  hideOverlay();
  e.target.closest(".popup").classList.remove("active");
}

function anyOutClosePopupOverlay(e) {
  hideOverlay();
  document.querySelector(".popup.active").classList.remove("active");
}

function closePopupHandler(e) {
  hideOverlay();
  e.target.closest(".popup").classList.remove("active");
}

function showOverlay() {
  document.querySelector(".overlay").classList.add("active");
}

function hideOverlay() {
  document.querySelector(".overlay").classList.remove("active");
}

function startPopups() {
  document.querySelectorAll("[data-popuptrigger]").forEach((element) => {
    element.addEventListener("click", popupHandler);
  });

  document.querySelectorAll(".popup__close").forEach((element) => {
    element.addEventListener("click", closePopupHandler);
  });

  document
    .querySelector(".overlay")
    .addEventListener("click", anyOutClosePopupOverlay);
}

if (document.querySelector(".popup")) {
  startPopups();
}
