import View from "./View.js";
import * as helpers from "../helpers.js";

class teamView extends View {
  _parentElement = document.querySelector('.team__results');
  _teamsList = document.querySelector('.teams__list');
  _teamsListCanvas = document.querySelector('.teams__list--canvas');
  _ddBtn = document.querySelector('.teams__dd--btn');
  _ddBtnCanvas = document.querySelector('.teams__dd--btn--canvas');
  _errorMessage = 'Couldn\'t find the selected team 😞';
  _spinnerText = 'Loading...';

  // EventListener function for the teams dd button. Passes the team's name to the handler function
  addHandlerRender(handler) {
    this._teamsList.addEventListener("click", function (e) {
      const data = e.target.textContent;
      handler(data);
    });
  }
  
  addHandlerRenderCanvas(handler) {
    this._teamsListCanvas.addEventListener("click", function (e) {
      const data = e.target.textContent;
      handler(data);
    });
  }

  _generateMarkup() {
    this._generateDdBtnText();
    return `
      <div class="team__logo--col">
      <div class="team__logo--wrapper">
        <img src="${helpers.imgNotFound(this._data.logo)}" class="img-fluid rounded-start team__logo--img" alt="${helpers.checkTruthy(this._data.name)}">
      </div>
    </div>
    <div class="team__details--col">
      <p class="team__name">${helpers.checkTruthy(this._data.name)}</p>
      <div class="team__text">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-globe team__icon" title="Country" viewBox="0 0 16 16">
          <path
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
          <title>Country</title>
        </svg>
        <p>${helpers.checkTruthy(this._data.country)}</p>
      </div>
      <div class="team__text">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-calendar team__icon" title="Founded in" viewBox="0 0 16 16">
          <path
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          <title>Established</title>
        </svg>
        <p>${helpers.checkTruthy(this._data.founded)}</p>
      </div>
      <div class="team__text">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-house-door team__icon" title="Home stadium" viewBox="0 0 16 16">
          <path
            d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
          <title>Home Stadium</title>
        </svg>
        <p>${helpers.checkTruthy(this._data.stadium)} (${helpers.checkTruthy(this._data.stadiumCap)})</p>
      </div>
    </div>`
  }

  // The text will be the team that the user selected
  _generateDdBtnText() {
    this._ddBtn.textContent = this._data.name;
    this._ddBtnCanvas.textContent = this._data.name;
  }
}

export default new teamView();
