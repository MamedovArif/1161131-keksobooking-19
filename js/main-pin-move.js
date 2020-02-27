'use strict';
(function () {
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;

  var limits = {
    top: window.window['map-of-ads'].mapPins.offsetTop + TOP_LIMIT,
    bottom: window.window['map-of-ads'].mapPins.offsetTop + BOTTOM_LIMIT,
    left: window.window['map-of-ads'].mapPins.offsetLeft - window.window['map-of-ads'].mainPin.offsetWidth / 2,
    right: window.window['map-of-ads'].mapPins.offsetLeft + window.window['map-of-ads'].mapPins.offsetWidth -
     window.window['map-of-ads'].mainPin.offsetWidth / 2,
  };

  window.window['map-of-ads'].mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mainPinMousemoveHandler = function (moveEvt) {
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

      if ((window.window['map-of-ads'].mainPin.offsetTop - shift.y) < limits.top) {
        window.window['map-of-ads'].mainPin.style.top = limits.top + 'px';
      } else if ((window.window['map-of-ads'].mainPin.offsetTop - shift.y) > limits.bottom) {
        window.window['map-of-ads'].mainPin.style.top = limits.bottom + 'px';
      } else {
        window.window['map-of-ads'].mainPin.style.top = (window.window['map-of-ads'].mainPin.offsetTop - shift.y) + 'px';
      }

      if ((window.window['map-of-ads'].mainPin.offsetLeft - shift.x) < limits.left) {
        window.window['map-of-ads'].mainPin.style.left = limits.left + 'px';
      } else if ((window.window['map-of-ads'].mainPin.offsetLeft - shift.x) > limits.right) {
        window.window['map-of-ads'].mainPin.style.left = limits.right + 'px';
      } else {
        window.window['map-of-ads'].mainPin.style.left = (window.window['map-of-ads'].mainPin.offsetLeft - shift.x) + 'px';
      }
      window['form-sendings'].inputAddress.value = parseInt((window.window['map-of-ads'].mainPin.offsetLeft -
        shift.x + window['form-sendings'].SIZE_PIN / 2), 10) + ' ' +
      parseInt((window.window['map-of-ads'].mainPin.offsetTop - shift.y +
        window['form-sendings'].SIZE_PIN / 2 + window['form-sendings'].SHARP_END_Y), 10);
    };

    var mainPinMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mainPinMousemoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHandler);

      if (dragged) {
        var mainPinClickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          window.window['map-of-ads'].mainPin.removeEventListener('click', mainPinClickPreventDefaultHandler);
        };
        window.window['map-of-ads'].mainPin.addEventListener('click', mainPinClickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', mainPinMousemoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHandler);
  });
})();
