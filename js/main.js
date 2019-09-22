'use strict';

var mokiData = {
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
      MIN: 0
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

var getRandomLengthArray = function (array) {
  var resultArray = array.slice();
  resultArray.length = getRandomNumber(array.length);
  return resultArray;
};

var getRandomElementFromArray = function (elements) {
  return elements[getRandomNumber(elements.length - 1)];
};

var getMokiData = function (advertsData) {
  var adverts = [];
  for (var i = 0; i < advertsData.QUANTITY; i++) {
    var advert = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },

      offer: {
        title: getRandomElementFromArray(advertsData.TYPES),
        adress: '',
        price: getRandomNumber(advertsData.price.MAX, advertsData.price.MIN),
        type: getRandomElementFromArray(advertsData.TYPES),
        rooms: getRandomNumber(advertsData.rooms.MAX, advertsData.rooms.MIN),
        quests: getRandomNumber(advertsData.quests.MAX, advertsData.quests.MIN),
        checkin: getRandomElementFromArray(advertsData.TIMES),
        checkout: getRandomElementFromArray(advertsData.TIMES),
        features: getRandomLengthArray(advertsData.FEATURES),
        description: getRandomElementFromArray(advertsData.TYPES),
        photos: getRandomLengthArray(advertsData.PHOTOS)
      },

      location: {
        x: getRandomNumber(advertsData.pinCoordinates.X.MAX, advertsData.pinCoordinates.X.MIN),
        y: getRandomNumber(advertsData.pinCoordinates.Y.MAX, advertsData.pinCoordinates.Y.MIN)
      }
    };
    advert.adress = advert.location.x + ', ' + advert.location.y;
    adverts.push(advert);
  }
  return adverts;
};

map.classList.remove('map--faded');



/*ОБЪЕДИНЕННЕАЯ ФУНКЦИЯ ПОЛУЧЕНИЯ ФРАГМЕНТА var createFragmentPins = function (pinsData) {
  var pinsInner = getMokiData(pinsData);
  for (var j = 0; j < pinsInner.length; j++) {
    var pin = templatePin.cloneNode(true);
    pin.style.left = pinsInner[j].location.x + 'px';
    pin.style.top = pinsInner[j].location.y + 'px';
    pin.querySelector('img').src = pinsInner[j].author.avatar;
    pin.querySelector('img').alt = pinsInner[j].offer.title;
    fragment.appendChild(pin);
  }
  return fragment;
};*/





var renderPin = function (pinData) {
  var pin = templatePin.cloneNode(true);
  pin.style.left = pinData.location.x + 'px';
  pin.style.top = pinData.location.y + 'px';
  pin.querySelector('img').src = pinData.author.avatar;
  pin.querySelector('img').alt = pinData.offer.title;
  return pin;
};

var addPins = function (pinsInside) {
  var pins = getMokiData(pinsInside);
  for (var j = 0; j < pins.length; j++) {
    fragment.appendChild(renderPin(pins[j]));
  }
};

addPins(mokiData);

pinList.appendChild(fragment);
