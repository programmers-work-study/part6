// TODO: 이 곳에 정답 코드를 작성해주세요.
import Stopwatch from './stopwatch.js';

const stopwatch = new Stopwatch();

const $lapResetBtn = document.querySelector('#lap-reset-btn');
const $lapResetLabel = document.querySelector('#lap-reset-btn-label');
const $startStopBtn = document.querySelector('#start-stop-btn');
const $startStopLabel = document.querySelector('#start-stop-btn-label');
const $laps = document.querySelector('#laps');
const $timer = document.querySelector('#timer');

let timer = null;
$startStopBtn.addEventListener('click', () => {
    if (timer) {
        stopwatch.pause();
        clearInterval(timer);
        timer = null;
        $startStopLabel.textContent = '시작';
        $lapResetLabel.textContent = '리셋';
        $startStopBtn.classList.remove('bg-red-600');
        $startStopBtn.classList.add('bg-green-600');
        return;
    }
    stopwatch.start(() => {});
    $startStopLabel.textContent = '중단';
    $lapResetLabel.textContent = '랩';
    $startStopBtn.classList.remove('bg-green-600');
    $startStopBtn.classList.add('bg-red-600');
    timer = setInterval(() => {
        const min = getMins(stopwatch.centisecond);
        const second = getSeconds(stopwatch.centisecond);
        const centisecond = getCentiseconds(stopwatch.centisecond);
        $timer.textContent = `${min.toString().padStart(2, 0)}:${second
            .toString()
            .padStart(2, 0)}.${centisecond.toString().padStart(2, 0)}`;
    }, 10);
});

$lapResetBtn.addEventListener('click', () => {});

function getMins(centisecond) {
    return Math.floor(centisecond / 6000);
}
function getSeconds(centisecond) {
    return Math.floor(centisecond / 100) % 60;
}
function getCentiseconds(centisecond) {
    return centisecond % 100;
}
