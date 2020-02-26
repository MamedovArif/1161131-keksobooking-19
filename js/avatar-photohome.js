'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooseFile = window['form-sendings'].form.
  querySelector('.ad-form__field input[type=file]');
  var avatarUser = window['form-sendings'].form.
  querySelector('.ad-form-header__preview img');

  chooseFile.addEventListener('change', function () {
    var avatar = chooseFile.files[0];
    var avatarName = avatar.name.toLowerCase();

    var barrier = FILE_TYPES.some(function (item) {
      return avatarName.endsWith(item);
    });

    if (barrier) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarUser.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });

  var choosePhoto = window['form-sendings'].form.
  querySelector('.ad-form__upload input[type=file]');
  var habitationPhoto = window['form-sendings'].form.
  querySelector('.ad-form__photo img');

  choosePhoto.addEventListener('change', function () {
    var home = choosePhoto.files[0];
    var homeName = home.name.toLowerCase();

    var barrier2 = FILE_TYPES.some(function (item) {
      return homeName.endsWith(item);
    });

    if (barrier2) {
      var reader2 = new FileReader();

      reader2.addEventListener('load', function () {
        habitationPhoto.src = reader2.result;
      });

      reader2.readAsDataURL(home);
    }
  });
})();
