'use strict';
(function () {
  var title = window.map.mapPins.querySelector('.map__title');
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;
  console.log(title);
  var limits = {
    top: window.map.mapPins.offsetTop + TOP_LIMIT,
    bottom: window.map.mapPins.offsetTop + BOTTOM_LIMIT,
    left: window.map.mapPins.offsetLeft - window.map.mainPin.offsetWidth / 2,
    right: window.map.mapPins.offsetLeft + window.map.mapPins.offsetWidth -
     window.map.mainPin.offsetWidth / 2,
  };
  console.log(window.map.mapPins.offsetWidth);
  console.log(window.map.mapPins.offsetLeft);
  console.log(window.map.mainPin.offsetHeight);


  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((window.map.mainPin.offsetTop - shift.y) < limits.top )  {
        window.map.mainPin.style.top = limits.top + 'px';
      } else if((window.map.mainPin.offsetTop - shift.y) > limits.bottom ) {
        window.map.mainPin.style.top = limits.bottom + 'px';
      } else {
      window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      }

      if ((window.map.mainPin.offsetLeft - shift.x) < limits.left) {
        window.map.mainPin.style.left = limits.left + 'px';
      } else if ((window.map.mainPin.offsetLeft - shift.x) > limits.right) {
        window.map.mainPin.style.left = limits.right + 'px';
      } else {
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
      }
      window.form.inputAddress.value = (window.map.mainPin.offsetLeft -
        shift.x + window.form.SIZE_PIN / 2) + 'px ' +
      (window.map.mainPin.offsetTop - shift.y +
        window.form.SIZE_PIN / 2 + window.form.SHARP_END_Y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.map.mainPin.removeEventListener('click', onClickPreventDefault)
        };
        window.map.mainPin.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
