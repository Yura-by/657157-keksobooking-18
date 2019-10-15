'use strict';

(function () {

  var PINS_QUANTITY = 5;
  var PinMainProperty = {
    SIZE: {
      WIDTH: 65,
      HEIGHT: 87,
      DEFAULT_HEIGHT: 65
    },
    POSITION: {
      X: 300,
      Y: 200
    },
    DEFAULT: {
      LEFT: '570px',
      TOP: '375px'
    }
  };
  var pinMain = window.card.map.querySelector('.map__pin--main');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var childrensMapFiltersForm = window.card.map.querySelector('.map__filters').children;
  var adForm = document.querySelector('.ad-form');
  var childrensAdForm = adForm.children;
  var inputAddress = adForm.querySelector('#address');

  var setAddress = function (isDefault) {
    var pointerHeight = isDefault ? PinMainProperty.SIZE.DEFAULT_HEIGHT / 2 : PinMainProperty.SIZE.HEIGHT;
    inputAddress.value = Math.round(PinMainProperty.POSITION.X + pinMain.offsetLeft + PinMainProperty.SIZE.WIDTH / 2) + ', ' + Math.round(PinMainProperty.POSITION.Y + pinMain.offsetTop + pointerHeight);
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

  var pinMainMoseDownHandler = function () {
    window.backend.load(successHandler, window.popups.createError);
  };

  var pinMainKeydownHandler = function (evt) {
    window.util.enterKeydownHandler(evt, pinMainMoseDownHandler);
  };

  var removePins = function () {
    for (var i = window.card.pinList.children.length - 1; i >= window.card.INDEX_PIN_FIRST; i--) {
      window.card.pinList.children[i].remove();
    }
  };

  var installMainPin = function () {
    pinMain.style.left = PinMainProperty.DEFAULT.LEFT;
    pinMain.style.top = PinMainProperty.DEFAULT.TOP;
  };

  var successHandler = function (data) {
    for (var i = data.length - 1; i >= 0; i--) {
      if (!data[i].offer) {
        data.splice(i, 1);
      }
    }
    window.map.ads = data;
    renderPins(data);
    getActiveState();
  };

  var renderPins = function (data) {
    if (window.card.pinList.children.length > window.card.INDEX_PIN_FIRST) {
      removePins();
      window.card.removeCard();
    }
    window.card.pinList.appendChild(createFragmentPins(data));
    window.card.startCreate(data);
  };

  var getDefaultState = function () {
    toggleDisabledAttribute(childrensAdForm, true);
    toggleDisabledAttribute(childrensMapFiltersForm, true);
    setAddress(true);
    pinMain.addEventListener('mousedown', pinMainMoseDownHandler);
    pinMain.addEventListener('keydown', pinMainKeydownHandler);
  };

  getDefaultState();

  var getInactiveState = function (reset) {
    if (!reset) {
      window.popups.createSuccess();
    }
    getDefaultState();
    window.card.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    pinMain.removeEventListener('mousedown', window.dragPin.pinMainMouseDownHandler);
    adForm.reset();
    window.card.removeCard();
    removePins();
    installMainPin();
    setAddress(true);
    window.filter.formFilter.reset();
    window.photo.resetImages();
  };

  var getActiveState = function () {
    toggleDisabledAttribute(childrensAdForm);
    toggleDisabledAttribute(childrensMapFiltersForm);
    window.card.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setAddress();
    pinMain.removeEventListener('mousedown', pinMainMoseDownHandler);
    pinMain.removeEventListener('keydown', pinMainKeydownHandler);
    pinMain.addEventListener('mousedown', window.dragPin.pinMainMouseDownHandler);
  };

  window.map = {
    adForm: adForm,
    pinMain: pinMain,
    setAddress: setAddress,
    getInactiveState: getInactiveState,
    renderPins: renderPins
  };

})();
