const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stoptBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

// functions

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

// Handlers

let timeoutId = null;

const onBtnClick = e => {
  if (e.target.type !== 'button') {
    return;
  } else if (
    e.target === refs.startBtn &&
    !refs.startBtn.classList.contains('active-start-btn')
  ) {
    refs.startBtn.classList.add('active-start-btn');
    refs.stoptBtn.classList.remove('active-stop-btn');
    timeoutId = setInterval(changeBodyColor, 1000);
  } else if (
    e.target === refs.stoptBtn &&
    refs.startBtn.classList.contains('active-start-btn')
  ) {
    refs.startBtn.classList.remove('active-start-btn');
    refs.stoptBtn.classList.add('active-stop-btn');
    clearTimeout(timeoutId);
  } else {
    return;
  }
};

// Listeners

refs.body.addEventListener('click', onBtnClick);
