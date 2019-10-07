'use strict';

(function () {

  var keyCodeName = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  var escKeydownHandler = function (evt, action) {
    if (evt.keyCode === keyCodeName.ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  var enterKeydownHandler = function (evt, action) {
    if (evt.keyCode === keyCodeName.ENTER_KEYCODE) {
      action();
    }
  };

  var templateErrorPopup = document.querySelector('#error').content.querySelector('.error');
  var main = document.body.querySelector('main');

  var createPopupError = function (errorMessage) {
    var errorPopup = templateErrorPopup.cloneNode(true);
    var message = errorPopup.querySelector('.error__message');
    message.textContent = errorMessage;
    var button = errorPopup.querySelector('.error__button');

    var clickHandler = function () {
      errorPopup.remove();
    };

    var escPressHandler = function (evt) {
      window.util.escKeydownHandler(evt, clickHandler);
      document.removeEventListener('keydown', escPressHandler);
    };

    button.addEventListener('click', clickHandler);
    document.addEventListener('keydown', escPressHandler);
    errorPopup.addEventListener('click', clickHandler);

    main.insertAdjacentElement('afterbegin', errorPopup);
    button.focus();
  };

  window.util = {
    escKeydownHandler: escKeydownHandler,
    enterKeydownHandler: enterKeydownHandler,
    createPopupError: createPopupError
  };

})();
