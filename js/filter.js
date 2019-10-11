'use strict';

(function () {

  var formFilter = document.querySelector('.map__filters');
  var type = formFilter.querySelector('#housing-type');
  var ANY = 'any';

  var typeChangeHandler = function () {
    var adsFilteredType = window.map.ads;

    if (type.value !== ANY) {
      adsFilteredType = window.map.ads.filter(function (ad) {
        return ad.offer.type === type.value;
      });
    }

    window.map.renderPins(adsFilteredType);
  };

  type.addEventListener('change', typeChangeHandler);

  window.filter = {
    formFilter: formFilter
  };

})();
