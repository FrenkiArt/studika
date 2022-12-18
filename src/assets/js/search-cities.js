class searchCities {
  constructor(mainEl) {
    this.mainEl = mainEl;
    this.tagsEl = this.mainEl.querySelector("[data-tags]");
    this.resultsListEl = this.mainEl.querySelector("[data-results]");
    this.localDB = [];
    this.filteredList = [];
    this.selectedList = [];
    this.btnTrigger = document.querySelector("[data-citiestrigger]");
    this.btnSave = this.mainEl.querySelector("[data-savecities]");
    this.inputSearchEl = this.mainEl.querySelector("[data-inputsearch]");
    this.searchValue = "";
  }

  checkLocalDB() {
    if (localStorage.getItem("localDB")) {
      // Работаем с локальной базой данных
      this.localDB = JSON.parse(localStorage.getItem("localDB"));
      this.outputResults(this.localDB);
    } else {
      // загружаем базу данных
      this.getDB();
    }
    console.log(this.localDB);
  }

  getDB() {
    fetch("https://studika.ru/api/areas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((result) => {
        this.localDB = result;
        this.citiesImprovement();
        localStorage.setItem("localDB", JSON.stringify(this.localDB));
        this.outputResults(result);
      });
  }

  citiesImprovement() {
    this.localDB.forEach((item) => {
      if (item.type === "area") {
        item.cities.forEach((city) => {
          city.state_name = item.name;
        });
      }
    });
  }

  outputResults(results) {
    this.resultsListEl.innerHTML = "";
    results.forEach((item) => {
      if (item.type === "country") {
        const li = this.createLi();
        li.append(
          this.createCardArea({
            areaId: item.id,
            areaName: item.name,
          })
        );
        this.resultsListEl.append(li);
      }
      if (item.type === "area") {
        const li = this.createLi();
        li.append(
          this.createCardArea({
            areaId: item.id,
            areaName: item.name,
          })
        );
        this.resultsListEl.append(li);

        item.cities.forEach((city) => {
          const li = this.createLi();
          li.append(
            this.createCardCity({
              areaId: item.id,
              areaName: item.name,
              cityName: city.name,
              cityId: city.id,
            })
          );
          this.resultsListEl.append(li);
        });
      }
    });
  }

  outputFilteredResults(results) {
    this.resultsListEl.innerHTML = "";
    results.forEach((item) => {
      if (item.type === "country") {
        const li = this.createLi();
        li.append(
          this.createCardArea({
            areaId: item.id,
            areaName: item.name,
          })
        );
        this.resultsListEl.append(li);
      } else if (item.type === "area") {
        const li = this.createLi();
        li.append(
          this.createCardArea({
            areaId: item.id,
            areaName: item.name,
          })
        );
        this.resultsListEl.append(li);
      } else {
        const li = this.createLi();
        li.append(
          this.createCardCity({
            areaId: item.state_id,
            areaName: item.state_name,
            cityName: item.name,
            cityId: item.id,
          })
        );
        this.resultsListEl.append(li);
      }
    });
  }

  createLi() {
    const li = document.createElement("li");
    li.classList.add("float-cities__list-item");
    return li;
  }

  /**
   * @param dto {
   *  areaId,
   *  areaName,
   * }
   * @returns div elements
   */
  createCardArea(dto) {
    const cardEl = document.createElement("button");
    cardEl.classList.add("card-float-city");
    cardEl.innerHTML = `
      <div class="card-float-city__name" data-areaid="${dto.areaId}">
        <!--${dto.areaName}-->
        <span class="match">${this.searchValue}</span>${dto.areaName.slice(
      this.searchValue.length
    )}
      </div>
    `;
    cardEl.dataset.id = dto.areaId;
    cardEl.dataset.name = dto.areaName;
    cardEl.addEventListener("click", () => this.clickToCard(cardEl));
    return cardEl;
  }

  /**
   * @param dto {
   *  areaId,
   *  areaName,
   *  cityName,
   *  cityId,
   * }
   * @returns div elements
   */
  createCardCity(dto) {
    const cardEl = document.createElement("button");
    cardEl.classList.add("card-float-city");
    cardEl.innerHTML = `
      <div class="card-float-city__name" data-cityid="${dto.cityId}">
        <!-- ${dto.cityName}-->
        <span class="match">${this.searchValue}</span>${dto.cityName.slice(
      this.searchValue.length
    )}
      </div>
      <div class="card-float-city__area" data-areaid="${dto.areaId}">
        ${dto.areaName}
      </div>
    `;
    cardEl.dataset.id = dto.cityId;
    cardEl.dataset.name = dto.cityName;
    cardEl.addEventListener("click", () => this.clickToCard(cardEl));
    return cardEl;
  }

  clickToCard(el) {
    const selectedObject = {
      id: el.dataset.id,
      name: el.dataset.name,
    };

    const selectedIndex = this.findSelectedItem(selectedObject.id);

    if (selectedIndex === -1) {
      this.addSelectedItem(selectedObject);
    } else {
      this.removeSelectedItem(selectedIndex);
    }
  }

  findSelectedItem(id) {
    return this.selectedList.findIndex((item) => {
      return item.id === id;
    });
  }

  addSelectedItem(selectedObject) {
    this.selectedList.push(selectedObject);
    this.updateViewSelectedTags();
  }

  removeSelectedItem(index) {
    this.selectedList.splice(index, 1);
    this.updateViewSelectedTags();
  }

  updateViewSelectedTags() {
    this.tagsEl.innerHTML = "";
    this.selectedList.forEach((item) => {
      const tagEl = this.createTag(item);
      this.tagsEl.appendChild(tagEl);
    });
  }

  createTag(dto) {
    const tagEl = document.createElement("tag");
    tagEl.classList.add("tag");
    tagEl.dataset.id = dto.id;
    tagEl.innerHTML = `
      <div class="tag__text">${dto.name}</div>
      <button type="button" class="tag__remove" title="Удалить" data-id="${dto.id}">
        <svg width="32" height="32" class="">
          <use xlink:href="assets/svg/svg_sprite.svg#reset"></use>
        </svg>
      </button>
    `;
    const btnRemoveTag = tagEl.querySelector(".tag__remove");
    btnRemoveTag.addEventListener("click", (e) => {
      this.clickRemoveTag(e);
    });
    return tagEl;
  }

  clickRemoveTag(e) {
    const selectedIndex = this.findSelectedItem(e.currentTarget.dataset.id);
    this.removeSelectedItem(selectedIndex);
    e.currentTarget.closest(".tag").remove();
  }

  saveSelectedList() {
    localStorage.setItem(
      "localSelectedList",
      JSON.stringify(this.selectedList)
    );

    this.updataCitiesInTrigger();
  }

  updataCitiesInTrigger() {
    const citiesNames = [];
    this.selectedList.forEach((item) => {
      citiesNames.push(item.name);
    });

    if (this.selectedList.length === 0) {
      this.btnTrigger.title = "Любой регион";
      this.btnTrigger.querySelector(".cities-trigger__value").textContent =
        "Любой регион";
    } else {
      this.btnTrigger.title = citiesNames.join(", ");
      this.btnTrigger.querySelector(".cities-trigger__value").textContent =
        citiesNames.join(", ");
    }
  }

  checkLocalSelectedList() {
    if (localStorage.getItem("localSelectedList")) {
      this.selectedList = JSON.parse(localStorage.getItem("localSelectedList"));
      this.updateViewSelectedTags();
    }
  }

  inputSearchHandler(e) {
    this.searchValue = e.target.value.toLowerCase();
    if (e.target.value.length === 0) {
      this.outputResults(this.localDB);
      return false;
    }

    const areasFiltered = this.localDB.filter((item) => {
      return item.name.toLowerCase().startsWith(this.searchValue);
    });

    let citiesFiltered = [];
    this.localDB.forEach((item) => {
      if (item.type === "area") {
        const areaCities = item.cities.filter((city) => {
          return city.name.toLowerCase().startsWith(this.searchValue);
        });
        citiesFiltered = citiesFiltered.concat(areaCities);
      }
    });

    this.filteredList = [];
    this.filteredList = this.filteredList.concat(areasFiltered, citiesFiltered);

    this.outputFilteredResults(this.filteredList);
  }

  clickOut(e) {
    if (
      !e.target.closest("[data-citiestrigger]") &&
      !e.target.closest("[data-searchcities]")
    ) {
      this.mainEl.classList.remove("active");
    }
  }

  hideMainEl() {
    this.mainEl.classList.remove("active");
    this.mainEl.classList.add("hiden");
    setTimeout(() => {
      this.mainEl.classList.remove("hiden");
    }, 100);
  }

  start() {
    this.checkLocalDB();
    this.checkLocalSelectedList();
    this.btnSave.addEventListener("click", () => {
      this.saveSelectedList();
      this.hideMainEl();
    });
    this.updataCitiesInTrigger();
    this.inputSearchEl.addEventListener("input", (e) =>
      this.inputSearchHandler(e)
    );

    this.mainEl
      .querySelector(".form-search__reset")
      .addEventListener("click", () => {
        const eventInput = new Event("input");
        setTimeout(() => {
          this.inputSearchEl.dispatchEvent(eventInput);
        }, 0);
      });

    this.mainEl.querySelector(".form-search__reset").click();
    this.btnTrigger.addEventListener("click", () => {
      this.mainEl.classList.toggle("active");
      this.mainEl.style.top =
        this.btnTrigger.getBoundingClientRect().top + 50 + "px";
      this.mainEl.style.left =
        this.btnTrigger.getBoundingClientRect().left + "px";
    });

    document.addEventListener("click", (e) => this.clickOut(e));
    window.addEventListener("scroll", () => this.hideMainEl());
  }
}

export default searchCities;
