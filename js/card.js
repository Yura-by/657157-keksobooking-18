'use strict';

(function () {

  var typeHousingMap = {
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

  var INDEX_PIN_FIRST = 2;
  var map = document.querySelector('.map');
  var templateCard = document.querySelector('#card').content.querySelector('.popup');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var pinList = map.querySelector('.map__pins');

  var featuresAssembly = function (featuresBox, featuresList) {
    if (featuresList.length === 0) {
      featuresBox.remove();
    }
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
    if (photosSources.length === 0) {
      photosBox.remove();
    }
    photosBox.querySelector('.popup__photo').src = photosSources[0];
    for (var i = 1; i < photosSources.length; i++) {
      var imgClone = photosBox.querySelector('.popup__photo').cloneNode(true);
      imgClone.src = photosSources[i];
      photosBox.appendChild(imgClone);
    }
  };

  var createCardElement = function (cardInner, currentIndex) {
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__title').textContent = cardInner[currentIndex].offer.title;
    card.querySelector('.popup__text--address').textContent = cardInner[currentIndex].offer.address;
    card.querySelector('.popup__text--price').textContent = cardInner[currentIndex].offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typeHousingMap.translateType[cardInner[currentIndex].offer.type];
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
      addPinButtonClickHandler(pinList.children[i], (i - INDEX_PIN_FIRST));
    }
  };

  window.card = {
    INDEX_PIN_FIRST: INDEX_PIN_FIRST,
    typeHousingMap: typeHousingMap,
    map: map,
    pinList: pinList,
    startCreateCard: startCreateCard,
    removeCard: removeCard
  };

})();
