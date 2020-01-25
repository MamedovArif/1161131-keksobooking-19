var types = ['palace', 'flat', 'house', 'bungalo'];
var features =['wifi', 'dishwasher', "parking", 'washer', 'elevator', 'conditioner'];

var createArray = function (number) {
  var mainArray = [];

  for (var i = 1; i <= number; i++) {
    var mainObject = {
      autor: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: '',
        address: 'location.x, location.y',
        price: 0,
        type: function () {

          var types = ['palace', 'flat', 'house', 'bungalo'];
          return types[random];

          },
        rooms: 0,
        checkin: 'time1',
        checkout: 'time2',
        features: [],
        description: '',
        photos: []
      },
      location: {
        x: 0,
        y: 130
      }
    }

    mainArray.push(mainObject);
  }
  return mainArray;
}

console.log(createArray(8));


var map = document.querySelector('.map');
map.classList.remove('map--faded');

