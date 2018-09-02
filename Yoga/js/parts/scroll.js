"use strict";

require("core-js/modules/es6.regexp.replace");

function scroll() {
  var menu = document.querySelectorAll('[href^="#"]'),
      navElem = document.querySelector('.container'),
      speed = 0.3;

  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.add('nav-elem');
  }
  
    navElem.addEventListener('click', function (event) {
      event.preventDefault();

      if (event.target && event.target.className == 'nav-elem') {
      
        var currentScroll = window.pageYOffset,
            //текущая прокрутка
        elem = event.target.href.replace(/[^#]*(.*)/, '$1'),
            //элемент, к которому переходим
        windowCoordinates = document.querySelector(elem).getBoundingClientRect().top,
            //координаты элемента относительно окна
        start = null;

        function scroll(time) {
          if (start == null) {
            start = time;
          }

          var progress = time - start,
              y;

          if (windowCoordinates < 0) {
            y = Math.max(currentScroll - progress / speed, currentScroll + windowCoordinates);
          } else {
            y = Math.min(currentScroll + progress / speed, currentScroll + windowCoordinates);
          }

          window.scrollTo(0, y);

          if (y != currentScroll + windowCoordinates) {
            requestAnimationFrame(scroll);
          } else {
            location.elem = elem;
          }
        }

        requestAnimationFrame(scroll);
      }
    });
}

module.exports = scroll;