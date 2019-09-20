ADVERTS_QUANTITY = 8;
var getRandomNumber = function (maxValue, minValue) {
  var result = Math.floor(Math.random() * maxValue + 1);
  if (minValue) {
    while (result <= minValue) {
    result = Math.floor(Math.random() * maxValue + 1);
    }
  }
  return result;
}

var getMokiData = function () {
  var adverts = [];
  for (var i = 0; i < ADVERTS_QUANTITY; i++) {
    var advert = {};
    advert.authot = 'img/avatars/user' + '0' + (i + 1) +'.png';
    adverts.push(advert);

  }
  return adverts;
}

console.log(getMokiData());
