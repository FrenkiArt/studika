class formSearch {
  constructor(formEl) {
    this.formEl = formEl;
    this.inputEl = this.formEl.querySelector(".form-search__input");
    this.resetEl = this.formEl.querySelector(".form-search__reset");
    this.isDirty = false;
  }

  inputHandler(e) {
    if (e.target.value.length > 0) {
      this.formEl.classList.add("active");
    } else {
      this.formEl.classList.remove("active");
    }
  }

  clickReset() {
    this.formEl.classList.remove("active");
  }

  start() {
    this.inputEl.addEventListener("input", (e) => this.inputHandler(e));
    this.resetEl.addEventListener("click", () => this.clickReset());
  }
}

export default formSearch;
