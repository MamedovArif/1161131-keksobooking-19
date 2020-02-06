(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
  for (var i = 0; i < window.arrayOfAds.length; i++) {
  fragment.appendChild(renderPin(window.arrayOfAds[i]));
  //  console.log(renderCard(arrayOfAds[i]));
  fragment2.appendChild(window.card.renderCard(window.arrayOfAds[i]));
  }

  window.map = {
    map: map,
    mapPins: mapPins,
    fragment: fragment,
    fragment2: fragment2,
  }

})();
