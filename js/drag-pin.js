'use strict';

(function () {

  var pinCoordinates = {
    X: {
      MAX: 1137,
      MIN: 0
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
        left: window.map.mapPinMain.offsetLeft - shift.x,
        top: window.map.mapPinMain.offsetTop - shift.y
      };

      var resultCoords = {
        X: 0,
        Y: 0
      };

      if (coordsCalculate.left >= pinCoordinates.X.MIN && coordsCalculate.left <= pinCoordinates.X.MAX) {
        resultCoords.X = coordsCalculate.left;
      } else if (coordsCalculate.left < pinCoordinates.X.MIN) {
        resultCoords.X = pinCoordinates.X.MIN;
      } else if (coordsCalculate.left > pinCoordinates.X.MAX) {
        resultCoords.X = pinCoordinates.X.MAX;
      }

      if (coordsCalculate.top >= pinCoordinates.Y.MIN && coordsCalculate.top <= pinCoordinates.Y.MAX) {
        resultCoords.Y = coordsCalculate.top;
      } else if (coordsCalculate.top < pinCoordinates.Y.MIN) {
        resultCoords.Y = pinCoordinates.Y.MIN;
      } else if (coordsCalculate.top > pinCoordinates.Y.MAX) {
        resultCoords.Y = pinCoordinates.Y.MAX;
      }

      window.map.mapPinMain.style.left = resultCoords.X + 'px';
      window.map.mapPinMain.style.top = resultCoords.Y + 'px';

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
  }

})();
