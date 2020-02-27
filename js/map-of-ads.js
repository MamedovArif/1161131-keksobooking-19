'use strict';
(function () {
  var MAX_QUANTITY_ADS = 5;
  var ESCAPE_CODE = 27;
  var ENTER_CODE = 13;
  var LEFT_BUTTON_MOUSE = 1;

  var DELAY_TIMEOUT = 500;

  var WIDTH_MAP_PIN = 50;
  var HEIGHT_MAP_PIN = 70;

  var LOWER_LIMIT_MIDDLE_PRICE_PER_HOUSING = 10000;
  var LOWER_LIMIT_HIGH_PRICE_PER_HOUSING = 50000;


  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = mapPins.querySelector('.map__pin--main');

  var mapChildFilters = map.querySelector('.map__filters-container');

  var mapFeatures = mapChildFilters.querySelector('.map__features');
  var inputFeatures = mapFeatures.querySelectorAll('input[name = features]');
  var habitationType = mapChildFilters.querySelector('select[name = housing-type]');
  var fieldPrice = mapChildFilters.querySelector('select[name = housing-price]');
  var fieldRooms = mapChildFilters.querySelector('select[name = housing-rooms]');
  var fieldGuests = mapChildFilters.querySelector('select[name = housing-guests]');


  var findSelector = function (where, what) {
    return where.querySelectorAll(what);
  };

  var functionalCard = function () {
    var adCards = findSelector(mapPins, '.map__card');
    var labels = findSelector(mapPins, '.map__pin');
    // скрываем карточки объявлений
    for (var u = 0; u < adCards.length; u++) {
      adCards[u].hidden = true;
    }
    var addLabelClickHandler = function (label, card) {
      label.addEventListener('click', function () {
        for (var i = 1; i < labels.length; i++) {
          adCards[i - 1].hidden = true;
          labels[i].classList.remove('map__pin--active');
        }
        card.hidden = false;
        label.classList.add('map__pin--active');
        var adClose = card.querySelector('.popup__close');
        adClose.addEventListener('click', function () {
          card.hidden = true;
        });
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === ESCAPE_CODE) {
            card.hidden = true;
          }
        });
      });
    };
    for (var r = 1; r < labels.length; r++) {
      addLabelClickHandler(labels[r], adCards[r - 1]);
    }
  };

  var externalArrayAds;
  var habitation = 'any';
  var filterPrice = 'any';
  var filterRooms = 'any';
  var filterGuests = 'any';
  var booleanFeatures = [];
  var wordFeatures = [];

  var filterArray = function (arr) {
    var sameHabitation;
    if (habitation !== 'any') {
      sameHabitation = arr.filter(function (item) {
        return item.offer.type === habitation;
      });
    } else {
      sameHabitation = arr.slice();
    }
    var sameRooms;
    if (filterRooms !== 'any') {
      sameRooms = sameHabitation.filter(function (elem) {
        return elem.offer.rooms === Number(filterRooms);
      });
    } else {
      sameRooms = sameHabitation;
    }
    var sameGuests;
    if (filterGuests !== 'any') {
      sameGuests = sameRooms.filter(function (elem) {
        return elem.offer.guests === Number(filterGuests);
      });
    } else {
      sameGuests = sameRooms;
    }
    var samePrice;
    if (filterPrice === 'low') {
      samePrice = sameGuests.filter(function (elem) {
        return elem.offer.price < LOWER_LIMIT_MIDDLE_PRICE_PER_HOUSING;
      });
    } else if (filterPrice === 'middle') {
      samePrice = sameGuests.filter(function (elem) {
        return elem.offer.price < LOWER_LIMIT_HIGH_PRICE_PER_HOUSING && elem.offer.price >=
        LOWER_LIMIT_MIDDLE_PRICE_PER_HOUSING;
      });
    } else if (filterPrice === 'high') {
      samePrice = sameGuests.filter(function (elem) {
        return elem.offer.price >= LOWER_LIMIT_HIGH_PRICE_PER_HOUSING;
      });
    } else if (filterPrice === 'any') {
      samePrice = sameGuests;
    }

    for (var i = 0; i < booleanFeatures.length; i++) {
      if (booleanFeatures[i] === true) {
        wordFeatures.push(inputFeatures[i].value);
      }
    }
    var ultimateArrayAds = [];
    if (wordFeatures.length !== 0) {
      // нахождение пересечений
      for (var n = 0; n < samePrice.length; n++) {
        var acc = 0;
        for (var v = 0; v < wordFeatures.length; v++) {
          if (samePrice[n].offer.features.includes(wordFeatures[v])) {
            acc += 1;
          }
        }
        if (acc === wordFeatures.length) {
          ultimateArrayAds.push(samePrice[n]);
        }
      }
    } else {
      ultimateArrayAds = samePrice;
    }

    var fragmentPin = document.createDocumentFragment();
    var fragmentCard = document.createDocumentFragment();
    for (var k = 0; k < Math.min(ultimateArrayAds.length, MAX_QUANTITY_ADS); k++) {
      fragmentPin.appendChild(renderPin(ultimateArrayAds[k]));
      fragmentCard.appendChild(window.card.renderCard(ultimateArrayAds[k]));
    }
    mapPins.appendChild(fragmentPin);
    mapPins.appendChild(fragmentCard);
    functionalCard();
  };

  var clearPinCard = function () {
    var adCards = findSelector(mapPins, '.map__card');
    var mapPin = findSelector(mapPins, '.map__pin');
    for (var e = mapPin.length - 1; e >= 1; e--) {
      mapPin[e].remove();
    }
    for (var y = adCards.length - 1; y >= 0; y--) {
      adCards[y].remove();
    }
  };

  habitationType.addEventListener('change', function () {
    clearPinCard();
    habitation = habitationType.value;
    window.setTimeout(function () {
      filterArray(externalArrayAds);
    }, DELAY_TIMEOUT);
  });
  fieldRooms.addEventListener('change', function () {
    clearPinCard();
    filterRooms = fieldRooms.value;
    window.setTimeout(function () {
      filterArray(externalArrayAds);
    }, DELAY_TIMEOUT);
  });
  fieldGuests.addEventListener('change', function () {
    clearPinCard();
    filterGuests = fieldGuests.value;
    window.setTimeout(function () {
      filterArray(externalArrayAds);
    }, DELAY_TIMEOUT);
  });
  fieldPrice.addEventListener('change', function () {
    clearPinCard();
    filterPrice = fieldPrice.value;
    window.setTimeout(function () {
      filterArray(externalArrayAds);
    }, DELAY_TIMEOUT);
  });
  var callback = function (element) {
    element.addEventListener('change', function () {
      clearPinCard();
      booleanFeatures = [];
      wordFeatures = [];
      for (var j = 0; j < inputFeatures.length; j++) {
        booleanFeatures.push(inputFeatures[j].checked);
      }
      window.setTimeout(function () {
        filterArray(externalArrayAds);
      }, DELAY_TIMEOUT);
    });
  };
  for (var i = 0; i < inputFeatures.length; i++) {
    callback(inputFeatures[i]);
  }

  var clearFilter = function () {
    habitationType.value = 'any';
    fieldRooms.value = 'any';
    fieldGuests.value = 'any';
    fieldPrice.value = 'any';
    for (var m = 0; m < inputFeatures.length; m++) {
      inputFeatures[m].checked = false;
    }
  };

  var renderPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = (ad.location.x - WIDTH_MAP_PIN / 2) + 'px';
    pin.style.top = (ad.location.y - HEIGHT_MAP_PIN) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;

    return pin;
  };

  var externalPrimaryAddition;

  var successHandler = function (pins) {
    externalArrayAds = pins.slice();
    console.log(externalArrayAds);
    externalPrimaryAddition = pins.slice();
    window.externalPrimaryAddition = externalPrimaryAddition;
  };

  var errorHandler = function (error) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
  };



  window['map-of-ads'] = {
    'successHandler': successHandler,
    'errorHandler': errorHandler,
    'map': map,
    'mapPins': mapPins,
    'mainPin': mainPin,
    'mapFeatures': mapFeatures,
    'mapChildFilters': mapChildFilters,
    'renderPin': renderPin,
    'functionalCard': functionalCard,
    'clearFilter': clearFilter,
    'clearPinCard': clearPinCard,
    'ESCAPE_CODE': ESCAPE_CODE,
    'ENTER_CODE': ENTER_CODE,
    'LEFT_BUTTON_MOUSE': LEFT_BUTTON_MOUSE,
    'MAX_QUANTITY_ADS': MAX_QUANTITY_ADS,
  };
})();
