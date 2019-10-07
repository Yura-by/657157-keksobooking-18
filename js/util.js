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

  /*map.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    window.util.escKeydownHandler(evt, function);
  });*/

  var templateErrorPopup = document.querySelector('#error').content.querySelector('.error');
  var main = document.body.querySelector('main');

  var createPopupError = function (action) {

    var errorPopup = function (errorMessage) {
      var errorPopup = templateErrorPopup.cloneNode(true);
      var message = errorPopup.querySelector('.error__message');
      message.textContent = errorMessage;
      var button = errorPopup.querySelector('.error__button');
      console.log(action);

      var buttonClickHandler = function () {
        action();
        errorPopup.remove();
      };

      button.addEventListener('click', buttonClickHandler);
      main.insertAdjacentElement('afterbegin', errorPopup);
      button.focus();
    };

    return errorPopup;
  };

  window.util = {
    escKeydownHandler: escKeydownHandler,
    enterKeydownHandler: enterKeydownHandler,
    createPopupError: createPopupError
  };

})();
