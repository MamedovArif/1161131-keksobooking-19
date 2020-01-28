'use strict';

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

var NUMBER_OF_ADS = 8;

var titles = ['домик', 'ночлег', 'конура', 'нора', 'гнездо', 'облако', 'токио', 'жилье'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];

var getFeatures = function () {
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var random = randomInteger(0, features.length - 1);
  var featuresPart = [];
  for (var i = 0; i <= random; i++) {
    featuresPart.push(features[i]);
  }
  return featuresPart;
};

var getPhotos = function () {
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var random = randomInteger(0, photos.length - 1);
  var photosPart = [];
  for (var i = 0; i <= random; i++) {
    photosPart.push(photos[i]);
  }
  return photosPart;
};

var renderAd = function (index) {
  var mainObject = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    },
    offer: {
      title: titles[randomInteger(0, titles.length - 1)],
      address: '',
      price: 0,
      type: types[randomInteger(0, types.length - 1)],
      rooms: 0,
      guests: 0,
      checkin: times[randomInteger(0, times.length - 1)],
      checkout: times[randomInteger(0, times.length - 1)],
      features: getFeatures(),
      description: '',
      photos: getPhotos()
    },
    location: {
      x: randomInteger(0, 500),
      y: randomInteger(130, 630),
    }
  };
  return mainObject;
};

var getArrayOfAds = function () {
  var mainArray = [];
  for (var i = 1; i <= NUMBER_OF_ADS; i++) {
    mainArray.push(renderAd(i));
  }
  return mainArray;
};

var arrayOfAds = getArrayOfAds();

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
