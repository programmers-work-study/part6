import Stopwatch from './stopwatch.js';

const stopwatch = new Stopwatch();
let timeArray = [];
let lapArray = [];
let timerInterval = null;

const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const milliseconds = centiseconds % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
    )}.${String(milliseconds).padStart(2, '0')}`;
};

const updateTimerDisplay = () => {
    document.querySelector('#timer').textContent = formatTime(
        stopwatch.centisecond
    );
};

const startStopwatch = () => {
    document.querySelector('#lap-reset-btn-label').textContent = '랩';
    document.querySelector('#start-stop-btn-label').textContent = '중단';
    stopwatch.start();
    timerInterval = setInterval(updateTimerDisplay, 10);
};

const pauseStopwatch = () => {
    document.querySelector('#lap-reset-btn-label').textContent = '리셋';
    document.querySelector('#start-stop-btn-label').textContent = '시작';
    stopwatch.pause();
    clearInterval(timerInterval);
};

const toggleStartStop = () => {
    const startStopBtn = document.querySelector('#start-stop-btn');
    if (startStopBtn.classList.contains('bg-red-600')) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
    startStopBtn.classList.toggle('bg-red-600');
    startStopBtn.classList.toggle('bg-green-600');
};

const createLapElement = (count, time) => {
    const lapItem = document.createElement('li');
    lapItem.className = 'flex justify-between py-2 px-3 border-b-2';
    lapItem.id = `lap-${count}`;
    lapItem.innerHTML = `<span>랩 ${count}</span><span>${formatTime(
        time
    )}</span>`;
    return lapItem;
};

const updateLapHighlights = () => {
    const minIndex = timeArray.indexOf(Math.min(...timeArray));
    const maxIndex = timeArray.indexOf(Math.max(...timeArray));
    const minLap = lapArray[minIndex];
    const maxLap = lapArray[maxIndex];

    document.querySelectorAll('li').forEach((li) => {
        li.classList.toggle('text-red-600', li.id === `lap-${maxLap}`);
        li.classList.toggle('text-green-600', li.id === `lap-${minLap}`);
    });
};

const recordLap = () => {
    const [count, time] = stopwatch.createLap();
    timeArray.push(time);
    lapArray.push(count);

    const lapItem = createLapElement(count, time);
    document.querySelector('#laps').prepend(lapItem);
    updateLapHighlights();
};

const resetStopwatch = () => {
    stopwatch.reset();
    updateTimerDisplay();
    document.querySelector('#lap-reset-btn-label').textContent = '리셋';
    document.querySelector('#start-stop-btn-label').textContent = '시작';
    document.querySelector('#laps').innerHTML = '';
    timeArray = [];
    lapArray = [];
};

const handleLapReset = () => {
    if (document.querySelector('#lap-reset-btn-label').textContent === '랩') {
        recordLap();
    } else {
        resetStopwatch();
    }
};

const handleKeyPress = (event) => {
    if (event.key.toLowerCase() === 'l') handleLapReset();
    else if (event.key.toLowerCase() === 's') toggleStartStop();
};

const initEventListeners = () => {
    document
        .querySelector('#start-stop-btn')
        .addEventListener('click', toggleStartStop);
    document
        .querySelector('#lap-reset-btn')
        .addEventListener('click', handleLapReset);
    window.addEventListener('keydown', handleKeyPress);
};

window.onload = () => {
    initEventListeners();
};
