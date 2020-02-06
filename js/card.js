(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var getType = function (arr) {
    var type;
    switch(arr.offer.type) {
      case 'palace':
        type = 'Дворец';
        break;
      case 'flat':
        type = 'Квартира';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
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

  window.card = {
    renderCard: renderCard,
  }
})();
