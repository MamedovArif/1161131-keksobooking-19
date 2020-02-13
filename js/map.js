'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = mapPins.querySelector('.map__pin--main');

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
    for (var k = 0; k < 8; k++) {
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
    mainPin: mainPin
  };

})();
