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

    var removePopup = function () {
      errorPopup.remove();
      document.removeEventListener('keydown', escPressHandler);
    };

    var escPressHandler = function (evt) {
      window.util.escKeydownHandler(evt, function () {
        removePopup();
      });
    };

    button.addEventListener('click', function () {
      removePopup();
    });

    document.addEventListener('keydown', escPressHandler);

    errorPopup.addEventListener('click', function () {
      removePopup();
    });

    main.insertAdjacentElement('afterbegin', errorPopup);
    button.focus();
  };

  var createSuccess = function () {
    var successPopup = templateSccessPopup.cloneNode(true);

    var removePopup = function () {
      successPopup.remove();
      document.removeEventListener('keydown', escPressHandler);
    };

    var escPressHandler = function (evt) {
      window.util.escKeydownHandler(evt, function () {
        removePopup();
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
