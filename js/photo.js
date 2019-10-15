'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var TAG_NAME = 'img';
//>>>>>>> f48f0736188734513c9144234068904c231be803
  var PropertyPreview = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BACKGROUND_POSITION: '50% 50%',
    BACKGROUND_REPEAT: 'no-repeat'
  };

  var fileChooserAvatar = window.map.adForm.querySelector('.ad-form-header__input');
  var previewAvatar = window.map.adForm.querySelector('.ad-form-header__preview img');
  var previewAvatarDefaultSrc = previewAvatar.src;
  var fileChooserImage = window.map.adForm.querySelector('.ad-form__input');
  var previewImage = window.map.adForm.querySelector('.ad-form__photo');
//>>>>>>> f48f0736188734513c9144234068904c231be803

  var setImage = function (chooser, element) {
    var file = chooser;

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        var readerLoadHandler = function () {
          if (element.tagName.toLowerCase() === TAG_NAME) {
//>>>>>>> f48f0736188734513c9144234068904c231be803
            element.src = reader.result;
          } else {
            element.style.background = 'url(' + reader.result + ') ' + PropertyPreview.BACKGROUND_REPEAT + ' ' + PropertyPreview.BACKGROUND_POSITION;
            element.style.backgroundSize = PropertyPreview.WIDTH + ' ' + PropertyPreview.HEIGHT;
          }
        };

        reader.addEventListener('load', readerLoadHandler);

        reader.readAsDataURL(file);
      }
    }

  };

  fileChooserAvatar.addEventListener('change', function () {
    setImage(fileChooserAvatar.files[0], previewAvatar);
  });

  fileChooserImage.addEventListener('change', function () {
    setImage(fileChooserImage.files[0], previewImage);
  });

  var resetImages = function () {
    previewAvatar.src = previewAvatarDefaultSrc;
    previewImage.style.background = '';
    previewImage.style.backgroundSize = '';
  };

  window.photo = {
    resetImages: resetImages
  };
//>>>>>>> f48f0736188734513c9144234068904c231be803

})();
