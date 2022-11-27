import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';

// .................variables
let activeTimer = false;
let intervalId = null;
let endTime = 0;

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

// ................Functions
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

function checkTime(selectedDates) {
  const today = new Date();

  if (selectedDates[0].getTime() < today.getTime()) {
    alert('Please choose a date in the future');

    refs.startBtn.disabled = true;
    return;
  }

  refs.startBtn.disabled = false;
}

function addLeadingZero(value) {
  Object.keys(value).forEach(e => {
    value[`${e}`] = value[`${e}`].toString().padStart(2, '0');
  });

  return value;
}

function renderTimer(timeObj) {
  const { days, hours, minutes, seconds } = refs;
  const formattedTimer = addLeadingZero(timeObj);

  days.innerText = formattedTimer.days;
  hours.innerText = formattedTimer.hours;
  minutes.innerText = formattedTimer.minutes;
  seconds.innerText = formattedTimer.seconds;
}

function countTime() {
  const currentTime = new Date().getTime();
  const calcTime = endTime - currentTime;
  renderTimer(convertMs(calcTime));
}

// ....................Handlers
const onStart = e => {
  if (activeTimer === false) {
    endTime = timePicker.selectedDates[0].getTime();

    intervalId = setInterval(countTime, 1000);
    activeTimer = true;
    refs.startBtn.innerText = 'Stop';
  } else {
    clearInterval(intervalId);
    activeTimer = false;
    refs.startBtn.innerText = 'Start';
  }
};

refs.startBtn.addEventListener('click', onStart);

console.dir(refs.startBtn);
