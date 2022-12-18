class navScrolls {
  constructor(navEl, scrollStep) {
    this.navEl = navEl;
    this.btnLeft = this.navEl.querySelector("[data-navleft]");
    this.btnRight = this.navEl.querySelector("[data-navright]");
    this.navListEl = this.navEl.querySelector("[data-navlist]");
    this.scrollStep = scrollStep || 150;
  }

  scrollRight() {
    this.navListEl.scrollBy({
      left: this.scrollStep,
      behavior: "smooth",
    });
  }
  scrollLeft() {
    this.navListEl.scrollBy({
      left: this.scrollStep * -1,
      behavior: "smooth",
    });
  }

  hideBtnLeft() {
    this.btnLeft.classList.add("hiden");
  }
  hideBtnRight() {
    this.btnRight.classList.add("hiden");
  }
  showBtnLeft() {
    this.btnLeft.classList.remove("hiden");
  }
  showBtnRight() {
    this.btnRight.classList.remove("hiden");
  }

  scrollListener() {
    if (this.navListEl.scrollLeft > 0) {
      this.showBtnLeft();
    } else {
      this.hideBtnLeft();
    }

    if (
      this.navListEl.scrollLeftMax > 0 &&
      this.navListEl.scrollLeft !== this.navListEl.scrollLeftMax
    ) {
      this.showBtnRight();
    } else {
      this.hideBtnRight();
    }
  }

  clickNavEl() {
    if (!window.matchMedia("(min-width: 768px)").matches) {
      this.navEl.classList.remove("active");
    }
  }

  start() {
    this.btnLeft.addEventListener("click", () => this.scrollLeft());
    this.btnRight.addEventListener("click", () => this.scrollRight());
    this.navListEl.addEventListener("scroll", () => this.scrollListener());
    if (this.navListEl.scrollLeftMax > 0) {
      this.showBtnRight();
    }
    this.navEl.addEventListener("click", () => this.clickNavEl());
  }
}

export default navScrolls;
