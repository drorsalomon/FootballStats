import View from "./View.js";


class teamBtnView extends View {
    _parentElement = document.querySelector('.teams__list');
    _parentElementCanvas = document.querySelector('.teams__list--canvas');
    _ddBtn = document.querySelector('.teams__dd--btn');
    _ddBtnCanvas = document.querySelector('.teams__dd--btn--canvas');

    _generateMarkup() {  
        return `<li><a class="dropdown-item" href="#">${this._data.team.name}</a></li>`;
     }
}

export default new teamBtnView();