ADVERTS_QUANTITY = 8;
HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
HOUSING_CHECK_TIME = ['12:00', '13:00', '14:00'];
HOUSING_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
HOUSING_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
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
}

var getMokiData = function (housingTypes, housingChecktime, housingFeatures, housingPhotos) {
  var adverts = [];
  for (var i = 0; i < ADVERTS_QUANTITY; i++) {
    var advert = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) +'.png'
      },

      offer: {
        title: 'Best',
        adress: getRandomNumber(1180, 20) + ', ' + getRandomNumber(1180, 20),
        price: getRandomNumber(10000, 2000),
        type: housingTypes[getRandomNumber(housingTypes.length - 1)],
        rooms: getRandomNumber(6, 1),
        quests: getRandomNumber(12, 1),
        checkin: housingChecktime[getRandomNumber(housingChecktime.length - 1)],
        checkout: housingChecktime[getRandomNumber(housingChecktime.length - 1)],
        features: housingFeatures,
        description: '',
        photos: housingPhotos
      },

      location: {
        x: getRandomNumber(1150, 50),
        y: getRandomNumber(630, 130)
      }
    };
    adverts.push(advert);
  }
  return adverts;
}

map.classList.remove('map--faded');

var renderPin = function (pinData) {
  var pin = templatePin.cloneNode(true);
  pin.style.left = pinData.location.x + 'px';
  pin.style.top = pinData.location.y + 'px';
  pin.querySelector('img').src = pinData.author.avatar;
  pin.querySelector('img').alt = pinData.offer.title;
  return pin;
}

var addElement = function (housingTypes, housingChecktime, housingFeatures, housingPhotos) {
  var pins = getMokiData(housingTypes, housingChecktime, housingFeatures, housingPhotos);

  for (var j = 0; j < pins.length; j++) {
    fragment.appendChild(renderPin(pins[j]));
  }
}

addElement(HOUSING_TYPES, HOUSING_CHECK_TIME, HOUSING_FEATURES, HOUSING_PHOTOS);

pinList.appendChild(fragment);

console.log(getMokiData(HOUSING_TYPES, HOUSING_CHECK_TIME, HOUSING_FEATURES, HOUSING_PHOTOS));
