'use strict';

(function () {

  window.Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  window.Coordinate.prototype = {

    setX: function (x) {
      this.x = x;
    },

    setY: function (y) {
      this.y = y;
    }
  };

})();
