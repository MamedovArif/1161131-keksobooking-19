function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', "parking", 'washer', 'elevator', 'conditioner'];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var random = randomInteger(0, 5);
console.log(random);
var featuresArray = [];
for (var i = 0; i <= random; i++) {

  featuresArray.push(features[i]);

}

console.log(featuresArray);

var createArray = function () {
  var mainArray = [];

  for (var i = 1; i <= 8; i++) {
    var mainObject = {
      autor: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: '',
        address: '',
        price: 0,
        type: types[randomInteger(0, types.length - 1)],
        rooms: 0,
        guests: 0,
        checkin: times[randomInteger(0, times.length - 1)],
        checkout: times[randomInteger(0, times.length - 1)],
        features: features[randomInteger(0, features.length - 1)],
        description: '',
        photos: []
      },
      location: {
        x: randomInteger(0, window.width),
        y: randomInteger(130, 630),
      }
    }

    mainArray.push(mainObject);
  }
  return mainArray;
}

console.log(createArray());


var map = document.querySelector('.map');
map.classList.remove('map--faded');
/*
var card = document.querySelector('#pin').content.querySelector('.map__pin');
card.setAttribute('style', 'left: location.x + X', 'top: location.y + Y');
var avatar = card.querySelector('img');
avatar.src = '' + author.avatar;
avatar.alt = '' + offer.title; */

