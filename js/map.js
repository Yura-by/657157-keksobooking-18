'use strict';

(function () {

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

  /*var typeHousing = {
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
  }; card.js*/

  //var INDEX_PIN_FIRST = 2; card.js
  //var map = document.querySelector('.map'); card.js
  var mapPinMain = window.card.map.querySelector('.map__pin--main');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  //var templateCard = document.querySelector('#card').content.querySelector('.popup'); card.js
  var fragment = document.createDocumentFragment();
  //var pinList = window.card.map.querySelector('.map__pins'); card.js
  //var mapFiltersContainer = map.querySelector('.map__filters-container'); card.js
  var elementsMapFiltersForm = window.card.map.querySelector('.map__filters').children;
  var adForm = document.querySelector('.ad-form');
  var elementsAdForm = adForm.children;
  var inputAddress = adForm.querySelector('#address');

  var setAddress = function (isDefault) {
    var pointerHeight = isDefault ? pinMain.size.DEFAULT_HEIGHT / 2 : pinMain.size.HEIGHT;
    inputAddress.value = Math.round(pinMain.position.X + mapPinMain.offsetLeft + pinMain.size.WIDTH / 2) + ', ' + Math.round(pinMain.position.Y + mapPinMain.offsetTop + pointerHeight);
  };

  window.map = {
    adForm: adForm,
    elementsAdForm: elementsAdForm,
    //typeHousing: typeHousing, card.js
    mapPinMain: mapPinMain,
    setAddress: setAddress
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

  /*var featuresAssembly = function (featuresBox, featuresList) {
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

  var removeCard = function () {
    var mapPopup = map.querySelector('.map__card');
    if (mapPopup) {
      mapPopup.remove();
    }
  };

  var startCreateCard = function (advertsData) {
    var addPinButtonClickHandler = function (pinButton, indexNumber) {

      var pinButtonClickHandler = function () {
        removeCard();
        map.insertBefore(createCardElement(advertsData, indexNumber), mapFiltersContainer);
        var newMapPopup = map.querySelector('.popup');
        var buttonClosePopup = newMapPopup.querySelector('.popup__close');
        buttonClosePopup.addEventListener('click', function () {
          newMapPopup.remove();
        });

        var removePopup = function () {
          newMapPopup.remove();
          document.removeEventListener('keydown', popupEscHandler);
        };

        var popupEscHandler = function (evt) {
          window.util.escKeydownHandler(evt, removePopup);
        };

        document.addEventListener('keydown', popupEscHandler);
      };

      pinButton.addEventListener('click', pinButtonClickHandler);
    };

    for (var i = INDEX_PIN_FIRST; i < pinList.children.length; i++) {
      addPinButtonClickHandler(pinList.children[i], (i - 2));
    }
  };card.js*/

  var toggleDisabledAttribute = function (collectionElements, isDisabled) {
    for (var i = 0; i < collectionElements.length; i++) {
      collectionElements[i].disabled = isDisabled;
    }
  };

  var mapPinMainMoseDownHandler = function () {
    window.backend.load(getActiveState, window.popups.createPopupError);
  };

  var mapPinMainKeydownHandler = function (evt) {
    window.util.enterKeydownHandler(evt, mapPinMainMoseDownHandler);
  };

  var getDefaultState = function () {
    toggleDisabledAttribute(elementsAdForm, true);
    toggleDisabledAttribute(elementsMapFiltersForm, true);
    setAddress(true);
    mapPinMain.addEventListener('mousedown', mapPinMainMoseDownHandler);
    mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
  };

  getDefaultState();

  var removePins = function () {
    for (var i = window.card.pinList.children.length - 1; i >= window.card.INDEX_PIN_FIRST; i--) {
      window.card.pinList.children[i].remove();
    }
  };

  var installMainPin = function () {
    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';
  };

  var getInactiveState = function () {
    window.popups.createPopupSuccess();
    getDefaultState();
    window.card.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.map.mapPinMain.removeEventListener('mousedown', window.dragPin.pinMainMouseDownHandler);
    adForm.reset();
    window.card.removeCard();
    removePins();
    installMainPin();
    setAddress(true);
  };

  window.map.getInactiveState = getInactiveState;

  var getActiveState = function (data) {
    window.card.pinList.appendChild(createFragmentPins(data));
    window.card.startCreateCard(data);
    toggleDisabledAttribute(elementsAdForm);
    toggleDisabledAttribute(elementsMapFiltersForm);
    window.card.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setAddress();
    mapPinMain.removeEventListener('mousedown', mapPinMainMoseDownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    window.map.mapPinMain.addEventListener('mousedown', window.dragPin.pinMainMouseDownHandler);
  };

})();
