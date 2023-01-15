// import axios from "https://cdn.skypack.dev/axios";
import axios from "axios";
import {
  API_URL_TEAMS,
  API_URL_TEAM_SEASONS,
  API_URL_PLAYERS,
  API_KEY,
  RAPIDAPI_HOST,
} from "./config.js";

// State object for saving values used in the model and in the controller
export const state = {
  options: {
    // options for axios calls
    method: "GET",
    url: "",
    params: "",
    headers: {
      "x-rapidapi-host": `${RAPIDAPI_HOST}`,
      "x-rapidapi-key": `${API_KEY}`,
    },
  },
  team: {
    id: 0,
    name: "",
    country: "",
    founded: 0,
    stadium: "",
    stadiumCap: 0,
    logo: "",
  },
  leagueID: 0,
  season: 0,
  page: 1,
  player: {},
  data: {},
  pages: [],
  teams: [],
  seasons: [],
  players: [],
  favorites: [],
};

// Get the teams names for a specific chosen league (when user choses a league with the dd button) by the league ID and season
export const loadTeams = async function (leagueID, season) {
  try {
    // state.season is used for the loadTeam function, it will either be the DEFAULT_LEAGUE_SEASON (coming from the leagueView
    // and the controlLeagues function in the controller) or the season chosen by the seasons dd button (coming from the seasonsView
    // and the controlSeasons function in the controller)
    state.leagueID = leagueID;
    state.season = season;
    state.options.url = API_URL_TEAMS;
    state.options.params = { league: leagueID, season: season };

    await axios.request(state.options).then(function (response) {
      state.teams = response.data.response; // Populate the teams array
    });
  } catch (err) {
    //console.error(err);
    throw err;
  }
};

// Get a team by the team's name when the user choses one with the teams dd button
export const loadTeam = async function (teamName) {
  try {
    state.options.url = API_URL_TEAMS;
    state.options.params = { search: teamName };

    await axios.request(state.options).then(function (response) {
      state.team.id = response.data.response[0].team.id;
      state.team.name = response.data.response[0].team.name;
      state.team.country = response.data.response[0].team.country;
      state.team.founded = response.data.response[0].team.founded;
      state.team.stadium = response.data.response[0].venue.name;
      state.team.stadiumCap = response.data.response[0].venue.capacity;
      state.team.logo = response.data.response[0].team.logo;
    });
  } catch (err) {
    //console.error(err);
    throw err;
  }
};

// Get the seasons for a specific chosen team (when user choses a team with the dd button) by the team ID
export const loadSeasons = async function () {
  try {
    state.options.url = API_URL_TEAM_SEASONS;
    state.options.params = { team: state.team.id }; // Team id comes from the loadTeam response

    await axios.request(state.options).then(function (response) {
      state.seasons = response.data.response; // Populate the seasons array
    });
  } catch (err) {
    //console.error(err);
    throw err;
  }
};

// Get the players objects using the state.team.id (coming from the loadTeam() function)
// and the state.season (coming from the loadTeams() function) then populate the state.players array
export const loadPlayersOnePage = async function () {
  try {
    state.options.url = API_URL_PLAYERS;
    state.options.params = { team: state.team.id, season: state.season };
    await axios.request(state.options).then(function (response) {
      // state.date used for loading the other result pages
      state.data = response.data;
      state.players = response.data.response;
    });
  } catch (err) {
    //console.error(err);
    throw err;
  }
};

// Function used to load the other players results pages (right now there are duplicates on page 3 so I'm loading only page 2)
export const loadPlayersOtherPages = async function () {
  try {
    // if there's more than one results page push the pages into the state.pages array
    // if (state.data.paging.total > 1) {
    // i begins with value of 2 because page one was loaded before
    //   for (let i = 2; i <= state.data.paging.total; i++) {
    //     state.pages.push(i);
    //   }
    // for each page in the state.pages array call the server
    //   state.pages.forEach(async (el) => {
    //     state.options.params = {
    //       team: state.team.id,
    //       season: state.season,
    //       page: el,
    //     };
    //     await axios.request(state.options).then(function (response) {
    //       response.data.response.forEach((el) => state.players.push(el));
    //     });
    //   });
    // }
    state.options.params = {
      team: state.team.id,
      season: state.season,
      page: 2,
    };
    await axios.request(state.options).then(function (response) {
      response.data.response.forEach((el) => state.players.push(el));
    });
  } catch (err) {
    //console.error(err);
    throw err;
  }
};

