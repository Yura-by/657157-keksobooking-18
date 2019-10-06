'use strict';

(function () {

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
    createPopupError: createPopupError
  };

})();
