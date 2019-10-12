'use strict';

(function () {

  var formFilter = document.querySelector('.map__filters');
  var type = formFilter.querySelector('#housing-type');
  var price = formFilter.querySelector('#housing-price');
  var rooms = formFilter.querySelector('#housing-rooms');
  var guests = formFilter.querySelector('#housing-guests');
  var featuresBox = formFilter.querySelector('.map__features');
  var inputsFeature = formFilter.querySelectorAll('input');
  var ANY = 'any';

  var getArrayFeatures = function () {
    return [].filter.call(featuresBox.children, function (it) {
      return it.checked === true;
    }).map(function (it) {
      return it.value;
    });
  };

  var getAskFeatures = function (challenger, featuresList) {
    if (featuresList.length === 0) {
      return true
    }
    var counter = 0;
    featuresList.forEach(function (feature) {
      challenger.offer.features.forEach(function (it) {
        if (feature === it) {
          counter ++;
        }
      });
    });
    if (counter === featuresList.length) {
      return true;
    }
  };

  var getAskPrice = function (element) {
    var priceAd = element.offer.price;
    if (price.value === ANY) {
      return true
    }
    if (price.value === 'middle') {
      return priceAd >= 10000 && priceAd < 50000;
    }
    if (price.value === 'low') {
      return priceAd < 10000
    }
    if (price.value === 'high') {
      return priceAd >= 50000
    }
  };

  var getAskType = function (element) {
    if (type.value === ANY) {
      return true;
    }
    if (element.offer.type === type.value) {
      return true;
    }
  };

  var getAskRooms = function (element) {
    if (rooms.value === ANY) {
      return true;
    }
    if (rooms.value === (element.offer.rooms + '')) {
      return true;
    }
  };

  var getAskGuests = function (element) {
    if (guests.value === ANY) {
      return true;
    }
    if (guests.value === (element.offer.guests + '')) {
      return true;
    }
  };

  var updatePins = function () {
    var featuresSelected = getArrayFeatures();
    var adsFiltered = window.map.ads.filter(function (ad) {
      return getAskType(ad) &&
      getAskPrice(ad) &&
      getAskRooms(ad) &&
      getAskGuests(ad) &&
      getAskFeatures(ad, featuresSelected);
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

  inputsFeature.forEach(function (input) {
    input.addEventListener('change', changeClickHandler);
  });

  window.filter = {
    formFilter: formFilter
  };

})();
