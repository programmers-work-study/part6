import Stopwatch from "./stopwatch.js";

// TODO: 이 곳에 정답 코드를 작성해주세요.
const formatTime = (time) => {
  let minute = 0;
  let second = parseInt(time / 100);
  let millisecond = time % 100;

  if (millisecond > 59) {
    millisecond -= 60;
    second += 1;
  }

  if (second > 59) {
    second -= 60;
    minute += 1;
  }
  const m = String(minute).padStart(2, '0');
  const s = String(second).padStart(2, '0');
  const ms = String(millisecond).padStart(2, 0);
  return `${m}:${s}.${ms}`
}
window.onload = function () {
  const stopWatch = new Stopwatch();

  const timerEl = document.querySelector('#timer');
  const LapResetBtnEl = document.querySelector('#lap-reset-btn');
  const StartStopBtnEl = document.querySelector('#start-stop-btn');

  const LapResetLabelEl = document.querySelector('#lap-reset-btn-label');
  const StartStopLabelEl = document.querySelector('#start-stop-btn-label');

  const LapsEl = document.querySelector('#laps');

  const timeArray = [];
  const lapArray = [];
  let timerInterval = null;

  const updateTimerDisplay = () => {
    timerEl.textContent = formatTime(stopWatch.centisecond);
  };

  const onClickStartStop = () => {
    if (StartStopBtnEl.classList.contains("bg-red-600")) {
      LapResetLabelEl.textContent = '리셋';
      StartStopLabelEl.textContent = '시작';
      stopWatch.pause();
      clearInterval(timerInterval);
    } else {
      LapResetLabelEl.textContent = '랩';
      StartStopLabelEl.textContent = '중단';
      stopWatch.start();
    }

    StartStopBtnEl.classList.toggle('bg-red-600');
    StartStopBtnEl.classList.toggle('bg-green-600');

    timerInterval = setInterval(updateTimerDisplay, 10);
  }

  const onClickLapReset = () => {
    if (LapResetLabelEl.textContent === '랩') {
      const [cnt, time] = stopWatch.createLap();
      timeArray.push(time);
      lapArray.push(cnt);

      const minIdx = timeArray.indexOf(Math.min(...timeArray));
      const maxIdx = timeArray.indexOf(Math.max(...timeArray));
      const min = lapArray[minIdx];
      const max = lapArray[maxIdx];

      const addLapHtml = document.createElement('li');
      addLapHtml.className = "flex justify-between py-2 px-3 border-b-2";
      addLapHtml.id = `lap-${cnt}`;
      addLapHtml.innerHTML = `
        <span>랩 ${cnt}</span>
        <span>${formatTime(time)}</span>
      `;
      LapsEl.prepend(addLapHtml);

      document.querySelectorAll('li').forEach((li) => {
        li.classList.toggle('text-red-600', li.id === `lap-${max}`);
        li.classList.toggle('text-green-600', li.id === `lap-${min}`);
      });
    } else {
      stopWatch.reset();
      timerEl.textContent = formatTime(stopWatch.centisecond);
      LapResetLabelEl.textContent = '리셋';
      StartStopLabelEl.textContent = '시작';
      LapsEl.innerHTML = ``;
      timeArray.length = 0;
      lapArray.length = 0;
    }
  }

  StartStopBtnEl.addEventListener('click', onClickStartStop);
  LapResetBtnEl.addEventListener('click', onClickLapReset);

  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'l') onClickLapReset();
    else if (e.key.toLowerCase() === 's') onClickStartStop();
  });

}