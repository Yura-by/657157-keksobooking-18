'use strict';

(function () {

  var PinCoordinate = {
    X: {
      MAX: 1169,
      MIN: -31
    },
    Y: {
      MAX: 630,
      MIN: 130
    }
  };

  var pinMainMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordsCalculate = {
        left: window.map.pinMain.offsetLeft - shift.x,
        top: window.map.pinMain.offsetTop - shift.y
      };

      var resultCoords = {
        X: 0,
        Y: 0
      };

      if (coordsCalculate.left >= PinCoordinate.X.MIN && coordsCalculate.left <= PinCoordinate.X.MAX) {
        resultCoords.X = coordsCalculate.left;
      } else if (coordsCalculate.left < PinCoordinate.X.MIN) {
        resultCoords.X = PinCoordinate.X.MIN;
      } else if (coordsCalculate.left > PinCoordinate.X.MAX) {
        resultCoords.X = PinCoordinate.X.MAX;
      }

      if (coordsCalculate.top >= PinCoordinate.Y.MIN && coordsCalculate.top <= PinCoordinate.Y.MAX) {
        resultCoords.Y = coordsCalculate.top;
      } else if (coordsCalculate.top < PinCoordinate.Y.MIN) {
        resultCoords.Y = PinCoordinate.Y.MIN;
      } else if (coordsCalculate.top > PinCoordinate.Y.MAX) {
        resultCoords.Y = PinCoordinate.Y.MAX;
      }

      window.map.pinMain.style.left = resultCoords.X + 'px';
      window.map.pinMain.style.top = resultCoords.Y + 'px';

      window.map.setAddress();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.dragPin = {
    pinMainMouseDownHandler: pinMainMouseDownHandler
  };

})();
