'use strict';

(function () {

  var Index = {
    IMAGE_CLONE_FIRST: 1,
    PIN_FIRST: 2,
    FIRST_IMAGE: 0
  };
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
    featuresList.forEach(function (feature) {
      var className = '.popup__feature--' + feature;
      var element = featuresBox.querySelector(className);
      element.textContent = feature;
    });
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
    for (var i = Index.IMAGE_CLONE_FIRST; i < photosSources.length; i++) {
      var imageClone = image.cloneNode(true);
      imageClone.src = photosSources[i];
      photosBox.appendChild(imageClone);
    }
    image.src = photosSources[Index.FIRST_IMAGE];
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
    if (cardInner[currentIndex].offer.title) {
      cardTitle.textContent = cardInner[currentIndex].offer.title;
    } else {
      cardTitle.remove();
    }
    if (cardInner[currentIndex].offer.address) {
      cardAdress.textContent = cardInner[currentIndex].offer.address;
    } else {
      cardAdress.remove();
    }
    if (cardInner[currentIndex].offer.price) {
      cardPrice.textContent = cardInner[currentIndex].offer.price + '₽/ночь';
    } else {
      cardPrice.remove();
    }
    if (cardInner[currentIndex].offer.type) {
      cardType.textContent = typeHousingMap.translate[cardInner[currentIndex].offer.type];
    } else {
      cardType.remove();
    }
    if (cardInner[currentIndex].offer.rooms && cardInner[currentIndex].offer.guests) {
      cardCapacity.textContent = cardInner[currentIndex].offer.rooms + ' комнаты для ' + cardInner[currentIndex].offer.guests + ' гостей';
    } else {
      cardCapacity.remove();
    }
    if (cardInner[currentIndex].offer.checkin && cardInner[currentIndex].offer.checkout) {
      cardCheckinOut.textContent = 'заезд после ' + cardInner[currentIndex].offer.checkin + ', выезд до ' + cardInner[currentIndex].offer.checkout;
    } else {
      cardCheckinOut.remove();
    }
    if (cardInner[currentIndex].offer.features) {
      featuresAssembly(cardFeatures, cardInner[currentIndex].offer.features);
    } else {
      cardFeatures.remove();
    }
    if (cardInner[currentIndex].offer.description) {
      cardDescription.textContent = cardInner[currentIndex].offer.description;
    } else {
      cardDescription.remove();
    }
    if (cardInner[currentIndex].offer.photos) {
      createPhotosList(cardPhotos, cardInner[currentIndex].offer.photos);
    } else {
      cardPhotos.remove();
    }
    if (cardInner[currentIndex].author.avatar) {
      cardAvatar.src = cardInner[currentIndex].author.avatar;
    } else {
      cardAvatar.remove();
    }
    return card;
  };

  var removePopup = function () {
    var mapPopup = map.querySelector('.map__card');
    if (mapPopup) {
      mapPopup.remove();
      document.removeEventListener('keydown', popupEscHandler);
    }
  };

  var popupEscHandler = function (evt) {
    window.util.escKeydownHandler(evt, function () {
      removePopup();
    });
  };

  var startCreate = function (advertsData) {

    var addHandler = function (pinButton, indexNumber) {
      var pinButtonClickHandler = function () {
        removePopup();
        map.insertBefore(createCard(advertsData, indexNumber), mapFiltersContainer);
        var buttonClosePopup = map.querySelector('.popup__close');
        buttonClosePopup.addEventListener('click', function () {
          removePopup();
        });
        document.addEventListener('keydown', popupEscHandler);
      };
      pinButton.addEventListener('click', pinButtonClickHandler);
    };

    for (var i = Index.PIN_FIRST; i < pinList.children.length; i++) {
      addHandler(pinList.children[i], (i - Index.PIN_FIRST));
    }
  };

  window.card = {
    Index: Index,
    typeHousingMap: typeHousingMap,
    map: map,
    pinList: pinList,
    startCreate: startCreate,
    removePopup: removePopup
  };

})();
