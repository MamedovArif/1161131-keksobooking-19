'use strict';
(function () {

  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('fieldset');
  var inputAddress = form.querySelector('input[name = address]');
  var selectRooms = form.querySelector('select[name = rooms]');
  var selectCapacity = form.querySelector('select[name = capacity]');
  var timein = form.querySelector('select[name = timein]');
  var timeout = form.querySelector('select[name = timeout]');
  var typeHousing = form.querySelector('select[name = type]');
  var pricePerNight = form.querySelector('input[name = price]');
  var submit = form.querySelector('.ad-form__submit');

  typeHousing.addEventListener('click', function () {
    if (typeHousing.value === 'flat' && Number(pricePerNight.value) <= 1000) {
      typeHousing.setCustomValidity(
          'У квартиры минимальная цена за ночь, должно быть не меньше 1000 рублей');
    } else if (typeHousing.value === 'house' && Number(pricePerNight.value) <= 5000) {
      typeHousing.setCustomValidity(
          'У дома минимальная цена за ночь, должно быть не меньше 5000 рублей');
    } else if (typeHousing.value === 'palace' && Number(pricePerNight.value) <= 10000) {
      typeHousing.setCustomValidity(
          'У дворца минимальная цена за ночь, должно быть не меньше 10 000 рублей');
    } else {
      typeHousing.setCustomValidity('');
    }
  });


  timein.addEventListener('click', function () {
    switch (timein.value) {
      case '12:00':
        timeout.value = '12:00';
        break;
      case '13:00':
        timeout.value = '13:00';
        break;
      case '14:00':
        timeout.value = '14:00';
        break;
    }
  });

  timeout.addEventListener('click', function () {
    switch (timeout.value) {
      case '12:00':
        timein.value = '12:00';
        break;
      case '13:00':
        timein.value = '13:00';
        break;
      case '14:00':
        timein.value = '14:00';
        break;
    }
  });

  submit.addEventListener('click', function () {
    if (selectRooms.value === '1' && selectCapacity.value === '2' ||
      selectRooms.value === '1' && selectCapacity.value === '3' ||
      selectRooms.value === '1' && selectCapacity.value === '0') {
      selectRooms.setCustomValidity('В одной комнате может поместиться один гость');
    } else if (selectRooms.value === '2' && selectCapacity.value === '3' ||
      selectRooms.value === '2' && selectCapacity.value === '0') {
      selectRooms.setCustomValidity('В двух комнатах могут поместиться не более двух гостей');
    } else if (selectRooms.value === '3' && selectCapacity.value === '0') {
      selectRooms.setCustomValidity('В трёх комнатах могут поместиться не более трёх гостей');
    } else if (selectRooms.value === '100' && selectCapacity.value === '1' ||
      selectRooms.value === '100' && selectCapacity.value === '2' ||
      selectRooms.value === '100' && selectCapacity.value === '3') {
      selectRooms.setCustomValidity('Этот вариант не для гостей');
    } else {
      selectRooms.setCustomValidity('');
    }
  });


  var addDisable = function (arr) {
    for (var j = 0; j < arr.length; j++) {
      arr[j].disabled = true;
    }
  };

  var clear = function () {
    form.querySelector('input[name = title]').value = '';
    pricePerNight.value = null;
    var features = form.querySelectorAll('input[name = features]');
    for (var q = 0; q < features.length; q++) {
      features[q].checked = false;
    }

    var selects = form.querySelectorAll('select');
    for (var h = 0; h < selects.length; h++) {
      selects[h].selectedIndex = 0;
    }
    typeHousing.selectedIndex = 1;
    form.querySelector('textarea').value = '';
    inputAddress.value = initialCoorX + 'px ' + initialCoorY + 'px';
    // положить главную метку на место после отправки
    window.map.mainPin.style.top = initialCoorY;
    window.map.mainPin.left = initialCoorX;
  };


  var clearPins = function () {
    for (var e = 1; e < window.map.mapPin.length; e++) {
      window.map.mapPin[e].classList.add('hidden');
    }
  };

  var showPins = function () {
    for (var d = 1; d < window.map.mapPin.length; d++) {
      window.map.mapPin[d].classList.remove('hidden');
    }
  };

  var inactive = function () {
    clear();
    clearPins();
    addDisable(formInputs);
    window.map.mapFeatures.disabled = true;
    addDisable(window.map.mapFilters);
    window.map.map.classList.add('map--faded');
  };

  var activation = function () {
    window.map.mapPins.appendChild(window.map.fragment);
    window.map.map.classList.remove('map--faded');
    window.map.removeDisable(formInputs);
    showPins();
    window.map.mapPins.appendChild(window.map.fragment2);
    window.map.functionalCard();
  };

  inactive();

  var INITIAL_SIZE_PIN = 200;
  var SIZE_PIN = 65;
  var SHARP_END_Y = 22;
  var INITIAL_X = parseInt(window.map.mainPin.style.left, 10);
  var INITIAL_Y = parseInt(window.map.mainPin.style.top, 10);
  var initialCoorX = INITIAL_X + INITIAL_SIZE_PIN / 2;
  var initialCoorY = INITIAL_Y + INITIAL_SIZE_PIN / 2;
  var coorY = initialCoorY + SIZE_PIN / 2 + SHARP_END_Y;

  var getAddress = function () {
    inputAddress.value = initialCoorX + 'px ' + coorY + 'px';
  };

  window.map.mainPin.addEventListener('mousedown', function () {
    activation();
    getAddress();
  });
  window.map.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      activation();
    }
  });


  inputAddress.value = initialCoorX + 'px ' + initialCoorY + 'px';

  var successUpload = function () {
    inactive();
    var successTemplate = document.querySelector('#success').
      content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', success);
    document.addEventListener('click', function (buttonEvt) {
      buttonEvt.preventDefault();
      success.style = 'display: none;';
    });
    document.addEventListener('keydown', function (newEvt) {
      newEvt.preventDefault();
      if (newEvt.keyCode === 27) {
        success.style = 'display: none;';
      }
    });
  };

  var unsuccessUpload = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    document.querySelector('main').insertAdjacentElement('beforeend', error);
    document.addEventListener('click', function (errorEvt) {
      errorEvt.preventDefault();
      error.style = 'display: none;';
    });
    document.addEventListener('keydown', function (errEvt) {
      errEvt.preventDefault();
      if (errEvt.keyCode === 27) {
        errEvt.style = 'display: none;';
      }
    });
  };

  form.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(form), successUpload, unsuccessUpload);
    evt.preventDefault();
  });


  var clearButton = form.querySelector('.ad-form__reset');
  clearButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    clear();
  });

  window.form = {
    getAddress: getAddress,
    inputAddress: inputAddress,
    SIZE_PIN: SIZE_PIN,
    SHARP_END_Y: SHARP_END_Y,
    form: form
  };

})();
