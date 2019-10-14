'use strict';

(function () {

  var PINS_QUANTITY = 5;
  var PinMain = {
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
  var ads = [];
  var mapPinMain = window.card.map.querySelector('.map__pin--main');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var elementsMapFiltersForm = window.card.map.querySelector('.map__filters').children;
  var adForm = document.querySelector('.ad-form');
  var elementsAdForm = adForm.children;
  var inputAddress = adForm.querySelector('#address');

  var setAddress = function (isDefault) {
    var pointerHeight = isDefault ? PinMain.size.DEFAULT_HEIGHT / 2 : PinMain.size.HEIGHT;
    inputAddress.value = Math.round(PinMain.position.X + mapPinMain.offsetLeft + PinMain.size.WIDTH / 2) + ', ' + Math.round(PinMain.position.Y + mapPinMain.offsetTop + pointerHeight);
  };

  var createFragmentPins = function (pinsInner) {
    var takeNumber = pinsInner.length > PINS_QUANTITY ? PINS_QUANTITY : pinsInner.length;
    for (var j = 0; j < takeNumber; j++) {
      var pin = templatePin.cloneNode(true);
      if (pinsInner[j].location.x) {
        pin.style.left = pinsInner[j].location.x + 'px';
      }
      if (pinsInner[j].location.y) {
        pin.style.top = pinsInner[j].location.y + 'px';
      }
      if (pinsInner[j].author.avatar) {
        pin.querySelector('img').src = pinsInner[j].author.avatar;
      }
      if (pinsInner[j].offer.title) {
        pin.querySelector('img').alt = pinsInner[j].offer.title;
      }
      fragment.appendChild(pin);
    }
    return fragment;
  };

  var toggleDisabledAttribute = function (collectionElements, isDisabled) {
    for (var i = 0; i < collectionElements.length; i++) {
      collectionElements[i].disabled = isDisabled;
    }
  };

  var mapPinMainMoseDownHandler = function () {
    window.backend.load(successHandler, window.popups.createPopupError);
  };

  var mapPinMainKeydownHandler = function (evt) {
    window.util.enterKeydownHandler(evt, mapPinMainMoseDownHandler);
  };

  var removePins = function () {
    for (var i = window.card.pinList.children.length - 1; i >= window.card.INDEX_PIN_FIRST; i--) {
      window.card.pinList.children[i].remove();
    }
  };

  var installMainPin = function () {
    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';
  };

  var successHandler = function (data) {
    for (var i = data.length - 1; i >= 0; i--) {
      if (!data[i].offer) {
        data.splice(i, 1);
      }
    }
    ads = data;
    window.map.ads = ads;
    renderPins(ads);
    getActiveState();
  };

  var renderPins = function (data) {
    if (window.card.pinList.children.length > window.card.INDEX_PIN_FIRST) {
      removePins();
      window.card.removeCard();
    }
    window.card.pinList.appendChild(createFragmentPins(data));
    window.card.startCreateCard(data);
  };

  var getDefaultState = function () {
    toggleDisabledAttribute(elementsAdForm, true);
    toggleDisabledAttribute(elementsMapFiltersForm, true);
    setAddress(true);
    mapPinMain.addEventListener('mousedown', mapPinMainMoseDownHandler);
    mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
  };

  getDefaultState();

  var getInactiveState = function (reset) {
    if (!reset) {
      window.popups.createPopupSuccess();
    }
    getDefaultState();
    window.card.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPinMain.removeEventListener('mousedown', window.dragPin.pinMainMouseDownHandler);
    adForm.reset();
    window.card.removeCard();
    removePins();
    installMainPin();
    setAddress(true);
    window.filter.formFilter.reset();
    window.photo.resetImages();
  };

  var getActiveState = function () {
    toggleDisabledAttribute(elementsAdForm);
    toggleDisabledAttribute(elementsMapFiltersForm);
    window.card.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setAddress();
    mapPinMain.removeEventListener('mousedown', mapPinMainMoseDownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    mapPinMain.addEventListener('mousedown', window.dragPin.pinMainMouseDownHandler);
  };

  window.map = {
    adForm: adForm,
    elementsAdForm: elementsAdForm,
    mapPinMain: mapPinMain,
    setAddress: setAddress,
    getInactiveState: getInactiveState,
    renderPins: renderPins
  };

})();
