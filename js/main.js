'use strict';

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

var titles = ['домик', 'ночлег', 'конура', 'нора', 'гнездо', 'облако', 'токио', 'жилье'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getArrayRandomLength = function (arr) {
  var random = randomInteger(0, arr.length - 1);
  var part = [];
  for (var i = 0; i <= random; i++) {
    part.push(arr[i]);
  }
  return part;
};

var renderAd = function (index, title, type, checkin, checkout, feature, photo, x, y) {
  var mainObject = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    },
    offer: {
      title: title,
      address: '',
      price: 0,
      type: type,
      rooms: 0,
      guests: 0,
      checkin: checkin,
      checkout: checkout,
      features: feature,
      description: '',
      photos: photo
    },
    location: {
      x: x,
      y: y
    }
  };
  return mainObject;
};

var getArrayOfAds = function (numberOfAds) {
  var mainArray = [];
  for (var i = 1; i <= numberOfAds; i++) {
    mainArray.push(renderAd(i, titles[randomInteger(0, titles.length - 1)],
        types[randomInteger(0, types.length - 1)],
        times[randomInteger(0, times.length - 1)],
        times[randomInteger(0, times.length - 1)],
        getArrayRandomLength(features), getArrayRandomLength(photos),
        randomInteger(0, 500), randomInteger(130, 630)));
  }
  return mainArray;
};

var arrayOfAds = getArrayOfAds(8);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
for (var i = 0; i < arrayOfAds.length; i++) {
  fragment.appendChild(renderPin(arrayOfAds[i]));
}
mapPins.appendChild(fragment);