export const searchPlayer = async function (query) {
  try {
    state.options.url = API_URL_PLAYERS;
    state.options.params = { league: state.leagueID, search: query };
    await axios.request(state.options).then(function (response) {
      if (response.data.response.length === 0) throw error;
      state.players = response.data.response;
    });
  } catch (err) {
    //console.error(err);
    throw err;
  }
}

// Function for getting the team details after the user searched and clicked a player from the input field.
// If the selected player team ID doesn't match the team object ID field, get the team details via team ID
export const getTeamByID = async function (teamID) {
    try {
      state.options.url = API_URL_TEAMS;
      state.options.params = { id: teamID };
  
      await axios.request(state.options).then(function (response) {
        state.team.id = response.data.response[0].team.id;
        state.team.name = response.data.response[0].team.name;
        state.team.country = response.data.response[0].team.country;
        state.team.founded = response.data.response[0].team.founded;
        state.team.stadium = response.data.response[0].venue.name;
        state.team.stadiumCap = response.data.response[0].venue.capacity;
        state.team.logo = response.data.response[0].team.logo;
      });
    } catch (err) {
      //console.error(err);
      throw err;
    }
}

// Function for adding the 'favorite' field to the state.players array objects
export const addPlayerFavorite = function (array) {
  array.forEach((el) => (el.player.favorite = false));
};

// Function for slicing the results that will be rendered in the results list
export const sliceSearchRes = function (
  array,
  page = state.page,
  resultsPerPage
) {
  state.page = page;
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  let slicedArray = [];
  slicedArray = array.slice(start, end);
  return slicedArray;
};

export const resetPage = function () {
  state.page = 1;
}

// Find the selected player from the state.players or state.favorites array.
export const getPlayer = function (playerID) {
  if (playerID) {
    state.players.forEach((player) => {
      if (player.player.id === playerID) {
        state.player = player;
      }
    });
    // Check if the state.player object is empty (meaning the playerID is coming from the favorites list) or
    // the id belongs to another player in the state.favorites array
    if (
      (state.player &&
        Object.keys(state.player).length === 0 &&
        Object.getPrototypeOf(state.player) === Object.prototype) ||
      state.player.player.id !== playerID
    ) {
      state.favorites.forEach((player) => {
        if (player.player.id === playerID) {
          state.player = player;
        }
      });
    }
  } else {
    throw error;
  }
};

// Function for alphabetically sorting the teams in the teams dd button by their names
export const sortTeams = function (teamsArray) {
  teamsArray.sort(function (teamA, teamB) {
    const positionA = teamA.team.name.toUpperCase();
    const positionB = teamB.team.name.toUpperCase();
    if (positionA < positionB) {
      return -1;
    }
    if (positionA > positionB) {
      return 1;
    }
    return 0;
  });
};

// Function for alphabetically sorting the player cards using their position (forward, defender etc)
export const sortPlayers = function (playersArray) {
  playersArray.sort(function (playerA, playerB) {
    const positionA = playerA.statistics[0].games.position.toUpperCase();
    const positionB = playerB.statistics[0].games.position.toUpperCase();
    if (positionA < positionB) {
      return -1;
    }
    if (positionA > positionB) {
      return 1;
    }
    return 0;
  });
};

// Persist the state.favorites array into localStorage
const persistFavorite = function () {
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
};

export const addToFavorites = function (player) {
  player.player.favorite = true;
  state.favorites.push(player);
  persistFavorite();
};

export const deleteFavorite = function (player) {
  player.player.favorite = false;
  const index = state.favorites.findIndex(
    (el) => el.player.id === player.player.id
  );
  state.favorites.splice(index, 1);
  persistFavorite();
};

// Check if the player is already in the state.favorites array before rendering him.
// The players that come from the API don't have the 'favorite' field, so I added the 
// field before and now there's a need to check each player if he's in the favorites 
// array or not before rendering him. 
export const checkPlayerFavorite = function (player) {
  state.favorites.forEach((el) => {
    if (el.player.id === player.player.id) {
      player.player.favorite = true;
    }
  });
};

// Initialize the favorites that are stored in localStorage
export const initFavorites = function () {
  const storage = localStorage.getItem("favorites");
  if (storage) state.favorites = JSON.parse(storage);
};

export const clearStorage = function (key) {
  localStorage.clear(key);
};
