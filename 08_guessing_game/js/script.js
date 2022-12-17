const minValueField = document.querySelector('#min'); // поле ввода мин. значения пользователем
const maxValueField = document.querySelector('#max'); // поле ввода макс. значения пользователем
const message = document.querySelector('#message'); // поле сообщения о старте игры
const btnClose = document.querySelector('.popup__close-btn'); // кнопка закрыть popup
const popup = document.querySelector('.popup'); // popup
const gameStartBtn = document.querySelector('#gameStartBtn'); // кнопка 'Начать игру'
const attemptField = document.querySelector('#attemptNumber'); // поле с номером попытки
const answerField = document.querySelector('#answer'); // предполагаемое число
const btnMore = document.querySelector('#btnMore'); // кнопка 'Больше'
const btnLess = document.querySelector('#btnLess'); // кнопка 'Меньше'
const btnTrue = document.querySelector('#btnTrue'); // кнопка 'Верно'
const btnReset = document.querySelector('#btnReset'); // кнопка 'Заново'

let minValue = 0;	// значение по умолчанию
let maxValue = 100; // значение по умолчанию
minValueField.value = '0'; // значение поля ввода
maxValueField.value = '100'; // значение поля ввода
showPopupMessage(); // // получаем диапозон значений от мин. до макс., показываем сообщение в popup
let gameRun = true;  // игра начата (пока не нажали кнопку верно или мин. не равно макс.)
let attemptNumber = 1; // номер попытки
let answerNumber = Math.floor((maxValue + minValue) / 2); // с помощью бинарного алгоритма вычисляем задуманное число
let answerWord; // аргумент функции, кот. преобразовывает числа в текст 
let answer; // результат выполнения функции, кот. преобразовывает числа в текст 

// -------------------------- Функции -----------------------------

// -------- popup --------
function getIntervalValues() { // запрашиваем у пользователя значения интервала
	minValue = parseInt(minValueField.value);
	maxValue = parseInt(maxValueField.value);
	// проверка на NaN и если мин. знач. больше макс. знач. присвоить значения по умолчанию
	if (isNaN(minValue) || isNaN(maxValue) || minValue > maxValue) {
		minValue = 0;
		maxValue = 100;
	} else { // ограничиваем мин. и макс. значения
		minValue = (minValue < -999) ? -999 :
			(minValue > 999) ? 999 : minValue;
		maxValue = (maxValue > 999) ? 999 :
			(maxValue < -999) ? -999 : maxValue;
	}
}

// передаем полученные значения мин. и макс. в текстовое поле в popup.
function showPopupMessage() {
	return message.innerHTML = `Загадайте любое целое число от 
	<span class='popup-span'> ${minValue} </span> 
	до <span class='popup-span'> ${maxValue} </span>, а я его угадаю`;
}

// -------- значения для старта игры по умолчанию --------
function getStartGameValues() {
	gameRun = true; // игра начата
	attemptNumber = 1; // количество попыток равно 1
	attemptField.textContent = attemptNumber; // передаем номер попытки в поле
	answerNumber = Math.floor((maxValue + minValue) / 2); // бинарный алгоритм поиска
}

// -------- генерация случайных фраз --------
// выравниваем вероятность получения случайных чисел для фразы
function randomInteger(min, max) {
	// случайное число от min до (max+1)
	let randomNumber = min + Math.random() * (max + 1 - min);
	return Math.floor(randomNumber);
}

// показываем пользователю случайную фразу, если не удалось угадать число 
function showRandomPhrase() {
	answerPhrase = randomInteger(0, 5); // передаем случайное число в переменную
	if (answerPhrase === 1) {
		answerField.textContent = `Вы загадали неправильное число!\n\u{1F914}`;
	} else if (answerPhrase === 2) {
		answerField.textContent = `Меня терзают смутные сомнения!\n\u{1F928}`;
	} else if (answerPhrase === 3) {
		answerField.textContent = `Вы не соблюдаете правила игры!\n\u{1F620}`;
	} else if (answerPhrase === 4) {
		answerField.textContent = `Вы забыли какое число загадали?\n\u{1F609}`;
	} else if (answerPhrase === 5) {
		answerField.textContent = `Вам просто нравится нажимать на кнопки?\n\u{1F609}`;
	} else {
		answerField.textContent = `Я сдаюсь!\n\u{1F644}`;
	}
}

