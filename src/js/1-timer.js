import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо елементи з DOM
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');

let timerInterval;
let userSelectedDate;

// Ініціалізуємо flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,

  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
});

// Додаємо обробник події на кнопку старту
startButton.addEventListener('click', () => {
  startTimer(userSelectedDate);
});

// Функція для старту таймера
function startTimer(endDate) {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  timerInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = endDate - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimer(0);
      datetimePicker.disabled = false;
      return;
    }

    updateTimer(timeLeft);
  }, 1000);
}

// Функція для оновлення інтерфейсу таймера
function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Функція для конвертації мс у дні, години, хвилини, секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання нуля по переду
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
