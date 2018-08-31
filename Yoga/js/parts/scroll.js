function scroll() {

	let menu = document.querySelectorAll('[href^="#"]'),
    	speed = 0.3;  

	for (let i = 0; i < menu.length; i++) {
	    menu[i].addEventListener('click', function(event) {
	        event.preventDefault();
	        let currentScroll = window.pageYOffset, //текущая прокрутка
	            elem = this.href.replace(/[^#]*(.*)/, '$1'), //элемент, к которому переходим
	            windowCoordinates = document.querySelector(elem).getBoundingClientRect().top, //координаты элемента относительно окна
	        	start = null;
	        
	        function scroll(time) {
	            if (start == null) {
	            	start = time;
	            }

	            let progress = time - start,
	            	y;

	            if (windowCoordinates < 0) {
	            	y = Math.max(currentScroll - progress/speed, currentScroll + windowCoordinates);
	            }else {
	               	y = Math.min(currentScroll + progress/speed, currentScroll + windowCoordinates);
	            }

	            window.scrollTo(0,y);

	            if (y != currentScroll + windowCoordinates) {
	                requestAnimationFrame(scroll);
	            } else {
	                location.elem = elem;
	            }
	        }

	        requestAnimationFrame(scroll);
	    });
	}
}

module.exports = scroll;