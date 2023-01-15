import View from "./View.js";
import { DEFAULT_SEASON } from "../config.js";


class LeagueView extends View {
  _ddBtn = document.querySelector('.leagues__dd--btn');
  _ddBtnCanvas = document.querySelector('.leagues__dd--btn--canvas');
  _leaguesList = document.querySelector('.leagues__list');
  _leaguesListCanvas = document.querySelector('.leagues__list--canvas');
  _errorMessage = 'Couldn\'t find the selected league 😞';

  // EventListener function for the leagues dd button. 
  addHandlerRender(handler) {
    this._leaguesList.addEventListener('click', function (e) {
      // leagueID comes from the html "data-league-id" set attribute, season is the default chosen season 
      const leagueData = { leagueID: e.target.getAttribute('data-league-id'), season: DEFAULT_SEASON };
      handler(leagueData);   
    });
  }

  addHandlerRenderCanvas(handler) {
    this._leaguesListCanvas.addEventListener('click', function (e) {
      // leagueID comes from the html "data-league-id" set attribute, season is the default chosen season 
      const leagueData = { leagueID: e.target.getAttribute('data-league-id'), season: DEFAULT_SEASON };
      handler(leagueData);   
    });
  }

  // The text will be the league that the user selected
 generateDdBtnText(leagueID) {
   const leagueNames = this._leaguesList.querySelectorAll('a');
   leagueNames.forEach(el => {
       if(el.getAttribute('data-league-id') === leagueID) {
           this._ddBtn.textContent = el.textContent;
           this._ddBtnCanvas.textContent = el.textContent;
       }
   });
 }
}

export default new LeagueView();