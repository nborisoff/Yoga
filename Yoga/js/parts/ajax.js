function ajax() {
	let message = new Object();
	message.loading = 'Загрузка...';
	message.success = 'Спасибо! Скоро мы с вами свяжемся';
	message.failure = 'Что-то пошло не так...';

	let mainForm = document.getElementsByClassName('main-form')[0],
		form = document.getElementById('form'),
		input = document.getElementsByTagName('input'),
		img = document.createElement('img'),
		statusMessage = document.createElement('div');
	statusMessage.classList.add('status');
img.style.padding = '0px 0px 0px 30px';

	mainForm.addEventListener('submit', function(event) {
		event.preventDefault();
		mainForm.appendChild(statusMessage);

		//AJAX
		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		let formData = new FormData(mainForm);
		request.send(formData);

		request.onreadystatechange = function() {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;
					//Добавляем контент на страницу
				} else {
					statusMessage.innerHTML = message.failure;
				}
			}
		}

		for (let i = 0; i < input.length; i++) {
			input[i].value = ''; 
		}
	});

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		let formData = new FormData(form);
		request.send(formData);

		request.onreadystatechange = function() {
			if (request.readyState < 4) {
				img.src = 'img/loading.gif';
				form.appendChild(img);
			} else if (request.readyState === 4) {
				if (request.status == 200 && request.status < 300) {
					img.src = 'img/approval.png';
					form.appendChild(img);
				} else {
					img.src = 'img/failure.png';
					form.appendChild(img);
				}
			}
		}

		for (let i = 0; i < input.length; i++) {
			input[i].value = ''; 
		}
	});
}

module.exports = ajax;