// TODO: 이 곳에 정답 코드를 작성해주세요.
import Stopwatch from './stopwatch.js';

const $timer = document.getElementById('timer');
const stopwatch = new Stopwatch();

const $startStopButton = document.getElementById('start-stop-btn');
const $starStoptButtonLabel = document.getElementById('start-stop-btn-label');

// const $LapResetButton = document.getElementById('lap-reset-btn');
const $lapResetButtonLabel = document.getElementById('lap-reset-btn-label');

function formatCentiseconds(centiseconds) {
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
}

const handleStartButtonClick = () => {
    $starStoptButtonLabel.textContent = '중단';
    $startStopButton.classList.remove('bg-green-600');
    $startStopButton.classList.add('bg-red-600');
    $lapResetButtonLabel.textContent = '랩';

    stopwatch.start();

    setInterval(() => {
        $timer.textContent = formatCentiseconds(stopwatch.centisecond);
    }, 10);
};

const handleStopButtonClick = () => {
    $starStoptButtonLabel.textContent = '시작';
    $startStopButton.classList.remove('bg-red-600');
    $startStopButton.classList.add('bg-green-600');
    $lapResetButtonLabel.textContent = '리셋';

    stopwatch.pause();
};

const handleStartStopButtonClick = () => {
    switch ($starStoptButtonLabel.textContent) {
        case '시작':
            handleStartButtonClick();
            break;
        case '중단':
            handleStopButtonClick();
            break;
    }
};

$startStopButton.addEventListener('click', handleStartStopButtonClick);
