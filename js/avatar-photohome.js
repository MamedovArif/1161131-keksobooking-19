'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooseFile = window.form.form.
  querySelector('.ad-form__field input[type=file]');

  var avatarUser = window.form.form.
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

      reader.readAsDataURL(file);
    }
  })


})();
