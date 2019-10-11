'use strict';

(function () {

  var QuantityRoom = {
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
    setCapacityValue(CapacityChild.CHILD_2);
    setCapasityOptionDisabled([CapacityChild.CHILD_2, CapacityChild.CHILD_1, CapacityChild.CHILD_2, CapacityChild.CHILD_4]);
  };

  setFirstStateCapacity();

  var setCapacityState = function (evt) {
    switch (evt.target.value) {
      case QuantityRoom.OPTION_1:
        setCapacityValue(CapacityChild.CHILD_2);
        setCapasityOptionDisabled([CapacityChild.CHILD_2, CapacityChild.CHILD_1, CapacityChild.CHILD_2, CapacityChild.CHILD_4]);
        break;
      case QuantityRoom.OPTION_2:
        setCapacityValue(CapacityChild.CHILD_3);
        setCapasityOptionDisabled([CapacityChild.CHILD_1, CapacityChild.CHILD_4]);
        break;
      case QuantityRoom.OPTION_3:
        setCapacityValue(CapacityChild.CHILD_4);
        setCapasityOptionDisabled([CapacityChild.CHILD_4]);
        break;
      case QuantityRoom.OPTION_4:
        setCapacityValue(CapacityChild.CHILD_1);
        setCapasityOptionDisabled([CapacityChild.CHILD_1, CapacityChild.CHILD_2, CapacityChild.CHILD_3]);
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

  inputPriceHousing.min = window.card.typeHousingMap.minPrice[inputTypeHousing.value];
  inputPriceHousing.placeholder = window.card.typeHousingMap.minPrice[inputTypeHousing.value];

  var inputTypeHousingChangeHandler = function () {
    inputPriceHousing.min = window.card.typeHousingMap.minPrice[inputTypeHousing.value];
    inputPriceHousing.placeholder = window.card.typeHousingMap.minPrice[inputTypeHousing.value];
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