// показываем пользователю случайную фразу, после того, как мы угадали число
function showRandomAnswer() {
	answerPhrase = randomInteger(0, 5); // передаем случайное число в переменную
	if (answerPhrase === 1) {
		answerField.textContent = `Я всегда угадываю!\n\u{1F60E}`;
	} else if (answerPhrase === 2) {
		answerField.textContent = `Это моя суперспособность!\n\u{1F9B8}`;
	} else if (answerPhrase === 3) {
		answerField.textContent = `Сыграем заново? Я опять угадаю!\n\u{1F60E}`;
	} else if (answerPhrase === 4) {
		answerField.textContent = `Это было не сложно!\n\u{1F60A}`;
	} else {
		answerField.innerHTML = `Как я это делаю?\n\u{1F914} <br> - С помощью алгоритма бинарного поиска!`;
	}
}

// показываем пользователю предполагаемый вариант ответа цифрами
function showPossibleAnswerNumber() {
	answerPhrase = randomInteger(0, 5); // передаем случайное число в переменную
	if (answerPhrase === 1) {
		answerField.innerHTML = `Вы загадали число <br> <span>${answerNumber}</span> ?`;
	} else if (answerPhrase === 2) {
		answerField.innerHTML = `Да это легко! \u{1F60E} Вы загадали число <br> <span>${answerNumber}</span> ?`;
	} else if (answerPhrase === 3) {
		answerField.innerHTML = `Осмелюсь предположить, что это число <br> <span>${answerNumber}</span> ?`;
	} else if (answerPhrase === 4) {
		answerField.innerHTML = `Я угадаю эту мелодию... Упс, \u{1F648} не та игра... число <br> 
				<span>${answerNumber}</span> ?`;
	} else {
		answerField.innerHTML = `Никаких догадок \u{1F609}, только алгоритмы! число \u{1F4AA} <br>  
				<span>${answerNumber}</span> ?`;
	}
}

// показываем пользователю предполагаемый вариант ответа прописью
function showPossibleAnswerWord() {
	answerPhrase = randomInteger(0, 5); // передаем случайное число в переменную
	if (answerPhrase === 1) {
		answerField.innerHTML = `Вы загадали число <br> <span>${answer}</span> ?`;
	} else if (answerPhrase === 2) {
		answerField.innerHTML = `Да это легко! \u{1F60E} Вы загадали число <br> <span>${answer}</span> ?`;
	} else if (answerPhrase === 3) {
		answerField.innerHTML = `Осмелюсь предположить, что это число <br> <span>${answer}</span> ?`;
	} else if (answerPhrase === 4) {
		answerField.innerHTML = `Я угадаю эту мелодию... Упс, \u{1F648}  не та игра... число <br> 
				<span>${answer}</span> ?`;
	} else {
		answerField.innerHTML = `Никаких догадок \u{1F609}, только алгоритмы! \u{1F4AA} число <br>
				<span>${answer}</span> ?`;
	}
}

// выбираем предполагаемый вариант ответа цифрами или прописью в зависимости от условий и показываем пользователю
function choiseAnswerType() {
	if (answer.length < 20) {
		return showPossibleAnswerWord();
	} else {
		return showPossibleAnswerNumber();
	}
}

