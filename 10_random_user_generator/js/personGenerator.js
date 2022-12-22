const personGenerator = {
	// ОБЪЕКТЫ JSON (имена, фамилии, профессии)
	surnameJson: `{  
		 "count": 16,
		 "list": {
			  "id_1": "Иванов",
			  "id_2": "Смирнов",
			  "id_3": "Кузнецов",
			  "id_4": "Васильев",
			  "id_5": "Петров",
			  "id_6": "Михайлов",
			  "id_7": "Новиков",
			  "id_8": "Федоров",
			  "id_9": "Кравцов",
			  "id_10": "Николаев",
			  "id_11": "Семёнов",
			  "id_12": "Славин",
			  "id_13": "Степанов",
			  "id_14": "Павлов",
			  "id_15": "Александров",
			  "id_16": "Морозов"
		 }
	}`,
	firstNameMaleJson: `{
		 "count": 10,
		 "list": {     
			  "id_1": "Александр",
			  "id_2": "Максим",
			  "id_3": "Иван",
			  "id_4": "Артем",
			  "id_5": "Дмитрий",
			  "id_6": "Никита",
			  "id_7": "Михаил",
			  "id_8": "Даниил",
			  "id_9": "Егор",
			  "id_10": "Андрей"
		 }
	}`,
	firstNameFemaleJson: `{
		"count": 16,
		"list": {     
			 "id_1": "Василиса",
			 "id_2": "Инна",
			 "id_3": "Мария",
			 "id_4": "Яна",
			 "id_5": "Екатерина",
			 "id_6": "Дарья",
			 "id_7": "Наталья",
			 "id_8": "Ирина",
			 "id_9": "Елена",
			 "id_10": "Анастасия",
			 "id_11": "Авдотья",
			 "id_12": "Марфа",
			 "id_13": "Любовь",
			 "id_14": "Дарья",
			 "id_15": "Евлампия",
			 "id_16": "Ангелина"
		}
  }`,
	professionFemaleJson: `{
	"count": 15,
	"list": {     
		 "id_1": "Медсестра",
		 "id_2": "Секретарь",
		 "id_3": "Бухгалтер",
		 "id_4": "Актриса",
		 "id_5": "Стюардесса",
		 "id_6": "Воспитатель",
		 "id_7": "Косметолог",
		 "id_8": "Швея",
		 "id_9": "Оператор",
		 "id_10": "Фитнесс-инструктор",
		 "id_11": "Кассир",
		 "id_12": "Библиотекарь",
		 "id_13": "Учитель",
		 "id_14": "Врач",
		 "id_15": "Фармацевт"
	}
}`,
	professionMaleJson: `{
	"count": 15,
	"list": {     
		 "id_1": "Пожарный",
		 "id_2": "Пилот",
		 "id_3": "Слесарь",
		 "id_4": "Автомеханик",
		 "id_5": "Телохранитель",
		 "id_6": "Каскадёр",
		 "id_7": "Строитель",
		 "id_8": "Инженер",
		 "id_9": "Капитан корабля",
		 "id_10": "Шахтер",
		 "id_11": "Космонавт",
		 "id_12": "Хирург",
		 "id_13": "Спасатель",
		 "id_14": "Металлург",
		 "id_15": "Нефтяник"
	}
}`,
	monthJson: `{
		"count": 12,
		"list": {
			"id_1": "январь",
			"id_2": "февраль",
			"id_3": "март",
			"id_4": "апрель",
			"id_5": "май",
			"id_6": "июнь",
			"id_7": "июль",
			"id_8": "август",
			"id_9": "сентябрь",
			"id_10": "октябрь",
			"id_11": "ноябрь",
			"id_12": "декабрь"
		}
	}`,

	GENDER_MALE: 'Мужчина', // свойство объекта
	GENDER_FEMALE: 'Женщина', // свойство объекта

	// получает случайное значение из объекта
	randomValue: function (json) {
		const obj = JSON.parse(json); // преобразовываем объект-JSON в обычный объект 
		const prop = `id_${this.randomIntNumber(obj.count, 1)}`; // получаем случайный id
		return obj.list[prop]; // возвращаем одно случайное значение из списка
	},

	// выравнивает вероятность выпадания числа от мин до макс
	randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

	// генерирует пол
	randomGender: function () {
		return this.randomIntNumber() === 1 ? this.GENDER_MALE : this.GENDER_FEMALE;
	},

	// генерирует имя
	randomFirstName: function () { // генерируем имя
		if (this.person.gender === this.GENDER_MALE) { // не выполняется, потому что this.person.gender - undefined 
			return this.randomValue(this.firstNameMaleJson); // не выполняется этот код
		} else { // всегда выполняется этот код потому что остальные условия ложны
			return this.randomValue(this.firstNameFemaleJson); // возвращаются только женские имена 
		}
	},

	// генерирует фамилию
	randomSurname: function () {
		if (this.person.gender === this.GENDER_MALE) {
			return this.randomValue(this.surnameJson);
		} else {
			return this.randomValue(this.surnameJson) + 'a';
		}
	},

	// генерирует отчество
	randomPatronymic: function () {
		let patronymic = this.randomValue(this.firstNameMaleJson);
		if (this.person.gender === this.GENDER_MALE) {
			if (patronymic.includes('Никит')) {
				patronymic = patronymic.slice(0, 5) + 'ич';
			} else if (patronymic.includes('Дмитр') || patronymic.includes('Андре')) {
				patronymic = patronymic.slice(0, -1) + 'евич';
			} else if (patronymic.includes('Миха')) {
				patronymic = patronymic.slice(0, 4) + 'йлович';
			} else {
				patronymic = patronymic += 'ович';
			}
		} else {
			if (patronymic.includes('Никит')) {
				patronymic = patronymic.slice(0, 5) + 'ична';
			} else if (patronymic.includes('Дмитр') || patronymic.includes('Андре')) {
				patronymic = patronymic.slice(0, -1) + 'евна';
			} else if (patronymic.includes('Миха')) {
				patronymic = patronymic.slice(0, 4) + 'йловна';
			} else {
				patronymic += 'овна';
			}
		}
		return patronymic;
	},

	// генерирует профессию
	randomProfession: function () {
		if (this.person.gender === this.GENDER_MALE) {
			return this.randomValue(this.professionMaleJson);
		} else {
			return this.randomValue(this.professionFemaleJson);
		}
	},

	// генерирует день рождения
	randomBirthDay: function () {
		let month = this.person.birthMonth;
		if (month.includes('апр') || month.includes('июн') || month.includes('сен') || month.includes('ноя')) {
			return this.randomIntNumber(30, 1);
		} else if (month.includes('фев')) {
			return this.randomIntNumber(28, 1);
		} else {
			return this.randomIntNumber(31, 1);
		}
	},

	// генерирует месяц рождения
	randomBirthMonth: function () {
		let month = this.randomValue(this.monthJson);
		if (month.includes('ь') || month.includes('й')) {
			month = month.slice(0, -1) + 'я';
		} else {
			month += 'а';
		}
		return month;
	},

	// генерирует год рождения
	randomBirthYear: function () {
		return this.randomIntNumber(2000, 1962);
	},

	// возвращает случайного пользователя (объект person)
	getPerson: function () {
		this.person = {}; // создаем пустой объект person
		this.person.gender = this.randomGender();
		this.person.firstName = this.randomFirstName();
		this.person.surName = this.randomSurname();
		this.person.patronymic = this.randomPatronymic();
		this.person.birthMonth = this.randomBirthMonth();
		this.person.birthDay = this.randomBirthDay();
		this.person.birthYear = this.randomBirthYear();
		this.person.profession = this.randomProfession();
		return this.person;
	},
};

