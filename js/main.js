'use strict';

var ADVERTS_QUANTITY = 8;
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var HOUSING_CHECK_TIMES = ['12:00', '13:00', '14:00'];
var HOUSING_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSING_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var HOUSING_MAX_ADRESS = 1100;
var HOUSING_MIN_ADRESS = 100;
var MAX_PRICE = 50000;
var MIN_PRICE = 1000;
var MAX_ROOMS = 3;
var MIN_ROOMS = 1;
var MAX_QUESTS = 12;
var MIN_QUESTS = 1;
var MAX_PIN_X = 1150;
var MIN_PIN_X = 50;
var MAX_PIN_Y = 630;
var MIN_PIN_Y = 130;

var advertsData = {
  QUANTITY: 8,
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  TIMES: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  price: {
    MAX: 50000,
    MIN: 10000
  },
  rooms: {
    MAX: 3,
    MIN: 1
  },
  quests: {
    MAX: 12,
    MIN: 1
  },
  pinCoordinates: {
    X: {
      MAX: 1150,
      MIN: 50
    },
    Y: {
      MAX: 630,
      MIN: 130
    }
  }
};

var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var pinList = document.querySelector('.map__pins');

var getRandomNumber = function (maxValue, minValue) {
  var result = Math.floor(Math.random() * (maxValue + 1));
  if (minValue) {
    while (result <= minValue) {
      result = Math.floor(Math.random() * (maxValue + 1));
    }
  }
  return result;
};

var getMokiData = function (housingTypes, housingChecktimes, housingFeatures, housingPhotos) {
  var adverts = [];
  for (var i = 0; i < ADVERTS_QUANTITY; i++) {
    var featuresList = [];
    for (var counter = 0; counter < getRandomNumber(housingFeatures.length); counter++) {
      featuresList.push(housingFeatures[counter]);
    }
    var photosList = [];
    for (var counterPhoto = 0; counterPhoto < getRandomNumber(housingPhotos.length); counterPhoto++) {
      photosList.push(housingPhotos[counterPhoto]);
    }
    var advert = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },

      offer: {
        title: 'Отличный выбор',
        adress: getRandomNumber(HOUSING_MAX_ADRESS, HOUSING_MIN_ADRESS) + ', ' + getRandomNumber(HOUSING_MAX_ADRESS, HOUSING_MIN_ADRESS),
        price: getRandomNumber(MAX_PRICE, MIN_PRICE),
        type: housingTypes[getRandomNumber(housingTypes.length - 1)],
        rooms: getRandomNumber(MAX_ROOMS, MIN_ROOMS),
        quests: getRandomNumber(MAX_QUESTS, MIN_QUESTS),
        checkin: housingChecktimes[getRandomNumber(housingChecktimes.length - 1)],
        checkout: housingChecktimes[getRandomNumber(housingChecktimes.length - 1)],
        features: featuresList,
        description: '',
        photos: photosList
      },

      location: {
        x: getRandomNumber(MAX_PIN_X, MIN_PIN_X),
        y: getRandomNumber(MAX_PIN_Y, MIN_PIN_Y)
      }
    };
    adverts.push(advert);
  }
  return adverts;
};

map.classList.remove('map--faded');

var renderPin = function (pinData) {
  var pin = templatePin.cloneNode(true);
  pin.style.left = pinData.location.x + 'px';
  pin.style.top = pinData.location.y + 'px';
  pin.querySelector('img').src = pinData.author.avatar;
  pin.querySelector('img').alt = pinData.offer.title;
  return pin;
};

var addElement = function (housingTypes, housingChecktime, housingFeatures, housingPhotos) {
  var pins = getMokiData(housingTypes, housingChecktime, housingFeatures, housingPhotos);
  for (var j = 0; j < pins.length; j++) {
    fragment.appendChild(renderPin(pins[j]));
  }
};

addElement(HOUSING_TYPES, HOUSING_CHECK_TIMES, HOUSING_FEATURES, HOUSING_PHOTOS);

pinList.appendChild(fragment);
