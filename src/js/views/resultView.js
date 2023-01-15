import View from "./View.js";
import * as helpers from "../helpers.js";

class resultView extends View {
  _parentElement = document.querySelector(".results__list");
  _resultLink = document.querySelector(".results__link");
  _errorMessage = 'Couldn\'t find the selected team players 😞';
  _spinnerText = 'Loading...';

  _generateMarkup() {
    const playerID = window.location.hash.slice(1);
    return `
        <li>
          <a class="results__link ${helpers.checkTruthy(this._data.player.id) === parseInt(playerID) ? "results__link--active" : ''}" href="#${helpers.checkTruthy(this._data.player.id)}">       
                  <img class="player__results--img card-img-top rounded-circle" src="${helpers.imgNotFound(this._data.player.photo)}" alt="${helpers.checkTruthy(this._data.player.name)}">
              <div class="results__data">
                      <div class="player__results--name">${helpers.checkTruthy(this._data.player.name)}</div>
                      <div class="player__results--role">${helpers.checkTruthy(this._data.statistics[0].games.position)}</div>
               </div>
              </a>
          </li>
          `;
  }
}

export default new resultView();
