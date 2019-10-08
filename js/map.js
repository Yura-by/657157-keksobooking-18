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

  var mapPinMain = window.card.map.querySelector('.map__pin--main');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var elementsMapFiltersForm = window.card.map.querySelector('.map__filters').children;
  var adForm = document.querySelector('.ad-form');
  var elementsAdForm = adForm.children;
  var inputAddress = adForm.querySelector('#address');

  var setAddress = function (isDefault) {
    var pointerHeight = isDefault ? pinMain.size.DEFAULT_HEIGHT / 2 : pinMain.size.HEIGHT;
    inputAddress.value = Math.round(pinMain.position.X + mapPinMain.offsetLeft + pinMain.size.WIDTH / 2) + ', ' + Math.round(pinMain.position.Y + mapPinMain.offsetTop + pointerHeight);
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

  var removePins = function () {
    for (var i = window.card.pinList.children.length - 1; i >= window.card.INDEX_PIN_FIRST; i--) {
      window.card.pinList.children[i].remove();
    }
  };

  var installMainPin = function () {
    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';
  };

  var getDefaultState = function () {
    toggleDisabledAttribute(elementsAdForm, true);
    toggleDisabledAttribute(elementsMapFiltersForm, true);
    setAddress(true);
    mapPinMain.addEventListener('mousedown', mapPinMainMoseDownHandler);
    mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
  };

  getDefaultState();

  var getInactiveState = function () {
    window.popups.createPopupSuccess();
    getDefaultState();
    window.card.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPinMain.removeEventListener('mousedown', window.dragPin.pinMainMouseDownHandler);
    adForm.reset();
    window.card.removeCard();
    removePins();
    installMainPin();
    setAddress(true);
  };

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
    mapPinMain.addEventListener('mousedown', window.dragPin.pinMainMouseDownHandler);
  };

  window.map = {
    adForm: adForm,
    elementsAdForm: elementsAdForm,
    mapPinMain: mapPinMain,
    setAddress: setAddress,
    getInactiveState: getInactiveState
  };

})();
