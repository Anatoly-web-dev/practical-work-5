// в последствии добавим активацию по кнопке, а не по загрузке окна браузера
window.onload = function () {
	// добавляем в объект вложенный объект с данными пользователя
	const initPerson = personGenerator.getPerson();
	// выводим каждое свойство объекта в соответствующее поле вывода
	document.querySelector('#surnameOutput').textContent = initPerson.surName;
	document.querySelector('#firstNameOutput').textContent = initPerson.firstName;
	document.querySelector('#patronymicOutput').textContent = initPerson.patronymic;
	document.querySelector('#genderOutput').textContent = initPerson.gender;
	document.querySelector('#birthDayOutput').textContent = initPerson.birthDay;
	document.querySelector('#birthMonthOutput').textContent = initPerson.birthMonth;
	document.querySelector('#birthYearOutput').textContent = initPerson.birthYear;
	document.querySelector('#professionOutput').textContent = initPerson.profession;
};
