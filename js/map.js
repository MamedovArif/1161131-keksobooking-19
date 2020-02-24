'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = mapPins.querySelector('.map__pin--main');

  var mapChildFilters = map.querySelector('.map__filters-container');


  var mapFeatures = mapChildFilters.querySelector('.map__features')
  var inputFeatures = mapFeatures.children;
  inputFeatures = Array.from(inputFeatures).filter(function(item, index) {
    return item.type === 'checkbox';
  });
  var habitationType = mapChildFilters.querySelector('select[name = housing-type]');
  var fieldPrice = mapChildFilters.querySelector('select[name = housing-price]');
  var fieldRooms = mapChildFilters.querySelector('select[name = housing-rooms]');
  var fieldGuests = mapChildFilters.querySelector('select[name = housing-guests]');

  var functionalCard = function () {
    var adCards = window.map.mapPins.querySelectorAll('.map__card');
    var labels = window.map.mapPins.querySelectorAll('.map__pin');
    // скрываем карточки объявлений
    for (var u = 0; u < adCards.length; u++) {
      adCards[u].hidden = true;
    }
    var addLabelClickHandler = function (label, card) {
      label.addEventListener('click', function () {
        for (var i = 1; i < labels.length; i++) {
          adCards[i - 1].hidden = true;
        }
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
  };

  // получаем живую коллекцию меток, хотя это и противоречит критериям
  var mapPin = mapPins.getElementsByClassName('map__pins');
  console.log(mapPin);
  // mapPin = Array.from(mapPin).filter(function(item) {
  //   return item.type === 'button';
  // });
  // document.addEventListener('click', function() {
  //   console.log(mapPin);
  // });

  var adCards = mapPins.getElementsByClassName('map__card');

  var ads = [];
  var habitation = 'any';
  var filterPrice = 'any';
  var filterRooms = 'any';
  var filterGuests = 'any';
  var filterCheckbox = [];
  var mass = [];

  var filterArray = function () {
    var sameHabitation;
    if (habitation !== 'any') {
      sameHabitation = ads.filter(function (item) {
      return item.offer.type === habitation;
    });
    } else {
      sameHabitation = ads;
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
        return elem.offer.price < 10000;
      });
    } else  if (filterPrice === 'middle') {
      samePrice = sameGuests.filter(function (elem) {
        return elem.offer.price < 50000 && elem.offer.price >= 10000;
      });
    } else if (filterPrice === 'high') {
      samePrice = sameGuests.filter(function (elem) {
        return elem.offer.price >= 50000;
      });
    } else if (filterPrice === 'any') {
      samePrice = sameGuests;
    }

    console.log(filterCheckbox);// труфoлсная форма features
    for (var i = 0; i < filterCheckbox.length; i++) {
      if (filterCheckbox[i] === true) {
        mass.push(inputFeatures[i].value);//mass - словесная форма features
      }
    }
    var future = [];  // конечный массив
    if (mass.length !== 0) {
      // нахождение пересечений
      for (var key of samePrice) {
        var acc = 0;
        for (var prop of mass) {
          if (key.offer.features.includes(prop)) {
            acc += 1;
          }
        }
        if (acc === mass.length) {
          future.push(key);
        }
      }
    } else {
      future = samePrice;
    }

    console.log(future);
    if (future.length > 5) {
      future.length = 5;
    }
    var fragmentPin = document.createDocumentFragment();
    var fragmentCard = document.createDocumentFragment();
    for (var k = 0; k < future.length; k++) {
      fragmentPin.appendChild(renderPin(future[k]));
      fragmentCard.appendChild(window.card.renderCard(future[k]));
    }
    mapPins.appendChild(fragmentPin);
    mapPins.appendChild(fragmentCard);
    functionalCard();
  }

  var clearPinCard = function() {
    for (var e = mapPin.length - 1; e >= 1; e--) {
      mapPin[e].remove();
    }
    for (var y = adCards.length - 1; y >= 0; y--) {
      adCards[y].remove();
    }
  }

  habitationType.addEventListener('change', function () {
    clearPinCard();
    habitation = habitationType.value;
    window.setTimeout(function () {
      filterArray();
    }, 500);
  });
  fieldRooms.addEventListener('change', function () {
    clearPinCard();
    filterRooms = fieldRooms.value;
    console.log(filterRooms);
    window.setTimeout(function () {
      filterArray();
    }, 500);
  });
  fieldGuests.addEventListener('change', function () {
    clearPinCard();
    filterGuests = fieldGuests.value;
    window.setTimeout(function () {
      filterArray();
    }, 500);
  });
  fieldPrice.addEventListener('change', function () {
    clearPinCard();
    filterPrice = fieldPrice.value;
    window.setTimeout(function () {
      filterArray();
    }, 500);
  });
  var callback = function (element) {
    element.addEventListener('change', function () {
      clearPinCard();
      filterCheckbox = [];
      mass = [];
      for (var j = 0; j < inputFeatures.length; j++) {
        filterCheckbox.push(inputFeatures[j].checked);
      }
      console.log(filterCheckbox);
      window.setTimeout(function () {
      filterArray();
    }, 500);
    });
  }
  for (var i = 0; i < inputFeatures.length; i++) { //повесили обработчик события
    callback(inputFeatures[i]);                    // на каждый чекбокс
  }

  var renderPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = (ad.location.x - 25) + 'px';
    pin.style.top = (ad.location.y - 70) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;

    return pin;
  };

  var fragment = document.createDocumentFragment();
  var fragment2 = document.createDocumentFragment();

  var successHandler = function (pins) {
    ads = pins;
    console.log(ads);
    for (var k = 0; k < 5; k++) {//кол-во элемнтов в мешках
      fragment.appendChild(renderPin(pins[k]));
      fragment2.appendChild(window.card.renderCard(pins[k]));
    }
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

  window.server.load(successHandler, errorHandler);

  window.map = {
    map: map,
    mapPins: mapPins,
    fragment: fragment,
    fragment2: fragment2,
    mainPin: mainPin,
    mapFeatures: mapFeatures,
    mapChildFilters: mapChildFilters,
    mapPin: mapPin,
    functionalCard: functionalCard
  };

})();
