'use strict';

(function () {

  var ANY = 'any';
  var Price = {
    NUMBER: {
      LOW: 10000,
      HIGH: 50000
    },
    VALUE: {
      LOW: 'low',
      MIDDLE: 'middle',
      HIGH: 'high'
    }
  };
  var form = document.querySelector('.map__filters');
  var type = form.querySelector('#housing-type');
  var price = form.querySelector('#housing-price');
  var rooms = form.querySelector('#housing-rooms');
  var guests = form.querySelector('#housing-guests');
  var featuresChoosers = form.querySelectorAll('input[name="features"]');

  var getArrayFeatures = function () {
    return [].filter.call(featuresChoosers, function (it) {
      return it.checked === true;
    }).map(function (it) {
      return it.value;
    });
  };

  var getAskFeatures = function (challenger, featuresList) {
    if (featuresList.length === 0) {
      return true;
    }
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
  };

  var getAskPrice = function (element) {
    var priceAd = element.offer.price;
    switch (true) {
      case (price.value === ANY):
        return true;
      case (price.value === Price.VALUE.LOW):
        return priceAd < Price.NUMBER.LOW;
      case (price.value === Price.VALUE.MIDDLE):
        return priceAd >= Price.NUMBER.LOW && priceAd < Price.NUMBER.HIGH;
      case (price.value === Price.VALUE.HIGH):
        return priceAd >= Price.NUMBER.HIGH;
    }
    return false;
  };

  var getAskRooms = function (element) {
    return rooms.value === ANY || rooms.value === element.offer.rooms + '';
  };

  var getAskType = function (element) {
    return type.value === ANY || type.value === element.offer.type;
  };

  var getAskGuests = function (element) {
    return guests.value === ANY || guests.value === element.offer.guests + '';
  };

  var updatePins = function () {
    var featuresChecked = getArrayFeatures();
    var adsFiltered = window.map.ads.filter(function (ad) {
      return getAskType(ad) &&
      getAskPrice(ad) &&
      getAskRooms(ad) &&
      getAskGuests(ad) &&
      getAskFeatures(ad, featuresChecked);
    });

    window.map.renderPins(adsFiltered);
  };

  var inputChangeHandler = window.util.debounce(function () {
    updatePins();
  });
  var typeChangeHandler = window.util.debounce(function () {
    updatePins();
  });
  var priceChangeHandler = window.util.debounce(function () {
    updatePins();
  });
  var roomsChangeHandler = window.util.debounce(function () {
    updatePins();
  });
  var guestsChangeHandler = window.util.debounce(function () {
    updatePins();
  });

  type.addEventListener('change', typeChangeHandler);
  price.addEventListener('change', priceChangeHandler);
  rooms.addEventListener('change', roomsChangeHandler);
  guests.addEventListener('change', guestsChangeHandler);

  featuresChoosers.forEach(function (input) {
    input.addEventListener('change', inputChangeHandler);
  });

  window.filter = {
    form: form
  };

})();
