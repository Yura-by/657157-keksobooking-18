'use strict';

(function () {

  var quantityRooms = {
    OPTION_1: '1',
    OPTION_2: '2',
    OPTION_3: '3',
    OPTION_4: '100'
  };

  var capacityChildren = {
    CHILD_1: 0,
    CHILD_2: 1,
    CHILD_3: 2,
    CHILD_4: 3
  };

  var roomNumber = window.map.adForm.querySelector('#room_number');
  var capacity = window.map.adForm.querySelector('#capacity');
  var inputTypeHousing = window.map.adForm.querySelector('#type');
  var inputPriceHousing = window.map.adForm.querySelector('#price');
  var selectTimeIn = window.map.adForm.querySelector('#timein');
  var selectTimeOut = window.map.adForm.querySelector('#timeout');

  var getCapacityValue = function (value) {
    capacity.value = value + '';
  };

  var getCapasityOptionDisabled = function (numberChild) {
    capacity.children[numberChild].disabled = true;
  };

  var cleaningValidityMessage = function () {
    capacity.setCustomValidity('');
    capacity.removeEventListener('invalid', capacityInvalidHandler);
  };

  var capacityInvalidHandler = function () {
    setTimeout(cleaningValidityMessage, 2000);
  };

  var getFirstStateCapacity = function () {
    getCapacityValue(capacityChildren.CHILD_2);
    getCapasityOptionDisabled(capacityChildren.CHILD_1);
    getCapasityOptionDisabled(capacityChildren.CHILD_2);
    getCapasityOptionDisabled(capacityChildren.CHILD_4);
  };

  getFirstStateCapacity();

  var capacityChangeHandler = function (evt) {
    for (var i = 0; i < capacity.children.length; i++) {
      capacity.children[i].disabled = false;
    }

    switch (evt.target.value) {
      case quantityRooms.OPTION_1:
        getCapacityValue(capacityChildren.CHILD_2);
        getCapasityOptionDisabled(capacityChildren.CHILD_1);
        getCapasityOptionDisabled(capacityChildren.CHILD_2);
        getCapasityOptionDisabled(capacityChildren.CHILD_4);
        break;
      case quantityRooms.OPTION_2:
        getCapacityValue(capacityChildren.CHILD_3);
        getCapasityOptionDisabled(capacityChildren.CHILD_1);
        getCapasityOptionDisabled(capacityChildren.CHILD_4);
        break;
      case quantityRooms.OPTION_3:
        getCapacityValue(capacityChildren.CHILD_4);
        getCapasityOptionDisabled(capacityChildren.CHILD_4);
        break;
      case quantityRooms.OPTION_4:
        getCapacityValue(capacityChildren.CHILD_1);
        getCapasityOptionDisabled(capacityChildren.CHILD_1);
        getCapasityOptionDisabled(capacityChildren.CHILD_2);
        getCapasityOptionDisabled(capacityChildren.CHILD_3);
    }

    capacity.setCustomValidity('Проверьте, пожалуйста, количество мест для гостей!');
    capacity.addEventListener('invalid', capacityInvalidHandler);
  };

  roomNumber.addEventListener('change', capacityChangeHandler);

  inputPriceHousing.min = window.map.typeHousing.minPrice[inputTypeHousing.value];
  inputPriceHousing.placeholder = window.map.typeHousing.minPrice[inputTypeHousing.value];

  var inputTypeHousingChangeHandler = function () {
    inputPriceHousing.min = window.map.typeHousing.minPrice[inputTypeHousing.value];
    inputPriceHousing.placeholder = window.map.typeHousing.minPrice[inputTypeHousing.value];
  };

  inputTypeHousing.addEventListener('change', inputTypeHousingChangeHandler);

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });

})();
