'use strict';
var NUMBER_OF_ADS = 8;
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

var arrayOfAds = getArrayOfAds(NUMBER_OF_ADS);

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderPin = function (ad) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = (ad.location.x - 25) + 'px';
  pin.style.top = (ad.location.y - 70) + 'px';
  pin.querySelector('img').src = ad.author.avatar;
  pin.querySelector('img').alt = ad.offer.title;

  return pin;
};

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
};

var renderCard = function (ad) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = getType(ad);
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
  var cardFeaturesList = card.querySelector('.popup__features');
  cardFeaturesList.querySelector('.popup__feature--wifi').textContent = ad.offer.features[0];

  if (ad.offer.features[1]) {
    cardFeaturesList.querySelector('.popup__feature--dishwasher').textContent = ad.offer.features[1];
  }
  if (ad.offer.features[2]) {
    cardFeaturesList.querySelector('.popup__feature--parking').textContent = ad.offer.features[2];
  }
  if (ad.offer.features[3]) {
    cardFeaturesList.querySelector('.popup__feature--washer').textContent = ad.offer.features[3];
  }
  if (ad.offer.features[4]) {
    cardFeaturesList.querySelector('.popup__feature--elevator').textContent = ad.offer.features[4];
  }
  if (ad.offer.features[5]) {
    cardFeaturesList.querySelector('.popup__feature--conditioner').textContent = ad.offer.features[5];
  }
  card.querySelector('.popup__description').textContent = ad.offer.description;


  var photosContainer = card.querySelector('.popup__photos');
  photosContainer.querySelector('.popup__photo').src = ad.offer.photos[0];
  if (ad.offer.photos[1]) {
    photosContainer.insertAdjacentHTML('beforeend', '<img class="popup__photo-second" width="45" height="40">');
    photosContainer.querySelector('.popup__photo-second').src = ad.offer.photos[1];
  }
  if (ad.offer.photos[2]) {
    photosContainer.insertAdjacentHTML('beforeend', '<img class="popup__photo-third" width="45" height="40">');
    photosContainer.querySelector('.popup__photo-third').src = ad.offer.photos[2];
  }

  card.querySelector('.popup__avatar').src = ad.author.avatar;
  return card;
};

var fragment = document.createDocumentFragment();
var fragment2 = document.createDocumentFragment();
for (var i = 0; i < arrayOfAds.length; i++) {
  fragment.appendChild(renderPin(arrayOfAds[i]));
  //  console.log(renderCard(arrayOfAds[i]));
  fragment2.appendChild(renderCard(arrayOfAds[i]));
}


var form = document.querySelector('.ad-form');
var formInputs = form.querySelectorAll('fieldset');
var mapChildFilters = map.querySelector('.map__filters-container');
var mapFilters = mapChildFilters.querySelectorAll('select');
var mapFeatures = mapChildFilters.querySelector('.map__features');
var mainPin = mapPins.querySelector('.map__pin--main');
var inputAddress = form.querySelector('input[name = address]');

var selectRooms = form.querySelector('select[name = rooms]');
var selectCapacity = form.querySelector('select[name = capacity]');

var submit = form.querySelector('.ad-form__submit');

var timein = form.querySelector('select[name = timein]');
var timeout = form.querySelector('select[name = timeout]');

var typeHousing = form.querySelector('select[name = type]');
var pricePerNight = form.querySelector('input[name = price]');

//  var optionRooms = selectRooms.options;
//  var optionCapacity = selectCapacity.querySelectorAll('option');
/* pricePerNight.addEventListener('click', function () {
   console.log(typeof(pricePerNight.value));
}); */

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
  if (timein.value === '12:00') {
    timeout.value = '12:00';
  } else if (timein.value === '13:00') {
    timeout.value = '13:00';
  } else if (timein.value === '14:00') {
    timeout.value = '14:00';
  }
});

timeout.addEventListener('click', function () {
  if (timeout.value === '12:00') {
    timein.value = '12:00';
  } else if (timeout.value === '13:00') {
    timein.value = '13:00';
  } else if (timeout.value === '14:00') {
    timein.value = '14:00';
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
addDisable(formInputs);
addDisable(mapFilters);
mapFeatures.disabled = true;

var removeDisable = function (arr) {
  for (var y = 0; y < arr.length; y++) {
    arr[y].disabled = false;
  }
};

var activation = function () {
  mapPins.appendChild(fragment);
  map.classList.remove('map--faded');
  removeDisable(formInputs);
  removeDisable(mapFilters);

  mapPins.appendChild(fragment2);
  // mapChildFilters.insertAdjacentHTML('beforebegin', fragment2);


  var adCards = mapPins.querySelectorAll('.map__card');
  var labels = mapPins.querySelectorAll('.map__pin');

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

var INITIAL_SIZE_PIN = 200;
var SIZE_PIN = 65;
var SHARP_END_Y = 22;
var INITIAL_X = parseInt(mainPin.style.left, 10);
var INITIAL_Y = parseInt(mainPin.style.top, 10);
var initialCoorX = INITIAL_X + INITIAL_SIZE_PIN / 2;
var initialCoorY = INITIAL_Y + INITIAL_SIZE_PIN / 2;
var coorY = initialCoorY + SIZE_PIN / 2 + SHARP_END_Y;

var getAddress = function () {
  inputAddress.value = initialCoorX + 'px ' + coorY + 'px';
};

mainPin.addEventListener('mousedown', function () {
  activation();
  getAddress();
});
mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activation();
  }
});

inputAddress.value = initialCoorX + 'px ' + initialCoorY + 'px';


