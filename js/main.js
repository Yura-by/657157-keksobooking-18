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
    MIN: 2
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

var pinMain = {
  size: {
    WIDTH: 65,
    HEIGHT: 87,
    DEFAULT_HEIGHT: 65
  },
  position: {
    X: 300,
    Y: 200
  }
};

var quantityRooms = {
  OPTION_1: '1',
  OPTION_2: '2',
  OPTION_3: '3',
  OPTION_4: '100'
};

var capacityChildren = {
  CHILD_1: 0,
  CHILD_2: 1,
  CHILD_3: 2,
  CHILD_4: 3
};

var ENTER_KEYCODE = 13;
var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var pinList = map.querySelector('.map__pins');
var templateCard = document.querySelector('#card').content.querySelector('.popup');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var elementsAdForm = adForm.children;
var elementsMapFiltersForm = map.querySelector('.map__filters').children;
var mapPinMain = map.querySelector('.map__pin--main');
var inputAddress = adForm.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

var translateType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

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
        price: getRandomNumber(advertsData.price.MAX, advertsData.price.MIN),
        type: getRandomElementFromArray(advertsData.TYPES),
        rooms: getRandomNumber(advertsData.rooms.MAX, advertsData.rooms.MIN),
        guests: getRandomNumber(advertsData.quests.MAX, advertsData.quests.MIN),
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
    advert.offer.address = advert.location.x + ', ' + advert.location.y;
    adverts.push(advert);
  }
  return adverts;
};

var advertsMokiData = getMokiData(mokiData);

var createFragmentPins = function (pinsInner) {
  for (var j = 0; j < pinsInner.length; j++) {
    var pin = templatePin.cloneNode(true);
    pin.style.left = pinsInner[j].location.x + 'px';
    pin.style.top = pinsInner[j].location.y + 'px';
    pin.querySelector('img').src = pinsInner[j].author.avatar;
    pin.querySelector('img').alt = pinsInner[j].offer.title;
    fragment.appendChild(pin);
  }
  return fragment;
};

var featuresAssembly = function (featuresBox, featuresList) {
  for (var j = 0; j < featuresList.length; j++) {
    featuresBox.children[j].textContent = featuresList[j];
  }
  for (var counter = featuresBox.children.length - 1; counter >= 0; counter--) {
    if (!featuresBox.children[counter].textContent) {
      featuresBox.children[counter].remove();
    }
  }
};

var createPhotosList = function (photosBox, photosSources) {
  if (photosSources.length > 0) {
    photosBox.querySelector('.popup__photo').src = photosSources[0];
    for (var i = 1; i < photosSources.length; i++) {
      var imgClone = photosBox.querySelector('.popup__photo').cloneNode(true);
      imgClone.src = photosSources[i];
      photosBox.appendChild(imgClone);
    }
  } else {
    photosBox.children[0].remove();
  }
};

var createCardElement = function (cardInner, currentIndex) {
  var card = templateCard.cloneNode(true);
  card.querySelector('.popup__title').textContent = cardInner[currentIndex].offer.title;
  card.querySelector('.popup__text--address').textContent = cardInner[currentIndex].offer.address;
  card.querySelector('.popup__text--price').textContent = cardInner[currentIndex].offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = translateType[cardInner[currentIndex].offer.type];
  card.querySelector('.popup__text--capacity').textContent = cardInner[currentIndex].offer.rooms + ' комнаты для ' + cardInner[0].offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'заезд после ' + cardInner[currentIndex].offer.checkin + ', выезд до ' + cardInner[0].offer.checkout;
  featuresAssembly(card.querySelector('.popup__features'), cardInner[currentIndex].offer.features);
  card.querySelector('.popup__description').textContent = cardInner[currentIndex].offer.description;
  createPhotosList(card.querySelector('.popup__photos'), cardInner[currentIndex].offer.photos);
  card.querySelector('.popup__avatar').src = cardInner[currentIndex].author.avatar;
  return card;
};

