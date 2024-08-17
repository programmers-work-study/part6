// TODO: 이 곳에 정답 코드를 작성해주세요.
import Stopwatch from './stopwatch.js';

const 시작 = '시작';
const 중단 = '중단';
const 랩 = '랩';
const 리셋 = '리셋';

const SHORT_CUTS = {
    L: 'KeyL',
    S: 'KeyS',
};

const $timer = document.getElementById('timer');
const stopwatch = new Stopwatch();

const $startStopButton = document.getElementById('start-stop-btn');
const $starStoptButtonLabel = document.getElementById('start-stop-btn-label');

const $lapResetButton = document.getElementById('lap-reset-btn');
const $lapResetButtonLabel = document.getElementById('lap-reset-btn-label');

const $laps = document.getElementById('laps');

const formatCentiseconds = (centiseconds) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const remainingCentiseconds = centiseconds % 100;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedCentiseconds = String(remainingCentiseconds).padStart(
        2,
        '0'
    );

    return `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
};

const handleStartButtonClick = () => {
    stopwatch.start();

    setInterval(() => {
        $timer.textContent = formatCentiseconds(stopwatch.centisecond);
    }, 10);

    $starStoptButtonLabel.textContent = '중단';
    $startStopButton.classList.remove('bg-green-600');
    $startStopButton.classList.add('bg-red-600');
    $lapResetButtonLabel.textContent = '랩';
};

const handleStopButtonClick = () => {
    stopwatch.pause();

    $starStoptButtonLabel.textContent = '시작';
    $startStopButton.classList.remove('bg-red-600');
    $startStopButton.classList.add('bg-green-600');
    $lapResetButtonLabel.textContent = '리셋';
};

const handleLapButtonClick = () => {
    const [lapCount, lapTime] = stopwatch.createLap();

    const $lapItem = document.createElement('li');
    $lapItem.classList.add(
        'flex',
        'justify-between',
        'py-2',
        'px-3',
        'border-b-2'
    );
    $lapItem.innerHTML = `
            <span>랩 ${lapCount}</span>
            <span>${formatCentiseconds(lapTime)}</span>
        `;
    $laps.appendChild($lapItem);
};

const handleResetButtonClick = () => {
    stopwatch.reset();

    $timer.textContent = '00:00.00';
    $laps.innerHTML = '';
};

const handleStartStopButtonClick = () => {
    switch ($starStoptButtonLabel.textContent) {
        case 시작:
            handleStartButtonClick();
            break;
        case 중단:
            handleStopButtonClick();
            break;
    }
};

const handleLapResetButtonClick = () => {
    switch ($lapResetButtonLabel.textContent) {
        case 랩:
            handleLapButtonClick();
            break;
        case 리셋:
            handleResetButtonClick();
            break;
    }
};

const handleKeyUp = (event) => {
    switch (event.code) {
        case SHORT_CUTS.L:
            handleLapResetButtonClick();
            break;
        case SHORT_CUTS.S:
            handleStartStopButtonClick();
            break;
    }
};

$startStopButton.addEventListener('click', handleStartStopButtonClick);

$lapResetButton.addEventListener('click', handleLapResetButtonClick);

document.addEventListener('keyup', handleKeyUp);
