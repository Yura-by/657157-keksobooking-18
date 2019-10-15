'use strict';

(function () {

  var INDEX_IMAGE_CLONE_FIRST = 1;
  var INDEX_PIN_FIRST = 2;

  var typeHousingMap = {
    translate: {
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
  var templateCard = document.querySelector('#card').content.querySelector('.popup');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var pinList = map.querySelector('.map__pins');

  var featuresAssembly = function (featuresBox, featuresList) {
    if (featuresList.length === 0) {
      featuresBox.remove();
      return;
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
      return;
    }
    var image = photosBox.querySelector('.popup__photo');
    for (var i = INDEX_IMAGE_CLONE_FIRST; i < photosSources.length; i++) {
      var imageClone = image.cloneNode(true);
      imageClone.src = photosSources[i];
      photosBox.appendChild(imageClone);
    }
    image.src = photosSources[0];
  };

  var createCard = function (cardInner, currentIndex) {
    var card = templateCard.cloneNode(true);
    var cardTitle = card.querySelector('.popup__title');
    var cardAdress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardType = card.querySelector('.popup__type');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var cardCheckinOut = card.querySelector('.popup__text--time');
    var cardFeatures = card.querySelector('.popup__features');
    var cardDescription = card.querySelector('.popup__description');
    var cardPhotos = card.querySelector('.popup__photos');
    var cardAvatar = card.querySelector('.popup__avatar');
    cardInner[currentIndex].offer.title ? cardTitle.textContent = cardInner[currentIndex].offer.title : cardTitle.remove();
    cardInner[currentIndex].offer.address ? cardAdress.textContent = cardInner[currentIndex].offer.address : cardAdress.remove();
    cardInner[currentIndex].offer.price ? cardAdress.textContent = cardInner[currentIndex].offer.price + '₽/ночь' : cardPrice.remove();
    cardInner[currentIndex].offer.type ? cardType.textContent = typeHousingMap.translate[cardInner[currentIndex].offer.type] : cardType.remove();
    cardInner[currentIndex].offer.rooms && cardInner[currentIndex].offer.guests ?
    cardCapacity.textContent = cardInner[currentIndex].offer.rooms + ' комнаты для ' + cardInner[currentIndex].offer.guests + ' гостей':
    cardCapacity.remove();
    cardInner[currentIndex].offer.checkin && cardInner[currentIndex].offer.checkout ?
    cardCheckinOut.textContent = 'заезд после ' + cardInner[currentIndex].offer.checkin + ', выезд до ' + cardInner[currentIndex].offer.checkout :
    cardCheckinOut.remove();
    cardInner[currentIndex].offer.features ? featuresAssembly(cardFeatures, cardInner[currentIndex].offer.features) : cardFeatures.remove();
    cardInner[currentIndex].offer.description ? cardDescription.textContent = cardInner[currentIndex].offer.description : cardDescription.remove();
    cardInner[currentIndex].offer.photos ? createPhotosList(cardPhotos, cardInner[currentIndex].offer.photos) : cardPhotos.remove();
    cardInner[currentIndex].author.avatar ? cardAvatar.src = cardInner[currentIndex].author.avatar : cardAvatar.remove();
    return card;
  };

  var removeCard = function () {
    var mapPopup = map.querySelector('.map__card');
    if (mapPopup) {
      mapPopup.remove();
    }
  };

  var startCreate = function (advertsData) {
    var addPinButtonClickHandler = function (pinButton, indexNumber) {
      var pinButtonClickHandler = function () {
        removeCard();
        map.insertBefore(createCard(advertsData, indexNumber), mapFiltersContainer);
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
    startCreate: startCreate,
    removeCard: removeCard
  };

})();