// кнопка Сгенерировать
document.querySelector('#btn-activate').addEventListener('click', () => {
	const initPerson = personGenerator.getPerson();
	document.querySelector('#surnameOutput').textContent = initPerson.surName;
	document.querySelector('#firstNameOutput').textContent = initPerson.firstName;
	document.querySelector('#patronymicOutput').textContent = initPerson.patronymic;
	document.querySelector('#genderOutput').textContent = initPerson.gender;
	document.querySelector('#birthDayOutput').textContent = initPerson.birthDay;
	document.querySelector('#birthMonthOutput').textContent = initPerson.birthMonth;
	document.querySelector('#birthYearOutput').textContent = initPerson.birthYear;
	document.querySelector('#professionOutput').textContent = initPerson.profession;
});

// кнопка Очистить
document.querySelector('#btn-clear').addEventListener('click', () => {
	const initPerson = {};
	document.querySelector('#surnameOutput').textContent = initPerson.surName;
	document.querySelector('#firstNameOutput').textContent = initPerson.firstName;
	document.querySelector('#patronymicOutput').textContent = initPerson.patronymic;
	document.querySelector('#genderOutput').textContent = initPerson.gender;
	document.querySelector('#birthDayOutput').textContent = initPerson.birthDay;
	document.querySelector('#birthMonthOutput').textContent = initPerson.birthMonth;
	document.querySelector('#birthYearOutput').textContent = initPerson.birthYear;
	document.querySelector('#professionOutput').textContent = initPerson.profession;
});


// --------- прочее --- оформление страницы ---------
// запрещаем переход по ссылкам в футере, при клике происходит просто анимация
let footerLinks = document.querySelectorAll('.footer-navigation-links__link');
footerLinks.forEach((link) => link.addEventListener('click', (e) => {
	e.preventDefault();
	link.classList.toggle('link-stop');
}));