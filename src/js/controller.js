import * as model from "./model.js";
import * as helpers from "./helpers";
import { RESULTS_PER_PAGE, LEAGUES_BTN_TEXT, TEAMS_BTN_TEXT } from "./config.js";
import seasonView from "./views/seasonView.js";
import leagueView from "./views/leagueView.js";
import teamView from "./views/teamView.js";
import teamBtnView from "./views/teamBtnView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import playerView from "./views/playerView.js";
import favoriteView from "./views/favoriteView.js";
import searchView from "./views/searchView.js";

// Default function that loads the default navbar view
const controlDefault = async () => {
  try {
    teamBtnView.toggleBtn();
    seasonView.toggleBtn();
    searchView.toggleSearch();
    leagueView.renderDdBtnText(LEAGUES_BTN_TEXT);
  } catch (err) {
    leagueView.renderError();
  }
};

// Function triggered by the leagues dd button
const controlLeagues = async function (leagueData) {
  try {
    // Reset model.state.page for next pagination cycle
    model.resetPage();
    resultView.clear();
    teamView.clear();
    playerView.clear();
    paginationView.clear();
    // Hide season dd btn
    seasonView.toggleBtn();
    // Show teams dd btn
    teamBtnView.toggleBtn(true);
    // Show search field and btn
    searchView.toggleSearch(true);
    // Render the leagues dd button with the selected league text
    leagueView.generateDdBtnText(leagueData.leagueID);
    // Load the available teams of this league and season and populate the teams dd list
    await model.loadTeams(leagueData.leagueID, leagueData.season);
    model.sortTeams(model.state.teams);
    // Render the available teams in the teams dd btn
    teamBtnView.renderDdBtnText(TEAMS_BTN_TEXT);
    teamBtnView.render(model.state.teams, true, true);
  } catch (err) {
    leagueView.renderError();
  }
};

// Function triggered by the teams dd button
const controlTeams = async function (teamName) {
  try {
    // Reset model.state.page for next pagination cycle
    model.resetPage();
    resultView.clear();
    teamView.clear();
    playerView.clear();
    paginationView.clear();
    // Show seasons dd btn
    seasonView.toggleBtn(true);
    // Populate the seasons dd btn with default season
    seasonView.renderDdBtnText(model.state.season);
    // Load the team with the selected name from the teams dd button
    await model.loadTeam(teamName);
    // Load the available seasons for the selected team
    await model.loadSeasons();
    // Load the selected team players (first page of the results)
    await model.loadPlayersOnePage();
    // If there's more than one results page, load the other pages 
    await model.loadPlayersOtherPages();
    // Set timeout so all the promises will get fulfilled and update the corresponding arrays
    teamView.renderSpinner();
    setTimeout(() => {
      // Render the team available seasons in the seasons dd btn using the state.seasons array
      seasonView.render(model.state.seasons, true);
      // Render the team using the state.team object
      teamView.render(model.state.team);
      // Add the 'favorite' field to the player objects
      model.addPlayerFavorite(model.state.players);
      // Sort and render the player using the state.players objects array
      model.sortPlayers(model.state.players);
      // Render the results list with the players(will show results according to the pagination attributes)
      resultView.render(model.sliceSearchRes(model.state.players, model.state.page, RESULTS_PER_PAGE), false, true);
      // Render the pagination buttons
      paginationView.renderButtons(model.state.page, model.state.players.length, RESULTS_PER_PAGE);
    }, 1000);
  } catch (err) {
    teamView.renderError();
  }
};

// Function triggered by the seasons dd button
const controlSeasons = async function (season) {
  try {
    // Reset model.state.page for next pagination cycle
    model.resetPage();
    playerView.clear();
    resultView.clear();
    paginationView.clear();
    // Change the seasons dd button text with the selected season
    seasonView.renderDdBtnText(season);
    model.state.season = season;
    // Get the teams players corresponding to the chosen season
    await model.loadPlayersOnePage();
    // If there's more than one results page, load the other pages 
    await model.loadPlayersOtherPages();
    // Set timeout so all the promises will get fulfilled and update the corresponding arrays
    resultView.renderSpinner();
    setTimeout(() => {
      // Add the 'favorite' field to the player objects
      model.addPlayerFavorite(model.state.players);
      // Sort and render the players array
      model.sortPlayers(model.state.players);
       // Render the results list with the players(will show results according to the pagination attributes)
      resultView.render(model.sliceSearchRes(model.state.players, model.state.page, RESULTS_PER_PAGE), false, true);
       // Render the pagination buttons
      paginationView.renderButtons(model.state.page, model.state.players.length, RESULTS_PER_PAGE);
    }, 700);   
  } catch (err) {
    teamView.renderError();
  }
};

