import View from "./View.js";

class seasonView extends View {
  _parentElement = document.querySelector(".seasons__list");
  _parentElementCanvas = document.querySelector(".seasons__list--canvas");
  _ddBtn = document.querySelector(".seasons__dd--btn");
  _ddBtnCanvas = document.querySelector(".seasons__dd--btn--canvas");
  _errorMessage = 'Couldn\'t find the selected season 😞';

  // EventListener function for the seasons dd button. 
  addHandlerRender(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // LeagueID will be defined in the controller, season value is the chosen season from the dd list
      const season = e.target.textContent;
      handler(season);
    });
  }

  addHandlerRenderCanvas(handler) {
    this._parentElementCanvas.addEventListener("click", function (e) {
      // LeagueID will be defined in the controller, season value is the chosen season from the dd list
      const season = e.target.textContent;
      handler(season);
    });
  }
  
  _generateMarkup() {
    return `<li><a class="dropdown-item" href="#">${this._data}</a></li>`;
  }
}

export default new seasonView();