var startCreateCard = function () {
  var addPinButtonClickHandler = function (pinButton, indexNumber) {

    var pinButtonClickHandler = function () {
      var mapPopup = map.querySelector('.map__card');
      if (mapPopup) {
        mapPopup.remove();
      }
      map.insertBefore(createCardElement(advertsMokiData, indexNumber), mapFiltersContainer);
    };

    pinButton.addEventListener('click', pinButtonClickHandler);
  };

  for (var i = 2; i < pinList.children.length; i++) {
    addPinButtonClickHandler(pinList.children[i], (i - 2));
  }
};

var toggleDisabledAttribute = function (collectionElements, isDisabled) {
  for (var i = 0; i < collectionElements.length; i++) {
    collectionElements[i].disabled = isDisabled;
  }
};

var setAddress = function (isDefault) {
  var pointerHeight = isDefault ? pinMain.size.DEFAULT_HEIGHT / 2 : pinMain.size.HEIGHT;
  inputAddress.value = Math.round(pinMain.position.X + mapPinMain.offsetLeft + pinMain.size.WIDTH / 2) + ', ' + Math.round(pinMain.position.Y + mapPinMain.offsetTop + pointerHeight);
};

var getInactiveState = function () {
  toggleDisabledAttribute(elementsAdForm, true);
  toggleDisabledAttribute(elementsMapFiltersForm, true);
  setAddress(true);
};

getInactiveState();

var getActiveState = function () {
  toggleDisabledAttribute(elementsAdForm);
  toggleDisabledAttribute(elementsMapFiltersForm);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setAddress();
  pinList.appendChild(createFragmentPins(advertsMokiData));
  startCreateCard();
};

mapPinMain.addEventListener('mousedown', function () {
  getActiveState();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    getActiveState();
  }
});

var getCapacityValue = function (value) {
  capacity.value = value + '';
};

var getCapasityOptionDisabled = function (numberChild) {
  capacity.children[numberChild].disabled = true;
};

var cleaningValidityMessage = function () {
  capacity.setCustomValidity('');
  capacity.removeEventListener('invalid', capacityInvalidHandler);
};

var capacityInvalidHandler = function () {
  setTimeout(cleaningValidityMessage, 2000);
};

var getFirstStateCapacity = function () {
  getCapacityValue(capacityChildren.CHILD_2);
  getCapasityOptionDisabled(capacityChildren.CHILD_1);
  getCapasityOptionDisabled(capacityChildren.CHILD_2);
  getCapasityOptionDisabled(capacityChildren.CHILD_4);
};

getFirstStateCapacity();

var capacityChangeHandler = function (evt) {
  for (var i = 0; i < capacity.children.length; i++) {
    capacity.children[i].disabled = false;
  }

  switch (evt.target.value) {
    case quantityRooms.OPTION_1:
      getCapacityValue(capacityChildren.CHILD_2);
      getCapasityOptionDisabled(capacityChildren.CHILD_1);
      getCapasityOptionDisabled(capacityChildren.CHILD_2);
      getCapasityOptionDisabled(capacityChildren.CHILD_4);
      break;
    case quantityRooms.OPTION_2:
      getCapacityValue(capacityChildren.CHILD_3);
      getCapasityOptionDisabled(capacityChildren.CHILD_1);
      getCapasityOptionDisabled(capacityChildren.CHILD_4);
      break;
    case quantityRooms.OPTION_3:
      getCapacityValue(capacityChildren.CHILD_4);
      getCapasityOptionDisabled(capacityChildren.CHILD_4);
      break;
    case quantityRooms.OPTION_4:
      getCapacityValue(capacityChildren.CHILD_1);
      getCapasityOptionDisabled(capacityChildren.CHILD_1);
      getCapasityOptionDisabled(capacityChildren.CHILD_2);
      getCapasityOptionDisabled(capacityChildren.CHILD_3);
  }

  capacity.setCustomValidity('Проверьте, пожалуйста, количество мест для гостей!');
  capacity.addEventListener('invalid', capacityInvalidHandler);
};

roomNumber.addEventListener('change', capacityChangeHandler);
