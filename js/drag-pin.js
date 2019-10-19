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

    var startCoords = new window.Coordinate(evt.clientX, evt.clientY);

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = new window.Coordinate((startCoords.x - moveEvt.clientX), (startCoords.y - moveEvt.clientY));

      startCoords.setX(moveEvt.clientX);
      startCoords.setY(moveEvt.clientY);

      var coordsCalculate = new window.Coordinate((window.map.pinMain.offsetLeft - shift.x), window.map.pinMain.offsetTop - shift.y);

      var resultCoords = new window.Coordinate(0, 0);

      switch (true) {
        case (coordsCalculate.x >= PinCoordinate.X.MIN && coordsCalculate.x <= PinCoordinate.X.MAX) :
          resultCoords.x = coordsCalculate.x;
          break;
        case (coordsCalculate.x < PinCoordinate.X.MIN) :
          resultCoords.x = PinCoordinate.X.MIN;
          break;
        case (coordsCalculate.x > PinCoordinate.X.MAX) :
          resultCoords.x = PinCoordinate.X.MAX;
          break;
      }

      switch (true) {
        case (coordsCalculate.y >= PinCoordinate.Y.MIN && coordsCalculate.y <= PinCoordinate.Y.MAX) :
          resultCoords.y = coordsCalculate.y;
          break;
        case (coordsCalculate.y < PinCoordinate.Y.MIN) :
          resultCoords.y = PinCoordinate.Y.MIN;
          break;
        case (coordsCalculate.y > PinCoordinate.Y.MAX) :
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
