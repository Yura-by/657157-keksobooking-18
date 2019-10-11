'use strict';

(function () {

  var KeyCodeName = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  var escKeydownHandler = function (evt, action) {
    if (evt.keyCode === KeyCodeName.ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  var enterKeydownHandler = function (evt, action) {
    if (evt.keyCode === KeyCodeName.ENTER_KEYCODE) {
      action();
    }
  };

  window.util = {
    escKeydownHandler: escKeydownHandler,
    enterKeydownHandler: enterKeydownHandler
  };

})();
