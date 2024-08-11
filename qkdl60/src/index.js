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
    const time = getTime(stopwatch.centisecond);
    $timer.textContent = time;
  }, 10);
});
/*
최단 lap 와 최장 lap 뽑는 방법
*/
let laps = [];
let longestLapIdx = null;
let shortestLapIdx = null;
$lapResetBtn.addEventListener('click', () => {
  if (timer) {
    const [, currentLap] = stopwatch.createLap();
    laps.push(currentLap);
    longestLapIdx =
      laps.length === 1
        ? null
        : laps.reduce((acc, lap, idx) => {
            if (acc === null) return idx;
            const longest = laps[acc];
            return longest < lap ? idx : acc;
          }, null);
    shortestLapIdx =
      laps.length === 1
        ? null
        : laps.reduce((acc, lap, idx) => {
            if (acc === null) return idx;
            const shortest = laps[acc];
            return shortest > lap ? idx : acc;
          }, null);
    $laps.innerHTML = `${laps.reduce((acc, lap, idx) => {
      return (
        `<li class="flex justify-between py-2 px-3 border-b-2 
                ${idx === shortestLapIdx ? 'text-red-600' : ''}
                ${idx === longestLapIdx ? 'text-green-600' : ''}">
                        <span>랩 ${idx + 1}</span>
                        <span>${getTime(lap)}</span>
                    </li>` + acc
      );
    }, ``)}`;
    return;
  }
  stopwatch.reset();
  laps = [];
  $timer.textContent = `00:00.00`;
  $laps.innerHTML = ``;
});

function getMins(centisecond) {
  return Math.floor(centisecond / 6000);
}
function getSeconds(centisecond) {
  return Math.floor(centisecond / 100) % 60;
}
function getCentiseconds(centisecond) {
  return centisecond % 100;
}
function getTime(stopWatchCentisecond) {
  const min = getMins(stopWatchCentisecond);
  const second = getSeconds(stopWatchCentisecond);
  const centisecond = getCentiseconds(stopWatchCentisecond);
  return `${min.toString().padStart(2, 0)}:${second
    .toString()
    .padStart(2, 0)}.${centisecond.toString().padStart(2, 0)}`;
}
