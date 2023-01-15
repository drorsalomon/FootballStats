import View from "./View.js";

class paginationView extends View {
  _parentElement = document.querySelector(".results__pages");
  _pageBtn = document.querySelector(".pages__btn");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest('.pages__btn');
      if(btn) {
      handler(parseInt(btn.dataset.goto, 10));
    }
    });
  }

  _createButton(page, type) {
    if (type === "next") {
      return `
       <button class="btn btn-outline pages__btn" data-goto="${page + 1}">
         <div>
             PAGE ${page + 1}
         </div>
         <svg xmlns="http://www.w3.org/2000/svg" class="arrow__icon--right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
         </svg>
        </button> 
   `;
    } else if (type === "prev") {
      return ` 
    <button class="btn btn-outline pages__btn" data-goto="${page - 1}">
      <svg xmlns="http://www.w3.org/2000/svg" class="arrow__icon--left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
        <div>
             PAGE ${page - 1}
        </div>
    </button>
    `;
    }
  }

  renderButtons(page, numResults, resultsPerPage) {
    const pages = Math.ceil(numResults / resultsPerPage);
    let button;
    if (page === 1 && pages === 1) {
      return;
    } else if (page === 1 && pages > 1) {
      button = this._createButton(page, "next");
    } else if (page < pages) {
      button = `${this._createButton(page, "prev")}
                ${this._createButton(page, "next")}`;
    } else if (page === pages && pages > 1) {
      button = this._createButton(page, "prev");
    }
    this._parentElement.insertAdjacentHTML("afterbegin", button);
  }
}

export default new paginationView();
