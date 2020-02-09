'use strict';
(function () {

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (parseInt(window.map.mainPin.style.top, 10) >= 130 &&
        parseInt(window.map.mainPin.style.top, 10) <= 630) {
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      }
      window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
      window.form.inputAddress.value = (window.map.mainPin.offsetLeft - shift.x + window.form.SIZE_PIN / 2) + 'px ' +
      (window.map.mainPin.offsetTop - shift.y + window.form.SIZE_PIN / 2 + window.form.SHARP_END_Y) + 'px';


    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      /*  if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault)
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      } */

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
