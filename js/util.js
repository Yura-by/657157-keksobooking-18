'use strict';

(function () {

  var getRandomNumber = function (maxValue, minValue) {
    var result = Math.floor(Math.random() * (maxValue + 1));
    if (minValue) {
      while (result <= minValue) {
        result = Math.floor(Math.random() * (maxValue + 1));
      }
    }
    return result;
  };

  var getRandomLengthArray = function (array) {
    var resultArray = array.slice();
    resultArray.length = getRandomNumber(array.length);
    return resultArray;
  };

  var getRandomElementFromArray = function (elements) {
    return elements[getRandomNumber(elements.length - 1)];
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomLengthArray: getRandomLengthArray,
    getRandomElementFromArray: getRandomElementFromArray
  };

})();
