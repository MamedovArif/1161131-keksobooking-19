'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = mapPins.querySelector('.map__pin--main');

  var mapChildFilters = map.querySelector('.map__filters-container');
  var mapFilters = mapChildFilters.querySelectorAll('select');
  var mapFeatures = mapChildFilters.querySelector('.map__features');
  var habitationType = mapChildFilters.querySelector('select[name = housing-type]');

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
  var mapPin = mapPins.getElementsByClassName('map__pin');
  var adCards = mapPins.getElementsByClassName('map__card');

  var ftr = [];
  var ads = [];
  habitationType.addEventListener('change', function () {
    for (var e = mapPin.length - 1; e >= 1; e--) {
      mapPin[e].remove();
    }
    for (var y = 0; y < adCards.length; y++) {
      adCards[y].remove();
    }

    if (habitationType.value === 'flat') {
      ftr = ads.filter(function (item) {
        return item.offer.type === 'flat';
      });
    } else if (habitationType.value === 'bungalo') {
      ftr = ads.filter(function (item) {
        return item.offer.type === 'bungalo';
      });
    } else if (habitationType.value === 'palace') {
      ftr = ads.filter(function (item) {
        return item.offer.type === 'palace';
      });
    } else if (habitationType.value === 'house') {
      ftr = ads.filter(function (item) {
        return item.offer.type === 'house';
      });
    } else if (habitationType.value === 'any') {
      ftr = ads.filter(function (item) {
        return item;
      });
    }
    if (ftr.length > 5) {
      ftr.length = 5;
    }
    var fragmentPin = document.createDocumentFragment();
    var fragmentCard = document.createDocumentFragment();
    for (var k = 0; k < ftr.length; k++) {
      fragmentPin.appendChild(renderPin(ftr[k]));
      fragmentCard.appendChild(window.card.renderCard(ftr[k]));
    }
    mapPins.appendChild(fragmentPin);
    mapPins.appendChild(fragmentCard);
    functionalCard();
  });


  var removeDisable = function (arr) {
    for (var y = 0; y < arr.length; y++) {
      arr[y].disabled = false;
    }
  };

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
    for (var k = 0; k < 10; k++) {
      fragment.appendChild(renderPin(pins[k]));
      fragment2.appendChild(window.card.renderCard(pins[k]));
    }
    removeDisable(mapFilters);
    mapFeatures.disabled = false;
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
    removeDisable: removeDisable,
    mapFilters: mapFilters,
    mapPin: mapPin,
    functionalCard: functionalCard
  };

})();
