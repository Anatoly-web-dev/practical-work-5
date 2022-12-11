'use strict';
// ----------------------- Основной функционал калькулятора ------------------------

let operators = document.querySelectorAll('.operations__btn'); // кнопки блока операций
let [sum, minus, divide, multiply, exponentiation, percent, root, clear, equal] = operators; // деструктуризация
const inputValueField = document.querySelector('.calculator-screen__input'); // поле ввода
const resultValueField = document.querySelector('.calculator-screen__result'); // поле вывода результата
let num1 = '';	// число 1
let num2 = ''; // число 2
let operation = ''; // тип операции
let result = false; // получен ли результат

// при нажатии на кнопку из блока цифр, выводим эти числа в поле ввода и присваиваем переменной num1
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('num')) {

		if (num2 === '' && operation === '') {
			if (num1 !== '' && e.target.textContent === '.' && num1.includes('.')) return;
			else {
				num1 += e.target.textContent;
				inputValueField.textContent = num1;
			}
		} else if (num2 !== '' && operation !== '' && result === true) {
			if (num2 !== '' && e.target.textContent === '.' && num2.includes('.')) return;
			else {
				num2 += e.target.textContent;
				result = false;
				inputValueField.textContent = num2;
			}
		} else {
			if (num2 !== '' && e.target.textContent === '.' && num2.includes('.')) return;
			else {
				num2 += e.target.textContent;
				inputValueField.textContent = num2;
			}
		}
	}

});

// при нажатии на кнопку из блока операций, выводим значение этой операции в поле ввода
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('operation')) {
		operation = e.target.textContent;
		inputValueField.textContent = operation;
	}
	// если нажали кнопку =, то в зависимости от значения operation выполняем математические операции
	if (e.target.textContent === '=') {

		if (num2 === '') {
			num2 = num1;
		}
		// сложение
		if (operation === '+') {
			num1 = +num1 + +num2;
			result = true;

			if (!Number.isInteger(num1)) {
				resultValueField.textContent =
					`${(num1 - num2).toFixed(3)} ${operation} ${(+num2).toFixed(3)} = ${(+num1).toFixed(3)}`;
				inputValueField.textContent = (+num1).toFixed(3);
			} else {
				resultValueField.textContent = `${num1 - num2} ${operation} ${num2} = ${num1}`;
				inputValueField.textContent = num1;
			}

			num2 = '';
			// умножение
		} else if (operation === 'х') {
			num1 = num1 * num2;
			result = true;

			if (!Number.isInteger(num1)) {
				resultValueField.textContent =
					`${(num1 / num2).toFixed(3)} ${operation} ${(+num2).toFixed(3)} = ${(+num1).toFixed(3)}`;
				inputValueField.textContent = (+num1).toFixed(3);
			} else {
				resultValueField.textContent = `${num1 / num2} ${operation} ${num2} = ${num1}`;
				inputValueField.textContent = num1;
			}

			num2 = '';
			// вычитание
		} else if (operation === '-') {
			num1 = num1 - num2;
			result = true;

			if (!Number.isInteger(num1)) {
				resultValueField.textContent =
					`${(+num1 + +num2).toFixed(3)} ${operation} ${(+num2).toFixed(3)} = ${(+num1).toFixed(3)}`;
				inputValueField.textContent = (+num1).toFixed(3);
			} else {
				resultValueField.textContent = `${num1 + +num2} ${operation} ${num2} = ${num1}`;
				inputValueField.textContent = num1;
			}

			num2 = '';
			// деление
		} else if (operation === '÷') {

			if (num2 === '0') {
				num1 = num1 / num2;
				inputValueField.textContent = `Ошибка! Деление на 0!`;
				resultValueField.textContent = `В JS это +/- Infinity!`;
				setTimeout(clearField, 5000);
			} else {
				num1 = num1 / num2;
				result = true;

				if (!Number.isInteger(num1)) {
					resultValueField.textContent =
						`${(num1 * num2).toFixed(3)} ${operation} ${(+num2).toFixed(3)} = ${(+num1).toFixed(3)}`;
					inputValueField.textContent = (+num1).toFixed(3);
				} else {
					resultValueField.textContent = `${num1 * num2} ${operation} ${num2} = ${num1}`;
					inputValueField.textContent = num1;
				}

				num2 = '';
			}
			// возведение в степень
		} else if (operation === 'xn') {
			num1 = num1 ** num2;
			result = true;

			if (!Number.isInteger(num1)) {
				resultValueField.textContent = `Основание не целое число :(`;
				setTimeout(clearField, 4000);
			} else {
				num1 = Math.round(num1);
				resultValueField.textContent = `${Math.round(Math.pow(num1, 1 / num2))} ** ${num2} = ${num1}`;
				inputValueField.textContent = num1;
			}

			num2 = '';
			// расчет процентов
		} else if (operation === '%') {
			num1 = num1 / 100 * num2;
			result = true;

			if (!Number.isInteger(num1)) {
				resultValueField.textContent =
					`${(num1 / num2 * 100).toFixed(3)} ${operation} ${(+num2).toFixed(3)} = ${(+num1).toFixed(3)}`;
				inputValueField.textContent = (+num1).toFixed(3);
			} else {
				resultValueField.textContent = `${(num1 / num2 * 100)} ${operation} ${num2} = ${num1}`;
				inputValueField.textContent = num1;
			}

			num2 = '';
			// Если что то пошло не так :)
		} else {
			clearField();
		}
	}
})

