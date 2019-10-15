'use strict';

(function () {

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var load = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var xhrLoadHandler = function () {
      if (xhr.status === 200) {
        loadHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.addEventListener('load', xhrLoadHandler);

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000;
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var save = function (data, loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var xhrLoadHandler = function () {
      if (xhr.status === 200) {
        loadHandler();
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.addEventListener('load', xhrLoadHandler);

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000;
    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
