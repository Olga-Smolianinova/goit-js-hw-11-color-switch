// Переключатель цветов
// Есть массив цветов в hex-формате и кнопки Start и Stop.

// <button type="button" data-action="start">Start</button>
// <button type="button" data-action="stop">Stop</button>

const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

// Напиши скрипт, который после нажатия кнопки Start, раз в секунду меняет цвет фона body на случайное значение из массива используя инлайн-стиль. При нажатии на кнопку Stop, изменение цвета фона должно останавливаться.

// ⚠️ Учти, на кнопку Start можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка Start была не активна.

// Доступы к элементам
const refs = {
  startBtn: document.querySelector('button[data-action="start"]'),
  stopBtn: document.querySelector('button[data-action="stop"]'),
  bodyRef: document.querySelector('body'),
};

// Для отмены вызова функции и очистки setInterval  введем переменную:
let intervalId = null;

// Чтобы кнопка Start была не активна пока изменение темы запушено
let isActive = false;

// Для генерации случайного числа (индекс элемента массива цветов), используем функцию randomIntegerFromInterval.
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Вешаем слушателей событий
refs.startBtn.addEventListener('click', onChangeBackground);
refs.stopBtn.addEventListener('click', onStopChangeBackground);

function onChangeBackground() {
  if (isActive) {
    return;
  }
  isActive = true;

  //присваеваем также атрибут disabled для того чтобы сделать кнопку Start неактивной пока изменение темы запущено. И снимаем его при нажатии на кнопку Stop в onStopChangeBackground
  refs.startBtn.disabled = true;

  intervalId = setInterval(() => {
    //вводим переменную, которая равняется randomIntegerFromInterval с параметрами, где min=0, а max=длина массива length - 1
    let color = randomIntegerFromInterval(0, colors.length - 1);
    console.log(color);

    // меняем цвет фона body на случайное значение из массива используя инлайн-стиль
    refs.bodyRef.style.background = colors[color];
  }, 1000);
}

function onStopChangeBackground() {
  isActive = false;
  refs.startBtn.disabled = false;
  clearInterval(intervalId);
}
