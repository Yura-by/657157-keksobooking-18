'use strict';

(function () {

  var Price = {
    LOW: 10000,
    MIDDLE: 50000
  };
  var ANY = 'any';
  var formFilter = document.querySelector('.map__filters');
  var type = formFilter.querySelector('#housing-type');
  var price = formFilter.querySelector('#housing-price');
  var rooms = formFilter.querySelector('#housing-rooms');
  var guests = formFilter.querySelector('#housing-guests');
  var inputsFeatures = formFilter.querySelectorAll('input[name="features"]');

  var getArrayFeatures = function () {
    return [].filter.call(inputsFeatures, function (it) {
      return it.checked === true;
    }).map(function (it) {
      return it.value;
    });
  };

  var getAskFeatures = function (challenger, featuresList) {
    if (featuresList.length === 0) {
      return true;
    } else {
      var counter = 0;
      featuresList.forEach(function (feature) {
        challenger.offer.features.forEach(function (it) {
          if (feature === it) {
            counter++;
          }
        });
      });
      if (counter === featuresList.length) {
        return true;
      }
      return false;
    }
  };

  var getAskPrice = function (element) {
    var priceAd = element.offer.price;

    switch (true) {
      case (price.value === 'low'):
        return priceAd < Price.LOW;
      case (price.value === ANY):
        return true;
      case (price.value === 'middle'):
        return priceAd >= Price.LOW && priceAd < Price.MIDDLE;
      case (price.value === 'high'):
        return priceAd >= Price.MIDDLE;
      default :
        return false;
    }

  };

  var getAskType = function (element) {

    switch (type.value) {
      case ANY:
        return true;
      case element.offer.type:
        return true;
      default :
        return false;
    }

  };

  var getAskRooms = function (element) {

    switch (rooms.value) {
      case ANY:
        return true;
      case element.offer.rooms + '':
        return true;
      default :
        return false;
    }

  };

  var getAskGuests = function (element) {

    switch (guests.value) {
      case ANY:
        return true;
      case element.offer.guests + '':
        return true;
      default :
        return false;
    }

  };

  var updatePins = function () {
    var adsFiltered = window.map.ads.filter(function (ad) {
      return getAskType(ad) &&
      getAskPrice(ad) &&
      getAskRooms(ad) &&
      getAskGuests(ad) &&
      getAskFeatures(ad, getArrayFeatures());
    });

    window.map.renderPins(adsFiltered);
  };

  var changeClickHandler = window.util.debounce(function () {
    updatePins();
  });

  type.addEventListener('change', changeClickHandler);
  price.addEventListener('change', changeClickHandler);
  rooms.addEventListener('change', changeClickHandler);
  guests.addEventListener('change', changeClickHandler);

  inputsFeatures.forEach(function (input) {
    input.addEventListener('change', changeClickHandler);
  });

  window.filter = {
    formFilter: formFilter
  };

})();
