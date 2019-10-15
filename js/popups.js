'use strict';

(function () {

  var templateErrorPopup = document.querySelector('#error').content.querySelector('.error');
  var main = document.body.querySelector('main');
  var templateSccessPopup = document.querySelector('#success').content.querySelector('.success');

  var createError = function (errorMessage) {
    var errorPopup = templateErrorPopup.cloneNode(true);
    var message = errorPopup.querySelector('.error__message');
    message.textContent = errorMessage;
    var button = errorPopup.querySelector('.error__button');

    var clickHandler = function () {
      errorPopup.remove();
    };

    var escPressHandler = function (evt) {
      window.util.escKeydownHandler(evt, function () {
        clickHandler();
        document.removeEventListener('keydown', escPressHandler);
      });
    };

    button.addEventListener('click', clickHandler);
    document.addEventListener('keydown', escPressHandler);
    errorPopup.addEventListener('click', clickHandler);

    main.insertAdjacentElement('afterbegin', errorPopup);
    button.focus();
  };

  var createSuccess = function () {
    var successPopup = templateSccessPopup.cloneNode(true);

    var removePopup = function () {
      successPopup.remove();
    };

    var escPressHandler = function (evt) {
      window.util.escKeydownHandler(evt, function () {
        removePopup();
        document.removeEventListener('keydown', escPressHandler);
      });
    };

    document.addEventListener('keydown', escPressHandler);

    successPopup.addEventListener('click', removePopup);
    main.insertAdjacentElement('afterbegin', successPopup);
  };

  window.popups = {
    createSuccess: createSuccess,
    createError: createError
  };

})();
