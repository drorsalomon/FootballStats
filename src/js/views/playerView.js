import View from "./View.js";
import * as helpers from "../helpers.js";
import Chart from 'chart.js/auto';

class playerView extends View {
    _parentElement = document.querySelector('.player__results'); 
    _shotAcc = document.querySelector('.shot__acc'); 
    _passAcc = document.querySelector('.pass__acc'); 
    _duelAcc = document.querySelector('.duel__acc'); 
    _errorMessage = 'Couldn\'t find the selected team players 😞'; 
    _shotAccChartObject = '';
    _passAccChartObject = ''; 
    _duelAccChartObject = ''; 

    addHandlerAddFavorite(handler) {
      this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest('.favorite__btn');
      if (!btn) return;
      handler();
      });
    }

    _generateMarkup() {  
        return `    
          <div class="Player__results--header">
            <div class="player__images--wrapper">
              <div class="player__logo--wrapper">
                <img src="${helpers.imgNotFound(this._data.statistics[0].league.logo)}" class="player__logo--img rounded-circle" alt="${helpers.checkTruthy(this._data.statistics[0].league.name)}" />
              </div>
              <img src="${helpers.imgNotFound(this._data.player.photo)}" class="player__img rounded-circle" alt="${helpers.checkTruthy(this._data.player.name)}"/>
              <div class="player__logo--wrapper">
                <img src="${helpers.imgNotFound(this._data.statistics[0].team.logo)}" class="player__logo--img rounded-circle" alt="${helpers.checkTruthy(this._data.statistics[0].team.name)}" />
              </div>
            </div>
            <div>
            <div class="player__name">${helpers.checkTruthy(this._data.player.name)}</div>
            <div class="player__team">${helpers.checkTruthy(this._data.statistics[0].team.name)}</div>
            <div class="player__season">${helpers.checkTruthy(this._data.statistics[0].league.season)}</div>
            <button type="button" class="btn favorite__btn">
            ${this._data.player.favorite === false ? 
              `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart heart__icon" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                <title>Add To Favorite</title> 
              </svg>` : 
             `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill heart__icon" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                <title>Remove From Favorite</title>
              </svg>`}
            </button>
            </div>
            <div class="charts__container">
              <div class="shot__chart--wrapper">
                <p class="player__chart--label">Shooting Accuracy</p>
                <canvas class="shot__acc--chart" width="150" height="150"></canvas>
              </div>
              <div class="pass__chart--wrapper">
                <p class="player__chart--label">Passing Accuracy</p>
                <canvas class="pass__acc--chart" width="150" height="150"></canvas>
              </div>
              <div class="duel__chart--wrapper">
                <p class="player__chart--label">Duel Accuracy</p>
                <canvas class="duel__acc--chart" width="150" height="150"></canvas>
              </div>
            </div>
            <div class="player__details--container">

              <div class="row justify-content-center">
                <div class="player__details">
                  <p class="player__details--title">PLAYER DETAILS</p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Role</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].games.position)}</p>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Age</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(this._data.player.age)}</p>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Height</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(this._data.player.height)}</p>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Weight</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(this._data.player.weight)}</p>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Nationality</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(this._data.player.nationality)}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="player__details">
                  <p class="player__details--title">MATCHES</p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Appearances</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].games.appearences)}</p>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Minutes</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].games.minutes)}</p>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Minutes Per Game</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(Math.round(this._data.statistics[0].games.minutes / this._data.statistics[0].games.appearences))}</p>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Sub in</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].substitutes.in)}</p>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item player__details--item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="player__details--left">Sub out</p>
                        </div>
                        <div>
                          <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].substitutes.out)}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="player__details">
                <p class="player__details--title">ATTACK</p>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Goals</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].goals.total)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Assists</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].goals.assists)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Total Shots</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].shots.total)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Shots on Target</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].shots.on)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Shooting accuracy</p>
                      </div>
                      <div>
                        <p class="player__details--right shot__acc">${helpers.checkTruthy(helpers.calcPerc(this._data.statistics[0].shots.on, this._data.statistics[0].shots.total))}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Passes</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].passes.total)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Key Passes</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].passes.key)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Passing Accuracy</p>
                      </div>
                      <div>
                        <p class="player__details--right pass__acc">${helpers.checkTruthy(this._data.statistics[0].passes.accuracy) + (this._data.statistics[0].passes.accuracy == null ? '' : '%')}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Dribble Attempts</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].dribbles.attempts)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Successful Dribbles</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].dribbles.success)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Penalties Won</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].penalty.won)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Penalties Scored</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].penalty.scored)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Penalties Missed</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].penalty.missed)}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="player__details">
                <p class="player__details--title">DEFENCE</p>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Tackles</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].tackles.total)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Blocks</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].tackles.blocks)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Interceptions</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].tackles.interceptions)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Duels</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].duels.total)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Duels Won</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].duels.won)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Duels Accuracy</p>
                      </div>
                      <div>
                        <p class="player__details--right duel__acc">${helpers.checkTruthy(helpers.calcPerc(this._data.statistics[0].duels.won, this._data.statistics[0].duels.total))}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Fouls Drawn</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].fouls.drawn)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Fouls Committed</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].fouls.committed)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Yellow Cards</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].cards.yellow)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Red Cards</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].cards.red)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Goals Conceded</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].goals.conceded)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Saves</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].goals.saves)}</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item player__details--item">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="player__details--left">Penalties Saved</p>
                      </div>
                      <div>
                        <p class="player__details--right">${helpers.checkTruthy(this._data.statistics[0].penalty.saved)}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>`
     }

      // Function for rendering charts (chart.js)
      renderCharts() {
      const shotAccChart = document.querySelector('.shot__acc--chart'); 
      const passAccChart = document.querySelector('.pass__acc--chart'); 
      const duelAccChart = document.querySelector('.duel__acc--chart'); 

      // Chart.js plugin for inserting text in the middle of a doughnut chart
      Chart.register({
        id: 'doughnut-centertext',
        beforeDraw: function(chart) {
          if (chart.config.options.elements.center) {
              // Get ctx from string
              let ctx = chart.ctx;
      
              // Get options from the center object in options
              let centerConfig = chart.config.options.elements.center;
              let fontStyle = centerConfig.fontStyle || 'Arial';
              let txt = centerConfig.text;
              let color = centerConfig.color || '#000';
              let maxFontSize = centerConfig.maxFontSize || 75;
              let sidePadding = centerConfig.sidePadding || 20;
              let sidePaddingCalculated = (sidePadding / 100) * (chart._metasets[chart._metasets.length-1].data[0].innerRadius * 2)
              // Start with a base font of 30px
              ctx.font = "30px " + fontStyle;
      
              // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
              let stringWidth = ctx.measureText(txt).width;
              let elementWidth = (chart._metasets[chart._metasets.length-1].data[0].innerRadius * 2) - sidePaddingCalculated;            
      
              // Find out how much the font can grow in width.
              let widthRatio = elementWidth / stringWidth;
              let newFontSize = Math.floor(30 * widthRatio);
              let elementHeight = (chart._metasets[chart._metasets.length-1].data[0].innerRadius * 2);
      
              // Pick a new font size so it will not be larger than the height of label.
              let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
              let minFontSize = centerConfig.minFontSize;
              let lineHeight = centerConfig.lineHeight || 25;
              let wrapText = false;
      
              if (minFontSize === undefined) {
                  minFontSize = 20;
              }
     
              if (minFontSize && fontSizeToUse < minFontSize) {
                  fontSizeToUse = minFontSize;
                  wrapText = true;
              } 
              // Set font settings to draw it correctly.
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
              let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
              ctx.font = fontSizeToUse + "px " + fontStyle;
              ctx.fillStyle = color;
      
              if (!wrapText) {
                  ctx.fillText(txt, centerX, centerY);
                  return;
              }  
              let words = txt.split(' ');
              let line = '';
              let lines = [];
      
              // Break words up into multiple lines if necessary
              for (let n = 0; n < words.length; n++) {
                  let testLine = line + words[n] + ' ';
                  let metrics = ctx.measureText(testLine);
                  let testWidth = metrics.width;
                  if (testWidth > elementWidth && n > 0) {
                      lines.push(line);
                      line = words[n] + ' ';
                  } else {
                      line = testLine;
                  }
              }    
              // Move the center up depending on line height and number of lines
              centerY -= (lines.length / 2) * lineHeight;
      
              for (let n = 0; n < lines.length; n++) {
                  ctx.fillText(lines[n], centerX, centerY);
                  centerY += lineHeight;
              }
              //Draw text in center
              ctx.fillText(line, centerX, centerY);
          }
      }
      });

      if(this._shotAccChartObject === '' && this._passAccChartObject === '' && this._duelAccChartObject === '') {

      this._shotAccChartObject = new Chart(shotAccChart, this.createChartOptions(helpers.checkTruthy(helpers.calcPerc(this._data.statistics[0].shots.on, this._data.statistics[0].shots.total))));
      this._passAccChartObject = new Chart(passAccChart, this.createChartOptions(helpers.checkTruthy(this._data.statistics[0].passes.accuracy) + (this._data.statistics[0].passes.accuracy == null ? '' : '%')));
      this._duelAccChartObject = new Chart(duelAccChart, this.createChartOptions(helpers.checkTruthy(helpers.calcPerc(this._data.statistics[0].duels.won, this._data.statistics[0].duels.total))));

      } else {
        // If the char objects already exist - destroy them and create new ones (otherwise new charts could not be created)
        this._shotAccChartObject.destroy();
        this._passAccChartObject.destroy();
        this._duelAccChartObject.destroy();

        this._shotAccChartObject = new Chart(shotAccChart, this.createChartOptions(helpers.checkTruthy(helpers.calcPerc(this._data.statistics[0].shots.on, this._data.statistics[0].shots.total))));
        this._passAccChartObject = new Chart(passAccChart, this.createChartOptions(helpers.checkTruthy(this._data.statistics[0].passes.accuracy) + (this._data.statistics[0].passes.accuracy == null ? '' : '%')));
        this._duelAccChartObject = new Chart(duelAccChart, this.createChartOptions(helpers.checkTruthy(helpers.calcPerc(this._data.statistics[0].duels.won, this._data.statistics[0].duels.total))));
      }
    }

    createChartOptions(text) {
      return {
        type: 'doughnut',
        data: {
          datasets: [{
            // The representation of the percentages in the chart (for example, the shots accuracy percentage out of 100%
            // 65% will represented by one color and 35% by the other color). Removes the '%' symbol for the parseInt method.
            data: [parseInt(text.includes('%') ? text.replace('%', '') : text), 100 - parseInt(text.includes('%') ? text.replace('%', '') : text)],
            backgroundColor: [
              '#12b886',
              '#424a52'
            ],
            borderColor: [
              '#12b886',
              '#424a52',
            ],
          }]
        },
        options: {
           //cutoutPercentage: 40,
          events: [],
          cutout: 60,
          responsive: false,
          elements: {
            center: {
              text: text, // The text to be rendered in the middle of the doughnut chart
              color: '#12b886', // Default is #000000
              fontStyle: 'Oswald', // Default is Arial
              sidePadding: 30, // Default is 20 (as a percentage)
              minFontSize: 40, // Default is 20 (in px), set to false and text will not wrap.
              lineHeight: 25 // Default is 25 (in px), used for when text wraps
            }
          }
        }
      }
    }
}

export default new playerView();