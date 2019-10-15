'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var KeyName = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  var escKeydownHandler = function (evt, action) {
    if (evt.keyCode === KeyName.ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  var enterKeydownHandler = function (evt, action) {
    if (evt.keyCode === KeyName.ENTER_KEYCODE) {
      action();
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    escKeydownHandler: escKeydownHandler,
    enterKeydownHandler: enterKeydownHandler,
    debounce: debounce
  };

})();
