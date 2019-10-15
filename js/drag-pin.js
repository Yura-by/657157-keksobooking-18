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
        x: 0,
        y: 0
      };

      switch (true) {
        case (coordsCalculate.left >= PinCoordinate.X.MIN && coordsCalculate.left <= PinCoordinate.X.MAX) :
          resultCoords.x = coordsCalculate.left;
          break;
        case (coordsCalculate.left < PinCoordinate.X.MIN) :
          resultCoords.x = PinCoordinate.X.MIN;
          break;
        case (coordsCalculate.left > PinCoordinate.X.MAX) :
          resultCoords.x = PinCoordinate.X.MAX;
          break;
      }

      switch (true) {
        case (coordsCalculate.top >= PinCoordinate.Y.MIN && coordsCalculate.top <= PinCoordinate.Y.MAX) :
          resultCoords.y = coordsCalculate.top;
          break;
        case (coordsCalculate.top < PinCoordinate.Y.MIN) :
          resultCoords.y = PinCoordinate.Y.MIN;
          break;
        case (coordsCalculate.top > PinCoordinate.Y.MAX) :
          resultCoords.y = PinCoordinate.Y.MAX;
          break;
      }

      window.map.pinMain.style.left = resultCoords.x + 'px';
      window.map.pinMain.style.top = resultCoords.y + 'px';

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
