'use strict';

(function () {

  var TIMEOUT_FOR_CHECK = 1000;
  var QuantityRooms = {
    OPTION_1: '1',
    OPTION_2: '2',
    OPTION_3: '3',
    OPTION_4: '100'
  };
  var CapacityChild = {
    CHILD_1: 0,
    CHILD_2: 1,
    CHILD_3: 2,
    CHILD_4: 3
  };
  var roomNumber = window.map.adForm.querySelector('#room_number');
  var capacity = window.map.adForm.querySelector('#capacity');
  var typeHousing = window.map.adForm.querySelector('#type');
  var selectTimeIn = window.map.adForm.querySelector('#timein');
  var selectTimeOut = window.map.adForm.querySelector('#timeout');
  var priceHousing = window.map.adForm.querySelector('#price');
  var buttonReset = window.map.adForm.querySelector('.ad-form__reset');

  var setCapacityValue = function (value) {
    capacity.value = value + '';
  };

  var setCapasityOptionDisabled = function (numbers) {
    numbers.forEach(function (it) {
      capacity.children[it].disabled = true;
    });
  };

  var cleaningValidityMessage = function () {
    capacity.setCustomValidity('');
    capacity.removeEventListener('invalid', capacityInvalidHandler);
  };

  var capacityInvalidHandler = function () {
    setTimeout(cleaningValidityMessage, TIMEOUT_FOR_CHECK);
  };

  var setFirstStateCapacity = function () {
    setCapacityValue(CapacityChild.CHILD_2);
    setCapasityOptionDisabled([CapacityChild.CHILD_2, CapacityChild.CHILD_1, CapacityChild.CHILD_2, CapacityChild.CHILD_4]);
  };

  setFirstStateCapacity();

  var setCapacityState = function (evt) {
    switch (evt.target.value) {
      case QuantityRooms.OPTION_1:
        setCapacityValue(CapacityChild.CHILD_2);
        setCapasityOptionDisabled([CapacityChild.CHILD_2, CapacityChild.CHILD_1, CapacityChild.CHILD_2, CapacityChild.CHILD_4]);
        break;
      case QuantityRooms.OPTION_2:
        setCapacityValue(CapacityChild.CHILD_3);
        setCapasityOptionDisabled([CapacityChild.CHILD_1, CapacityChild.CHILD_4]);
        break;
      case QuantityRooms.OPTION_3:
        setCapacityValue(CapacityChild.CHILD_4);
        setCapasityOptionDisabled([CapacityChild.CHILD_4]);
        break;
      case QuantityRooms.OPTION_4:
        setCapacityValue(CapacityChild.CHILD_1);
        setCapasityOptionDisabled([CapacityChild.CHILD_1, CapacityChild.CHILD_2, CapacityChild.CHILD_3]);
    }
  };

  var capacityChangeHandler = function (evt) {
    [].forEach.call(capacity.children, function (it) {
      it.disabled = false;
    });
    setCapacityState(evt);
    capacity.setCustomValidity('Проверьте, пожалуйста, количество мест для гостей!');
    capacity.addEventListener('invalid', capacityInvalidHandler);
  };

  roomNumber.addEventListener('change', capacityChangeHandler);

  priceHousing.min = window.card.typeHousingMap.minPrice[typeHousing.value];
  priceHousing.placeholder = window.card.typeHousingMap.minPrice[typeHousing.value];

  var typeHousingChangeHandler = function () {
    priceHousing.min = window.card.typeHousingMap.minPrice[typeHousing.value];
    priceHousing.placeholder = window.card.typeHousingMap.minPrice[typeHousing.value];
  };

  var setPlaceholder = function () {
    priceHousing.placeholder = window.card.typeHousingMap.minPrice.flat;
  };

  typeHousing.addEventListener('change', typeHousingChangeHandler);

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });

  var adFormSubmitHandler = function (evt) {
    var form = new FormData(window.map.adForm);
    window.backend.save(form, window.map.getInactiveState, window.popups.createError);
    evt.preventDefault();
  };

  window.map.adForm.addEventListener('submit', adFormSubmitHandler);

  buttonReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.getInactiveState(true);
  });

  window.form = {
    setPlaceholder: setPlaceholder
  };

})();
