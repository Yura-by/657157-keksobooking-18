'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var TAG_NAME = 'img';
  var INDEX_IMAGE = 0;
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

  var setImage = function (file, element) {

    if (file && element) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        var readerLoadHandler = function () {
          if (element.tagName.toLowerCase() === TAG_NAME) {
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
    setImage(fileChooserAvatar.files[INDEX_IMAGE], previewAvatar);
  });

  fileChooserImage.addEventListener('change', function () {
    setImage(fileChooserImage.files[INDEX_IMAGE], previewImage);
  });

  var resetImages = function () {
    previewAvatar.src = previewAvatarDefaultSrc;
    previewImage.style.background = '';
    previewImage.style.backgroundSize = '';
  };

  window.photo = {
    resetImages: resetImages
  };

})();
