import navScrolls from "./navScrolls";
import formSearch from "./formSearch";
import navHelperFn from "./nav-helper";
import searchCities from "./search-cities";

window.addEventListener("resize", function (e) {
  console.log(window.innerWidth);
});

if (document.querySelector("#nav-trigger")) {
  document
    .querySelector("#nav-trigger")
    .addEventListener("click", function (e) {
      document.querySelector("#nav").classList.toggle("active");
    });
}

const navEl = document.querySelector("[data-nav]");

if (navEl) {
  window.myNav = new navScrolls(navEl);
  window.myNav.start();
}

const formSearchEls = document.querySelectorAll("[data-formsearch]");

if (formSearchEls) {
  formSearchEls.forEach((el) => {
    new formSearch(el).start();
  });
}

navHelperFn();

const searchCityEls = document.querySelectorAll("[data-searchcities]");

if (searchCityEls) {
  searchCityEls.forEach((el) => {
    new searchCities(el).start();
  });
}