// очищаем поля ввода и рещультата, переменные получают указанные значения
function clearField() {
	num1 = '';
	num2 = '';
	operation = '';
	result = false;
	inputValueField.textContent = '';
	resultValueField.textContent = '';
}
clear.addEventListener('click', clearField);
// квадратный корень
root.addEventListener('click', (e) => {
	num1 = Math.sqrt(num1);
	result = true;
	if (!Number.isInteger(num1)) {
		resultValueField.textContent = `${(num1 * num1).toFixed(3)} ${e.target.textContent} = ${(+num1).toFixed(3)}`;
		inputValueField.textContent = (+num1).toFixed(3);
	} else {
		resultValueField.textContent = `${num1 * num1} ${e.target.textContent} = ${num1}`;
		inputValueField.textContent = num1;
	}
});
// меняем знак на противоположный
document.querySelector('.change-sign-btn').addEventListener('click', () => {
	num1 *= -1;
	result = true;
	if (!Number.isInteger(num1)) {
		resultValueField.textContent = (+num1).toFixed(3);
		inputValueField.textContent = (+num1).toFixed(3);
	} else {
		resultValueField.textContent = num1;
		inputValueField.textContent = num1;
	}
});

// ---------------- внешний вид ----------------

const onOffBtn = document.querySelectorAll('.calculator-menu__btn')[0];	// кнопка вкл/выкл
const changeTheme = document.querySelectorAll('.calculator-menu__btn')[1];// кнопка смены темы
const calculatorScreen = document.querySelector('.calculator-screen'); // дисплей калькулятора
// выключаем экран калькулятора))
onOffBtn.addEventListener('click', () => {
	calculatorScreen.classList.toggle('calculator-screen-alt');
	resultValueField.classList.toggle('calculator-screen__result-alt');
	inputValueField.classList.toggle('calculator-screen__input-alt');
	clearField();
});
// меняем тему калькулятора))
changeTheme.addEventListener('click', () => {
	document.querySelector('.calculator').classList.toggle('alt-calc');
	document.querySelectorAll('.calculator-menu__btn')[0].classList.toggle('alt-calc-menu__btn');
	document.querySelectorAll('.calculator-menu__btn')[1].classList.toggle('alt-calc-menu__btn');
	document.querySelector('.calculator-buttons').classList.toggle('alt-calc-buttons');
	document.querySelectorAll('.operations__btn')[8].classList.toggle('alt-calc-operations__btn');
});
// запрещаем переход по ссылкам в футере, при клике происходит просто анимация))
let footerLinks = document.querySelectorAll('.footer-navigation-links__link');
footerLinks.forEach((link) => link.addEventListener('click', (e) => {
	e.preventDefault();
	link.classList.toggle('link-stop');
}));