// Function triggered by pressing the player link in the results list
const controlPlayer = function () {
  try {
    // If the window.location.hash is NOT empty, run the code
    if (window.location.hash !== "") {
      // Get the playerID from the window.location.hash
      const playerID = window.location.hash.replace("#", "");
      // Get the selected player from the state.players array
      model.getPlayer(parseInt(playerID));
      // Highlight selected result in the results & favorites lists
      resultView.update(model.sliceSearchRes(model.state.players, model.state.page, RESULTS_PER_PAGE)); 
      favoriteView.update(model.state.favorites);   
      // Check if the player is already in the favorite array, if he is mark player.player.favorite = true 
      model.checkPlayerFavorite(model.state.player);
      setTimeout(async () => {
      // Check if the team object id field matches the player team id field for rendering player team 
      if(model.state.player.statistics[0].team.id !== model.state.team.id) {
        await model.getTeamByID(model.state.player.statistics[0].team.id); 
        teamView.renderSpinner(); 
      }
      teamView.render(model.state.team);
      // Render the player details in the player modal using the state.player object (the selected player)
      playerView.render(model.state.player);
      playerView.renderCharts();
      helpers.clearHash();
    }, 400);   
    }
  } catch (err) {
    playerView.renderError();
  }
};

// Function triggered by the pagination buttons in the results list
const controlPagination = function(goTo) {
  paginationView.clear();
  // Render the corresponding results page using the 'goTo' variable which comes from the clicked button
  resultView.render(model.sliceSearchRes(model.state.players, goTo, RESULTS_PER_PAGE), false, true);
  // Render the pagination buttons using the 'goTo' variable which comes from the clicked button
  paginationView.renderButtons(goTo, model.state.players.length, RESULTS_PER_PAGE);
}

// Function triggered by the 'favorite btn' in the playerView
const controlToggleFavorite = function () {
  try {  
    // If the current player 'favorite' field is 'false' add to favorites, otherwise delete from favorites
    if(!model.state.player.player.favorite) model.addToFavorites(model.state.player);
    else model.deleteFavorite(model.state.player)
    // Update the playerView with the changed favorite icon
    playerView.update(model.state.player);  
    playerView.renderCharts();
    // Render the favorite view using the favorites players array
    favoriteView.render(model.state.favorites, true, true);  
  } catch (err) {
    favoriteView.renderError();
  }
}

// Function initiated when the page loads. Populates the favorites array from localStorage
const controlFavorite = function () {
  try {
    //model.clearStorage('favorites');
    model.initFavorites();
    favoriteView.render(model.state.favorites, true, true);
  } catch (err) {
    favoriteView.renderError();
  }
}

// Function for searching a player in the selected league
const controlSearch = async function () {
  try {
    // Get the input field data
   const query = searchView.getQuery();

   if(!query) return
   // Search for player using the query and league ID
   await model.searchPlayer(query);
   
   resultView.renderSpinner();
    setTimeout(() => {
      seasonView.toggleBtn();
      teamView.clear();
      playerView.clear();
      paginationView.clear();
      // Add the 'favorite' field to the player objects
      model.addPlayerFavorite(model.state.players);
      // Sort and render the player using the state.players objects array
      model.sortPlayers(model.state.players);
      // Render the results list with the players(will show results according to the pagination attributes)
      resultView.render(model.sliceSearchRes(model.state.players, model.state.page, RESULTS_PER_PAGE), false, true);
      // Render the pagination buttons
      paginationView.renderButtons(model.state.page, model.state.players.length, RESULTS_PER_PAGE);
    }, 700); 
  } catch (err) {
    searchView.renderError();
  }
}

// Initialize on program start
const init = function () {
  controlDefault();
  leagueView.addHandlerRender(controlLeagues);
  leagueView.addHandlerRenderCanvas(controlLeagues)
  teamView.addHandlerRender(controlTeams);
  teamView.addHandlerRenderCanvas(controlTeams);
  seasonView.addHandlerRender(controlSeasons);
  seasonView.addHandlerRenderCanvas(controlSeasons);
  paginationView.addHandlerClick(controlPagination);
  playerView.addHandlerAddFavorite(controlToggleFavorite);
  favoriteView.addHandlerRender(controlFavorite);
  searchView.addHandlerSearch(controlSearch);
  searchView.addHandlerSearchCanvas(controlSearch);
  window.addEventListener("hashchange", controlPlayer);
};

init();