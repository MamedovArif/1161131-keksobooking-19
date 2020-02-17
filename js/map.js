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


  var ads = [];
  var ftr = [];
  habitationType.addEventListener('change', function() {

    if (habitationType.value === 'flat') {
      ftr = ads.filter((item) => {
      return item.offer.type === 'flat';
      });
    }
    if (habitationType.value === 'bungalo') {
      ftr = ads.filter((item) => {
      return item.offer.type === 'bungalo';
      });
    }
    console.log(ftr);
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
    console.log(pins);
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
    mapFilters: mapFilters
  };

})();
