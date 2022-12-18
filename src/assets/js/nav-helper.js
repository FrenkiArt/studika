const navHelperFn = () => {
  const navInnerLists = document.querySelectorAll("[data-navparent]");
  const navHelper = document.querySelector("[data-navhelper]");

  if (navInnerLists) {
    navInnerLists.forEach((el) => {
      el.addEventListener("mouseenter", enterInnerListsHandler);
      el.addEventListener("mouseleave", leaveInnerListsHandler);
    });
  }

  window.addEventListener("scroll", hideNavHelperHandler);

  function enterInnerListsHandler() {
    const cloned = this.querySelector("ul").cloneNode(true);
    navHelper.innerHTML = "";
    navHelper.appendChild(cloned);
    if (window.matchMedia("(min-width: 768px)").matches) {
      navHelper.classList.add("active");
    }
    navHelper.style.top = this.getBoundingClientRect().top + 30 + "px";
    navHelper.style.left = this.getBoundingClientRect().left + "px";
  }

  function leaveInnerListsHandler() {
    navHelper.classList.remove("active");
  }

  function hideNavHelperHandler() {
    navHelper.classList.add("hiden");
    setTimeout(() => {
      navHelper.classList.remove("hiden");
    }, 100);
  }
};

export default navHelperFn;
