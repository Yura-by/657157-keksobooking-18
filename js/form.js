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
  var selectTimeIn = window.map.adForm.querySelector('#timein');
  var selectTimeOut = window.map.adForm.querySelector('#timeout');
  var inputPriceHousing = window.map.adForm.querySelector('#price');

  var setCapacityValue = function (value) {
    capacity.value = value + '';
  };

  var setCapasityOptionDisabled = function (numbers) {
    for (var i = 0; i < numbers.length; i++) {
      capacity.children[numbers[i]].disabled = true;
    }
  };

  var cleaningValidityMessage = function () {
    capacity.setCustomValidity('');
    capacity.removeEventListener('invalid', capacityInvalidHandler);
  };

  var capacityInvalidHandler = function () {
    setTimeout(cleaningValidityMessage, 2000);
  };

  var setFirstStateCapacity = function () {
    setCapacityValue(capacityChildren.CHILD_2);
    setCapasityOptionDisabled([capacityChildren.CHILD_2, capacityChildren.CHILD_1, capacityChildren.CHILD_2, capacityChildren.CHILD_4]);
  };

  setFirstStateCapacity();

  var setCapacityState = function (evt) {
    switch (evt.target.value) {
      case quantityRooms.OPTION_1:
        setCapacityValue(capacityChildren.CHILD_2);
        setCapasityOptionDisabled([capacityChildren.CHILD_2, capacityChildren.CHILD_1, capacityChildren.CHILD_2, capacityChildren.CHILD_4]);
        break;
      case quantityRooms.OPTION_2:
        setCapacityValue(capacityChildren.CHILD_3);
        setCapasityOptionDisabled([capacityChildren.CHILD_1, capacityChildren.CHILD_4]);
        break;
      case quantityRooms.OPTION_3:
        setCapacityValue(capacityChildren.CHILD_4);
        setCapasityOptionDisabled([capacityChildren.CHILD_4]);
        break;
      case quantityRooms.OPTION_4:
        setCapacityValue(capacityChildren.CHILD_1);
        setCapasityOptionDisabled([capacityChildren.CHILD_1, capacityChildren.CHILD_2, capacityChildren.CHILD_3]);
    }
  };

  var capacityChangeHandler = function (evt) {
    for (var i = 0; i < capacity.children.length; i++) {
      capacity.children[i].disabled = false;
    }
    setCapacityState(evt);
    capacity.setCustomValidity('Проверьте, пожалуйста, количество мест для гостей!');
    capacity.addEventListener('invalid', capacityInvalidHandler);
  };

  roomNumber.addEventListener('change', capacityChangeHandler);

  inputPriceHousing.min = window.card.typeHousing.minPrice[inputTypeHousing.value];
  inputPriceHousing.placeholder = window.card.typeHousing.minPrice[inputTypeHousing.value];

  var inputTypeHousingChangeHandler = function () {
    inputPriceHousing.min = window.card.typeHousing.minPrice[inputTypeHousing.value];
    inputPriceHousing.placeholder = window.card.typeHousing.minPrice[inputTypeHousing.value];
  };

  inputTypeHousing.addEventListener('change', inputTypeHousingChangeHandler);

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });

  window.map.adForm.addEventListener('submit', function (evt) {
    var form = new FormData(window.map.adForm);
    window.backend.save(form, window.map.getInactiveState, window.popups.createPopupError);
    evt.preventDefault();
  });

})();
