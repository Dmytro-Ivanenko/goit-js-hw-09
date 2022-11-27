import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const refs = {
  formElements: document.querySelector('form').elements,
  submitBtn: document.querySelector('button'),
};

const promiseSettings = {
  delay: '',
  step: '',
  amount: '',
};

// Functions
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function startPromises({ delay, step, amount }) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Toastify({
          text: `Fulfilled promise ${position} in ${delay}ms`,
          style: {
            background: '#76d163',
          },
          close: true,
          duration: 10000,
        }).showToast();
      })
      .catch(({ position, delay }) => {
        Toastify({
          text: `Rejected promise ${position} in ${delay}ms`,
          style: {
            background: '#b92626',
          },
          close: true,
          duration: 10000,
        }).showToast();
      });
    delay += step;
  }
}

// Handlers
const onSubmit = e => {
  e.preventDefault();

  promiseSettings.delay = +document.querySelector('[name = delay]').value;
  promiseSettings.step = +document.querySelector('[name = step]').value;
  promiseSettings.amount = +document.querySelector('[name = amount]').value;

  startPromises(promiseSettings);
};

refs.submitBtn.addEventListener('click', onSubmit);
