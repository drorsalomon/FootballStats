export default class View {
  _data;

  // Render the reviewed data with the _generateMarkup() class method. data comes as either an object or an array.
  render(data, canvas = false, reverse = false) {
    this.clear(canvas);

    if (Array.isArray(data)) {
      // Render teams or seasons list content
      data.forEach((el) => {
        this._data = el;
        this.executeRender(canvas, reverse);
      });
    } else {
      this._data = data;
      this.executeRender(canvas, reverse);
    }
  }

  // Rendering options: canvas = the offCanvas for mobile, reverse = some arrays need to be rendered beforeend to keep abc order
  executeRender(canvas, reverse) {
    const markup = this._generateMarkup();
    if (canvas && reverse) {
      this._parentElement.insertAdjacentHTML("beforeend", markup);
      this._parentElementCanvas.insertAdjacentHTML("beforeend", markup);
    } else if (canvas && !reverse) {
      this._parentElement.insertAdjacentHTML("afterbegin", markup);
      this._parentElementCanvas.insertAdjacentHTML("afterbegin", markup);
      } else if (!canvas && reverse) {
        this._parentElement.insertAdjacentHTML("beforeend", markup);
        } else {
          this._parentElement.insertAdjacentHTML("afterbegin", markup);
        }
  }

  renderDdBtnText(text) {
    this._ddBtn.textContent = text;
    this._ddBtnCanvas.textContent = text;
  }

  toggleBtn(toggle = false) {
    if(!toggle) {
      this._ddBtn.style.display = "none";
      this._ddBtnCanvas.style.display = "none";
    } else {
      this._ddBtn.style.display = ""
      this._ddBtnCanvas.style.display = ""
    }
  }

  // Function for updating a View when certain elements change, works with either an array or object
  update(data) {
    let newMarkup;
    if (Array.isArray(data)) {
      newMarkup = [];
      data.forEach((el) => {
        this._data = el;
        const markup = this._generateMarkup();
        newMarkup.push(markup);
      });
    } else {
      newMarkup = this._generateMarkup();
    }
    this.executeUpdate(newMarkup);
  }

  executeUpdate(newMarkup) {
    //console.log(newMarkup);
    // 'createRange()' and 'createContextualFragment()' will convert the markup from a sting to a real DOM node object
    // that we can now manipulate.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //console.log(newDOM);
    // Now we can select all the elements on the DOM object, and add them to an Array
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    // Here we select all the elements that are currently on the page, so we can compare them to the new DOM elements.
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    // We loop over the new DOM array and get the array elements and index
    newElements.forEach((newEl, i) => {
      // The current element is an element on the current elements array
      const curEl = curElements[i];
      // If the new element does NOT equal to the current element, change the current element attributes to the new
      // element attributes. Create an array of the new element attributes, loop over them and set the attribute name
      // and value of the current element to the ones of the new element.
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );

      // If the new element does NOT equal to the current element AND the nodeValue of the first child is a text value,
      // change the textContent of the current element to the textContent of the new element
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '')
      {
        curEl.textContent = newEl.textContent;
      }
    });
  }

  clear(canvas = false) {
    this._parentElement.innerHTML = "";
    if(canvas) this._parentElementCanvas.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const errorModalText = document.querySelector(".error__modal--text");
    const errorModalOpenBtn = document.querySelector(
      ".error__modal__open--btn"
    );
    const errorModalCloseBtn = document.querySelector(
      ".error__modal__close--btn"
    );
    errorModalText.innerHTML = message;
    errorModalOpenBtn.click();
    setTimeout(() => {
      errorModalCloseBtn.click();
    }, 5000);
  }

  renderSpinner(text = this._spinnerText) {
    const markup = `
    <div class="spinner__container">
      <div>
        <div class="spinner-border" role="status"></div>
      </div>
       <div>
        <div class="spinner__text">${text}</div>
       </div>
    </div>
    `;
    this.clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}