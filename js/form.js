'use strict';
(function () {
  var mapChildFilters = window.map.map.querySelector('.map__filters-container');
  var mapFilters = mapChildFilters.querySelectorAll('select');
  var mapFeatures = mapChildFilters.querySelector('.map__features');


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

  var removeDisable = function (arr) {
    for (var y = 0; y < arr.length; y++) {
      arr[y].disabled = false;
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
    form.querySelector('textarea').value = ' ';
    typeHousing.selectedIndex = 1;
    inputAddress.value = initialCoorX + 'px ' + initialCoorY + 'px';
    var featuresForm = form.querySelector('.features');
    var checkboxes = featuresForm.querySelector('input');
    for (var g = 0; g < selects.length; g++) {
      selects[g].checked = true;
    }
  };


  var mapPin = window.map.mapPins.getElementsByClassName('map__pin');

  var clearPins = function () {
    for (var e = 1; e < mapPin.length; e++) {
      mapPin[e].classList.add('hidden');
    }
  };

  var createPins = function () {
    for (var d = 1; d < mapPin.length; d++) {
      mapPin[d].classList.remove('hidden');
    };
  }

  var inactive = function () {
    clear();
    clearPins();
    addDisable(formInputs);
    mapFeatures.disabled = true;
    addDisable(mapFilters);
    window.map.map.classList.add('map--faded');
  };

  var activation = function () {
    window.map.mapPins.appendChild(window.map.fragment);
    window.map.map.classList.remove('map--faded');
    removeDisable(formInputs);
    removeDisable(mapFilters);
    mapFeatures.disabled = false;
    createPins();

    window.map.mapPins.appendChild(window.map.fragment2);
    // mapChildFilters.insertAdjacentHTML('beforebegin', window.map.fragment2);


    var adCards = window.map.mapPins.querySelectorAll('.map__card');
    var labels = window.map.mapPins.querySelectorAll('.map__pin');

    for (var u = 0; u < adCards.length; u++) {
      adCards[u].hidden = true;
    }
    var addLabelClickHandler = function (label, card) {
      label.addEventListener('click', function () {
        card.hidden = false;
        var adClose = card.querySelector('.popup__close');
        adClose.addEventListener('click', function () {
          card.hidden = true;
        });
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === 27) {
            card.hidden = true;
          }
        });
      });
    };

    for (var r = 1; r < labels.length; r++) {
      addLabelClickHandler(labels[r], adCards[r - 1]);
    }
    /*
    labels[1].addEventListener('click', function() {
      adCards[0].hidden = false;
      var adClose = adCards[0].querySelector('.popup__close');
      adClose.addEventListener('click', function() {
        adCards[0].hidden = true;
      });
    }); */

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


  form.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(form), function () {
      inactive();
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var success = successTemplate.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', success);
      document.addEventListener('click', function(evt) {
        evt.preventDefault();
        success.style = 'display: none;';
      });
      document.addEventListener('keydown', function (evt) {
        evt.preventDefault();
        if (evt.keyCode === 27) {
          success.style = 'display: none;';
        }
      });
      inactive();
    }, function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var error = errorTemplate.cloneNode(true);
      document.querySelector('main').insertAdjacentElement('beforeend', error);
      var errButton = error.querySelector('.error__button');
      document.addEventListener('click', function(evt) {
        evt.preventDefault();
        error.style = 'display: none;';
      });
      document.addEventListener('keydown', function (evt) {
        evt.preventDefault();
        if (evt.keyCode === 27) {
          error.style = 'display: none;';
        }
      });
    });
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
    SHARP_END_Y: SHARP_END_Y
  };

})();
