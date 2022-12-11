'use strict'

// запрещаем переход по ссылкам в футере, при клике происходит просто анимация))
let footerLinks = document.querySelectorAll('.footer-navigation-links__link');
footerLinks.forEach((link) => link.addEventListener('click', (e) => {
	e.preventDefault();
	link.classList.toggle('link-stop');
}));