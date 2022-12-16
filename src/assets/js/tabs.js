/* tabs.js */

document.querySelectorAll("[data-tab]").forEach((element) => {
  element.addEventListener("click", clickTab);
});

function clickTab(e) {
  const thisEl = e.currentTarget;
  const parent = thisEl.closest("[data-tabparent]");
  const tabTarget = thisEl.dataset.tab;

  parent.querySelectorAll("[data-tab]").forEach((element) => {
    element.classList.remove("active");
  });

  thisEl.classList.add("active");

  parent.querySelectorAll("[data-tabtarget]").forEach((element) => {
    element.classList.remove("active");
  });
  parent.querySelector("[data-tabtarget=" + tabTarget).classList.add("active");
}
