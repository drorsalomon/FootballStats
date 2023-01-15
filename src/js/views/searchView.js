import View from "./View.js";
import * as helpers from "../helpers.js";

class searchView extends View {
  _parentElement = document.querySelector(".search__input");
  _parentElementCanvas = document.querySelector(".search__input--canvas");
  _searchBtn = document.querySelector(".search__btn");
  _searchBtnCanvas = document.querySelector(".search__btn--canvas");
  _searchForm = document.querySelector(".search__form");
  _searchFormCanvas = document.querySelector(".search__form--canvas");
  _errorMessage = 'Couldn\'t find players matching the search input, please try again 😞';
  
  addHandlerSearch(handler) {
    this._searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerSearchCanvas(handler) {
    this._searchFormCanvas.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._parentElement.value;
    const queryCanvas = this._parentElementCanvas.value;
    this._clearInput();
    if (query !== '') {
      return query;
    } else if (queryCanvas !== '') {
      return queryCanvas;
    }
  }

  _clearInput() {
    this._parentElement.value = '';
    this._parentElementCanvas.value = '';
  }

  toggleSearch(toggle = false) {
    if(!toggle) {
      this._parentElement.style.display = "none";
      this._parentElementCanvas.style.display = "none";
      this._searchBtn.style.display = "none";
      this._searchBtnCanvas.style.display = "none";
    } else {
      this._parentElement.style.display = ""
      this._parentElementCanvas.style.display = ""
      this._searchBtn.style.display = ""
      this._searchBtnCanvas.style.display = ""
    }
  }
}

export default new searchView();
