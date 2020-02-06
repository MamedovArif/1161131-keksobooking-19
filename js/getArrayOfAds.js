(function () {
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
      offer: createOffer(window.data.titles[window.data.randomInteger(0, window.data.titles.length - 1)],
          window.data.types[window.data.randomInteger(0, window.data.types.length - 1)],
          window.data.times[window.data.randomInteger(0, window.data.times.length - 1)],
          window.data.times[window.data.randomInteger(0, window.data.times.length - 1)],
          window.data.getArrayRandomLength(window.data.features),
          window.data.getArrayRandomLength(window.data.photos)),
      location: {
        x: window.data.randomInteger(x1, x2),
        y: window.data.randomInteger(y1, y2)
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

  var arrayOfAds = getArrayOfAds(window.data.NUMBER_OF_ADS);

  window.arrayOfAds = arrayOfAds;

})();
