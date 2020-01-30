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
var createOffer = function (title, type, checkin, checkout, feature, photo) {
  var offer = {
    title: title,
    address: 'uyt',
    price: 0,
    type: type,
    rooms: 0,
    guests: 0,
    checkin: checkin,
    checkout: checkout,
    features: feature,
    description: 'vklllfk fnlkklvl fnlkkjfjfl',
    photos: photo,
  };
  return offer;
};

var renderAd = function (index, x1, x2, y1, y2) {
  var mainObject = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    },
    offer: createOffer(titles[randomInteger(0, titles.length - 1)],
        types[randomInteger(0, types.length - 1)],
        times[randomInteger(0, times.length - 1)],
        times[randomInteger(0, times.length - 1)],
        getArrayRandomLength(features), getArrayRandomLength(photos)),
    location: {
      x: randomInteger(x1, x2),
      y: randomInteger(y1, y2)
    }
  };
  return mainObject;
};

var getArrayOfAds = function (numberOfAds) {
  var mainArray = [];
  for (var i = 1; i <= numberOfAds; i++) {
    mainArray.push(renderAd(i, 0, 1000, 130, 630));
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

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var getType = function (arr) {
  var type;
  if (arr.offer.type === 'palace') {
    type = 'Дворец';
  } if (arr.offer.type === 'flat') {
    type = 'Квартира';
  } if (arr.offer.type === 'house') {
    type = 'Дом';
  } if (arr.offer.type === 'bungalo') {
    type = 'Бунгало';
  }
  return type;
}
/*
var newName = '<img>Кощей Бессмертный';
var heroName = document.querySelector('b');
var getPopupPhot = function(array) {
  for (var i = 0; i <= array.length; i++) {
    heroName.innerHTML = newName;
  }
}
*/

var renderCard = function (ad) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = getType(ad);
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
  //card.querySelector('.popup__features').textContent = getPopupPhot(ad.offer.features);
  card.querySelector('.popup__description').textContent = ad.offer.description;
  //card.querySelector('popup__photos').src = getPopupPhot(ad.offer.photos);

  card.querySelector('.popup__avatar').src = ad.author.avatar;

  return card;
}

var fragment = document.createDocumentFragment();
var fragment2 = document.createDocumentFragment();
for (var i = 0; i < arrayOfAds.length; i++) {
  fragment.appendChild(renderPin(arrayOfAds[i]));
  fragment2.appendChild(renderCard(arrayOfAds[i]));
}
mapPins.appendChild(fragment);
console.log(fragment);

var mapChildFilters = map.querySelector('.map__filters-container');
//mapChildFilters.insertAdjacentHTML('beforebegin', fragment2);
//mapPins.insertAdjacentHTML('afterend', fragment2);


  //arrayOfAds[i].offer.photos; insertAdjacentHTML




