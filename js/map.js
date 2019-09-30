'use strict';

(function () {

  var keyCodeName = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
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

  var typeHousing = {
    translateType: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },

    minPrice: {
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalo: 0
    }
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var templateCard = document.querySelector('#card').content.querySelector('.popup');
  var fragment = document.createDocumentFragment();
  var pinList = map.querySelector('.map__pins');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var elementsMapFiltersForm = map.querySelector('.map__filters').children;
  var adForm = document.querySelector('.ad-form');
  var elementsAdForm = adForm.children;
  var inputAddress = adForm.querySelector('#address');
  window.map = {
    adForm: adForm,
    elementsAdForm: elementsAdForm,
    typeHousing: typeHousing
  };

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
    card.querySelector('.popup__type').textContent = typeHousing.translateType[cardInner[currentIndex].offer.type];
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
        map.insertBefore(createCardElement(window.data.advertsMokiData, indexNumber), mapFiltersContainer);
        var newMapPopup = map.querySelector('.popup');
        var buttonClosePopup = newMapPopup.querySelector('.popup__close');
        buttonClosePopup.addEventListener('click', function () {
          newMapPopup.remove();
        });

        var popupEscHandler = function (evt) {
          evt.preventDefault();
          if (evt.keyCode === keyCodeName.ESC_KEYCODE) {
            newMapPopup.remove();
            document.removeEventListener('keydown', popupEscHandler);
          }
        };

        document.addEventListener('keydown', popupEscHandler);
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
    pinList.appendChild(createFragmentPins(window.data.advertsMokiData));
    startCreateCard();
  };

  mapPinMain.addEventListener('mousedown', function () {
    getActiveState();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keyCodeName.ENTER_KEYCODE) {
      getActiveState();
    }
  });

})();