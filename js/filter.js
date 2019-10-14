'use strict';

(function () {


  var ANY = 'any';
  var Price = {
    number: {
      LOW: 10000,
      HIGH: 50000
    },
    value: {
      LOW: 'low',
      MIDDLE: 'middle',
      HIGH: 'high'
    }
  };
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
      case (price.value === Price.value.LOW):
        return priceAd < Price.number.LOW;
      case (price.value === Price.value.MIDDLE):
        return priceAd >= Price.number.LOW && priceAd < Price.number.HIGH;
      case (price.value === Price.value.HIGH):
        return priceAd >= Price.number.HIGH;
    }
    return false;
  };

  var getAskType = function (element) {
    return type.value === ANY || type.value === element.offer.type;
  };

  var getAskRooms = function (element) {
    return rooms.value === ANY || rooms.value === element.offer.rooms + '';
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
