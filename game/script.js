'use strict';

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isNumber = function (number) {
  return !isNaN(parseFloat(number)) && isFinite(number) && (parseFloat(number) !== undefined);
};

const startGame = function () {
  let attempts = 10; //задаем число попыток
  let targetNumber = getRandomNumber(1, 100); //программа загадывает число
  
  //получение данных от пользователя и проверка, что именно он ввел - число, не число или нажал "отмена"
  const askQuestion = function (message) {
    let n = prompt(message);
    if (n === null) { //нажал "отмена"
      alert('Спасибо за игру! До свидания!');
      return;
    } else if (!isNumber(n)) { //не число
      n = askQuestion('Ошибка, вы ввели не число! Попробуйте еще раз. Угадайте число от 1 до 100:');
      return n;
    } else { //число
      n = n.trim();
      return +n;
    }
  };

  //на этом этапе мы получили число от пользователя, теперь нужно сравнить с загаданным
  const checkNumber = function (n) {
    if (n === targetNumber) { //угадал
      if (confirm('Ура, вы угадали! Хотите сыграть еще?')) {
        startGame();
        return;
        } else {
        alert('Спасибо за игру! До свидания!');
        return;
        }
    } else if ((targetNumber > n) || (targetNumber < n)) { //не угадал
      attempts--;
      if (attempts < 1) { //проверяем оставшиеся попытки
        if (confirm('К сожалению, попытки закончились. Начать новую игру?')) {
          startGame();
        } else {
          alert('Спасибо за игру! До свидания!');
        }
      } else if (targetNumber > n) {
        n = askQuestion(`Загаданное число больше! Осталось попыток: ${attempts}. Угадайте число от 1 до 100:`);
        checkNumber(n);
      } else if (targetNumber < n) {
        n = askQuestion(`Загаданное число меньше! Осталось попыток: ${attempts}. Угадайте число от 1 до 100:`);
        checkNumber(n);
        }
    }
  };

  let currentNumber = askQuestion('Начнем игру! Угадай число от 1 до 100:'); //запрашиваем число у пользователя
  checkNumber(currentNumber); //проверяем, совпадает ли с задуманным
};

startGame(); //вызов функции старта игры