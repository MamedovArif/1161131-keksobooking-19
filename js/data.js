'use strict';
(function () {
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

  window.data = {
    NUMBER_OF_ADS: NUMBER_OF_ADS,
    titles: titles,
    types: types,
    times: times,
    features: features,
    photos: photos,
    randomInteger: randomInteger,
    getArrayRandomLength: getArrayRandomLength,
  };
})();
