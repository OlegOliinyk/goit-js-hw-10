import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо форму з DOM
const form = document.querySelector('.form');

// Додаємо обробник події на форму
form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.target.delay.value);
  const state = event.target.state.value;

  form.reset();

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        // title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        // title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});

// Функція для створення промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