// ----------------------------- Число прописью ---------------------------------
let numbersNames = [];
numbersNames[0] =
	['', 'один', 'два', 'три', 'четыри', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
numbersNames['d'] =
	['десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шеснадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
numbersNames[1] =
	['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
numbersNames[2] =
	['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

function getNumberinWord(answerWord) {
	let resp = '',
		numbers = [],
		status = true;
	if (answerWord < 0) {
		let result = getNumberinWord(answerWord * (-1));
		return `Минус ${result}`;
	} else if (answerWord === 0) {
		return answerWord = '0';
	} else {
		for (; answerWord != 0; answerWord = Math.floor(answerWord / 10)) {
			numbers.push(answerWord % 10);
		}
		for (let i = numbers.length - 1; i >= 0; i--) {
			if (status) {
				if (numbers[i] == 1 && i == 1 || numbers[i] == 1 && i == 3) {
					status = false;
				} else {
					resp += getDigitToWord(i, numbers[i], 0);
				}
			} else {
				resp += getDigitToWord('d', numbers[i], i);
				status = true;
			}
		}
	}
	return resp.trim();
}

function getDigitToWord(digit, offset) {
	let resp = '';
	return resp + numbersNames[digit][offset] + ' ';
}

// ------------------------------- События -------------------------------------

// получаем мин. и макс. значения (инпуты)
document.addEventListener('input', (e) => {
	if (e.target.classList.contains('popup__input')) {
		getIntervalValues();
		showPopupMessage();
	}
});

// кнопка 'Начать игру!'
gameStartBtn.addEventListener('click', () => {
	popup.classList.add('popup-close');
	getStartGameValues();
	//showPossibleAnswerNumber();
	answerWord = answerNumber;
	answer = getNumberinWord(answerWord);
	choiseAnswerType();
});

// кнопка закрыть (x)
btnClose.addEventListener('click', () => {
	popup.classList.add('popup-close');
	getStartGameValues();
	answerWord = answerNumber;
	answer = getNumberinWord(answerWord);
	choiseAnswerType();
});

// ----------------- Игра началась ------------------

// кнопка 'Заново'
document.addEventListener('click', (e) => {
	if (e.target.closest('#btnReset')) {
		popup.classList.toggle('popup-close');
		minValue = 0;
		maxValue = 100;
		minValueField.value = minValue;
		maxValueField.value = maxValue;
		getIntervalValues();
		showPopupMessage();
		answerWord = answerNumber;
		answer = getNumberinWord(answerWord);
		choiseAnswerType();
	}
});

// кнопка 'Верно!'
btnTrue.addEventListener('click', () => {
	if (gameRun) {
		showRandomAnswer();
		gameRun = false;
	}
});

// кнопка 'Больше'
btnMore.addEventListener('click', () => {
	if (gameRun) {
		if (maxValue !== minValue) {
			minValue = answerNumber + 1;
			answerNumber = Math.floor((maxValue + minValue) / 2);
			attemptNumber++;
			attemptField.textContent = attemptNumber;
			answerWord = answerNumber;
			answer = getNumberinWord(answerWord);
			choiseAnswerType();
			if (minValue > maxValue) {
				showRandomPhrase();
				gameRun = false;
			}
		} else {
			showRandomPhrase();
			gameRun = false;
		}
	}
});

// кнопка 'Меньше!'
btnLess.addEventListener('click', () => {
	if (gameRun) {
		if (minValue === maxValue) {
			showRandomPhrase();
			gameRun = false;
		} else {
			maxValue = answerNumber - 1;
			answerNumber = Math.ceil((maxValue + minValue) / 2);
			attemptNumber++;
			attemptField.textContent = attemptNumber;
			answerWord = answerNumber;
			answer = getNumberinWord(answerWord);
			choiseAnswerType();
			if (minValue > maxValue) {
				showRandomPhrase();
				gameRun = false;
			}
			if (minValue > maxValue) {
				showRandomPhrase();
				gameRun = false;
			}
		}
	}
});

// --------- прочее --- оформление страницы ---------

// запрещаем переход по ссылкам в футере, при клике происходит просто анимация))
let footerLinks = document.querySelectorAll('.footer-navigation-links__link');
footerLinks.forEach((link) => link.addEventListener('click', (e) => {
	e.preventDefault();
	link.classList.toggle('link-stop');
}));