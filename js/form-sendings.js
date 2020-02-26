'use strict';
(function () {
  var MAX_QUANTITY_SYMBOL_OF_TITLE = 100;
  var MIN_QUANTITY_SYMBOL_OF_TITLE = 30;

  var INT_MIN_PRICE_PER_FLAT = 1000;
  var INT_MIN_PRICE_PER_HOUSE = 5000;
  var INT_MIN_PRICE_PER_PALACE = 10000;
  var STR_MIN_PRICE_PER_BUNGALO = '0';
  var STR_MIN_PRICE_PER_FLAT = '1000';
  var STR_MIN_PRICE_PER_HOUSE = '5000';
  var STR_MIN_PRICE_PER_PALACE = '10000';

  var SIZE_PIN = 65;
  var SHARP_END_Y = 22;
  var INITIAL_X = parseInt(window.window['map-of-ads'].mainPin.style.left, 10);
  var INITIAL_Y = parseInt(window.window['map-of-ads'].mainPin.style.top, 10);
  var initialCoorX = INITIAL_X + SIZE_PIN / 2;
  var initialCoorY = INITIAL_Y + SIZE_PIN / 2;
  var coorY = initialCoorY + SIZE_PIN / 2 + SHARP_END_Y;


  var mapFilters = window.window['map-of-ads'].mapChildFilters.querySelectorAll('select');
  var form = document.querySelector('.ad-form');
  var title = form.querySelector('input[name = title]')
  var formInputs = form.querySelectorAll('fieldset');
  var inputAddress = form.querySelector('input[name = address]');
  var selectRooms = form.querySelector('select[name = rooms]');
  var selectCapacity = form.querySelector('select[name = capacity]');
  var timein = form.querySelector('select[name = timein]');
  var timeout = form.querySelector('select[name = timeout]');
  var typeHousing = form.querySelector('select[name = type]');
  var pricePerNight = form.querySelector('input[name = price]');
  var submit = form.querySelector('.ad-form__submit');

  submit.addEventListener('click', function () {
    if (title.value.length < MIN_QUANTITY_SYMBOL_OF_TITLE ||
      title.value.length > MAX_QUANTITY_SYMBOL_OF_TITLE) {
      title.style = 'border: 2px solid tomato;';
    } else {
      title.style = 'border: none;';
    }
  });

  typeHousing.addEventListener('change', function() {
    if (typeHousing.value === 'bungalo') {
      pricePerNight.placeholder = STR_MIN_PRICE_PER_BUNGALO;
    } else if (typeHousing.value === 'flat') {
      pricePerNight.placeholder = STR_MIN_PRICE_PER_FLAT;
    } else if (typeHousing.value === 'house') {
      pricePerNight.placeholder = STR_MIN_PRICE_PER_HOUSE;
    } else if (typeHousing.value === 'palace') {
      pricePerNight.placeholder = STR_MIN_PRICE_PER_PALACE;
    }
  });

  submit.addEventListener('click', function () {
    if (typeHousing.value === 'flat' && Number(pricePerNight.value) < INT_MIN_PRICE_PER_FLAT) {
      typeHousing.setCustomValidity(
          'У квартиры минимальная цена за ночь, должно быть не меньше 1000 рублей');
      typeHousing.style = 'border: 2px solid tomato;';
      pricePerNight.style = 'border: 2px solid tomato;';
    } else if (typeHousing.value === 'house' && Number(pricePerNight.value) < INT_MIN_PRICE_PER_HOUSE) {
      typeHousing.setCustomValidity(
          'У дома минимальная цена за ночь, должно быть не меньше 5000 рублей');
      typeHousing.style = 'border: 2px solid tomato;';
      pricePerNight.style = 'border: 2px solid tomato;';
    } else if (typeHousing.value === 'palace' && Number(pricePerNight.value) < INT_MIN_PRICE_PER_PALACE) {
      typeHousing.setCustomValidity(
          'У дворца минимальная цена за ночь, должно быть не меньше 10 000 рублей');
      typeHousing.style = 'border: 2px solid tomato;';
      pricePerNight.style = 'border: 2px solid tomato;';
    } else {
      typeHousing.setCustomValidity('');
      typeHousing.style = 'border: none;';
      pricePerNight.style = 'border: none;';
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
      selectRooms.style = 'border: 2px solid tomato;';
      selectCapacity.style = 'border: 2px solid tomato;';
    } else if (selectRooms.value === '2' && selectCapacity.value === '3' ||
      selectRooms.value === '2' && selectCapacity.value === '0') {
      selectRooms.setCustomValidity('В двух комнатах могут поместиться не более двух гостей');
      selectRooms.style = 'border: 2px solid tomato;';
      selectCapacity.style = 'border: 2px solid tomato;';
    } else if (selectRooms.value === '3' && selectCapacity.value === '0') {
      selectRooms.setCustomValidity('В трёх комнатах могут поместиться не более трёх гостей');
      selectRooms.style = 'border: 2px solid tomato;';
      selectCapacity.style = 'border: 2px solid tomato;';
    } else if (selectRooms.value === '100' && selectCapacity.value === '1' ||
      selectRooms.value === '100' && selectCapacity.value === '2' ||
      selectRooms.value === '100' && selectCapacity.value === '3') {
      selectRooms.setCustomValidity('Этот вариант не для гостей');
      selectRooms.style = 'border: 2px solid tomato;';
      selectCapacity.style = 'border: 2px solid tomato;';
    } else {
      selectRooms.setCustomValidity('');
      selectRooms.style = 'border: none;';
      selectCapacity.style = 'border: none;';
    }
  });

  var addDisable = function (arr) {
    for (var j = 0; j < arr.length; j++) {
      arr[j].disabled = true;
    }
  };

  var removeDisable = function (arr) {
    for (var y = 0; y < arr.length; y++) {
      arr[y].disabled = false;
    }
  };


  var clearForm = function () {
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
    inputAddress.value = parseInt(initialCoorX, 10) + 'px ' + parseInt(coorY, 10) + 'px';
    // положить главную метку на место после отправки
    window.window['map-of-ads'].mainPin.style.top = INITIAL_Y  + 'px';
    window.window['map-of-ads'].mainPin.style.left = INITIAL_X + 'px';
    var preview = form.querySelector('.ad-form-header__preview img');
    preview.src = 'img/muffin-grey.svg';
    var home = form.querySelector('.ad-form__photo img');
    home.src = 'img/map.jpg';
  };

  var mainPinClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.which === 1) {
      activation();
      getAddress();
    }
  }

  var mainPinKeydownHandler = function (evt) {
    if (evt.keyCode === window['map-of-ads']['ENTER_CODE']) {
      activation();
    }
  }

  var formSubmitHandler = function (evt) {
    window.server.upload(new FormData(form), successUpload, unsuccessUpload);
    evt.preventDefault();
  }

  var inactive = function () {
    clearForm();
    window.window['map-of-ads'].clearPinCard();
    window.window['map-of-ads'].clearFilter();
    addDisable(formInputs);
    window.window['map-of-ads'].mapFeatures.disabled = true;
    addDisable(mapFilters);
    window.window['map-of-ads'].map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    window.window['map-of-ads'].mainPin.addEventListener('mousedown', mainPinClickHandler);
    window.window['map-of-ads'].mainPin.addEventListener('keydown', mainPinKeydownHandler);

    form.removeEventListener('submit', formSubmitHandler);
  };

  var activation = function () {
    var fragment = document.createDocumentFragment();
    var fragment2 = document.createDocumentFragment();
    for (var k = 0; k < 5; k++) {//кол-во элемнтов в мешках
      fragment.appendChild(window.window['map-of-ads'].renderPin(window.clonarr[k]));
      fragment2.appendChild(window.card.renderCard(window.clonarr[k]));
    }

    window.window['map-of-ads'].mapPins.appendChild(fragment);
    window.window['map-of-ads'].map.classList.remove('map--faded');
    removeDisable(formInputs);
    window.window['map-of-ads'].mapPins.appendChild(fragment2);
    window.window['map-of-ads'].functionalCard();
    form.classList.remove('ad-form--disabled');

    removeDisable(mapFilters);
    window.window['map-of-ads'].mapFeatures.disabled = false;

    window.window['map-of-ads'].mainPin.removeEventListener('mousedown', mainPinClickHandler);
    window.window['map-of-ads'].mainPin.removeEventListener('keydown', mainPinKeydownHandler);

    form.addEventListener('submit', formSubmitHandler);
  };

  inactive();

  var getAddress = function () {
    inputAddress.value = parseInt(initialCoorX, 10) + 'px ' + parseInt(coorY, 10) + 'px';
  };

  inputAddress.value = parseInt(initialCoorX, 10) + 'px ' + parseInt(coorY, 10) + 'px';

  var successUpload = function () {
    var successTemplate = document.querySelector('#success').
      content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    document.querySelector('main').insertAdjacentElement('afterbegin', success);
    document.addEventListener('click', function() {
      success.remove();
    })
    document.addEventListener('keydown', function (newEvt) {
      if (newEvt.keyCode === window['map-of-ads']['ESCAPE_CODE']) {
        success.remove();
      }
    });
    inactive();
  };

  var unsuccessUpload = function () {
    inactive();
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    document.querySelector('main').insertAdjacentElement('beforeend', error);
    document.addEventListener('click', function (errorEvt) {
      errorEvt.preventDefault();
      error.remove();
    });
    document.addEventListener('keydown', function (errEvt) {
      errEvt.preventDefault();
      if (errEvt.keyCode === window['map-of-ads']['ESCAPE_CODE']) {
        errEvt.remove();
      }
    });
  };

  var clearButton = form.querySelector('.ad-form__reset');
  clearButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    inactive();
  });

  window['form-sendings'] = {
    getAddress: getAddress,
    inputAddress: inputAddress,
    SIZE_PIN: SIZE_PIN,
    SHARP_END_Y: SHARP_END_Y,
    form: form
  };

})();
