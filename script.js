let isRunning = false;
let startTime;
let lapTimes = [];

function startStop() {
    if (isRunning) {
        stop();
    } else {
        start();
    }
}

function start() {
    isRunning = true;
    startTime = new Date().getTime() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1] : 0);
    updateDisplay();

    document.querySelector('button:nth-of-type(1)').textContent = 'Pause';
    lapTimes.push(0);

    // Update display every 10 milliseconds
    updateInterval = setInterval(updateDisplay, 10);
}

function stop() {
    isRunning = false;
    clearInterval(updateInterval);
    document.querySelector('button:nth-of-type(1)').textContent = 'Resume';
}

function reset() {
    stop();
    lapTimes = [];
    updateDisplay();
}

function recordLap() {
    if (isRunning) {
        lapTimes.push(new Date().getTime() - startTime);
        updateDisplay();
        displayLapList();
    }
}

function updateDisplay() {
    const elapsedTime = isRunning ? new Date().getTime() - startTime : lapTimes.reduce((a, b) => a + b, 0);
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return (
        pad(hours) + ':' +
        pad(minutes) + ':' +
        pad(seconds) + '.' +
        pad(centiseconds)
    );
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function displayLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';

    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapList.appendChild(lapItem);
    });
}


