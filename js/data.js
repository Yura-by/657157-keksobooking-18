'use strict';

(function () {

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

  var getMokiData = function (advertsData) {
    var adverts = [];
    for (var i = 0; i < advertsData.QUANTITY; i++) {
      var advert = {
        author: {
          avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
        },

        offer: {
          title: window.util.getRandomElementFromArray(advertsData.TYPES),
          price: window.util.getRandomNumber(advertsData.price.MAX, advertsData.price.MIN),
          type: window.util.getRandomElementFromArray(advertsData.TYPES),
          rooms: window.util.getRandomNumber(advertsData.rooms.MAX, advertsData.rooms.MIN),
          guests: window.util.getRandomNumber(advertsData.quests.MAX, advertsData.quests.MIN),
          checkin: window.util.getRandomElementFromArray(advertsData.TIMES),
          checkout: window.util.getRandomElementFromArray(advertsData.TIMES),
          features: window.util.getRandomLengthArray(advertsData.FEATURES),
          description: window.util.getRandomElementFromArray(advertsData.TYPES),
          photos: window.util.getRandomLengthArray(advertsData.PHOTOS)
        },

        location: {
          x: window.util.getRandomNumber(advertsData.pinCoordinates.X.MAX, advertsData.pinCoordinates.X.MIN),
          y: window.util.getRandomNumber(advertsData.pinCoordinates.Y.MAX, advertsData.pinCoordinates.Y.MIN)
        }
      };
      advert.offer.address = advert.location.x + ', ' + advert.location.y;
      adverts.push(advert);
    }
    return adverts;
  };

  window.data = {
    advertsMokiData: getMokiData(mokiData)
  };

})();
