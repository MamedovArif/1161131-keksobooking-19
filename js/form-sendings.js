'use strict';
(function () {
  var MAX_QUANTITY_SYMBOL_OF_TITLE = 100;
  var MIN_QUANTITY_SYMBOL_OF_TITLE = 30;

  var INT_MIN_PRICE_PER_BUNGALO = 0;
  var INT_MIN_PRICE_PER_FLAT = 1000;
  var INT_MIN_PRICE_PER_HOUSE = 5000;
  var INT_MIN_PRICE_PER_PALACE = 10000;
  var STR_MIN_PRICE_PER_BUNGALO = '0';
  var STR_MIN_PRICE_PER_FLAT = '1000';
  var STR_MIN_PRICE_PER_HOUSE = '5000';
  var STR_MIN_PRICE_PER_PALACE = '10000';

  var SIZE_PIN = 65;
  var SHARP_END_Y = 22;
  var INITIAL_X = parseInt(window['map-of-ads'].mainPin.style.left, 10);
  var INITIAL_Y = parseInt(window['map-of-ads'].mainPin.style.top, 10);
  var initialCoorX = INITIAL_X + SIZE_PIN / 2;
  var initialCoorY = INITIAL_Y + SIZE_PIN / 2;
  var coorY = initialCoorY + SIZE_PIN / 2 + SHARP_END_Y;

  var FIRST_TIME = '12:00';
  var SECOND_TIME = '13:00';
  var THIRD_TIME = '14:00';

  var ONE_ROOM = '1';
  var TWO_ROOMS = '2';
  var THREE_ROOMS = '3';
  var ONE_HUNDRED_ROOMS = '100';
  var ONE_GUEST = '1';
  var TWO_GUESTS = '2';
  var THREE_GUESTS = '3';
  var ZERO_GUESTS = '0';

  var mapFilters = window['map-of-ads'].mapChildFilters.querySelectorAll('select');
  var form = document.querySelector('.ad-form');
  var title = form.querySelector('input[name = title]');
  var formInputs = form.querySelectorAll('fieldset');
  var inputAddress = form.querySelector('input[name = address]');
  var selectRooms = form.querySelector('select[name = rooms]');
  var selectCapacity = form.querySelector('select[name = capacity]');
  var timein = form.querySelector('select[name = timein]');
  var timeout = form.querySelector('select[name = timeout]');
  var typeHousing = form.querySelector('select[name = type]');
  var pricePerNight = form.querySelector('input[name = price]');
  var submit = form.querySelector('.ad-form__submit');

  pricePerNight.placeholder = STR_MIN_PRICE_PER_FLAT;
  pricePerNight.min = INT_MIN_PRICE_PER_FLAT;

  submit.addEventListener('click', function () {
    if (title.value.length < MIN_QUANTITY_SYMBOL_OF_TITLE ||
      title.value.length > MAX_QUANTITY_SYMBOL_OF_TITLE) {
      title.style = 'border: 2px solid tomato;';
    } else {
      title.style = 'border: none;';
    }
  });

  typeHousing.addEventListener('change', function () {
    switch (typeHousing.value) {
      case 'bungalo':
        pricePerNight.placeholder = STR_MIN_PRICE_PER_BUNGALO;
        pricePerNight.min = INT_MIN_PRICE_PER_BUNGALO;
        break;
      case 'flat':
        pricePerNight.placeholder = STR_MIN_PRICE_PER_FLAT;
        pricePerNight.min = INT_MIN_PRICE_PER_FLAT;
        break;
      case 'house':
        pricePerNight.placeholder = STR_MIN_PRICE_PER_HOUSE;
        pricePerNight.min = INT_MIN_PRICE_PER_HOUSE;
        break;
      case 'palace':
        pricePerNight.placeholder = STR_MIN_PRICE_PER_PALACE;
        pricePerNight.min = INT_MIN_PRICE_PER_PALACE;
        break;
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
      case FIRST_TIME:
        timeout.value = FIRST_TIME;
        break;
      case SECOND_TIME:
        timeout.value = SECOND_TIME;
        break;
      case THIRD_TIME:
        timeout.value = THIRD_TIME;
        break;
    }
  });

  timeout.addEventListener('click', function () {
    switch (timeout.value) {
      case FIRST_TIME:
        timein.value = FIRST_TIME;
        break;
      case SECOND_TIME:
        timein.value = SECOND_TIME;
        break;
      case THIRD_TIME:
        timein.value = THIRD_TIME;
        break;
    }
  });

  submit.addEventListener('click', function () {
    if (selectRooms.value === ONE_ROOM && selectCapacity.value === TWO_GUESTS ||
      selectRooms.value === ONE_ROOM && selectCapacity.value === THREE_GUESTS ||
      selectRooms.value === ONE_ROOM && selectCapacity.value === ZERO_GUESTS) {
      selectRooms.setCustomValidity('В одной комнате может поместиться один гость');
      selectRooms.style = 'border: 2px solid tomato;';
      selectCapacity.style = 'border: 2px solid tomato;';
    } else if (selectRooms.value === TWO_ROOMS && selectCapacity.value === THREE_GUESTS ||
      selectRooms.value === TWO_ROOMS && selectCapacity.value === ZERO_GUESTS) {
      selectRooms.setCustomValidity('В двух комнатах могут поместиться не более двух гостей');
      selectRooms.style = 'border: 2px solid tomato;';
      selectCapacity.style = 'border: 2px solid tomato;';
    } else if (selectRooms.value === THREE_ROOMS && selectCapacity.value === ZERO_GUESTS) {
      selectRooms.setCustomValidity('В трёх комнатах могут поместиться не более трёх гостей');
      selectRooms.style = 'border: 2px solid tomato;';
      selectCapacity.style = 'border: 2px solid tomato;';
    } else if (selectRooms.value === ONE_HUNDRED_ROOMS && selectCapacity.value === ONE_GUEST ||
      selectRooms.value === ONE_HUNDRED_ROOMS && selectCapacity.value === TWO_GUESTS ||
      selectRooms.value === ONE_HUNDRED_ROOMS && selectCapacity.value === THREE_GUESTS) {
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
    inputAddress.value = parseInt(initialCoorX, 10) + ' ' + parseInt(coorY, 10);
    // положить главную метку на место после отправки
    window['map-of-ads'].mainPin.style.top = INITIAL_Y + 'px';
    window['map-of-ads'].mainPin.style.left = INITIAL_X + 'px';
    var preview = form.querySelector('.ad-form-header__preview img');
    preview.src = 'img/muffin-grey.svg';
    var home = form.querySelector('.ad-form__photo img');
    home.src = 'img/map.jpg';
  };

  var mainPinClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.which === window['map-of-ads']['LEFT_BUTTON_MOUSE']) {
      activation();
      getAddress();
    }
  };

  var mainPinKeydownHandler = function (evt) {
    if (evt.keyCode === window['map-of-ads']['ENTER_CODE']) {
      activation();
    }
  };

  var formSubmitHandler = function (evt) {
    window.server.upload(new FormData(form), successUpload, unSuccessUpload);
    evt.preventDefault();
  };

  var inactive = function () {
    clearForm();
    window['map-of-ads'].clearPinCard();
    window['map-of-ads'].clearFilter();
    addDisable(formInputs);
    window['map-of-ads'].mapFeatures.disabled = true;
    addDisable(mapFilters);
    window['map-of-ads'].map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    window['map-of-ads'].mainPin.addEventListener('mousedown', mainPinClickHandler);
    window['map-of-ads'].mainPin.addEventListener('keydown', mainPinKeydownHandler);

    form.removeEventListener('submit', formSubmitHandler);
  };

  var activation = function () {
    window.server.load(window['map-of-ads'].successHandler, window['map-of-ads'].errorHandler);
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < window['map-of-ads']['MAX_QUANTITY_ADS']; k++) {
      fragment.appendChild(window['map-of-ads'].renderPin(window.externalPrimaryAddition[k]));
    }

    window['map-of-ads'].mapPins.appendChild(fragment);
    window['map-of-ads'].map.classList.remove('map--faded');
    removeDisable(formInputs);

    window['map-of-ads'].functionalCard();
    form.classList.remove('ad-form--disabled');

    removeDisable(mapFilters);
    window['map-of-ads'].mapFeatures.disabled = false;

    window['map-of-ads'].mainPin.removeEventListener('mousedown', mainPinClickHandler);
    window['map-of-ads'].mainPin.removeEventListener('keydown', mainPinKeydownHandler);

    form.addEventListener('submit', formSubmitHandler);
  };

  inactive();

  var getAddress = function () {
    inputAddress.value = parseInt(initialCoorX, 10) + ' ' + parseInt(coorY, 10);
  };

  inputAddress.value = parseInt(initialCoorX, 10) + ' ' + parseInt(coorY, 10);

  var successUpload = function () {
    var successTemplate = document.querySelector('#success').
      content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    document.querySelector('main').insertAdjacentElement('afterbegin', success);
    document.addEventListener('click', function () {
      success.remove();
    });
    document.addEventListener('keydown', function (newEvt) {
      if (newEvt.keyCode === window['map-of-ads']['ESCAPE_CODE']) {
        success.remove();
      }
    });
    inactive();
  };

  var unSuccessUpload = function () {
    inactive();
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    document.querySelector('main').insertAdjacentElement('beforeend', error);
    document.addEventListener('click', function () {
      error.remove();
    });
    document.addEventListener('keydown', function (errEvt) {
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
