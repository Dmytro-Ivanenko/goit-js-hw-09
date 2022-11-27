import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkTime(selectedDates);
  },
};

const timePicker = flatpickr('#datetime-picker', options);

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('button'),
};

// Functions

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

function checkTime(selectedDates) {
  const today = new Date();

  if (selectedDates[0].getTime() < today.getTime()) {
    alert('Please choose a date in the future');

    refs.startBtn.disabled = true;
    return;
  }

  refs.startBtn.disabled = false;
}

function updateTime() {
  // обновлять таймер
}

// Handlers
const onStart = e => {
  setInterval(updateTime, 1000);
};

refs.startBtn.addEventListener('click', onStart);
